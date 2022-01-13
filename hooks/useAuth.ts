import React, { useEffect, useState } from 'react';

interface User {
	email: string;
}

const useAuth = () => {
	const [user, setUser] = useState<User | null>(null);
	const getDataUser = async () => {
		try {
			const res = await fetch('/api/getUser', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ token: localStorage.getItem('token') }),
			});
			const resJson = await res.json();
			if (res.ok) {
				console.log('Res Auth', resJson);
				setUser({ email: `${resJson.id}` });
				return;
			}
			throw resJson;
		} catch (error) {
			console.log(error);
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
	return user;
};

export default useAuth;
