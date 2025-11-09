
import { Children } from 'react';
import Navbar from './Components/Navbar';
import ThreeColumnSection from './Components/ThreeColumnSection';


// Home component
export default function Home() {
  return (
    
    <div className="flex relative min-h-screen items-center justify-center font-sans dark:bg-white">
      <main className="absolute inset-1 flex flex-col space-y-4 z-1">
        <div className="px-10 justify-start">
          <h1 className="h-full w-full flex items-center justify-left text-[clamp(2em,2vw,3vw)] font-bold text-[clamp(2em,2vw,3vw)]">Healthy nutrition, made simple</h1>
        </div>
        <div className="flex justify-center">
         <section id="signup" className="text-center py-20 bg-indigo-600 text-white px-20 justify-center ">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="mb-8">Create a nutrition plan that works for you</p>
          <a href="#" className="bg-white text-indigo-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition">Start Free Trial</a>
          </section>
        </div>
       
      </main>
      <section id="about" className="relative mb-8, bg-grey-600 z-0 py-90">
            <ThreeColumnSection />
        </section>
    </div>
  );
}
