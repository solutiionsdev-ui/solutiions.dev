import { AlertCircle } from 'lucide-react'
import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

/**
 * Brief §12/§13. A visible <label> ABOVE every control — a placeholder is never
 * the label, because placeholders vanish on input and fail cognitive-
 * accessibility guidance.
 *
 * Errors render inline directly beneath the offending field and carry an icon
 * as well as color, so nothing is conveyed by color alone.
 */
export function Field({
  id,
  label,
  error,
  required,
  hint,
  children,
}: {
  id: string
  label: string
  error?: string
  required?: boolean
  hint?: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="type-label text-fg-secondary">
        {label}
        {required ? (
          <>
            <span aria-hidden="true" className="ml-1 text-fg-subtle">
              *
            </span>
            <span className="sr-only"> (required)</span>
          </>
        ) : null}
      </label>

      {hint ? (
        <p id={`${id}-hint`} className="type-meta text-fg-subtle">
          {hint}
        </p>
      ) : null}

      {children}

      {error ? (
        <p
          id={`${id}-error`}
          className="type-meta flex items-start gap-1.5 text-danger"
        >
          <AlertCircle aria-hidden="true" strokeWidth={2} className="mt-0.5 size-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      ) : null}
    </div>
  )
}

export const controlClasses = (hasError: boolean) =>
  cn(
    'w-full rounded-card border bg-surface-2 px-4 py-3 text-fg placeholder:text-fg-subtle',
    'transition-colors duration-(--dur-base) ease-(--ease-out-quart)',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
    hasError ? 'border-danger' : 'border-border hover:border-fg-subtle',
  )
