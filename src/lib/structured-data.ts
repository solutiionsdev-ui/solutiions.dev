import { projects } from '@/content/projects'
import { site, socialLinks } from '@/content/site'
import type { Project } from '@/content/types'

/** Brief §15. JSON-LD, never microdata. */

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    email: site.email,
    description: site.description,
    sameAs: socialLinks.map((link) => link.href),
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.url,
    description: site.description,
    publisher: { '@type': 'Organization', name: site.name },
  }
}

export function creativeWorkSchema(project: Project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    headline: project.title,
    description: project.summary,
    genre: project.category,
    dateCreated: String(project.year),
    url: `${site.url}${project.href}`,
    image: `${site.url}${project.cover.src}`,
    creator: { '@type': 'Organization', name: site.name, url: site.url },
    // Concept work is labelled in the structured data too, not only visually.
    ...(project.concept ? { creditText: 'Concept project — not client work' } : {}),
  }
}

export function collectionSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Work',
    url: `${site.url}/work`,
    hasPart: projects.map((project) => ({
      '@type': 'CreativeWork',
      name: project.title,
      url: `${site.url}${project.href}`,
    })),
  }
}

/** Serialise safely for embedding in a <script> tag. */
export function jsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, '\u003c')
}
