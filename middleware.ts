import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import authService from './lib/auth-service';
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
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    )
  }

  const prevUrl = request.nextUrl.searchParams.get('url')

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-url', request.nextUrl.pathname);

  let response = NextResponse.next({request: {
    headers: requestHeaders,
  }});

  const isAuthenticated = await authService.authenticated(request)

  if (isAuthenticated && pathname.startsWith(`/${locale}/login`)) {
    response = NextResponse.redirect(prevUrl ? new URL(prevUrl) : new URL(`/${locale}/`, request.url))
  } 
  else if (!isAuthenticated && !pathname.startsWith(`/${locale}/login`) && !pathname.startsWith(`/${locale}/register`)) {
    response = NextResponse.redirect(new URL(`/${locale}/login`, request.url))
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
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ],
};

function getLocale(request: NextRequest) {
  
  const languages = new Negotiator({headers: {'accept-language': 'en-US,en;q=0.5'}}).languages()
  const defaultLocale = 'en'
  
  return match(languages, locales, defaultLocale)
}