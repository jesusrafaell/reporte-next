import React, { ReactChild, ReactChildren } from 'react';
//import Header from './Header'
import Head from 'next/head';

interface Props {
	children: ReactChild | ReactChildren;
}

export default function Layout({ children }: Props) {
	return (
		<>
			<main>{children}</main>
		</>
	);
}
