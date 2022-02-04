import { getCookie, removeCookies } from 'cookies-next';
import jwt from 'jsonwebtoken';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export function withProtected(gssp: GetServerSideProps) {
	return async (ctx: GetServerSidePropsContext) => {
		const { req, res } = ctx;
		const token: string = getCookie('token', { req, res }) as string;

		if (!token) {
			return {
				redirect: {
					destination: '/auth/login',
					statusCode: 302,
				},
			};
		}
		//verifico que el token sea valido
		try {
			jwt.verify(token, serverRuntimeConfig.secret);
			return await gssp(ctx); // Continue
		} catch (err) {
			removeCookies('token', { req, res });
			return {
				redirect: {
					destination: '/auth/login',
					statusCode: 302,
				},
			};
		}
	};
}
