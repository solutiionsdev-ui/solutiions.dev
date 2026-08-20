import { ImageResponse } from 'next/og'

import { loadOgFont } from '@/lib/og-font'
import { staticColors } from '@/lib/static-colors'

import { site } from '@/content/site'

/**
 * Brief §15.
 *
 * Runs on the NODE runtime, not edge. ImageResponse is backed by satori, which
 * needs explicit font buffers and fails on variable fonts — so this loads the
 * committed static instance (`Archivo-SemiCondensed-ExtraBold.ttf`, OFL, see
 * Archivo-OFL.txt) rather than the variable face used by the site itself.
 */
export const runtime = 'nodejs'

export const alt = `${site.name} — We build digital experiences that matter.`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  const archivo = await loadOgFont()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: staticColors.surface,
          padding: '64px 72px',
          fontFamily: 'Archivo',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 26,
            letterSpacing: 2,
            color: staticColors.fg,
            textTransform: 'uppercase',
          }}
        >
          {site.wordmark}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            // Sized so the longest authored line (DIGITAL EXPERIENCES) fits on
            // one line at 1200px. The three-line break is authored, not automatic.
            fontSize: 76,
            lineHeight: 0.92,
            letterSpacing: -1.5,
            whiteSpace: 'nowrap',
            color: staticColors.fg,
            textTransform: 'uppercase',
          }}
        >
          <span>We build</span>
          <span>digital experiences</span>
          <span>that matter.</span>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderTop: `1px solid ${staticColors.hairline}`,
            paddingTop: 28,
            fontSize: 22,
            color: staticColors.fgMuted,
          }}
        >
          <span>Web development agency</span>
          <span>{site.email}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Archivo', data: archivo, weight: 800, style: 'normal' }],
    },
  )
}
