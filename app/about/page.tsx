import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | Appreciation',
  description:
    'Learn about Appreciation, an anonymous appreciation board that helps teams and communities share gratitude and track engagement.',
  openGraph: {
    title: 'About Appreciation',
    description:
      'What is Appreciation? Discover our mission to make gratitude simple, safe, and impactful.',
    url: 'https://appreciation.yourdomain.com/about',
    images: [{ url: 'https://appreciation.yourdomain.com/og-image.png', width: 1200, height: 630 }],
  },
}

export default function AboutPage() {
  return (
    <div className="">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 via-white to-white" />
        <div className="container py-16 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">About Appreciation</h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">A simple, free tool to send and receive anonymous, positive messages. Privacy-first, fast, and designed for teams and communities.</p>
        </div>
      </section>
      <section className="container py-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Our mission</h2>
            <p className="mt-2 text-gray-700">We make gratitude effortless and safe. By lowering the friction to share appreciation, we help strengthen relationships and culture across teams and communities.</p>
          </div>
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">How it works</h2>
            <ol className="mt-3 list-decimal pl-5 space-y-1 text-gray-700">
              <li>Create your personal link.</li>
              <li>Share it with your team or community.</li>
              <li>Receive positive notes in your dashboard—no sign-in required for senders.</li>
            </ol>
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="font-semibold">What we value</h3>
            <ul className="mt-2 space-y-1 text-gray-700">
              <li>Privacy-first messaging</li>
              <li>Zero friction to share appreciation</li>
              <li>Clear analytics to understand engagement</li>
            </ul>
          </div>
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="font-semibold">Built for growth</h3>
            <p className="mt-2 text-gray-700">Start free. Add features over time without losing performance or simplicity.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
