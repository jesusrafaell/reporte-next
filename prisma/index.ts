import { PrismaClient } from '@prisma/client';

const prismaClientProperty = `__prevent-name-collision__prisma`;
type GlobalWithPrismaClient = typeof globalThis & {
	[prismaClientProperty]: PrismaClient;
};

const getPrismaClient = () => {
	if (process.env.NODE_ENV === `production`) {
		return new PrismaClient();
	} else {
		const newGlobal = globalThis as GlobalWithPrismaClient;
		if (!newGlobal[prismaClientProperty]) {
			newGlobal[prismaClientProperty] = new PrismaClient();
		}
		return newGlobal[prismaClientProperty];
	}
};
const prisma = getPrismaClient();

export default prisma;
