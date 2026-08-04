import { Bricolage_Grotesque, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar";

const display = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const mono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata = {
  title: "Squire — your day's provisions",
  description:
    "Squire is your nutrition attendant. It watches what's left of your daily macros and hands you a meal that fits.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
