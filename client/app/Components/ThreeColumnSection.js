'use client'
import React from 'react'

const DUTIES = [
  {
    title: 'Knows your targets',
    description: 'Set your daily calories and macros once. Squire keeps the tally from there.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Suggests the meal',
    description: 'Ask for anything you fancy. You get a recipe that fits exactly what the day has left.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 3v7a3 3 0 0 0 6 0V3M8 3v18" />
        <path d="M17 3c-1.5 1-2.5 3-2.5 5.5S15.5 13 17 13v8" />
      </svg>
    ),
  },
  {
    title: 'Keeps the record',
    description: 'Every meal logged, every day at a glance — no spreadsheets, no arithmetic.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 5h16M4 12h16M4 19h10" />
      </svg>
    ),
  },
]

export default function ThreeColumnSection() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <div className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-widest text-brass">What a squire does</p>
        <h2 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
          It carries the tedious part.
        </h2>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {DUTIES.map((duty) => (
          <div key={duty.title} className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sunk text-squire">
              {duty.icon}
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold text-ink">{duty.title}</h3>
            <p className="mt-2 text-ink-soft">{duty.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
