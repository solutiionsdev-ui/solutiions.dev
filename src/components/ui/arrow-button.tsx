import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/lib/cn'

const circle =
  'inline-flex size-control shrink-0 items-center justify-center rounded-pill border border-border transition-[background-color,border-color] duration-(--dur-base) ease-(--ease-out-quart)'

const glyph =
  'size-3.5 transition-transform duration-(--dur-base) ease-(--ease-out-quart) rotate-45'

/**
 * Standalone 40px circular arrow link (brief §7). The arrow sits at 45° at rest
 * and unwinds to 0° on hover.
 *
 * `label` is REQUIRED — an icon-only control has no accessible name otherwise.
 * Use this ONLY on its own. When an arrow sits inside a larger link, use
 * <ArrowGlyph> instead; an <a> inside an <a> is invalid and gives the card two
 * tab stops.
 */
export function ArrowButton({
  label,
  href,
  className,
}: {
  label: string
  href: string
  className?: string
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={cn(
        circle,
        'group hit-area cursor-pointer text-fg hover:border-fg hover:bg-fg/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
        className,
      )}
    >
      <ArrowUpRight aria-hidden="true" strokeWidth={1.75} className={cn(glyph, 'group-hover:rotate-0')} />
    </Link>
  )
}

/**
 * The same 40px visual, purely decorative, for use inside a larger <Link>
 * (e.g. <ProjectCard>). Not interactive, not focusable, hidden from AT.
 * Reacts to hover/focus on the nearest `group` ancestor.
 */
export function ArrowGlyph({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        circle,
        'text-fg group-hover:border-fg group-hover:bg-fg/5 group-focus-visible:border-fg',
        className,
      )}
    >
      <ArrowUpRight
        aria-hidden="true"
        strokeWidth={1.75}
        className={cn(glyph, 'group-hover:rotate-0 group-focus-visible:rotate-0')}
      />
    </span>
  )
}
