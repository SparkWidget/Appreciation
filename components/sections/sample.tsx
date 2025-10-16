export function Showcase() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold">Showcase</h2>
          <p className="text-gray-600 mt-2">KPIs, trends, and messages—everything in one clean place.</p>
        </div>
        <div className="mt-10 grid lg:grid-cols-3 gap-6">
          {/* KPIs card */}
          <div className="bg-white border rounded-xl p-6 lg:col-span-1">
            <h3 className="font-semibold mb-4">Your KPIs</h3>
            <div className="grid grid-cols-3 gap-4">
              {[{label:'Total', value:'128'}, {label:'7 days', value:'24'}, {label:'Last', value:'Today'}].map(k => (
                <div key={k.label} className="rounded-lg border p-3 text-center">
                  <div className="text-2xl font-bold">{k.value}</div>
                  <div className="text-xs text-gray-500">{k.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Chart + Messages card */}
          <div className="bg-white border rounded-xl p-6 lg:col-span-2">
            <h3 className="font-semibold mb-4">Activity</h3>
            {/* Simple chart mock */}
            <div className="h-40 w-full bg-gradient-to-b from-brand-50 to-white border rounded-lg relative overflow-hidden">
              <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(to_top_right,_rgba(99,102,241,0.35),_rgba(99,102,241,0))]" />
              <div className="absolute inset-0 grid grid-cols-12 opacity-30">
                {Array.from({length:12}).map((_,i)=>(<div key={i} className="border-r" />))}
              </div>
            </div>
            <div className="mt-6 grid md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-2">Recent messages</div>
                <ul className="space-y-2 text-sm">
                  {['You are awesome!','Thanks for the help on the project.','Your talk inspired me.'].map((m,i)=>(
                    <li key={i} className="p-3 bg-gray-50 rounded">{m}</li>
                  ))}
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-2">Share link</div>
                <div className="flex items-center justify-between gap-2">
                  <code className="text-xs break-all">https://yourapp.com/u/yourname</code>
                  <button className="px-3 py-1.5 text-xs bg-brand-600 text-white rounded">Copy</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Backwards compatibility: keep existing import usages working
export function Sample() {
  return <Showcase />
}
