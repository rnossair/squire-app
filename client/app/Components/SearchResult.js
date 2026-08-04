'use client'
import React from "react";

export default function SearchResult({ text }) {
  return (
    <div className="w-full rounded-2xl border border-line bg-surface p-6 shadow-sm">
      <div className="text-ink">{text}</div>
    </div>
  );
}
