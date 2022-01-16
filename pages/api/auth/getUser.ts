/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import getConfig from 'next/config';
import jwt from 'jsonwebtoken';
import withToken from '@/middleware/api/withToken';

const { serverRuntimeConfig } = getConfig();
const Key: string = process.env.KEY || '_secreto';

const prisma = new PrismaClient();

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
		});

		if (!user) throw { message: 'User not find', code: 400 };

		return res.status(200).json({ email: user.email });
	} catch (err) {
		console.log(err);
		return res.status(400).json(err);
	}
};

export default withToken(handler);
