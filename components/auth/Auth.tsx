//import { Theme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material/styles';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { ReactChild, ReactChildren, useState } from 'react';
import { useRouter } from 'next/router';
import { useStyles } from '@/styles/auth/styles';

const theme = createTheme();

interface Props {
	children: ReactChild | ReactChildren;
}

export default function Auth({ children }: Props) {
	const classes = useStyles();

	const router = useRouter();

	const name: string = router.pathname === '/auth/login' ? 'Iniciar Sesión' : 'Registro';

	const [showPassword, setShowPassword] = useState<boolean>(false);

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
				{children}
			</Box>
		</Container>
	);
}
