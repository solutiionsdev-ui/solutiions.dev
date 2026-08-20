/**
 * The palette in literal form.
 *
 * Brief §17 (Phase 2) sanctions two exceptions to the no-raw-hex rule:
 * `components/logos/` and `components/three/`. This is a necessary THIRD one,
 * for the contexts that cannot read a CSS custom property at all:
 *
 *   • `ImageResponse` / satori (opengraph-image, apple-icon) — renders outside
 *     the browser, with no CSSOM and no :root to resolve var() against;
 *   • Next `Metadata.themeColor` and the web manifest — consumed by the browser
 *     chrome and the OS, not by the page.
 *
 * These MUST stay in sync with the `@theme` block in globals.css by hand.
 * Keeping them in one file makes that a single, auditable place rather than
 * five scattered literals.
 */
export const staticColors = {
  void: '#000000',
  surface: '#0A0A0A',
  fg: '#FAFAFA',
  fgMuted: '#A1A1AA',
  hairline: '#232326',
} as const
