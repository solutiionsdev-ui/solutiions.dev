import { About } from '@/components/sections/about'
import { CtaBand } from '@/components/sections/cta-band'
import { Hero } from '@/components/sections/hero'
import { Process } from '@/components/sections/process'
import { SelectedWork } from '@/components/sections/selected-work'
import { Services } from '@/components/sections/services'
import {
  jsonLd,
  organizationSchema,
  processSchema,
  servicesSchema,
  websiteSchema,
} from '@/lib/structured-data'

/**
 * Brief §8. Section order is fixed:
 * Hero → Selected Work → What We Do → Process → About → CTA.
 *
 * This maps Portfolio Grid onto Scroll-Triggered Storytelling: the work grid is
 * the proof, services are the capability, process is the reassurance,
 * and the CTA is the climax.
 */
export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(organizationSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(websiteSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(servicesSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(processSchema()) }}
      />

      <Hero />
      <SelectedWork />
      <Services />
      <Process />
      <About />
      <CtaBand />
    </>
  )
}
