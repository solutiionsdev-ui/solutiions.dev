import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/lib/cn'

type ServiceItemProps = {
  index: number
  title: string
  description: string
  href?: string
  className?: string
}

/**
 * Brief §8.4. Cells are `flex flex-col` with equal heights so the footer rules
 * align across all six — that alignment is most of the section's quality.
 */
export function ServiceItem({ index, title, description, href, className }: ServiceItemProps) {
  const body = (
    <>
      <span aria-hidden="true" className="type-numeral block text-fg-secondary">
        {String(index).padStart(2, '0')}
      </span>
      <h3 className="type-title mt-6 text-fg">{title}</h3>
      <p className="type-meta mt-3 max-w-[30ch] text-fg-muted">{description}</p>
      <span
        aria-hidden="true"
        className="mt-auto flex items-center justify-between pt-8 text-fg-subtle"
      >
        <span className="block h-px w-4 bg-current" />
        <ArrowUpRight
          strokeWidth={1.75}
          className="size-3.5 transition-transform duration-(--dur-base) ease-(--ease-out-quart) group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
    </>
  )

  const shared = 'group flex h-full flex-col px-6 first:pl-0 last:pr-0'

  if (href) {
    return (
      <li className={cn('flex', className)}>
        <Link
          href={href}
          className={cn(
            shared,
            'w-full cursor-pointer transition-colors duration-(--dur-base) ease-(--ease-out-quart) hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
          )}
        >
          {body}
        </Link>
      </li>
    )
  }

  return <li className={cn(shared, className)}>{body}</li>
}
