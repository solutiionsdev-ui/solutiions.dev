import type { Metadata } from 'next'

import { PortfolioGallery } from '@/components/portfolio/portfolio-gallery'
import { Band } from '@/components/ui/band'
import { portfolio, portfolioHeading, portfolioIntro } from '@/content/portfolio'
import { allFaqs } from '@/content/portfolio-guides'
import { site } from '@/content/site'
import { jsonLd } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Portfolio of websites, e-commerce stores, web apps and AI systems built by Solutiions.dev for businesses across the Middle East.',
  alternates: { canonical: '/portfolio' },
}

function portfolioSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Portfolio',
    url: `${site.url}/portfolio`,
    hasPart: portfolio.map((item) => ({
      '@type': 'CreativeWork',
      name: item.title,
      genre: item.type,
      url: item.href.startsWith('http') ? item.href : `${site.url}${item.href}`,
    })),
  }
}

function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

export default function PortfolioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(portfolioSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema()) }}
      />

      <Band label="PORTFOLIO" headingId="portfolio-heading">
        <div className="mb-10 max-w-[60rem]">
          <span className="type-label rounded-pill border-hairline-lit text-fg-muted inline-flex h-7 items-center border px-3">
            {portfolio.length} projects · updated regularly
          </span>
          <h1 id="portfolio-heading" className="type-h2-secondary text-fg mt-5">
            {portfolioHeading}
          </h1>
          <p className="type-body text-fg-muted mt-4 max-w-[60ch]">{portfolioIntro}</p>
        </div>

        <PortfolioGallery />
      </Band>
    </>
  )
}
