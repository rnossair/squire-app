import Image from "next/image";
import SearchBar from "../Components/Searchbar";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans dark:bg-black">
      <main className="flex flex-col items-center space-y-4">
        <h1 className="text-black text-[clamp(2em,2vw,3vw)]">Hello User</h1>
        <SearchBar />
      </main>
    </div>
  );
}
