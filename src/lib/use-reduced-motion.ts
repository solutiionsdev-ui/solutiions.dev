'use client'

import { useEffect, useState } from 'react'

/**
 * Returns null until mounted, then the live value of
 * (prefers-reduced-motion: reduce).
 *
 * The null phase matters: server output must match the first client render, so
 * components branch on `motionAllowed === true` and render the safe, static
 * variant during SSR and hydration. That variant is also what a JS-disabled
 * visitor gets.
 */
export function useReducedMotion(): boolean | null {
  const [reduced, setReduced] = useState<boolean | null>(null)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(query.matches)

    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return reduced
}
