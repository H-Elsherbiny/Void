"use client";

import React, { useState } from "react";
import { Orelega_One } from "next/font/google";
import { ChevronDown } from "lucide-react";
import { Telescope } from "lucide-react";

const orelega = Orelega_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-orelega",
});

export default function DataSourceDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("KEPLER");

  const items = ["KEPLER", "K2", "TESS"];

  return (
    <div
      className={`flex flex-col justify-center items-center ${orelega.variable} font-sans text-white`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-[300px] flex items-center justify-between px-4 py-2 border border-[var(--main-color)] bg-[rgba(20,20,20,0.8)] hover:bg-[rgba(20,20,20,0.6)] transition"
      >
        <span className="flex items-center gap-2">
          <Telescope size={18} />
          {items.filter((item) => item === selected)}
        </span>
        <ChevronDown
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="mt-1 w-[300px] rounded border border-[var(--main-color)] bg-[rgba(20,20,20,0.8)]">
          {items.map((item) => (
            <div
              key={item}
              onClick={() => {
                setSelected(item);
                setIsOpen(false);
              }}
              className={`px-4 py-2 text-center cursor-pointer transition ${
                selected === item
                  ? "bg-[var(--main-color)] text-white"
                  : "bg-gray-700 hover:bg-[var(--main-color-2)]"
              }`}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
