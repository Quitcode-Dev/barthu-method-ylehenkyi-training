import { type NextRequest, NextResponse } from 'next/server'

import { updateSession } from './lib/supabase/middleware'

const protectedPrefixes = ['/dashboard', '/assessment', '/session', '/account', '/admin']
const authRoutes = ['/login', '/register', '/forgot-password', '/reset-password']

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(request)

  const { pathname } = request.nextUrl

  // If user is NOT authenticated and path starts with a protected prefix, redirect to /login
  if (!user && protectedPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/login'
    return NextResponse.redirect(loginUrl)
  }

  // If user IS authenticated and path starts with an auth route, redirect to /dashboard
  if (user && authRoutes.some((route) => pathname.startsWith(route))) {
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
