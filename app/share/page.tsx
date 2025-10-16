'use client'
import { useEffect, useMemo, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { CopyLink } from '@/components/copy-link'
import Link from 'next/link'

export default function SharePage() {
  const [email, setEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const username = useMemo(() => email?.split('@')[0] || null, [email])
  const shareUrl = useMemo(() => (username ? `/u/${username}` : ''), [username])

  useEffect(() => {
    const supabase = createClient()
    let mounted = true
    ;(async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!mounted) return
      if (!user?.email) {
        setEmail(null)
        setLoading(false)
        return
      }
      setEmail(user.email)
      setLoading(false)
    })()
    return () => { mounted = false }
  }, [])

  if (!email) {
    return (
      <div className="container py-16">
        <h1 className="text-3xl font-bold mb-2">Your Appreciation Link</h1>
        <p className="text-gray-600 mb-4">Please sign in to view and copy your link.</p>
        <Link href="/sign-in" className="underline text-brand-600">Go to sign in</Link>
      </div>
    )
  }

  return (
    <div className="container py-16 max-w-2xl">
      <h1 className="text-3xl font-bold mb-2">Your Appreciation Link</h1>
      <p className="text-gray-600 mb-6">Share this link so people can send you appreciation messages.</p>
      <div className="border rounded p-4 flex items-center justify-between">
        <code className="text-sm break-all mr-3">{shareUrl}</code>
        <CopyLink url={shareUrl} />
      </div>
      <p className="text-sm text-gray-500 mt-3">Preview: <a className="underline" href={shareUrl} target="_blank" rel="noopener noreferrer">open link</a></p>
    </div>
  )
}
