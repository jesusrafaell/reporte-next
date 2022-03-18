/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { UserInt } from '@/interfaces/auth/interfaces';

import sql from 'mssql';
import { sqlConfig } from '@/utilis/sqlConfig';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST') {
		//return res.status(400).json({ message: 'Metodo invalido en Tranred' });
		return res.redirect(302, '/');
	}
	try {
		await sql.connect(sqlConfig);
		console.log('connection register ok');

		const user: UserInt = req.body;

		const resQuery: any = await sql.query(`
			SELECT * FROM Contact
			WHERE
				identTypeId = ${user.identTypeId} AND
				identNum = ${user.identNum}
		`);

		const validContact = resQuery.recordset[0];

		if (!validContact) throw { message: 'Usted no esta afiliado a Tranred', code: 400 };

		const resIdContact: any = await sql.query(`
			SELECT * FROM [dbo].[User]
			WHERE
			contactId = ${validContact.id}
		`);

		const validIdContact = resIdContact.recordset[0];

		if (validIdContact) throw { message: 'Este usuario ya fue registrado', code: 400 };

		const res2 = await sql.query(`
			SELECT * FROM [dbo].[User]
			WHERE
				email = '${user.email}'
		`);

		const validUserEmail = res2.recordset[0];
		if (validUserEmail) throw { message: 'El email ya existe', code: 400 };

		/*
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
		*/

		//if (!validContact) throw { message: 'Usted no esta afiliado a Tranred', code: 400 };

		/*
		const validUserEmail = await prisma.user.findFirst({
			where: {
				email: user.email,
			},
		});
		*/

		// hash password
		const salt: string = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(req.body.password, salt);

		const { id } = validContact;

		/*
		const saveUser = await prisma.user.create({
			data: {
				email: user.email,
				password: user.password,
				contactId: id,
			},
		});
		*/
		const queryInsert = `
			INSERT INTO [dbo].[User]
				(email, password, contactId)
			VALUES 
				('${user.email}', '${user.password}', ${id})
		`;
		const inserRes: any = await sql.query(queryInsert);

		if (!inserRes.rowsAffected.length) throw { message: 'Error al registrarte', code: 400 };

		return res.status(200).json({ code: 200 });
	} catch (err) {
		console.log(err);
		return res.status(400).send(err);
	}
};
