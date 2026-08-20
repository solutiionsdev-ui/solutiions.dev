# Solutiions.dev

A production-ready marketing site for a web development agency, built to `CLAUDE-CODE-BRIEF.md`.

**Editorial brutalism**: near-black canvas, one heavy condensed voice, hairline dividers, and a
single chrome object as the only organic motion in the composition. There is no chromatic accent —
white *is* the accent.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run typecheck    # tsc --noEmit
npm run lint
npm run analyze      # bundle analyzer (ANALYZE=true next build)
```

---

## Editing content

No CMS in v1. All copy and data live in typed files under `src/content/`, so swapping to a CMS
later is a single adapter change.

| File | What it controls |
|---|---|
| `src/content/site.ts` | Brand name, email, nav items, social URLs, canonical URL. **The single source** — no hardcoded strings for these anywhere else. |
| `src/content/projects.ts` | Every case study. The three with `featured: true` are the home grid, in `index` order. |
| `src/content/services.ts` | The six "What we do" cells. |
| `src/content/tech.ts` | The eight technology tiles, in display order. |
| `src/content/process.ts` | The four process steps. |
| `src/content/about.ts` | The About headline, body, and the three stats. |
| `src/content/types.ts` | The shapes all of the above must satisfy. |

### Swapping a project

1. Edit or add an entry in `src/content/projects.ts`.
2. Drop the cover in `public/images/projects/` and gallery frames in `public/images/gallery/`.
3. Point `cover.src` / `gallery[].src` at them and set `width`/`height` to the **real** pixel
   dimensions — that reservation is the entire CLS story.
4. Write a genuine `alt` for each. Never ship a placeholder `alt`.
5. Keep exactly three projects at `featured: true` for the home grid to stay a 3-up row.

> **`concept: true` is a legal flag, not decoration.** It renders a visible "Concept" marker on the
> card and case study, and adds `creditText` to the JSON-LD. Every project shipped here is
> placeholder work. Only set it to `false` for a real, permissioned client project — presenting
> concept work as client work is both an ethical and a legal problem for an agency site (brief §20).

### Changing tokens

Everything visual resolves to `@theme` in `src/app/globals.css`. There are no raw hex values or
one-off sizes in component code.

The two sanctioned exceptions, both because they cannot consume a CSS custom property:

- `src/components/logos/` — brand-colored SVG trademarks
- `src/components/three/` — WebGL material colors

Verify with:

```bash
grep -rE "#[0-9a-fA-F]{6}" src --exclude-dir=logos --exclude-dir=three
```

**Three traps worth knowing before you edit `globals.css`:**

1. **`--spacing: 0.25rem` must stay.** Tailwind v4 builds every numeric spacing utility as
   `calc(var(--spacing) * n)`. Declaring named `--spacing-*` keys replaces the namespace and drops
   the base value — silently zeroing `p-4`, `gap-5`, `h-8`, `size-11` and everything like them.
   Nothing errors; the layout just collapses.
2. **Font families must stay in `@theme inline`.** `next/font` applies `--font-archivo` via a class
   on `<html>`. A plain `@theme` resolves the `var()` at `:root`, where it does not yet exist, and
   every font utility silently falls back.
3. **Never write `m-[--spacing-frame]`.** That is v3 syntax; v4 compiles it to
   `margin: --spacing-frame` with no `var()` and the browser drops it. Use the named utility
   (`m-frame`, `py-band`) or the v4 paren shorthand (`duration-(--dur-base)`). There is no
   `--duration-*` namespace, so `duration-base` does not exist.

Type roles live as `@utility type-*` rules (`type-h1`, `type-body`, `type-label`, …), one per row of
the brief's §5 table, so no component ever re-states a family/weight/width/size/case combination.

---

## Architecture notes

**Motion is opt-in, never load-bearing.** `<Reveal>` is a *server* component that only marks
elements with `data-reveal`. A single dynamically-imported `<MotionRoot>` finds them and animates
with `gsap.from`. Two consequences, both deliberate: no `opacity: 0` is ever baked into CSS, so the
page is fully readable with JavaScript disabled and to crawlers; and wrapping a section in
`<Reveal>` costs zero client JS.

**Reduced motion is structural, not cosmetic.** The `reduce` branch of `gsap.matchMedia` returns
immediately — no SplitText, no pin, no scrub, no Lenis, no marquee, no rail loop. Those users get
the final authored state.

**The 3D hero sits behind six guards** (`src/components/three/hero-object.tsx`): reduced motion, 4
or fewer cores, viewport under 768px, `saveData`, offscreen, and hidden tab. When any guard trips
the dynamic import is never reached, so `three` is not even fetched. The poster is also what a
JS-disabled visitor keeps.

Verified against the production build: **`three`, `gsap` and `lenis` are absent from the initial JS
graph.**

---

## Measured against the brief's budgets (§14)

| Metric | Budget | Measured |
|---|---|---|
| Initial JS, home route | < 165 KB | **121 KB** |
| `three` chunk | never initial | **absent from initial graph** |
| HDR environment map | 250 KB self-hosted | **0 KB** — generated procedurally, see below |
| All placeholder art | — | 84 KB total |

Lighthouse, cross-browser and the VoiceOver pass in §18 still need a run against a deployed build.

---

## Deviations from the brief

Each of these is a place where the brief as written does not work, or where a better option existed.
All are commented at the call site.

| § | Brief says | What was built, and why |
|---|---|---|
| 4 + 8.2 | `--text-h1: clamp(3rem, 9.2vw, 8.25rem)` with the hero text in `col-span-6` | **Retuned to `clamp(2.125rem, 9vw, 4.5rem)`, and `clamp(2.5rem, 4.4vw, 4.125rem)` at `lg`.** The two sections contradict each other: measured at 1440px the text column is 632px, but "DIGITAL EXPERIENCES" needs 1218px at 132px type, so the headline wrapped to five visual lines — breaking §5's "line breaks are authored, not automatic". Sized so the longest authored line fits its column; verified as exactly 3 lines at 375 / 768 / 1024 / 1440. |
| 5 | `Archivo({ weight: 'variable', axes: ['wdth'] })` | `weight` **omitted**. `next/font` rejects `weight: 'variable'`; a variable font is declared by omitting weight, and passing `axes` requires it absent. The width axis is the whole look, so this had to be corrected rather than dropped. |
| 10.1 | Self-hosted `/hdr/studio-1k.hdr`, 250 KB | drei `<Lightformer>` environment, rendered procedurally in-scene. Never touches a CDN (what the brief was guarding against), costs 0 KB instead of 250 KB, and the reflections are directly art-directable. |
| 15 | `fetch(new URL('./Archivo….ttf', import.meta.url))` | `fs.readFile` via `src/lib/og-font.ts`. In Next 15 the `fetch` form receives a root-relative asset path with no origin and throws `ERR_INVALID_URL` during prerender. `outputFileTracingIncludes` guarantees the font is bundled into the function. |
| 8.1 | One `ScrollTrigger` per section for the active-nav state | One `IntersectionObserver` with six targets. The stated constraint — "do not attach six independent observers" — is satisfied either way, and this keeps GSAP out of the header's chunk entirely. |
| 3 | Next.js 15, R3F 8 | Next 15 kept. R3F bumped to **9** and drei to **10**: R3F 8 peers on React 18 and cannot install against React 19. |
| 20 | Raster covers, hero poster, CTA photo | First-party **SVG** placeholders at the exact spec'd dimensions, generated by `scripts/generate-placeholders.mjs`. Swapping in real AVIF/WebP is a path change in `src/content/*` and nothing else — at which point remove `dangerouslyAllowSVG` from `next.config.ts`. |

---

## Not yet done

- **Phase 8 QA is unfinished**: Lighthouse runs, real-device cross-browser, and the VoiceOver pass
  all need a deployed build.
- **`RESEND_API_KEY` and Upstash credentials are not set**, so the contact form validates, rate-limit
  checks and reaches the send call, but cannot deliver mail. Copy `.env.example` to `.env.local` and
  fill it in. Without Upstash the action logs a warning in production rather than pretending to be
  rate-limited.
- **The tech logos are simplified geometric constructions**, sufficient at their 32px display size.
  Replace them with each project's official brand-kit SVG before launch and re-check the trademark
  usage guidelines.
- **Placeholder art is placeholder art.** See the `concept: true` note above.

---

## Routes

| Route | Notes |
|---|---|
| `/` | The seven home sections |
| `/work` | Full project index |
| `/work/[slug]` | Case study, statically generated for all six |
| `/contact` | Full route — shareable, works on hard refresh |
| `@modal/(.)contact` | The same form intercepted over the current page |
| `/dev/kitchen-sink` | Every primitive and state. Disallowed in `robots.ts`, absent from `sitemap.ts`, `noindex`, linked from nowhere. |
