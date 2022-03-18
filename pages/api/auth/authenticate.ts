/* eslint-disable import/no-anonymous-default-export */
//import prisma from '@/prisma';
import createToken from '@/utilis/createToken';
import { sqlConfig } from '@/utilis/sqlConfig';
import bcrypt from 'bcryptjs';
import sql from 'mssql';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	//const { query } = req.body as { query: string };
	if (req.method !== 'POST') {
		//return res.status(400).json({ message: 'Metodo invalido en Tranred' });
		return res.redirect(302, '/');
	}

	try {
		await sql.connect(sqlConfig);

		console.log('connection login ok');

		const response: any = await sql.query`
			SELECT * FROM [User] WHERE email = ${req.body.email}
		`;

		const user = response.recordset[0];
		/*
		const user: any = await prisma.user.findUnique({
			where: {
				email: req.body.email,
			},
		});
		*/

		if (!user) throw { message: 'Correo o Contraseña incorrecta', code: 400 };

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
		const contact = await prisma.contact.findUnique({
			where: {
				id: contactId,
			},
			include: {
				afiliado: true,
				identType: true,
			},
		});
		*/

		if (!contact) throw { message: 'Usted no esta afiliado a Tranred', code: 400 };

		//if (!contact.afiliado.length) throw { message: 'Este usuario no posse un numero de afiliado', code: 400 };

		const validPassword = await bcrypt.compare(req.body.password, password);

		if (!validPassword) throw { message: 'Correo o contraseña contrasena incorrecta', code: 400 };

		const token: string = createToken(id);

		const resUser = contact;
		/*
		const resUser = {
			email: dataUser.email,
			identType: contact.identType.name,
			identNum: contact.identNum,
			numAfiliado: contact.afiliado[0].numA,
		};
		*/

		return res.status(200).json({ user: resUser, token: token, code: 200 });
	} catch (err) {
		return res.status(400).json(err);
	}
};
