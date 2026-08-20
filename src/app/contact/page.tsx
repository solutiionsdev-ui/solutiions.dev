import type { Metadata } from 'next'

import { ContactForm } from '@/components/contact/contact-form'
import { Band } from '@/components/ui/band'
import { site } from '@/content/site'

export const metadata: Metadata = {
  title: 'Contact',
  description: `Tell us about your project and we'll get back to you within 24 hours. Or email ${site.email}.`,
  alternates: { canonical: '/contact' },
}

/**
 * The full route (brief §8.9). Same form component as the intercepting modal,
 * rendered inside a <Band>, with its own metadata — so the URL is shareable and
 * works on a hard refresh.
 */
export default function ContactPage() {
  return (
    <Band label="START A PROJECT" headingId="contact-heading">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <h1 id="contact-heading" className="type-h2 text-fg">
            <span className="block">Tell us</span>
            <span className="block">about it.</span>
          </h1>
          <p className="type-body mt-6 max-w-[34ch] text-fg-muted">
            Tell us about your project and we&apos;ll get back to you within 24 hours.
          </p>
        </div>

        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </Band>
  )
}
