'use client'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts'

type Point = { day: string; messages_per_day: number }

export function DailyMessagesChart({ data }: { data: Point[] }) {
  const formatted = data.map(d => ({ ...d, day: new Date(d.day).toLocaleDateString() }))
  return (
    <div className="border rounded p-4 h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formatted}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="messages_per_day" stroke="#6366f1" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
