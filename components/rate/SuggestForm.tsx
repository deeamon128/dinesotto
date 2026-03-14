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

export default function SuggestForm() {
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim()) return setError("Please enter the restaurant name.");
    if (!area.trim()) return setError("Please enter the area.");

    setLoading(true);

    const supabase = createClient();

    const { error: insertError } = await supabase.from("suggestions").insert({
      name: name.trim(),
      area: area.trim(),
      address: address.trim() || null,
      cuisine: cuisine || null,
      notes: notes.trim() || null,
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
          We'll research your suggestion and add it to Sotto if it meets our
          quiet dining criteria.
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
        <div className="flex flex-wrap gap-2">
          {CUISINES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCuisine(c)}
              className={`
                font-sans text-[0.72rem] tracking-wide px-4 py-2 rounded border
                transition-all duration-200
                ${
                  cuisine === c
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-ivory border-warm-border text-muted hover:border-green-400"
                }
              `}
            >
              {c}
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
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Tell us what makes it a good quiet dining spot..."
          className="bg-ivory border border-warm-border rounded px-4 py-3 font-sans text-sm text-charcoal placeholder:text-muted/40 focus:outline-none focus:border-green-400 transition-colors resize-none font-light"
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
        {loading ? "Submitting..." : "Suggest this Restaurant"}
      </button>

      <p className="font-sans text-[0.65rem] text-muted/40 text-center">
        We review every suggestion before adding it to Sotto.
      </p>
    </form>
  );
}
