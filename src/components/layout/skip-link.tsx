/**
 * First element in the tab order, visible only on focus (brief §13).
 * Not a client component — it is a plain anchor.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="type-button sr-only rounded-pill bg-accent px-5 py-3 text-on-accent focus-visible:not-sr-only focus-visible:fixed focus-visible:left-frame focus-visible:top-frame focus-visible:z-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      Skip to content
    </a>
  )
}
