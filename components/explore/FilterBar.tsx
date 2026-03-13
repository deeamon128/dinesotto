"use client";

import { useState } from "react";

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Library Quiet", value: "library" },
  { label: "Pleasantly Quiet", value: "pleasant" },
  { label: "Moderate", value: "moderate" },
];

const CUISINES = [
  "Italian",
  "Japanese",
  "British",
  "French",
  "Mediterranean",
  "Indian",
  "Chinese",
];

const OCCASIONS = [
  "First Date",
  "Business Lunch",
  "Solo Dining",
  "Family",
  "Celebration",
];

export default function FilterBar() {
  const [active, setActive] = useState("all");
  const [showCuisine, setShowCuisine] = useState(false);
  const [showOccasion, setShowOccasion] = useState(false);

  return (
    <div className="bg-ivory border-b border-warm-border px-8 py-4 sticky top-16 z-30">
      <div className="max-w-full flex items-center gap-3 overflow-x-auto no-scrollbar">
        {/* Noise level filters */}
        {FILTERS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setActive(value)}
            className={`
              shrink-0 font-sans text-[0.72rem] tracking-wide px-4 py-2 rounded
              border transition-all duration-200
              ${
                active === value
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-ivory text-muted border-warm-border hover:border-green-400 hover:text-green-600"
              }
            `}
          >
            {label}
          </button>
        ))}

        <div className="w-px h-5 bg-warm-border shrink-0 mx-1" />

        {/* Cuisine dropdown */}
        <div className="relative shrink-0">
          <button
            onClick={() => setShowCuisine(!showCuisine)}
            className="font-sans text-[0.72rem] tracking-wide px-4 py-2 rounded border border-warm-border text-muted hover:border-green-400 hover:text-green-600 transition-all duration-200 flex items-center gap-2"
          >
            Cuisine
            <span className="text-[0.6rem]">▾</span>
          </button>
          {showCuisine && (
            <div className="absolute top-full left-0 mt-2 bg-ivory border border-warm-border rounded shadow-lg py-2 z-50 min-w-[160px]">
              {CUISINES.map((c) => (
                <button
                  key={c}
                  className="w-full text-left px-4 py-2 font-sans text-xs text-muted hover:text-green-600 hover:bg-ivory-dark transition-colors"
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Occasion dropdown */}
        <div className="relative shrink-0">
          <button
            onClick={() => setShowOccasion(!showOccasion)}
            className="font-sans text-[0.72rem] tracking-wide px-4 py-2 rounded border border-warm-border text-muted hover:border-green-400 hover:text-green-600 transition-all duration-200 flex items-center gap-2"
          >
            Occasion
            <span className="text-[0.6rem]">▾</span>
          </button>
          {showOccasion && (
            <div className="absolute top-full left-0 mt-2 bg-ivory border border-warm-border rounded shadow-lg py-2 z-50 min-w-[160px]">
              {OCCASIONS.map((o) => (
                <button
                  key={o}
                  className="w-full text-left px-4 py-2 font-sans text-xs text-muted hover:text-green-600 hover:bg-ivory-dark transition-colors"
                >
                  {o}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="w-px h-5 bg-warm-border shrink-0 mx-1" />

        {/* Verified toggle */}
        <button className="shrink-0 font-sans text-[0.72rem] tracking-wide px-4 py-2 rounded border border-warm-border text-muted hover:border-green-400 hover:text-green-600 transition-all duration-200 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
          Verified Only
        </button>
      </div>
    </div>
  );
}
