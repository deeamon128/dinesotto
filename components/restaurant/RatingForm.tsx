"use client";

import { useState } from "react";

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

export default function RatingForm() {
  const [timeSlot, setTimeSlot] = useState("");
  const [day, setDay] = useState("");
  const [musicScore, setMusicScore] = useState(0);
  const [crowdScore, setCrowdScore] = useState(0);
  const [spacingScore, setSpacingScore] = useState(0);
  const [sources, setSources] = useState<string[]>([]);
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function toggleSource(s: string) {
    setSources((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="bg-ivory py-16 px-8 border-t border-warm-border">
        <div className="max-w-2xl mx-auto text-center py-12">
          <p className="font-display text-4xl italic text-green-700 mb-4">
            Thank you.
          </p>
          <p className="font-sans font-light text-muted text-sm">
            Your rating helps someone find the right restaurant.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-ivory py-16 px-8 border-t border-warm-border">
      <div className="max-w-2xl mx-auto">
        <div className="mb-10">
          <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-amber mb-2">
            Share your experience
          </p>
          <h2 className="font-display text-3xl font-light italic text-green-700">
            Rate your visit
          </h2>
          <p className="font-sans font-light text-muted text-sm mt-2">
            Your rating is anonymous and helps real people make better choices.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
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

          {/* Scores */}
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

          {/* Written review */}
          <div>
            <p className="font-sans text-[0.65rem] tracking-[0.12em] uppercase text-muted/60 mb-3">
              Anything else? (optional)
            </p>
            <textarea
              rows={4}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Anything a future visitor should know..."
              className="w-full bg-ivory border border-warm-border rounded px-4 py-3 font-sans text-sm text-charcoal placeholder:text-muted/40 focus:outline-none focus:border-green-400 transition-colors resize-none font-light italic"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-500 text-white font-display italic text-lg px-6 py-4 rounded transition-colors"
          >
            Add My Rating
          </button>
        </form>
      </div>
    </section>
  );
}
