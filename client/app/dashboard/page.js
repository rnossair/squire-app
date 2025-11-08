'use client'
import Image from "next/image";
import SearchBar from "../Components/Searchbar";
import BoxButton from "../Components/BoxButton";

export default function Home() {
  return (
    <div className="min-h-screen font-sans dark:bg-light bg-gray-50">
      <main
        className="
          flex flex-col
          items-start
          justify-start
          px-6 sm:px-10 md:px-20 lg:px-40 xl:px-60
          py-10
          space-y-10
        "
      >
        {/* Top-left heading */}
        <h1
          className="
            text-black
            text-[clamp(1.8rem,4vw,3rem)]
            font-semibold
          "
        >
          Hello User 👋
        </h1>

        {/* Search bar - responsive width */}
        <div className="w-full">
          <SearchBar />
        </div>

        {/* Button boxes */}
        <div
          className="
            flex flex-wrap justify-center  /* <-- center horizontally */
            gap-4 sm:gap-6 md:gap-8 lg:gap-10
            pt-8 sm:pt-10 md:pt-12
            w-full     
          "
        >
          <BoxButton
            imageSrc="/images/icon1.png"
            title="Profile"
            onClick={() => console.log('Profile clicked!')}
          />
          <BoxButton
            imageSrc="/images/icon2.png"
            title="Messages"
            onClick={() => console.log('Messages clicked!')}
          />
          <BoxButton
            imageSrc="/images/icon3.png"
            title="Settings"
            onClick={() => console.log('Settings clicked!')}
          />
        </div>
      </main>
    </div>
  );
}
