"use client"
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { CopyLink } from '@/components/copy-link'
import type { Appreciation } from '@/types/index'
import { toast } from '@/components/toaster'
import { useRouter } from 'next/navigation'
import { useLang } from '../../components/lang-context'
import { UserKPIs } from '../../components/dashboard/kpis'
import { MessagesChart } from '../../components/dashboard/messages-chart'

export default function DashboardPage() {
  const SHOW_AVATAR = false
  const { t } = useLang()
  const [email, setEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState<Appreciation[]>([])
  const [name, setName] = useState<string>('')
  const [editEmail, setEditEmail] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [usernameLocked, setUsernameLocked] = useState<boolean>(false)
  const [saving, setSaving] = useState(false)
  const [total, setTotal] = useState<number>(0)
  const [last7, setLast7] = useState<number>(0)
  const [lastDate, setLastDate] = useState<string>('')
  const [page, setPage] = useState<number>(0)
  const [chartData, setChartData] = useState<{ day: string; count: number }[]>([])
  const [role, setRole] = useState<string>('user')
  const [avatarUrl, setAvatarUrl] = useState<string>('')
  const [uploading, setUploading] = useState(false)
  const PAGE_SIZE = 10
  const router = useRouter()

  const shareUrl = useMemo(() => `${process.env.NEXT_PUBLIC_SITE_URL || ''}/u/${username || ''}` , [username])

  useEffect(() => {
    const supabase = createClient()
    let mounted = true
    ;(async () => {
      setLoading(true)
      const { data: { user } } = await supabase.auth.getUser()
      if (!mounted) return
      if (!user?.email) {
        setEmail(null)
        setItems([])
        setLoading(false)
        return
      }
      setEmail(user.email)
      // ensure profile (non-blocking) without mutating role
      supabase.from('users').upsert({ email: user.email, name: user.user_metadata?.name || null }, { onConflict: 'email' }).then(() => {})
      // load profile
      const { data: profile } = await supabase.from('users').select('name, email, username, created_at, role, avatar_url').eq('email', user.email).maybeSingle()
      if (profile) {
        setName(profile.name || '')
        setEditEmail(profile.email || user.email)
        setUsername(profile.username || (user.email.split('@')[0]))
        setRole(profile.role || 'user')
        setAvatarUrl(profile.avatar_url || '')
        // lock username if already set and account older than 1s
        const created = profile.created_at ? new Date(profile.created_at).getTime() : Date.now()
        setUsernameLocked(!!profile.username || (Date.now() - created > 1000))
      } else {
        setEditEmail(user.email)
        setUsername(user.email.split('@')[0])
      }
      // KPIs
      const [{ count: totalCnt }, { count: last7Cnt }, { data: lastRow }] = await Promise.all([
        supabase.from('appreciations').select('*', { count: 'exact', head: true }).eq('username', (profile?.username || user.email.split('@')[0])),
        supabase.from('appreciations').select('*', { count: 'exact', head: true }).eq('username', (profile?.username || user.email.split('@')[0])).gte('created_at', new Date(Date.now() - 7*24*60*60*1000).toISOString()),
        supabase.from('appreciations').select('created_at').eq('username', (profile?.username || user.email.split('@')[0])).order('created_at', { ascending: false }).limit(1).maybeSingle(),
      ])
      setTotal(totalCnt || 0)
      setLast7(last7Cnt || 0)
      setLastDate((lastRow as any)?.created_at || '')
      // Messages page 1
      const { data } = await supabase
        .from('appreciations')
        .select('*')
        .eq('username', (profile?.username || user.email.split('@')[0]))
        .order('created_at', { ascending: false })
        .range(0, PAGE_SIZE - 1)
      if (!mounted) return
      setItems((data as Appreciation[]) || [])
      setPage(1)
      setLoading(false)

      // Chart data last 14 days
      const since = new Date(Date.now() - 14*24*60*60*1000).toISOString()
      const { data: rows } = await supabase
        .from('appreciations')
        .select('created_at')
        .eq('username', (profile?.username || user.email.split('@')[0]))
        .gte('created_at', since)
      const counts: Record<string, number> = {}
      for (let i = 0; i < 14; i++) {
        const d = new Date()
        d.setDate(d.getDate() - (13 - i))
        const key = new Date(d.getFullYear(), d.getMonth(), d.getDate()).toISOString()
        counts[key] = 0
      }
      ;(rows || []).forEach(r => {
        const d = new Date(r.created_at)
        const key = new Date(d.getFullYear(), d.getMonth(), d.getDate()).toISOString()
        if (counts[key] !== undefined) counts[key]++
      })
      setChartData(Object.keys(counts).sort().map(k => ({ day: k, count: counts[k] })))
    })()
    return () => { mounted = false }
  }, [])

  if (!email) {
    return (
      <div className="container py-16">
        <h1 className="text-2xl font-semibold">Please sign in</h1>
        <Link className="text-brand-600 underline" href="/sign-in">Go to sign in</Link>
      </div>
    )
  }

  return (
    <div className="container py-10 space-y-6">
      {/* Identity header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {SHOW_AVATAR && avatarUrl ? (
            <img src={avatarUrl} alt="Avatar" className="w-12 h-12 rounded-full object-cover" />
          ) : (
            <div aria-hidden className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-semibold">
              {name?.[0]?.toUpperCase() || username?.[0]?.toUpperCase() || 'U'}
            </div>
          )}
          <div>
            <div className="text-xl font-semibold">{name || username}</div>
            <div className="text-xs text-gray-500">{email} · @{username}</div>
          </div>
        </div>
        {role === 'admin' ? (
          <Link href="/admin" className="px-3 py-1.5 border rounded">Go to Admin</Link>
        ) : null}
      </div>
      <h1 className="text-3xl font-bold">{t('your_appreciations')}</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border rounded p-4">
          <h2 className="font-semibold mb-3">{t('profile')}</h2>
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              setSaving(true)
              try {
                const supabase = createClient()
                // Update name in users table
                const payload: any = { email: editEmail, name }
                if (!usernameLocked) payload.username = username
                const { error: upErr } = await supabase.from('users').upsert(payload, { onConflict: 'email' })
                if (upErr) throw upErr
                // Update email in auth if changed
                if (email && editEmail && editEmail !== email) {
                  const { error: authErr } = await supabase.auth.updateUser({ email: editEmail })
                  if (authErr) throw authErr
                  toast.success(t('email_update_sent'))
                } else {
                  toast.success(t('profile_updated'))
                }
              } catch (e: any) {
                toast.error(e.message || t('profile_update_failed'))
              } finally {
                setSaving(false)
              }
            }}
            className="space-y-3"
          >
            <div>
              <label htmlFor="name" className="block text-xs text-gray-500 mb-1">{t('name')}</label>
              <input id="name" aria-label="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs text-gray-500 mb-1">{t('email')}</label>
              <input id="email" aria-label="Email" type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label htmlFor="username" className="block text-xs text-gray-500 mb-1">Username</label>
              <input
                id="username"
                aria-label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase())}
                disabled={usernameLocked}
                pattern="[a-z0-9_]{3,20}"
                title="3-20 chars, lowercase letters, numbers, underscore"
                className="w-full border rounded px-3 py-2"
              />
              {!usernameLocked ? (
                <p className="text-xs text-gray-500 mt-1">Set once. 3-20 chars, lowercase letters, numbers, underscore.</p>
              ) : null}
            </div>
            {SHOW_AVATAR ? (
              <div>
                <label htmlFor="avatar" className="block text-xs text-gray-500 mb-1">Avatar</label>
                <input
                  id="avatar"
                  aria-label="Avatar upload"
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    try {
                      setUploading(true)
                      const supabase = createClient()
                      const { data: { user } } = await supabase.auth.getUser()
                      if (!user) throw new Error('Not authenticated')
                      const ext = file.name.split('.').pop() || 'png'
                      const path = `${user.id}/${Date.now()}.${ext}`
                      const { error: upErr } = await supabase.storage.from('avatars').upload(path, file, { upsert: true })
                      if (upErr) throw upErr
                      const { data: pub } = supabase.storage.from('avatars').getPublicUrl(path)
                      const publicUrl = pub.publicUrl
                      const { error: uErr } = await supabase.from('users').update({ avatar_url: publicUrl }).eq('email', user.email)
                      if (uErr) throw uErr
                      setAvatarUrl(publicUrl)
                      toast.success('Avatar updated')
                    } catch (e: any) {
                      toast.error(e.message || 'Failed to upload avatar')
                    } finally {
                      setUploading(false)
                    }
                  }}
                />
                {uploading ? <p className="text-xs text-gray-500 mt-1">Uploading...</p> : null}
              </div>
            ) : null}
            <div className="flex items-center gap-3">
              <button disabled={saving} className="button-press bg-brand-600 text-white px-4 py-2 rounded">{saving ? t('saving') : t('save_changes')}</button>
            </div>
          </form>
        </div>
        <div className="border rounded p-4">
          <h2 className="font-semibold mb-3">{t('share_link')}</h2>
          {username ? (
            <div className="flex items-center justify-between">
              <code className="text-sm break-all mr-3">{shareUrl}</code>
              <div className="flex items-center gap-2">
                <a aria-label="Preview link" href={shareUrl} target="_blank" rel="noopener noreferrer" className="underline text-sm">Preview</a>
                <CopyLink url={shareUrl} />
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {/* Info banner */}
      <div className="bg-brand-50 border border-brand-100 text-brand-700 text-sm rounded p-3">Keep it positive. Messages should be respectful and kind. Moderation tools are coming soon.</div>
      {/* KPIs */}
      <UserKPIs total={total} last7={last7} lastDate={lastDate} />
      {/* Chart preview */}
      <MessagesChart data={chartData} />
      {loading ? (
        <p className="text-gray-600">{t('loading')}</p>
      ) : (
        <div className="grid gap-4">
          {items.length ? (
            items.map((a) => (
              <div key={a.id} className="border rounded p-4 card-hover">
                <p className="text-gray-800">{a.message}</p>
                <p className="text-xs text-gray-500 mt-2" suppressHydrationWarning>
                  {new Date(a.created_at).toLocaleString('en-US', {
                    timeZone: 'UTC', year: 'numeric', month: '2-digit', day: '2-digit',
                    hour: '2-digit', minute: '2-digit'
                  })}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">{t('no_messages_yet')}</p>
          )}
          {items.length < total ? (
            <div className="text-center">
              <button
                className="px-4 py-2 border rounded"
                onClick={async () => {
                  const supabase = createClient()
                  const from = page * PAGE_SIZE
                  const to = from + PAGE_SIZE - 1
                  const { data } = await supabase
                    .from('appreciations')
                    .select('*')
                    .eq('username', username)
                    .order('created_at', { ascending: false })
                    .range(from, to)
                  setItems(prev => [...prev, ...((data as Appreciation[]) || [])])
                  setPage(p => p + 1)
                }}
              >Load more</button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
