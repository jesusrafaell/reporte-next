import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();
const { host, dbName, username, password } = serverRuntimeConfig;

export const sqlConfig = {
	server: host,
	database: 'tranredconsulta',
	user: 'amendoza',
	password: password,
	requestTimeout: 30000,
	connectionTimeout: 30000,
	pool: {
		max: 10,
		min: 0,
		idleTimeoutMillis: 30000,
	},
	options: {
		encrypt: true,
		trustServerCertificate: true,
	},
};
