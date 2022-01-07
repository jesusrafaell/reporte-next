import type { NextPage } from 'next';
import { useRouter } from 'next/router';
//import { useEffect } from 'react';
import Layout from '../components/layout/Layout';

const Home: NextPage = () => {
	const router = useRouter();

	/*
	useEffect(() => {
		console.log(router.pathname);
		if (router.pathname == '/') {
			router.push('/auth/register');
		}
	});
	*/

	return (
		<Layout>
			<h1>Home</h1>
		</Layout>
	);
};

export default Home;
