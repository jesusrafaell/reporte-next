const { PrismaClient } = require('@prisma/client');
const { identType } = require('./identType.ts');

const prisma = new PrismaClient();

const saveUser = async () => {
	await prisma.identType.createMany({ data: identType });
};

saveUser();
