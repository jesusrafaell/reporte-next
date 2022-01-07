import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
	//const { query } = req.body as { query: string };
	if (req.method === 'GET') {
		console.log('form back->', req.method);
	} else if (req.method === 'GET') {
		console.log('form back->', req.method);
	}
	res.send('Hello world!');
};
