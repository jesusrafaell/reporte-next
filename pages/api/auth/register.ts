/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { UserInt } from 'pages/auth/interfaces';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST') {
		//return res.status(400).json({ message: 'Metodo invalido en Tranred' });
		return res.redirect(302, '/');
	}
	try {
		const user: UserInt = req.body;

		const validUserEmail = await prisma.user.findFirst({
			where: {
				OR: [
					{
						email: user.email,
					},
					{
						identTypeId: user.identTypeId,
						identNum: user.identNum,
					},
				],
			},
		});

		if (validUserEmail) throw { message: 'El email o el documento de identidad ya existe', code: 400 };

		// hash password
		const salt: string = await bcrypt.genSalt(10);
		req.body.password = await bcrypt.hash(req.body.password, salt);

		const saveUser = await prisma.user.create({
			data: {
				email: user.email,
				password: user.password,
				identTypeId: user.identTypeId,
				identNum: user.identNum,
			},
		});
		if (!saveUser) throw { message: 'Error al crear el usuario', code: 400 };

		console.log('Register ->', req.method, user);

		return res.status(200).json({ saveUser, code: 200 });
	} catch (err) {
		console.log(err);
		return res.status(400).send(err);
	}
};
