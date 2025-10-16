type Props = {
  total: number
  last7: number
  lastDate: string
}

export function UserKPIs({ total, last7, lastDate }: Props) {
  const items = [
    { label: 'Total Appreciations', value: total },
    { label: 'Last 7 Days', value: last7 },
    { label: 'Last Message', value: lastDate ? new Date(lastDate).toLocaleString() : '—' },
  ]
  return (
    <div className="grid sm:grid-cols-3 gap-4">
      {items.map((k) => (
        <div key={k.label} className="border rounded p-4">
          <div className="text-xs text-gray-500">{k.label}</div>
          <div className="text-xl font-semibold mt-1">{k.value}</div>
        </div>
      ))}
    </div>
  )
}
