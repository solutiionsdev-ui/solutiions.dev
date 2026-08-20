import type { NextConfig } from 'next'
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Placeholder art ships as first-party SVG (see README → Assets). Next refuses to
    // optimise SVG without this flag. Every SVG under /public is authored in this repo;
    // the CSP below neutralises scripts even so. Drop both lines once real raster art lands.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  eslint: { dirs: ['src'] },
  // The OG/apple-icon routes read the static Archivo instance off disk; tracing
  // it explicitly guarantees it lands in the serverless bundle (see lib/og-font.ts).
  outputFileTracingIncludes: {
    '/opengraph-image': ['./src/app/Archivo-SemiCondensed-ExtraBold.ttf'],
    '/apple-icon': ['./src/app/Archivo-SemiCondensed-ExtraBold.ttf'],
  },
}

export default withBundleAnalyzer(nextConfig)
