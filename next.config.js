/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	swcMinify: true,
	serverRuntimeConfig: {
		secret: 'THIS IS MY SECRET TOKEN, TEST123',
		server: process.env.HOST_TEST,
		port: process.env.PORT_TEST,
		db: process.env.DB_TEST,
		username: process.env.USER_TEST,
		password: process.env.PASS_TEST,
	},
	publicRuntimeConfig: {
		backUrl: process.env.BACK_URL,
		backPort: process.env.BACK_PORT,
	},
};
