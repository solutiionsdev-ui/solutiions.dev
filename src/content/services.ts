import type { Service } from './types'

/** Brief §8.4 / §19. Descriptions rewritten for SEO and the MENA market. */
export const servicesHeading = 'Web development & AI systems for businesses across the Middle East'

export const services: Service[] = [
  {
    index: 1,
    slug: 'web-development',
    title: 'WEB DEVELOPMENT',
    description:
      'Fast, SEO-ready websites for businesses across the Middle East, built with Next.js and optimised to rank and load in under a second.',
  },
  {
    index: 2,
    slug: 'web-applications',
    title: 'WEB APP & AI SYSTEMS',
    description:
      'Custom platforms, dashboards and AI tools (chatbots, automation and AI agents) that save your team hours every week.',
  },
  {
    index: 3,
    slug: 'e-commerce',
    title: 'E-COMMERCE',
    description:
      'Online stores that convert, with local MENA payment gateways like Tap, Checkout.com, Tabby and Tamara built in.',
  },
  {
    index: 4,
    slug: 'ui-ux-design',
    title: 'UI / UX DESIGN',
    description:
      'Research-led interfaces, prototypes and design systems that make your product easy to use on every device.',
  },
  {
    index: 5,
    slug: 'api-integrations',
    title: 'API & INTEGRATIONS',
    description:
      'Connect payments, CRMs, ERPs, WhatsApp Business and AI models with secure, well-documented APIs.',
  },
  {
    index: 6,
    slug: 'maintenance',
    title: 'MAINTENANCE',
    description:
      'Monthly updates, security patches, uptime monitoring and speed optimisation, with support in your time zone.',
  },
]
