"use client"
import Link from 'next/link'
import { LanguageToggle } from './language-toggle'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useLang } from './lang-context'
import { Logo } from './logo'

export function Navbar() {
  const { t } = useLang()
  const [email, setEmail] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()
    let mounted = true
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!mounted) return
      setEmail(user?.email ?? null)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setEmail(session?.user?.email ?? null)
    })
    return () => { mounted = false; sub.subscription.unsubscribe() }
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
      <div className="container h-16 max-h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <Logo size={32} />
          <span>kindverse</span>
        </Link>
        <nav className="flex items-center gap-2 text-sm">
          {email ? (
            <>
              <Link href="/dashboard" className="inline-flex items-center h-9 px-3 rounded-md hover:bg-gray-100 transition">{t('dashboard') || 'Dashboard'}</Link>
              <button
                onClick={async () => {
                  const supabase = createClient()
                  try { await supabase.auth.signOut() } catch {}
                  try { await fetch('/api/auth/signout', { method: 'POST' }) } catch {}
                  router.replace('/')
                  router.refresh()
                }}
                className="inline-flex items-center h-9 px-3 rounded-md bg-red-50 text-red-700 hover:bg-red-100 transition"
              >
                {t('sign_out') || 'Sign out'}
              </button>
            </>
          ) : (
            <>
              <Link href="/sign-in" className="inline-flex items-center h-9 px-3 rounded-md hover:bg-gray-100 transition">{t('sign_in') || 'Sign in'}</Link>
              <Link href="/sign-up" className="inline-flex items-center h-9 px-4 rounded-md bg-brand-600 text-white button-press shadow-sm">{t('get_started') || 'Get Started'}</Link>
            </>
          )}
          <LanguageToggle />
        </nav>
      </div>
    </header>
  )
}
