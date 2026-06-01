import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const isAdmin = req.nextUrl.pathname.startsWith('/admin')
  const isLogin = req.nextUrl.pathname === '/admin/login'
  const token   = req.cookies.get('ta_admin_session')

  if (isAdmin && !isLogin && !token) {
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }
  if (isLogin && token) {
    return NextResponse.redirect(new URL('/admin', req.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
}
