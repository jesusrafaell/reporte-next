/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	swcMinify: true,
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
};
