import React from "react";
import Image from "next/image";
import { Jockey_One } from "next/font/google";
import { Orelega_One } from "next/font/google";

const jockeyOne = Jockey_One({
  subsets: ["latin"],
  weight: "400",
});

const orelegaOne = Orelega_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-orelega-one",
});

export default function Header() {
  return (
    <div className="w-full h-24 flex items-center justify-between px-16">
      <a
        href="/"
        className={`flex text-5xl font-extrabold tracking-widest ${orelegaOne.className}`}
      >
        V
        <Image src="/Kingsoul.png" alt="Logo" width={45} height={45} />
        ID
      </a>
      <nav className={`text-xl flex gap-10 ${jockeyOne.className}`}>
        <a href="/" className="hover:text-gray-300 transition">
          Home
        </a>
        <a href="/training" className="hover:text-gray-300 transition">
          Train
        </a>
        <a href="/prediction" className="hover:text-gray-300 transition">
          Predict
        </a>
        <a href="/about" className="hover:text-gray-300 transition">
          About
        </a>
      </nav>
    </div>
  );
}
