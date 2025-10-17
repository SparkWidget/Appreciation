import { NextResponse, type NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isAdmin = pathname === '/admin' || pathname.startsWith('/admin/')
  if (!isAdmin) return NextResponse.next()
  // Let the /admin route render and gate access server-side in the page.
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
