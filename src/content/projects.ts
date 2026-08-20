import type { Project } from './types'

/**
 * Brief §8.3 / §11. The three featured entries are the home-page grid, in order.
 *
 * Every entry here is CONCEPT WORK — `concept: true` renders a visible marker on
 * the card and in the case study (brief §20, Legal). Flip the flag only when a
 * real, permissioned client project replaces it.
 */
export const projects: Project[] = [
  {
    slug: 'fintech-dashboard',
    index: 1,
    title: 'FINTECH DASHBOARD',
    category: 'Web Application',
    year: 2024,
    role: ['Product design', 'Front-end', 'Design system'],
    summary:
      'A trading and portfolio console for a mid-market brokerage, built around dense real-time data that still had to read calmly.',
    problem:
      'The incumbent tool surfaced every metric at equal weight, so traders scanned instead of read. Latency spikes during market open pushed interaction response past a second, and the team had no shared component language across four squads.',
    approach:
      'We rebuilt the surface on a strict typographic hierarchy — one display size, three body sizes, tabular numerals everywhere — and moved streaming updates onto a virtualised grid so only visible rows re-render. A documented design system shipped alongside, which is what let four squads move independently afterwards.',
    cover: {
      src: '/images/projects/fintech-dashboard.svg',
      alt: 'Dark analytics console showing a portfolio value chart above a dense table of positions.',
      width: 1600,
      height: 1200,
    },
    gallery: [
      {
        src: '/images/gallery/fintech-dashboard-1.svg',
        alt: 'Full-width view of the positions grid with live price columns.',
        width: 2400,
        height: 1350,
      },
      {
        src: '/images/gallery/fintech-dashboard-2.svg',
        alt: 'Order ticket panel opened beside the portfolio summary.',
        width: 2400,
        height: 1350,
      },
      {
        src: '/images/gallery/fintech-dashboard-3.svg',
        alt: 'Design system page documenting the numeric type scale.',
        width: 2400,
        height: 1350,
      },
    ],
    results: [
      { label: 'interaction latency', value: '-72%' },
      { label: 'components documented', value: '84' },
      { label: 'Lighthouse performance', value: '97' },
    ],
    featured: true,
    concept: true,
    href: '/work/fintech-dashboard',
  },
  {
    slug: 'noire-ecommerce',
    index: 2,
    title: 'NOIRÉ — ECOMMERCE',
    category: 'Shopify / Custom Theme',
    year: 2024,
    role: ['Art direction', 'Custom theme', 'Performance'],
    summary:
      'An editorial storefront for a fashion label whose photography deserved more room than a stock theme would give it.',
    problem:
      'The previous theme loaded eleven third-party scripts before the first product image and scored 38 on mobile. Editorial campaigns were rebuilt by hand every season because nothing was componentised.',
    approach:
      'A custom theme with a hand-built section library, so campaigns are assembled rather than rebuilt. Every image moved to responsive AVIF with reserved aspect ratios, and the third-party layer was cut to two scripts loaded after interaction.',
    cover: {
      src: '/images/projects/noire-ecommerce.svg',
      alt: 'Light fashion editorial layout with a full-bleed lookbook image beside a product listing.',
      width: 1600,
      height: 1200,
    },
    gallery: [
      {
        src: '/images/gallery/noire-ecommerce-1.svg',
        alt: 'Seasonal campaign landing page with full-bleed photography.',
        width: 2400,
        height: 1350,
      },
      {
        src: '/images/gallery/noire-ecommerce-2.svg',
        alt: 'Product detail page showing the size and fabric selector.',
        width: 2400,
        height: 1350,
      },
      {
        src: '/images/gallery/noire-ecommerce-3.svg',
        alt: 'Mobile checkout flow across three steps.',
        width: 2400,
        height: 1350,
      },
    ],
    results: [
      { label: 'mobile Lighthouse', value: '38 → 96' },
      { label: 'conversion rate', value: '+31%' },
      { label: 'largest contentful paint', value: '1.4s' },
    ],
    featured: true,
    concept: true,
    href: '/work/noire-ecommerce',
  },
  {
    slug: 'analytics-platform',
    index: 3,
    title: 'ANALYTICS PLATFORM',
    category: 'SaaS / Dashboard',
    year: 2023,
    role: ['Front-end architecture', 'Data visualisation', 'Design system'],
    summary:
      'A self-serve analytics product where customers build their own reports, so every chart had to survive data the team had never seen.',
    problem:
      'Charts were authored per-feature, so twelve teams had twelve legend styles and no shared colour logic. Reports with more than eight series became unreadable, and nothing was keyboard-operable.',
    approach:
      'One chart primitive with a categorical palette validated for contrast and colour-vision deficiency, a documented form heuristic for picking a chart type, and full keyboard and screen-reader support for every series. Report rendering moved off the main thread.',
    cover: {
      src: '/images/projects/analytics-platform.svg',
      alt: 'Dark dashboard combining a stacked area chart, a bar series and a summary metric row.',
      width: 1600,
      height: 1200,
    },
    gallery: [
      {
        src: '/images/gallery/analytics-platform-1.svg',
        alt: 'Report builder with the chart type picker open.',
        width: 2400,
        height: 1350,
      },
      {
        src: '/images/gallery/analytics-platform-2.svg',
        alt: 'Saved dashboard showing six linked visualisations.',
        width: 2400,
        height: 1350,
      },
      {
        src: '/images/gallery/analytics-platform-3.svg',
        alt: 'Accessibility panel showing the keyboard map for chart navigation.',
        width: 2400,
        height: 1350,
      },
    ],
    results: [
      { label: 'report render time', value: '-64%' },
      { label: 'WCAG conformance', value: 'AA' },
      { label: 'teams on the primitive', value: '12' },
    ],
    featured: true,
    concept: true,
    href: '/work/analytics-platform',
  },
  {
    slug: 'atlas-logistics',
    index: 4,
    title: 'ATLAS LOGISTICS',
    category: 'Web Application',
    year: 2023,
    role: ['Front-end', 'Mapping', 'Offline support'],
    summary:
      'A fleet tracking console used from depot desktops and from phones in the cab, on connections that drop.',
    problem:
      'Drivers lost their job list whenever signal dropped, and dispatchers were reading a map that repainted every location ping.',
    approach:
      'Job state moved to a local-first store that reconciles on reconnect, and the map switched to a vector layer with batched updates on an animation frame instead of per-ping repaints.',
    cover: {
      src: '/images/projects/atlas-logistics.svg',
      alt: 'Fleet map with vehicle markers beside a scrollable list of active deliveries.',
      width: 1600,
      height: 1200,
    },
    results: [
      { label: 'offline job retention', value: '100%' },
      { label: 'map frame time', value: '8ms' },
    ],
    featured: false,
    concept: true,
    href: '/work/atlas-logistics',
  },
  {
    slug: 'meridian-health',
    index: 5,
    title: 'MERIDIAN HEALTH',
    category: 'Marketing / CMS',
    year: 2023,
    role: ['Design', 'Front-end', 'Accessibility'],
    summary:
      'A patient-facing site for a clinic group, where the accessibility bar was set by the people actually using it.',
    problem:
      'The old site failed AA on nearly every page, and appointment information was locked in PDFs.',
    approach:
      'A structured content model replaced the PDFs, and the whole surface was rebuilt to AA with a keyboard and screen-reader pass on every template before launch.',
    cover: {
      src: '/images/projects/meridian-health.svg',
      alt: 'Calm clinical website layout with a clear appointment booking panel.',
      width: 1600,
      height: 1200,
    },
    results: [
      { label: 'Lighthouse accessibility', value: '100' },
      { label: 'booking completion', value: '+44%' },
    ],
    featured: false,
    concept: true,
    href: '/work/meridian-health',
  },
  {
    slug: 'kiln-studio',
    index: 6,
    title: 'KILN STUDIO',
    category: 'Portfolio / Editorial',
    year: 2022,
    role: ['Art direction', 'Front-end', 'Motion'],
    summary:
      'A portfolio for an industrial design studio, built around large imagery and a very short attention window.',
    problem:
      'Their work was photographed beautifully and then displayed at 640px inside a template that boxed everything.',
    approach:
      'Full-bleed uncropped imagery on a strict grid, with scroll motion used only to sequence attention — never to decorate — and a static fallback that reads identically.',
    cover: {
      src: '/images/projects/kiln-studio.svg',
      alt: 'Editorial portfolio grid with large uncropped product photography.',
      width: 1600,
      height: 1200,
    },
    results: [
      { label: 'average session', value: '2m 40s' },
      { label: 'enquiries per month', value: '3x' },
    ],
    featured: false,
    concept: true,
    href: '/work/kiln-studio',
  },
]

/** The home-page grid: exactly three, in index order (§8.3). */
export const featuredProjects = projects.filter((project) => project.featured)

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

/** Wraps around, so the last case study still offers a next one. */
export function getNextProject(slug: string): Project {
  const current = projects.findIndex((project) => project.slug === slug)
  return projects[(current + 1) % projects.length]
}
