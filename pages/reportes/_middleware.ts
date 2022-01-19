// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
	console.log('Middlware', req.cookies.token);
	const token = req.cookies.token;
	if (!token) {
		return NextResponse.redirect('/');
	}
	return NextResponse.next();
}
