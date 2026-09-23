'use client'

import { ArrowUpRight, Check, Eye, Link2, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { PortfolioGuide } from '@/components/portfolio/portfolio-guide'
import { Button } from '@/components/ui/button'
import { portfolio, type PortfolioItem } from '@/content/portfolio'

const pill =
  'type-label inline-flex h-6 items-center rounded-pill border border-hairline-lit px-2.5 text-fg-muted'

const primaryButton =
  'type-button inline-flex h-11 items-center gap-2 rounded-pill px-5 transition-colors duration-(--dur-base) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'

const iconButton =
  'flex size-10 cursor-pointer items-center justify-center rounded-pill border border-hairline-lit text-fg-muted transition-colors duration-(--dur-base) ease-(--ease-out-quart) hover:border-border hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'

/**
 * Project preview modal: scrollable preview + "More like this" on the left,
 * details on the right; stacked on small screens. Escape, the backdrop and the
 * close button all dismiss it, and focus returns to the card that opened it.
 */
export function PortfolioPreview({
  item,
  onClose,
  onSelect,
}: {
  item: PortfolioItem
  onClose: () => void
  onSelect: (slug: string) => void
}) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)

  const related = portfolio
    .filter((other) => other.slug !== item.slug)
    .sort(
      (a, b) =>
        Number(b.type === item.type) +
        Number(b.industry === item.industry) -
        (Number(a.type === item.type) + Number(a.industry === item.industry)),
    )
    .slice(0, 4)

  // Lock page scroll, close on Escape, keep Tab inside the dialog.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab' || !dialogRef.current) return
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  // New project → focus the dialog and scroll the preview back to the top.
  useEffect(() => {
    dialogRef.current?.focus()
    previewRef.current?.scrollTo({ top: 0 })
    mediaRef.current?.scrollTo({ top: 0 })
    setCopied(false)
  }, [item.slug])

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard can be blocked; the URL bar already holds the shareable link.
    }
  }

  return (
    // data-lenis-prevent: Lenis smooth-scroll otherwise swallows wheel/trackpad
    // events, so none of the panels inside the modal would scroll.
    <div
      data-lenis-prevent
      className="fixed inset-0 z-[60] flex items-stretch justify-center p-2 sm:p-4 lg:p-6"
    >
      <div
        aria-hidden="true"
        onClick={onClose}
        className="bg-void/70 absolute inset-0 backdrop-blur-md"
      />

      {/* Phones: the details' close button scrolls away, so pin one here. */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close preview"
        className={`${iconButton} bg-surface fixed top-4 right-4 z-10 lg:hidden`}
      >
        <X aria-hidden="true" strokeWidth={1.5} className="size-4" />
      </button>

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="preview-title"
        tabIndex={-1}
        className="relative flex w-full max-w-[90rem] flex-col gap-2 overflow-y-auto outline-none sm:gap-4 lg:flex-row lg:overflow-hidden"
      >
        {/* Left: preview + more like this */}
        <div
          ref={previewRef}
          className="rounded-frame border-hairline bg-surface flex shrink-0 flex-col overflow-hidden border lg:min-w-0 lg:flex-[1.35] lg:overflow-y-auto"
        >
          {/* Fixed-height window: scroll inside it to see the whole site, so
              "More like this" and the FAQs sit right underneath. */}
          <div
            ref={mediaRef}
            tabIndex={0}
            aria-label="Project preview, scrollable"
            className="bg-surface-2 border-hairline aspect-[16/10] shrink-0 overflow-y-auto border-b outline-none lg:aspect-auto lg:h-[52vh]"
          >
            {item.video ? (
              <video
                src={item.video}
                poster={item.cover.src}
                autoPlay
                muted
                loop
                playsInline
                className="block w-full"
              />
            ) : (
              [item.cover, ...item.gallery].map((image, index) => (
                <Image
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  priority={index === 0}
                  className="block h-auto w-full"
                />
              ))
            )}
          </div>

          <PortfolioGuide type={item.type} className="hidden lg:block" />

          {related.length > 0 ? (
            <div className="border-hairline hidden border-t p-6 lg:block">
              <p className="type-label text-fg-subtle">MORE LIKE THIS</p>
              <ul className="mt-4 grid grid-cols-2 gap-4 xl:grid-cols-4">
                {related.map((other) => (
                  <li key={other.slug}>
                    <button
                      type="button"
                      onClick={() => onSelect(other.slug)}
                      className="group focus-visible:outline-ring block w-full cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-4"
                    >
                      <span className="rounded-card border-hairline block aspect-[16/10] overflow-hidden border">
                        <Image
                          src={other.cover.src}
                          alt=""
                          width={other.cover.width}
                          height={other.cover.height}
                          sizes="15vw"
                          className="size-full object-cover transition-transform duration-(--dur-base) ease-(--ease-out-quart) group-hover:scale-[1.04]"
                        />
                      </span>
                      <span className="type-label text-fg-muted group-hover:text-fg mt-2 block truncate">
                        {other.title}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        {/* Right: details */}
        <div className="rounded-frame border-hairline bg-surface relative shrink-0 border p-6 sm:p-8 lg:w-[26rem] lg:overflow-y-auto xl:w-[30rem]">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className={`${iconButton} absolute top-4 right-4 hidden lg:flex`}
          >
            <X aria-hidden="true" strokeWidth={1.5} className="size-4" />
          </button>

          <div className="flex flex-wrap gap-2 lg:pr-12">
            <span className={pill}>{item.type}</span>
            <span className={pill}>{item.industry}</span>
            {item.concept ? (
              <span className={pill}>
                Concept<span className="sr-only"> project — not client work</span>
              </span>
            ) : null}
          </div>

          <h2 id="preview-title" className="type-h2-secondary text-fg mt-6">
            {item.title}
          </h2>

          <p className="type-body text-fg-muted mt-6">{item.description}</p>

          {item.tags.length > 0 ? (
            <ul className="mt-6 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <li key={tag} className={pill}>
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            {item.liveUrl ? (
              <a
                href={item.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${primaryButton} bg-accent text-on-accent hover:bg-fg-secondary`}
              >
                <Eye aria-hidden="true" strokeWidth={1.75} className="size-4" />
                CHECK LIVE PREVIEW
                <ArrowUpRight aria-hidden="true" strokeWidth={1.75} className="size-3.5" />
              </a>
            ) : (
              <span
                aria-disabled="true"
                title="Live preview coming soon"
                className={`${primaryButton} border-hairline-lit text-fg-subtle cursor-not-allowed border`}
              >
                <Eye aria-hidden="true" strokeWidth={1.75} className="size-4" />
                LIVE PREVIEW SOON
              </span>
            )}
            <Button href={item.href} variant="outline" size="md">
              VIEW CASE STUDY
            </Button>
          </div>

          <div className="border-hairline mt-8 flex items-center gap-3 border-t pt-6">
            <button
              type="button"
              onClick={copyLink}
              aria-label={copied ? 'Link copied' : 'Copy link to this project'}
              className={iconButton}
            >
              {copied ? (
                <Check aria-hidden="true" strokeWidth={1.75} className="size-4" />
              ) : (
                <Link2 aria-hidden="true" strokeWidth={1.75} className="size-4" />
              )}
            </button>
            <span aria-live="polite" className="type-label text-fg-subtle">
              {copied ? 'Link copied' : ''}
            </span>
            <Link
              href="/contact"
              className="type-label text-fg-muted hover:text-fg focus-visible:outline-ring ml-auto cursor-pointer underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              START A SIMILAR PROJECT ↗
            </Link>
          </div>
        </div>

        <PortfolioGuide
          type={item.type}
          className="rounded-frame border-hairline bg-surface shrink-0 border lg:hidden"
        />
      </div>
    </div>
  )
}
