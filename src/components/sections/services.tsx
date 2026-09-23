import { Band } from '@/components/ui/band'
import { Reveal } from '@/components/ui/reveal'
import { ServiceItem } from '@/components/ui/service-item'
import { services, servicesHeading } from '@/content/services'

/**
 * Brief §8.4. Vertical hairlines between columns in a row, horizontal ones
 * between rows; at base, horizontal only. The six footer rules land on one
 * baseline at xl because every cell is a full-height flex column.
 */
export function Services() {
  return (
    <Band id="services" label="WHAT WE DO" headingId="services-heading">
      <h2 id="services-heading" className="type-h2-secondary text-fg mb-12 max-w-[24ch] lg:mb-16">
        {servicesHeading}
      </h2>
      <Reveal
        as="ul"
        stagger
        className="divide-hairline grid grid-cols-1 divide-y sm:grid-cols-2 sm:divide-x md:grid-cols-3 xl:grid-cols-6 xl:divide-y-0"
      >
        {services.map((service) => (
          <ServiceItem
            key={service.slug}
            index={service.index}
            title={service.title}
            description={service.description}
            className="py-8 first:pt-0 sm:py-0"
          />
        ))}
      </Reveal>
    </Band>
  )
}
