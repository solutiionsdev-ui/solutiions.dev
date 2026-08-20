'use client'

import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef } from 'react'

import { ContactForm } from '@/components/contact/contact-form'

/**
 * Brief §12. The intercepting-route modal: START A PROJECT opens this over the
 * page, and /contact is still a real, shareable, hard-refreshable URL.
 *
 * Focus trap, Esc to close, body scroll locked, and focus restored to whatever
 * opened it — `router.back()` returns to the previous entry, and the element
 * that was focused before the modal mounted is refocused explicitly, because
 * browsers do not reliably restore focus across a soft navigation.
 */
export function ContactModal() {
  const router = useRouter()
  const dialogRef = useRef<HTMLDivElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)

  const close = useCallback(() => {
    router.back()
  }, [router])

  // Remember what had focus, and give it back on unmount.
  useEffect(() => {
    returnFocusRef.current = document.activeElement as HTMLElement | null
    return () => {
      returnFocusRef.current?.focus?.()
    }
  }, [])

  useEffect(() => {
    const { body, documentElement } = document
    const previousOverflow = body.style.overflow
    const previousPadding = body.style.paddingRight
    const scrollbar = window.innerWidth - documentElement.clientWidth

    body.style.overflow = 'hidden'
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`

    return () => {
      body.style.overflow = previousOverflow
      body.style.paddingRight = previousPadding
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        close()
        return
      }

      if (event.key !== 'Tab') return

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])',
      )
      if (!focusable || focusable.length === 0) return

      const visible = [...focusable].filter((element) => element.offsetParent !== null)
      if (visible.length === 0) return

      const first = visible[0]
      const last = visible[visible.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [close])

  // Move focus into the dialog on mount.
  useEffect(() => {
    const target = dialogRef.current?.querySelector<HTMLElement>('input, button')
    target?.focus()
  }, [])

  return (
    <div className="fixed inset-0 z-100 flex items-start justify-center overflow-y-auto p-frame sm:p-6">
      <button
        type="button"
        aria-label="Close dialog"
        onClick={close}
        className="fixed inset-0 cursor-pointer bg-void/70 backdrop-blur-sm"
        tabIndex={-1}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-heading"
        className="relative my-auto w-full max-w-2xl rounded-card border border-hairline bg-surface p-6 sm:p-10"
      >
        <div className="mb-8 flex items-start justify-between gap-6">
          <div>
            <p aria-hidden="true" className="type-label flex items-center gap-2.5 text-fg-subtle">
              <span className="size-1 shrink-0 rounded-pill bg-fg-subtle" />
              START A PROJECT
            </p>
            <h2 id="contact-modal-heading" className="type-h2-secondary mt-4 text-fg">
              Tell us about it.
            </h2>
          </div>

          <button
            type="button"
            onClick={close}
            aria-label="Close dialog"
            className="hit-area -mr-2 -mt-2 flex size-11 shrink-0 cursor-pointer items-center justify-center text-fg-muted transition-colors duration-(--dur-base) ease-(--ease-out-quart) hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <X aria-hidden="true" strokeWidth={1.5} className="size-5" />
          </button>
        </div>

        <ContactForm />
      </div>
    </div>
  )
}
