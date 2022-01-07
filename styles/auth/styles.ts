import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((styles: Theme) => ({
	button: {
		background: styles.palette.primary.main,
		textTransform: 'none',
		'&:hover': {
			backgroundColor: styles.palette.primary.light,
		},
	},
}));
