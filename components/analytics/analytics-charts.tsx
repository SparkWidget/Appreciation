'use client'
import { DailyMessagesChart } from './daily-messages-chart'
import { UserGrowthChart } from './user-growth-chart'
import { useEffect, useState } from 'react'

type Daily = { day: string; messages_per_day: number }
type Growth = { day: string; users: number }

export function AnalyticsCharts({ daily, growth }: { daily: Daily[]; growth: Growth[] }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) {
    return (
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="border rounded p-4 h-80 bg-white shadow-sm" />
        <div className="border rounded p-4 h-80 bg-white shadow-sm" />
      </div>
    )
  }
  return (
    <div className="grid lg:grid-cols-2 gap-6" key="charts-mounted">
      <DailyMessagesChart data={daily} />
      <UserGrowthChart data={growth} />
    </div>
  )
}
