import * as React from 'react';
import { Button, FormControl, IconButton, InputAdornment, MenuItem, Select, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useStyles } from '../../styles/auth/styles';
import Layout from '../../components/layout/Layout';

import Box from '@mui/material/Box';

import Auth from '../../components/auth/Auth';
import { registerValidEmail, registerValidPass } from '../../validation/auth';
import { useState } from 'react';
import { errorFlagInt, FlagInt, UserInt } from './interfaces';

export default function Register() {
	const classes = useStyles();

	const name: string = 'Registrarme';

	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [buttonOn, setButtonOn] = useState<boolean>(false);
	console.log(buttonOn);

	const [errorForm, setErrorForm] = useState<errorFlagInt>({
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

	const register = async (user: UserInt) => {
		try {
			const res = await fetch('/api/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(user),
			});
			setButtonOn(false);
			return await res.json();
		} catch (error) {
			setButtonOn(false);
			console.log(error);
		}
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setButtonOn(true);
		console.log('entre');
		const data = new FormData(event.currentTarget);
		const user: UserInt = {
			email: data.get('email') as string,
			password: data.get('password') as string,
			identTypeId: parseInt(data.get('identType') as string, 10),
			identNum: data.get('identNum') as string,
		};
		//Validar Register
		setErrorForm({
			email: registerValidEmail(user.email),
			password: registerValidPass(user.password, data.get('password2') as string),
			ident_type: false,
			ident_num: false,
		});

		/*
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
		*/
		const validPass = (data: FlagInt) => {
			return Object.keys(data).find((item) => {
				if (data[item]) return true;
			})
				? true
				: false;
		};

		if (
			registerValidEmail(user.email) ||
			validPass(registerValidPass(user.password, data.get('password2') as string))
		) {
			setButtonOn(false);
			return;
		}

		//Endpoint
		register(user).then((data) => {
			console.log(data);
		});
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
						error={errorForm.email}
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
											defaultValue={2}
											label='Tipo'>
											<MenuItem value={3}>J</MenuItem>
											{/*
													<MenuItem value={1}>V</MenuItem>
													<MenuItem value={2}>E</MenuItem>
													<MenuItem value={4}>R</MenuItem>
													<MenuItem value={5}>P</MenuItem>
											*/}
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
						error={
							errorForm.password.rango ||
							errorForm.password.mayus ||
							errorForm.password.minus ||
							errorForm.password.sig
						}
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
						error={errorForm.password.samePass}
					/>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						disabled={buttonOn}
						className={classes.button}
						sx={{ mt: 3, mb: 2 }}>
						{name}
					</Button>
				</Box>
			</Auth>
		</Layout>
	);
}
