import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { KPICards } from '@/components/analytics/kpi-cards'
import { DailyMessagesChart } from '@/components/analytics/daily-messages-chart'

export default async function AnalyticsPage() {
  const supabase = createClient(await cookies())
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return <div className="container py-16">Please sign in</div>
  const { data: profile } = await supabase.from('users').select('role').eq('email', user.email).maybeSingle()
  if (profile?.role !== 'admin') return <div className="container py-16">Not authorized</div>

  const { data: totals } = await supabase.rpc('get_kpis')
  const { data: daily } = await supabase.from('analytics_overview').select('*').order('day', { ascending: true })

  return (
    <div className="container py-10 space-y-8">
      <h1 className="text-3xl font-bold">Analytics</h1>
      <KPICards data={totals || { total_users: 0, total_messages: 0, active_users_90d: 0, avg_messages_per_user: 0 }} />
      <DailyMessagesChart data={daily || []} />
    </div>
  )
}
