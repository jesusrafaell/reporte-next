const { PrismaClient } = require('@prisma/client');
const { identType } = require('./identType.ts');

const prisma = new PrismaClient();

const saveUser = async () => {
	await prisma.identType.createMany({ data: identType });

	await prisma.contact.createMany({
		data: [
			{
				//id 1
				email: 'jesus@correo.com',
				identTypeId: 3,
				identNum: '1234567',
			},
			{
				//id 2
				email: 'jesus2@correo.com',
				identTypeId: 3,
				identNum: '12345678',
			},
		],
	});

	await prisma.user.createMany({
		data: [
			{
				//id 1
				email: 'jesus@correo.com',
				password: '$2b$10$yDWmy/EGvdva4HeNpl5QtefY.v3HfJ2o9aVdiAKCVjALniDGFfTci',
				contactId: 1,
			},
			{
				//id 2
				email: 'jesus2@correo.com',
				password: '$2b$10$yDWmy/EGvdva4HeNpl5QtefY.v3HfJ2o9aVdiAKCVjALniDGFfTci',
				contactId: 2,
			},
		],
	});

	await prisma.commerce.createMany({
		data: [
			{
				//id 1
				name: 'BALNEARIO MARINA GRANDE S',
				idTypeCcId: 3,
				identNum: '000605610',
			},
			{
				//id 2
				name: 'PINTO S PAN DELY CA',
				idTypeCcId: 3,
				identNum: '295254555',
			},
			{
				//id 3
				name: 'COMERCIAL QUINTA GRANDE C',
				idTypeCcId: 3,
				identNum: '299515728',
			},
			{
				//id 4
				name: 'Mc Donalds',
				idTypeCcId: 3,
				identNum: '100605610',
			},
			{
				//id 5
				name: 'KFC',
				idTypeCcId: 3,
				identNum: '395254555',
			},
		],
	});

	await prisma.afiliado.createMany({
		data: [
			{
				//id 1
				numA: 720000121,
				contactId: 1,
				ccId: 1,
			},
			{
				//id 2
				numA: 720015003,
				contactId: 2,
				ccId: 2,
			},
		],
	});
};

saveUser();
