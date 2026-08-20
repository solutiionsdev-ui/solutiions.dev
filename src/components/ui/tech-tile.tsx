import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

/**
 * Brief §8.5. The logo is an inline SVG component carrying its own
 * role="img" + <title>, so the visible caption below is aria-hidden to avoid
 * announcing the name twice.
 *
 * `as` exists because this tile appears in two different containers: a real
 * <ul> in the static grid, and a role="list" marquee at base — where an <li>
 * would be an invalid child of the track wrapper.
 *
 * Brand-colored marks are one of the two sanctioned exceptions to the
 * no-raw-hex rule (§17, Phase 2) — an SVG brand mark cannot consume a CSS
 * custom property and stay on-brand.
 */
export function TechTile({
  name,
  logo,
  as: Tag = 'li',
  className,
}: {
  name: string
  logo: ReactNode
  as?: 'li' | 'div'
  className?: string
}) {
  return (
    <Tag
      className={cn(
        'group flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded-card border border-hairline bg-surface-2 p-4',
        'transition-colors duration-(--dur-base) ease-(--ease-out-quart) hover:bg-surface-3',
        className,
      )}
    >
      <span className="flex h-8 items-center transition-transform duration-(--dur-base) ease-(--ease-out-quart) group-hover:scale-[1.06]">
        {logo}
      </span>
      <span aria-hidden="true" className="text-xs text-fg-muted">
        {name}
      </span>
    </Tag>
  )
}
