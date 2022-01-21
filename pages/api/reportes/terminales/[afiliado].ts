import { NextApiRequest, NextApiResponse } from 'next';
import withToken from '@/middleware/api/withToken';
import prisma from '@/prisma';
import getConfig from 'next/config';
import sql from 'mssql';


const { serverRuntimeConfig } = getConfig();

const { server, port, db, username, password } = serverRuntimeConfig;

const sqlConfig = {
	server: process.env.HOST_MAIN,
	port: Number(port),
	database: 'tm_trans_base',
	user: username,
	password: password,
	options: {
		encrypt: true,
		trustServerCertificate: true,
		//change to true for local dev / self-signed certs
	},
};

/*
SELECT DISTINCT
  card_acceptor_term_id 'Terminal',
  card_acceptor_id_code 'afiliado',
  card_acceptor_name_loc 'Nombre', 
  Serial_Equipo = left(right(source_node_additional_data, 19), 9) 
FROM tm_trans(nolock) WHERE  
  card_acceptor_name_loc  is not null and card_acceptor_id_code=${Number(afiliado)}
*/

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const afiliado = req.query.afiliado as string;
	if (!afiliado) return res.status(400).json({ message: 'Es necesario un numero de afiliado', code: 400 });
	try {
		await sql.connect(sqlConfig);
		const response = await sql.query` 
			SELECT DISTINCT
				card_acceptor_term_id 'Terminal',
				card_acceptor_id_code 'afiliado',
				card_acceptor_name_loc 'Nombre', 
				Serial_Equipo = left(right(source_node_additional_data, 19), 9) 
			FROM tm_trans(nolock) WHERE  
				card_acceptor_name_loc  is not null and card_acceptor_id_code=${Number(afiliado)}
		`;
		//console.log('resQuery: ', response.recordset);
		let terminales = response.recordset;
		if (!terminales.length) throw { message: 'No se encontro ningun reporte', code: 401 };
		return res.status(200).json({ terminales: terminales });
	} catch (err) {
		console.log(err);
		return res.status(400).json(err);
	}
};
};

export default withToken(handler);
