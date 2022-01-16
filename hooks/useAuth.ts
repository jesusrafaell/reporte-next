import React, { useEffect, useState } from 'react';
import useAxios from '@/config';

interface User {
	email: string;
}

const useAuth = () => {
	const [user, setUser] = useState<User | null>(null);
	const getDataUser = async () => {
		try {
			const res = await useAxios.get('/api/auth/getUser');
			console.log('Res Auth', res);
			setUser({ email: `${res.data.id}` });
		} catch (error) {
			console.log('remove Token');
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
