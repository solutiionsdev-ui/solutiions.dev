import type { ReactNode } from 'react'

import { EyebrowLabel } from '@/components/ui/eyebrow-label'
import { cn } from '@/lib/cn'

type BandProps = {
  id?: string
  /** Eyebrow text. Decorative — see the heading model note below. */
  label?: string
  /** Right-aligned link in the label row, e.g. "VIEW ALL PROJECTS ↗". */
  action?: ReactNode
  /**
   * id of a display <h2> that `children` renders itself (About, CTA band).
   * When omitted, Band renders an sr-only <h2> carrying `label`, so every
   * section is named without anything being announced twice (§13).
   */
  headingId?: string
  className?: string
  /** Applied to the inner shell, for sections that need their own grid. */
  contentClassName?: string
  children: ReactNode
}

/**
 * The one section wrapper (brief §7). A <section> with a hairline top border,
 * band padding, the shared shell, and the label row.
 *
 * Bands never have their own outer margin. Separation is ONE hairline, no gap —
 * that is what makes the page read as a spec sheet rather than a stack of
 * cards (§6.1).
 */
export function Band({
  id,
  label,
  action,
  headingId,
  className,
  contentClassName,
  children,
}: BandProps) {
  const ownsHeading = Boolean(headingId)
  const fallbackHeadingId = id ? `${id}-heading` : undefined
  const labelledBy = headingId ?? (label ? fallbackHeadingId : undefined)

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn('border-t border-hairline py-band lg:py-band-lg', className)}
    >
      <div className={cn('shell', contentClassName)}>
        {/* The visible eyebrow is aria-hidden, so this sr-only heading is the
            section's only accessible name. */}
        {!ownsHeading && label ? (
          <h2 id={fallbackHeadingId} className="sr-only">
            {label}
          </h2>
        ) : null}

        {label || action ? (
          <div className="mb-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 lg:mb-14">
            {label ? <EyebrowLabel>{label}</EyebrowLabel> : <span />}
            {action}
          </div>
        ) : null}

        {children}
      </div>
    </section>
  )
}
