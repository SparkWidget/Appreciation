'use client'
import Link from 'next/link'
import { Logo } from './logo'
import { useLang } from './lang-context'

export function Footer() {
  const { t } = useLang()
  return (
    <footer className="mt-16 border-t bg-white">
      <div className="container py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-semibold text-gray-900">
              <Logo size={24} />
              <span>Appreciation</span>
            </div>
            <p className="text-sm text-gray-600 max-w-xs">Share and receive anonymous appreciation. Simple, privacy‑first, and fast.</p>
          </div>
          <div>
            <div className="font-semibold text-gray-900">{t('footer_product')}</div>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li><Link href="/" className="hover:underline">{t('overview')}</Link></li>
              <li><Link href="/share" className="hover:underline">{t('share_link_label')}</Link></li>
              <li><Link href="/dashboard" className="hover:underline">{t('dashboard')}</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-gray-900">{t('footer_company')}</div>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li><Link href="/about" className="hover:underline">{t('about')}</Link></li>
              <li><Link href="/contact" className="hover:underline">{t('contact')}</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-gray-900">{t('footer_legal')}</div>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li><Link href="/privacy" className="hover:underline">{t('privacy')}</Link></li>
              <li><Link href="/terms" className="hover:underline">{t('terms')}</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 text-center text-xs text-gray-500 border-t pt-6" suppressHydrationWarning>
          © {new Date().getFullYear()} Appreciation. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
