import * as React from 'react';
//import { Theme } from '@mui/material/styles';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useStyles } from '@/styles/auth/styles';
import Layout from '@/components/layout/Layout';
import Auth from '@/components/auth/Auth';
import Box from '@mui/material/Box';
import AletCustomSnackbars from '@/components/alert/alert-custom-snackbars';
import { useState } from 'react';
import { validEmail } from '@/validation/auth';
import { FlagInt } from './interfaces';

interface User {
	email: string;
	password: string;
}

export default function Login() {
	const classes = useStyles();

	const name: string = 'Iniciar Sesión';

	const [showPassword, setShowPassword] = useState<boolean>(false);

	const [alert, setAlert] = useState<boolean>(false);
	const [error, setError] = useState<string>('Error');

	const [errorForm, setErrorForm] = useState<FlagInt>({
		email: false,
		password: false,
	});

	const login = async (user: User) => {
		try {
			const res = await fetch('/api/authenticate', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(user),
			});
			if (res.ok) {
				const { user, token } = await res.json();
				console.log(user);
				console.log(token);
				localStorage.setItem('token', token);
				return { user, token };
			}
			throw await res.json();
		} catch (err: any) {
			const resError = {
				type: 'Error',
				message: err.message || 'Error in Api',
				code: err.code || '401',
			};
			setError(err.message);
			setAlert(true);
			return resError;
		}
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setAlert(false);
		const data = new FormData(event.currentTarget);
		const user: User = {
			email: data.get('email') as string,
			password: data.get('password') as string,
		};
		setErrorForm({
			email: validEmail(user.email),
			password: user.password.length < 8 ? true : false,
		});

		if (validEmail(user.email) || user.password.length < 8 ? true : false) {
			setAlert(true);
			setError('Todos los campos son requeridos');
			return;
		}

		await login(user);
		//console.log('test', res);
		//eslint-disable-next-line no-console
	};

	return (
		<Layout>
			<>
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
							error={errorForm.email}
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
							error={errorForm.password}
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
				<AletCustomSnackbars alertType='error' open={alert} setOpen={setAlert}>
					{error}
				</AletCustomSnackbars>
			</>
		</Layout>
	);
}
