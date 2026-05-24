"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  {
    number: "1 in 6",
    animated: null,
    label: "people in the UK live with hearing loss",
    context:
      "That is 12 million people today, rising to 14.2 million by 2035. Most restaurant guides ignore all of them.",
    source: "Hearing Review",
    href: "https://hearingreview.com/hearing-loss/most-adult-britons-struggle-hear-noisy-environments",
  },
  {
    number: "62%",
    animated: { target: 62, suffix: "%" },
    label: "of UK adults struggle to hear conversations in noisy environments",
    context:
      "Nearly two in three people are affected, not only those with diagnosed hearing loss. The cocktail party effect is something almost everyone experiences at some point, in any busy room.",
    source: "Hearing Review",
    href: "https://hearingreview.com/hearing-loss/most-adult-britons-struggle-hear-noisy-environments",
  },
  {
    number: "76 dB+",
    animated: { target: 76, suffix: " dB+" },
    label: "is the average noise level in many London restaurants",
    context:
      "Above this threshold, normal conversation becomes genuinely difficult. Some London venues exceed 90 dB and that's louder than a lawnmower.",
    source: "Quiet Coalition",
    href: "https://quietcoalition.org/londons-restaurants-are-the-loudest-in-europe/",
  },
  {
    number: "91%",
    animated: { target: 91, suffix: "%" },
    label: "of people say they would not return to a loud venue",
    context:
      "And close to eight in ten UK residents have already left a restaurant, café or bar because it was too loud.",
    source: "Action on Hearing Loss",
    href: "https://rnid.org.uk/wp-content/uploads/2020/05/A1286_Cafe-pubs-and-restaurants-policy-statement.pdf",
  },
];

function useCountUp(
  target: number,
  suffix: string,
  triggered: boolean,
  duration = 1400,
) {
  const [display, setDisplay] = useState("0" + suffix);

  useEffect(() => {
    if (!triggered) return;
    const start = performance.now();
    function update(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const val = Math.round(ease * target);
      setDisplay(val + suffix);
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }, [triggered, target, suffix, duration]);

  return display;
}

function StatCell({
  stat,
  triggered,
}: {
  stat: (typeof STATS)[0];
  triggered: boolean;
}) {
  const display = useCountUp(
    stat.animated?.target ?? 0,
    stat.animated?.suffix ?? "",
    triggered && !!stat.animated,
  );

  return (
    <div className="bg-ivory p-10 flex flex-col gap-4">
      <p className="font-display text-6xl font-light text-green-600 leading-none">
        {stat.animated
          ? triggered
            ? display
            : "0" + stat.animated.suffix
          : stat.number}
      </p>
      <p className="font-display text-lg italic text-green-800">{stat.label}</p>
      <p className="font-sans font-light text-muted text-sm leading-relaxed flex-1">
        {stat.context}
      </p>

      <a
        href={stat.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-sans text-[0.6rem] tracking-wide uppercase text-muted/40 hover:text-green-600 transition-colors"
      >
        {"Source: " + stat.source + " ↗"}
      </a>
    </div>
  );
}

export default function NoiseStats() {
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-ivory py-24 px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-amber mb-3">
            The numbers
          </p>
          <h2 className="font-display text-4xl font-light italic text-green-700">
            The scale of the problem.
          </h2>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-px bg-warm-border"
        >
          {STATS.map((stat) => (
            <StatCell key={stat.number} stat={stat} triggered={triggered} />
          ))}
        </div>
      </div>
    </section>
  );
}
