/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	swcMinify: true,
	env: {
		secret: 'THIS IS MY SECRET TOKEN, TEST123',
	},
	serverRuntimeConfig: {
		secret: 'THIS IS MY SECRET TOKEN, TEST123',
		host: process.env.HOST,
		port: process.env.PORT,
		dbName: process.env.DATABASE,
		username: process.env.USER,
		password: process.env.PASSWORD,
	},
	publicRuntimeConfig: {
		backUrl: process.env.BACK_URL,
		backPort: process.env.BACK_PORT,
	},
	exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
		return {
			'/': { page: '/' },
			'/auth/login': { page: '/auth/login' },
			'/auth/register': { page: '/auth/register' },
			'/reportes/afiliado': { page: '/reportes/afiliado' },
		};
	},
};
