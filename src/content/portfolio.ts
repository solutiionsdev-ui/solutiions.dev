import { projects } from './projects'
import type { ImageAsset } from './types'

/**
 * The /portfolio gallery. Each entry is one card; add real client work here.
 *
 * `type` drives the tabs and `industry` drives the filter chips — both lists
 * below are derived from the entries, so a new value shows up automatically.
 */
export type PortfolioType = 'Website' | 'Web App' | 'E-commerce' | 'AI System'

export type PortfolioItem = {
  slug: string
  title: string
  type: PortfolioType
  industry: string
  cover: ImageAsset
  /** Extra screens shown under the cover in the preview modal. */
  gallery: ImageAsset[]
  /** Optional screen recording (mp4/webm) — plays in place of the images. */
  video?: string
  /** One or two sentences shown in the preview modal. */
  description: string
  /** Small chips in the preview modal, e.g. tech stack or deliverables. */
  tags: string[]
  /** Case study page. */
  href: string
  /** Live site, if public. Shown as the main button in the preview. */
  liveUrl?: string
  /** Placeholder work must stay labelled (brief §20). */
  concept: boolean
  isNew?: boolean
}

export const portfolioHeading = 'Websites, web apps & AI systems we’ve built'

export const portfolioIntro =
  'A growing collection of websites, e-commerce stores, web applications and AI systems designed and built by Solutiions.dev for businesses across the Middle East.'

const typeBySlug: Record<string, PortfolioType> = {
  'fintech-dashboard': 'Web App',
  'noire-ecommerce': 'E-commerce',
  'analytics-platform': 'Web App',
  'atlas-logistics': 'Web App',
  'meridian-health': 'Website',
  'kiln-studio': 'Website',
}

const industryBySlug: Record<string, string> = {
  'fintech-dashboard': 'Fintech',
  'noire-ecommerce': 'Fashion / Retail',
  'analytics-platform': 'SaaS',
  'atlas-logistics': 'Logistics',
  'meridian-health': 'Health',
  'kiln-studio': 'Agency / Studio',
}

export const portfolio: PortfolioItem[] = projects.map((project, index) => ({
  slug: project.slug,
  title: project.title,
  type: typeBySlug[project.slug] ?? 'Website',
  industry: industryBySlug[project.slug] ?? 'Other',
  cover: project.cover,
  gallery: project.gallery ?? [],
  description: project.summary,
  tags: project.role,
  href: project.href,
  concept: project.concept,
  isNew: index < 2,
}))

export const portfolioTypes: PortfolioType[] = ['Website', 'Web App', 'E-commerce', 'AI System']
