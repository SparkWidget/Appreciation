'use client'
import { useLang } from './lang-context'

export function LanguageToggle() {
  const { lang, setLang } = useLang()
  return (
    <button aria-label="Toggle language" onClick={() => setLang(lang === 'en' ? 'bn' : 'en')} className="text-xs border rounded px-2 py-1">
      {lang.toUpperCase()}
    </button>
  )
}
