'use client'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts'

type Point = { day: string; users: number }

export function UserGrowthChart({ data }: { data: Point[] }) {
  const formatted = data.map(d => ({ ...d, day: new Date(d.day).toLocaleDateString() }))
  return (
    <div className="border rounded p-4 h-80 bg-white shadow-sm">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formatted}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="users" stroke="#22c55e" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
