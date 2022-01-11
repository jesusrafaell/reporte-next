import { Box, LinearProgress } from '@mui/material';
import type { NextPage } from 'next';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';

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
		return (
			<Box sx={{ marginTop: '50vh', width: '100%' }}>
				<LinearProgress />
			</Box>
		);
	}

	return (
		<Layout>
			<h1>Welcome to Home, From Tranred</h1>
		</Layout>
	);
};

export default Home;
