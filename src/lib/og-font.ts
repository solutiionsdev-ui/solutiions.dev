import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

/**
 * Loads the committed static Archivo instance for ImageResponse (brief §15).
 *
 * DEVIATION FROM BRIEF §15: the brief prescribes
 *   fetch(new URL('./Archivo-…ttf', import.meta.url)).arrayBuffer()
 * In Next 15 that turns the font into a hashed static asset and hands `fetch` a
 * root-relative path with no origin, which throws ERR_INVALID_URL during
 * prerender. Reading it off disk on the Node runtime is the working equivalent;
 * `outputFileTracingIncludes` in next.config.ts guarantees the file is bundled
 * into the serverless function.
 *
 * The font is a STATIC instance on purpose — satori cannot render the variable
 * face the site itself uses.
 */
export async function loadOgFont() {
  return readFile(join(process.cwd(), 'src/app/Archivo-SemiCondensed-ExtraBold.ttf'))
}
