import { UserInt, UserLoginInt } from '@/interfaces/auth/interfaces';
import useAxios from '@/config';
import { AxiosResponse } from 'axios';
import Router from 'next/router';
import { successLogin, successRegister } from '@/utilis/sweetalert-auth';
import { setCookies, removeCookies } from 'cookies-next';

export const authUser = {
	login,
	register,
	logout,
};

async function login(user: UserLoginInt) {
	try {
		const res: AxiosResponse<any> = await useAxios.post('/auth/login', user);
		//console.log(res.data.user);
		setCookies('token', res.data.token);
		//localStorage.setItem('token', res.data.token);
		successLogin(`${res.data.user.email}`);
		return res;
	} catch (err: any) {
		//console.log(resError);
		return err;
	}
}

async function register(user: UserInt) {
	try {
		const res: AxiosResponse<any> = await useAxios.post('/auth/register', user);
		//console.log('Register ok', res);
		Router.push('/auth/login');
		successRegister();
	} catch (err: any) {
		console.log(err);
		const data = err.response?.data;
		const resError = {
			type: 'Error',
			message: data?.message || 'Error: Api',
			code: data?.code || err?.response?.status || '400',
		};
		console.log(resError);
		return resError;
	}
}

function logout() {
	removeCookies('token');
	//localStorage.removeItem('token');
}
