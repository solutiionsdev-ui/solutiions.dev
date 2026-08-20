/**
 * Generates the placeholder art referenced by src/content/* (brief §20).
 *
 * These are first-party SVGs drawn from the same token palette as the site, at
 * the exact dimensions the real assets will use — so aspect ratios, `sizes`
 * hints and CLS behaviour are all correct today and swapping in real AVIF/WebP
 * later is a path change in the content files and nothing else.
 *
 *   node scripts/generate-placeholders.mjs
 */

import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const T = {
  surface: '#0A0A0A',
  surface2: '#101012',
  surface3: '#16161A',
  hairline: '#232326',
  hairlineLit: '#2E2E33',
  fg: '#FAFAFA',
  fgMuted: '#A1A1AA',
  fgSubtle: '#8E8E96',
}

const write = (relativePath, contents) => {
  const target = resolve(root, relativePath)
  mkdirSync(dirname(target), { recursive: true })
  writeFileSync(target, contents.trim() + '\n', 'utf8')
  console.log('  ✓', relativePath)
}

const open = (w, h) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none">`

/** Faint column grid, so every placeholder reads as part of one system. */
const grid = (w, h, step = 100) => {
  let out = `<g stroke="${T.hairline}" stroke-width="1" opacity="0.55">`
  for (let x = step; x < w; x += step) out += `<line x1="${x}" y1="0" x2="${x}" y2="${h}"/>`
  for (let y = step; y < h; y += step) out += `<line x1="0" y1="${y}" x2="${w}" y2="${y}"/>`
  return out + '</g>'
}

const caption = (w, h, label) =>
  `<text x="48" y="${h - 44}" fill="${T.fgSubtle}" font-family="ui-monospace, monospace" font-size="26" letter-spacing="3.6">${label}</text>` +
  `<circle cx="34" cy="${h - 52}" r="4" fill="${T.fgSubtle}"/>`

/* ── Hero poster ─────────────────────────────────────────────────────────── */

function heroPoster() {
  const s = 1200
  return `${open(s, s)}
<defs>
  <radialGradient id="glow" cx="50%" cy="45%" r="55%">
    <stop offset="0%" stop-color="#1C1C21"/>
    <stop offset="100%" stop-color="${T.surface}"/>
  </radialGradient>
  <linearGradient id="chrome" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#FFFFFF"/>
    <stop offset="28%" stop-color="#B8B8BE"/>
    <stop offset="46%" stop-color="#4A4A52"/>
    <stop offset="62%" stop-color="#EDEDED"/>
    <stop offset="82%" stop-color="#6E6E77"/>
    <stop offset="100%" stop-color="#D7D7DC"/>
  </linearGradient>
</defs>
<rect width="${s}" height="${s}" fill="url(#glow)"/>

<g stroke="${T.fg}" stroke-width="1.5" opacity="0.3" fill="none">
  <ellipse cx="600" cy="600" rx="430" ry="255" transform="rotate(-18 600 600)"/>
  <ellipse cx="600" cy="600" rx="470" ry="200" transform="rotate(26 600 600)"/>
  <ellipse cx="600" cy="600" rx="380" ry="330" transform="rotate(62 600 600)"/>
</g>

<g stroke="url(#chrome)" fill="none" stroke-linecap="round">
  <path d="M600 330c135 0 214 96 214 205 0 118-96 175-214 175s-214-70-214-183c0-116 92-197 214-197Z" stroke-width="86" opacity="0.95"/>
  <path d="M456 468c86-92 216-96 297-18 84 81 74 214-16 286-92 74-224 55-289-31-62-82-52-186 8-237Z" stroke-width="64" opacity="0.85"/>
  <path d="M600 402c108 24 168 118 150 216-18 96-110 156-206 138-98-18-160-112-142-210 17-95 104-160 198-144Z" stroke-width="44" opacity="0.7"/>
</g>

<circle cx="880" cy="760" r="86" fill="#2A2A2E"/>
<circle cx="880" cy="760" r="86" fill="none" stroke="${T.hairlineLit}" stroke-width="1.5"/>

<g fill="${T.fg}" opacity="0.65">
  <circle cx="250" cy="300" r="3"/><circle cx="905" cy="250" r="2.5"/>
  <circle cx="330" cy="880" r="2.5"/><circle cx="1000" cy="520" r="3"/>
  <circle cx="180" cy="620" r="2"/><circle cx="760" cy="180" r="2"/>
  <circle cx="1020" cy="880" r="2.5"/><circle cx="420" cy="180" r="2"/>
  <circle cx="150" cy="450" r="2"/><circle cx="960" cy="1000" r="2"/>
</g>
</svg>`
}

/* ── Project covers ──────────────────────────────────────────────────────── */

/** Dark dashboard: metric row, area chart, dense table. */
function dashboardCover(label, w = 1600, h = 1200) {
  let bars = ''
  const heights = [120, 190, 150, 240, 200, 285, 250, 330]
  heights.forEach((bh, i) => {
    bars += `<rect x="${150 + i * 96}" y="${820 - bh}" width="52" height="${bh}" rx="3" fill="${i === heights.length - 1 ? T.fg : T.fgSubtle}" opacity="${i === heights.length - 1 ? 0.9 : 0.35}"/>`
  })

  let rows = ''
  for (let i = 0; i < 5; i += 1) {
    const y = 900 + i * 46
    rows += `<line x1="150" y1="${y}" x2="1450" y2="${y}" stroke="${T.hairline}" stroke-width="1"/>`
    rows += `<rect x="150" y="${y - 26}" width="${180 + ((i * 57) % 120)}" height="10" rx="5" fill="${T.fgSubtle}" opacity="0.5"/>`
    rows += `<rect x="1150" y="${y - 26}" width="90" height="10" rx="5" fill="${T.fgSubtle}" opacity="0.35"/>`
    rows += `<rect x="1330" y="${y - 26}" width="120" height="10" rx="5" fill="${T.fgSubtle}" opacity="0.35"/>`
  }

  return `${open(w, h)}
<rect width="${w}" height="${h}" fill="${T.surface2}"/>
${grid(w, h, 100)}
<rect x="100" y="90" width="${w - 200}" height="${h - 180}" rx="8" fill="${T.surface}" stroke="${T.hairline}"/>
<line x1="100" y1="200" x2="${w - 100}" y2="200" stroke="${T.hairline}"/>
<g fill="${T.fgSubtle}" opacity="0.6">
  <rect x="150" y="136" width="120" height="12" rx="6"/>
  <rect x="300" y="136" width="80" height="12" rx="6" opacity="0.5"/>
  <rect x="410" y="136" width="80" height="12" rx="6" opacity="0.5"/>
</g>
<g>
  <rect x="150" y="250" width="290" height="130" rx="6" fill="${T.surface3}" stroke="${T.hairline}"/>
  <rect x="470" y="250" width="290" height="130" rx="6" fill="${T.surface3}" stroke="${T.hairline}"/>
  <rect x="790" y="250" width="290" height="130" rx="6" fill="${T.surface3}" stroke="${T.hairline}"/>
  <rect x="1110" y="250" width="290" height="130" rx="6" fill="${T.surface3}" stroke="${T.hairline}"/>
</g>
<g fill="${T.fg}" opacity="0.85">
  <rect x="182" y="292" width="96" height="22" rx="4"/>
  <rect x="502" y="292" width="120" height="22" rx="4"/>
  <rect x="822" y="292" width="80" height="22" rx="4"/>
  <rect x="1142" y="292" width="110" height="22" rx="4"/>
</g>
<path d="M150 700 L310 640 L470 668 L630 560 L790 596 L950 470 L1110 512 L1270 400 L1430 436" stroke="${T.fg}" stroke-width="3" fill="none" stroke-linejoin="round"/>
<path d="M150 700 L310 640 L470 668 L630 560 L790 596 L950 470 L1110 512 L1270 400 L1430 436 L1430 780 L150 780 Z" fill="${T.fg}" opacity="0.06"/>
${bars}
${rows}
${caption(w, h, label)}
</svg>`
}

/** Light editorial: full-bleed lookbook beside a product column. */
function editorialCover(label, w = 1600, h = 1200) {
  return `${open(w, h)}
<rect width="${w}" height="${h}" fill="#EDEDEA"/>
<rect x="0" y="0" width="900" height="${h}" fill="#DEDEDA"/>
<g stroke="#C9C9C4" stroke-width="1">
  <line x1="900" y1="0" x2="900" y2="${h}"/>
  <line x1="900" y1="620" x2="${w}" y2="620"/>
</g>
<g fill="#B6B6B0">
  <path d="M300 1200c0-260 90-470 200-470s200 210 200 470Z"/>
  <circle cx="500" cy="600" r="118"/>
</g>
<rect x="140" y="120" width="220" height="14" rx="7" fill="#8E8E88"/>
<rect x="140" y="158" width="140" height="14" rx="7" fill="#A8A8A2" opacity="0.7"/>
<g fill="#8E8E88">
  <rect x="960" y="120" width="300" height="18" rx="9"/>
  <rect x="960" y="164" width="180" height="14" rx="7" opacity="0.6"/>
  <rect x="960" y="240" width="560" height="10" rx="5" opacity="0.45"/>
  <rect x="960" y="272" width="520" height="10" rx="5" opacity="0.45"/>
  <rect x="960" y="304" width="440" height="10" rx="5" opacity="0.45"/>
</g>
<g fill="none" stroke="#8E8E88" stroke-width="1.5">
  <rect x="960" y="380" width="72" height="72" rx="4"/>
  <rect x="1052" y="380" width="72" height="72" rx="4"/>
  <rect x="1144" y="380" width="72" height="72" rx="4"/>
</g>
<rect x="960" y="500" width="240" height="56" rx="28" fill="#1A1A18"/>
<g fill="#B6B6B0">
  <rect x="960" y="680" width="250" height="330" rx="4"/>
  <rect x="1250" y="680" width="250" height="330" rx="4"/>
</g>
<text x="48" y="${h - 44}" fill="#6E6E68" font-family="ui-monospace, monospace" font-size="26" letter-spacing="3.6">${label}</text>
<circle cx="34" cy="${h - 52}" r="4" fill="#6E6E68"/>
</svg>`
}

/** Dark analytics: multi-series chart grid. */
function analyticsCover(label, w = 1600, h = 1200) {
  let sparkGrid = ''
  for (let c = 0; c < 3; c += 1) {
    for (let r = 0; r < 2; r += 1) {
      const x = 150 + c * 440
      const y = 620 + r * 260
      let path = `M${x} ${y + 150}`
      for (let i = 1; i <= 8; i += 1) {
        const px = x + i * 46
        const py = y + 150 - ((c * 31 + r * 17 + i * i * 7) % 130)
        path += ` L${px} ${py}`
      }
      sparkGrid += `<rect x="${x - 30}" y="${y - 40}" width="400" height="230" rx="6" fill="${T.surface3}" stroke="${T.hairline}"/>`
      sparkGrid += `<rect x="${x - 6}" y="${y - 16}" width="130" height="10" rx="5" fill="${T.fgSubtle}" opacity="0.5"/>`
      sparkGrid += `<path d="${path}" stroke="${T.fg}" stroke-width="2.5" fill="none" opacity="${0.55 + r * 0.3}"/>`
    }
  }

  let stack = ''
  const series = [0.42, 0.3, 0.18]
  series.forEach((ratio, s) => {
    let path = 'M150 480'
    for (let i = 0; i <= 12; i += 1) {
      const px = 150 + i * 108
      const py = 480 - ((i * 37 + s * 53) % 90) * ratio * 2.4 - s * 26
      path += ` L${px} ${py}`
    }
    path += ' L1446 480 Z'
    stack += `<path d="${path}" fill="${T.fg}" opacity="${0.07 + s * 0.05}" stroke="${T.fg}" stroke-opacity="${0.35 + s * 0.2}" stroke-width="2"/>`
  })

  return `${open(w, h)}
<rect width="${w}" height="${h}" fill="${T.surface2}"/>
${grid(w, h, 100)}
<rect x="100" y="90" width="${w - 200}" height="${h - 180}" rx="8" fill="${T.surface}" stroke="${T.hairline}"/>
<g fill="${T.fgSubtle}" opacity="0.55">
  <rect x="150" y="140" width="150" height="12" rx="6"/>
  <rect x="1290" y="140" width="160" height="12" rx="6" opacity="0.6"/>
</g>
<line x1="100" y1="196" x2="${w - 100}" y2="196" stroke="${T.hairline}"/>
${stack}
<g stroke="${T.hairline}" stroke-width="1">
  <line x1="150" y1="480" x2="1446" y2="480"/>
  <line x1="150" y1="380" x2="1446" y2="380" opacity="0.6"/>
  <line x1="150" y1="280" x2="1446" y2="280" opacity="0.4"/>
</g>
${sparkGrid}
${caption(w, h, label)}
</svg>`
}

/** Neutral schematic used by the non-featured entries. */
function schematicCover(label, w = 1600, h = 1200) {
  let nodes = ''
  const points = [
    [420, 420],
    [800, 320],
    [1180, 460],
    [560, 720],
    [980, 800],
    [1280, 700],
  ]
  points.forEach(([x, y], i) => {
    const [nx, ny] = points[(i + 1) % points.length]
    nodes += `<line x1="${x}" y1="${y}" x2="${nx}" y2="${ny}" stroke="${T.hairlineLit}" stroke-width="1.5"/>`
  })
  points.forEach(([x, y], i) => {
    nodes += `<circle cx="${x}" cy="${y}" r="${i === 0 ? 26 : 16}" fill="${T.surface3}" stroke="${T.fgSubtle}" stroke-width="1.5"/>`
  })

  return `${open(w, h)}
<rect width="${w}" height="${h}" fill="${T.surface2}"/>
${grid(w, h, 100)}
<rect x="100" y="90" width="${w - 200}" height="${h - 180}" rx="8" fill="${T.surface}" stroke="${T.hairline}"/>
${nodes}
<g fill="${T.fgSubtle}" opacity="0.5">
  <rect x="150" y="150" width="200" height="12" rx="6"/>
  <rect x="150" y="182" width="120" height="12" rx="6" opacity="0.6"/>
</g>
${caption(w, h, label)}
</svg>`
}

/* ── CTA background ──────────────────────────────────────────────────────── */

function ctaBackground(w = 2400, h = 1200) {
  return `${open(w, h)}
<defs>
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#26262B"/>
    <stop offset="70%" stop-color="#141417"/>
    <stop offset="100%" stop-color="#0A0A0A"/>
  </linearGradient>
</defs>
<rect width="${w}" height="${h}" fill="url(#sky)"/>
<circle cx="1750" cy="300" r="120" fill="#3A3A42" opacity="0.5"/>
<path d="M0 820 L340 610 L640 780 L980 520 L1320 760 L1680 560 L2020 800 L2400 640 L2400 1200 L0 1200 Z" fill="#1B1B20"/>
<path d="M0 940 L420 760 L760 900 L1140 700 L1520 880 L1900 720 L2400 900 L2400 1200 L0 1200 Z" fill="#131317"/>
<path d="M0 1060 L520 920 L960 1030 L1420 880 L1880 1000 L2400 900 L2400 1200 L0 1200 Z" fill="#0C0C0F"/>
</svg>`
}

/* ── Gallery frames ──────────────────────────────────────────────────────── */

function galleryFrame(label, index, w = 2400, h = 1350) {
  const blocks = [
    `<rect x="200" y="300" width="900" height="620" rx="8" fill="${T.surface3}" stroke="${T.hairline}"/><rect x="1180" y="300" width="1020" height="290" rx="8" fill="${T.surface3}" stroke="${T.hairline}"/><rect x="1180" y="630" width="1020" height="290" rx="8" fill="${T.surface3}" stroke="${T.hairline}"/>`,
    `<rect x="200" y="260" width="2000" height="380" rx="8" fill="${T.surface3}" stroke="${T.hairline}"/><rect x="200" y="680" width="640" height="400" rx="8" fill="${T.surface3}" stroke="${T.hairline}"/><rect x="880" y="680" width="640" height="400" rx="8" fill="${T.surface3}" stroke="${T.hairline}"/><rect x="1560" y="680" width="640" height="400" rx="8" fill="${T.surface3}" stroke="${T.hairline}"/>`,
    `<rect x="200" y="280" width="1200" height="800" rx="8" fill="${T.surface3}" stroke="${T.hairline}"/><rect x="1460" y="280" width="740" height="380" rx="8" fill="${T.surface3}" stroke="${T.hairline}"/><rect x="1460" y="700" width="740" height="380" rx="8" fill="${T.surface3}" stroke="${T.hairline}"/>`,
  ][index % 3]

  return `${open(w, h)}
<rect width="${w}" height="${h}" fill="${T.surface2}"/>
${grid(w, h, 150)}
${blocks}
<text x="200" y="${h - 90}" fill="${T.fgSubtle}" font-family="ui-monospace, monospace" font-size="32" letter-spacing="4.4">${label}</text>
</svg>`
}

/* ── Run ─────────────────────────────────────────────────────────────────── */

console.log('Generating placeholder art…')

write('public/images/hero-poster.svg', heroPoster())
write('public/images/cta-bg.svg', ctaBackground())

const covers = [
  ['fintech-dashboard', 'FINTECH DASHBOARD — CONCEPT', dashboardCover],
  ['noire-ecommerce', 'NOIRÉ ECOMMERCE — CONCEPT', editorialCover],
  ['analytics-platform', 'ANALYTICS PLATFORM — CONCEPT', analyticsCover],
  ['atlas-logistics', 'ATLAS LOGISTICS — CONCEPT', schematicCover],
  ['meridian-health', 'MERIDIAN HEALTH — CONCEPT', schematicCover],
  ['kiln-studio', 'KILN STUDIO — CONCEPT', schematicCover],
]

for (const [slug, label, render] of covers) {
  write(`public/images/projects/${slug}.svg`, render(label))
}

for (const [slug, label] of covers.slice(0, 3)) {
  for (let i = 1; i <= 3; i += 1) {
    write(`public/images/gallery/${slug}-${i}.svg`, galleryFrame(`${label} — ${i} / 3`, i - 1))
  }
}

console.log('Done.')
