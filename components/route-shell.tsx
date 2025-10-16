"use client"
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { Navbar } from './navbar'
import { Footer } from './footer'

export function RouteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const hideChrome = pathname.startsWith('/u/')

  return (
    <div className={hideChrome ? '' : 'pt-16'}>
      {!hideChrome && <Navbar />}
      <main className="min-h-[80vh]">{children}</main>
      {!hideChrome && <Footer />}
    </div>
  )
}
