import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import React, { ReactChild, ReactChildren } from 'react';
import { useStyles } from '../../styles/auth/styleModalsAuth';
import Layout from '../layout/Layout';

interface Props {
	children: ReactChild | ReactChildren;
}

export default function AuthModal({ children }: Props) {
	const classes = useStyles();

	return (
		<Layout>
			<Card className={classes.root}>
				<CardContent></CardContent>
			</Card>
		</Layout>
	);
}
