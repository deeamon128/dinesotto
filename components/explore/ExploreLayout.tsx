"use client";

import { useState, useRef, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import GoogleMap from "./GoogleMap";
import { Search } from "lucide-react";
import { MappedRestaurant } from "@/lib/supabase/mappers";

interface Props {
  restaurants: MappedRestaurant[];
  view: "cards" | "map";
  initialSearch?: string;
}

export default function ExploreLayout({
  restaurants,
  view,
  initialSearch = "",
}: Props) {
  const [search, setSearch] = useState(initialSearch);
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (!selectedSlug) return;
    const el = cardRefs.current[selectedSlug];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selectedSlug]);

  const filtered = restaurants.filter((r) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      r.name.toLowerCase().includes(q) ||
      r.area.toLowerCase().includes(q) ||
      r.cuisine.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      {/* ── CARDS VIEW ── */}
      {view === "cards" && (
        <div className="px-8 py-8">
          <div className="max-w-lg mb-8">
            <div className="flex items-center gap-3 bg-ivory border border-warm-border rounded px-4 py-3">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((restaurant) => (
              <RestaurantCard key={restaurant.slug} restaurant={restaurant} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-24">
              <p className="font-display text-2xl italic text-muted/40 mb-2">
                No restaurants found
              </p>
              <p className="font-sans text-sm text-muted/30">
                Try a different search or filter
              </p>
            </div>
          )}
        </div>
      )}

      {/* ── MAP VIEW ── */}
      {view === "map" && (
        <div className="flex h-[calc(100vh-8rem)] overflow-hidden min-h-0">
          <div className="w-full md:w-[380px] md:min-w-[380px] shrink-0 flex flex-col border-r border-warm-border bg-ivory-dark min-h-0">
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

            <div className="flex-1 overflow-y-auto no-scrollbar p-4 flex flex-col gap-3 min-h-0">
              {filtered.map((restaurant) => (
                <div
                  key={restaurant.slug}
                  ref={(el) => {
                    cardRefs.current[restaurant.slug] = el;
                  }}
                  onMouseEnter={() => setHoveredSlug(restaurant.slug)}
                  onMouseLeave={() => setHoveredSlug(null)}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedSlug(
                      selectedSlug === restaurant.slug ? null : restaurant.slug,
                    );
                  }}
                  className="cursor-pointer"
                >
                  <RestaurantCard
                    restaurant={restaurant}
                    selected={selectedSlug === restaurant.slug}
                    asDiv={true}
                  />
                </div>
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

          <div className="hidden md:block flex-1 relative">
            <GoogleMap
              restaurants={filtered}
              hoveredSlug={hoveredSlug}
              selectedSlug={selectedSlug}
              onSelectSlug={setSelectedSlug}
            />
          </div>
        </div>
      )}
    </div>
  );
}
