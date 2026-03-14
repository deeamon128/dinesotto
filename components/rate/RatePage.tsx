"use client";

import { useState } from "react";
import SuggestForm from "./SuggestForm";
import RateVisitForm from "./RateVisitForm";
import { MappedRestaurant } from "@/lib/supabase/mappers";

interface Props {
  restaurants: MappedRestaurant[];
}

export default function RatePage({ restaurants }: Props) {
  const [tab, setTab] = useState<"rate" | "suggest">("rate");

  return (
    <main>
      {/* Hero band */}
      <section className="relative bg-green-900 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-amber/10 blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 grain opacity-30 pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto px-8 pt-32 pb-16 text-center">
          <p className="font-sans text-[0.65rem] tracking-[0.22em] uppercase text-green-300/40 mb-4">
            Community
          </p>
          <h1 className="font-display text-5xl font-light italic text-green-100 leading-[1.1] mb-4">
            Share your experience.
          </h1>
          <p className="font-sans font-light text-green-300/60 text-sm">
            Rate a restaurant you've visited, or suggest a new quiet spot.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <div className="bg-ivory border-b border-warm-border sticky top-16 z-30">
        <div className="max-w-2xl mx-auto px-8 flex gap-0">
          {[
            { key: "rate", label: "Rate a Recent Visit" },
            { key: "suggest", label: "Suggest a Restaurant" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key as "rate" | "suggest")}
              className={`
                font-sans text-[0.75rem] tracking-wide uppercase py-4 px-6
                border-b-2 transition-all duration-200
                ${
                  tab === key
                    ? "border-green-600 text-green-600"
                    : "border-transparent text-muted/50 hover:text-muted"
                }
              `}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      <section className="bg-ivory py-16 px-8">
        <div className="max-w-2xl mx-auto">
          {tab === "rate" ? (
            <RateVisitForm restaurants={restaurants} />
          ) : (
            <SuggestForm />
          )}
        </div>
      </section>
    </main>
  );
}
