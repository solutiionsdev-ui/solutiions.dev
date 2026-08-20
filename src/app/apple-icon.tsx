import { ImageResponse } from 'next/og'

import { loadOgFont } from '@/lib/og-font'
import { staticColors } from '@/lib/static-colors'

/** Monochrome mark to match the site (brief §15/§20). */
export const runtime = 'nodejs'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default async function AppleIcon() {
  const archivo = await loadOgFont()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: staticColors.void,
          color: staticColors.fg,
          fontFamily: 'Archivo',
          fontSize: 118,
          lineHeight: 1,
        }}
      >
        S
      </div>
    ),
    { ...size, fonts: [{ name: 'Archivo', data: archivo, weight: 800, style: 'normal' }] },
  )
}
