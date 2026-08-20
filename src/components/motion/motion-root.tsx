'use client'

import Lenis from 'lenis'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { gsap, ScrollTrigger, SplitText, useGSAP } from '@/lib/gsap'

/**
 * The whole motion layer (brief §9), in one dynamically-imported client
 * component. Nothing in here is required to read the page: every target is
 * already in its final CSS state, and every reveal uses `gsap.from`, so with
 * JavaScript off — or under reduced motion — the page simply renders as
 * authored.
 *
 * §9.4 is non-negotiable and is enforced structurally: the `reduce` branch of
 * matchMedia returns immediately, so there is no SplitText, no pin, no scrub,
 * no Lenis, and no rail loop for those users.
 */
export default function MotionRoot() {
  const scope = useRef<HTMLDivElement>(null)
  // MotionRoot lives in the root layout and therefore mounts ONCE. Without
  // re-running on navigation, a client-side route change would leave the new
  // page's [data-reveal] elements unregistered — they would still be readable
  // (nothing is hidden by CSS) but would never animate.
  const pathname = usePathname()

  // Lenis is set up outside matchMedia because it is not a GSAP animation, but
  // it is still gated on the same media query.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({ duration: 1.05, smoothWheel: true })

    lenis.on('scroll', ScrollTrigger.update)

    const onTick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    // Same-page anchors have to go through Lenis, or the native jump and the
    // smooth-scroll loop fight each other.
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href) return

      const hash = href.startsWith('#')
        ? href
        : href.startsWith('/#') && window.location.pathname === '/'
          ? href.slice(1)
          : null
      if (!hash || hash === '#') return

      const target = document.querySelector(hash)
      if (!target) return

      event.preventDefault()
      const offset = window.matchMedia('(min-width: 1024px)').matches ? -96 : -80
      lenis.scrollTo(target as HTMLElement, { offset })
      window.history.pushState(null, '', hash)
    }

    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      gsap.ticker.remove(onTick)
      lenis.destroy()
    }
  }, [])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(
        {
          ok: '(prefers-reduced-motion: no-preference)',
          reduce: '(prefers-reduced-motion: reduce)',
          desktop: '(min-width: 1024px)',
        },
        (context) => {
          const { reduce, desktop } = context.conditions as {
            reduce: boolean
            desktop: boolean
          }

          // Final state renders as authored — there is nothing to do.
          if (reduce) return

          const splits: SplitText[] = []

          /* ── Preset A · Hero char reveal ───────────────────────────────── */
          const heading = document.querySelector<HTMLElement>('[data-split]')
          if (heading) {
            const split = new SplitText(heading, {
              type: 'lines,chars',
              linesClass: 'split-line',
              charsClass: 'split-char',
            })
            splits.push(split)

            // Each line clips its own chars, so they rise out of the line box.
            split.lines.forEach((line) => {
              ;(line as HTMLElement).style.overflow = 'hidden'
            })

            split.lines.forEach((line, index) => {
              const chars = line.querySelectorAll('.split-char')
              gsap.from(chars, {
                opacity: 0,
                y: 20,
                rotateX: -40,
                duration: 0.6,
                stagger: 0.015,
                ease: 'expo.out',
                delay: index * 0.08,
              })
            })
          }

          /* ── Preset B · Band reveal ────────────────────────────────────── */
          gsap.utils.toArray<HTMLElement>('[data-reveal="self"]').forEach((element) => {
            gsap.from(element, {
              opacity: 0,
              y: 24,
              duration: 0.5,
              ease: 'power2.out',
              delay: Number(element.dataset.revealDelay) || 0,
              scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            })
          })

          /* ── Preset C · Grid reveal ────────────────────────────────────── */
          gsap.utils.toArray<HTMLElement>('[data-reveal="stagger"]').forEach((element) => {
            // Beyond 8 staggered children the tail feels laggy (§9.2).
            const children = Array.from(element.children).slice(0, 8)
            if (children.length === 0) return

            gsap.from(children, {
              opacity: 0,
              y: 16,
              duration: 0.45,
              // power3.out, NOT back.out — no overshoot in this design language.
              ease: 'power3.out',
              stagger: { each: 0.06, grid: 'auto', from: 'start' },
              delay: Number(element.dataset.revealDelay) || 0,
              scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            })
          })

          /* ── Preset D · Line draw ──────────────────────────────────────── */
          gsap.utils.toArray<HTMLElement>('[data-draw]').forEach((line) => {
            const section = line.closest('section') ?? line
            const vertical = line.classList.contains('lg:hidden')

            gsap.fromTo(
              line,
              vertical ? { scaleY: 0 } : { scaleX: 0 },
              {
                ...(vertical ? { scaleY: 1 } : { scaleX: 1 }),
                transformOrigin: vertical ? 'center top' : 'left center',
                duration: 0.9,
                ease: 'expo.out',
                scrollTrigger: { trigger: section, start: 'top 70%' },
              },
            )
          })

          gsap.utils.toArray<HTMLElement>('[data-draw-node]').forEach((node, index) => {
            gsap.from(node, {
              opacity: 0,
              duration: 0.4,
              ease: 'power2.out',
              delay: 0.12 * (index + 1),
              scrollTrigger: {
                trigger: node.closest('section') ?? node,
                start: 'top 70%',
              },
            })
          })

          /* ── Hero pin — the ONLY pinned section on the page (§9.3) ──────── */
          const hero = document.querySelector<HTMLElement>('#hero')
          const rail = document.querySelector<HTMLElement>('[data-scroll-rail]')

          if (desktop && hero) {
            const heroCopy = hero.querySelector<HTMLElement>('[data-hero-copy]')
            const heroObject = hero.querySelector<HTMLElement>('[data-hero-copy] ~ div')

            const timeline = gsap.timeline({
              scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: '+=120%',
                pin: true,
                pinSpacing: true,
                scrub: 1,
                // will-change lives only here, and only while the timeline runs.
                onEnter: () => hero.style.setProperty('will-change', 'transform'),
                onLeave: () => hero.style.removeProperty('will-change'),
                onLeaveBack: () => hero.style.removeProperty('will-change'),
              },
            })

            if (heroObject) timeline.to(heroObject, { yPercent: -12, ease: 'none' }, 0)
            if (heroCopy) timeline.to(heroCopy, { yPercent: -4, ease: 'none' }, 0)
            if (rail) timeline.to(rail, { opacity: 0, ease: 'none' }, 0)
          }

          /* ── Scroll rail fades out permanently past 15% ─────────────────── */
          if (rail && !desktop) {
            ScrollTrigger.create({
              start: () => window.innerHeight * 0.15,
              onEnter: () => gsap.to(rail, { opacity: 0, duration: 0.3 }),
            })
          }

          // Pinned heights are computed against layout — recompute once fonts
          // and hero images have settled, or they are simply wrong.
          const refresh = () => ScrollTrigger.refresh()
          document.fonts?.ready.then(refresh)
          window.addEventListener('load', refresh)

          return () => {
            window.removeEventListener('load', refresh)
            // Give screen readers the original text nodes back.
            splits.forEach((split) => split.revert())
          }
        },
      )

      return () => mm.revert()
    },
    { scope, dependencies: [pathname], revertOnUpdate: true },
  )

  return <div ref={scope} aria-hidden="true" className="sr-only" />
}
