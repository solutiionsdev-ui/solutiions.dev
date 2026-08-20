import { createElement, type ElementType, type ReactNode } from 'react'

import { cn } from '@/lib/cn'

type RevealProps = {
  as?: ElementType
  /** Stagger direct children instead of the wrapper itself. */
  stagger?: boolean
  /** Seconds. */
  delay?: number
  className?: string
  children: ReactNode
}

/**
 * The standard scroll reveal (brief §7, presets B and C in §9.2).
 *
 * This is a SERVER component on purpose. It only marks the element; <MotionRoot>
 * — which is dynamically imported and therefore absent from the initial JS
 * graph — finds `[data-reveal]` and animates it with `gsap.from`.
 *
 * Consequences, both deliberate:
 *   • no `opacity: 0` is ever baked into CSS, so content stays readable with
 *     JavaScript disabled and to crawlers (§9.5, §21.8);
 *   • wrapping a section in <Reveal> costs zero client JS.
 *
 * `createElement` rather than `<Tag>` because a polymorphic `as: ElementType`
 * collapses the `children` prop to `never` under JSX type inference.
 */
export function Reveal({ as = 'div', stagger = false, delay, className, children }: RevealProps) {
  return createElement(
    as,
    {
      'data-reveal': stagger ? 'stagger' : 'self',
      'data-reveal-delay': delay,
      className: cn(className),
    },
    children,
  )
}
