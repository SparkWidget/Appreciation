import './globals.css'
import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { Toaster } from '@/components/toaster'
import { LangProvider } from '@/components/lang-context'
import { RouteShell } from '@/components/route-shell'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata: Metadata = {
  title: 'Appreciation – Send Gratitude Easily | Free SaaS Tool',
  description:
    'Appreciation is a free SaaS tool to share gratitude and track engagement. Empower your team or community with simple appreciation messages.',
  openGraph: {
    title: 'Appreciation – Share Gratitude Instantly',
    description:
      'Send and receive appreciation in seconds. Simple, free, and powerful.',
    url: 'https://appreciation.yourdomain.com',
    siteName: 'Appreciation',
    images: [
      {
        url: 'https://appreciation.yourdomain.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Appreciation SaaS Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Appreciation – Send Gratitude Instantly',
    description:
      'A free SaaS app for sharing appreciation and tracking engagement.',
    images: ['https://appreciation.yourdomain.com/og-image.png'],
    creator: '@your_twitter_handle',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <LangProvider>
          <RouteShell>
            {children}
          </RouteShell>
          <Toaster />
        </LangProvider>
        <Analytics />
        <SpeedInsights />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                try {
                  var h = window.location.hash || '';
                  if (h.startsWith('#/')) {
                    var username = h.slice(2);
                    if (username) {
                      window.location.replace('/u/' + encodeURIComponent(username));
                    }
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Appreciation',
              applicationCategory: 'ProductivityApplication',
              operatingSystem: 'Web',
              description:
                'Appreciation is a free SaaS app to send, receive, and analyze gratitude messages within your team or community.',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
              },
              url: 'https://appreciation.yourdomain.com',
              image: 'https://appreciation.yourdomain.com/og-image.png',
              author: {
                '@type': 'Organization',
                name: 'Appreciation',
              },
              publisher: {
                '@type': 'Organization',
                name: 'Appreciation',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://appreciation.yourdomain.com/logo.png',
                },
              },
            }),
          }}
        />
      </body>
    </html>
  )
}
