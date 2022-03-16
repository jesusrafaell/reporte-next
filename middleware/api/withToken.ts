import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';
import prisma from '@/prisma';

const { serverRuntimeConfig } = getConfig();

interface Handler {
	handler: any;
}

const withToken = (handler: any) => {
	return async (req: NextApiRequest, res: NextApiResponse) => {
		const token = req.cookies.token;

		if (!token) {
			return res.status(401).json({
				success: false,
				message: 'Inicie sesión.',
			});
		}
		let decoded;
		try {
			decoded = jwt.verify(token, process.env.secret!);
		} catch (err: any) {
			return res.status(401).json({
				success: false,
				restart: true,
				message: 'Invalid Token',
			});
		}
		try {
			//Verifica si el token es valido
			//Verifica si el usuario existe
			const currentUser = await prisma.user.findUnique({
				where: {
					id: Number(decoded.sub),
				},
			});
			if (!currentUser) {
				return res.status(401).json({
					success: false,
					message: 'Token Invalid Access',
				});
			}
			return handler(req, res);
		} catch (err: any) {
			console.log(err);
			return res.status(401).json({
				success: false,
				message: err.message || 'Inicie sesión',
			});
		}
	};
};

export default withToken;
