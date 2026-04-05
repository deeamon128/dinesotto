import { MapPin, BadgeCheck } from "lucide-react";
import Image from "next/image";

interface Props {
  photo?: string;
  name: string;
  cuisine: string;
  area: string;
  address: string;
  price: string;
  verified: boolean;
  overallScore: number;
  musicScore: number;
  crowdScore: number;
  spacingScore: number;
  bestTime: string;
  noise: string;
  bookingUrl?: string | null;
}

const NOISE_COLOURS: Record<string, string> = {
  "Library Quiet": "bg-green-100 text-green-700",
  "Pleasantly Quiet": "bg-green-50 text-green-600",
  Moderate: "bg-amber/10 text-amber",
  Loud: "bg-amber/30 text-amber-800",
  "Very Loud": "bg-red-100 text-red-700",
};

function toBarWidth(score: number): number {
  // Converts DB score (2-10) back to raw (1-5) then to percentage
  // Low score = quiet = short bar
  if (!score) return 0;
  return (6 - score / 2) * 20;
}

function toRawLabel(score: number): string {
  if (!score) return "0/5";
  const raw = Math.round(6 - score / 2);
  return `${raw}/5`;
}

export default function RestaurantHero({
  photo,
  name,
  cuisine,
  area,
  address,
  price,
  verified,
  overallScore,
  musicScore,
  crowdScore,
  spacingScore,
  bestTime,
  noise,
  bookingUrl,
}: Props) {
  return (
    <section className="relative bg-green-900 overflow-hidden">
      {/* Background photo */}
      {photo && (
        <div className="absolute inset-0 z-0">
          <Image
            src={photo}
            alt={name}
            fill
            className="object-cover opacity-15"
            priority
          />
          <div className="absolute inset-0 bg-green-900/85" />
        </div>
      )}
      {/* Amber glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-amber/10 blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 grain opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-8 pt-32 pb-16">
        {/* Top row */}
        <div className="flex items-start justify-between mb-6">
          <div>
            {/* Noise pill + verified */}
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`font-sans text-[0.62rem] tracking-[0.12em] uppercase px-3 py-1 rounded-full ${NOISE_COLOURS[noise] ?? "bg-green-50 text-green-600"}`}
              >
                {noise}
              </span>
              {verified && (
                <span className="flex items-center gap-1.5 font-sans text-[0.62rem] tracking-[0.1em] uppercase text-amber">
                  <BadgeCheck size={13} />
                  Verified
                </span>
              )}
            </div>

            {/* Name */}
            <h1 className="font-display text-5xl md:text-6xl font-light italic text-green-100 leading-[1.1] mb-3">
              {name}
            </h1>

            {/* Location */}
            <div className="flex items-center gap-2 text-green-300/50">
              <MapPin size={13} />
              <span className="font-sans text-sm font-light">
                {cuisine} · {area} · {price} · {address}
              </span>
            </div>
          </div>

          {/* Overall score */}
          <div className="text-center shrink-0 ml-8">
            <p className="font-display text-6xl font-light text-green-100 leading-none">
              {overallScore}
            </p>
            <p className="font-sans text-[0.6rem] tracking-[0.15em] uppercase text-green-300/40 mt-1">
              Overall
            </p>
          </div>
        </div>

        {/* Reserve CTA */}
        {bookingUrl && (
          <div className="mt-6 flex items-center gap-4">
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber hover:bg-amber/80 text-green-900 font-sans text-sm tracking-wide px-5 py-2.5 rounded transition-colors"
            >
              Reserve a table →
            </a>
            <a
              href="#rate"
              className="border border-green-300/30 hover:border-green-300/60 text-green-300/60 hover:text-green-100 font-sans text-sm tracking-wide px-5 py-2.5 rounded transition-all"
            >
              Rate your visit
            </a>
          </div>
        )}

        {/* Score bars */}
        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-green-800">
          {[
            { label: "Music Level", score: musicScore },
            { label: "Crowd Noise", score: crowdScore },
            { label: "Table Spacing", score: spacingScore },
          ].map(({ label, score }) => (
            <div key={label}>
              <div className="flex items-center justify-between mb-2">
                <p className="font-sans text-[0.62rem] tracking-[0.12em] uppercase text-green-300/40">
                  {label}
                </p>
                <p className="font-sans text-[0.62rem] text-green-300/40">
                  {toRawLabel(score)}
                </p>
              </div>
              <div className="h-1 bg-green-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber rounded-full transition-all duration-700"
                  style={{ width: `${toBarWidth(score)}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Best time */}
        <div className="mt-6">
          <p className="font-sans text-[0.6rem] tracking-[0.15em] uppercase text-green-300/30 mb-1">
            Best time to visit
          </p>
          <p className="font-display italic text-amber text-lg">{bestTime}</p>
        </div>
      </div>
    </section>
  );
}
