"use client";

import { useState } from "react";

const NOISE_FILTERS = [
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
  "European",
];

const OCCASIONS = [
  "First Date",
  "Business Lunch",
  "Solo Dining",
  "Family",
  "Celebration",
];

interface Props {
  activeNoise: string;
  setActiveNoise: (v: string) => void;
  activeCuisine: string;
  setActiveCuisine: (v: string) => void;
  activeOccasion: string;
  setActiveOccasion: (v: string) => void;
  verifiedOnly: boolean;
  setVerifiedOnly: (v: boolean) => void;
  view: "cards" | "map";
  setView: (v: "cards" | "map") => void;
  isMobile: boolean;
}

export default function FilterBar({
  activeNoise,
  setActiveNoise,
  activeCuisine,
  setActiveCuisine,
  activeOccasion,
  setActiveOccasion,
  verifiedOnly,
  setVerifiedOnly,
  view,
  setView,
}: Props) {
  const [cuisineOpen, setCuisineOpen] = useState(false);
  const [occasionOpen, setOccasionOpen] = useState(false);

  function closeAll() {
    setCuisineOpen(false);
    setOccasionOpen(false);
  }

  return (
    <div className="bg-ivory border-b border-warm-border px-4 md:px-8 py-3 sticky top-16 z-30">
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
        {/* Noise pills */}
        {NOISE_FILTERS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => {
              setActiveNoise(value);
              closeAll();
            }}
            className={`shrink-0 font-sans text-[0.72rem] tracking-wide px-3 py-1.5 rounded border transition-all duration-200 ${activeNoise === value ? "bg-green-600 text-white border-green-600" : "bg-ivory text-muted border-warm-border hover:border-green-400 hover:text-green-600"}`}
          >
            {label}
          </button>
        ))}

        <div className="w-px h-5 bg-warm-border shrink-0" />

        {/* Cuisine */}
        <div className="relative shrink-0">
          <button
            onClick={() => {
              setCuisineOpen(!cuisineOpen);
              setOccasionOpen(false);
            }}
            className={`font-sans text-[0.72rem] tracking-wide px-3 py-1.5 rounded border transition-all duration-200 flex items-center gap-2 ${activeCuisine ? "bg-green-600 text-white border-green-600" : "border-warm-border text-muted hover:border-green-400 hover:text-green-600"}`}
          >
            {activeCuisine || "Cuisine"}
            <span className="text-[0.6rem]">{cuisineOpen ? "▴" : "▾"}</span>
          </button>
          {cuisineOpen && (
            <div className="absolute top-full left-0 mt-2 bg-ivory border border-warm-border rounded shadow-lg py-2 z-[100] min-w-[160px]">
              {activeCuisine && (
                <button
                  onClick={() => {
                    setActiveCuisine("");
                    setCuisineOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 font-sans text-xs text-amber hover:bg-ivory-dark transition-colors border-b border-warm-border"
                >
                  Clear ✕
                </button>
              )}
              {CUISINES.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setActiveCuisine(c === activeCuisine ? "" : c);
                    setCuisineOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 font-sans text-xs transition-colors ${activeCuisine === c ? "text-green-600 bg-green-50" : "text-muted hover:text-green-600 hover:bg-ivory-dark"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Occasion */}
        <div className="relative shrink-0">
          <button
            onClick={() => {
              setOccasionOpen(!occasionOpen);
              setCuisineOpen(false);
            }}
            className={`font-sans text-[0.72rem] tracking-wide px-3 py-1.5 rounded border transition-all duration-200 flex items-center gap-2 ${activeOccasion ? "bg-green-600 text-white border-green-600" : "border-warm-border text-muted hover:border-green-400 hover:text-green-600"}`}
          >
            {activeOccasion || "Occasion"}
            <span className="text-[0.6rem]">{occasionOpen ? "▴" : "▾"}</span>
          </button>
          {occasionOpen && (
            <div className="absolute top-full left-0 mt-2 bg-ivory border border-warm-border rounded shadow-lg py-2 z-[100] min-w-[160px]">
              {activeOccasion && (
                <button
                  onClick={() => {
                    setActiveOccasion("");
                    setOccasionOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 font-sans text-xs text-amber hover:bg-ivory-dark transition-colors border-b border-warm-border"
                >
                  Clear ✕
                </button>
              )}
              {OCCASIONS.map((o) => (
                <button
                  key={o}
                  onClick={() => {
                    setActiveOccasion(o === activeOccasion ? "" : o);
                    setOccasionOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 font-sans text-xs transition-colors ${activeOccasion === o ? "text-green-600 bg-green-50" : "text-muted hover:text-green-600 hover:bg-ivory-dark"}`}
                >
                  {o}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="w-px h-5 bg-warm-border shrink-0" />

        {/* Verified */}
        <button
          onClick={() => {
            setVerifiedOnly(!verifiedOnly);
            closeAll();
          }}
          className={`shrink-0 font-sans text-[0.72rem] tracking-wide px-3 py-1.5 rounded border transition-all duration-200 flex items-center gap-2 ${verifiedOnly ? "bg-green-600 text-white border-green-600" : "border-warm-border text-muted hover:border-green-400 hover:text-green-600"}`}
        >
          <span className="w-2 h-2 rounded-full bg-current inline-block" />
          Verified
        </button>

        {/* View toggle — hidden on mobile */}
        {!isMobile && (
          <div className="hidden md:flex items-center border border-warm-border rounded overflow-hidden shrink-0 ml-auto">
            <button
              onClick={() => setView("cards")}
              className={`px-4 py-2 font-sans text-[0.72rem] tracking-wide transition-all duration-200 flex items-center gap-2 ${view === "cards" ? "bg-green-600 text-white" : "bg-ivory text-muted hover:text-green-600"}`}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect
                  x="0"
                  y="0"
                  width="6"
                  height="6"
                  rx="1"
                  fill="currentColor"
                  opacity="0.8"
                />
                <rect
                  x="8"
                  y="0"
                  width="6"
                  height="6"
                  rx="1"
                  fill="currentColor"
                  opacity="0.8"
                />
                <rect
                  x="0"
                  y="8"
                  width="6"
                  height="6"
                  rx="1"
                  fill="currentColor"
                  opacity="0.8"
                />
                <rect
                  x="8"
                  y="8"
                  width="6"
                  height="6"
                  rx="1"
                  fill="currentColor"
                  opacity="0.8"
                />
              </svg>
              Cards
            </button>
            <div className="w-px h-5 bg-warm-border" />
            <button
              onClick={() => setView("map")}
              className={`px-4 py-2 font-sans text-[0.72rem] tracking-wide transition-all duration-200 flex items-center gap-2 ${view === "map" ? "bg-green-600 text-white" : "bg-ivory text-muted hover:text-green-600"}`}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 1C4.8 1 3 2.8 3 5c0 3 4 8 4 8s4-5 4-8c0-2.2-1.8-4-4-4z"
                  fill="currentColor"
                  opacity="0.8"
                />
                <circle cx="7" cy="5" r="1.5" fill="white" />
              </svg>
              Map
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
