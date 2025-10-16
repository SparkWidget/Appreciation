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
    <div className="container py-10 space-y-4">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid sm:grid-cols-3 gap-4">
        <Link href="/admin/analytics" className="border rounded p-6 card-hover">Analytics</Link>
        <Link href="/admin/users" className="border rounded p-6 card-hover">Users</Link>
        <Link href="/admin/messages" className="border rounded p-6 card-hover">Messages</Link>
      </div>
    </div>
  )
}
