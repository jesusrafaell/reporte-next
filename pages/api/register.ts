import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
	const user = req.body;
	let message = 'ok';
	if (req.method === 'GET') {
		console.log('Register ->', req.method);
	} else if (req.method === 'POST') {
		console.log('Register ->', req.method, user);
		message = 'Register Pos';
	}
	return res.status(200).json({
		message: message,
	});
};
