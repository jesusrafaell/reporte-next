/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import getConfig from 'next/config';
import jwt from 'jsonwebtoken';

const { serverRuntimeConfig } = getConfig();
const Key: string = process.env.KEY || '_secreto';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
	//const { query } = req.body as { query: string };
	if (req.method !== 'POST') {
		//return res.status(400).json({ message: 'Metodo invalido en Tranred' });
		return res.redirect(302, '/');
	}
	const { token } = req.body;
	const Resp: any = jwt.verify(token, serverRuntimeConfig.secret);
	console.log(Resp);
	return res.status(200).json({ id: Resp.sub });
};
