import { UserInt, UserLoginInt } from '@/pages/auth/interfaces';
import useAxios from '@/config';
import { AxiosResponse } from 'axios';
import Router from 'next/router';
import { successLogin, successRegister } from '@/utilis/sweetalert-auth';
import { asyncLocalStorage } from '@/utilis/asyncLocalStorage';

export const authUser = {
	login,
	register,
	logout,
};

async function login(user: UserLoginInt) {
	try {
		const res: AxiosResponse<any> = await useAxios.post('/api/auth/authenticate', user);
		console.log(res.data.user);
		localStorage.setItem('token', res.data.token);
		successLogin(`${res.data.id}`);
		Router.push('/reportes/afiliado');
	} catch (err: any) {
		const data = err.response?.data;
		const resError = {
			type: 'Error',
			message: data.message || 'Error: Api',
			code: data.code || '401',
		};
		console.log(resError);
		return resError;
	}
}

async function register(user: UserInt) {
	try {
		const res: AxiosResponse<any> = await useAxios.post('/api/auth/register', user);
		console.log('Register ok', res);
		Router.push('/auth/login');
		successRegister();
	} catch (err: any) {
		console.log(err);
		const data = err.response?.data;
		const resError = {
			type: 'Error',
			message: data.message || 'Error: Api',
			code: data.code || '401',
		};
		console.log(resError);
		return resError;
	}
}

function logout() {
	localStorage.removeItem('token');
	Router.push('/auth/login');
}
