/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	swcMinify: true,
	serverRuntimeConfig: {
		secret: 'THIS IS MY SECRET TOKEN, TEST123',
	},
	publicRuntimeConfig: {
		backUrl: process.env.BACK_URL,
		backPort: process.env.BACK_PORT,
	},
};
