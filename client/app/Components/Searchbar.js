'use client'
import React from "react";

export default function SearchBar({ value, onChange, onSearch }) {
  return (
    <div className="flex w-full">
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
        placeholder="🤔 What will you be eating today..."
        className="flex-1 border rounded-l-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      <button
        onClick={onSearch}
        className="bg-green-500 text-white px-4 py-2 rounded-r-full hover:bg-green-600"
      >
        🔍
      </button>
    </div>
  );
}
