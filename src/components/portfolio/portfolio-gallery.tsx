'use client'

import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { PortfolioPreview } from '@/components/portfolio/portfolio-preview'

import { portfolio, portfolioTypes, type PortfolioType } from '@/content/portfolio'
import { cn } from '@/lib/cn'

type Tab = 'All' | PortfolioType

const chipBase =
  'type-label inline-flex h-8 cursor-pointer items-center gap-2 rounded-pill border px-3 transition-colors duration-(--dur-base) ease-(--ease-out-quart) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'

/**
 * Tabs filter by project type, chips filter by industry; the two combine.
 * Everything is rendered on the server first with all items visible, so the
 * gallery is fully crawlable before hydration.
 */
export function PortfolioGallery() {
  const [tab, setTab] = useState<Tab>('All')
  const [industry, setIndustry] = useState<string | null>(null)
  const [openSlug, setOpenSlug] = useState<string | null>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  // ?project=<slug> makes every preview shareable.
  const setProjectParam = (slug: string | null) => {
    const url = new URL(window.location.href)
    if (slug) url.searchParams.set('project', slug)
    else url.searchParams.delete('project')
    window.history.replaceState(null, '', url)
  }

  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get('project')
    if (slug && portfolio.some((item) => item.slug === slug)) setOpenSlug(slug)
  }, [])

  const openProject = useCallback((slug: string) => {
    setOpenSlug(slug)
    setProjectParam(slug)
  }, [])

  const closeProject = useCallback(() => {
    setOpenSlug(null)
    setProjectParam(null)
    triggerRef.current?.focus()
  }, [])

  const openItem = portfolio.find((item) => item.slug === openSlug)

  const tabs = useMemo(
    () =>
      (['All', ...portfolioTypes] as Tab[]).map((value) => ({
        value,
        count:
          value === 'All'
            ? portfolio.length
            : portfolio.filter((item) => item.type === value).length,
      })),
    [],
  )

  const industries = useMemo(() => {
    const counts = new Map<string, number>()
    portfolio
      .filter((item) => tab === 'All' || item.type === tab)
      .forEach((item) => counts.set(item.industry, (counts.get(item.industry) ?? 0) + 1))
    return [...counts.entries()].sort((a, b) => a[0].localeCompare(b[0]))
  }, [tab])

  const items = portfolio.filter(
    (item) => (tab === 'All' || item.type === tab) && (!industry || item.industry === industry),
  )

  return (
    <div>
      {/* Type tabs */}
      <div
        role="tablist"
        aria-label="Project type"
        className="border-hairline flex gap-6 overflow-x-auto border-b"
      >
        {tabs.map(({ value, count }) => {
          const active = tab === value
          return (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={active}
              disabled={count === 0}
              onClick={() => {
                setTab(value)
                setIndustry(null)
              }}
              className={cn(
                'type-nav focus-visible:outline-ring -mb-px shrink-0 cursor-pointer border-b py-4 transition-colors duration-(--dur-base) ease-(--ease-out-quart) focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-40',
                active ? 'border-fg text-fg' : 'text-fg-subtle hover:text-fg border-transparent',
              )}
            >
              {value}
              <span className="text-fg-subtle ml-1.5">{count}</span>
            </button>
          )
        })}
      </div>

      {/* Industry chips */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="type-label text-fg-subtle mr-2">INDUSTRY</span>
        {industries.map(([name, count]) => {
          const active = industry === name
          return (
            <button
              key={name}
              type="button"
              aria-pressed={active}
              onClick={() => setIndustry(active ? null : name)}
              className={cn(
                chipBase,
                active
                  ? 'border-fg bg-fg text-on-accent'
                  : 'border-hairline-lit text-fg-muted hover:border-border hover:text-fg',
              )}
            >
              {name}
              <span className={active ? 'opacity-60' : 'text-fg-subtle'}>{count}</span>
            </button>
          )
        })}
      </div>

      {/* Grid */}
      <p aria-live="polite" className="sr-only">
        {items.length} projects shown
      </p>
      <ul className="mt-10 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => {
          return (
            <li key={item.slug}>
              <a
                href={`?project=${item.slug}`}
                onClick={(event) => {
                  event.preventDefault()
                  triggerRef.current = event.currentTarget
                  openProject(item.slug)
                }}
                className="group focus-visible:outline-ring block cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                <div className="rounded-frame border-hairline bg-surface-2 group-hover:border-hairline-lit relative aspect-[16/10] overflow-hidden border transition-colors duration-(--dur-base) ease-(--ease-out-quart)">
                  <Image
                    src={item.cover.src}
                    alt={item.cover.alt}
                    width={item.cover.width}
                    height={item.cover.height}
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="size-full object-cover transition-transform duration-(--dur-slow,600ms) ease-(--ease-out-quart) group-hover:scale-[1.04]"
                  />
                  {item.isNew ? (
                    <span className="type-label rounded-pill bg-void/60 text-fg absolute top-3 left-3 inline-flex h-6 items-center gap-1.5 px-2.5 backdrop-blur-sm">
                      <span aria-hidden="true" className="rounded-pill bg-danger size-1.5" />
                      New
                    </span>
                  ) : null}
                </div>

                <div className="mt-4 flex items-start justify-between gap-3">
                  <h3 className="type-title text-fg min-w-0">{item.title}</h3>
                  <span className="type-label rounded-pill border-hairline-lit text-fg-muted inline-flex h-5 shrink-0 items-center border px-2">
                    {item.concept ? 'Concept' : item.type}
                    {item.concept ? (
                      <span className="sr-only"> project — not client work</span>
                    ) : null}
                  </span>
                </div>
                <p className="type-label text-fg-subtle group-hover:text-fg-muted mt-1.5 transition-colors duration-(--dur-base)">
                  {item.type} · {item.industry}
                </p>
              </a>
            </li>
          )
        })}
      </ul>

      {items.length === 0 ? (
        <p className="type-body text-fg-muted mt-10">No projects in this category yet.</p>
      ) : null}

      {openItem ? (
        <PortfolioPreview item={openItem} onClose={closeProject} onSelect={openProject} />
      ) : null}
    </div>
  )
}
