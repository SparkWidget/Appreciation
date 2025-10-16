'use client'
import { useLang } from '@/components/lang-context'

export function Features() {
  const { t } = useLang()
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold">{t('features_title')}</h2>
          <p className="text-gray-600 mt-2">{t('features_subcopy')}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {[ 
            { title: t('f_secure_auth'), desc: t('f_secure_auth_desc'), icon: '🔐' },
            { title: t('f_personal_link'), desc: t('f_personal_link_desc'), icon: '🔗' },
            { title: t('f_anonymous_form'), desc: t('f_anonymous_form_desc'), icon: '💬' },
            { title: t('f_user_dashboard'), desc: t('f_user_dashboard_desc'), icon: '📊' },
            { title: t('f_admin_analytics'), desc: t('f_admin_analytics_desc'), icon: '📈' },
            { title: t('f_rls_default'), desc: t('f_rls_default_desc'), icon: '🛡️' },
          ].map((f) => (
            <div key={f.title} className="bg-white border rounded-lg p-6">
              <div className="text-2xl">{f.icon}</div>
              <h3 className="mt-3 font-semibold text-lg">{f.title}</h3>
              <p className="text-gray-600 mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
