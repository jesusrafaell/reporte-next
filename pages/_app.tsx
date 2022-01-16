import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';

import createCache from '@emotion/cache';
import Head from 'next/head';
import { useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import { theme } from '@/styles/themeMaterial';

export const cache = createCache({ key: 'css', prepend: true });

function MyApp({ Component, pageProps }: AppProps) {
	const user = useAuth();
	console.log('(_app):User', user);

	useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement?.removeChild(jssStyles);
		}
	}, []);

	return (
		<CacheProvider value={cache}>
			<Head>
				<title>Reporte BCV</title>
				<link rel='shortcut icon' href='/icon.png' />
				{/*<link rel='manifest' href='/manifest.json' /> */}
			</Head>
			<ThemeProvider theme={theme}>
				<Component {...pageProps} />;
			</ThemeProvider>
		</CacheProvider>
	);
}

export default MyApp;
