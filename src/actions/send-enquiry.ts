'use server'

import { headers } from 'next/headers'
import { Resend } from 'resend'

import { checkRateLimit } from '@/lib/rate-limit'
import { enquirySchema, type EnquiryState } from '@/lib/schema'
import { site } from '@/content/site'

/**
 * Brief §12. Validates with the same Zod schema the client uses, rate-limits by
 * IP, then sends through Resend.
 *
 * Failure never loses the visitor's input: the form is uncontrolled-with-
 * defaults on the client, and this action returns field errors rather than
 * throwing.
 */

const GENERIC_ERROR = `Something went wrong. Try again, or email ${site.email}.`

function clientIp(headerList: Headers): string {
  const forwarded = headerList.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return headerList.get('x-real-ip') ?? 'unknown'
}

export async function sendEnquiry(
  _previous: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const parsed = enquirySchema.safeParse({
    name: formData.get('name') ?? '',
    email: formData.get('email') ?? '',
    company: formData.get('company') ?? '',
    projectType: formData.get('projectType') ?? '',
    budget: formData.get('budget') ?? '',
    message: formData.get('message') ?? '',
    website: formData.get('website') ?? '',
  })

  if (!parsed.success) {
    const errors: EnquiryState['errors'] = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]
      if (typeof key === 'string' && !(key in errors)) {
        errors[key as keyof typeof errors] = issue.message
      }
    }
    return { status: 'error', message: 'Check the highlighted fields.', errors }
  }

  const data = parsed.data

  // Honeypot. Report success so a bot learns nothing, but send nothing.
  if (data.website) {
    return { status: 'success' }
  }

  const headerList = await headers()
  const { success } = await checkRateLimit(clientIp(headerList))
  if (!success) {
    return {
      status: 'error',
      message: `Too many enquiries from this address. Try again shortly, or email ${site.email}.`,
    }
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL

  if (!apiKey || !to || !from) {
    console.error('[send-enquiry] Missing RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL')
    return { status: 'error', message: GENERIC_ERROR }
  }

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `New enquiry — ${data.name}${data.company ? ` (${data.company})` : ''}`,
      text: [
        `Name:         ${data.name}`,
        `Email:        ${data.email}`,
        `Company:      ${data.company || '—'}`,
        `Project type: ${data.projectType}`,
        `Budget:       ${data.budget}`,
        '',
        data.message,
      ].join('\n'),
    })

    if (error) {
      console.error('[send-enquiry] Resend error:', error)
      return { status: 'error', message: GENERIC_ERROR }
    }

    return { status: 'success' }
  } catch (error) {
    console.error('[send-enquiry] Unexpected error:', error)
    return { status: 'error', message: GENERIC_ERROR }
  }
}
