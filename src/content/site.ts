import type { NavItem, SocialLink } from './types'

/**
 * The single source for brand name, email, nav, socials and OG defaults
 * (brief §11). No hardcoded strings for these anywhere else.
 */
export const site = {
  name: 'Solutiions.dev',
  wordmark: 'SOLUTIIONS.DEV',
  email: 'hello@solutiions.dev',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://solutiions.dev',
  description:
    'Solutiions.dev is a web development agency crafting high-performance websites, web applications and digital products.',
  tagline: 'We build digital experiences that matter.',
  locale: 'en',
} as const

/**
 * Same-page anchors, except CONTACT which routes to the intercepting modal.
 * The CTA band's id is `start`, never `contact`, so there is exactly one
 * thing called "contact" on the site (§8.1).
 */
export const navItems: NavItem[] = [
  { label: 'WORK', href: '/#work' },
  { label: 'SERVICES', href: '/#services' },
  { label: 'ABOUT', href: '/#about' },
  { label: 'TECH', href: '/#tech' },
  { label: 'PROCESS', href: '/#process' },
  { label: 'CONTACT', href: '/contact' },
]

/** Section ids observed by the active-nav ScrollTrigger (§8.1). */
export const navSectionIds = ['work', 'services', 'about', 'tech', 'process'] as const

export const socialLinks: SocialLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/solutiions-dev' },
  { label: 'GitHub', href: 'https://github.com/solutiions-dev' },
  { label: 'Instagram', href: 'https://www.instagram.com/solutiions.dev' },
  { label: 'X (Twitter)', href: 'https://x.com/solutiionsdev' },
]

export const footerLinks: NavItem[] = [
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/#services' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/contact' },
]
