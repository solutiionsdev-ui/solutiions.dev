'use client'

import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

import { MobileNav } from '@/components/layout/mobile-nav'
import { Button } from '@/components/ui/button'
import { navItems, navSectionIds, site } from '@/content/site'
import { cn } from '@/lib/cn'

/**
 * Brief §8.1. Sticky at the frame inset, fully transparent at rest so the hero
 * reads as one composition, gaining a blurred surface only after 24px of
 * scroll.
 *
 * DEVIATION FROM BRIEF §8.1: the active-section highlight uses ONE
 * IntersectionObserver with six targets rather than one ScrollTrigger per
 * section. The constraint the brief states — "do not attach six independent
 * observers" — is satisfied either way, and this keeps GSAP out of the header's
 * chunk entirely, which matters for the §14 initial-JS budget.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()

  const isHome = pathname === '/'

  // Background engages after 24px. Passive listener, and it only ever flips a
  // boolean, so there is no layout read in the scroll path.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // One observer, six targets.
  useEffect(() => {
    if (!isHome) {
      setActiveId(null)
      return
    }

    const sections = navSectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible.length > 0) setActiveId(visible[0].target.id)
      },
      // A band counts as active once it occupies the upper-middle of the viewport.
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [isHome])

  // Returning focus to the toggle is what makes the sheet keyboard-safe.
  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    toggleRef.current?.focus()
  }, [])

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 sm:top-frame',
          'border-b transition-[background-color,border-color,backdrop-filter] duration-(--dur-base) ease-(--ease-out-quart)',
          scrolled
            ? 'border-hairline bg-surface/80 backdrop-blur-xl'
            : 'border-transparent bg-transparent',
        )}
      >
        <div className="shell flex h-nav items-center justify-between gap-6 lg:h-nav-lg">
          <Link
            href="/"
            className="type-wordmark cursor-pointer text-fg transition-opacity duration-(--dur-base) ease-(--ease-out-quart) hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {site.wordmark}
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {navItems.map((item) => {
                const id = item.href.split('#')[1] ?? null
                const isActive = Boolean(id) && id === activeId
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? 'true' : undefined}
                      className={cn(
                        'type-nav cursor-pointer transition-colors duration-(--dur-base) ease-(--ease-out-quart) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                        isActive ? 'text-fg' : 'text-fg-subtle hover:text-fg',
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="hidden lg:block">
            <Button href="/contact" variant="outline" size="sm">
              LET&apos;S TALK
            </Button>
          </div>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-label="Open navigation"
            className="-mr-2 flex size-11 cursor-pointer items-center justify-center text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:hidden"
          >
            <Menu aria-hidden="true" strokeWidth={1.5} className="size-5" />
          </button>
        </div>
      </header>

      <MobileNav open={menuOpen} onClose={closeMenu} activeId={activeId} />
    </>
  )
}
