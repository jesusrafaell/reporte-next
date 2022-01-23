import { NextApiRequest, NextApiResponse } from 'next';
import withToken from '@/middleware/api/withToken';
import prisma from '@/prisma';
import getConfig from 'next/config';
import sql from 'mssql';

import { Prisma } from '@prisma/client';
import { Terminal } from '@/interfaces/reportes/terminals';

const { serverRuntimeConfig } = getConfig();

const { server, port, db, username, password } = serverRuntimeConfig;

const sqlConfig: any = {
	server: '10.198.72.31',
	database: 'tranredconsulta',
	user: username,
	password: password,
	options: {
		encrypt: true,
		trustServerCertificate: true,
		//change to true for local dev / self-signed certs
	},
	//port: Number(port),
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const afiliado: number = Number(req.query.afiliado);
	if (!afiliado) return res.status(400).json({ message: 'Es necesario un numero de afiliado', code: 400 });
	try {
		console.log('sqlconfig', sqlConfig);
		const connection: any = await sql.connect(sqlConfig);
		console.log('conection ok');
		const response: Terminal[] = await prisma.$queryRawUnsafe(`
			SELECT * FROM OPENQUERY([PRUEBA_7218], '
				SELECT 
					card_acceptor_term_id as terminal,
					card_acceptor_id_code as afiliado,
					card_acceptor_name_loc as nombre,
					Serial_Equipo as serial
				FROM
					(SELECT distinct
						card_acceptor_term_id , 
						card_acceptor_id_code , 
						card_acceptor_name_loc, 
						left(right(source_node_additional_data, 19), 9) as Serial_Equipo
						FROM [tm_trans_base].[dbo].[tm_trans] (NOLOCK)
					WHERE  
						card_acceptor_name_loc  is not null and card_acceptor_id_code = ${afiliado}
				) AS a
				Group by card_acceptor_term_id ,card_acceptor_id_code ,card_acceptor_name_loc, Serial_Equipo
			')
		`);

		//let terminales = response.recordset;
		if (!response.length) throw { message: 'No se encontro ningun reporte', code: 401 };

		const resAux: Terminal[] = [
			{
				terminal: '38005389',
				afiliado: '000000720000121',
				nombre: 'JARDIN PRADOS DEL 0121 CARACAS        VE',
				serial: '031850412',
			},
			{
				terminal: '38005389',
				afiliado: '000000720000121',
				nombre: 'JARDIN PRADOS DEL ESTE CARACAS        VE',
				serial: '031850412',
			},
		];

		return res.status(200).json({ terminales: resAux });
	} catch (err) {
		console.log(err);
		return res.status(400).json(err);
	}
};

export default withToken(handler);
