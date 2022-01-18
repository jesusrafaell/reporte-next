/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';
import withToken from '@/middleware/api/withToken';
import sql from 'mssql';

const { serverRuntimeConfig } = getConfig();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { server, port, db, username, password } = serverRuntimeConfig;

	const sqlConfig = {
		server: server,
		port: Number(port),
		database: db,
		user: username,
		password: password,
		options: {
			encrypt: true,
			trustServerCertificate: true,
			//change to true for local dev / self-signed certs
		},
	};

	if (req.method !== 'GET') {
		return res.redirect(302, '/');
	}
	try {
		await sql.connect(sqlConfig);
		const response = await sql.query` 
		SELECT 
			u.id, 
			u.email, 
			ic.name as idenTUser,
			u.identNum, 
			af.numA,
			cc.name,
			icc.name as idenTCC,
			cc.identNum as idenNumCC
			FROM [User] as u
		JOIN [IdentType] as ic
			ON ic.id = u.identTypeId
		INNER JOIN [Afiliado] as af
			ON af.userId = u.id
		INNER JOIN [Commerce] as cc
			ON cc.id = af.ccId
		JOIN [IdentType] as icc
			ON icc.id = cc.idTypeCcId
		`;
		//console.log('resQuery: ', response.recordset);
		let reporte = response.recordset;
		if (!reporte.length) throw { message: 'No se encontro ningun reporte', code: 401 };
		return res.status(200).json({ reporte: reporte });
	} catch (err) {
		console.log(err);
		return res.status(400).json(err);
	}
};

export default withToken(handler);

/*
Test
SELECT 
	u.id, 
	u.email, 
	ic.name as idenTUser,
	u.identNum, 
	af.numA,
	cc.name,
	icc.name as idenTCC,
	cc.identNum
	FROM [User] as u
JOIN [IdentType] as ic
	ON ic.id = u.identTypeId
INNER JOIN [Afiliado] as af
	ON af.userId = u.id
INNER JOIN [Commerce] as cc
	ON cc.id = af.ccId
JOIN [IdentType] as icc
	ON icc.id = cc.idTypeCcId;
	*/
