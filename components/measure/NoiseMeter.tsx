"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

const LEVELS = [
  {
    label: "Library Quiet",
    range: "Under 65 dB",
    desc: "Ideal for quiet conversation. You can whisper across the table.",
    color: "#3B6D11",
    max: 65,
  },
  {
    label: "Pleasantly Quiet",
    range: "65–70 dB",
    desc: "Conversation is comfortable. No effort needed to hear each other.",
    color: "#639922",
    max: 70,
  },
  {
    label: "Moderate",
    range: "70–75 dB",
    desc: "You may need to raise your voice slightly. Still manageable.",
    color: "#BA7517",
    max: 75,
  },
  {
    label: "Loud",
    range: "75 dB+",
    desc: "Difficult to hold a conversation. The Lombard Effect is in full swing.",
    color: "#E24B4A",
    max: 200,
  },
];

function getLevel(db: number) {
  return LEVELS.find((l) => db < l.max) ?? LEVELS[LEVELS.length - 1];
}

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

function arcPath(
  cx: number,
  cy: number,
  r: number,
  startDeg: number,
  endDeg: number,
) {
  const [sx, sy] = polar(cx, cy, r, startDeg);
  const [ex, ey] = polar(cx, cy, r, endDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${sx} ${sy} A ${r} ${r} 0 ${large} 1 ${ex} ${ey}`;
}

const CX = 140,
  CY = 140,
  R = 110;
const START_DEG = 135,
  END_DEG = 405;
const TOTAL_DEG = END_DEG - START_DEG;
const BG_PATH = arcPath(CX, CY, R, START_DEG, END_DEG);

export default function NoiseMeter() {
  const [isRunning, setIsRunning] = useState(false);
  const [db, setDb] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    return () => stopMeter();
  }, []);

  function loop() {
    if (!analyserRef.current) return;
    const data = new Uint8Array(analyserRef.current.fftSize);
    analyserRef.current.getByteTimeDomainData(data);
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      const v = (data[i] - 128) / 128;
      sum += v * v;
    }
    const rms = Math.sqrt(sum / data.length);
    const measured = rms > 0 ? 20 * Math.log10(rms) + 90 : 30;
    setDb(Math.max(30, Math.min(95, measured)));
    rafRef.current = requestAnimationFrame(loop);
  }

  async function startMeter() {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const AudioContextClass =
        window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;
      source.connect(analyser);
      analyserRef.current = analyser;
      setIsRunning(true);
      trackEvent("measure_started");
      loop();
    } catch {
      setError(
        "Microphone access was denied. Please allow microphone access in your browser settings and try again.",
      );
    }
  }

  function stopMeter() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (streamRef.current)
      streamRef.current.getTracks().forEach((t) => t.stop());
    if (audioCtxRef.current) audioCtxRef.current.close();
    analyserRef.current = null;
    streamRef.current = null;
    audioCtxRef.current = null;
    setIsRunning(false);
    trackEvent("measure_stopped", { db_reading: db ?? 0 });
    setDb(null);
  }

  const level = db !== null ? getLevel(db) : null;
  const pct = db !== null ? Math.max(0.02, Math.min(1, (db - 30) / 65)) : 0;
  const fillEndDeg = START_DEG + TOTAL_DEG * pct;
  const fillPath = db !== null ? arcPath(CX, CY, R, START_DEG, fillEndDeg) : "";

  return (
    <div className="max-w-xl mx-auto">
      {/* Status */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <span
          className="w-2 h-2 rounded-full transition-all duration-300"
          style={{
            background: isRunning ? "#22c55e" : "#d8d0c0",
            boxShadow: isRunning ? "0 0 0 4px rgba(34,197,94,0.2)" : "none",
          }}
        />
        <span className="font-sans text-[0.65rem] tracking-[0.15em] uppercase text-muted/50">
          {isRunning ? "Measuring live" : "Ready to measure"}
        </span>
      </div>

      {/* Dial */}
      <div className="relative w-[280px] h-[280px] mx-auto mb-8">
        <svg viewBox="0 0 280 280" className="w-full h-full" fill="none">
          <circle cx={CX} cy={CY} r={120} stroke="#d8d0c0" strokeWidth="0.5" />
          <path
            d={BG_PATH}
            stroke="#ede8e0"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {fillPath && (
            <path
              d={fillPath}
              stroke={level?.color ?? "#d8d0c0"}
              strokeWidth="8"
              strokeLinecap="round"
              style={{ transition: "stroke 0.3s" }}
            />
          )}
          <circle
            cx={CX}
            cy={CY}
            r={90}
            stroke="#ede8e0"
            strokeWidth="0.5"
            strokeDasharray="2 8"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-display text-[4.5rem] font-light italic leading-none transition-colors duration-300"
            style={{ color: level ? level.color : "#8aaa8a" }}
          >
            {db !== null ? Math.round(db) : "—"}
          </span>
          <span className="font-sans text-xs tracking-widest uppercase text-muted/40 mt-1">
            dB
          </span>
          <span
            className="font-sans text-sm font-light mt-2 transition-colors duration-300"
            style={{ color: level ? level.color : "#8aaa8a" }}
          >
            {level ? level.label : "—"}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="font-sans text-sm font-light text-muted text-center mb-8 min-h-[20px]">
        {level ? level.desc : "Start measuring to see your noise level"}
      </p>

      {/* Error */}
      {error && (
        <div className="bg-amber/10 border border-amber/30 rounded px-4 py-3 mb-6">
          <p className="font-sans text-sm text-amber">{error}</p>
        </div>
      )}

      {/* Button */}
      <button
        onClick={isRunning ? stopMeter : startMeter}
        className={`font-display italic text-lg px-8 py-3.5 rounded transition-colors cursor-pointer mx-auto block ${
          isRunning
            ? "bg-amber hover:bg-amber/80 text-green-900"
            : "bg-green-600 hover:bg-green-500 text-white"
        }`}
      >
        {isRunning ? "Stop measuring" : "Start measuring"}
      </button>

      {/* Legend */}
      <div className="mt-16 w-full">
        <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-amber mb-8">
          The scale
        </p>
        <div className="flex flex-col">
          {LEVELS.map((l, i) => (
            <div
              key={l.label}
              className={`flex items-center justify-between py-5 ${
                i < LEVELS.length - 1 ? "border-b border-warm-border" : ""
              }`}
            >
              <div className="flex items-center gap-5">
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: l.color }}
                />
                <div>
                  <p className="font-display italic text-base text-green-800">
                    {l.label}
                  </p>
                  <p className="font-sans text-xs text-muted/60 font-light mt-0.5">
                    {l.desc}
                  </p>
                </div>
              </div>
              <span className="font-sans text-xs font-medium text-muted/50 shrink-0 ml-4">
                {l.range}
              </span>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="font-sans text-[0.6rem] italic text-muted/40 mt-6 text-center leading-relaxed">
          Readings are indicative. Phone microphones vary in sensitivity and
          calibration. No audio is recorded or stored.
        </p>
      </div>

      {/* CTA — always visible */}
      <div className="mt-10 py-8 border-t border-warm-border text-center">
        <p className="font-display text-lg italic text-green-700 mb-1">
          {db !== null
            ? "Happy with this reading?"
            : "Visited a restaurant recently?"}
        </p>
        <p className="font-sans text-sm font-light text-muted mb-4">
          {db !== null
            ? "Rate this restaurant so others know what to expect."
            : "Share your experience and help the community find quieter places to eat."}
        </p>
        <Link
          href="/rate"
          onClick={() =>
            trackEvent("measure_cta_click", {
              db_reading: db ?? 0,
              noise_level: level?.label ?? "none",
            })
          }
          className="inline-block bg-green-600 hover:bg-green-500 text-white font-sans text-sm font-medium px-6 py-2.5 rounded transition-colors"
        >
          Rate a restaurant
        </Link>
      </div>
    </div>
  );
}
