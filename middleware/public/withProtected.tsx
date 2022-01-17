import jwt from 'jsonwebtoken';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Router, { useRouter } from 'next/router';
import React, { Component, FC } from 'react';

const withProtected = (WrappedComponent: any) => {
	return async (props: any) => {
		if (typeof window !== 'undefined') {
			const Router = useRouter();
			const token = localStorage.getItem('token');
			if (!token) {
				Router.replace('/');
				return null;
			}
			return <WrappedComponent {...props} />;
		}
		return null;
	};
};

export default withProtected;
