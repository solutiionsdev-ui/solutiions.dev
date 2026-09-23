'use client'

import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import type { PortfolioType } from '@/content/portfolio'
import { guides } from '@/content/portfolio-guides'
import { cn } from '@/lib/cn'

const card = 'rounded-frame border border-hairline bg-surface-2'

/**
 * "How we build it" steps + FAQs for the project's type, under the preview.
 * FAQs use native <details>, so they work with the keyboard and without JS.
 */
export function PortfolioGuide({ type, className }: { type: PortfolioType; className?: string }) {
  const guide = guides[type]
  const [showAll, setShowAll] = useState(false)

  useEffect(() => setShowAll(false), [type])

  const steps = showAll ? guide.steps : guide.steps.slice(0, 2)

  return (
    <div className={cn('space-y-8 p-4 sm:p-6', className)}>
      {/* Steps */}
      <section aria-labelledby="guide-steps-heading" className={cn(card, 'overflow-hidden')}>
        <div className="p-5 sm:p-6">
          <h3 id="guide-steps-heading" className="type-title text-fg">
            How we build a {type.toLowerCase()}
          </h3>
          <p className="type-meta text-fg-subtle mt-1">From first call to a live product</p>

          <ol className="mt-5 space-y-5">
            {steps.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="type-label rounded-card border-hairline-lit text-fg flex size-8 shrink-0 items-center justify-center border">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="type-title text-fg">{step.title}</p>
                  <p className="type-meta text-fg-muted mt-1">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {guide.steps.length > 2 ? (
          <button
            type="button"
            aria-expanded={showAll}
            onClick={() => setShowAll((value) => !value)}
            className="type-label border-hairline text-fg-muted hover:text-fg focus-visible:outline-ring flex w-full cursor-pointer items-center justify-center gap-2 border-t py-4 transition-colors duration-(--dur-base) focus-visible:outline-2 focus-visible:-outline-offset-2"
          >
            {showAll ? 'SHOW LESS' : 'SHOW ALL'}
            <ChevronDown
              aria-hidden="true"
              strokeWidth={1.75}
              className={cn('size-3.5 transition-transform', showAll && 'rotate-180')}
            />
          </button>
        ) : null}
      </section>

      {/* FAQs */}
      <section aria-labelledby="guide-faq-heading">
        <h3 id="guide-faq-heading" className="type-label text-fg-subtle">
          FAQS
        </h3>
        <div className="mt-4 space-y-2">
          {guide.faqs.map((faq) => (
            <details key={faq.question} className={cn(card, 'group')}>
              <summary className="type-title text-fg focus-visible:outline-ring flex cursor-pointer list-none items-center justify-between gap-4 p-5 focus-visible:outline-2 focus-visible:-outline-offset-2 [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span className="rounded-pill border-hairline-lit text-fg-muted flex size-7 shrink-0 items-center justify-center border">
                  <ChevronDown
                    aria-hidden="true"
                    strokeWidth={1.75}
                    className="size-3.5 transition-transform group-open:rotate-180"
                  />
                </span>
              </summary>
              <p className="type-meta text-fg-muted -mt-1 px-5 pb-5">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={cn(card, 'p-5 sm:p-6')}>
        <h3 className="type-title text-fg">Have a similar project in mind?</h3>
        <p className="type-meta text-fg-muted mt-2">
          Tell us about your business and we’ll reply within one working day with next steps and a
          free estimate.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="type-button rounded-pill bg-accent text-on-accent hover:bg-fg-secondary focus-visible:outline-ring inline-flex h-10 cursor-pointer items-center px-5 transition-colors duration-(--dur-base) focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            START A PROJECT ↗
          </Link>
          <Link
            href="/#process"
            className="type-button rounded-pill border-border text-fg hover:border-fg focus-visible:outline-ring inline-flex h-10 cursor-pointer items-center border px-5 transition-colors duration-(--dur-base) focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            OUR PROCESS
          </Link>
        </div>
      </section>
    </div>
  )
}
