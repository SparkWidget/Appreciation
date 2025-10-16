import { NextResponse, type NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isAdmin = pathname === '/admin' || pathname.startsWith('/admin/')
  if (!isAdmin) return NextResponse.next()

  // Require Supabase cookies for admin area
  const hasToken = req.cookies.has('sb-access-token') || req.cookies.has('sb:access-token')
  if (!hasToken) {
    const url = req.nextUrl.clone()
    url.pathname = '/sign-in'
    url.searchParams.set('redirectedFrom', pathname)
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
