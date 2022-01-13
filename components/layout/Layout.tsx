import React, { ReactChild, ReactChildren } from 'react';
//import Header from './Header'
import Head from 'next/head';
import Navbar from './Navbar';

interface Props {
	children: ReactChild | ReactChildren;
}

export default function Layout({ children }: Props) {
	return (
		<>
			<Navbar />
			<main>{children}</main>
		</>
	);
}
