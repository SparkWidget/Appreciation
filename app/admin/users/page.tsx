import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function AdminUsers() {
  const supabase = createClient(await cookies())
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return <div className="container py-16">Please sign in</div>
  const { data: profile } = await supabase.from('users').select('role').eq('email', user.email).maybeSingle()
  if (profile?.role !== 'admin') return <div className="container py-16">Not authorized</div>

  const { data: users } = await supabase.from('users').select('*').order('created_at', { ascending: false })

  return (
    <div className="container py-10 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border bg-white hover:bg-gray-50 text-sm font-semibold">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Back
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Users</h1>
            <p className="text-sm text-gray-500">All registered users ordered by join date.</p>
          </div>
        </div>
        <div className="hidden md:block text-sm text-gray-500">Total <strong>{users?.length ?? 0}</strong></div>
      </div>
      <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b bg-gray-50">
              <th className="py-2 px-3">Name</th>
              <th className="px-3">Email</th>
              <th className="px-3">Role</th>
              <th className="px-3">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((u) => (
              <tr key={u.id} className="border-b last:border-0">
                <td className="py-2 px-3">{u.name}</td>
                <td className="px-3">{u.email}</td>
                <td className="px-3">{u.role}</td>
                <td className="px-3">{new Date(u.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
