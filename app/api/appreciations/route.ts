import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

const schema = z.object({
  username: z.string().min(1),
  message: z.string().min(3).max(1000),
})

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const { username, message } = schema.parse(json)
    const supabase = createClient(await cookies())
    const { error } = await supabase.from('appreciations').insert({ username, message })
    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message || 'Invalid request' }, { status: 400 })
  }
}
