import { Button } from '@/components/ui/button'
import { EyebrowLabel } from '@/components/ui/eyebrow-label'
import { HeroObject } from '@/components/three/hero-object'

/**
 * Brief §8.2. The only <h1> on the site.
 *
 * The three headline lines are AUTHORED, not automatic — each is its own
 * <span class="block"> so SplitText can stagger per line and per char, and so
 * the break never lands somewhere else at a different viewport width.
 *
 * Nothing here is hidden by CSS: with JavaScript disabled the hero is fully
 * readable and every CTA is reachable.
 */
export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="pt-band lg:pt-band-lg relative flex items-center pb-12 lg:pb-16"
    >
      <div className="shell grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6" data-hero-copy>
          <EyebrowLabel>WE ARE SOLUTIIONS.DEV</EyebrowLabel>

          <h1 id="hero-heading" className="type-h1 text-fg mt-6" data-split>
            <span className="block">We build</span>
            <span className="block">Digital experiences</span>
            <span className="block">That matter.</span>
          </h1>

          <p className="type-body text-fg-muted mt-8 max-w-[38ch]">
            A web development agency crafting high-performance websites, web applications and
            digital products.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="/contact" variant="solid" size="md">
              START A PROJECT
            </Button>
            <Button href="/#work" variant="ghost" size="md">
              VIEW OUR WORK
            </Button>
          </div>
        </div>

        {/* Bleeds +8% right at lg and up so the object breaks the grid. */}
        <div className="h-[320px] lg:col-span-6 lg:-mr-[8%] lg:h-[min(38rem,60svh)]">
          <HeroObject />
        </div>
      </div>

      {/* Scroll rail — decorative, desktop only, fades permanently past 15% scroll. */}
      <div
        aria-hidden="true"
        data-scroll-rail
        className="bottom-band right-gutter-lg absolute hidden flex-col items-center gap-4 transition-opacity duration-(--dur-base) ease-(--ease-out-quart) lg:flex"
      >
        <span
          className="type-label text-fg-subtle"
          style={{ writingMode: 'vertical-rl', letterSpacing: 'var(--tracking-rail)' }}
        >
          SCROLL TO EXPLORE
        </span>
        <span className="h-rail bg-hairline relative block w-px overflow-hidden">
          <span className="animate-rail-pulse bg-fg absolute inset-x-0 top-0 block h-3" />
        </span>
      </div>
    </section>
  )
}
