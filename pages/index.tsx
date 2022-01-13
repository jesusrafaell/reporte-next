import { Box, LinearProgress } from '@mui/material';
import type { NextPage } from 'next';
import Router from 'next/router';
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import useSafeLayoutEffect from '@/utilis/use-safe-layout-effect';

const Home: NextPage = () => {
	const [loaded, setLoaded] = useState<boolean>(false);
	useSafeLayoutEffect(() => {
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
