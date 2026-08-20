import Image from 'next/image'
import Link from 'next/link'

import { ArrowGlyph } from '@/components/ui/arrow-button'
import type { ImageAsset } from '@/content/types'
import { cn } from '@/lib/cn'

type ProjectCardProps = {
  /** 1-based; rendered as "01". */
  index: number
  title: string
  category: string
  cover: ImageAsset
  href: string
  /** Renders the CONCEPT marker required by brief §20 for placeholder work. */
  concept?: boolean
  /** Overrides the responsive `sizes` hint on non-3-column layouts. */
  sizes?: string
  className?: string
}

const chip =
  'type-label inline-flex h-[1.375rem] items-center rounded-card bg-void/50 px-1.5 text-fg backdrop-blur-sm'

/**
 * Brief §8.3. The whole card is ONE <Link>, so there is exactly one tab stop
 * per card. Its arrow is a decorative <ArrowGlyph> — never an <ArrowButton>,
 * which would nest <a> in <a>.
 *
 * Only transform and opacity animate. The reserved aspect ratio is what makes
 * this card's CLS contribution zero.
 */
export function ProjectCard({
  index,
  title,
  category,
  cover,
  href,
  concept = false,
  sizes = '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw',
  className,
}: ProjectCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group flex cursor-pointer flex-col overflow-hidden rounded-card border border-hairline bg-surface-2',
        'transition-[background-color,border-color] duration-(--dur-base) ease-(--ease-out-quart)',
        'hover:border-hairline-lit hover:bg-surface-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={cover.src}
          alt={cover.alt}
          width={cover.width}
          height={cover.height}
          sizes={sizes}
          className="size-full object-cover transition-transform duration-(--dur-base) ease-(--ease-out-quart) group-hover:scale-[1.03]"
        />
        <span aria-hidden="true" className={cn(chip, 'absolute left-4 top-4')}>
          {String(index).padStart(2, '0')}
        </span>
        {concept ? (
          <span className={cn(chip, 'absolute right-4 top-4 text-fg-secondary')}>
            Concept
            <span className="sr-only"> project — not client work</span>
          </span>
        ) : null}
      </div>

      <div className="flex items-start justify-between gap-4 border-t border-hairline p-5">
        <div className="min-w-0">
          <h3 className="type-title text-fg">{title}</h3>
          <p className="type-meta mt-1 text-fg-muted">{category}</p>
        </div>
        <ArrowGlyph className="mt-0.5" />
      </div>
    </Link>
  )
}
