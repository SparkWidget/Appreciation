'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { toast } from '@/components/toaster'
import Link from 'next/link'
import type { Route } from 'next'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const supabase = createClient()
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        if ((error as any).message?.toLowerCase().includes('email') && (error as any).message?.toLowerCase().includes('confirm')) {
          await supabase.auth.resend({ type: 'signup', email, options: { emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/sign-in` } })
          throw new Error('Please verify your email. We\'ve re-sent the verification link.')
        }
        throw error
      }
      // Optionally sync profile (non-blocking)
      fetch('/api/users/sync', { method: 'POST' }).catch(() => {})
      router.replace('/dashboard' as Route)
      setTimeout(() => { try { window.location.assign('/dashboard') } catch {} }, 50)
    } catch (err: any) {
      toast.error(err.message || 'Failed to sign in')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container min-h-[calc(100vh-12rem)] py-16 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border bg-white p-8 shadow-sm">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold">Sign in</h1>
            <p className="mt-1 text-sm text-gray-600">Welcome back. Please enter your details.</p>
          </div>
          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-200"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                type="password"
                required
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-200"
              />
            </div>
            <button disabled={loading} className="w-full button-press bg-brand-600 text-white px-4 py-2 rounded">
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
        <p className="mt-4 text-center text-sm text-gray-600">Don't have an account? <Link className="underline" href={'/sign-up' as Route}>Sign up</Link></p>
      </div>
    </div>
  )
}
