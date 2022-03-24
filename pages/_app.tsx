import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';

import createCache from '@emotion/cache';
import Head from 'next/head';
import { useEffect } from 'react';
import { theme } from '@/styles/themeMaterial';

import { AuthContextProvider } from '@/stores/authContext';

export const cache = createCache({ key: 'css', prepend: true });

function MyApp({ Component, pageProps }: AppProps) {
	/*
	useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement?.removeChild(jssStyles);
		}
	}, []);
	*/

	return (
		<>
			<Head>
				<title>Reportes Next</title>
				<link rel='shortcut icon' href='/icon.png' />
			</Head>
			<ThemeProvider theme={theme}>
				<AuthContextProvider>
					<Component {...pageProps} />;
				</AuthContextProvider>
			</ThemeProvider>
		</>
	);
}

export default MyApp;
