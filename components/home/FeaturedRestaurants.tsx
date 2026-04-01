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
};

function RestaurantCard({ restaurant }: { restaurant: MappedRestaurant }) {
  return (
    <Link
      href={`/restaurant/${restaurant.slug}`}
      className="group bg-ivory rounded border border-warm-border hover:border-green-300 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
    >
      {restaurant.photo && (
        <div className="relative h-40 w-full overflow-hidden shrink-0">
          <Image
            src={restaurant.photo}
            alt={restaurant.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="400px"
          />
          <div className="absolute inset-0 bg-green-900/10" />

          {/* Illustrative photo badge */}
          <IllustrativePhotoIcon />
        </div>
      )}

      <div className="h-0.5 w-full bg-green-600 group-hover:bg-amber transition-colors duration-300" />

      <div className="p-6 flex flex-col flex-1">
        {/* Top row — noise + verified + score */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`
                font-sans text-[0.6rem] tracking-[0.12em]
                uppercase px-2.5 py-1 rounded-full
                ${NOISE_COLOURS[restaurant.noise] ?? "bg-green-50 text-green-600"}
              `}
            >
              {restaurant.noise}
            </span>
            {restaurant.verified && (
              <span className="font-sans text-[0.6rem] tracking-[0.12em] uppercase px-2.5 py-1 rounded-full bg-green-700 text-green-100">
                ✓ Verified
              </span>
            )}
          </div>
          <div className="text-right shrink-0 ml-3">
            <p className="font-display text-2xl font-light text-green-600 leading-none">
              {restaurant.score}
            </p>
            <p className="font-sans text-[0.52rem] tracking-wide uppercase text-muted/50 mt-0.5">
              {restaurant.ratings} ratings
            </p>
          </div>
        </div>

        <h3 className="font-display text-xl font-medium text-green-800 group-hover:text-green-600 transition-colors mb-1">
          {restaurant.name}
        </h3>
        <div className="flex items-center gap-1.5 text-muted mb-4">
          <MapPin size={11} />
          <span className="font-sans text-xs">
            {restaurant.cuisine} · {restaurant.area} · {restaurant.price}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {restaurant.tags.map((tag) => (
            <span
              key={tag}
              className="font-sans text-[0.6rem] tracking-wide px-2 py-0.5 rounded border border-warm-border text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom row — best time + CTA */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-warm-border">
          <div>
            <p className="font-sans text-[0.58rem] tracking-[0.12em] uppercase text-muted/60 mb-0.5">
              Best time
            </p>
            <p className="font-display text-sm italic text-amber">
              {restaurant.bestTime}
            </p>
          </div>
          <span className="font-sans text-[0.62rem] tracking-wide uppercase text-green-600 group-hover:text-green-400 transition-colors flex items-center gap-1">
            View <ArrowRight size={11} />
          </span>
        </div>
      </div>
    </Link>
  );
}

interface Props {
  restaurants: MappedRestaurant[];
  topRated: MappedRestaurant[];
}

export default function FeaturedRestaurants({ restaurants, topRated }: Props) {
  return (
    <section className="bg-ivory-dark py-24 px-8">
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
