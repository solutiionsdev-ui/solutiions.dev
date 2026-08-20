'use client'

import { Children, type ReactNode } from 'react'

import { cn } from '@/lib/cn'
import { useReducedMotion } from '@/lib/use-reduced-motion'

/**
 * Brief §7 / §8.5. Two duplicated tracks translating -50%, linear, 28s.
 * The duplicate is aria-hidden so its contents are never announced twice.
 *
 * Under `prefers-reduced-motion: reduce` — and during SSR and hydration, and
 * with JS disabled — this renders a STATIC WRAPPED GRID rather than a paused
 * marquee. A paused marquee would only ever show the first half of the items.
 */
export function Marquee({
  children,
  /** Seconds for one full track pass. */
  speed = 28,
  className,
  itemClassName,
}: {
  children: ReactNode
  speed?: number
  className?: string
  itemClassName?: string
}) {
  const reduced = useReducedMotion()
  const motionAllowed = reduced === false

  const items = Children.toArray(children)

  if (!motionAllowed) {
    return (
      <div role="list" className={cn('flex flex-wrap gap-3', className)}>
        {items.map((item, index) => (
          <div key={index} role="listitem" className={itemClassName}>
            {item}
          </div>
        ))}
      </div>
    )
  }

  // The visible track is the list; the duplicate exists only to make the loop
  // seamless and is hidden from assistive technology entirely.
  const track = (duplicate: boolean) => (
    <div
      role={duplicate ? undefined : 'list'}
      aria-hidden={duplicate || undefined}
      className="flex shrink-0 gap-3 pr-3"
    >
      {items.map((item, index) => (
        <div key={index} role={duplicate ? undefined : 'listitem'} className={itemClassName}>
          {item}
        </div>
      ))}
    </div>
  )

  return (
    // The band itself carries overflow-hidden so the track can never trigger
    // horizontal page scroll.
    <div className={cn('group relative overflow-hidden', className)}>
      <div
        className="animate-marquee flex w-max group-hover:[animation-play-state:paused]"
        style={{ '--marquee-duration': `${speed}s` } as React.CSSProperties}
      >
        {track(false)}
        {track(true)}
      </div>
    </div>
  )
}
