"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export default function RatePromptBubble() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("rate-prompt-dismissed")) return;

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (scrolled / total > 0.5) setVisible(true);
      trackEvent("rate_prompt_bubble_shown");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dismiss = () => {
    setDismissed(true);
    sessionStorage.setItem("rate-prompt-dismissed", "1");
  };

  if (dismissed || !visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-[360px] z-50 bg-green-900 rounded-full px-5 py-3 flex items-center gap-3 border border-ivory/10 shadow-[0_4px_20px_rgba(0,0,0,0.18)] transition-all duration-500">
      <span className="w-2 h-2 rounded-full bg-amber shrink-0 animate-pulse" />
      <span className="text-ivory/80 text-[12.5px] leading-snug flex-1">
        Visited here?{" "}
        <a
          href="#rate"
          onClick={() => {
            dismiss();
            trackEvent("rate_prompt_bubble_clicked");
          }}
          className="text-ivory font-medium underline underline-offset-2 decoration-amber/60 hover:decoration-amber"
        >
          Rate it in 2 minutes.
        </a>
      </span>
      <button
        onClick={dismiss}
        aria-label="Dismiss"
        className="text-ivory/30 hover:text-ivory/70 cursor-pointer transition-colors shrink-0"
      >
        <X size={14} />
      </button>
    </div>
  );
}
