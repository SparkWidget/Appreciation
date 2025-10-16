"use client"
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

type Lang = 'en' | 'bn'

type Dict = Record<string, string>

const en: Dict = {
  your_appreciations: 'Your Appreciations',
  profile: 'Profile',
  name: 'Name',
  email: 'Email',
  email_update_sent: 'Email update sent. Please verify the new email.',
  profile_updated: 'Profile updated',
  profile_update_failed: 'Failed to update profile',
  saving: 'Saving... ',
  save_changes: 'Save changes',
  share_link: 'Share link',
  loading: 'Loading...',
  no_messages_yet: 'No messages yet. Share your link to start receiving appreciation!',
  dashboard: 'Dashboard',
  sign_in: 'Sign in',
  sign_out: 'Sign out',
  get_started: 'Get Started',
  hero_title: 'A simple way to receive anonymous appreciation',
  hero_subcopy: 'Create your link, share it, and watch the gratitude roll in. Privacy-first, fast, and designed for teams and communities.',
  see_how_it_works: 'See how it works',
  kpi_setup: 'setup',
  kpi_free: 'forever free',
  kpi_secure: 'secure by default',
  features_title: 'Everything you need to start',
  features_subcopy: 'From secure auth to insightful analytics—no setup headaches.',
  f_secure_auth: 'Secure Auth',
  f_secure_auth_desc: 'Email & password with verification, powered by Supabase.',
  f_personal_link: 'Personal Link',
  f_personal_link_desc: 'Choose a unique username for /u/username sharing.',
  f_anonymous_form: 'Anonymous Form',
  f_anonymous_form_desc: 'Fast, accessible, and protected against abuse.',
  f_user_dashboard: 'User Dashboard',
  f_user_dashboard_desc: 'View messages, copy link, and manage profile.',
  f_admin_analytics: 'Admin Analytics',
  f_admin_analytics_desc: 'KPIs, charts, and CSV export for deeper insights.',
  f_rls_default: 'RLS by Default',
  f_rls_default_desc: 'Row-level security baked into the database.',
  cards_anonymous_safe: 'Anonymous & Safe',
  cards_anonymous_safe_desc: 'No sign-in needed to send appreciation.',
  cards_realtime_dashboard: 'Real-time Dashboard',
  cards_realtime_dashboard_desc: 'See messages instantly in your dashboard.',
  cards_actionable_analytics: 'Actionable Analytics',
  cards_actionable_analytics_desc: 'Understand platform usage at a glance.',
  cards_secure_default: 'Secure by Default',
  cards_secure_default_desc: 'RLS-enabled database keeps data safe.',
  cards_fast_setup: 'Fast Setup',
  cards_fast_setup_desc: 'Create your link and share in minutes.',
  cards_built_to_grow: 'Built to Grow',
  cards_built_to_grow_desc: 'Free today, add paid plans later.',
  cta_title: 'Start sharing gratitude today',
  cta_subcopy: 'Create your link in minutes. It’s free and privacy‑first.',
  cta_learn_more: 'Learn more',
  footer_product: 'Product',
  footer_company: 'Company',
  footer_legal: 'Legal',
  overview: 'Overview',
  share_link_label: 'Share Link',
  about: 'About',
  contact: 'Contact',
  privacy: 'Privacy',
  terms: 'Terms',
  showcase_title: 'Showcase',
  showcase_kpis: 'Your KPIs',
  activity: 'Activity',
  recent_messages: 'Recent messages',
  copy: 'Copy'
}

const bn: Dict = {
  your_appreciations: 'আপনার প্রশংসা',
  profile: 'প্রোফাইল',
  name: 'নাম',
  email: 'ইমেইল',
  email_update_sent: 'ইমেইল আপডেট পাঠানো হয়েছে। অনুগ্রহ করে নতুন ইমেইল যাচাই করুন।',
  profile_updated: 'প্রোফাইল আপডেট হয়েছে',
  profile_update_failed: 'প্রোফাইল আপডেট ব্যর্থ হয়েছে',
  saving: 'সংরক্ষণ হচ্ছে...',
  save_changes: 'সংরক্ষণ করুন',
  share_link: 'শেয়ার লিংক',
  loading: 'লোড হচ্ছে...',
  no_messages_yet: 'কোন বার্তা নেই। আপনার লিংক শেয়ার করুন এবং প্রশংসা পেতে শুরু করুন!',
  dashboard: 'ড্যাশবোর্ড',
  sign_in: 'সাইন ইন',
  sign_out: 'সাইন আউট',
  get_started: 'শুরু করুন',
  hero_title: 'বেনামী প্রশংসা পাওয়ার সহজ উপায়',
  hero_subcopy: 'আপনার লিংক তৈরি করুন, শেয়ার করুন এবং কৃতজ্ঞতার বার্তা পেতে থাকুন। গোপনীয়তা-প্রথম, দ্রুত, দল এবং কমিউনিটির জন্য উপযোগী।',
  see_how_it_works: 'কিভাবে কাজ করে দেখুন',
  kpi_setup: 'সেটআপ',
  kpi_free: 'চিরদিন ফ্রি',
  kpi_secure: 'ডিফল্টভাবে সুরক্ষিত',
  features_title: 'শুরু করার জন্য যা যা দরকার',
  features_subcopy: 'সিকিউর অথ থেকে ইনসাইটফুল অ্যানালিটিক্স—কোন ঝামেলা ছাড়া।',
  f_secure_auth: 'সিকিউর অথ',
  f_secure_auth_desc: 'ইমেইল ও পাসওয়ার্ড ভেরিফিকেশনসহ, সুপাবেস দ্বারা চালিত।',
  f_personal_link: 'পার্সোনাল লিংক',
  f_personal_link_desc: '/u/username শেয়ারিংয়ের জন্য ইউনিক ইউজারনেম বেছে নিন।',
  f_anonymous_form: 'বেনামী ফর্ম',
  f_anonymous_form_desc: 'দ্রুত, অ্যাক্সেসিবল এবং অপব্যবহার থেকে সুরক্ষিত।',
  f_user_dashboard: 'ইউজার ড্যাশবোর্ড',
  f_user_dashboard_desc: 'মেসেজ দেখুন, লিংক কপি করুন এবং প্রোফাইল ম্যানেজ করুন।',
  f_admin_analytics: 'অ্যাডমিন অ্যানালিটিক্স',
  f_admin_analytics_desc: 'কেপিআই, চার্ট এবং CSV এক্সপোর্ট।',
  f_rls_default: 'ডিফল্ট RLS',
  f_rls_default_desc: 'ডাটাবেজে রো-লেভেল সিকিউরিটি বিল্ট-ইন।',
  cards_anonymous_safe: 'বেনামী ও নিরাপদ',
  cards_anonymous_safe_desc: 'প্রশংসা পাঠাতে সাইন-ইন দরকার নেই।',
  cards_realtime_dashboard: 'রিয়েল-টাইম ড্যাশবোর্ড',
  cards_realtime_dashboard_desc: 'ড্যাশবোর্ডে সাথে সাথে মেসেজ দেখুন।',
  cards_actionable_analytics: 'অ্যাকশনেবল অ্যানালিটিক্স',
  cards_actionable_analytics_desc: 'এক নজরে প্ল্যাটফর্মের ব্যবহার বুঝুন।',
  cards_secure_default: 'ডিফল্টে সুরক্ষিত',
  cards_secure_default_desc: 'RLS-সক্ষম ডাটাবেজ ডেটা নিরাপদ রাখে।',
  cards_fast_setup: 'দ্রুত সেটআপ',
  cards_fast_setup_desc: 'কয়েক মিনিটেই লিংক তৈরি করে শেয়ার করুন।',
  cards_built_to_grow: 'বৃদ্ধির জন্য নির্মিত',
  cards_built_to_grow_desc: 'আজ ফ্রি, পরে পেইড প্ল্যান যোগ করুন।',
  cta_title: 'আজই কৃতজ্ঞতা শেয়ার করা শুরু করুন',
  cta_subcopy: 'কয়েক মিনিটেই লিংক তৈরি করুন। ফ্রি এবং গোপনীয়তা-প্রথম।',
  cta_learn_more: 'আরও জানুন',
  footer_product: 'প্রোডাক্ট',
  footer_company: 'কোম্পানি',
  footer_legal: 'লিগ্যাল',
  overview: 'ওভারভিউ',
  share_link_label: 'শেয়ার লিংক',
  about: 'সম্পর্কে',
  contact: 'যোগাযোগ',
  privacy: 'গোপনীয়তা',
  terms: 'শর্তাবলী',
  showcase_title: 'শোকেস',
  showcase_kpis: 'আপনার KPI',
  activity: 'অ্যাক্টিভিটি',
  recent_messages: 'সাম্প্রতিক মেসেজ',
  copy: 'কপি'
}

const dicts: Record<Lang, Dict> = { en, bn }

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string }>({
  lang: 'en',
  setLang: () => {},
  t: (k: string) => en[k] || k,
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')

  useEffect(() => {
    const stored = (typeof window !== 'undefined' && (localStorage.getItem('lang') as Lang | null)) || null
    if (stored === 'en' || stored === 'bn') setLang(stored)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('lang', lang)
  }, [lang])

  const t = useMemo(() => (key: string) => (dicts[lang] && dicts[lang][key]) || en[key] || key, [lang])

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>
  )
}

export function useLang() { return useContext(LangContext) }
