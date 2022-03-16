/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';
import jwt from 'jsonwebtoken';
import withToken from '@/middleware/api/withToken';
import prisma from '@/prisma';
import createToken from '@/utilis/createToken';

const { serverRuntimeConfig } = getConfig();
const Key: string = process.env.KEY || '_secreto';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		//Pensar si quitar o no
		const token: string = req.headers?.authorization!;
		const { sub }: any = jwt.verify(token, serverRuntimeConfig.secret);

		//Aqui va el getUser
		const user = await prisma.user.findUnique({
			where: {
				id: sub,
			},
			include: {
				contact: {
					include: {
						afiliado: true,
						identType: true,
					},
				},
			},
		});

		if (!user) throw { message: 'Su usuario no existe', code: 400 };

		const { contact, email } = user;

		if (!contact.afiliado.length) throw { message: 'Este usuario no posse un numero de afiliado', code: 400 };

		const newToken: string = createToken(user.id);

		const resUser = {
			email: email,
			identType: contact.identType.name,
			identNum: contact.identNum,
			numAfiliado: contact.afiliado[0].numA,
		};

		//console.log(resUser);

		return res.status(200).json({ user: resUser, token: newToken });
	} catch (err) {
		console.log(err);
		return res.status(400).json(err);
	}
};

export default withToken(handler);
