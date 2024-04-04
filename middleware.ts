import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import serverAuthService from './services/server/server-auth-service';
import { ConfigService } from './services/config-service';
import { isProduction, logVerbose } from './utils/development-utils';
 
export async function middleware(request: NextRequest) {

  const pathname = request.nextUrl.pathname
  logVerbose("Middleware path:", pathname)

  let response = NextResponse.next();

  const { authenticated, authCookies } = await serverAuthService.authenticated(request)

  if (authenticated && (pathname.startsWith(`/login`) || pathname.startsWith(`/register`))) {
    response = NextResponse.redirect(new URL(`/`, request.url))
  } 
  else if (!authenticated && !pathname.startsWith(`/login`) && !pathname.startsWith(`/register`)) {
    response = NextResponse.redirect(new URL(`/login`, request.url))
  }
  if (authCookies) {
    if (!pathname.startsWith(`/login`) && !pathname.startsWith(`/register`)) {
      response = NextResponse.redirect(new URL(pathname, request.url))
    }
    const secure = isProduction()
    const domain = ConfigService.getWebsocketDomain()
    response.cookies.set("authToken", authCookies.authToken, { maxAge: 60 * 10, secure, domain })
    response.cookies.set("refreshToken", authCookies.refreshToken, { maxAge: 60 * 60 * 24 * 30 * 6, secure, sameSite: "lax" })
    response.cookies.set("expiresAt", authCookies.expiresAt, { maxAge: 60 * 60 * 24 * 30 * 6, secure, sameSite: "lax" })
  }
  return response;
}
 
export const config = {
  matcher: [    
    '/((?!api|_next/static|_next/image|favicon.ico|.*\.svg).*)'
  ],
};