"use client";

import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { orbitron } from "@/app/page";
import DataSourceDropdown from "@/components/DataSourceDropdown";
import UploadFile from "@/components/UploadFile";
import CircleProgress from "@/components/CircleProgress";

function PredictionsView() {
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setGenerated(false);

    setTimeout(() => {
      setLoading(false);
      setGenerated(true);
    }, 10000);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className={`text-5xl font-bold ${orbitron.className}`}>
        Kepler-227 b
      </h1>
      <div className="flex max-w-[1500px] gap-5">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl font-bold self-start shadow-lg max-w-4xl text-white px-4">
            Brief:
          </h2>
          <div className="flex flex-col text-xl gap-5 bg-[var(--bg-color-3)] p-6 rounded-2xl border-2 border-[var(--main-color)] shadow-lg max-w-lg text-white">
            <div className="flex flex-row justify-center items-center gap-2">
              <h1>1- Kepler-227 b is an exoplanet with a percentage</h1>
              <CircleProgress percentage={98.7} size={100} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl font-bold self-start shadow-lg max-w-4xl text-white px-4">
            Description:
          </h2>
          <h2 className="text-xl bg-[var(--bg-color-3)] p-6 rounded-2xl border-2 border-[var(--main-color)] shadow-lg max-w-7xl text-white">
            Kepler-227 b, an exoplanet orbiting its star once every 9.5 days.
            This planet is about twice the size of Earth, with a radius of 2.26
            Earth radii. Bathed in the glow of its star, its atmosphere shimmers
            under an equilibrium temperature near 793 Kelvin — hotter than
            Mercury, yet cooler than a blazing gas giant. From space, Kepler-227
            b appears as a rocky super-Earth with faint clouds and a glowing
            horizon. The planet crosses its star in a near-perfect alignment,
            creating deep shadows and dramatic silhouettes.
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl font-bold self-start shadow-lg max-w-4xl text-white px-4">
            ESI:
          </h2>
          <div className="flex flex-col text-xl gap-5 bg-[var(--bg-color-3)] p-6 rounded-2xl border-2 border-[var(--main-color)] shadow-lg max-w-lg text-white">
            <div>Earth Similarity Index (ESI) of 0.68</div>
          </div>
        </div>
      </div>
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="cursor-pointer px-8 py-3 bg-[var(--main-color)] text-white rounded-full hover:bg-[var(--main-color-2)] transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Generating..." : "Generate a Simulation Video"}
      </button>

      {loading && (
        <div className="flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {generated && (
        <div className="flex flex-col items-center gap-6">
          <video
            src="/video.mp4"
            className="w-xl h-full rounded-xl shadow-lg"
            controls
          />
        </div>
      )}
    </div>
  );
}

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [showPredictions, setShowPredictions] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setGenerated(false);

    setTimeout(() => {
      setLoading(false);
      setGenerated(true);
    }, 5000);
  };

  return (
    <div className="font-sans flex flex-col items-center justify-items-center min-h-screen pt-6 pb-20 gap-16 px-4">
      {!showPredictions ? (
        <>
          <div className="flex items-center gap-3">
            <Icon
              icon="uil:statistics"
              className="w-12 h-12 text-[var(--main-color)] border-3 border-[var(--main-color)] rounded-2xl p-1 "
            />
            <h1 className={`text-5xl font-bold ${orbitron.className}`}>
              Choose Your Data Path ...
            </h1>
          </div>
          <DataSourceDropdown />
          <UploadFile
            onShowPrediction={() => {
              setShowPredictions(true);
              handleGenerate();
            }}
            text="Show Prediction"
          />
        </>
      ) : (
        <>
          {loading && (
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          {generated && <PredictionsView />}
          {/* <GaugePressure value={0.4} /> */}
        </>
      )}
    </div>
  );
}
