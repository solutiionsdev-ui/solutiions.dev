'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

import { Poster } from '@/components/three/poster'

/**
 * The guard layer for the hero object (brief §10.2).
 *
 * Everything `three` lives behind this dynamic import, so the initial JS graph
 * is unchanged whether the canvas ends up rendering or not. When any guard
 * trips, the import is never even reached — `three` is not fetched at all.
 *
 *   reduced motion  → poster only
 *   ≤4 cores        → poster only
 *   <768px viewport → poster only
 *   saveData        → poster only
 *   offscreen       → frameloop stops
 *   tab hidden      → frameloop stops
 *
 * "A fast site with a beautiful still beats a janky site with a beautiful
 * mesh" — §10.2.
 */
const HeroCanvas = dynamic(() => import('@/components/three/hero-canvas'), {
  ssr: false,
})

type NetworkInformation = { saveData?: boolean }

function canRenderCanvas(): boolean {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  if (window.matchMedia('(max-width: 767px)').matches) return false

  const cores = navigator.hardwareConcurrency
  if (typeof cores === 'number' && cores <= 4) return false

  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection
  if (connection?.saveData) return false

  return true
}

export function HeroObject() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [ready, setReady] = useState(false)
  const [active, setActive] = useState(true)

  // Evaluate the guards after mount. Server output is always the poster, which
  // is also what a JS-disabled visitor keeps.
  //
  // Re-evaluated whenever the two *changeable* guards change, so a visitor who
  // widens a narrow window gets the canvas, and one who narrows it — or turns on
  // reduced motion — drops back to the poster. Core count and saveData cannot
  // change during a page view, so they are only read inside canRenderCanvas().
  useEffect(() => {
    const queries = [
      window.matchMedia('(prefers-reduced-motion: reduce)'),
      window.matchMedia('(max-width: 767px)'),
    ]

    const evaluate = () => setEnabled(canRenderCanvas())
    evaluate()

    queries.forEach((query) => query.addEventListener('change', evaluate))
    return () => queries.forEach((query) => query.removeEventListener('change', evaluate))
  }, [])

  // Never burn GPU on an offscreen canvas, or on a hidden tab.
  useEffect(() => {
    if (!enabled) return

    const element = wrapperRef.current
    if (!element) return

    let onscreen = true
    const sync = () => setActive(onscreen && !document.hidden)

    const observer = new IntersectionObserver(
      ([entry]) => {
        onscreen = entry.isIntersecting
        sync()
      },
      { threshold: 0 },
    )
    observer.observe(element)

    document.addEventListener('visibilitychange', sync)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', sync)
    }
  }, [enabled])

  return (
    // The object carries no information; it must never be the only way to
    // perceive anything.
    <div ref={wrapperRef} aria-hidden="true" className="relative size-full">
      <div
        className="absolute inset-0 transition-opacity duration-(--dur-cross) ease-(--ease-out-quart)"
        style={{ opacity: ready ? 0 : 1 }}
      >
        <Poster />
      </div>

      {enabled ? (
        <div
          className="absolute inset-0 transition-opacity duration-(--dur-cross) ease-(--ease-out-quart)"
          style={{ opacity: ready ? 1 : 0 }}
        >
          <HeroCanvas active={active} onReady={() => setReady(true)} />
        </div>
      ) : null}
    </div>
  )
}
