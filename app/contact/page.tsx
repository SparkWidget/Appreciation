import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | Appreciation',
  description:
    'Contact the Appreciation team with questions, feedback, partnership requests, or support needs.',
  openGraph: {
    title: 'Contact | Appreciation',
    description:
      'Reach out to the Appreciation team for support and inquiries.',
    url: 'https://appreciation.yourdomain.com/contact',
    images: [{ url: 'https://appreciation.yourdomain.com/og-image.png', width: 1200, height: 630 }],
  },
}

export default function ContactPage() {
  return (
    <div className="">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 via-white to-white" />
        <div className="container py-16 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight">Contact</h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">We’d love to hear from you. For support, feedback, or partnerships, reach out anytime.</p>
        </div>
      </section>
      <section className="container py-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Send us a message</h2>
            <p className="mt-1 text-sm text-gray-600">Fill out the form and we’ll get back to you within 1–2 business days.</p>
            <form className="mt-4 grid gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input id="name" name="name" type="text" placeholder="Your name" className="mt-1 w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input id="email" name="email" type="email" placeholder="you@example.com" className="mt-1 w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea id="message" name="message" rows={5} placeholder="How can we help?" className="mt-1 w-full border rounded px-3 py-2" />
              </div>
              <div>
                <button type="button" className="button-press bg-brand-600 text-white px-4 py-2 rounded">Send</button>
              </div>
            </form>
          </div>
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Get support</h2>
            <p className="mt-2 text-gray-700">Email us at <a className="underline" href="mailto:support@yourdomain.com">support@yourdomain.com</a>. We typically respond within 1–2 business days.</p>
          </div>
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Partnerships</h2>
            <p className="mt-2 text-gray-700">For collaboration or integration opportunities, contact <a className="underline" href="mailto:partners@yourdomain.com">partners@yourdomain.com</a>.</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="font-semibold">Press & media</h3>
            <p className="mt-2 text-gray-700">Reach our media team at <a className="underline" href="mailto:press@yourdomain.com">press@yourdomain.com</a>.</p>
          </div>
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="font-semibold">Status</h3>
            <p className="mt-2 text-gray-700">Check platform status and uptime on our public status page.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
