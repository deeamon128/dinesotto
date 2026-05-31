export const GA_ID = "G-2PWM222HM5";

export function isConsentGiven(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("cookie_consent") === "accepted";
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number>
) {
  if (!isConsentGiven()) return;
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", eventName, params);
}