'use client'
import { useState } from 'react';

export default function SearchBar() {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', query);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center space-x-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask us anything!"
        className="w-[90%] h-12 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 max-sm:h-10 max-sm:text-sm"
      />
      <button
        type="submit"
        className="px-4 py-3 bg-gray-400 text-white rounded-full hover:bg-gray-500 max-sm:px-3 max-sm:py-2"
      >
        🔍
      </button>
    </form>
  );
}
