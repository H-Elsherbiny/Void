"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import { Krona_One } from "next/font/google";

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 15;

interface CarouselItem {
  icon: string;
  title: string;
  description: string;
}

interface CarouselProps {
  items: CarouselItem[];
}

const kronaOne = Krona_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-krona-one",
});

export default function SimpleCarousel({ items }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  useEffect(() => {
    const intervalRef = setInterval(() => {
      setDirection("right");
      setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  }, [items.length]);

  const handleNext = () => {
    setDirection("right");
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setDirection("left");
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full max-w-[1400px] mx-auto overflow-hidden rounded-2xl bg-[var(--bg-color)] text-white p-8 shadow-lg">
      <div className="relative flex items-center justify-center px-4">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={textVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6 px-8"
          >
            <div className="flex items-center justify-self-start gap-4">
              <Icon
                icon={items[currentIndex].icon}
                className="text-5xl text-[var(--main-color)]"
              />
              <h3
                className={`text-3xl font-semibold ${kronaOne.className}`}
                style={{
                  textShadow: "0 0 40px #f0a",
                }}
              >
                {items[currentIndex].title}
              </h3>
            </div>
            <p>{items[currentIndex].description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-[var(--main-color)] p-2 text-white shadow transition-all hover:bg-[var(--main-color-2)] cursor-pointer"
      >
        <Icon icon="lucide:chevron-left" width={20} height={20} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-[var(--main-color)] p-2 text-white shadow transition-all hover:bg-[var(--main-color-2)] cursor-pointer"
      >
        <Icon icon="lucide:chevron-right" width={20} height={20} />
      </button>

      <div className="flex justify-center gap-1 mt-6">
        {items.map((_, idx) => (
          <motion.div
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full cursor-pointer ${
              idx === currentIndex
                ? "bg-[var(--main-color)] w-6"
                : "bg-gray-300 w-2"
            }`}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        ))}
      </div>
    </div>
  );
}

const textVariants = {
  enter: (direction: string) => ({
    x: direction === "right" ? 35 : -35,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: string) => ({
    x: direction === "right" ? -35 : 35,
    opacity: 0,
  }),
};
