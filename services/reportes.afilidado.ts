import useAxios from '@/config';
import { Terminal } from '@/interfaces/reportes/reporte';
import { User } from '@/stores/authContext';
//import { sessionExpired } from '@/utilis/sweetalert-auth';
import { validSession } from '@/validation/session';

export const reporte = {
	getTerminals,
	getTrans,
};

async function getTerminals(na: string) {
	try {
		console.log('call:', na);
		const res = await useAxios.get(`/reportes/terminales/${na}`);
		//console.log('repote', res.data);
		return res.data.terminales;
	} catch (err: any) {
		//console.log(err.response);
		const data = err.response?.data;

		//Valid Token invalido //mover de aqui a un validador de session expired
		validSession(err);

		if (err.response?.message) {
			const resError = {
				type: 'Error',
				message: data?.message || 'Error: Api',
				code: data?.code || err?.response?.status || '400',
			};
			console.log(resError);
			return resError;
		}
		console.log(err);
	}
}

interface DataQuery {
	terminal: number;
	dateInit: Date;
	dateEnd: Date;
}

async function getTrans(data: DataQuery) {
	try {
		const terminal = JSON.stringify(data);
		const res = await useAxios.get(`/reportes/transaction/${terminal}`);
		//console.log('repote', res.data);
		return res.data.transacciones;
	} catch (err: any) {
		console.log(err.response);
		const data = err.response?.data;

		//Valid Token invalido //mover de aqui a un validador de session expired
		validSession(err);

		const resError = {
			type: 'Error',
			message: data?.message || 'Error: Api',
			code: data?.code || err?.response?.status || '400',
		};
		console.log(resError);
		return resError;
	}
}
