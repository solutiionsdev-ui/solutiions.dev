import { Archivo, JetBrains_Mono, Space_Grotesk } from 'next/font/google'

/**
 * Three families, each with exactly one job (brief §5). Mixing jobs is the
 * fastest way to lose the look.
 *
 * DEVIATION FROM BRIEF §5: the brief's snippet passes `weight: 'variable'`.
 * next/font/google rejects that — a variable font is declared by OMITTING
 * `weight` entirely, which loads the full 100–900 range. Passing `axes`
 * additionally requires `weight` to be absent. The width axis is the whole
 * point of the design, so this had to be corrected rather than dropped.
 */
export const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'], // the width axis is what produces the condensed poster look
  variable: '--font-archivo',
  // NOT 'swap': adjustFontFallback cannot metric-match a font-stretch:78% face,
  // so a clamp(3rem, 9.2vw, 8.25rem) headline visibly reflows on swap — exactly
  // the CLS this design cannot afford.
  display: 'optional',
  preload: true,
})

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const fontVariables = `${archivo.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`
