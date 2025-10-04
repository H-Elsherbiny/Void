"use client";

import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";

type Row = Record<string, string>;

interface UploadFileProps {
  onShowPrediction?: () => void;
  text: string;
}

export default function UploadFile({
  onShowPrediction,
  text,
}: UploadFileProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    setError(null);
    const f = e.target.files?.[0];
    if (!f) return;

    const lowerName = f.name.toLowerCase();
    setFileName(f.name);

    const reader = new FileReader();

    if (lowerName.endsWith(".xlsx")) {
      reader.onload = () => {};
      reader.readAsBinaryString(f);
    } else if (lowerName.endsWith(".csv")) {
      reader.onload = () => {};
      reader.readAsText(f);
    } else {
      setError("Please upload a CSV or XLSX file.");
    }
  }

  function handleClear() {
    setFileName(null);
    setError(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <div className="w-xl h-[300px] mx-auto p-8">
      <div className="flex flex-col gap-3 rounded-3xl bg-[rgba(255,255,255,0.05)] backdrop-blur-lg border-2 border-[var(--main-color)] p-8 shadow-xl">
        <h2 className="text-2xl text-center font-bold text-purple-200 mb-4">
          Upload your CSV or XLSX
        </h2>

        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-[var(--main-color)] rounded-2xl cursor-pointer hover:bg-[rgba(255,255,255,0.05)] transition">
          <span className="text-white">Click or drag CSV/XLSX file here</span>
          <input
            ref={fileRef}
            type="file"
            accept=".csv,.xlsx"
            onChange={handleFile}
            className="hidden"
          />
        </label>

        <div className="flex gap-3 mt-4 justify-center">
          <button
            onClick={handleClear}
            className="px-6 py-2 font-bold rounded-full border-2 border-[#c20a0a] text-white bg-[#c20a0a] hover:opacity-85 transition-all cursor-pointer"
          >
            Clear
          </button>

          {fileName && !error && (
            <button
              onClick={onShowPrediction}
              className="px-6 py-2 font-bold rounded-full border-2 border-[var(--main-color)] text-white bg-[var(--main-color)] hover:opacity-85 transition-all cursor-pointer"
            >
              {text}
            </button>
          )}
        </div>

        {fileName && (
          <div className="mt-3 text-sm text-purple-200">
            Selected: <strong>{fileName}</strong>
          </div>
        )}
        {error && <div className="mt-2 text-red-400">{error}</div>}
      </div>
    </div>
  );
}
