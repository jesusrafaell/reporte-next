import { NextApiRequest, NextApiResponse } from 'next';
import withToken from '@/middleware/api/withToken';
import prisma from '@/prisma';
import getConfig from 'next/config';
import sql from 'mssql';
import { sqlConfig } from '@/utilis/sqlConfig';

const { serverRuntimeConfig } = getConfig();

const { host, dbName, username, password } = serverRuntimeConfig;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (!req.query.terminal) {
		return res.status(400).json({ message: 'Es necesario un numero de Terminal', code: 400 });
	}

	const { terminal, dateInit, dateEnd } = JSON.parse(req.query.terminal as string);

	if (!terminal || !dateInit || !dateEnd)
		return res.status(400).json({ message: 'Es necesario un numero de Terminal y un rango de fecha', code: 400 });

	const auxDateInit = new Date(dateInit);
	const auxDateEnd = new Date(dateEnd);

	let fechaInicio: string = `${auxDateInit.getFullYear()}-${auxDateInit.getMonth() + 1}-${auxDateInit.getDate()}`;
	let fechaFin: string = `${auxDateEnd.getFullYear()}-${auxDateEnd.getMonth() + 1}-${auxDateEnd.getDate()}`;

	try {
		await sql.connect(sqlConfig);
		console.log('conection ok terminales');

		const query = `
      SELECT * FROM OPENQUERY([PRUEBA_7218], '
        SELECT 
          right(card_acceptor_id_code, 9) as afiliado, 
          card_acceptor_term_id as terminal, 
          right(left(source_node_additional_data, 10), 4) as lote, 
          case sink_node 
            WHEN ''sktandem'' THEN ''Credito''
            WHEN ''sktandem1'' THEN ''Tebca''  ELSE ''Debito'' END origen, 
            LEFT(pan,6) + ''****'' + right(pan,4) as pan,
          isnull(isnull(in_req,in_adv),isnull(in_rev,in_recon_adv)) fecha, 
          ret_ref_no AS referencia, 
          auth_id_rsp AS authoriz, 
          case msg_type
            WHEN 512 THEN ''Compra''
            WHEN 1312 THEN ''Cierre_Lote''   
            WHEN 1056 THEN ''Reverso'' END ''tp_transaction'',
          CAST(convert(money, source_node_amount_requested/100) as varchar) monto  
          FROM [tm_trans_base].[dbo].[tm_trans] (NOLOCK)
          WHERE rsp_code_req_rsp = ''00'' and card_acceptor_term_id = ${terminal} AND 
            (in_req between ''${fechaInicio} 00:00:00.000'' and ''${fechaFin} 00:00:00.000'' or 
            in_rev between ''${fechaInicio} 00:00:00.000'' and ''${fechaFin} 00:00:00.000'' or
            in_recon_adv between ''${fechaInicio} 00:00:00.000'' and ''${fechaFin} 00:00:00.000'')
          ORDER BY tran_nr
      ')
		`;

		const response: any = await sql.query(query);
		//console.log('res ok');

		let transacciones = response.recordset;

		if (!transacciones.length) throw { message: 'No se encontro ninguna transaccion', code: 400 };

		return res.status(200).json({ transacciones });
	} catch (err) {
		console.log(err);
		return res.status(400).json(err);
	}
};

export default withToken(handler);

/*
SELECT * FROM OPENQUERY([PRUEBA_7218], '
	SELECT 
		right(card_acceptor_id_code, 9) as afiliado, 
		card_acceptor_term_id as terminal, 
		right(left(source_node_additional_data, 10), 4) as Lote, 
		case sink_node 
			WHEN ''sktandem'' THEN ''CrÃ©dito''
			WHEN ''sktandem1'' THEN ''Tebca''  ELSE ''DÃ©bito'' END origen, 
			LEFT(pan,6) + ''****'' + right(pan,4) as pan,
		isnull(isnull(in_req,in_adv),isnull(in_rev,in_recon_adv)) fecha, 
		ret_ref_no AS referencia, 
		auth_id_rsp AS authoriz, 
		case msg_type
			WHEN 512 THEN ''Compra''
			WHEN 1312 THEN ''Cierre_Lote''   
			WHEN 1056 THEN ''Reverso'' END ''TP_TransacciÃ³n'',
		CAST(convert(money, source_node_amount_requested/100) as varchar) monto  
		FROM [tm_trans_base].[dbo].[tm_trans] (NOLOCK)
		WHERE rsp_code_req_rsp = ''00'' and card_acceptor_term_id = 38005389 AND 
			(in_req between ''2021-10-01 00:00:00.000'' and ''2021-10-02 00:00:00.000'' or 
			in_rev between ''2021-10-01 00:00:00.000'' and ''2021-10-02 00:00:00.000'' or
			in_recon_adv between ''2021-10-01 00:00:00.000'' and ''2021-10-02 00:00:00.000'')
		ORDER BY tran_nr
');
*/
