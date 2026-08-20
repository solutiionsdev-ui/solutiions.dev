'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { sendEnquiry } from '@/actions/send-enquiry'
import { controlClasses, Field } from '@/components/contact/field'
import { site } from '@/content/site'
import { BUDGET_RANGES, enquirySchema, PROJECT_TYPES, type EnquiryInput } from '@/lib/schema'
import type { EnquiryState } from '@/lib/schema'

/**
 * Brief §12.
 *
 * `mode: 'onBlur'` with `reValidateMode: 'onChange'` is the exact behaviour the
 * brief asks for: validate on blur, then re-validate on change ONLY after the
 * field has already errored. Validating on every keystroke from empty is
 * hostile.
 *
 * React Hook Form owns the values, so a failed submit never loses what the
 * visitor typed.
 */
export function ContactForm({ onSuccess }: { onSuccess?: () => void }) {
  const [serverState, setServerState] = useState<EnquiryState>({ status: 'idle' })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      company: '',
      projectType: undefined,
      budget: undefined,
      message: '',
      website: '',
    },
  })

  const onSubmit = handleSubmit(async (values) => {
    const formData = new FormData()
    for (const [key, value] of Object.entries(values)) {
      formData.append(key, value ?? '')
    }

    const result = await sendEnquiry({ status: 'idle' }, formData)
    setServerState(result)
    if (result.status === 'success') onSuccess?.()
  })

  if (serverState.status === 'success') {
    return (
      <div
        aria-live="polite"
        className="flex flex-col items-start gap-4 rounded-card border border-hairline bg-surface-2 p-8"
      >
        <CheckCircle2 aria-hidden="true" strokeWidth={1.5} className="size-7 text-success" />
        <p className="type-h2-secondary text-fg">Thanks.</p>
        <p className="type-body max-w-[38ch] text-fg-muted">
          We&apos;ll be back within 24 hours.
        </p>
      </div>
    )
  }

  const describedBy = (field: keyof EnquiryInput) =>
    errors[field] ? `${field}-error` : undefined

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      {/* Honeypot. Hidden from everyone, including AT — a real person must never
          be able to reach or fill this. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="website">Website</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field id="name" label="Name" required error={errors.name?.message}>
          <input
            id="name"
            type="text"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy('name')}
            className={controlClasses(Boolean(errors.name))}
            {...register('name')}
          />
        </Field>

        <Field id="email" label="Email" required error={errors.email?.message}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy('email')}
            className={controlClasses(Boolean(errors.email))}
            {...register('email')}
          />
        </Field>
      </div>

      <Field id="company" label="Company" error={errors.company?.message}>
        <input
          id="company"
          type="text"
          autoComplete="organization"
          aria-invalid={Boolean(errors.company)}
          aria-describedby={describedBy('company')}
          className={controlClasses(Boolean(errors.company))}
          {...register('company')}
        />
      </Field>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field id="projectType" label="Project type" required error={errors.projectType?.message}>
          <select
            id="projectType"
            defaultValue=""
            aria-invalid={Boolean(errors.projectType)}
            aria-describedby={describedBy('projectType')}
            className={controlClasses(Boolean(errors.projectType))}
            {...register('projectType')}
          >
            <option value="" disabled>
              Select one
            </option>
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>

        <Field id="budget" label="Budget range" required error={errors.budget?.message}>
          <select
            id="budget"
            defaultValue=""
            aria-invalid={Boolean(errors.budget)}
            aria-describedby={describedBy('budget')}
            className={controlClasses(Boolean(errors.budget))}
            {...register('budget')}
          >
            <option value="" disabled>
              Select one
            </option>
            {BUDGET_RANGES.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="message" label="Message" required error={errors.message?.message}>
        <textarea
          id="message"
          rows={6}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy('message')}
          className={controlClasses(Boolean(errors.message))}
          {...register('message')}
        />
      </Field>

      {/* Form-level failure. Announced, and it never clears the fields. */}
      {serverState.status === 'error' && serverState.message ? (
        <p aria-live="polite" className="type-meta text-danger">
          {serverState.message}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="type-button inline-flex h-11 cursor-pointer items-center justify-center rounded-pill bg-accent px-6 text-on-accent transition-[background-color,opacity] duration-(--dur-base) ease-(--ease-out-quart) hover:bg-fg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'SENDING…' : 'SEND ENQUIRY'}
        </button>

        <p className="type-meta text-fg-subtle">
          Or email{' '}
          <a
            href={`mailto:${site.email}`}
            className="cursor-pointer text-fg-muted underline underline-offset-4 transition-colors duration-(--dur-base) ease-(--ease-out-quart) hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {site.email}
          </a>
        </p>
      </div>
    </form>
  )
}
