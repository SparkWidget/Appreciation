'use client'
import { DailyMessagesChart } from './daily-messages-chart'
import { UserGrowthChart } from './user-growth-chart'
import { useEffect, useState } from 'react'

type Daily = { day: string; messages_per_day: number }
type Growth = { day: string; users: number }

export function AnalyticsCharts({ daily, growth }: { daily: Daily[]; growth: Growth[] }) {
  const [mounted, setMounted] = useState(false)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  useEffect(() => {
    if (!mounted) return
    const id = setTimeout(() => {
      try { window.dispatchEvent(new Event('resize')) } catch {}
      setReady(true)
    }, 50)
    return () => clearTimeout(id)
  }, [mounted])
  useEffect(() => {
    if (ready) {
      try { console.info('[AnalyticsCharts] daily points:', daily?.length || 0, 'growth points:', growth?.length || 0) } catch {}
    }
  }, [ready, daily, growth])
  if (!mounted || !ready) {
    return (
      <div className="grid lg:grid-cols-2 gap-6 w-full">
        <div className="border rounded p-4 h-80 bg-white shadow-sm w-full" />
        <div className="border rounded p-4 h-80 bg-white shadow-sm w-full" />
      </div>
    )
  }
  return (
    <div className="grid lg:grid-cols-2 gap-6 w-full" key="charts-mounted">
      <div className="space-y-2">
        <div className="text-sm text-gray-600 font-medium">Daily Messages</div>
        <DailyMessagesChart data={daily} />
        <div className="text-xs text-gray-400">Points: {daily?.length || 0}</div>
      </div>
      <div className="space-y-2">
        <div className="text-sm text-gray-600 font-medium">User Growth</div>
        <UserGrowthChart data={growth} />
        <div className="text-xs text-gray-400">Points: {growth?.length || 0}</div>
      </div>
    </div>
  )
}
