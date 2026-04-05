"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import IllustrativePhotoIcon from "@/components/ui/IllustrativePhotoIcon";
import { MappedRestaurant } from "@/lib/supabase/mappers";

interface Props {
  restaurant: MappedRestaurant;
  selected?: boolean;
  asDiv?: boolean;
}

const NOISE_COLOURS: Record<string, string> = {
  "Library Quiet": "bg-green-100 text-green-700",
  "Pleasantly Quiet": "bg-green-50 text-green-600",
  Moderate: "bg-amber/10 text-amber",
  Loud: "bg-amber/30 text-amber-800",
  "Very Loud": "bg-red-100 text-red-700",
};

interface Props {
  selected?: boolean;
  asDiv?: boolean;
}

export default function RestaurantCard({ restaurant, selected, asDiv }: Props) {
  const className = `group bg-ivory rounded border transition-all duration-200 cursor-pointer overflow-hidden flex flex-col shrink-0 ${
    selected
      ? "border-amber shadow-md"
      : "border-warm-border hover:border-green-300 hover:shadow-sm"
  }`;

  const content = (
    <>
      {/* Photo */}
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

      {/* Accent bar */}
      <div
        className={`h-0.5 w-full shrink-0 transition-colors duration-200 ${
          selected ? "bg-amber" : "bg-green-600 group-hover:bg-amber"
        }`}
      />

      {/* Card body */}
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
        <h3
          className={`font-display text-base font-medium leading-snug transition-colors ${
            selected
              ? "text-green-600"
              : "text-green-800 group-hover:text-green-600"
          }`}
        >
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
        {/* Footer */}
        <div className="mt-auto pt-3 border-t border-warm-border flex items-center justify-between">
          <p className="font-sans text-[0.52rem] tracking-wide uppercase italic text-amber">
            {restaurant.ratings > 0
              ? `${restaurant.ratings} ratings`
              : "Be the first to rate"}
          </p>
          <div className="flex items-center gap-3">
            {restaurant.bookingUrl && (
              <a
                href={restaurant.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="font-sans text-[0.62rem] tracking-wide uppercase text-amber hover:text-amber/70 transition-colors flex items-center gap-1"
              >
                Reserve <ArrowRight size={11} />
              </a>
            )}
            <span className="font-sans text-[0.62rem] tracking-wide uppercase text-green-600 group-hover:text-green-400 transition-colors flex items-center gap-1">
              View <ArrowRight size={11} />
            </span>
          </div>
        </div>
      </div>
    </>
  );

  if (asDiv) return <div className={className}>{content}</div>;

  return (
    <Link href={`/restaurant/${restaurant.slug}`} className={className}>
      {content}
    </Link>
  );
}
