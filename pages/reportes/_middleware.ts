// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req: NextRequest) {
	const token = req.cookies.token;
	if (!token) {
		return NextResponse.redirect('/');
	}

	try {
		jwt.verify(token, process.env.secret!);
		return NextResponse.next();
	} catch (err: any) {
		//Primero tengo que borrar token si tiene
		return NextResponse.redirect('/');
	}
}
