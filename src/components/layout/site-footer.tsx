import Link from 'next/link'

import { footerLinks, site, socialLinks } from '@/content/site'

const columnLabel = 'type-label text-fg-subtle'
const columnLink =
  'type-meta cursor-pointer text-fg-muted transition-colors duration-(--dur-base) ease-(--ease-out-quart) hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'

/** Brief §8.8. Copyright year is computed server-side. */
export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-hairline py-12 lg:py-16">
      <div className="shell grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <p className="type-wordmark text-fg" style={{ fontSize: 'var(--text-card)' }}>
            {site.wordmark}
          </p>
          <p className="type-meta mt-4 text-fg-subtle">
            © {year} {site.name} — All rights reserved.
          </p>
        </div>

        <nav aria-labelledby="footer-links" className="lg:col-span-2">
          <h2 id="footer-links" className={columnLabel}>
            Links
          </h2>
          <ul className="mt-5 flex flex-col gap-2.5">
            {footerLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={columnLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-social" className="lg:col-span-2">
          <h2 id="footer-social" className={columnLabel}>
            Social
          </h2>
          <ul className="mt-5 flex flex-col gap-2.5">
            {socialLinks.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={columnLink}
                >
                  {item.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-4">
          <p className={columnLabel}>Let&apos;s build something great</p>
          <a
            href={`mailto:${site.email}`}
            className="mt-5 inline-block cursor-pointer text-lg text-fg underline-offset-4 transition-colors duration-(--dur-base) ease-(--ease-out-quart) hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {site.email}
          </a>
        </div>
      </div>
    </footer>
  )
}
