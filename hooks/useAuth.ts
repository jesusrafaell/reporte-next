import React, { useEffect, useState } from 'react';

const useAuth = () => {
	const [user, setUser] = useState<any>(null);
	useEffect(() => {
		//function getUser
	}, []);
	return user;
};

export default useAuth;
