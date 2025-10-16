import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const username = url.searchParams.get('username') || undefined
  const start = url.searchParams.get('start') || undefined
  const end = url.searchParams.get('end') || undefined

  const supabase = createClient(await cookies())
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { data: profile } = await supabase.from('users').select('role').eq('email', user.email).maybeSingle()
  if (profile?.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  let query = supabase.from('appreciations').select('*').order('created_at', { ascending: false })
  if (username) query = query.eq('username', username)
  if (start) query = query.gte('created_at', new Date(start).toISOString())
  if (end) query = query.lte('created_at', new Date(end).toISOString())
  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  const lines = [
    ['id', 'username', 'message', 'created_at'].join(','),
    ...(data || []).map((r) => [r.id, r.username, JSON.stringify(r.message), r.created_at].join(',')),
  ]
  const csv = lines.join('\n')

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="appreciations.csv"',
    },
  })
}
