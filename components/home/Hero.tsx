"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search } from "lucide-react";
import { MappedRestaurant } from "@/lib/supabase/mappers";

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

interface Props {
  restaurants: MappedRestaurant[];
}

export default function Hero({ restaurants }: Props) {
  const [search, setSearch] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const noiseOpacity = Math.max(0, 1 - scrollY / 400);

  const suggestions =
    search.length > 0
      ? restaurants
          .filter((r) => {
            const q = search.toLowerCase();
            return (
              r.name.toLowerCase().includes(q) ||
              r.area.toLowerCase().includes(q) ||
              r.cuisine.toLowerCase().includes(q)
            );
          })
          .slice(0, 5)
      : [];

  function handleSearch() {
    if (!search.trim()) return;
    setShowDropdown(false);
    router.push(`/explore?search=${encodeURIComponent(search.trim())}`);
  }

  function handleSelect(restaurant: MappedRestaurant) {
    setShowDropdown(false);
    router.push(`/restaurant/${restaurant.slug}`);
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-green-900">
      {/* Amber glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-amber/20 blur-[120px] z-0 pointer-events-none" />

      {/* Ripple rings */}
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

      {/* Grain */}
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

        {/* Search bar */}
        <div ref={wrapperRef} className="relative max-w-lg mx-auto mb-8">
          <div className="flex items-stretch bg-ivory rounded overflow-hidden shadow-2xl">
            <div className="flex items-center px-4 gap-3 flex-1">
              <Search size={16} className="text-muted shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowDropdown(true);
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                onFocus={() => search.length > 0 && setShowDropdown(true)}
                placeholder="Area, cuisine or restaurant..."
                className="w-full bg-transparent text-charcoal placeholder:text-muted/50 text-sm py-4 focus:outline-none font-sans"
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-green-600 hover:bg-green-500 text-white px-6 text-sm font-sans font-medium tracking-wide transition-colors"
            >
              Search
            </button>
          </div>

          {/* Dropdown */}
          {showDropdown && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-ivory border border-warm-border rounded shadow-xl py-1 z-50">
              {suggestions.map((r) => (
                <button
                  key={r.slug}
                  onClick={() => handleSelect(r)}
                  className="w-full text-left px-4 py-3 hover:bg-ivory-dark transition-colors border-b border-warm-border last:border-0 flex items-center justify-between"
                >
                  <div>
                    <p className="font-display text-sm font-medium text-green-800">
                      {r.name}
                    </p>
                    <p className="font-sans text-xs text-muted/60">
                      {r.cuisine} · {r.area}
                    </p>
                  </div>
                  <span
                    className={`font-sans text-[0.55rem] tracking-[0.1em] uppercase px-2 py-0.5 rounded-full ${
                      r.noise === "Library Quiet"
                        ? "bg-green-100 text-green-700"
                        : r.noise === "Pleasantly Quiet"
                          ? "bg-green-50 text-green-600"
                          : "bg-amber/10 text-amber"
                    }`}
                  >
                    {r.noise}
                  </span>
                </button>
              ))}
              {search.length > 0 && (
                <button
                  onClick={handleSearch}
                  className="w-full text-left px-4 py-3 font-sans text-xs text-muted/50 hover:text-green-600 hover:bg-ivory-dark transition-colors"
                >
                  Search all results for "{search}" →
                </button>
              )}
            </div>
          )}
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
