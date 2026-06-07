"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowRight } from "lucide-react";
import { MappedRestaurant } from "@/lib/supabase/mappers";
import IllustrativePhotoIcon from "@/components/ui/IllustrativePhotoIcon";
import { trackEvent } from "@/lib/analytics";

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
  return (
    <div className="relative group bg-ivory rounded border border-warm-border hover:border-green-300 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col cursor-pointer">
      <Link
        href={`/restaurant/${restaurant.slug}`}
        onClick={() =>
          trackEvent("restaurant_card_click", { restaurant: restaurant.name })
        }
        className="absolute inset-0 z-10"
        aria-label={`View ${restaurant.name}`}
      />

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

      <div className="relative z-0 pointer-events-none p-4 flex flex-col gap-3 flex-1">
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
              {restaurant.score > 0 ? restaurant.score : "—"}
            </p>
          </div>
        </div>

        <h3 className="font-display text-base font-medium leading-snug text-green-800 group-hover:text-green-600 transition-colors">
          {restaurant.name}
        </h3>

        <div className="flex items-center gap-1.5 text-muted/60">
          <MapPin size={10} className="shrink-0" />
          <span className="font-sans text-[0.68rem] truncate">
            {restaurant.cuisine} · {restaurant.area} · {restaurant.price}
          </span>
        </div>

        {restaurant.occasions && restaurant.occasions.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {restaurant.occasions.slice(0, 3).map((occasion) => (
              <span
                key={occasion}
                className="font-sans text-[0.55rem] tracking-wide px-2 py-0.5 rounded border border-warm-border text-muted/70"
              >
                {occasion}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-3 border-t border-warm-border flex items-center justify-end w-full">
          <span className="font-sans text-[0.62rem] tracking-wide uppercase text-green-600 group-hover:text-green-400 transition-colors flex items-center gap-1">
            View <ArrowRight size={11} />
          </span>
        </div>
      </div>

      {restaurant.bookingUrl && (
        <div className="absolute bottom-3 left-4 z-20">
          <a
            href={restaurant.bookingUrl}
            onClick={() =>
              trackEvent("reserve_table_click", { restaurant: restaurant.name })
            }
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[0.62rem] tracking-wide uppercase text-amber hover:text-amber/70 transition-colors flex items-center gap-1"
          >
            Reserve a table <ArrowRight size={11} />
          </a>
        </div>
      )}
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
        <div className="mb-12">
          <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-amber mb-3">
            Handpicked
          </p>
          <h2 className="font-display text-4xl font-light italic text-green-700">
            Places we love
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {restaurants.map((r) => (
            <RestaurantCard key={r.slug} restaurant={r} />
          ))}
        </div>

        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-amber mb-3">
              New to DineSotto
            </p>
            <h2 className="font-display text-4xl font-light italic text-green-700">
              Recently added
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
