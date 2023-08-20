import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import authService from './services/auth-service';
import Negotiator from 'negotiator';
import { match } from '@formatjs/intl-localematcher';

const locales = ['en']
 
export async function middleware(request: NextRequest) {

  const pathname = request.nextUrl.pathname
  const locale = getLocale(request)

  // ** Direct to locale page **
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )
  if (pathnameIsMissingLocale) {
    return NextResponse.rewrite(
      new URL(`/${locale}${pathname}`, request.url)
    )
  }

  let response = NextResponse.next();

  const { authenticated, authCookies } = await authService.authenticated(request)

  if (authenticated && pathname.startsWith(`/${locale}/login`)) {
    response = NextResponse.redirect(new URL(`/${locale}/`, request.url))
  } 
  else if (!authenticated && !pathname.startsWith(`/${locale}/login`) && !pathname.startsWith(`/${locale}/register`)) {
    response = NextResponse.redirect(new URL(`/${locale}/login`, request.url))
  }
  if (authCookies) {
    response = NextResponse.redirect(new URL(pathname, request.url))
    response.cookies.set("authToken", authCookies.authToken, { maxAge: 60 * 10 })
    response.cookies.set("refreshToken", authCookies.refreshToken, { maxAge: 60 * 60 * 24 * 30 * 6 })
    response.cookies.set("expiresAt", authCookies.expiresAt, { maxAge: 60 * 10 })
  }
  return response;
}
 
export const config = {
  matcher: [    
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ],
};

function getLocale(request: NextRequest) {

  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))
  
  const languages = new Negotiator({headers: negotiatorHeaders}).languages()
  const defaultLocale = 'en'
  
  return match(languages, locales, defaultLocale)
}