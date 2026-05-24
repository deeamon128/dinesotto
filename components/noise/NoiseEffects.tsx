"use client";

import { useState, useEffect } from "react";

const EFFECTS = [
  {
    heading: "The Lombard Effect",
    body: "When background noise rises above a comfortable level, everyone at the table involuntarily raises their voice to be heard. This increases the overall noise, which causes everyone to raise their voices further. The room gets louder simply by being full. Research places the threshold where this cycle accelerates at around 50 to 58 dB. Most busy London restaurants sit well above that.",
    source: "PMC9023576",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9023576/",
  },
  {
    heading: "Cognitive overload",
    body: "When your brain works harder to filter background noise and follow a conversation, it draws on the same resources needed for memory, problem solving and concentration. Those resources are finite. You leave the table having spent them.",
    source: "Springer 2023",
    href: "https://link.springer.com/article/10.1007/s10111-023-00746-2",
  },
  {
    heading: "Stress and cortisol",
    body: "Noise exposure activates the sympathetic nervous system, the same physiological response as stress. Studies show that louder environments correlate with elevated cortisol levels. For people already navigating noisy commutes, open-plan offices, and busy streets, a loud restaurant is one more demand on a system that may already be running close to its limit.",
    source: "PMC10088431",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10088431/",
  },
  {
    heading: "It even changes how food tastes",
    body: "Research has found that loud environments suppress the perception of sweetness and sourness, meaning food genuinely tastes different in a noisy room. Background noise also reduces our ability to appreciate aroma and flavour complexity, affecting the overall satisfaction of the dining experience.",
    source: "Spence 2014",
    href: "https://link.springer.com/article/10.1186/2044-7248-3-9",
  },
];

export default function NoiseEffects() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <section className="bg-ivory-dark py-24 px-8 border-t border-warm-border">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-amber mb-3">
            What the research shows
          </p>
          <h2 className="font-display text-4xl font-light italic text-green-700">
            What loud restaurants actually do to you.
          </h2>
        </div>

        <div className="flex flex-col">
          {EFFECTS.map(({ heading, body, source, href }, i) => (
            <div
              key={heading}
              className="border-t border-green-800 last:border-b last:border-green-800"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-6 text-left cursor-pointer group"
              >
                <h3 className="font-display text-xl italic text-green-700 group-hover:text-green-600 transition-colors">
                  {heading}
                </h3>
                <span
                  className="text-muted/40 shrink-0 ml-4 text-lg transition-transform duration-200 inline-block"
                  style={{
                    transform:
                      mounted && openIndex === i
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                  }}
                >
                  ▾
                </span>
              </button>

              <div
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: mounted && openIndex === i ? "400px" : "0px",
                }}
              >
                <div className="pb-8 flex flex-col gap-4">
                  <p className="font-sans font-light text-charcoal/80 text-sm leading-relaxed w-full">
                    {body}
                  </p>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-[0.6rem] tracking-wide uppercase text-amber transition-colors  hover:text-green-300/30"
                  >
                    {"Source: " + source + " \u2197"}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
