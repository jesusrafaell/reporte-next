import * as React from 'react';
//import { Theme } from '@mui/material/styles';
import { Button, FormControl, IconButton, InputAdornment, MenuItem, Select, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useStyles } from '../../styles/auth/styles';
import Layout from '../../components/layout/Layout';

import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Auth from '../../components/auth/Auth';

//import AuthModal from '../../components/modals/authModal';

const theme = createTheme();

export default function Register() {
	const classes = useStyles();

	const name: string = 'Registrarme';

	const [showPassword, setShowPassword] = React.useState<boolean>(false);
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		// eslint-disable-next-line no-console
		console.log({
			email: data.get('email'),
			password: data.get('password'),
			confirm_password: data.get('password2'),
		});
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
						autoComplete='email'
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
											name='doc_ident_type_ref1'
											//value={fmData.doc_ident_type_ref1}
											label='Tipo'>
											<MenuItem value='V'>V</MenuItem>
											<MenuItem value='J'>J</MenuItem>
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
						name='password'
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
