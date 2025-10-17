import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | kindverse',
  description:
    'Read the Privacy Policy for kindverse to understand what data we collect, how we use it, and your privacy choices.',
  openGraph: {
    title: 'Privacy Policy | kindverse',
    description:
      'Learn how kindverse protects your privacy and manages your data.',
    url: 'https://kindverse.yourdomain.com/privacy',
    images: [{ url: 'https://kindverse.yourdomain.com/og-image.png', width: 1200, height: 630 }],
  },
}

export default function PrivacyPage() {
  return (
    <div className="">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 via-white to-white" />
        <div className="container py-16 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
          <p className="mt-2 text-gray-600">Last updated: {new Date().getFullYear()}</p>
        </div>
      </section>
      <section className="container py-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Overview</h2>
            <p className="mt-2 text-gray-700">We collect minimal data required to operate the service, including your email for authentication and optional profile details. Anonymous messages are stored to display them on your dashboard.</p>
          </div>
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Data we collect</h2>
            <ul className="mt-2 list-disc pl-5 space-y-1 text-gray-700">
              <li>Account information: email, name (optional)</li>
              <li>Appreciations: anonymous messages sent to your profile</li>
              <li>Usage analytics: aggregated, non-identifying metrics</li>
            </ul>
          </div>
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">How we use data</h2>
            <ul className="mt-2 list-disc pl-5 space-y-1 text-gray-700">
              <li>Authenticate users and secure accounts</li>
              <li>Display and manage appreciation messages</li>
              <li>Improve product performance and reliability</li>
            </ul>
          </div>
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Your choices</h2>
            <ul className="mt-2 list-disc pl-5 space-y-1 text-gray-700">
              <li>Update or delete your profile at any time</li>
              <li>Contact us for data requests</li>
            </ul>
          </div>
        </div>
        <aside className="space-y-4">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="font-semibold">Questions?</h3>
            <p className="mt-2 text-gray-700">Reach out via the Contact page and we’ll be happy to help.</p>
          </div>
        </aside>
      </section>
    </div>
  )
}
