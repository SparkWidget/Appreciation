import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'

export default async function AdminUsers() {
  const supabase = createClient(await cookies())
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return <div className="container py-16">Please sign in</div>
  const { data: profile } = await supabase.from('users').select('role').eq('email', user.email).maybeSingle()
  if (profile?.role !== 'admin') return <div className="container py-16">Not authorized</div>

  const { data: users } = await supabase.from('users').select('*').order('created_at', { ascending: false })

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-semibold mb-4">Users</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((u) => (
              <tr key={u.id} className="border-b">
                <td className="py-2">{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{new Date(u.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
