import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || ''
  const make = (path: string): MetadataRoute.Sitemap[0] => ({
    url: `${base}${path}` || path,
    lastModified: new Date(),
  })

  return [
    make('/'),
    make('/about'),
    make('/contact'),
    make('/privacy'),
    make('/terms'),
    make('/share'),
  ]
}
