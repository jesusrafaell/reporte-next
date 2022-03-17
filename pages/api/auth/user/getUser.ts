/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';
import jwt from 'jsonwebtoken';
import withToken from '@/middleware/api/withToken';
//import prisma from '@/prisma';
import createToken from '@/utilis/createToken';
import { sqlConfig } from '@/utilis/sqlConfig';
import sql from 'mssql';

const { serverRuntimeConfig } = getConfig();
const Key: string = process.env.KEY || '_secreto';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		//Pensar si quitar o no
		const token: string = req.headers?.authorization!;
		const { sub }: any = jwt.verify(token, serverRuntimeConfig.secret);

		await sql.connect(sqlConfig);

		console.log('connection login ok');

		const response: any = await sql.query`
			SELECT * FROM [User] WHERE id = ${sub}
		`;

		const user = response.recordset[0];

		const { password, id, contactId, ...dataUser } = user;

		const responseContact: any = await sql.query`
			SELECT 
				[Contact].email,
				[IdentType].name as identType,
				[Contact].identNum as identNum,
				[Afiliado].numA as numAfiliado
			FROM [Contact]
			INNER JOIN [IdentType]
				ON [IdentType].id = [Contact].identTypeId
			LEFT JOIN [Afiliado]
				ON [Afiliado].contactId = [Contact].id
			WHERE [Contact].id = ${contactId} 
		`;

		const contact = responseContact.recordset[0];

		/*
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
		*/

		if (!user) throw { message: 'Su usuario no existe', code: 400 };

		//const { contact, email } = user;

		//if (!contact.afiliado.length) throw { message: 'Este usuario no posse un numero de afiliado', code: 400 };

		const newToken: string = createToken(user.id);

		const resUser = contact;
		/*
		const resUser = {
			email: email,
			identType: contact.identType.name,
			identNum: contact.identNum,
			numAfiliado: contact.afiliado[0].numA,
		};
		*/

		//console.log(resUser);

		return res.status(200).json({ user: resUser, token: newToken });
	} catch (err) {
		console.log(err);
		return res.status(400).json(err);
	}
};

export default withToken(handler);
