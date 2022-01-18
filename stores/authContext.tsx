import React, { createContext, useState, useEffect } from 'react';
import useAxios from '@/config';
import { authUser } from '@/services/auth.user';
import { ObjString, UserLoginInt } from '@/pages/auth/interfaces';
import Router from 'next/router';
import { setCookies, removeCookies } from 'cookies-next';

export interface User {
	email: string;
	identType: string;
	identNum: string;
}

interface Props {
	children: any;
}

interface Context {
	user: User | null;
	login(user: UserLoginInt | null): ObjString | void | any;
	logout(): void;
}

const AuthContext = createContext<Context>({
	user: null,
	login: () => {},
	logout: () => {},
	//authReady: false,
});

export const AuthContextProvider = ({ children }: Props) => {
	const [user, setUser] = useState<User | null>(null);

	const getDataUser = async () => {
		console.log('calling useAuth');
		try {
			const res = await useAxios.get('/api/auth/getUser');
			setUser(res.data.user);
		} catch (error: any) {
			console.log('remove Token', error?.response);
			localStorage.removeItem('token');
			removeCookies('token');
			setUser(null);
		}
	};

	useEffect(() => {
		if (localStorage.getItem('token')) {
			getDataUser();
		} else {
			setUser(null);
		}
	}, []);

	const login = async (user: UserLoginInt): Promise<ObjString | void> => {
		const res = await authUser.login(user);
		if (res.status !== 200) {
			console.log('Error fallo');
			const data = res.response?.data;
			const resError = {
				type: 'Error',
				message: data.message || 'Error: Api',
				code: data.code || res.response.status || '400',
			};
			return resError;
		}
		const { email, identType, identNum } = res.data.user;
		setUser({
			email,
			identType,
			identNum,
		});
		Router.push('/reportes/afiliado');
	};

	const logout = () => {
		authUser.logout();
		setUser(null);
		Router.push('/auth/login');
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				login,
				logout,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
