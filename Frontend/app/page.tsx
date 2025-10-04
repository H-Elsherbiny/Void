import { Orbitron } from "next/font/google";
import { Montserrat } from "next/font/google";
import { Icon } from "@iconify/react";

export const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["700"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  // weight: ["700"],
});

export default function Home() {
  return (
    <div className="font-sans flex flex-col items-center justify-items-center min-h-screen pt-10 pb-20 gap-16 px-4 ">
      <h1
        className={`text-9xl font-bold pt-20 text-center ${orbitron.className}`}
      >
        From Light to Life
      </h1>
      <h1
        className={`text-4xl pt-12 text-center tracking-[0.8rem] ${montserrat.className} `}
      >
        CLASSIFICATION . VISUALIZATION . FUTURE
      </h1>
      <div className="flex flex-row gap-10">
        <a
          href="/training"
          className={`flex font-bold gap-2 bg-[var(--main-color-2)] border-2 border-[var(--main-color-2)] px-5 py-2 rounded-lg transition-all hover:opacity-80 `}
        >
          Continue Training
          <Icon
            icon="icon-park-outline:cycle-arrow"
            className="w-6 h-6 text-white"
          />
        </a>
        <a
          href="/prediction"
          className={`flex font-bold gap-2 bg-[var(--main-color-3)] border-2 border-[var(--main-color-2)] px-5 py-2 rounded-lg transition-all hover:opacity-80 `}
        >
          Generate More
          <Icon
            icon="material-symbols:add-column-right-rounded"
            className="w-6 h-6 text-white"
          />
        </a>
      </div>
    </div>
  );
}
