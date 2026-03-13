"use client";

import { useState } from "react";

const TIME_SLOTS = [
  "Breakfast",
  "Lunch",
  "Afternoon",
  "Early Eve",
  "Peak Eve",
  "Late",
];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Generate placeholder heatmap data
function generateData() {
  return TIME_SLOTS.map((time) => ({
    time,
    days: DAYS.map((day) => ({
      day,
      score:
        Math.random() > 0.15
          ? Math.round((Math.random() * 5 + 4) * 10) / 10
          : null,
      count: Math.floor(Math.random() * 40) + 1,
    })),
  }));
}

const DATA = generateData();

function scoreToColour(score: number | null) {
  if (score === null) return "bg-warm-border/30 text-muted/20";
  if (score >= 8.5) return "bg-green-700 text-green-100";
  if (score >= 7.5) return "bg-green-600 text-green-100";
  if (score >= 6.5) return "bg-green-500 text-green-100";
  if (score >= 5.5) return "bg-amber/60 text-charcoal";
  return "bg-amber text-charcoal";
}

function scoreToLabel(score: number | null) {
  if (score === null) return "No data";
  if (score >= 8.5) return "Library Quiet";
  if (score >= 7.5) return "Very Quiet";
  if (score >= 6.5) return "Pleasantly Quiet";
  if (score >= 5.5) return "Moderate";
  return "Loud";
}

interface TooltipData {
  time: string;
  day: string;
  score: number | null;
  count: number;
  x: number;
  y: number;
}

export default function NoiseHeatmap() {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);

  return (
    <section className="bg-ivory py-16 px-8 border-t border-warm-border">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-amber mb-2">
            Time of day
          </p>
          <h2 className="font-display text-3xl font-light italic text-green-700">
            Noise by time and day
          </h2>
          <p className="font-sans font-light text-muted text-sm mt-2">
            Hover any cell to see the score and number of ratings.
          </p>
        </div>

        {/* Heatmap grid */}
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Day headers */}
            <div className="grid grid-cols-8 gap-1.5 mb-1.5">
              <div /> {/* empty corner */}
              {DAYS.map((day) => (
                <div
                  key={day}
                  className="text-center font-sans text-[0.62rem] tracking-[0.1em] uppercase text-muted/50 py-1"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Rows */}
            {DATA.map(({ time, days }) => (
              <div key={time} className="grid grid-cols-8 gap-1.5 mb-1.5">
                {/* Time label */}
                <div className="flex items-center">
                  <span className="font-sans text-[0.6rem] tracking-wide text-muted/50 truncate">
                    {time}
                  </span>
                </div>

                {/* Cells */}
                {days.map(({ day, score, count }) => (
                  <div
                    key={day}
                    className={`
                      relative rounded py-3 flex items-center justify-center
                      cursor-pointer transition-all duration-150
                      hover:ring-2 hover:ring-amber/50 hover:scale-105
                      ${scoreToColour(score)}
                    `}
                    onMouseEnter={(e) => {
                      const rect = (
                        e.target as HTMLElement
                      ).getBoundingClientRect();
                      setTooltip({
                        time,
                        day,
                        score,
                        count,
                        x: rect.left,
                        y: rect.top,
                      });
                    }}
                    onMouseLeave={() => setTooltip(null)}
                  >
                    <span className="font-display text-xs font-light">
                      {score ?? "—"}
                    </span>

                    {/* Confidence dots */}
                    {score !== null && (
                      <div className="absolute bottom-1 right-1 flex gap-0.5">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className={`w-1 h-1 rounded-full ${
                              i <= Math.min(3, Math.ceil(count / 10))
                                ? "bg-current opacity-60"
                                : "bg-current opacity-20"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mt-6 flex-wrap">
          {[
            { colour: "bg-green-700", label: "Library Quiet" },
            { colour: "bg-green-600", label: "Very Quiet" },
            { colour: "bg-green-500", label: "Pleasantly Quiet" },
            { colour: "bg-amber/60", label: "Moderate" },
            { colour: "bg-amber", label: "Loud" },
            { colour: "bg-warm-border/30", label: "No data" },
          ].map(({ colour, label }) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded ${colour}`} />
              <span className="font-sans text-[0.62rem] text-muted/60">
                {label}
              </span>
            </div>
          ))}
          <div className="flex items-center gap-2 ml-4">
            <div className="flex gap-0.5">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-green-600"
                />
              ))}
            </div>
            <span className="font-sans text-[0.62rem] text-muted/60">
              Confidence
            </span>
          </div>
        </div>

        {/* Tooltip */}
        {tooltip && (
          <div
            className="fixed z-50 bg-charcoal text-ivory rounded shadow-xl px-4 py-3 pointer-events-none"
            style={{ left: tooltip.x, top: tooltip.y - 80 }}
          >
            <p className="font-sans text-[0.65rem] tracking-wide uppercase text-muted/60 mb-1">
              {tooltip.day} · {tooltip.time}
            </p>
            <p className="font-display text-xl font-light text-green-100">
              {tooltip.score ?? "No data"}
            </p>
            <p className="font-sans text-[0.62rem] text-amber">
              {scoreToLabel(tooltip.score)}
            </p>
            {tooltip.score && (
              <p className="font-sans text-[0.58rem] text-muted/50 mt-1">
                {tooltip.count} ratings
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
