import { Button } from '@/components/ui/button'

/** Brief §8.9. Convention, not a navigable path. */
export default function NotFound() {
  return (
    <section aria-labelledby="not-found-heading" className="py-band lg:py-band-lg">
      <div className="shell flex flex-col items-start">
        <p aria-hidden="true" className="type-h1 text-fg">
          404
        </p>
        <h1 id="not-found-heading" className="type-h2-secondary mt-6 text-fg">
          Page not found
        </h1>
        <p className="type-body mt-4 max-w-[38ch] text-fg-muted">
          That page does not exist, or it has moved.
        </p>
        <div className="mt-10">
          <Button href="/" variant="solid" size="md">
            BACK TO HOME
          </Button>
        </div>
      </div>
    </section>
  )
}
