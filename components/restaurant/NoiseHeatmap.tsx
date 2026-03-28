"use client";

import { useState } from "react";

const TIME_SLOTS = [
  { key: "breakfast", label: "Breakfast" },
  { key: "lunch", label: "Lunch" },
  { key: "afternoon", label: "Afternoon" },
  { key: "early_evening", label: "Early Eve" },
  { key: "peak_evening", label: "Peak Eve" },
  { key: "late", label: "Late" },
];

const DAYS = [
  { key: "mon", label: "Mon" },
  { key: "tue", label: "Tue" },
  { key: "wed", label: "Wed" },
  { key: "thu", label: "Thu" },
  { key: "fri", label: "Fri" },
  { key: "sat", label: "Sat" },
  { key: "sun", label: "Sun" },
];

interface HeatmapCell {
  time_slot: string;
  day_of_week: string;
  avg_score: number;
  count: number;
}

interface Props {
  data: HeatmapCell[];
}

function scoreToColour(score: number | null) {
  if (score === null) return "bg-warm-border/20 text-muted/20";
  if (score >= 9) return "bg-green-700 text-green-100";
  if (score >= 7) return "bg-green-600 text-green-100";
  if (score >= 5) return "bg-amber/40 text-charcoal";
  if (score >= 3) return "bg-amber/70 text-charcoal";
  return "bg-amber text-charcoal";
}

function scoreToLabel(score: number | null) {
  if (score === null) return "No data yet";
  if (score >= 9) return "Library Quiet";
  if (score >= 7) return "Pleasantly Quiet";
  if (score >= 5) return "Moderate";
  if (score >= 3) return "Loud";
  return "Very Loud";
}

interface TooltipState {
  time: string;
  day: string;
  score: number | null;
  count: number;
  x: number;
  y: number;
}

export default function NoiseHeatmap({ data }: Props) {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  // Build a lookup map for quick access
  const lookup = new Map<string, HeatmapCell>();
  data.forEach((cell) => {
    lookup.set(`${cell.time_slot}__${cell.day_of_week}`, cell);
  });

  const hasData = data.length > 0;

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
            {hasData
              ? "Based on real community ratings. Hover any cell to see details."
              : "No ratings yet — be the first to rate this restaurant."}
          </p>
        </div>

        {/* Heatmap */}
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Day headers */}
            <div className="grid grid-cols-8 gap-1.5 mb-1.5">
              <div />
              {DAYS.map((day) => (
                <div
                  key={day.key}
                  className="text-center font-sans text-[0.62rem] tracking-[0.1em] uppercase text-muted/50 py-1"
                >
                  {day.label}
                </div>
              ))}
            </div>

            {/* Rows */}
            {TIME_SLOTS.map((slot) => (
              <div key={slot.key} className="grid grid-cols-8 gap-1.5 mb-1.5">
                {/* Time label */}
                <div className="flex items-center">
                  <span className="font-sans text-[0.6rem] tracking-wide text-muted/50 truncate">
                    {slot.label}
                  </span>
                </div>

                {/* Cells */}
                {DAYS.map((day) => {
                  const cell = lookup.get(`${slot.key}__${day.key}`);
                  const score = cell?.avg_score ?? null;
                  const count = cell?.count ?? 0;

                  return (
                    <div
                      key={day.key}
                      className={`
                        relative rounded py-3 flex flex-col items-center justify-center
                        cursor-pointer transition-all duration-150
                        hover:ring-2 hover:ring-amber/50 hover:scale-105
                        ${scoreToColour(score)}
                      `}
                      onMouseEnter={(e) => {
                        const rect = (
                          e.currentTarget as HTMLElement
                        ).getBoundingClientRect();
                        setTooltip({
                          time: slot.label,
                          day: day.label,
                          score,
                          count,
                          x: rect.left,
                          y: rect.top,
                        });
                      }}
                      onMouseLeave={() => setTooltip(null)}
                    >
                      {/* Label instead of score */}
                      <span className="font-sans text-[0.55rem] font-medium text-center leading-tight px-1">
                        {score !== null ? scoreToLabel(score) : "—"}
                      </span>

                      {/* Confidence dots */}
                      {score !== null && (
                        <div className="absolute bottom-1 right-1 flex gap-0.5">
                          {[1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className={`w-1 h-1 rounded-full ${
                                i <= Math.min(3, Math.ceil(count / 5))
                                  ? "bg-current opacity-60"
                                  : "bg-current opacity-15"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mt-8 flex-wrap">
          {[
            { colour: "bg-green-700", label: "Library Quiet" },
            { colour: "bg-green-600", label: "Pleasantly Quiet" },
            { colour: "bg-amber/40", label: "Moderate" },
            { colour: "bg-amber/70", label: "Loud" },
            { colour: "bg-amber", label: "Very Loud" },
            { colour: "bg-warm-border/20", label: "No data" },
          ].map(({ colour, label }) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded ${colour}`} />
              <span className="font-sans text-[0.62rem] text-muted/60">
                {label}
              </span>
            </div>
          ))}
          <div className="flex items-center gap-2 ml-4 border-l border-warm-border pl-4">
            <div className="flex gap-0.5">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-green-600"
                />
              ))}
            </div>
            <span className="font-sans text-[0.62rem] text-muted/60">
              More dots = more ratings
            </span>
          </div>
        </div>

        {/* Tooltip */}
        {tooltip && (
          <div
            className="fixed z-50 bg-charcoal text-ivory rounded shadow-xl px-4 py-3 pointer-events-none"
            style={{ left: tooltip.x + 10, top: tooltip.y - 80 }}
          >
            <p className="font-sans text-[0.62rem] tracking-wide uppercase text-muted/60 mb-1">
              {tooltip.day} · {tooltip.time}
            </p>
            {tooltip.score !== null ? (
              <>
                <p className="font-display text-lg font-light text-green-100 mb-0.5">
                  {scoreToLabel(tooltip.score)}
                </p>
                <p className="font-sans text-[0.62rem] text-amber">
                  Based on {tooltip.count}{" "}
                  {tooltip.count === 1 ? "rating" : "ratings"}
                </p>
              </>
            ) : (
              <p className="font-sans text-[0.62rem] text-muted/50">
                No ratings yet for this slot
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
