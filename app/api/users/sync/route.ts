import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const supabase = createClient(await cookies())

  // Optionally accept tokens to set the auth session (ensures HTTP-only cookies exist)
  try {
    const body = await req.json().catch(() => ({})) as { access_token?: string; refresh_token?: string }
    if (body?.access_token && body?.refresh_token) {
      await supabase.auth.setSession({ access_token: body.access_token, refresh_token: body.refresh_token })
    }
  } catch {}

  const { data: { user } } = await supabase.auth.getUser()
  if (!user?.email) return NextResponse.json({ ok: false }, { status: 401 })

  const { error } = await supabase
    .from('users')
    .upsert({ email: user.email, name: (user as any)?.user_metadata?.name || null }, { onConflict: 'email' })
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 400 })
  return NextResponse.json({ ok: true })
}
