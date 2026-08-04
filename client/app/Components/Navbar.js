'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/85 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="group font-display text-2xl font-semibold tracking-tight text-squire"
          aria-label="Squire, home"
        >
          <span className="text-brass transition-transform group-hover:-translate-x-0.5 inline-block">[</span>
          <span className="px-1">Squire</span>
          <span className="text-brass transition-transform group-hover:translate-x-0.5 inline-block">]</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-7 sm:flex">
          <Link href="/" className="text-sm text-ink-soft transition-colors hover:text-ink">
            Home
          </Link>
          <Link
            href="/dashboard"
            className="rounded-full bg-squire px-4 py-2 text-sm font-medium text-surface transition-colors hover:bg-squire-bright"
          >
            Open dashboard
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((s) => !s)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-ink sm:hidden"
        >
          <span className="relative block h-4 w-5">
            <span className={`absolute left-0 block h-0.5 w-5 bg-current transition-all ${open ? 'top-2 rotate-45' : 'top-0'}`} />
            <span className={`absolute left-0 top-2 block h-0.5 w-5 bg-current transition-opacity ${open ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`absolute left-0 block h-0.5 w-5 bg-current transition-all ${open ? 'top-2 -rotate-45' : 'top-4'}`} />
          </span>
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`overflow-hidden border-t border-line bg-canvas transition-[max-height] duration-300 sm:hidden ${open ? 'max-h-40' : 'max-h-0'}`}>
        <div className="flex flex-col gap-1 px-5 py-3">
          <Link href="/" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-ink-soft hover:bg-sunk">
            Home
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="rounded-lg bg-squire px-3 py-2 font-medium text-surface"
          >
            Open dashboard
          </Link>
        </div>
      </div>
    </header>
  )
}
