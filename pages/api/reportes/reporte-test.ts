/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import getConfig from 'next/config';
import withToken from '@/middleware/api/withToken';

const prisma = new PrismaClient();

const { serverRuntimeConfig } = getConfig();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	//const { query } = req.body as { query: string };
	if (req.method !== 'GET') {
		//return res.status(400).json({ message: 'Metodo invalido en Tranred' });
		return res.redirect(302, '/');
	}
	try {
		console.log('llegue al reporte-test');
		const reporte: any = await prisma.identType.findMany();
		if (!reporte) throw { message: 'No se encontro ningun reporte', code: 401 };
		return res.status(200).json({ reporte: reporte });
	} catch (err) {
		console.log(err);
		return res.status(400).json(err);
	}
};

export default withToken(handler);
