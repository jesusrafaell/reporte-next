/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { UserInt } from '@/interfaces/auth/interfaces';
import prisma from '@/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST') {
		//return res.status(400).json({ message: 'Metodo invalido en Tranred' });
		return res.redirect(302, '/');
	}
	try {
		const user: UserInt = req.body;

		const validContact = await prisma.contact.findFirst({
			where: {
				AND: [
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

		if (!validContact) throw { message: 'Usted no esta afiliado a Tranred', code: 400 };

		const validUserEmail = await prisma.user.findFirst({
			where: {
				email: user.email,
			},
		});

		if (validUserEmail) throw { message: 'El email o el documento de identidad ya existe', code: 400 };

		// hash password
		const salt: string = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(req.body.password, salt);

		const { id } = validContact;

		const saveUser = await prisma.user.create({
			data: {
				email: user.email,
				password: user.password,
				contactId: id,
			},
		});
		if (!saveUser) throw { message: 'Error al registrarte', code: 400 };

		//console.log('Register ->', req.method, user);
		return res.status(200).json({ saveUser, code: 200 });
	} catch (err) {
		console.log(err);
		return res.status(400).send(err);
	}
};
