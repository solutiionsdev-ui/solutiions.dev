import { ContactModal } from '@/components/contact/contact-modal'

/**
 * Intercepting route: soft navigations to /contact render this over the current
 * page. A hard load of /contact falls through to the full route instead.
 */
export default function ContactModalRoute() {
  return <ContactModal />
}
