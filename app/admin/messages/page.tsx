import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'

export default async function AdminMessages({ searchParams }: { searchParams?: Promise<{ username?: string; start?: string; end?: string }> }) {
  const params = (await searchParams) ?? {}
  const supabase = createClient(await cookies())
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return <div className="container py-16">Please sign in</div>
  const { data: profile } = await supabase.from('users').select('role').eq('email', user.email).maybeSingle()
  if (profile?.role !== 'admin') return <div className="container py-16">Not authorized</div>

  let query = supabase.from('appreciations').select('*').order('created_at', { ascending: false })
  if (params?.username) query = query.eq('username', params.username)
  if (params?.start) query = query.gte('created_at', new Date(params.start).toISOString())
  if (params?.end) query = query.lte('created_at', new Date(params.end).toISOString())
  const { data: messages } = await query

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-semibold mb-4">All Appreciations</h1>
      <form className="flex flex-wrap gap-2 items-end mb-4" method="get">
        <div>
          <label className="block text-xs text-gray-500">Username</label>
          <input name="username" defaultValue={params?.username || ''} className="border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-xs text-gray-500">Start</label>
          <input type="date" name="start" defaultValue={params?.start || ''} className="border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block text-xs text-gray-500">End</label>
          <input type="date" name="end" defaultValue={params?.end || ''} className="border rounded px-2 py-1" />
        </div>
        <button className="button-press bg-brand-600 text-white px-3 py-2 rounded">Filter</button>
        <a
          className="ml-auto underline text-sm"
          href={`/api/admin/export?username=${encodeURIComponent(params?.username || '')}&start=${encodeURIComponent(params?.start || '')}&end=${encodeURIComponent(params?.end || '')}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Export CSV
        </a>
      </form>
      <div className="grid gap-3">
        {messages?.map((m) => (
          <div key={m.id} className="border rounded p-4">
            <div className="text-gray-900">{m.message}</div>
            <div className="text-xs text-gray-500 mt-1">for @{m.username} • {new Date(m.created_at).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
