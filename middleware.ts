import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import authService from './lib/auth-service';
 
export async function middleware(request: NextRequest) {

  const isAuthenticated = await authService.authenticated(request)

  const prevUrl = request.nextUrl.searchParams.get('url')

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-url', request.url);

  let response = NextResponse.next({request: {
    headers: requestHeaders,
  }});

  if (isAuthenticated && request.nextUrl.pathname.startsWith("/login")) {
    response = NextResponse.redirect(new URL(prevUrl ?? '/', request.url))
  } 
  else if (!isAuthenticated && !request.nextUrl.pathname.startsWith("/login")) {
    response = NextResponse.redirect(new URL('/login', request.url))
  }
  if (response) {
    response.cookies.set("authToken", request.cookies.get("authToken")?.value ?? "")
    response.cookies.set("refreshToken", request.cookies.get("refreshToken")?.value ?? "")
    response.cookies.set("expiresAt", request.cookies.get("expiresAt")?.value ?? "")
  }
  return response;
}
 
export const config = {
  matcher: [
    '/',
    '/home',
    '/login',
    '/post',
    '/profile',
    '/post/:path*',
    '/profile/:path*'
  ],
}