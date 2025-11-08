'use client';

import { Children, useState } from 'react';
import Navbar from './Components/Navbar';
import ThreeColumnSection from './Components/ThreeColumnSection';


// Home component
export default function Home() {
  return (
    
    <div className="flex relative min-h-screen items-center justify-center font-sans dark:bg-light">
      <main className="absolute inset-1 flex flex-col items-center space-y-4 z-1">
        <h1 className="text-[clamp(2em,2vw,3vw)]">Healthy nutrition, made simple</h1>
        <section id="signup" className="text-center py-20 bg-indigo-600 text-white px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="mb-8">Create a nutrition plan that works for you</p>
          <a href="#" className="bg-white text-indigo-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition">Start Free Trial</a>
        </section>
      </main>
      <section id="about" className="relative mb-8, bg-grey-600 z-0 py-100">
            <ThreeColumnSection />
        </section>
    </div>
  );
}
