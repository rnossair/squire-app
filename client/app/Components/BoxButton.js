'use client';
import React from 'react';
import Image from 'next/image';

export default function ImageBoxButton({ imageSrc, title, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        flex flex-col items-center justify-center
        bg-white shadow-md rounded-3xl
        p-8 w-78 h-78
        hover:shadow-xl hover:-translate-y-1
        transition-all duration-300
      "
    >
      <div className="w-20 h-20 relative mb-3">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-contain"
        />
      </div>
      <span className="text-lg font-semibold text-gray-700">{title}</span>
    </button>
  )
}
