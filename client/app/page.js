'use client';

import { useState } from 'react';


// Home component
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans dark:bg-black">
      <main className="flex flex-col items-center space-y-4">
        <h1 className="text-black text-[clamp(2em,2vw,3vw)]">Healthy nutrition, made simple</h1>
      </main>
    </div>
  );
}
