import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { KPICards } from '@/components/analytics/kpi-cards'
import { DailyMessagesChart } from '@/components/analytics/daily-messages-chart'
import { UserGrowthChart } from '@/components/analytics/user-growth-chart'

export default async function AnalyticsPage({ searchParams }: { searchParams?: Promise<{ username?: string; start?: string; end?: string }> }) {
  const params = (await searchParams) ?? {}
  const supabase = createClient(await cookies())
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return <div className="container py-16">Please sign in</div>
  const { data: profile } = await supabase.from('users').select('role').eq('email', user.email).maybeSingle()
  if (profile?.role !== 'admin') return <div className="container py-16">Not authorized</div>

  // Date range (default last 30 days)
  const endDate = params.end ? new Date(params.end) : new Date()
  const startDate = params.start ? new Date(params.start) : new Date(endDate.getTime() - 30*24*60*60*1000)
  const startISO = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()).toISOString()
  const endISO = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 23, 59, 59, 999).toISOString()

  // KPIs: count users via row length to avoid count=null edge cases
  const { data: usersAll } = await supabase.from('users').select('id')
  const totalUsersCount = (usersAll || []).length

  // Messages in range (optionally by user)
  let msgsQuery = supabase.from('appreciations').select('id, created_at, username').gte('created_at', startISO).lte('created_at', endISO)
  if (params.username) msgsQuery = msgsQuery.eq('username', params.username)
  const { data: msgs } = await msgsQuery
  const totalMessages = (msgs || []).length

  // Active users (90d) based on appreciations
  const since90 = new Date(Date.now() - 90*24*60*60*1000).toISOString()
  const { data: msgs90 } = await supabase.from('appreciations').select('username, created_at').gte('created_at', since90)
  const activeUsers90 = new Set((msgs90 || []).map(m => m.username)).size

  const avgPerUser = totalUsersCount > 0 ? Number(totalMessages / totalUsersCount) : 0
  const kpis = {
    total_users: Number.isFinite(totalUsersCount) ? totalUsersCount : 0,
    total_messages: Number.isFinite(totalMessages) ? totalMessages : 0,
    active_users_90d: Number.isFinite(activeUsers90) ? activeUsers90 : 0,
    avg_messages_per_user: Number.isFinite(avgPerUser) ? avgPerUser : 0,
  }

  // Daily messages chart (aggregate in Node)
  const dayKey = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).toISOString()
  const counts: Record<string, number> = {}
  for (let d = new Date(startISO); d <= new Date(endISO); d.setDate(d.getDate() + 1)) {
    counts[dayKey(d)] = 0
  }
  ;(msgs || []).forEach(m => {
    const d = new Date(m.created_at)
    const key = dayKey(d)
    if (counts[key] !== undefined) counts[key]++
  })
  const daily = Object.keys(counts).sort().map(k => ({ day: k, messages_per_day: counts[k] }))

  // User growth chart (cumulative users by day)
  const { data: usersCreated } = await supabase.from('users').select('created_at').lte('created_at', endISO)
  const growthCounts: Record<string, number> = {}
  for (let d = new Date(startISO); d <= new Date(endISO); d.setDate(d.getDate() + 1)) {
    growthCounts[dayKey(d)] = 0
  }
  ;(usersCreated || []).forEach(u => {
    const d = new Date(u.created_at)
    const key = dayKey(d)
    if (!growthCounts[key]) growthCounts[key] = 0
    growthCounts[key]++
  })
  // Convert to cumulative
  const growthDays = Object.keys(growthCounts).sort()
  let running = 0
  const userGrowth = growthDays.map(k => { running += growthCounts[k]; return { day: k, users: running } })

  return (
    <div className="container py-10 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-sm text-gray-500">Manage users and appreciation data. View platform statistics.</p>
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
          <button className="button-press bg-brand-600 text-white px-3 py-2 rounded w-full sm:w-auto">Apply</button>
        </div>
      </form>

      <KPICards data={kpis} />
      <div className="grid lg:grid-cols-2 gap-6">
        <DailyMessagesChart data={daily} />
        <UserGrowthChart data={userGrowth} />
      </div>
    </div>
  )
}
