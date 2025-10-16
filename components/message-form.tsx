'use client'
import { useState } from 'react'
import { toast } from './toaster'

export function MessageForm({ username }: { username: string }) {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const MAX = 1000

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return
    setLoading(true)
    try {
      const res = await fetch('/api/appreciations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, message }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed')
      setMessage('')
      toast.success('Message sent!')
    } catch (e: any) {
      toast.error(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your message</label>
        <div className="relative">
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write something kind..."
            maxLength={MAX}
            rows={6}
            className="w-full rounded-lg border border-gray-300 p-4 pr-16 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 placeholder:text-gray-400"
          />
          <div className="pointer-events-none absolute bottom-2 right-3 text-xs text-gray-500">
            {message.length}/{MAX}
          </div>
        </div>
        <p className="text-xs text-gray-500">Keep it positive and respectful. No personal info or sensitive data.</p>
      </div>
      <div className="flex items-center gap-3">
        <button disabled={loading} className="button-press bg-brand-600 text-white px-5 py-2.5 rounded-md shadow-sm">
          {loading ? 'Sending...' : 'Send appreciation'}
        </button>
      </div>
    </form>
  )
}
