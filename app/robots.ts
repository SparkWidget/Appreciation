import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/blog',
          '/faq',
          '/roadmap',
          '/changelog',
          '/testimonials',
          '/modules/',
        ],
      },
    ],
  }
}
