import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { MessageForm } from '@/components/message-form'

export default async function PublicUserPage({ params }: { params: { username: string } }) {
  const { username } = params
  // No auth required to leave a message
  return (
    <div className="container py-16 max-w-2xl">
      <h2 className="text-2xl font-semibold mb-2">Send appreciation to {username}</h2>
      <p className="text-gray-600 mb-6">Leave a kind note. Keep it positive and respectful.</p>
      <MessageForm username={username} />
    </div>
  )
}
