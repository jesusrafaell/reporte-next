import { Box, LinearProgress, makeStyles } from '@mui/material';
import type { NextPage } from 'next';
import Router from 'next/router';
import { useContext, useState } from 'react';
import Layout from '@/components/layout/Layout';
import useSafeLayoutEffect from '@/utilis/use-safe-layout-effect';
import AuthContext from '@/stores/authContext';
import Image from 'next/image';
import TranredLogo from '@/images/tranred-logo.png';
import { useStyles } from '@/styles/home';

const Home: NextPage = () => {
	const [loaded, setLoaded] = useState<boolean>(false);
	const { user } = useContext(AuthContext);
	const classes = useStyles();

	useSafeLayoutEffect(() => {
		const { pathname } = Router;
		if (pathname == '/' && !user) {
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
			<div className={classes.base}>
				<Image src={TranredLogo} alt='logo tranred' />
				<div className={classes.title}>Bienvenido al sistema de Reportes Dinámicos</div>
				<div className={classes.subtitle}>
					Haga click en el menu superior izquierdo para navegar entre sistema de reportes
				</div>
			</div>
		</Layout>
	);
};

export default Home;
