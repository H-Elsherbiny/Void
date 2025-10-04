"use client";

import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { orbitron } from "@/app/page";
import DataSourceDropdown from "@/components/DataSourceDropdown";
import UploadFile from "@/components/UploadFile";
import CircleProgress from "@/components/CircleProgress";
import BarChart from "@/components/BarChart";

function TrainingView() {
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
    <div className="flex flex-col justify-center items-center gap-10">
      <h1 className={`text-5xl font-bold ${orbitron.className}`}>Success</h1>
      <h2 className={`text-2xl font-bold`}>Training Matrix </h2>
      <div className="flex max-w-[1500px] gap-5">
        <BarChart
          labels={["Accuracy", "Precision", "Recall", "F1-Score"]}
          values={[98.7, 99, 97.7, 98.5]}
          max={100}
          width={400}
          height={250}
        />
      </div>

      {loading && (
        <div className="flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
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
            text="Train Data"
          />
        </>
      ) : (
        <>
          {loading && (
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          {generated && <TrainingView />}
          {/* <GaugePressure value={0.4} /> */}
        </>
      )}
    </div>
  );
}
