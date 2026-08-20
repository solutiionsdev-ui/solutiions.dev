import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ArrowGlyph } from '@/components/ui/arrow-button'
import { Band } from '@/components/ui/band'
import { EyebrowLabel } from '@/components/ui/eyebrow-label'
import { Reveal } from '@/components/ui/reveal'
import { StatTile } from '@/components/ui/stat-tile'
import { getNextProject, getProject, projects } from '@/content/projects'
import { creativeWorkSchema, jsonLd } from '@/lib/structured-data'

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return { title: 'Not found' }

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: project.href },
    openGraph: {
      title: `${project.title} — ${project.category}`,
      description: project.summary,
      images: [{ url: project.cover.src }],
    },
  }
}

/**
 * Brief §8.9. Hero (title, category, year, role) → problem → approach →
 * full-bleed images → results → next project.
 */
export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const next = getNextProject(slug)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(creativeWorkSchema(project)) }}
      />

      {/* Hero */}
      <section aria-labelledby="case-heading" className="py-band lg:py-band-lg">
        <div className="shell">
          <EyebrowLabel>{project.category}</EyebrowLabel>

          <h1 id="case-heading" className="type-h2 mt-6 text-fg">
            {project.title}
          </h1>

          {project.concept ? (
            <p className="type-label mt-6 inline-flex items-center rounded-card border border-hairline bg-surface-2 px-3 py-2 text-fg-secondary">
              Concept project — not client work
            </p>
          ) : null}

          <p className="type-body mt-8 max-w-[52ch] text-fg-muted">{project.summary}</p>

          <dl className="mt-12 grid grid-cols-1 gap-6 border-t border-hairline pt-8 sm:grid-cols-3">
            <div className="flex flex-col gap-2">
              <dt className="type-label text-fg-subtle">Year</dt>
              <dd className="type-meta text-fg">{project.year}</dd>
            </div>
            <div className="flex flex-col gap-2">
              <dt className="type-label text-fg-subtle">Category</dt>
              <dd className="type-meta text-fg">{project.category}</dd>
            </div>
            <div className="flex flex-col gap-2">
              <dt className="type-label text-fg-subtle">Role</dt>
              <dd className="type-meta text-fg">{project.role.join(' · ')}</dd>
            </div>
          </dl>
        </div>
      </section>

      <Band label="THE PROBLEM">
        <Reveal>
          <p className="type-body max-w-[62ch] text-fg-muted">{project.problem}</p>
        </Reveal>
      </Band>

      <Band label="OUR APPROACH">
        <Reveal>
          <p className="type-body max-w-[62ch] text-fg-muted">{project.approach}</p>
        </Reveal>
      </Band>

      {project.gallery && project.gallery.length > 0 ? (
        <section aria-label={`${project.title} gallery`} className="border-t border-hairline">
          <ul>
            {project.gallery.map((image) => (
              <li key={image.src} className="border-b border-hairline last:border-b-0">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="100vw"
                  className="h-auto w-full"
                />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {project.results && project.results.length > 0 ? (
        <Band label="RESULTS">
          <dl className="grid grid-cols-1 divide-y divide-hairline sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {project.results.map((result) => (
              <StatTile
                key={result.label}
                value={result.value}
                label={result.label}
                className="py-5 first:pt-0 last:pb-0 sm:px-5 sm:py-0 sm:first:pl-0 sm:last:pr-0"
              />
            ))}
          </dl>
        </Band>
      ) : null}

      <Band label="NEXT PROJECT">
        <Link
          href={next.href}
          className="group flex cursor-pointer items-center justify-between gap-6 rounded-card border border-hairline bg-surface-2 p-6 transition-[background-color,border-color] duration-(--dur-base) ease-(--ease-out-quart) hover:border-hairline-lit hover:bg-surface-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:p-8"
        >
          <span className="min-w-0">
            <span className="type-meta block text-fg-muted">{next.category}</span>
            <span className="type-h2-secondary mt-2 block text-fg">{next.title}</span>
          </span>
          <ArrowGlyph />
        </Link>
      </Band>
    </>
  )
}
