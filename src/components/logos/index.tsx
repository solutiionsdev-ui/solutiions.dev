import type { TechLogo } from '@/content/types'

/**
 * Brief §8.5 / §20. Local inline SVG only — never an <img> from a CDN, never an
 * icon font, never emoji. Each mark carries role="img" + <title>, so the
 * visible caption in <TechTile> is aria-hidden and nothing is announced twice.
 *
 * Brand-colored marks are one of the two sanctioned exceptions to the
 * no-raw-hex rule (§17, Phase 2) — a trademark cannot consume a CSS custom
 * property and stay on-brand. The Next.js mark uses its official light-on-dark
 * variant, because the black-on-white variant is invisible on --color-surface.
 *
 * These are simplified geometric constructions of each mark, sufficient at the
 * 32px display size used here. Before a production launch, replace them with
 * the official SVG from each project's brand kit and re-check each trademark's
 * usage guidelines.
 */

type LogoProps = { className?: string }

const svg = 'h-8 w-auto'

function Frame({
  title,
  children,
  className,
  viewBox = '0 0 32 32',
}: {
  title: string
  children: React.ReactNode
  className?: string
  viewBox?: string
}) {
  return (
    <svg
      role="img"
      viewBox={viewBox}
      className={className ?? svg}
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
    >
      <title>{title}</title>
      {children}
    </svg>
  )
}

export function NextjsLogo({ className }: LogoProps) {
  return (
    <Frame title="Next.js" className={className}>
      <circle cx="16" cy="16" r="15" fill="#FFFFFF" />
      <path d="M11 10.5h2.1l9.4 12.2a15 15 0 0 1-2.6 1.7L11 12.8Z" fill="#000000" />
      <rect x="9.6" y="10.5" width="1.9" height="11" fill="#000000" />
      <rect x="20.2" y="10.5" width="1.9" height="7.6" fill="#000000" />
    </Frame>
  )
}

export function ReactLogo({ className }: LogoProps) {
  return (
    <Frame title="React" className={className}>
      <g fill="none" stroke="#61DAFB" strokeWidth="1.4">
        <ellipse cx="16" cy="16" rx="14" ry="5.4" />
        <ellipse cx="16" cy="16" rx="14" ry="5.4" transform="rotate(60 16 16)" />
        <ellipse cx="16" cy="16" rx="14" ry="5.4" transform="rotate(120 16 16)" />
      </g>
      <circle cx="16" cy="16" r="2.6" fill="#61DAFB" />
    </Frame>
  )
}

export function TypeScriptLogo({ className }: LogoProps) {
  return (
    <Frame title="TypeScript" className={className}>
      <rect width="32" height="32" rx="3" fill="#3178C6" />
      <path
        d="M13.6 15.2v2.1h3.2v9.1h2.6v-9.1h3.2v-2.1Z"
        fill="#FFFFFF"
        transform="translate(-4.5 -1.5)"
      />
      <path
        d="M20.4 24.7c.9.9 2.3 1.4 3.9 1.4 2.5 0 4.2-1.3 4.2-3.4 0-1.9-1.1-2.8-3.2-3.6-1.4-.5-1.9-.9-1.9-1.5s.5-1 1.4-1c.8 0 1.5.3 2.1.9l1.4-1.8c-.9-.8-2.1-1.2-3.5-1.2-2.4 0-4 1.4-4 3.3 0 1.9 1.1 2.8 3 3.5 1.5.5 2 .9 2 1.6 0 .7-.6 1.1-1.6 1.1-1 0-1.9-.4-2.6-1.1Z"
        fill="#FFFFFF"
      />
    </Frame>
  )
}

export function NodeLogo({ className }: LogoProps) {
  return (
    <Frame title="Node.js" className={className}>
      <path d="M16 1.5 29 9v14L16 30.5 3 23V9Z" fill="#539E43" />
      <path
        d="M16 22.6c-2.6 0-3.2-1.3-3.2-2.4v-.5h1.9v.5c0 .5.1.9 1.3.9 1 0 1.3-.3 1.3-.8 0-.5-.2-.7-1.7-.9-1.9-.2-3-.8-3-2.4 0-1.4 1.2-2.3 3.2-2.3 2.2 0 3.2.8 3.2 2.5h-1.9c0-.7-.4-.9-1.3-.9-.9 0-1.2.3-1.2.7 0 .5.3.6 1.6.8 1.9.3 3.1.7 3.1 2.4 0 1.5-1.2 2.4-3.3 2.4Z"
        fill="#FFFFFF"
      />
    </Frame>
  )
}

export function PostgreSqlLogo({ className }: LogoProps) {
  return (
    <Frame title="PostgreSQL" className={className}>
      <path
        d="M23.4 4.8c-2.1-1-4.6-1.2-7-.8-2.6-.5-5.2 0-7 1.6C7.2 7.5 6.4 10.6 6.9 14c.4 3 1.6 6.6 3.1 9 .7 1.1 1.6 2 2.6 1.9.8-.1 1.3-.7 1.8-1.6.4.2.9.3 1.4.3s1-.1 1.4-.3c.5.9 1.1 1.6 1.9 1.7 1.2.1 2.2-1 3-2.4 1.4-2.5 2.3-6.2 2.5-9 .3-4.1-.5-7.6-1.2-8.8Z"
        fill="#336791"
      />
      <path
        d="M12.6 11.4c0 .6-.3 1.1-.7 1.1s-.7-.5-.7-1.1.3-1.1.7-1.1.7.5.7 1.1Zm7.8 0c0 .6-.3 1.1-.7 1.1s-.7-.5-.7-1.1.3-1.1.7-1.1.7.5.7 1.1Z"
        fill="#FFFFFF"
      />
      <path
        d="M13.4 26.2c.3 1 .1 1.9-.3 2.1M18.9 26c-.2 1 .1 1.9.6 2.1"
        stroke="#336791"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
    </Frame>
  )
}

export function TailwindLogo({ className }: LogoProps) {
  return (
    <Frame title="Tailwind CSS" className={className} viewBox="0 0 32 20">
      <path
        d="M8.5 0C5.4 0 3.4 1.6 2.6 4.7c1.2-1.6 2.5-2.2 4-1.8.9.2 1.5.9 2.2 1.6 1.2 1.2 2.5 2.6 5.4 2.6 3.1 0 5.1-1.6 5.9-4.7-1.2 1.6-2.5 2.2-4 1.8-.9-.2-1.5-.9-2.2-1.6C12.7 1.4 11.4 0 8.5 0ZM2.6 7.1C-.5 7.1-2.5 8.7-3.3 11.8c1.2-1.6 2.5-2.2 4-1.8.9.2 1.5.9 2.2 1.6 1.2 1.2 2.5 2.6 5.4 2.6 3.1 0 5.1-1.6 5.9-4.7-1.2 1.6-2.5 2.2-4 1.8-.9-.2-1.5-.9-2.2-1.6C6.8 8.5 5.5 7.1 2.6 7.1Z"
        fill="#38BDF8"
        transform="translate(6 3)"
      />
    </Frame>
  )
}

export function AwsLogo({ className }: LogoProps) {
  return (
    <Frame title="Amazon Web Services" className={className} viewBox="0 0 40 24">
      <path
        d="M11.3 9.6c0 .5.1.9.2 1.2.1.3.3.6.5 1 .1.1.1.2.1.3 0 .1-.1.3-.3.4l-.8.6c-.1.1-.2.1-.3.1-.1 0-.3-.1-.4-.2-.2-.2-.4-.4-.5-.7l-.4-.8c-1 1.2-2.2 1.8-3.7 1.8-1.1 0-1.9-.3-2.5-.9-.6-.6-.9-1.4-.9-2.4 0-1.1.4-1.9 1.2-2.6.8-.7 1.8-1 3.2-1 .5 0 .9 0 1.4.1.5.1 1 .2 1.5.3v-.9c0-1-.2-1.7-.6-2.1-.4-.4-1.1-.6-2.1-.6-.5 0-.9.1-1.4.2-.5.1-.9.3-1.4.4l-.5.2h-.2c-.2 0-.3-.1-.3-.4v-.7c0-.2 0-.4.1-.5.1-.1.2-.2.4-.2.4-.2 1-.4 1.6-.5.6-.2 1.3-.2 2-.2 1.5 0 2.7.4 3.4 1.1.7.7 1 1.7 1 3.1v4.1Zm-5.1 1.9c.4 0 .9-.1 1.3-.2.5-.2.9-.5 1.2-.8.2-.2.4-.5.4-.8.1-.3.1-.7.1-1.1v-.5c-.4-.1-.8-.2-1.2-.2-.4 0-.8-.1-1.2-.1-.9 0-1.5.2-1.9.5-.4.3-.6.8-.6 1.4 0 .6.1 1 .4 1.3.3.4.8.5 1.5.5Z"
        fill="#FFFFFF"
      />
      <path
        d="M35.9 16.8c-4.2 3.1-10.3 4.7-15.5 4.7-7.3 0-13.9-2.7-18.9-7.2-.4-.4 0-.8.4-.6 5.4 3.1 12 5 18.9 5 4.6 0 9.7-1 14.4-2.9.7-.3 1.3.5.7 1Zm1.7-2c-.5-.7-3.5-.3-4.9-.2-.4 0-.5-.3-.1-.6 2.4-1.7 6.3-1.2 6.7-.6.5.6-.1 4.5-2.3 6.3-.3.3-.7.1-.5-.3.5-1.2 1.6-4 1.1-4.6Z"
        fill="#FF9900"
      />
    </Frame>
  )
}

export function DockerLogo({ className }: LogoProps) {
  return (
    <Frame title="Docker" className={className} viewBox="0 0 32 24">
      <g fill="#2496ED">
        <rect x="9" y="10" width="4" height="3.6" rx="0.3" />
        <rect x="13.6" y="10" width="4" height="3.6" rx="0.3" />
        <rect x="18.2" y="10" width="4" height="3.6" rx="0.3" />
        <rect x="13.6" y="6" width="4" height="3.6" rx="0.3" />
        <rect x="18.2" y="6" width="4" height="3.6" rx="0.3" />
        <rect x="18.2" y="2" width="4" height="3.6" rx="0.3" />
        <rect x="4.4" y="10" width="4" height="3.6" rx="0.3" />
      </g>
      <path
        d="M30.8 11.5c-.9-.6-2.9-.8-4.5-.5-.2-1.5-1-2.8-2.4-4l-.8-.6-.6.9c-.7 1.1-1 2.6-.9 4 .1.5.3 1.4.8 2.2-.5.3-1.6.7-3 .7H1.3l-.1.5c-.3 1.6-.3 6.6 2.9 10.4C6.5 27.7 10.2 29 15.1 29c10.6 0 18.4-4.9 22.1-13.7 1.4.1 4.6 0 6.2-3.1.1-.2.3-.6.7-1.6l.2-.6-.6-.4c-.7-.4-2.3-.6-3.6-.2-.9-1.4-2.7-2.2-4.5-2.3l-.1 1.1c.9.1 2.5.5 3.2 1.7l.6 1 1.1-.4c.6-.2 1.4-.2 2 0-.9 1.7-2.5 1.9-3.7 1.9h-.9l-.3.9C34.2 21 27.2 25.5 17.6 25.5c-4.3 0-7.4-1.1-9.3-3.2-2.2-2.4-2.5-5.8-2.4-7.4h20.6c2.6 0 4.5-1.1 5.1-1.6Z"
        fill="#2496ED"
        transform="scale(0.62) translate(2 -2)"
      />
    </Frame>
  )
}

/** slug → component, so <TechStack> stays data-driven. */
export const logoRegistry: Record<TechLogo, (props: LogoProps) => React.JSX.Element> = {
  nextjs: NextjsLogo,
  react: ReactLogo,
  typescript: TypeScriptLogo,
  nodejs: NodeLogo,
  postgresql: PostgreSqlLogo,
  tailwind: TailwindLogo,
  aws: AwsLogo,
  docker: DockerLogo,
}
