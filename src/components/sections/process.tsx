import { Band } from '@/components/ui/band'
import { ProcessStep } from '@/components/ui/process-step'
import { Reveal } from '@/components/ui/reveal'
import { processHeading, processSteps } from '@/content/process'

/**
 * Brief §8.6. The steps are an <ol>, so the sequence is conveyed structurally
 * rather than only by the drawn line — which is why the whole connector is
 * aria-hidden.
 *
 * The line is marked `data-draw`; <MotionRoot> scales it from 0 on scroll.
 * Nothing here is hidden by CSS, so under reduced motion (and with JS off) it
 * simply renders at full width immediately.
 */
export function Process() {
  return (
    <Band id="process" label="OUR PROCESS" headingId="process-heading">
      <h2 id="process-heading" className="type-h2-secondary text-fg mb-12 max-w-[24ch] lg:mb-16">
        {processHeading}
      </h2>
      <div className="relative">
        {/* Connector — decoration only. Horizontal at lg, a vertical rail below. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {/* lg+: horizontal line at the numeral's mid-height, with hollow
              nodes centred between adjacent steps. */}
          <div className="hidden lg:block">
            <span
              data-draw
              className="bg-hairline absolute top-3.5 right-0 left-0 block h-px origin-left"
            />
            {[25, 50, 75].map((left) => (
              <span
                key={left}
                data-draw-node
                className="rounded-pill border-hairline-lit bg-surface absolute top-3.5 block size-[7px] -translate-x-1/2 -translate-y-1/2 border"
                style={{ left: `${left}%` }}
              />
            ))}
          </div>

          {/* Below lg: a vertical rail on the left with a node beside each step. */}
          <span
            data-draw
            className="bg-hairline absolute top-3.5 bottom-0 left-[3px] block w-px origin-top lg:hidden"
          />
        </div>

        <Reveal
          as="ol"
          stagger
          className="relative grid grid-cols-1 gap-y-0 md:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-4"
        >
          {processSteps.map((step, index) => (
            <ProcessStep
              key={step.index}
              index={step.index}
              title={step.title}
              description={step.description}
              isLast={index === processSteps.length - 1}
            />
          ))}
        </Reveal>
      </div>
    </Band>
  )
}
