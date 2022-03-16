import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import { ReactChild } from 'react';
import { Typography } from '@mui/material';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

interface Props {
	children: ReactChild;
	alertType: AlertColor;
	open: boolean;
	setOpen: (open: boolean) => void;
}

export default function AletCustomSnackbars({ children, alertType, open, setOpen }: Props) {
	const vertical = 'bottom';
	const horizontal = 'center';

	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') return;

		setOpen(false);
	};

	return (
		<Stack spacing={1} sx={{ width: '100%' }}>
			<Snackbar
				anchorOrigin={{
					vertical,
					horizontal,
				}}
				open={open}
				autoHideDuration={6000}>
				<Alert onClose={handleClose} severity={alertType || 'warning'} sx={{ width: '100%' }}>
					<Typography>{children}</Typography>
				</Alert>
			</Snackbar>
		</Stack>
	);
}
