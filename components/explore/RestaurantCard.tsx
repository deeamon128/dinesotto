import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

interface Restaurant {
  name: string;
  slug: string;
  cuisine: string;
  area: string;
  price: string;
  score: number;
  noise: string;
  tags: string[];
  bestTime: string;
  ratings: number;
  verified: boolean;
  photo?: string | null;
}

const NOISE_COLOURS: Record<string, string> = {
  "Library Quiet": "bg-green-100 text-green-700",
  "Pleasantly Quiet": "bg-green-50 text-green-600",
  Moderate: "bg-amber/10 text-amber",
};

interface Props {
  restaurant: Restaurant;
  selected?: boolean;
}

export default function RestaurantCard({ restaurant, selected }: Props) {
  return (
    <Link
      href={`/restaurant/${restaurant.slug}`}
      className={`group bg-ivory rounded border transition-all duration-200 cursor-pointer overflow-hidden flex flex-col shrink-0 ${selected ? "border-amber shadow-md" : "border-warm-border hover:border-green-300 hover:shadow-sm"}`}
    >
      {/* Photo */}
      {restaurant.photo && (
        <div className="relative h-28 w-full overflow-hidden shrink-0">
          <Image
            src={restaurant.photo}
            alt={restaurant.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="400px"
          />
          <div className="absolute inset-0 bg-green-900/10" />
        </div>
      )}

      {/* Accent bar */}
      <div
        className={`h-0.5 w-full shrink-0 transition-colors duration-200 ${selected ? "bg-amber" : "bg-green-600 group-hover:bg-amber"}`}
      />

      <div className="p-4 flex flex-col" style={{ height: "176px" }}>
        {/* Top row */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <span
              className={`font-sans text-[0.55rem] tracking-[0.1em] uppercase px-2 py-0.5 rounded-full mb-1 inline-block ${NOISE_COLOURS[restaurant.noise] ?? "bg-green-50 text-green-600"}`}
            >
              {restaurant.noise}
            </span>
            <h3
              className={`font-display text-base font-medium leading-tight truncate transition-colors ${selected ? "text-green-600" : "text-green-800 group-hover:text-green-600"}`}
            >
              {restaurant.name}
            </h3>
          </div>
          <div className="text-right ml-3 shrink-0">
            <p className="font-display text-xl font-light text-green-600 leading-none">
              {restaurant.score}
            </p>
            <p className="font-sans text-[0.52rem] tracking-wide uppercase text-muted/50 mt-0.5">
              {restaurant.ratings} ratings
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-muted/60 mb-2">
          <MapPin size={10} className="shrink-0" />
          <span className="font-sans text-[0.68rem] truncate">
            {restaurant.cuisine} · {restaurant.area} · {restaurant.price}
          </span>
        </div>

        {/* Tags */}
        <div className="flex gap-1.5">
          {restaurant.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="font-sans text-[0.55rem] tracking-wide px-2 py-0.5 rounded border border-warm-border text-muted/70 truncate max-w-[130px]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom row */}
        <div className="mt-auto flex items-center justify-between pt-2 border-t border-warm-border">
          <p className="font-display text-xs italic text-amber truncate max-w-[160px]">
            {restaurant.bestTime}
          </p>
          <span className="font-sans text-[0.62rem] tracking-wide uppercase text-green-600 group-hover:text-green-400 transition-colors flex items-center gap-1">
            View <ArrowRight size={11} />
          </span>
        </div>
      </div>
    </Link>
  );
}
