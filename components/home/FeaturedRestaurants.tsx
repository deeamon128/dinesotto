"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowRight } from "lucide-react";
import { MappedRestaurant } from "@/lib/supabase/mappers";
import IllustrativePhotoIcon from "@/components/ui/IllustrativePhotoIcon";

const NOISE_COLOURS: Record<string, string> = {
  "Library Quiet": "bg-green-100 text-green-700",
  "Pleasantly Quiet": "bg-green-50 text-green-600",
  Moderate: "bg-amber/10 text-amber",
  Loud: "bg-amber/30 text-amber-800",
  "Very Loud": "bg-red-100 text-red-700",
  "Be the first to rate":
    "bg-ivory border border-warm-border text-muted/60 italic",
};

function RestaurantCard({ restaurant }: { restaurant: MappedRestaurant }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/restaurant/${restaurant.slug}`)}
      className="group bg-ivory rounded border border-warm-border hover:border-green-300 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
    >
      {restaurant.photo && (
        <div className="relative h-32 w-full overflow-hidden shrink-0">
          <Image
            src={restaurant.photo}
            alt={restaurant.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="400px"
          />
          <div className="absolute inset-0 bg-green-900/10" />
          <IllustrativePhotoIcon />
        </div>
      )}

      <div className="h-0.5 w-full bg-green-600 group-hover:bg-amber transition-colors duration-300" />

      <div className="p-4 flex flex-col gap-3 flex-1">
        {/* Badges + score */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`font-sans text-[0.55rem] tracking-[0.1em] uppercase px-2 py-0.5 rounded-full ${
                NOISE_COLOURS[restaurant.noise] ?? "bg-green-50 text-green-600"
              }`}
            >
              {restaurant.noise}
            </span>
            {restaurant.verified && (
              <span className="font-sans text-[0.55rem] tracking-[0.1em] uppercase px-2 py-0.5 rounded-full border border-green-600/40 text-green-600">
                ✦ Sotto Visit
              </span>
            )}
          </div>
          <div className="text-right shrink-0">
            <p className="font-display text-xl font-light text-green-600 leading-none">
              {restaurant.score ?? 0}
            </p>
          </div>
        </div>

        {/* Name */}
        <h3 className="font-display text-base font-medium leading-snug text-green-800 group-hover:text-green-600 transition-colors">
          {restaurant.name}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-muted/60">
          <MapPin size={10} className="shrink-0" />
          <span className="font-sans text-[0.68rem] truncate">
            {restaurant.cuisine} · {restaurant.area} · {restaurant.price}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {restaurant.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="font-sans text-[0.55rem] tracking-wide px-2 py-0.5 rounded border border-warm-border text-muted/70"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto pt-3 border-t border-warm-border flex items-center justify-between w-full">
          {restaurant.bookingUrl ? (
            <a
              href={restaurant.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="font-sans text-[0.62rem] tracking-wide uppercase text-amber hover:text-amber/70 transition-colors flex items-center gap-1"
            >
              Reserve a table <ArrowRight size={11} />
            </a>
          ) : (
            <span />
          )}
          <span className="font-sans text-[0.62rem] tracking-wide uppercase text-green-600 group-hover:text-green-400 transition-colors flex items-center gap-1">
            View <ArrowRight size={11} />
          </span>
        </div>
      </div>
    </div>
  );
}

interface Props {
  restaurants: MappedRestaurant[];
  topRated: MappedRestaurant[];
}

export default function FeaturedRestaurants({ restaurants, topRated }: Props) {
  return (
    <section id="featured" className="bg-ivory-dark py-24 px-8">
      <div className="max-w-5xl mx-auto">
        {/* Row 1 — Handpicked */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-amber mb-3">
              Handpicked
            </p>
            <h2 className="font-display text-4xl font-light italic text-green-700">
              Places we love
            </h2>
          </div>
          <Link
            href="/explore"
            className="font-sans text-[0.75rem] tracking-wide uppercase text-muted hover:text-green-600 transition-colors border-b border-warm-border hover:border-green-600 pb-0.5"
          >
            View all restaurants →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {restaurants.map((r) => (
            <RestaurantCard key={r.slug} restaurant={r} />
          ))}
        </div>

        {/* Row 2 — Highest Rated */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-amber mb-3">
              Community Favourites
            </p>
            <h2 className="font-display text-4xl font-light italic text-green-700">
              Highest rated
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topRated.map((r) => (
            <RestaurantCard key={r.slug} restaurant={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
