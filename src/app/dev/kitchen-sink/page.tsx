import type { Metadata } from 'next'

import { logoRegistry } from '@/components/logos'
import { ArrowButton, ArrowGlyph } from '@/components/ui/arrow-button'
import { Band } from '@/components/ui/band'
import { Button } from '@/components/ui/button'
import { EyebrowLabel } from '@/components/ui/eyebrow-label'
import { Marquee } from '@/components/ui/marquee'
import { ProcessStep } from '@/components/ui/process-step'
import { ProjectCard } from '@/components/ui/project-card'
import { ServiceItem } from '@/components/ui/service-item'
import { StatTile } from '@/components/ui/stat-tile'
import { TechTile } from '@/components/ui/tech-tile'
import { featuredProjects } from '@/content/projects'
import { services } from '@/content/services'
import { technologies } from '@/content/tech'

/**
 * Every primitive, every variant, every state (brief §17, Phase 2).
 *
 * Disallowed in robots.ts, absent from sitemap.ts, and linked from nowhere.
 * `noindex` here as well, belt and braces.
 */
export const metadata: Metadata = {
  title: 'Kitchen sink',
  robots: { index: false, follow: false },
}

const rowClasses = 'flex flex-wrap items-center gap-5'

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-hairline py-10 first:border-t-0 first:pt-0">
      <h3 className="type-label mb-6 text-fg-subtle">{title}</h3>
      {children}
    </div>
  )
}

export default function KitchenSinkPage() {
  return (
    <Band label="KITCHEN SINK" headingId="ks-heading">
      <h1 id="ks-heading" className="type-h2 mb-14 text-fg">
        Primitives
      </h1>

      <Group title="Type scale">
        <div className="flex flex-col gap-5">
          <p className="type-h1 text-fg">H1 · Archivo 800 / 78%</p>
          <p className="type-h2 text-fg">H2 · Archivo 800 / 78%</p>
          <p className="type-h3 text-fg">H3 · Archivo 700 / 85%</p>
          <p className="type-h2-secondary text-fg">H2 secondary · Archivo 800 / 85%</p>
          <p className="type-numeral text-fg-secondary">01 · numeral</p>
          <p className="type-title text-fg">Card title · Space Grotesk 600</p>
          <p className="type-body max-w-[46ch] text-fg-muted">
            Body · Space Grotesk 400 at 15px, leading 1.6. This measure caps at roughly 46
            characters, which is what keeps a paragraph readable at this size.
          </p>
          <p className="type-meta text-fg-muted">Meta · Space Grotesk 400 at 13px</p>
          <p className="type-nav text-fg-subtle">Nav · JetBrains Mono 500</p>
          <p className="type-button text-fg-subtle">Button · JetBrains Mono 500</p>
          <EyebrowLabel>EYEBROW LABEL</EyebrowLabel>
        </div>
      </Group>

      <Group title="Buttons — solid / outline / ghost, md and sm, with and without icon">
        <div className="flex flex-col gap-6">
          <div className={rowClasses}>
            <Button variant="solid" size="md">
              SOLID MD
            </Button>
            <Button variant="outline" size="md">
              OUTLINE MD
            </Button>
            <Button variant="ghost" size="md">
              GHOST MD
            </Button>
          </div>
          <div className={rowClasses}>
            <Button variant="solid" size="sm">
              SOLID SM
            </Button>
            <Button variant="outline" size="sm">
              OUTLINE SM
            </Button>
            <Button variant="ghost" size="sm">
              GHOST SM
            </Button>
          </div>
          <div className={rowClasses}>
            <Button variant="solid" icon={false}>
              NO ICON
            </Button>
            <Button variant="outline" href="/">
              AS LINK
            </Button>
            <Button variant="solid" disabled>
              DISABLED
            </Button>
          </div>
        </div>
      </Group>

      <Group title="Arrow controls — interactive vs decorative">
        <div className={rowClasses}>
          <ArrowButton label="Example standalone arrow link" href="/work" />
          <span className="group inline-flex">
            <ArrowGlyph />
          </span>
          <span className="type-meta text-fg-subtle">
            left: ArrowButton (focusable) · right: ArrowGlyph (aria-hidden, for use inside a link)
          </span>
        </div>
      </Group>

      <Group title="Stat tiles — one <dl>, three <dt>/<dd> pairs">
        <dl className="grid grid-cols-1 divide-y divide-hairline sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <StatTile value="6 YRS" label="building for the web" className="py-5 sm:px-5 sm:py-0 sm:first:pl-0" />
          <StatTile value="40+" label="projects shipped" className="py-5 sm:px-5 sm:py-0" />
          <StatTile value="98" label="average Lighthouse score" className="py-5 sm:px-5 sm:py-0 sm:last:pr-0" />
        </dl>
      </Group>

      <Group title="Project cards">
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <li key={project.slug} className="flex">
              <ProjectCard
                index={project.index}
                title={project.title}
                category={project.category}
                cover={project.cover}
                href={project.href}
                concept={project.concept}
                className="w-full"
              />
            </li>
          ))}
        </ul>
      </Group>

      <Group title="Service items">
        <ul className="grid grid-cols-1 divide-y divide-hairline sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {services.slice(0, 3).map((service) => (
            <ServiceItem
              key={service.slug}
              index={service.index}
              title={service.title}
              description={service.description}
              className="py-8 sm:py-0"
            />
          ))}
        </ul>
      </Group>

      <Group title="Tech tiles — all eight brand marks">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-8">
          {technologies.map((tech) => {
            const Logo = logoRegistry[tech.logo]
            return <TechTile key={tech.slug} name={tech.name} logo={<Logo />} />
          })}
        </ul>
      </Group>

      <Group title="Marquee — static wrapped list under reduced motion">
        <Marquee speed={28} itemClassName="w-36 shrink-0">
          {technologies.map((tech) => {
            const Logo = logoRegistry[tech.logo]
            return <TechTile key={tech.slug} as="div" name={tech.name} logo={<Logo />} />
          })}
        </Marquee>
      </Group>

      <Group title="Process steps">
        <ol className="grid grid-cols-1 md:grid-cols-2 md:gap-x-8 lg:grid-cols-4">
          <ProcessStep index={1} title="DISCOVER" description="First step." isLast={false} />
          <ProcessStep index={2} title="DESIGN" description="Second step." isLast={false} />
          <ProcessStep index={3} title="DEVELOP" description="Third step." isLast={false} />
          <ProcessStep index={4} title="LAUNCH" description="Final step." isLast />
        </ol>
      </Group>

      <Group title="Surfaces & lines">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            ['bg-void', 'void'],
            ['bg-surface', 'surface'],
            ['bg-surface-2', 'surface-2'],
            ['bg-surface-3', 'surface-3'],
          ].map(([className, name]) => (
            <div key={name} className="rounded-card border border-hairline p-4">
              <div className={`${className} h-16 rounded-card border border-hairline`} />
              <p className="type-meta mt-3 text-fg-muted">{name}</p>
            </div>
          ))}
        </div>
      </Group>
    </Band>
  )
}
