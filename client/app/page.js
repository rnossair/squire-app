
import { Children } from 'react';
import Navbar from './Components/Navbar';
import ThreeColumnSection from './Components/ThreeColumnSection';


// Home component
export default function Home() {
  return (
    
    <div className="flex relative min-h-screen items-center justify-center font-sans dark:bg-white">
      <main className="absolute inset-1 flex flex-col space-y-4 z-1">
        <div className="px-10 justify-start">
          <h1 className="h-full w-full flex items-center text-green-400 justify-left text-[clamp(2em,2vw,3vw)] font-bold text-[clamp(2em,2vw,3vw)]">Healthy nutrition, made simple</h1>
        </div>
        <div className="flex justify-left p-10 bg-[url('https://tableo.com/wp-content/uploads/Restaurant-Stock-Images-e1699951587809.webp')] bg-cover bg-center bg-no-repeat">
         <section id="signup" className="text-center py-20 bg-indigo-600/75 text-white px-20 justify-center rounded-xl">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="mb-8">Create a nutrition plan that works for you</p>
          <a href="/dashboard" className="bg-white text-indigo-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition">Start Free Trial</a>
          </section>
        </div>
       
      </main>
      <section id="about" className="relative mb-8, bg-grey-600 z-0 py-110">
            <ThreeColumnSection />
        </section>
    </div>
  );
}
