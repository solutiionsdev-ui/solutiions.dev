import type { MetadataRoute } from 'next'

import { projects } from '@/content/projects'
import { site } from '@/content/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    { url: site.url, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}/portfolio`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${site.url}/work`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${site.url}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    ...projects.map((project) => ({
      url: `${site.url}${project.href}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
  ]
}
