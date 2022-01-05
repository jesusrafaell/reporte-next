import * as React from 'react';
//import { Theme } from '@mui/material/styles';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useStyles } from '../../styles/auth/styles';
import Layout from '../../components/layout/Layout';

import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Auth from '../../components/auth/Auth';

//import AuthModal from '../../components/modals/authModal';

const theme = createTheme();

export default function Login() {
	const classes = useStyles();

	const name: string = 'Iniciar Sesión';

	const [showPassword, setShowPassword] = React.useState<boolean>(false);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		// eslint-disable-next-line no-console
		console.log({
			email: data.get('email'),
			password: data.get('password'),
		});
	};

	return (
		<Layout>
			<Auth>
				<>
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
				</>
			</Auth>
		</Layout>
	);
}
