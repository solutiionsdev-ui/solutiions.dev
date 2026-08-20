import type { Metadata } from 'next'

import { Band } from '@/components/ui/band'
import { ProjectCard } from '@/components/ui/project-card'
import { Reveal } from '@/components/ui/reveal'
import { projects } from '@/content/projects'
import { collectionSchema, jsonLd } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected web development, web application and e-commerce projects by Solutiions.dev.',
  alternates: { canonical: '/work' },
}

/** Brief §8.9. Full project index — no filters in v1. */
export default function WorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(collectionSchema()) }}
      />

      <Band label="ALL PROJECTS" headingId="work-index-heading">
        <div className="mb-14 max-w-[46ch]">
          <h1 id="work-index-heading" className="type-h2 text-fg">
            Selected work.
          </h1>
          <p className="type-body mt-6 text-fg-muted">
            Every project below is concept work, built to demonstrate how we approach a brief. It
            is not client work and is labelled as such.
          </p>
        </div>

        <Reveal as="ul" stagger className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <li key={project.slug} className="flex">
              <ProjectCard
                index={project.index}
                title={project.title}
                category={project.category}
                cover={project.cover}
                href={project.href}
                concept={project.concept}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="w-full"
              />
            </li>
          ))}
        </Reveal>
      </Band>
    </>
  )
}
