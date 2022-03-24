import React, { createContext, useState, useEffect } from 'react';
import useAxios from '@/config';
import { authUser } from '@/services/auth.user';
import { ObjString, UserLoginInt } from '@/interfaces/auth/interfaces';
import Router from 'next/router';
import { removeCookies, getCookies, setCookies } from 'cookies-next';
import { validSession } from '@/validation/session';

export interface User {
	email: string;
	identType: string;
	identNum: string;
	numAfiliado: string;
}

interface Props {
	children: any;
}

interface Context {
	user: User | null;
	login(user: UserLoginInt | null): Promise<ObjString | void> | void;
	logout(): void;
}

const AuthContext = createContext<Context>({
	user: null,
	login: () => {},
	logout: () => {},
});

export const AuthContextProvider = ({ children }: Props) => {
	const [user, setUser] = useState<User | null>(null);

	const getDataUser = async () => {
		//console.log('calling useAuth');
		try {
			const res = await useAxios.get('/auth/user');
			const { user, token }: { user: User; token: string } = res.data;
			//localStorage.setItem('token', token);
			setCookies('token', token);
			setUser(user);
			//localStorage.setItem('na', user.numAfiliado);
		} catch (error: any) {
			//console.log('remove Token', error?.response);
			setUser(null);
			validSession(error);
		}
	};

	useEffect(() => {
		if (getCookies().token) {
			getDataUser();
		} else {
			setUser(null);
		}
	}, []);

	const login = async (user: UserLoginInt): Promise<ObjString | void> => {
		const res = await authUser.login(user);
		if (res.status !== 200) {
			//console.log('Error fallo');
			const data = res.response?.data;
			const resError = {
				type: 'Error',
				message: data?.message || 'Error: Api',
				code: data?.code || res?.response?.status || '400',
			};
			return resError;
		}
		const { email, identType, identNum, numAfiliado } = res.data.user;
		setUser({
			email,
			identType,
			identNum,
			numAfiliado,
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
