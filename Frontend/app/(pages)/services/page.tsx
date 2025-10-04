import React from "react";
import { Icon } from "@iconify/react";
import { orbitron } from "@/app/page";
import SimpleCarousel from "@/components/Carousel";

export default function Page() {
  return (
    <div className="font-sans flex flex-col items-center justify-items-center min-h-screen pt-28 pb-20 gap-16 px-4 ">
      <div className="flex gap-6 items-center">
        <Icon
          icon={"ix:add-document-note"}
          className="w-20 h-20 text-[var(--main-color)]"
        />
        <h1 className={`text-5xl font-bold ${orbitron.className}`}>SERVICES</h1>
      </div>
      <div className="w-full flex justify-center">
        <SimpleCarousel items={items} />
      </div>
    </div>
  );
}

const items = [
  {
    icon: "fluent-mdl2:accessibilty-checker",
    title: "Data Exploration",
    description:
      "Dive into NASA's Kepler, K2, and TESS datasets through an interactive interface. Upload custom light curve files or browse preloaded datasets, then filter and sort by stellar type, orbital period, or planet radius. This feature empowers scientists to quickly navigate massive data collections and uncover patterns that might otherwise be overlooked.",
  },
  {
    icon: "mingcute:classify-2-fill",
    title: "AI Classification",
    description:
      "Automated hybrid AI system distinguishes confirmed exoplanets, candidates, and false positives. By combining ensemble methods for tabular features with deep learning for time-series data, it delivers interpretable, consistent, and scalable results.",
  },
  {
    icon: "oui:app-visualize",
    title: "Visualization Tools",
    description:
      "Transform astrophysical data into interactive visuals. Explore processed transit curves, orbit maps, and star-planet system models that make discoveries intuitive for scientists and engaging for the public.",
  },
  {
    icon: "fluent-mdl2:analytics-view",
    title: "Habitability Analysis",
    description:
      "Assess potential for life with indices like the Earth Similarity Index (ESI) and other habitability metrics. Planets are ranked and displayed with visual scores or color-coded indicators, guiding research priorities and inspiring exploration.",
  },
];
