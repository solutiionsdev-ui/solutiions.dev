import type { Stat } from './types'

/** Brief §8.6b / §19 — copy verbatim. */
export const about = {
  heading: 'A SMALL, SENIOR TEAM.',
  body: 'No account managers, no handoffs. The people who scope your project are the people who build it. We take on a handful of engagements at a time so every one gets senior attention from start to launch.',
} as const

export const stats: Stat[] = [
  { value: '6 YRS', label: 'building for the web' },
  { value: '40+', label: 'projects shipped' },
  { value: '98', label: 'average Lighthouse score' },
]
