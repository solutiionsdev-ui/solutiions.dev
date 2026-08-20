/** Content model (brief §11). No CMS in v1 — typed data files, so swapping to
 *  a CMS later is a single adapter change. */

export type ImageAsset = {
  src: string
  alt: string
  width: number
  height: number
}

export type Project = {
  slug: string
  index: number
  title: string
  category: string
  year: number
  role: string[]
  summary: string
  problem: string
  approach: string
  cover: ImageAsset
  gallery?: ImageAsset[]
  results?: { label: string; value: string }[]
  featured: boolean
  /** Brief §20 (Legal): placeholder work MUST be labelled as concept work.
   *  Misrepresenting work is an ethical and a legal problem for an agency site.
   *  Set to false only once a real, permissioned case study replaces it. */
  concept: boolean
  href: string
}

export type Service = {
  index: number
  title: string
  description: string
  slug: string
}

export type TechLogo =
  | 'nextjs'
  | 'react'
  | 'typescript'
  | 'nodejs'
  | 'postgresql'
  | 'tailwind'
  | 'aws'
  | 'docker'

export type Tech = {
  name: string
  slug: string
  logo: TechLogo
}

export type Step = {
  index: number
  title: string
  description: string
}

export type Stat = {
  value: string
  label: string
}

export type NavItem = {
  label: string
  href: string
}

export type SocialLink = {
  label: string
  href: string
}
