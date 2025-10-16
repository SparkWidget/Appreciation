'use client'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts'

export function MessagesChart({ data }: { data: { day: string; count: number }[] }) {
  const formatted = data.map(d => ({ ...d, day: new Date(d.day).toLocaleDateString() }))
  return (
    <div className="border rounded p-4 h-64">
      <div className="text-sm text-gray-600 mb-2">Messages in the last 14 days</div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formatted}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
