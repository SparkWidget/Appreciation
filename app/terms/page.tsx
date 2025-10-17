import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | kindverse',
  description:
    'Read kindverse\'s Terms of Service to understand the rules and responsibilities when using our platform.',
  openGraph: {
    title: 'Terms of Service | kindverse',
    description:
      'Understand the terms for using the kindverse platform, including acceptable use and limitations of liability.',
    url: 'https://kindverse.yourdomain.com/terms',
    images: [{ url: 'https://kindverse.yourdomain.com/og-image.png', width: 1200, height: 630 }],
  },
}

export default function TermsPage() {
  return (
    <div className="">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 via-white to-white" />
        <div className="container py-16 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">Terms of Service</h1>
          <p className="mt-2 text-gray-600">Last updated: {new Date().getFullYear()}</p>
        </div>
      </section>
      <section className="container py-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Acceptance of terms</h2>
            <p className="mt-2 text-gray-700">By accessing or using kindverse, you agree to these Terms of Service.</p>
          </div>
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Acceptable use</h2>
            <ul className="mt-2 list-disc pl-5 space-y-1 text-gray-700">
              <li>Use kindverse only for positive, non-harmful messages.</li>
              <li>Do not attempt to abuse, disrupt, or harm the service or other users.</li>
              <li>We may remove content that violates these terms.</li>
            </ul>
          </div>
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Disclaimer</h2>
            <p className="mt-2 text-gray-700">kindverse is provided on an “as-is” basis without warranties.</p>
          </div>
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Limitation of liability</h2>
            <p className="mt-2 text-gray-700">To the fullest extent permitted by law, we are not liable for indirect or consequential damages.</p>
          </div>
        </div>
        <aside className="space-y-4">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="font-semibold">Questions?</h3>
            <p className="mt-2 text-gray-700">If anything is unclear, please contact us via the Contact page.</p>
          </div>
        </aside>
      </section>
    </div>
  )
}
