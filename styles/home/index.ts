import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import TranredLogo from '@/images/tranred-logo.png';

export const useStyles = makeStyles((styles: Theme) => ({
	base: {
		display: 'flex',
		width: '100%',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '2rem',
	},
	title: {
		fontSize: 40,
		padding: '1rem 0',
	},
	subtitle: {
		fontSize: 24,
		padding: '1rem',
		opacity: 0.6,
	},
	imgLogo: {
		position: 'absolute',
		bottom: '3rem',
		right: '3rem',
		width: '30vh',
	},
}));
