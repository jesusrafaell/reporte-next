import { verify } from 'crypto';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { promisify } from 'util';
import getConfig from 'next/config';

import { PrismaClient } from '@prisma/client';

const { serverRuntimeConfig } = getConfig();

const prisma = new PrismaClient();

interface Handler {
	handler: any;
}

const withToken = (handler: any) => {
	return async (req: NextApiRequest, res: NextApiResponse) => {
		let token;
		if (req.headers.authorization) {
			token = req.headers.authorization;
		}
		if (!token) {
			return res.status(401).json({
				success: false,
				message: 'Porfavor, inicie sesión.',
			});
		}
		try {
			//const res = await promisify(jwt.verify)(token, serverRuntimeConfig.secret);
			//Verifica si el token es valido
			const decoded: any = jwt.verify(token, serverRuntimeConfig.secret);
			//Verifica si el usuario existe
			const currentUser = await prisma.user.findUnique({
				where: {
					id: decoded.sub,
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
			return res.status(401).json({
				success: false,
				message: err.message || 'Porfavor, inicie sesión',
			});
		}
	};
};

export default withToken;
