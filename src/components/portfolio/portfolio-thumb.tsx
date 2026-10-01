'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { LiveFrame } from '@/components/portfolio/live-frame'
import type { PortfolioItem } from '@/content/portfolio'
import { cn } from '@/lib/cn'

/**
 * Card thumbnail, getlayers-style: the cover image renders first (crawlable,
 * instant), then once the card nears the viewport it is replaced by a looping
 * screen recording or, failing that, a scaled-down live view of the site.
 */
export function PortfolioThumb({
  item,
  sizes,
  priority = false,
  imageClassName,
}: {
  item: PortfolioItem
  sizes: string
  priority?: boolean
  imageClassName?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [near, setNear] = useState(false)
  const [visible, setVisible] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || (!item.video && !item.liveUrl)) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting)
        if (entry.isIntersecting) setNear(true)
      },
      { rootMargin: '200px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [item.video, item.liveUrl])

  // Only spend decode time on recordings that are on screen.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (visible) video.play().catch(() => {})
    else video.pause()
  }, [visible, near])

  return (
    <div ref={ref} className="relative size-full">
      <Image
        src={item.cover.src}
        alt={item.cover.alt}
        width={item.cover.width}
        height={item.cover.height}
        sizes={sizes}
        priority={priority}
        className={cn('size-full object-cover object-top', imageClassName)}
      />

      {near && item.video ? (
        <video
          ref={videoRef}
          src={item.video}
          muted
          loop
          playsInline
          preload="metadata"
          onCanPlay={() => setReady(true)}
          aria-hidden="true"
          className={cn(
            'absolute inset-0 size-full object-cover object-top transition-opacity duration-(--dur-base)',
            ready ? 'opacity-100' : 'opacity-0',
          )}
        />
      ) : near && item.liveUrl ? (
        <LiveFrame
          src={item.liveUrl}
          title={`${item.title} live preview`}
          onLoad={() => setReady(true)}
          className={cn(
            'absolute inset-0 transition-opacity duration-(--dur-slow,600ms)',
            ready ? 'opacity-100' : 'opacity-0',
          )}
        />
      ) : null}
    </div>
  )
}
