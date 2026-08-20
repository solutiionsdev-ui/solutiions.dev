import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import type { ButtonHTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

type Variant = 'solid' | 'outline' | 'ghost'
type Size = 'sm' | 'md'

type BaseProps = {
  variant?: Variant
  size?: Size
  children: string
  /** Trailing ArrowUpRight. On by default — it is the workhorse of this design. */
  icon?: boolean
  className?: string
}

type ButtonProps = BaseProps & {
  href?: string
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'>

/**
 * Brief §7. Renders a <Link> when `href` is present, otherwise a <button>.
 *
 * Transitions enumerate their properties — never `transition-all`. Note the v4
 * paren syntax on duration: there is no `--duration-*` theme namespace, so
 * `duration-base` does not exist (§4).
 */
const base =
  'type-button group inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap transition-[color,background-color,border-color,opacity] duration-(--dur-base) ease-(--ease-out-quart) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50'

const variants: Record<Variant, string> = {
  solid: 'rounded-pill bg-accent text-on-accent hover:bg-fg-secondary',
  outline:
    'rounded-pill border border-border bg-transparent text-fg hover:border-fg hover:bg-fg/5',
  ghost: 'text-fg-muted hover:text-fg [&>span]:hover:underline [&>span]:underline-offset-4',
}

const sizes: Record<Size, string> = {
  // 36px visual; `hit-area` grows the touch target to 44px without inflating it.
  sm: 'hit-area h-9 px-4',
  md: 'h-11 px-6',
}

export function Button({
  variant = 'solid',
  size = 'md',
  children,
  icon = true,
  href,
  className,
  ...rest
}: ButtonProps) {
  const classes = cn(
    base,
    variants[variant],
    // ghost carries no pill and no horizontal padding — it is a bare text link.
    variant === 'ghost' ? (size === 'sm' ? 'hit-area h-9' : 'h-11') : sizes[size],
    className,
  )

  const content = (
    <>
      <span>{children}</span>
      {icon ? (
        <ArrowUpRight
          aria-hidden="true"
          strokeWidth={1.75}
          className="size-3.5 shrink-0 transition-transform duration-(--dur-base) ease-(--ease-out-quart) group-hover:translate-x-px group-hover:-translate-y-px"
        />
      ) : null}
    </>
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    )
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  )
}
