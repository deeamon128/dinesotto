import Link from "next/link";
import { MapPin, Bookmark } from "lucide-react";

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
}

const NOISE_COLOURS: Record<string, string> = {
  "Library Quiet": "bg-green-100 text-green-700",
  "Pleasantly Quiet": "bg-green-50 text-green-600",
  Moderate: "bg-amber/10 text-amber",
};

interface Props {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: Props) {
  return (
    <Link
      href={`/restaurant/${restaurant.slug}`}
      className="group bg-ivory rounded border border-warm-border hover:border-green-300 hover:shadow-sm transition-all duration-200 cursor-pointer overflow-hidden flex flex-col h-[180px] shrink-0"
    >
      {/* Accent bar */}
      <div className="h-0.5 w-full shrink-0 bg-green-600 group-hover:bg-amber transition-colors duration-200" />

      <div
        className="p-4 flex flex-col overflow-hidden"
        style={{ height: "calc(180px - 2px)" }}
      >
        {/* Top row */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <span
              className={`
                font-sans text-[0.55rem] tracking-[0.1em] uppercase
                px-2 py-0.5 rounded-full mb-1 inline-block
                ${NOISE_COLOURS[restaurant.noise] ?? "bg-green-50 text-green-600"}
              `}
            >
              {restaurant.noise}
            </span>
            <h3 className="font-display text-base font-medium text-green-800 group-hover:text-green-600 transition-colors leading-tight truncate">
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
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="text-muted/30 hover:text-green-600 transition-colors"
            >
              <Bookmark size={13} />
            </button>
            <span className="font-sans text-[0.62rem] tracking-wide uppercase text-green-600 group-hover:text-green-400 transition-colors">
              View →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
