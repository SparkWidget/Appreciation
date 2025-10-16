'use client'
import { toast } from './toaster'

export function CopyLink({ url }: { url: string }) {
  const onCopy = async () => {
    const absolute = (() => {
      try {
        if (url.startsWith('http://') || url.startsWith('https://')) return url
        return `${window.location.origin}${url.startsWith('/') ? '' : '/'}${url}`
      } catch {
        return url
      }
    })()
    await navigator.clipboard.writeText(absolute)
    toast.success('Link copied to clipboard')
  }
  return (
    <button onClick={onCopy} className="button-press bg-brand-600 text-white px-3 py-2 rounded">Copy your link</button>
  )
}
