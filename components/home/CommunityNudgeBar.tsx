"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CommunityNudgeBubble() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("nudge-dismissed")) return;

    const timer = setTimeout(() => setVisible(true), 3000);

    const hero = document.querySelector("#hero-section");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) setVisible(true);
      },
      { threshold: 0 },
    );
    if (hero) observer.observe(hero);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const dismiss = () => {
    setDismissed(true);
    sessionStorage.setItem("nudge-dismissed", "1");
  };

  if (dismissed) return null;

  return (
    <div
      className={`
  fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-[420px]
  z-50 bg-[#111a0f] rounded-full
  px-5 py-[11px] flex items-center gap-3
  border border-[#f5f0e8]/10
  shadow-[0_4px_20px_rgba(0,0,0,0.18)]
  transition-all duration-500
  ${visible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-3 pointer-events-none"}
`}
    >
      <span className="w-[7px] h-[7px] rounded-full bg-[#c8883a] shrink-0 animate-pulse" />
      <span className="text-[#f5f0e8]/80 text-[12.5px] leading-snug flex-1">
        Built by the community.{" "}
        <Link
          href="/rate"
          className="text-[#f5f0e8] font-medium underline underline-offset-2 decoration-[#c8883a]/60 hover:decoration-[#c8883a]"
        >
          Rate a visit
        </Link>{" "}
        or{" "}
        <Link
          href="/suggest"
          className="text-[#f5f0e8] font-medium underline underline-offset-2 decoration-[#c8883a]/60 hover:decoration-[#c8883a]"
        >
          suggest a restaurant
        </Link>
        .
      </span>
      <button
        onClick={dismiss}
        aria-label="Dismiss"
        className="text-[#f5f0e8]/35 hover:text-[#f5f0e8]/70 text-sm leading-none bg-transparent border-none cursor-pointer shrink-0 transition-colors"
      >
        ✕
      </button>
    </div>
  );
}
