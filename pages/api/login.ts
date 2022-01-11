/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
	//const { query } = req.body as { query: string };
	if (req.method !== 'POST') {
		//return res.status(400).json({ message: 'Metodo invalido en Tranred' });
		return res.redirect(302, '/');
	}
	try {
		const user: any = await prisma.user.findUnique({
			where: {
				email: req.body.email,
			},
		});

		if (!user) throw { message: 'Correo o Contrasena incorrecta', code: 400 };

		const { password, id, ...dataUser }: any = user;
		const validPassword = await bcrypt.compare(req.body.password, password);

		if (!validPassword) throw { message: 'Contrasena incorrecta', code: 400 };

		return res.status(200).json({ user: dataUser, code: 400 });
	} catch (err) {
		console.log(err);
		return res.status(400).json(err);
	}
};
