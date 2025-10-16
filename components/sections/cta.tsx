'use client'
import Link from 'next/link'
import { useLang } from '@/components/lang-context'

export function CTA() {
  const { t } = useLang()
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-50 via-white to-white" />
      <div className="container py-16">
        <div className="mx-auto max-w-3xl text-center rounded-2xl border bg-white/80 backdrop-blur p-10 shadow-sm">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">{t('cta_title')}</h2>
          <p className="mt-3 text-gray-600">{t('cta_subcopy')}</p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Link href="/sign-up" className="bg-brand-600 text-white px-5 py-3 rounded button-press">{t('get_started')}</Link>
            <Link href="/about" className="px-5 py-3 rounded border">{t('cta_learn_more')}</Link>
          </div>
          <div className="mt-6 text-xs text-gray-500">No credit card required</div>
        </div>
      </div>
    </section>
  )
}
