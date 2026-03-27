"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

const AREAS = [
  "Covent Garden",
  "Notting Hill",
  "Marylebone",
  "Soho",
  "Shoreditch",
  "Brixton",
  "Camden",
  "Mayfair",
];

export default function Hero() {
  const [search, setSearch] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const noiseOpacity = Math.max(0, 1 - scrollY / 400);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-green-900"
    >
      {/* Amber glow — bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-amber/20 blur-[120px] z-0 pointer-events-none" />

      {/* Animated ripple rings */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <svg
          className="absolute w-full h-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          {[0, 1.5, 3, 4.5].map((delay) => (
            <circle
              key={delay}
              cx="720"
              cy="450"
              r="80"
              fill="none"
              stroke="#4a6741"
              strokeWidth="0.8"
              opacity="0.5"
            >
              <animate
                attributeName="r"
                from="80"
                to="600"
                dur="6s"
                repeatCount="indefinite"
                begin={`${delay}s`}
              />
              <animate
                attributeName="opacity"
                from="0.5"
                to="0"
                dur="6s"
                repeatCount="indefinite"
                begin={`${delay}s`}
              />
            </circle>
          ))}
        </svg>
      </div>

      {/* Grain texture — fades on scroll */}
      <div
        className="absolute inset-0 grain z-10 pointer-events-none transition-opacity duration-100"
        style={{ opacity: noiseOpacity * 0.6 }}
      />

      {/* Top vignette */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-green-900/80 to-transparent z-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 w-full max-w-3xl mx-auto px-8 text-center">
        <p className="font-sans text-[0.7rem] tracking-[0.25em] uppercase text-green-300/50 mb-6">
          London's quiet dining guide
        </p>

        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light italic text-green-100 leading-[1.1] mb-16 max-w-2xl mx-auto text-balance">
          Find restaurants where you can{" "}
          <span className="not-italic text-amber/90">actually talk.</span>
        </h1>

        {/* <p className="font-sans font-light text-green-300/60 text-base mb-10 max-w-md mx-auto">
          Rated by noise level, music volume, and time of day — so you never
          have to shout across the table again.
        </p> */}

        {/* Search bar */}
        <div className="flex items-stretch bg-ivory rounded overflow-hidden shadow-2xl max-w-lg mx-auto mb-8">
          <div className="flex items-center px-4 gap-3 flex-1">
            <Search size={16} className="text-muted shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Area, cuisine or restaurant..."
              className="w-full bg-transparent text-charcoal placeholder:text-muted/50 text-sm py-4 focus:outline-none font-sans"
            />
          </div>
          <button className="bg-green-600 hover:bg-green-500 text-white px-6 text-sm font-sans font-medium tracking-wide transition-colors">
            Search
          </button>
        </div>

        {/* Area chips */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {AREAS.map((area) => (
            <Link
              key={area}
              href={`/explore?area=${encodeURIComponent(area)}`}
              className="font-sans text-[0.72rem] tracking-wide px-4 py-1.5 rounded-full border border-green-300/20 text-green-300/50 hover:border-green-300/50 hover:text-green-300/80 transition-all duration-200"
            >
              {area}
            </Link>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden sm:flex flex-col items-center gap-2 opacity-30">
        <span className="font-sans text-[0.6rem] tracking-[0.2em] uppercase text-green-300">
          Scroll
        </span>
        <div className="w-px h-8 bg-green-300/50 animate-pulse" />
      </div>
    </section>
  );
}
