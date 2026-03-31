"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setVisible(true);
    if (consent === "accepted") loadGA();
  }, []);

  function loadGA() {
    if (document.getElementById("ga-script")) return;

    const script1 = document.createElement("script");
    script1.id = "ga-script";
    script1.async = true;
    script1.src = "https://www.googletagmanager.com/gtag/js?id=G-2PWM222HM5";
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-2PWM222HM5');
    `;
    document.head.appendChild(script2);
  }

  function accept() {
    localStorage.setItem("cookie_consent", "accepted");
    loadGA();
    setVisible(false);
  }

  function decline() {
    localStorage.setItem("cookie_consent", "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-ivory border-t border-warm-border px-6 py-4 md:px-8">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="font-sans text-base font-light text-charcoal/70 max-w-xl">
          We use cookies to understand how DineSotto is used and improve the
          experience. No advertising or tracking cookies — just basic analytics.{" "}
          <a href="/privacy" className="text-green-600 underline">
            Privacy Policy
          </a>
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={decline}
            className="font-sans text-xs text-muted/60 hover:text-charcoal transition-colors px-4 py-2 border border-warm-border rounded"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="font-sans text-xs text-white bg-green-600 hover:bg-green-500 transition-colors px-4 py-2 rounded"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
