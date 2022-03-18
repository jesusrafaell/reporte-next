import { NextApiRequest, NextApiResponse } from 'next';
import withToken from '@/middleware/api/withToken';
import prisma from '@/prisma';
import getConfig from 'next/config';
import sql from 'mssql';
import { sqlConfig } from '@/utilis/sqlConfig';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const afiliado = req.query.afiliado;
	if (!afiliado) return res.status(400).json({ message: 'Es necesario un numero de afiliado', code: 400 });
	try {
		await sql.connect(sqlConfig);
		console.log('connect ok afiliado');

		const query = `
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
						card_acceptor_name_loc  IS NOT NULL AND card_acceptor_id_code = ${afiliado}
				) AS a
				GROUP BY card_acceptor_term_id ,card_acceptor_id_code ,card_acceptor_name_loc, Serial_Equipo
			')
		`;
		const response: any = await sql.query(query);

		let terminales = response.recordset;

		if (!terminales.length) throw { message: 'No se encontro ningun terminal', code: 401 };

		return res.status(200).json({ terminales });
	} catch (err) {
		console.log(err);
		return res.status(400).json(err);
	}
};

export default withToken(handler);
