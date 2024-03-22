import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import clientAuthService from './services/client/client-auth-service';
import { ConfigService } from './services/config-service';
 
export async function middleware(request: NextRequest) {

  const pathname = request.nextUrl.pathname

  let response = NextResponse.next();

  const { authenticated, authCookies } = await clientAuthService.authenticated(request)

  if (authenticated && pathname.startsWith(`/login`)) {
    response = NextResponse.redirect(new URL(`/`, request.url))
  } 
  else if (!authenticated && !pathname.startsWith(`/login`) && !pathname.startsWith(`/register`)) {
    response = NextResponse.redirect(new URL(`/login`, request.url))
  }
  if (authCookies) {
    response = NextResponse.redirect(new URL(pathname, request.url))
    const secure = process.env.NODE_ENV == 'production'
    const domain = ConfigService.getWebsocketDomain()
    response.cookies.set("authToken", authCookies.authToken, { maxAge: 60 * 10, secure, domain })
    response.cookies.set("refreshToken", authCookies.refreshToken, { maxAge: 60 * 60 * 24 * 30 * 6, secure, sameSite: "strict" })
    response.cookies.set("expiresAt", authCookies.expiresAt, { maxAge: 60 * 10, secure, sameSite: "strict" })
  }
  return response;
}
 
export const config = {
  matcher: [    
    '/((?!api|_next/static|_next/image|favicon.ico|.*\.svg).*)'
  ],
};