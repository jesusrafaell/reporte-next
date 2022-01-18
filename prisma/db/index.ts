const { PrismaClient } = require('@prisma/client');
const { identType } = require('./identType.ts');

const prisma = new PrismaClient();

const saveUser = async () => {
	await prisma.identType.createMany({ data: identType });

	//Only for DEV
	await prisma.user.createMany({
		data: [
			{
				//id 1
				email: 'jesus@correo.com',
				password: '$2b$10$yDWmy/EGvdva4HeNpl5QtefY.v3HfJ2o9aVdiAKCVjALniDGFfTci',
				identTypeId: 3,
				identNum: '1234567',
			},
		],
	});

	await prisma.commerce.createMany({
		data: [
			{
				//id 1
				name: 'Mc Donals',
				idTypeCcId: 3,
				identNum: '1111111',
			},
		],
	});

	await prisma.afiliado.createMany({
		data: [
			{
				//id 1
				numA: 51514141,
				userId: 1,
				ccId: 1,
			},
		],
	});
};

saveUser();
