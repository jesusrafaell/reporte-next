import useAxios from '@/config';
import { AxiosResponse } from 'axios';

export const reporte = {
	reporteTest,
};

async function reporteTest() {
	try {
		const res: AxiosResponse<any> = await useAxios.get('/api/reportes/reporte-test');
		console.log(res.data);
		return res.data.reporte;
	} catch (err: any) {
		const data = err.response?.data;
		const resError = {
			type: 'Error',
			message: data.message || 'Error: Api',
			code: data.code || data.status || '404',
		};
		console.log(resError);
		return resError;
	}
}
