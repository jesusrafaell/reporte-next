import type { NextPage } from 'next';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';

const Home: NextPage = () => {
	const [loaded, setLoaded] = useState<boolean>(false);
	useEffect(() => {
		const { pathname } = Router;
		if (pathname == '/') {
			Router.push('/auth/login');
		} else {
			setLoaded(true);
		}
	}, []);

	if (!loaded) {
		return <div>Cargando...</div>;
	}

	return (
		<Layout>
			<h1>Home</h1>
		</Layout>
	);
};

export default Home;
