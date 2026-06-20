import { NextRequest, NextResponse } from 'next/server'
import { AUTH_SESSION_COOKIE, getRequiredRoleForPath, parseSessionValue } from '@/lib/auth'

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl
  const requiredRole = getRequiredRoleForPath(pathname)

  if (!pathname.startsWith('/dashboard')) {
    return NextResponse.next()
  }

  const session = parseSessionValue(request.cookies.get(AUTH_SESSION_COOKIE)?.value)
  if (!session) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (requiredRole && session.role !== requiredRole) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    loginUrl.searchParams.set('reason', 'forbidden')
    return NextResponse.redirect(loginUrl)
  }

  if (searchParams.get('logout') === '1') {
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete(AUTH_SESSION_COOKIE)
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard', '/dashboard/:path*'],
}
