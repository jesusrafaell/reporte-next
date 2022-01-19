/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	swcMinify: true,
	serverRuntimeConfig: {
		secret: 'THIS IS MY SECRET TOKEN, TEST123',
		server: process.env.HOST,
		port: process.env.PORT,
		db: process.env.DATABASE,
		username: process.env.USER,
		password: process.env.PASSWORD,
	},
	publicRuntimeConfig: {
		backUrl: process.env.BACK_URL,
		backPort: process.env.BACK_PORT,
	},
};
