/**
 * Section kicker: a 4px dot followed by a tracked mono label (brief §7).
 *
 * DECORATIVE. It renders as <p aria-hidden="true"> and is never a heading —
 * that is what keeps `READY TO START?` and `HAVE AN IDEA? / LET'S BUILD IT.`
 * from competing for one <h2> slot, and keeps the hero eyebrow from preceding
 * the <h1> in the accessibility tree (§13).
 */
export function EyebrowLabel({ children }: { children: string }) {
  return (
    <p aria-hidden="true" className="type-label flex items-center gap-2.5 text-fg-subtle">
      <span className="size-1 shrink-0 rounded-pill bg-fg-subtle" />
      {children}
    </p>
  )
}
