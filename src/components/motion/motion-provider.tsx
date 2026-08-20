'use client'

import dynamic from 'next/dynamic'

/**
 * The client boundary that keeps GSAP and Lenis out of the initial JS graph.
 *
 * `dynamic(..., { ssr: false })` is not permitted inside a Server Component, so
 * the root layout renders this thin wrapper instead and the motion layer loads
 * after first paint (brief §14).
 */
const MotionRoot = dynamic(() => import('@/components/motion/motion-root'), { ssr: false })

export function MotionProvider() {
  return <MotionRoot />
}
