'use client'
import { useLang } from '@/components/lang-context'

export default function Cards() {
  const { t } = useLang()
  const items = [
    { icon: '✨', title: t('cards_anonymous_safe'), desc: t('cards_anonymous_safe_desc') },
    { icon: '⚡', title: t('cards_realtime_dashboard'), desc: t('cards_realtime_dashboard_desc') },
    { icon: '📈', title: t('cards_actionable_analytics'), desc: t('cards_actionable_analytics_desc') },
    { icon: '🔒', title: t('cards_secure_default'), desc: t('cards_secure_default_desc') },
    { icon: '🚀', title: t('cards_fast_setup'), desc: t('cards_fast_setup_desc') },
    { icon: '🧰', title: t('cards_built_to_grow'), desc: t('cards_built_to_grow_desc') },
  ]
  return (
    <section className="py-16">
      <div className="container">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((i) => (
            <div key={i.title} className="bg-white border rounded-lg p-6">
              <div className="text-2xl">{i.icon}</div>
              <h3 className="font-semibold text-lg mt-2">{i.title}</h3>
              <p className="text-gray-600 mt-1">{i.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
