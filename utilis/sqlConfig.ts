import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();
const { host, dbName, username, password } = serverRuntimeConfig;

export const sqlConfig = {
	server: host,
	database: 'TranredConsulta',
	user: 'amendoza',
	password: password,
	options: {
		encrypt: true,
		trustServerCertificate: true,
	},
};
