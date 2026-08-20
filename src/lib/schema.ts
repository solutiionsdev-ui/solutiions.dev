import { z } from 'zod'

/** Brief §12. One schema, shared by the client form and the Server Action. */

export const PROJECT_TYPES = ['Website', 'Web app', 'E-commerce', 'Other'] as const
export const BUDGET_RANGES = [
  'Under $10k',
  '$10k – $25k',
  '$25k – $50k',
  '$50k – $100k',
  '$100k+',
  'Not sure yet',
] as const

export const enquirySchema = z.object({
  name: z.string().trim().min(2, 'Enter your name.').max(80, 'That name is too long.'),
  email: z.string().trim().email('Enter a valid email address.').max(160),
  company: z.string().trim().max(120).optional().or(z.literal('')),
  projectType: z.enum(PROJECT_TYPES, { message: 'Choose a project type.' }),
  budget: z.enum(BUDGET_RANGES, { message: 'Choose a budget range.' }),
  message: z
    .string()
    .trim()
    .min(20, 'Tell us a little more — 20 characters minimum.')
    .max(4000, 'That message is too long.'),
  /** Honeypot. Real people never fill this; bots do. Must stay empty. */
  website: z.string().max(0).optional().or(z.literal('')),
})

export type EnquiryInput = z.infer<typeof enquirySchema>

export type EnquiryState = {
  status: 'idle' | 'success' | 'error'
  message?: string
  /** Field-level errors, keyed by field name. */
  errors?: Partial<Record<keyof EnquiryInput, string>>
}
