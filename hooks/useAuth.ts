import React, { useEffect, useState } from 'react';

interface User {
	email: string;
}

const useAuth = () => {
	const [user, setUser] = useState<User | null>(null);
	useEffect(() => {
		//function getUser
	}, []);
	return user;
};

export default useAuth;
