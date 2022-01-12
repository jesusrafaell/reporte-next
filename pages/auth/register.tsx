import * as React from 'react';
import { Button, FormControl, IconButton, InputAdornment, MenuItem, Select, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useStyles } from '@/styles/auth/styles';
import Layout from '@/components/layout/Layout';

import Router from 'next/router';

import Box from '@mui/material/Box';

import Auth from '@/components/auth/Auth';
import { validEmail, validPass, validIdentNum } from '@/validation/auth';
import { useState } from 'react';
import { errorFlagInt, FlagInt, UserInt } from './interfaces';
import { validArrayBooelan } from 'utilis/validBoolean';
import Swal from 'sweetalert2';

export default function Register() {
	const classes = useStyles();

	const name: string = 'Registrarme';

	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [buttonOn, setButtonOn] = useState<boolean>(false);

	const [errorForm, setErrorForm] = useState<errorFlagInt>({
		email: false,
		password: {
			rango: false,
			mayus: false,
			minus: false,
			sig: false,
			samePass: false,
		},
		identType: false,
		identNum: false,
	});

	const successRegister = () => {
		Swal.fire({
			position: 'center',
			icon: 'success',
			title: 'Usuario Registrado',
			showConfirmButton: false,
			timer: 2000,
		});
		Router.push('/auth/login');
	};

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
			if (res.ok) {
				successRegister();
				return await res.json();
			} else throw await res.json();
		} catch (err: any) {
			setButtonOn(false);
			const resError = {
				type: 'Error',
				message: err.message || 'Error in Api',
				code: err.code || '401',
			};
			console.log(resError);
			return resError;
		}
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setButtonOn(true);
		const data = new FormData(event.currentTarget);
		const user: UserInt = {
			email: data.get('email') as string,
			password: data.get('password') as string,
			identTypeId: parseInt(data.get('identType') as string, 10),
			identNum: data.get('identNum') as string,
		};
		//Validar Register
		setErrorForm({
			email: validEmail(user.email),
			password: validPass(user.password, data.get('password2') as string),
			identType: false,
			identNum: validIdentNum(user.identNum),
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

		if (
			validEmail(user.email) ||
			validArrayBooelan(validPass(user.password, data.get('password2') as string)) ||
			validIdentNum(user.identNum)
		) {
			setButtonOn(false);
			return;
		}

		//Endpoint
		register(user);
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
						helperText={errorForm.email && 'Email Invalido!'}
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
						error={errorForm.identNum}
						helperText={errorForm.identNum && 'El numero de documento de identidad es invalido'}
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
											defaultValue={3}
											label='Tipo'>
											<MenuItem value={3}>J</MenuItem>
											<MenuItem value={1}>V</MenuItem>
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
						helperText={
							(errorForm.password.rango ||
								errorForm.password.mayus ||
								errorForm.password.minus ||
								errorForm.password.sig) &&
							'La contraseña debe tener entre 8 a 12 caracters, al menos una MAYUSCULA, al menos 1 minuscula, al menos 1 carater (#,$,*,@,!...)'
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
						helperText={errorForm.password.samePass && 'Las contraseñas deben ser iguales'}
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
