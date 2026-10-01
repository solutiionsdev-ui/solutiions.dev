'use client'

import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/cn'

/**
 * Renders a live site in an iframe at a fixed "device" width and scales it down
 * to fit its container, so a 1440px desktop layout reads correctly inside a
 * small card or panel instead of collapsing to its mobile breakpoint.
 */
export function LiveFrame({
  src,
  title,
  deviceWidth = 1440,
  interactive = false,
  onLoad,
  className,
}: {
  src: string
  title: string
  deviceWidth?: number
  /** Thumbnails stay inert; the preview modal lets people scroll and click. */
  interactive?: boolean
  onLoad?: () => void
  className?: string
}) {
  const boxRef = useRef<HTMLDivElement>(null)
  const [box, setBox] = useState<{ width: number; height: number } | null>(null)

  useEffect(() => {
    const el = boxRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setBox({ width, height })
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Never scale up: a phone-width frame in a wide panel stays at 1:1, centred.
  const scale = box ? Math.min(1, box.width / deviceWidth) : 0
  const frameWidth = box ? Math.min(deviceWidth, box.width / scale) : deviceWidth

  return (
    <div ref={boxRef} className={cn('relative size-full overflow-hidden', className)}>
      {box ? (
        <iframe
          src={src}
          title={title}
          loading="lazy"
          onLoad={onLoad}
          tabIndex={interactive ? 0 : -1}
          aria-hidden={interactive ? undefined : true}
          referrerPolicy="strict-origin-when-cross-origin"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          style={{
            width: frameWidth,
            height: box.height / scale,
            transform: `scale(${scale})`,
          }}
          className={cn(
            'absolute top-0 left-1/2 origin-top -translate-x-1/2 border-0 bg-white',
            !interactive && 'pointer-events-none',
          )}
        />
      ) : null}
    </div>
  )
}
