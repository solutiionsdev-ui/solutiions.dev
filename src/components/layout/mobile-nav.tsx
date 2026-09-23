'use client'

import { X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { Button } from '@/components/ui/button'
import { navItems, site } from '@/content/site'
import { cn } from '@/lib/cn'

/**
 * Full-screen navigation sheet below `lg` (brief §8.1).
 *
 * Requirements met here: focus trap, Esc closes, focus returns to the toggle
 * (handled by <SiteHeader>), aria-modal, body scroll locked, 48px link rows.
 */
export function MobileNav({
  open,
  onClose,
  activeId,
}: {
  open: boolean
  onClose: () => void
  activeId: string | null
}) {
  const sheetRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Lock body scroll while the sheet is open, compensating for the scrollbar
  // so the page behind does not shift.
  useEffect(() => {
    if (!open) return

    const { body, documentElement } = document
    const previousOverflow = body.style.overflow
    const previousPadding = body.style.paddingRight
    const scrollbar = window.innerWidth - documentElement.clientWidth

    body.style.overflow = 'hidden'
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`

    return () => {
      body.style.overflow = previousOverflow
      body.style.paddingRight = previousPadding
    }
  }, [open])

  // Esc to close, plus a Tab trap that cycles within the sheet.
  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const focusable = sheetRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      )
      if (!focusable || focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  // Move focus into the sheet once it opens.
  useEffect(() => {
    if (!open) return
    const first = sheetRef.current?.querySelector<HTMLElement>('a[href], button:not([disabled])')
    first?.focus()
  }, [open])

  if (!open) return null

  return (
    <div
      ref={sheetRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className="bg-surface fixed inset-0 z-90 flex flex-col lg:hidden"
    >
      <div className="h-nav px-gutter flex shrink-0 items-center justify-between">
        <span className="type-wordmark text-fg">{site.wordmark}</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation"
          className="hit-area text-fg focus-visible:outline-ring -mr-2 flex size-11 cursor-pointer items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <X aria-hidden="true" strokeWidth={1.5} className="size-5" />
        </button>
      </div>

      <nav aria-label="Primary" className="px-gutter pb-gutter flex-1 overflow-y-auto">
        <ul className="flex flex-col">
          {navItems.map((item) => {
            const id = item.href.split('#')[1] ?? null
            const isActive = (Boolean(id) && id === activeId) || item.href === pathname
            return (
              <li key={item.href} className="border-hairline border-b">
                <Link
                  href={item.href}
                  onClick={onClose}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'type-nav focus-visible:outline-ring flex h-12 cursor-pointer items-center transition-colors duration-(--dur-base) ease-(--ease-out-quart) focus-visible:outline-2 focus-visible:outline-offset-2',
                    isActive ? 'text-fg' : 'text-fg-subtle hover:text-fg',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <Button href="/contact" variant="outline" size="md" className="mt-8 w-full">
          LET&apos;S TALK
        </Button>
      </nav>
    </div>
  )
}
