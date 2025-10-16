import { createServerClient, type CookieOptions } from '@supabase/ssr'
import type { Cookies } from 'next/headers'

export function createClient(cookies: Cookies) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY
  if (!supabaseUrl || !supabaseKey) throw new Error('Missing Supabase env vars')
  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return cookies.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        try { cookies.set({ name, value, ...options }) } catch {}
      },
      remove(name: string, options: CookieOptions) {
        try { cookies.set({ name, value: '', ...options }) } catch {}
      },
    },
  })
}
