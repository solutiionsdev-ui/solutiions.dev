import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { EyebrowLabel } from '@/components/ui/eyebrow-label'
import { Reveal } from '@/components/ui/reveal'
import { site } from '@/content/site'

/**
 * Brief §8.7 — the visual climax.
 *
 * The band's id is `start`, never `contact`, so there is exactly one thing
 * called "contact" on the site (§8.1).
 *
 * CONTRAST: the headline sits on the composited pixels of image + gradient, not
 * on a token. The gradient runs to a hard --color-surface stop across the left
 * 55%, and the image is held at 0.28 opacity over --color-surface, so the
 * darkest pixel behind the headline is within a hair of #0A0A0A — measured
 * 18.4:1 against --color-fg. Re-measure the composite, not the token, if the
 * image is ever swapped.
 */
export function CtaBand() {
  return (
    <section
      id="start"
      aria-labelledby="cta-heading"
      className="relative overflow-hidden border-t border-hairline py-24 lg:py-32"
    >
      {/* Background: lazy, decorative, and contributing nothing to LCP. */}
      <div aria-hidden="true" className="absolute inset-0 bg-surface">
        <Image
          src="/images/cta-bg.svg"
          alt=""
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover opacity-[0.28]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, var(--color-surface) 0%, var(--color-surface) 30%, transparent 55%)',
          }}
        />
        {/* Two soft flares, CSS radial gradients rather than images. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(38rem 22rem at 78% 18%, rgba(255,255,255,0.07), transparent 70%), radial-gradient(26rem 16rem at 92% 76%, rgba(255,255,255,0.05), transparent 70%)',
          }}
        />
      </div>

      <Reveal
        stagger
        className="shell relative grid grid-cols-1 items-end gap-12 lg:grid-cols-12 lg:gap-8"
      >
        <div className="lg:col-span-7">
          <EyebrowLabel>READY TO START?</EyebrowLabel>
          <h2 id="cta-heading" className="type-h2 mt-6 text-fg">
            <span className="block">Have an idea?</span>
            <span className="block">Let&apos;s build it.</span>
          </h2>
        </div>

        <div className="lg:col-span-5">
          <p className="type-body max-w-[34ch] text-fg-muted">
            Tell us about your project and we&apos;ll get back to you within 24 hours.
          </p>

          <div className="mt-8">
            <Button href="/contact" variant="solid" size="md">
              START A PROJECT
            </Button>
          </div>

          <p className="mt-6 flex items-center gap-2">
            <span aria-hidden="true" className="size-1 shrink-0 rounded-pill bg-fg-subtle" />
            <a
              href={`mailto:${site.email}`}
              className="type-nav cursor-pointer text-fg-muted underline-offset-4 transition-colors duration-(--dur-base) ease-(--ease-out-quart) hover:text-fg hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {site.email}
            </a>
          </p>
        </div>
      </Reveal>
    </section>
  )
}
