import { sessionExpired } from '@/utilis/sweetalert-auth';
import { removeCookies } from 'cookies-next';
import Router from 'next/router';

export const validSession = (err: any) => {
	if (err.response?.status === 401) {
		sessionExpired();
		//localStorage.removeItem('token');
		removeCookies('token');
		Router.push('/auth/login');
	} else {
		console.log(err);
	}
};
