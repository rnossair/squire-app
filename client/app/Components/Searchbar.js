'use client'
import React from "react";

export default function SearchBar({ value, onChange, onSearch }) {
  return (
    <div className="flex w-full items-stretch overflow-hidden rounded-full border border-line bg-surface shadow-sm focus-within:border-squire">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
        placeholder="What do you fancy eating?"
        aria-label="Describe a meal for Squire to suggest"
        className="min-w-0 flex-1 bg-transparent px-5 py-3.5 text-ink placeholder:text-ink-faint focus:outline-none"
      />
      <button
        type="button"
        onClick={onSearch}
        aria-label="Ask Squire for a meal"
        className="m-1 rounded-full bg-squire px-5 text-sm font-medium text-surface transition-colors hover:bg-squire-bright"
      >
        Ask
      </button>
    </div>
  );
}
