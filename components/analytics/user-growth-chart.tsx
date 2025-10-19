'use client'
import { Line, LineChart, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts'
import { useSize } from './use-size'

type Point = { day: string; users: number }

export function UserGrowthChart({ data }: { data: Point[] }) {
  let formatted = data.map(d => ({ ...d, day: new Date(d.day).toLocaleDateString() }))
  if (!formatted.length) {
    formatted = [{ day: new Date().toLocaleDateString(), users: 0 }]
  }
  const { ref, width } = useSize()
  const chartW = Math.max(320, (width || 0) - 16)
  const chartH = 280
  return (
    <div ref={ref} className="border rounded p-4 bg-white shadow-sm" style={{ height: 320 }}>
      {chartW > 0 ? (
        <LineChart width={chartW} height={chartH} data={formatted}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis allowDecimals={false} domain={[0, 'auto']} />
          <Tooltip />
          <Line type="monotone" dataKey="users" stroke="#22c55e" strokeWidth={2} dot={false} />
        </LineChart>
      ) : null}
    </div>
  )
}
