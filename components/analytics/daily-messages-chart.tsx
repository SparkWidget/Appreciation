'use client'
import { Line, Area, AreaChart, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts'
import { useSize } from './use-size'

type Point = { day: string; messages_per_day: number }

export function DailyMessagesChart({ data }: { data: Point[] }) {
  let formatted = data.map(d => ({ ...d, day: new Date(d.day).toLocaleDateString() }))
  if (!formatted.length) {
    const today = new Date()
    const tomorrow = new Date(today.getTime() + 24*60*60*1000)
    formatted = [
      { day: today.toLocaleDateString(), messages_per_day: 0 },
      { day: tomorrow.toLocaleDateString(), messages_per_day: 0 },
    ]
  } else if (formatted.length === 1) {
    // Add a synthetic second point to draw a visible line when dot=false
    const d0 = new Date()
    formatted = [
      formatted[0],
      { day: new Date(d0.getTime() + 24*60*60*1000).toLocaleDateString(), messages_per_day: formatted[0].messages_per_day },
    ]
  }
  const { ref, width } = useSize()
  const chartW = Math.max(320, (width || 0) - 16) // padding
  const chartH = 280
  return (
    <div ref={ref} className="border rounded p-4 bg-white shadow-sm w-full" style={{ height: 320 }}>
      {chartW > 0 ? (
        <AreaChart width={chartW} height={chartH} data={formatted} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="day" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} />
          <YAxis allowDecimals={false} domain={[0, (dataMax: number) => (dataMax <= 1 ? 1 : dataMax)]} stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} />
          <Tooltip />
          <Area type="monotone" dataKey="messages_per_day" stroke="#6366f1" fill="#6366f1" fillOpacity={0.15} />
          <Line type="monotone" dataKey="messages_per_day" stroke="#6366f1" strokeWidth={2} dot={{ r: 2, stroke: '#6366f1', fill: '#6366f1' }} activeDot={{ r: 4 }} />
        </AreaChart>
      ) : null}
    </div>
  )
}
