type KPIData = {
  total_users: number
  total_messages: number
  active_users_90d: number
  avg_messages_per_user: number
}

export function KPICards({ data }: { data: KPIData }) {
  const items = [
    { label: 'Total Users', value: data.total_users },
    { label: 'Total Appreciations', value: data.total_messages },
    { label: 'Active Users (90d)', value: data.active_users_90d },
    { label: 'Avg Messages/User', value: Number(data.avg_messages_per_user).toFixed(2) },
  ]
  return (
    <div className="grid sm:grid-cols-4 gap-4">
      {items.map((k) => (
        <div key={k.label} className="border rounded p-4">
          <div className="text-xs text-gray-500">{k.label}</div>
          <div className="text-2xl font-semibold">{k.value}</div>
        </div>
      ))}
    </div>
  )
}
