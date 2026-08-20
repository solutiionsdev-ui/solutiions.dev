import { cn } from '@/lib/cn'

/**
 * Brief §8.6. Rendered inside an <ol> so the sequence is conveyed
 * structurally; the connector line and its nodes are aria-hidden decoration
 * drawn by <Process>, not by this component.
 */
export function ProcessStep({
  index,
  title,
  description,
  isLast,
  className,
}: {
  index: number
  title: string
  description: string
  isLast: boolean
  className?: string
}) {
  return (
    <li
      className={cn(
        'relative flex flex-col pl-10 lg:pl-0',
        // Below lg the connector is a vertical rail on the left; the last step
        // stops the rail rather than running it off the end of the list.
        !isLast && 'pb-12 lg:pb-0',
        className,
      )}
    >
      {/* Below lg the connector is a vertical rail on the left; this is this
          step's node on it. Decoration — the <ol> conveys the sequence. */}
      <span
        aria-hidden="true"
        className="absolute left-[3px] top-3.5 block size-[7px] -translate-x-1/2 -translate-y-1/2 rounded-pill border border-hairline-lit bg-surface lg:hidden"
      />

      <span aria-hidden="true" className="type-numeral text-fg-secondary">
        {String(index).padStart(2, '0')}
      </span>
      <h3 className="type-title mt-6 text-fg">{title}</h3>
      <p className="type-meta mt-3 max-w-[32ch] text-fg-muted">{description}</p>
    </li>
  )
}
