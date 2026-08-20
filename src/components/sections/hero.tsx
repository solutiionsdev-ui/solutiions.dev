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
      className="relative flex min-h-[88svh] items-center py-band lg:py-band-lg"
    >
      <div className="shell grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6" data-hero-copy>
          <EyebrowLabel>WE ARE SOLUTIIONS.DEV</EyebrowLabel>

          <h1 id="hero-heading" className="type-h1 mt-6 text-fg" data-split>
            <span className="block">We build</span>
            <span className="block">Digital experiences</span>
            <span className="block">That matter.</span>
          </h1>

          <p className="type-body mt-8 max-w-[38ch] text-fg-muted">
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
        <div className="h-[320px] lg:col-span-6 lg:h-[min(38rem,60svh)] lg:-mr-[8%]">
          <HeroObject />
        </div>
      </div>

      {/* Scroll rail — decorative, desktop only, fades permanently past 15% scroll. */}
      <div
        aria-hidden="true"
        data-scroll-rail
        className="absolute bottom-band right-gutter-lg hidden flex-col items-center gap-4 transition-opacity duration-(--dur-base) ease-(--ease-out-quart) lg:flex"
      >
        <span
          className="type-label text-fg-subtle"
          style={{ writingMode: 'vertical-rl', letterSpacing: 'var(--tracking-rail)' }}
        >
          SCROLL TO EXPLORE
        </span>
        <span className="relative block h-rail w-px overflow-hidden bg-hairline">
          <span className="animate-rail-pulse absolute inset-x-0 top-0 block h-3 bg-fg" />
        </span>
      </div>
    </section>
  )
}
