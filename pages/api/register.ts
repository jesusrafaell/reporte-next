/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Metodo invalido en Tranred' });
	}
	let message = 'ok';
	const user = req.body;

	const saveUser = await prisma.user.create({
		data: user,
	});

	message = 'Register Pos';
	console.log('Register ->', req.method, user);

	res.json(saveUser);
	return res.status(200);
};
