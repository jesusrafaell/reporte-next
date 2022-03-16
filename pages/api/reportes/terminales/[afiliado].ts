import { NextApiRequest, NextApiResponse } from 'next';
import withToken from '@/middleware/api/withToken';
import prisma from '@/prisma';
import getConfig from 'next/config';
import sql from 'mssql';

import { Terminal } from '@/interfaces/reportes/reporte';

const { serverRuntimeConfig } = getConfig();

const { host, dbName, username, password } = serverRuntimeConfig;

const sqlConfig: any = {
	server: host,
	database: dbName,
	user: username,
	password: password,
	options: {
		encrypt: true,
		trustServerCertificate: true,
		//change to true for local dev / self-signed certs
	},
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const afiliado = req.query.afiliado;
	if (!afiliado) return res.status(400).json({ message: 'Es necesario un numero de afiliado', code: 400 });
	try {
		console.log('connect ok afiliado');
		await sql.connect(sqlConfig);
		//console.log('conection ok');
		const response: Terminal[] | [] = await prisma.$queryRawUnsafe(`
			SELECT * FROM OPENQUERY([PRUEBA_7218], '
				SELECT DISTINCT
					card_acceptor_term_id AS terminal,
					card_acceptor_id_code AS afiliado
				FROM
					(SELECT DISTINCT
						card_acceptor_term_id , 
						card_acceptor_id_code , 
						card_acceptor_name_loc, 
						LEFT(right(source_node_additional_data, 19), 9) AS Serial_Equipo
						FROM [tm_trans_base].[dbo].[tm_trans] (NOLOCK)
					WHERE  
						card_acceptor_name_loc  IS NOT NULL AND card_acceptor_id_code = ${Number(afiliado)}
				) AS a
				GROUP BY card_acceptor_term_id ,card_acceptor_id_code ,card_acceptor_name_loc, Serial_Equipo
			')
		`);

		//let terminales = response.recordset;
		if (!response.length) throw { message: 'No se encontro ningun terminal', code: 401 };

		setTimeout(() => {
			return res.status(200).json({ terminales: response });
		}, 2000);
	} catch (err) {
		console.log(err);
		return res.status(400).json(err);
	}
};

export default withToken(handler);
