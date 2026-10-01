'use client'

import { ArrowUpRight, Maximize2, Minimize2, Monitor, RotateCw, Smartphone } from 'lucide-react'
import { useEffect, useState } from 'react'

import { LiveFrame } from '@/components/portfolio/live-frame'
import { cn } from '@/lib/cn'

const devices = {
  desktop: { width: 1440, label: 'Desktop', Icon: Monitor },
  mobile: { width: 390, label: 'Mobile', Icon: Smartphone },
} as const

type Device = keyof typeof devices

const toolButton =
  'flex size-8 cursor-pointer items-center justify-center rounded-pill text-fg-muted transition-colors duration-(--dur-base) ease-(--ease-out-quart) hover:bg-surface-2 hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-pressed:bg-surface-2 aria-pressed:text-fg'

/**
 * The real, running site inside the preview modal: a browser-style bar with a
 * device toggle, reload, full-screen and open-in-new-tab, over an interactive
 * iframe people can scroll and click through.
 */
export function LivePreview({ url, title }: { url: string; title: string }) {
  const [device, setDevice] = useState<Device>('desktop')
  const [expanded, setExpanded] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)
  const [loading, setLoading] = useState(true)

  // A new project, device or reload means a fresh page load.
  useEffect(() => setLoading(true), [url, device, reloadKey])

  // Escape leaves full screen before it closes the modal: capture on window
  // runs ahead of the modal's document listener.
  useEffect(() => {
    if (!expanded) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      event.stopImmediatePropagation()
      setExpanded(false)
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [expanded])

  const host = url.replace(/^https?:\/\//, '').replace(/\/$/, '')

  return (
    <div
      className={cn(
        'bg-surface flex flex-col',
        expanded
          ? 'rounded-frame border-hairline fixed inset-2 z-[70] border sm:inset-4'
          : 'size-full',
      )}
    >
      <div className="border-hairline flex h-12 shrink-0 items-center gap-2 border-b px-3">
        <div className="flex items-center gap-1" role="group" aria-label="Preview size">
          {(Object.keys(devices) as Device[]).map((key) => {
            const { label, Icon } = devices[key]
            return (
              <button
                key={key}
                type="button"
                aria-pressed={device === key}
                aria-label={`${label} view`}
                title={`${label} view`}
                onClick={() => setDevice(key)}
                className={toolButton}
              >
                <Icon aria-hidden="true" strokeWidth={1.5} className="size-4" />
              </button>
            )
          })}
        </div>

        <div className="rounded-pill bg-surface-2 text-fg-muted type-label flex h-8 min-w-0 flex-1 items-center gap-2 px-3">
          <span
            aria-hidden="true"
            className={cn(
              'rounded-pill size-1.5 shrink-0',
              loading ? 'bg-fg-subtle animate-pulse' : 'bg-emerald-500',
            )}
          />
          <span className="truncate">{host}</span>
          <span className="sr-only">{loading ? 'Loading' : 'Live'}</span>
        </div>

        <button
          type="button"
          onClick={() => setReloadKey((key) => key + 1)}
          aria-label="Reload preview"
          title="Reload"
          className={toolButton}
        >
          <RotateCw aria-hidden="true" strokeWidth={1.5} className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-pressed={expanded}
          aria-label={expanded ? 'Exit full screen' : 'Full screen'}
          title={expanded ? 'Exit full screen (Esc)' : 'Full screen'}
          className={toolButton}
        >
          {expanded ? (
            <Minimize2 aria-hidden="true" strokeWidth={1.5} className="size-4" />
          ) : (
            <Maximize2 aria-hidden="true" strokeWidth={1.5} className="size-4" />
          )}
        </button>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open site in a new tab"
          title="Open in new tab"
          className={toolButton}
        >
          <ArrowUpRight aria-hidden="true" strokeWidth={1.5} className="size-4" />
        </a>
      </div>

      <div className="bg-surface-2 relative min-h-0 flex-1">
        <LiveFrame
          key={`${url}-${device}-${reloadKey}`}
          src={url}
          title={`${title} — live site`}
          deviceWidth={devices[device].width}
          interactive
          onLoad={() => setLoading(false)}
          className={cn(device === 'mobile' && 'mx-auto max-w-[390px]')}
        />
        {loading ? (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="type-label text-fg-subtle animate-pulse">LOADING LIVE SITE…</span>
          </div>
        ) : null}
      </div>
    </div>
  )
}
