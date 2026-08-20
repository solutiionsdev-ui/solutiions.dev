import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

/**
 * The signature move of the design (brief §6.1): the whole page sits inside an
 * inset frame on --color-void, and every band inherits its horizontal rhythm.
 *
 * `overflow-clip`, NOT `overflow-hidden`. `overflow: hidden` creates a scroll
 * container, and a `position: sticky` child sticks to its nearest scrolling
 * ancestor — the sticky header would scroll away with the page. `clip` clips to
 * the rounded corners without creating one.
 *
 * Below 640px the inset and radius both drop to 0 — full-bleed on phones.
 */
export function Frame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'relative m-0 min-h-svh overflow-clip bg-surface',
        'sm:m-frame sm:rounded-frame sm:border sm:border-hairline',
        className,
      )}
    >
      {children}
    </div>
  )
}
