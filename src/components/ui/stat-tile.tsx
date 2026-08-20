import { cn } from '@/lib/cn'

/**
 * Brief §7 / §8.6b. Renders a <dt>/<dd> PAIR, not a self-contained element —
 * wrapping each pair in its own <div> is permitted inside <dl>, but a <li> or a
 * <section> would break the content model.
 *
 * DOM order is dt (label) → dd (value) so the relationship survives without the
 * visual layout; `flex-col-reverse` inverts it visually.
 */
export function StatTile({
  label,
  value,
  className,
}: {
  label: string
  value: string
  className?: string
}) {
  return (
    <div className={cn('flex flex-col-reverse gap-2', className)}>
      <dt className="type-meta text-fg-subtle">{label}</dt>
      <dd className="type-numeral text-fg">{value}</dd>
    </div>
  )
}
