import { getCookie, removeCookies } from 'cookies-next';
import jwt from 'jsonwebtoken';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export function withNotAuth(gssp: GetServerSideProps) {
	return async (ctx: GetServerSidePropsContext) => {
		const { req, res } = ctx;
		//console.log('with no auth');
		const token: string = getCookie('token', { req, res }) as string;
		if (!token) {
			//console.log('no tiene token');
			return await gssp(ctx); // Continue
		}
		//verifico que el token sea valido
		try {
			jwt.verify(token, serverRuntimeConfig.secret);
			//console.log('tiene token y es valido');
			return {
				redirect: {
					destination: '/',
					statusCode: 302,
				},
			};
		} catch (err) {
			//console.log('token invalido asi que ve al login/register');
			removeCookies('token', { req, res });
			return await gssp(ctx); // Continue
		}
	};
}
