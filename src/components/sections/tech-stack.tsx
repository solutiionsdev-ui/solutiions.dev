import { logoRegistry } from '@/components/logos'
import { Band } from '@/components/ui/band'
import { Marquee } from '@/components/ui/marquee'
import { Reveal } from '@/components/ui/reveal'
import { TechTile } from '@/components/ui/tech-tile'
import { technologies } from '@/content/tech'

/**
 * Brief §8.5. An 8-across row at xl, wrapping below it.
 *
 * Below 640px the row becomes a continuous marquee — which is why the band
 * carries overflow-hidden: the duplicated track must never be able to trigger
 * horizontal page scroll.
 *
 * Only one of the two variants is ever in the accessibility tree; the other is
 * `display: none`, so nothing is announced twice.
 */
export function TechStack() {
  return (
    <Band id="tech" label="TECHNOLOGIES WE USE" className="overflow-hidden">
      {/* Static grid from sm up — a real <ul>. */}
      <Reveal
        as="ul"
        stagger
        className="hidden grid-cols-3 gap-3 sm:grid md:grid-cols-4 xl:grid-cols-8"
      >
        {technologies.map((tech) => {
          const Logo = logoRegistry[tech.logo]
          return <TechTile key={tech.slug} name={tech.name} logo={<Logo />} />
        })}
      </Reveal>

      {/* Marquee at base only. <Marquee> renders a static wrapped list under
          reduced motion, during SSR, and with JS disabled. */}
      <div className="sm:hidden">
        <Marquee speed={28} itemClassName="w-36 shrink-0">
          {technologies.map((tech) => {
            const Logo = logoRegistry[tech.logo]
            return <TechTile key={tech.slug} as="div" name={tech.name} logo={<Logo />} />
          })}
        </Marquee>
      </div>
    </Band>
  )
}
