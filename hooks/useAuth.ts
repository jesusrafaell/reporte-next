import React, { useEffect, useState } from 'react';
import useAxios from '@/config';

interface User {
	email: string;
}

const useAuth = () => {
	const [user, setUser] = useState<User | null>(null);
	const getDataUser = async () => {
		console.log('calling useAuth', localStorage.getItem('token'));
		try {
			const res = await useAxios.get('/api/auth/getUser');
			setUser({ email: `${res.data.email}` });
		} catch (error: any) {
			console.log('remove Token', error?.response);
			localStorage.removeItem('token');
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

	return {
		user,
		setUser,
	};
};

export default useAuth;
