import { NextResponse, type NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl
  const isAdmin = pathname === '/admin' || pathname.startsWith('/admin/')
  if (!isAdmin) return NextResponse.next()
  // If no Supabase auth cookies, send to sign-in with redirect back
  const hasAuthCookie =
    req.cookies.has('sb-access-token') ||
    req.cookies.has('sb-refresh-token') ||
    req.cookies.has('sb:access-token') ||
    req.cookies.has('sb:refresh-token') ||
    req.cookies.getAll().some(c => c.name.startsWith('sb-') || c.name.startsWith('sb:'))
  if (!hasAuthCookie) {
    const url = req.nextUrl.clone()
    url.pathname = '/sign-in'
    url.search = `redirectedFrom=${encodeURIComponent(pathname + (search || ''))}`
    return NextResponse.redirect(url)
  }
  // Let the /admin route render and gate access server-side in the page.
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
