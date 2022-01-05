import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((styles: Theme) => ({
	button: {
		background: '#006368',
		textTransform: 'none',
		'&:hover': {
			backgroundColor: styles.palette.primary.light,
		},
	},
}));
