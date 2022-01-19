/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import prisma from '@/prisma';

const { serverRuntimeConfig } = getConfig();

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
			include: {
				identType: true,
				afiliado: true,
			},
		});

		if (!user) throw { message: 'Correo o Contraseña incorrecta', code: 400 };

		if (!user.afiliado.length) throw { message: 'Este usuario no posse un numero de afiliado', code: 400 };

		const { password, id, ...dataUser } = user;
		const validPassword = await bcrypt.compare(req.body.password, password);

		if (!validPassword) throw { message: 'Correo o contraseña contrasena incorrecta', code: 400 };

		const token = jwt.sign({ sub: user.id }, serverRuntimeConfig.secret, { expiresIn: '3h' });

		const resUser = {
			email: dataUser.email,
			identType: dataUser.identType.name,
			identNum: dataUser.identNum,
			numAfiliado: user.afiliado[0].numA,
		};

		return res.status(200).json({ user: resUser, token: token, code: 200 });
	} catch (err) {
		return res.status(400).json(err);
	}
};
