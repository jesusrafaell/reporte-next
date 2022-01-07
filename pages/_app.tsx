import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { CacheProvider } from '@emotion/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import createCache from '@emotion/cache';
import Head from 'next/head';
import { useEffect } from 'react';

const theme = createTheme({
	palette: {
		primary: {
			main: '#2f3775',
			contrastText: '#ffffff',
		},
		secondary: {
			main: '#dff2ff',
		},
	},
});

export const cache = createCache({ key: 'css', prepend: true });

function MyApp({ Component, pageProps }: AppProps) {
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
				<link rel='shortcut icon' href='/bvc.ico' />
			</Head>
			<ThemeProvider theme={theme}>
				<Component {...pageProps} />;
			</ThemeProvider>
		</CacheProvider>
	);
}

export default MyApp;
