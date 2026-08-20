import { type NextRequest, NextResponse } from 'next/server'

import { updateSession } from './lib/supabase/middleware'

/**
 * Route prefixes that require authentication.
 * Unauthenticated visitors are redirected to /login.
 */
const protectedPrefixes = ['/dashboard', '/assessment', '/admin']

/**
 * Auth-related routes that authenticated users should not see.
 * Authenticated visitors are redirected to /dashboard.
 */
const authRoutes = ['/login', '/register']

export async function middleware(request: NextRequest) {
  // Refresh the session (rotates cookies / extends expiry) and retrieve the
  // current user in a single round-trip.
  const { response, user } = await updateSession(request)

  const { pathname } = request.nextUrl

  // Guard protected routes – redirect unauthenticated users to /login
  const isProtected = protectedPrefixes.some((prefix) => pathname.startsWith(prefix))
  if (!user && isProtected) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/login'
    return NextResponse.redirect(loginUrl)
  }

  // Redirect authenticated users away from auth pages to /dashboard
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))
  if (user && isAuthRoute) {
    const dashboardUrl = request.nextUrl.clone()
    dashboardUrl.pathname = '/dashboard'
    return NextResponse.redirect(dashboardUrl)
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
