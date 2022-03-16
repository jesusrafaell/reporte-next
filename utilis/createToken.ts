import jwt from 'jsonwebtoken';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

const createToken = (id: number): string => {
	const token: string = jwt.sign({ sub: id }, process.env.secret!, { expiresIn: '3h' });
	return token;
};

export default createToken;
