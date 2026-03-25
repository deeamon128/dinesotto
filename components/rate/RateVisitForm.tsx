"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { MappedRestaurant } from "@/lib/supabase/mappers";

const TIME_SLOTS = [
  "Breakfast",
  "Lunch",
  "Afternoon",
  "Early Evening",
  "Peak Evening",
  "Late",
];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const NOISE_SOURCES = [
  "Hard Floors",
  "Open Kitchen",
  "Loud Music",
  "Packed Tables",
  "Echoing Space",
  "Street Noise",
];

const TIME_SLOT_MAP: Record<string, string> = {
  Breakfast: "breakfast",
  Lunch: "lunch",
  Afternoon: "afternoon",
  "Early Evening": "early_evening",
  "Peak Evening": "peak_evening",
  Late: "late",
};

const DAY_MAP: Record<string, string> = {
  Mon: "mon",
  Tue: "tue",
  Wed: "wed",
  Thu: "thu",
  Fri: "fri",
  Sat: "sat",
  Sun: "sun",
};

function ScaleInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  const LABELS = ["Silent", "Soft", "Noticeable", "Loud", "Very Loud"];
  return (
    <div>
      <p className="font-sans text-[0.65rem] tracking-[0.12em] uppercase text-muted/60 mb-3">
        {label}
      </p>
      <div className="flex gap-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <button
            key={i}
            type="button"
            onClick={() => onChange(i)}
            className={`
              flex-1 flex flex-col items-center gap-2 py-3 rounded border
              transition-all duration-200
              ${
                value === i
                  ? "border-amber bg-amber/10 text-amber"
                  : "border-warm-border text-muted/40 hover:border-green-300"
              }
            `}
          >
            <span className="font-display text-lg font-light">{i}</span>
            <span className="font-sans text-[0.52rem] tracking-wide text-center leading-tight">
              {LABELS[i - 1]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

interface Props {
  restaurants: MappedRestaurant[];
}

export default function RateVisitForm({ restaurants }: Props) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<MappedRestaurant | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [timeSlot, setTimeSlot] = useState("");
  const [day, setDay] = useState("");
  const [musicScore, setMusicScore] = useState(0);
  const [crowdScore, setCrowdScore] = useState(0);
  const [spacingScore, setSpacingScore] = useState(0);
  const [sources, setSources] = useState<string[]>([]);
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filtered = restaurants.filter((r) => {
    if (search.length === 0) return false;
    const q = search.toLowerCase();
    return r.name.toLowerCase().startsWith(q);
    // r.area.toLowerCase().startsWith(q)  // startsWith instead of includes for area
  });

  function selectRestaurant(r: MappedRestaurant) {
    setSelected(r);
    setSearch(r.name);
    setShowResults(false);
  }

  function toggleSource(s: string) {
    setSources((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!selected) return setError("Please select a restaurant.");
    if (!timeSlot) return setError("Please select a time slot.");
    if (!day) return setError("Please select a day.");
    if (!musicScore) return setError("Please rate the music level.");
    if (!crowdScore) return setError("Please rate the crowd noise.");
    if (!spacingScore) return setError("Please rate the table spacing.");

    setLoading(true);

    const supabase = createClient();

    const { error: insertError } = await supabase.from("ratings").insert({
      restaurant_id: selected.id,
      time_slot: TIME_SLOT_MAP[timeSlot],
      day_of_week: DAY_MAP[day],
      music_score: musicScore,
      crowd_score: crowdScore,
      spacing_score: spacingScore,
      noise_sources: sources.length > 0 ? sources : null,
      review_text: review || null,
      status: "pending",
    });

    setLoading(false);

    if (insertError) {
      console.error(insertError);
      setError("Something went wrong. Please try again.");
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="text-center py-16">
        <p className="font-display text-4xl italic text-green-700 mb-4">
          Thank you.
        </p>
        <p className="font-sans font-light text-muted text-sm max-w-sm mx-auto">
          Your rating has been submitted and will appear once verified.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {error && (
        <div className="bg-amber/10 border border-amber/30 rounded px-4 py-3">
          <p className="font-sans text-sm text-amber">{error}</p>
        </div>
      )}

      {/* Restaurant search */}
      <div className="flex flex-col gap-1.5">
        <label className="font-sans text-[0.65rem] tracking-[0.12em] uppercase text-muted/60">
          Which restaurant did you visit? *
        </label>
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelected(null);
              setShowResults(true);
            }}
            onFocus={() => setShowResults(true)}
            placeholder="Search by name or area..."
            className="w-full bg-ivory border border-warm-border rounded px-4 py-3 font-sans text-sm text-charcoal placeholder:text-muted/40 focus:outline-none focus:border-green-400 transition-colors"
          />

          {/* Search results */}
          {showResults && filtered.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-ivory border border-warm-border rounded shadow-lg py-1 z-50">
              {filtered.map((r) => (
                <button
                  key={r.slug}
                  type="button"
                  onClick={() => selectRestaurant(r)}
                  className="w-full text-left px-4 py-3 hover:bg-ivory-dark transition-colors border-b border-warm-border last:border-0"
                >
                  <p className="font-display text-sm font-medium text-green-800">
                    {r.name}
                  </p>
                  <p className="font-sans text-xs text-muted/60">
                    {r.cuisine} · {r.area}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>

        {selected && (
          <p className="font-sans text-xs text-green-600 mt-1">
            ✓ {selected.name}, {selected.area}
          </p>
        )}
      </div>

      {/* Only show rest of form once restaurant is selected */}
      {selected && (
        <>
          {/* Time slot */}
          <div>
            <p className="font-sans text-[0.65rem] tracking-[0.12em] uppercase text-muted/60 mb-3">
              When did you visit?
            </p>
            <div className="flex flex-wrap gap-2">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setTimeSlot(slot)}
                  className={`
                    font-sans text-[0.72rem] tracking-wide px-4 py-2 rounded border
                    transition-all duration-200
                    ${
                      timeSlot === slot
                        ? "bg-green-600 text-white border-green-600"
                        : "bg-ivory border-warm-border text-muted hover:border-green-400"
                    }
                  `}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Day */}
          <div>
            <p className="font-sans text-[0.65rem] tracking-[0.12em] uppercase text-muted/60 mb-3">
              Day of the week
            </p>
            <div className="flex flex-wrap gap-2">
              {DAYS.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDay(d)}
                  className={`
                    font-sans text-[0.72rem] tracking-wide px-4 py-2 rounded border
                    transition-all duration-200
                    ${
                      day === d
                        ? "bg-green-600 text-white border-green-600"
                        : "bg-ivory border-warm-border text-muted hover:border-green-400"
                    }
                  `}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <ScaleInput
            label="Music Level"
            value={musicScore}
            onChange={setMusicScore}
          />
          <ScaleInput
            label="Crowd Noise"
            value={crowdScore}
            onChange={setCrowdScore}
          />
          <ScaleInput
            label="Table Spacing"
            value={spacingScore}
            onChange={setSpacingScore}
          />

          {/* Noise sources */}
          <div>
            <p className="font-sans text-[0.65rem] tracking-[0.12em] uppercase text-muted/60 mb-3">
              What made it noisy? (optional)
            </p>
            <div className="flex flex-wrap gap-2">
              {NOISE_SOURCES.map((source) => (
                <button
                  key={source}
                  type="button"
                  onClick={() => toggleSource(source)}
                  className={`
                    font-sans text-[0.72rem] tracking-wide px-4 py-2 rounded border
                    transition-all duration-200
                    ${
                      sources.includes(source)
                        ? "bg-green-600 text-white border-green-600"
                        : "bg-ivory border-warm-border text-muted hover:border-green-400"
                    }
                  `}
                >
                  {source}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-sans text-[0.65rem] tracking-[0.12em] uppercase text-muted/60">
              Anything else? (optional)
            </label>
            <textarea
              rows={4}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Anything a future visitor should know..."
              className="w-full bg-ivory border border-warm-border rounded px-4 py-3 font-sans text-sm text-charcoal placeholder:text-muted/40 focus:outline-none focus:border-green-400 transition-colors resize-none font-light italic"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`
              text-white font-display italic text-lg px-6 py-4 rounded transition-colors
              ${
                loading
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-500"
              }
            `}
          >
            {loading ? "Submitting..." : "Add My Rating"}
          </button>

          <p className="font-sans text-[0.65rem] text-muted/40 text-center">
            Your rating is anonymous and helps real people make better choices.
          </p>
        </>
      )}
    </form>
  );
}
