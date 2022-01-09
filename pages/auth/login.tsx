import * as React from 'react';
//import { Theme } from '@mui/material/styles';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useStyles } from '../../styles/auth/styles';
import Layout from '../../components/layout/Layout';

import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Auth from '../../components/auth/Auth';
import axios from 'axios';

const theme = createTheme();

export default function Login() {
	const classes = useStyles();

	const name: string = 'Iniciar Sesión';

	const [showPassword, setShowPassword] = React.useState<boolean>(false);

	const login = async () => {
		try {
			const response = await fetch('/api/login', {
				method: 'GET',
			});
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		login();
		// eslint-disable-next-line no-console
	};

	return (
		<Layout>
			<Auth>
				<Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						margin='normal'
						required
						fullWidth
						id='email'
						label='Correo'
						name='email'
						autoComplete='email'
						autoFocus
					/>
					<TextField
						margin='normal'
						required
						fullWidth
						name='password'
						label='Contraseña'
						type={showPassword ? 'text' : 'password'}
						id='password'
						autoComplete='current-password'
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton
										aria-label='toggle password visibility'
										onClick={() => setShowPassword(!showPassword)}
										edge='end'>
										{showPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
					<Button type='submit' fullWidth variant='contained' className={classes.button} sx={{ mt: 3, mb: 2 }}>
						{name}
					</Button>
				</Box>
			</Auth>
		</Layout>
	);
}
