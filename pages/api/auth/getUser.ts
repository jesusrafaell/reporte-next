/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';
import jwt from 'jsonwebtoken';
import withToken from '@/middleware/api/withToken';
import prisma from '@/prisma';

const { serverRuntimeConfig } = getConfig();
const Key: string = process.env.KEY || '_secreto';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		//Pensar si quitar o no
		const token: string = req.headers?.authorization!;
		const Resp: any = jwt.verify(token, serverRuntimeConfig.secret);
		if (!Resp) throw { message: 'Token invalid', code: 400 };

		//Aqui va el getUser
		const user = await prisma.user.findUnique({
			where: {
				id: Resp.sub,
			},
			include: {
				identType: true,
				afiliado: true,
			},
		});

		if (!user) throw { message: 'Su usuario no existe', code: 400 };

		if (!user.afiliado.length) throw { message: 'Este usuario no posse un numero de afiliado', code: 400 };

		const resUser = {
			email: user.email,
			identType: user.identType.name,
			identNum: user.identNum,
			numAfiliado: user.afiliado[0].numA,
		};

		return res.status(200).json({ user: resUser });
	} catch (err) {
		console.log(err);
		return res.status(400).json(err);
	}
};

export default withToken(handler);
