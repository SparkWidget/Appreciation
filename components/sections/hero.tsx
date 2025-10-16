'use client'
import Link from 'next/link'
import { useLang } from '../lang-context'

export function Hero() {
  const { t } = useLang()
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 via-white to-white" />
      <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-brand-200/30 blur-3xl -z-10" />
      <div className="container py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1]">{t('hero_title')}</h1>
          <p className="mt-5 text-lg text-gray-600 max-w-xl">{t('hero_subcopy')}</p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link href="/sign-up" className="bg-brand-600 text-white px-5 py-3 rounded button-press">{t('get_started')}</Link>
            <Link href="#how-it-works" className="px-5 py-3 rounded border">{t('see_how_it_works')}</Link>
          </div>
          <div className="mt-8 flex gap-8 text-sm text-gray-600 justify-center">
            <div><span className="block text-2xl font-bold text-gray-900">2min</span> {t('kpi_setup')}</div>
            <div><span className="block text-2xl font-bold text-gray-900">0$</span> {t('kpi_free')}</div>
            <div><span className="block text-2xl font-bold text-gray-900">RLS</span> {t('kpi_secure')}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
