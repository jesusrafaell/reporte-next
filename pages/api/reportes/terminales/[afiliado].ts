import { NextApiRequest, NextApiResponse } from 'next';
import withToken from '@/middleware/api/withToken';
import prisma from '@/prisma';
import getConfig from 'next/config';
import sql from 'mssql';
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
	const afiliado = req.query.afiliado as string;
	if (!afiliado) return res.status(400).json({ message: 'Es necesario un numero de afiliado', code: 400 });
	try {
		/*
		console.log('sqlconfig', sqlConfig);
		await sql.connect(sqlConfig);
		console.log('conection ok');

		//Arreglar query para que solo deveulta 1

		const response = await sql.query` 
			SELECT * FROM OPENQUERY([PRUEBA_7218], '
				SELECT DISTINCT
					card_acceptor_term_id as terminal,
					card_acceptor_id_code as afiliado,
				FROM
					(SELECT DISTINCT
						card_acceptor_term_id , 
						card_acceptor_id_code , 
						card_acceptor_name_loc, 
						left(right(source_node_additional_data, 19), 9) AS Serial_Equipo
						FROM [tm_trans_base].[dbo].[tm_trans] (NOLOCK)
					WHERE  
						card_acceptor_name_loc  is not NULL AND card_acceptor_id_code = ${Number(afiliado)}
				) AS a
			GROUP BY card_acceptor_term_id ,card_acceptor_id_code ,card_acceptor_name_loc, Serial_Equipo')
		`;

		console.log('resQuery: ', response.recordset);
		let terminales = response.recordset;
		if (!terminales.length) throw { message: 'No se encontro ningun reporte', code: 401 };
		*/

		let aux: Terminal[] = [
			{
				terminal: '38005389',
				afiliado: '000000720000121',
			},
			{
				terminal: '38005388',
				afiliado: '000000720000121',
			},
		];

		return res.status(200).json({ terminales: aux });
	} catch (err) {
		console.log(err);
		return res.status(400).json(err);
	}
};

export default withToken(handler);
