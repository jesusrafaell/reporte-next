import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useStylesNav } from '@/styles/navbar/navStyle';

import Link from 'next/link';
import { useContext } from 'react';
import AuthContext from '@/stores/authContext';
import useSafeLayoutEffect from '@/utilis/use-safe-layout-effect';

const pagesInit = [
	{
		name: 'Iniciar sesión',
		path: '/auth/login',
	},
	{
		name: 'Registrarme',
		path: '/auth/register',
	},
];

const PagesInitUser = [
	{
		name: 'Reportes',
		path: '/reportes/afiliado',
	},
];

//const settings = ['Cerrar sesión'];

export default function NavBar() {
	const { user, logout } = useContext(AuthContext);

	const [pages, setPages] = React.useState<any[]>(pagesInit);

	useSafeLayoutEffect(() => {
		if (user) {
			setPages(PagesInitUser);
		} else {
			setPages(pagesInit);
		}
	}, [user]);

	const name = 'Tranred';

	const classes = useStylesNav();

	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<AppBar position='static'>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					<Link href='/' passHref>
						<Typography
							variant='h6'
							noWrap
							component='div'
							sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, cursor: 'pointer' }}>
							{name}
						</Typography>
					</Link>

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size='large'
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleOpenNavMenu}
							color='inherit'>
							<MenuIcon />
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}>
							{pages.map((page) => (
								<span key={page.name}>
									<Link href={page.path} passHref>
										<MenuItem onClick={handleCloseNavMenu}>
											<Typography textAlign='center'>{page.name}</Typography>
										</MenuItem>
									</Link>
								</span>
							))}
						</Menu>
					</Box>
					<Typography
						variant='h6'
						noWrap
						component='div'
						sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						{name}
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages.map((page) => (
							<span key={page.name}>
								<Link href={page.path} passHref>
									<MenuItem onClick={handleCloseNavMenu}>
										<Typography textAlign='center'>{page.name}</Typography>
									</MenuItem>
								</Link>
							</span>
						))}
					</Box>
					{user ? (
						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title='Opciones'>
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Typography style={{ marginRight: '10px', color: '#fff' }} variant='h6' noWrap>
										{user.email || 'Mi Cuenta'}
									</Typography>
									<Avatar alt='Cliente' />
								</IconButton>
							</Tooltip>
							<Menu
								sx={{ mt: '45px' }}
								id='menu-appbar'
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}>
								<MenuItem onClick={handleCloseNavMenu}>
									<Typography textAlign='center' onClick={logout}>
										Cerrar sesión
									</Typography>
								</MenuItem>
							</Menu>
						</Box>
					) : null}
				</Toolbar>
			</Container>
		</AppBar>
	);
}
