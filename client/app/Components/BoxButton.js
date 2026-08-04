'use client';
import React from 'react';

export default function BoxButton({ title, description, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group flex w-full items-center gap-4 rounded-2xl border border-line bg-surface p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sunk text-squire" aria-hidden="true">
        {icon}
      </span>
      <span className="flex flex-col">
        <span className="font-medium text-ink">{title}</span>
        {description && <span className="text-sm text-ink-soft">{description}</span>}
      </span>
      <span className="ml-auto text-brass transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
    </button>
  )
}
