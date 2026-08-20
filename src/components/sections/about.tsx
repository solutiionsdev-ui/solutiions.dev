import { Band } from '@/components/ui/band'
import { Reveal } from '@/components/ui/reveal'
import { StatTile } from '@/components/ui/stat-tile'
import { about, stats } from '@/content/about'

/**
 * Brief §8.6b. This is what the nav's ABOUT link targets; it is a section on
 * the home page in v1, not a route.
 *
 * The band owns a real display <h2>, so <Band> is told about it via `headingId`
 * and does not render an sr-only one.
 *
 * The three stats are ONE <dl> containing three <dt>/<dd> pairs, so the
 * label↔value relationship survives without the visual layout.
 */
export function About() {
  return (
    <Band id="about" label="WHO WE ARE" headingId="about-heading">
      <Reveal stagger className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <h2 id="about-heading" className="type-h2-secondary text-fg">
            {about.heading}
          </h2>
          <p className="type-body mt-6 max-w-[46ch] text-fg-muted">{about.body}</p>
        </div>

        <dl className="grid grid-cols-1 divide-y divide-hairline sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:col-span-5">
          {stats.map((stat) => (
            <StatTile
              key={stat.label}
              value={stat.value}
              label={stat.label}
              className="py-5 first:pt-0 last:pb-0 sm:px-5 sm:py-0 sm:first:pl-0 sm:last:pr-0"
            />
          ))}
        </dl>
      </Reveal>
    </Band>
  )
}
