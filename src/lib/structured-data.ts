import { processHeading, processSteps } from '@/content/process'
import { projects } from '@/content/projects'
import { services } from '@/content/services'
import { site, socialLinks } from '@/content/site'
import type { Project } from '@/content/types'

/** Brief §15. JSON-LD, never microdata. */

const areaServed = { '@type': 'Place', name: 'Middle East and North Africa (MENA)' }

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    email: site.email,
    description: site.description,
    areaServed,
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

/** The six services, so search engines can read them as offerings. */
export function servicesSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Services',
    itemListElement: services.map((service) => ({
      '@type': 'ListItem',
      position: service.index,
      item: {
        '@type': 'Service',
        name: service.title,
        description: service.description,
        serviceType: service.title,
        areaServed,
        provider: { '@type': 'Organization', name: site.name, url: site.url },
      },
    })),
  }
}

export function processSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: processHeading,
    step: processSteps.map((step) => ({
      '@type': 'HowToStep',
      position: step.index,
      name: step.title,
      text: step.description,
    })),
  }
}

/** Serialise safely for embedding in a <script> tag. */
export function jsonLd(data: object) {
  return JSON.stringify(data).replace(/</g, '\u003c')
}
