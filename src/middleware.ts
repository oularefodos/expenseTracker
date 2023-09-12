import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

    const { pathname } = request.nextUrl;
    const isPrivatePath = pathname === '/profile' || pathname === '/expenses'
    const token = request.cookies.get('token')?.value;

    if (isPrivatePath && !token ) {
        return NextResponse.redirect(new URL("/", request.url));
    }
    if (!isPrivatePath && token) {
        return NextResponse.redirect(new URL('/profile', request.url));
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/expenses',
    '/profile'
  ],
}