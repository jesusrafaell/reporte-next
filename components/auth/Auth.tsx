//import { Theme } from '@mui/material/styles';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useStyles } from '../../styles/auth/styles';

import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { ReactChild, ReactChildren, useState } from 'react';
import { useRouter } from 'next/router';

const theme = createTheme();

interface Props {
	children: ReactChild | ReactChildren;
}

export default function Auth({ children }: Props) {
	const classes = useStyles();

	const router = useRouter();

	const name: string = router.pathname === '/auth/login' ? 'Iniciar Sesión' : 'Registrarme';

	const [showPassword, setShowPassword] = useState<boolean>(false);

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
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					{router.pathname === '/auth/login' ? <AccountCircleIcon /> : <PersonAddAltIcon />}
				</Avatar>
				<Typography component='h1' variant='h5'>
					{name}
				</Typography>
				<Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					{children}
					<Button type='submit' fullWidth variant='contained' className={classes.button} sx={{ mt: 3, mb: 2 }}>
						{name}
					</Button>
				</Box>
			</Box>
		</Container>
	);
}
