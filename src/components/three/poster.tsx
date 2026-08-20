import Image from 'next/image'

/**
 * The still that stands in for the canvas (brief §10.2).
 *
 * It is `priority` because it sits above the fold and may legitimately BE the
 * LCP element — which is the point: the canvas never is.
 *
 * This is also the entire hero visual under reduced motion, on low-power
 * devices, on mobile, and with JavaScript disabled.
 */
export function Poster({ className }: { className?: string }) {
  return (
    <Image
      src="/images/hero-poster.svg"
      alt=""
      aria-hidden="true"
      width={1200}
      height={1200}
      priority
      sizes="(min-width: 1024px) 50vw, 100vw"
      className={className ?? 'size-full object-contain'}
    />
  )
}
