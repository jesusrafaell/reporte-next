import { NextApiRequest, NextApiResponse } from 'next';
import withToken from '@/middleware/api/withToken';
import prisma from '@/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const afiliado = req.query.afiliado as string;
	if (!afiliado) return res.status(400).json({ message: 'Es necesario un numero de afiliado', code: 400 });
	try {
		const dataAfiliado = await prisma.afiliado.findUnique({
			where: {
				numA: Number(afiliado),
			},
		});
		return res.status(200).json({ user: dataAfiliado });
	} catch (err) {
		return res.status(400).json(err);
	}
};

export default withToken(handler);
