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
    <div className="container py-10 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <a href="/admin" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border bg-white hover:bg-gray-50 text-sm font-semibold">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Back
          </a>
          <div>
            <h1 className="text-3xl font-bold">All Appreciations</h1>
            <p className="text-sm text-gray-500">Review recent messages and filter by user or date.</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded border bg-white">Total <strong className="ml-1">{messages?.length ?? 0}</strong></span>
        </div>
      </div>

      <form className="rounded-xl border bg-white p-4 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end" method="get">
        <div className="sm:col-span-2">
          <label className="block text-xs text-gray-500 mb-1">Username</label>
          <input name="username" defaultValue={params?.username || ''} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-200" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Start</label>
          <input type="date" name="start" defaultValue={params?.start || ''} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-200" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">End</label>
          <input type="date" name="end" defaultValue={params?.end || ''} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-200" />
        </div>
        <div className="flex gap-2 sm:col-span-2 lg:col-span-1">
          <button className="button-press bg-brand-600 text-white px-3 py-2 rounded w-full sm:w-auto">Filter</button>
          <a
            className="px-3 py-2 rounded border bg-white hover:bg-gray-50 text-sm inline-flex items-center justify-center"
            href={`/api/admin/export?username=${encodeURIComponent(params?.username || '')}&start=${encodeURIComponent(params?.start || '')}&end=${encodeURIComponent(params?.end || '')}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Export CSV
          </a>
        </div>
      </form>

      <div className="grid gap-3">
        {messages?.map((m) => (
          <div key={m.id} className="rounded-xl border bg-white p-4 shadow-sm">
            <div className="text-gray-900 leading-relaxed">{m.message}</div>
            <div className="text-xs text-gray-500 mt-2">for <span className="font-medium">@{m.username}</span> • {new Date(m.created_at).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
