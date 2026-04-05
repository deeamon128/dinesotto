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
  if (score === null) return null;
  if (score >= 9) return "Library Quiet";
  if (score >= 7) return "Pleasantly Quiet";
  if (score >= 5) return "Moderate";
  if (score >= 3) return "Loud";
  return "Very Loud";
}

interface SelectedCell {
  time: string;
  day: string;
  score: number | null;
  count: number;
}

export default function NoiseHeatmap({ data }: Props) {
  const [selected, setSelected] = useState<SelectedCell | null>(null);

  const lookup = new Map<string, HeatmapCell>();
  data.forEach((cell) => {
    lookup.set(`${cell.time_slot}__${cell.day_of_week}`, cell);
  });

  const hasData = data.length > 0;

  const legend = (
    <div className="flex items-center gap-4 mt-6 flex-wrap">
      {[
        { colour: "bg-green-700", label: "Library Quiet" },
        { colour: "bg-green-600", label: "Pleasantly Quiet" },
        { colour: "bg-amber/40", label: "Moderate" },
        { colour: "bg-amber/70", label: "Loud" },
        { colour: "bg-amber", label: "Very Loud" },
        { colour: "bg-warm-border/20", label: "No data" },
      ].map(({ colour, label }) => (
        <div key={label} className="flex items-center gap-1.5">
          <div className={`w-3 h-3 rounded shrink-0 ${colour}`} />
          <span className="font-sans text-[0.6rem] text-muted/60">{label}</span>
        </div>
      ))}
      <div className="flex items-center gap-2 md:ml-4 md:border-l md:border-warm-border md:pl-4">
        <div className="flex gap-0.5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-green-600" />
          ))}
        </div>
        <span className="font-sans text-[0.6rem] text-muted/60">
          More dots = more ratings
        </span>
      </div>
    </div>
  );

  const infoBar = (
    <div
      className={`transition-all duration-200 overflow-hidden
    ${selected ? "mt-4 opacity-100" : "h-0 opacity-0"}`}
    >
      <div className="rounded border border-warm-border px-5 py-4">
        {selected && (
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-sans text-[0.62rem] tracking-wide uppercase text-muted/50 mb-1">
                {selected.day} · {selected.time}
              </p>
              {selected.score !== null ? (
                <p className="font-display text-lg font-light text-green-700">
                  {scoreToLabel(selected.score)}
                </p>
              ) : (
                <p className="font-sans text-sm font-light text-muted/50">
                  No ratings yet for this slot
                </p>
              )}
            </div>
            {selected.score !== null && (
              <p className="font-sans text-[0.62rem] tracking-wide uppercase text-amber shrink-0">
                {selected.count} {selected.count === 1 ? "rating" : "ratings"}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const gridContent = (cellHeight: string) => (
    <>
      {/* Day headers */}
      <div className="grid grid-cols-8 gap-1 mb-1">
        <div />
        {DAYS.map((day) => (
          <div
            key={day.key}
            className="text-center font-sans text-[0.58rem] tracking-[0.08em] uppercase text-muted/50 py-1"
          >
            {day.label}
          </div>
        ))}
      </div>

      {/* Rows */}
      {TIME_SLOTS.map((slot) => (
        <div key={slot.key} className="grid grid-cols-8 gap-1 mb-1">
          <div className="flex items-center pr-1">
            <span className="font-sans text-[0.56rem] tracking-wide text-muted/50 truncate">
              {slot.label}
            </span>
          </div>

          {DAYS.map((day) => {
            const cell = lookup.get(`${slot.key}__${day.key}`);
            const score = cell?.avg_score ?? null;
            const count = cell?.count ?? 0;
            const isSelected =
              selected?.time === slot.label && selected?.day === day.label;

            return (
              <button
                key={day.key}
                type="button"
                className={`
                  relative rounded flex flex-col items-center justify-center
                  transition-colors duration-150 w-full ${cellHeight}
                  ${scoreToColour(score)}
                  ${
                    isSelected
                      ? "ring-2 ring-inset ring-amber"
                      : "hover:ring-2 hover:ring-inset hover:ring-amber/50"
                  }
                `}
                onClick={() =>
                  setSelected(
                    isSelected
                      ? null
                      : { time: slot.label, day: day.label, score, count },
                  )
                }
                onMouseEnter={() =>
                  setSelected({
                    time: slot.label,
                    day: day.label,
                    score,
                    count,
                  })
                }
                onMouseLeave={() => setSelected(null)}
              >
                <span className="hidden sm:block font-sans text-[0.5rem] font-medium text-center leading-tight px-0.5">
                  {score !== null ? scoreToLabel(score) : "—"}
                </span>
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
              </button>
            );
          })}
        </div>
      ))}
    </>
  );

  return (
    <section className="bg-ivory py-16 px-4 md:px-8 border-t border-warm-border">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-amber mb-2">
            Time of day
          </p>
          <h2 className="font-display text-3xl font-light italic text-green-700">
            Noise by time and day
          </h2>
          <p className="font-sans font-light text-muted text-sm mt-2">
            {hasData
              ? "Based on real community ratings. Tap any cell to see details."
              : "No ratings yet — be the first to rate this restaurant."}
          </p>
        </div>

        {/* ── MOBILE ── */}
        <div className="md:hidden">
          <p className="font-sans text-[0.6rem] tracking-[0.12em] uppercase text-muted/40 mb-2 flex items-center gap-2">
            Scroll to see all days
            <span className="flex-1 h-px bg-warm-border" />
          </p>
          <div className="relative">
            {/* Fade hint on right edge */}
            <div
              className="absolute top-0 right-0 w-10 h-full z-10 pointer-events-none"
              style={{
                background: "linear-gradient(to right, transparent, #F5F0E8)",
              }}
            />
            <div
              className="overflow-x-auto pb-1"
              style={{ scrollbarWidth: "none" }}
            >
              <div style={{ minWidth: "480px" }}>{gridContent("py-4")}</div>
            </div>
          </div>
          {infoBar}
          {legend}
        </div>

        {/* ── DESKTOP ── */}
        <div className="hidden md:block">
          <div className="overflow-hidden">
            <div style={{ minWidth: "460px" }}>{gridContent("py-4")}</div>
          </div>
          {infoBar}
          {legend}
        </div>
      </div>
    </section>
  );
}
