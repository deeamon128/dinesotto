"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const CUISINES = [
  "British",
  "Italian",
  "French",
  "Japanese",
  "Indian",
  "Mediterranean",
  "Chinese",
  "European",
  "Middle Eastern",
  "Other",
];

const OCCASIONS = [
  "Date Night",
  "Business Lunch",
  "Solo Dining",
  "Family",
  "Celebration",
  "Friends",
];

const TIME_SLOTS = [
  "Breakfast",
  "Lunch",
  "Afternoon",
  "Early Evening",
  "Peak Evening",
  "Late",
];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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
  labels = ["Silent", "Soft", "Noticeable", "Loud", "Very Loud"],
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  labels?: string[];
}) {
  return (
    <div>
      <p className="font-sans text-[0.65rem] tracking-[0.12em] uppercase text-muted/60 mb-3">
        {label}
      </p>
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <button
            key={i}
            type="button"
            onClick={() => onChange(i)}
            className={`flex-1 flex flex-col cursor-pointer items-center gap-1 py-2 md:py-3 rounded border transition-all duration-200 ${
              value === i
                ? "border-amber bg-amber/10 text-amber"
                : "border-warm-border text-muted/40 hover:border-green-300"
            }`}
          >
            <span className="font-display text-lg font-light">{i}</span>
            <span className="font-sans text-[0.52rem] tracking-wide text-center leading-tight">
              {labels[i - 1]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function SuggestForm() {
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [occasion, setOccasion] = useState("");
  const [notes, setNotes] = useState("");
  const [visited, setVisited] = useState(false);
  const [timeSlot, setTimeSlot] = useState("");
  const [day, setDay] = useState("");
  const [musicScore, setMusicScore] = useState(0);
  const [crowdScore, setCrowdScore] = useState(0);
  const [spacingScore, setSpacingScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim()) return setError("Please enter the restaurant name.");
    if (!area.trim()) return setError("Please enter the area.");
    if (visited) {
      if (!timeSlot) return setError("Please select when you visited.");
      if (!day) return setError("Please select the day.");
      if (!musicScore) return setError("Please rate the music level.");
      if (!crowdScore) return setError("Please rate the crowd noise.");
      if (!spacingScore) return setError("Please rate the table spacing.");
    }

    setLoading(true);

    const supabase = createClient();

    const { error: insertError } = await supabase.from("suggestions").insert({
      name: name.trim(),
      area: area.trim(),
      address: address.trim() || null,
      cuisine: cuisine || null,
      occasion: occasion || null,
      notes: notes.trim() || null,
      status: "pending",
      visited,
      time_slot: visited ? TIME_SLOT_MAP[timeSlot] : null,
      day_of_week: visited ? DAY_MAP[day] : null,
      music_score: visited ? musicScore : null,
      crowd_score: visited ? crowdScore : null,
      spacing_score: visited ? spacingScore : null,
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
          {visited
            ? "We'll review your suggestion and add it to DineSotto. Your visit rating will be the first one on the listing."
            : "We'll review your suggestion and add it to DineSotto if it meets our quiet dining criteria."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {error && (
        <div className="bg-amber/10 border border-amber/30 rounded px-4 py-3">
          <p className="font-sans text-sm text-amber">{error}</p>
        </div>
      )}

      {/* Restaurant name */}
      <div className="flex flex-col gap-1.5">
        <label className="font-sans text-[0.65rem] tracking-[0.12em] uppercase text-muted/60">
          Restaurant Name *
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. The Ledbury"
          className="bg-ivory border border-warm-border rounded px-4 py-3 font-sans text-sm text-charcoal placeholder:text-muted/40 focus:outline-none focus:border-green-400 transition-colors"
        />
      </div>

      {/* Area */}
      <div className="flex flex-col gap-1.5">
        <label className="font-sans text-[0.65rem] tracking-[0.12em] uppercase text-muted/60">
          Area / Borough *
        </label>
        <input
          type="text"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          placeholder="e.g. Notting Hill, Chelsea, Mayfair"
          className="bg-ivory border border-warm-border rounded px-4 py-3 font-sans text-sm text-charcoal placeholder:text-muted/40 focus:outline-none focus:border-green-400 transition-colors"
        />
      </div>

      {/* Address */}
      <div className="flex flex-col gap-1.5">
        <label className="font-sans text-[0.65rem] tracking-[0.12em] uppercase text-muted/60">
          Address (optional)
        </label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="e.g. 127 Ledbury Rd, W11 2AQ"
          className="bg-ivory border border-warm-border rounded px-4 py-3 font-sans text-sm text-charcoal placeholder:text-muted/40 focus:outline-none focus:border-green-400 transition-colors"
        />
      </div>

      {/* Cuisine */}
      <div className="flex flex-col gap-1.5">
        <label className="font-sans text-[0.65rem] tracking-[0.12em] uppercase text-muted/60">
          Cuisine Type (optional)
        </label>
        <div className="flex flex-wrap gap-2  ">
          {CUISINES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCuisine(cuisine === c ? "" : c)}
              className={`font-sans text-[0.72rem] cursor-pointer tracking-wide px-4 py-2 rounded border transition-all duration-200 ${
                cuisine === c
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-ivory border-warm-border text-muted hover:border-green-400"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Occasion */}
      <div className="flex flex-col gap-1.5 ">
        <label className="font-sans text-[0.65rem] tracking-[0.12em] uppercase text-muted/60">
          Best suited for (optional)
        </label>
        <div className="flex flex-wrap gap-2">
          {OCCASIONS.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => setOccasion(occasion === o ? "" : o)}
              className={`font-sans text-[0.72rem] cursor-pointer tracking-wide px-4 py-2 rounded border transition-all duration-200 ${
                occasion === o
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-ivory border-warm-border text-muted hover:border-green-400"
              }`}
            >
              {o}
            </button>
          ))}
        </div>
      </div>

      {/* Why quiet */}
      <div className="flex flex-col gap-1.5">
        <label className="font-sans text-[0.65rem] tracking-[0.12em] uppercase text-muted/60">
          Why is it quiet? (optional)
        </label>
        <textarea
          rows={3}
          value={notes}
          maxLength={280}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Tell us what makes it a good quiet dining spot..."
          className="bg-ivory border border-warm-border rounded px-4 py-3 font-sans text-sm text-charcoal placeholder:text-muted/40 focus:outline-none focus:border-green-400 transition-colors resize-none font-light"
        />
      </div>

      {/* Visited toggle */}
      <div className="border-t border-warm-border pt-6">
        <button
          type="button"
          onClick={() => setVisited(!visited)}
          className={`font-sans text-[0.72rem] cursor-pointer tracking-wide px-4 py-2 rounded border transition-all duration-200 ${
            visited
              ? "bg-green-600 text-white border-green-600"
              : "bg-ivory border-warm-border text-muted hover:border-green-400"
          }`}
        >
          {visited
            ? "✓ I've visited this restaurant"
            : "I've visited this restaurant"}
        </button>
        <p className="font-sans text-[0.6rem] text-muted/40 mt-2">
          Optional — share your experience and we'll include it as the first
          rating when we add it.
        </p>
      </div>

      {/* Visit scores — only show when visited is true */}
      {visited && (
        <div className="flex flex-col gap-6 bg-amber/5 rounded p-6 border border-amber/20">
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
                  className={`font-sans text-[0.72rem] cursor-pointer tracking-wide px-4 py-2 rounded border transition-all duration-200 ${
                    timeSlot === slot
                      ? "bg-green-600 text-white border-green-600"
                      : "bg-ivory border-warm-border text-muted hover:border-green-400"
                  }`}
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
                  className={`font-sans text-[0.72rem] cursor-pointer tracking-wide px-4 py-2 rounded border transition-all duration-200 ${
                    day === d
                      ? "bg-green-600 text-white border-green-600"
                      : "bg-ivory border-warm-border text-muted hover:border-green-400"
                  }`}
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
            labels={[
              "Very Spacious",
              "Spacious",
              "Comfortable",
              "Tight",
              "Cramped",
            ]}
          />
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`text-white font-display italic text-lg px-6 py-4 rounded transition-colors ${
          loading
            ? "bg-green-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-500"
        }`}
      >
        {loading ? "Submitting..." : "Suggest this Restaurant"}
      </button>

      <p className="font-sans text-[0.65rem] text-muted/40 text-center">
        We review every suggestion before adding it to DineSotto.
      </p>
    </form>
  );
}
