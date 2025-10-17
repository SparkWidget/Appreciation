import Link from 'next/link'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'

export default async function AdminIndex() {
  const supabase = createClient(await cookies())
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return <div className="container py-16">Please sign in</div>

  const { data: profile } = await supabase.from('users').select('role').eq('email', user.email).maybeSingle()
  const isAdmin = profile?.role === 'admin'

  if (!isAdmin) return <div className="container py-16">Not authorized</div>

  return (
    <div className="container py-10 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-gray-500">Quick access to admin sections.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/admin/analytics" className="rounded-xl border bg-white p-6 shadow-sm hover:shadow transition card-hover">
          <div className="text-lg font-semibold">Analytics</div>
          <p className="text-sm text-gray-500 mt-1">Overview of platform activity.</p>
        </Link>
        <Link href="/admin/users" className="rounded-xl border bg-white p-6 shadow-sm hover:shadow transition card-hover">
          <div className="text-lg font-semibold">Users</div>
          <p className="text-sm text-gray-500 mt-1">Manage and review user profiles.</p>
        </Link>
        <Link href="/admin/messages" className="rounded-xl border bg-white p-6 shadow-sm hover:shadow transition card-hover">
          <div className="text-lg font-semibold">Messages</div>
          <p className="text-sm text-gray-500 mt-1">Browse recent appreciations.</p>
        </Link>
      </div>
    </div>
  )
}
