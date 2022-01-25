import { NextApiRequest, NextApiResponse } from 'next';
import withToken from '@/middleware/api/withToken';
import prisma from '@/prisma';
import getConfig from 'next/config';
import sql from 'mssql';

import { Terminal, Transaction } from '@/interfaces/reportes/reporte';

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
	const terminal: number = Number(req.query.terminal);
	if (!terminal) return res.status(400).json({ message: 'Es necesario un numero de Terminal', code: 400 });
	try {
		console.log('terminal', terminal);
		//console.log('sqlconfig', sqlConfig);
		await sql.connect(sqlConfig);
		console.log('conection ok');
		const response: Transaction[] | [] = await prisma.$queryRawUnsafe(`
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
            (in_req between ''2021-10-01 00:00:00.000'' and ''2021-10-02 00:00:00.000'' or 
            in_rev between ''2021-10-01 00:00:00.000'' and ''2021-10-02 00:00:00.000'' or
            in_recon_adv between ''2021-10-01 00:00:00.000'' and ''2021-10-02 00:00:00.000'')
          ORDER BY tran_nr
      ');
		`);

		//let terminales = response.recordset;
		if (!response.length) throw { message: 'No se encontro ninguna transaccion', code: 400 };

		setTimeout(() => {
			return res.status(200).json({ terminales: response });
		}, 2000);
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
