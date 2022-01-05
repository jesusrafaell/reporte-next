import type { NextPage } from 'next';
import Head from 'next/head';
//import Image from 'next/image';
import Layout from '../components/layout/Layout';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
	return (
		<div className={styles.container}>
			<Head>
				<title>Reporte BCV</title>
				<link rel='shortcut icon' href='/bvc.ico' />
			</Head>
			<Layout>
				<h1>Layout</h1>
			</Layout>
		</div>
	);
};

export default Home;
