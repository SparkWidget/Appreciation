'use client'
import { DailyMessagesChart } from './daily-messages-chart'
import { UserGrowthChart } from './user-growth-chart'

type Daily = { day: string; messages_per_day: number }
type Growth = { day: string; users: number }

export function AnalyticsCharts({ daily, growth }: { daily: Daily[]; growth: Growth[] }) {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <DailyMessagesChart data={daily} />
      <UserGrowthChart data={growth} />
    </div>
  )
}
