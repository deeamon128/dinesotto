"use client";

import { useState } from "react";
import RestaurantCard from "./RestaurantCard";
import MapPlaceholder from "./MapPlaceholder";
import { Search } from "lucide-react";
import { RESTAURANTS } from "@/lib/data/restaurants";

export default function ExploreLayout() {
  const [search, setSearch] = useState("");

  const filtered = RESTAURANTS.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.area.toLowerCase().includes(search.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex h-[calc(100vh-8rem)] overflow-hidden min-h-0">
      {/* Left — cards */}
      <div className="w-[400px] min-w-[400px] shrink-0 flex flex-col border-r border-warm-border bg-ivory-dark min-h-0">
        {/* Search */}
        <div className="p-4 border-b border-warm-border">
          <div className="flex items-center gap-3 bg-ivory border border-warm-border rounded px-3 py-2.5">
            <Search size={14} className="text-muted/50 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search restaurants, areas..."
              className="bg-transparent font-sans text-sm text-charcoal placeholder:text-muted/40 focus:outline-none w-full"
            />
          </div>
          <p className="font-sans text-[0.62rem] text-muted/50 mt-2 px-1">
            {filtered.length} restaurants
          </p>
        </div>

        {/* Cards list */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 flex flex-col gap-3 min-h-0">
          {filtered.map((restaurant) => (
            <RestaurantCard key={restaurant.slug} restaurant={restaurant} />
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="font-display text-xl italic text-muted/40 mb-2">
                No results found
              </p>
              <p className="font-sans text-xs text-muted/30">
                Try a different area or cuisine
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Right — map */}
      <div className="flex-1 relative">
        <MapPlaceholder />
      </div>
    </div>
  );
}
