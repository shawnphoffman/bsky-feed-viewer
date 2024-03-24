import { NextResponse } from 'next/server'

import { auth } from './app/auth'

export default auth(req => {
	if (!req.auth && !req.nextUrl.pathname.startsWith('/login')) {
		return NextResponse.redirect(new URL('/login', req.url))
	}
})

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
