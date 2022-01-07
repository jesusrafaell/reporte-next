import * as React from 'react';
//import { Theme } from '@mui/material/styles';
import { Button, FormControl, IconButton, InputAdornment, MenuItem, Select, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useStyles } from '../../styles/auth/styles';
import Layout from '../../components/layout/Layout';

import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Auth from '../../components/auth/Auth';
import { registerValidEmail, registerValidPass } from '../../validation/auth';
import { useState } from 'react';

const theme = createTheme();

export default function Register() {
	const classes = useStyles();

	const name: string = 'Registrarme';

	const [showPassword, setShowPassword] = useState<boolean>(false);

	const [errorForm, setErrorForm] = useState<any>({
		email: false,
		password: {
			rango: false,
			mayus: false,
			minus: false,
			sig: false,
			samePass: false,
		},
		ident_type: false,
		ident_num: false,
	});

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		//Validar Register
		setErrorForm((prev: any) => {
			return {
				email: registerValidEmail(data.get('email') as string),
				password: registerValidPass(data.get('password') as string, data.get('password2') as string),
				ident_type: false,
				ident_num: false,
			};
		});

		const valid: boolean = Object.keys(errorForm).find((res) => {
			if (typeof errorForm[res] === 'object') {
				return Object.keys(errorForm[res]).find((item) => {
					if (errorForm[res][item]) return true;
				});
			}
			if (errorForm[res]) return true;
		})
			? true
			: false;

		if (valid) return;

		//Endpoint
		console.log('send Fm');
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
						id='identNum'
						label='C.I'
						placeholder='1234567'
						name='identNum'
						autoComplete='text'
						autoFocus
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<FormControl variant='standard' sx={{ m: 1, minWidth: 20 }}>
										<Select
											style={{
												marginLeft: '-.5rem',
												marginBottom: '-.10px',
											}}
											//onChange={changeFmData}
											name='identType'
											//value={fmData.doc_ident_type_ref1}
											defaultValue={'J'}
											label='Tipo'>
											<MenuItem value='J'>J</MenuItem>
											<MenuItem value='V'>V</MenuItem>
											<MenuItem value='P'>P</MenuItem>
										</Select>
									</FormControl>
								</InputAdornment>
							),
						}}
					/>
					<TextField
						margin='normal'
						required
						fullWidth
						name='password'
						label='Contraseña'
						id='password'
						autoComplete='current-password'
						type={showPassword ? 'text' : 'password'}
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton
										aria-label='toggle password visibility'
										onMouseDown={() => setShowPassword(true)}
										onMouseUp={() => setShowPassword(false)}
										edge='end'>
										{showPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
					<TextField
						margin='normal'
						required
						fullWidth
						name='password2'
						label='Confirmar Contraseña'
						type='password'
						id='password2'
						autoComplete='current-password'
					/>
					<Button type='submit' fullWidth variant='contained' className={classes.button} sx={{ mt: 3, mb: 2 }}>
						{name}
					</Button>
				</Box>
			</Auth>
		</Layout>
	);
}
