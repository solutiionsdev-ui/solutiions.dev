import type { MetadataRoute } from 'next'

import { site } from '@/content/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // The kitchen sink is a development surface. Disallowed from the start,
      // absent from the sitemap, and never linked (§17, Phase 2).
      disallow: ['/dev/'],
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  }
}
