import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

/**
 * Brief §12. An in-memory token bucket is NOT a rate limiter on Vercel — every
 * serverless instance keeps its own map and cold starts reset it. This is
 * Upstash-backed and therefore shared across instances.
 *
 * When Upstash is not configured (local development), `limit()` returns
 * `success: true` and says so, rather than silently pretending to limit.
 */
const configured = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
)

const limiter = configured
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(5, '10 m'),
      prefix: 'solutiions:enquiry',
      analytics: false,
    })
  : null

export async function checkRateLimit(identifier: string) {
  if (!limiter) {
    if (process.env.NODE_ENV === 'production') {
      console.warn(
        '[rate-limit] UPSTASH_REDIS_REST_* is not set — the contact action is UNPROTECTED.',
      )
    }
    return { success: true, configured: false as const }
  }

  const { success } = await limiter.limit(identifier)
  return { success, configured: true as const }
}
