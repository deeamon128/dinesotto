import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How DineSotto collects and uses your data.",
};

export default function PrivacyPage() {
  const email = "hello@dinesotto.com";

  return (
    <main className="bg-ivory min-h-screen">
      {/* Hero */}
      <section className="relative bg-green-900 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-amber/10 blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 grain opacity-30 pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto px-8 pt-32 pb-20">
          <p className="font-sans text-[0.65rem] tracking-[0.22em] uppercase text-green-300/40 mb-4">
            Legal
          </p>
          <h1 className="font-display text-5xl font-light italic text-green-100 leading-[1.1] mb-6">
            Your data, plainly.
          </h1>
          <p className="font-sans font-light text-green-300/60 text-sm max-w-md leading-relaxed">
            DineSotto is built on trust. Here's exactly what we collect, why,
            and how long we keep it — in plain English.
          </p>
        </div>
      </section>

      {/* Pull quote */}
      <section className="bg-amber/5 border-y border-amber/20 py-10 px-8">
        <div className="max-w-2xl mx-auto">
          <p className="font-display text-xl italic text-amber/80 leading-relaxed">
            "Ratings are fully anonymous. We don't know who you are — and that's
            intentional."
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-2xl mx-auto px-8 py-20">
        <p className="font-sans text-[0.65rem] tracking-[0.15em] uppercase text-muted/40 mb-16">
          Last updated: March 2026
        </p>

        <div className="flex flex-col gap-16">
          <div className="grid md:grid-cols-[120px_1fr] gap-6">
            <p className="font-sans text-[0.6rem] tracking-[0.18em] uppercase text-amber pt-1">
              Who we are
            </p>
            <p className="font-sans font-light text-charcoal/80 text-sm leading-relaxed">
              DineSotto is an independent, community-driven directory of London
              restaurants rated by noise level. Run by Andreea, London. Contact:{" "}
              <a
                href={`mailto:${email}`}
                className="text-green-600 underline underline-offset-2"
              >
                {email}
              </a>
            </p>
          </div>

          <div className="h-px bg-warm-border" />

          <div className="grid md:grid-cols-[120px_1fr] gap-6">
            <p className="font-sans text-[0.6rem] tracking-[0.18em] uppercase text-amber pt-1">
              What we collect
            </p>
            <div className="font-sans font-light text-charcoal/80 text-sm leading-relaxed flex flex-col gap-6">
              {[
                {
                  label: "When you submit a rating",
                  items: [
                    "Your ratings and optional review text",
                    "The time and date of submission",
                    "Your IP address — used only to detect spam and abuse, never shared or sold",
                  ],
                },
                {
                  label: "When you suggest a restaurant",
                  items: [
                    "The information you provide in the form",
                    "Your IP address",
                  ],
                },
                {
                  label: "When you contact us",
                  items: [
                    "Your name and email address",
                    "The content of your message",
                  ],
                },
                {
                  label: "Automatically collected",
                  items: [
                    "Basic analytics via Google Analytics 4 (page views, traffic sources, device type)",
                    "Google Maps usage data when you use the map view",
                  ],
                },
              ].map(({ label, items }) => (
                <div key={label}>
                  <p className="font-sans text-[0.6rem] tracking-[0.12em] uppercase text-muted/50 mb-3">
                    {label}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="text-amber mt-0.5 shrink-0">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-warm-border" />

          <div className="grid md:grid-cols-[120px_1fr] gap-6">
            <p className="font-sans text-[0.6rem] tracking-[0.18em] uppercase text-amber pt-1">
              What we don't
            </p>
            <div className="font-sans font-light text-charcoal/80 text-sm leading-relaxed">
              <ul className="flex flex-col gap-3">
                {[
                  "Your name — ratings are fully anonymous",
                  "Your email address — unless you contact us directly",
                  "Any payment information",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-amber mt-0.5 shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="h-px bg-warm-border" />

          <div className="grid md:grid-cols-[120px_1fr] gap-6">
            <p className="font-sans text-[0.6rem] tracking-[0.18em] uppercase text-amber pt-1">
              Why we collect it
            </p>
            <div className="font-sans font-light text-charcoal/80 text-sm leading-relaxed">
              <ul className="flex flex-col gap-3">
                {[
                  "IP addresses — to prevent spam and abuse only. Not shared, not sold.",
                  "Contact details — to respond to your message only.",
                  "Analytics — to understand how the site is used and improve it.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-amber mt-0.5 shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="h-px bg-warm-border" />

          <div className="grid md:grid-cols-[120px_1fr] gap-6">
            <p className="font-sans text-[0.6rem] tracking-[0.18em] uppercase text-amber pt-1">
              How long
            </p>
            <div className="font-sans font-light text-charcoal/80 text-sm leading-relaxed">
              <ul className="flex flex-col gap-3">
                {[
                  "Ratings — indefinitely (they are the product)",
                  "Contact messages — 12 months",
                  "Analytics — as per Google Analytics data retention settings",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-amber mt-0.5 shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="h-px bg-warm-border" />

          <div className="grid md:grid-cols-[120px_1fr] gap-6">
            <p className="font-sans text-[0.6rem] tracking-[0.18em] uppercase text-amber pt-1">
              Your rights
            </p>
            <div className="font-sans font-light text-charcoal/80 text-sm leading-relaxed flex flex-col gap-4">
              <p>Under UK GDPR, you have the right to:</p>
              <ul className="flex flex-col gap-3">
                {[
                  "Access the data we hold about you",
                  "Request deletion of your data",
                  "Object to how we use your data",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-amber mt-0.5 shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                Email{" "}
                <a
                  href={`mailto:${email}`}
                  className="text-green-600 underline underline-offset-2"
                >
                  {email}
                </a>{" "}
                and we'll respond within 30 days.
              </p>
            </div>
          </div>

          <div className="h-px bg-warm-border" />

          <div className="grid md:grid-cols-[120px_1fr] gap-6">
            <p className="font-sans text-[0.6rem] tracking-[0.18em] uppercase text-amber pt-1">
              Cookies
            </p>
            <div className="font-sans font-light text-charcoal/80 text-sm leading-relaxed flex flex-col gap-4">
              <ul className="flex flex-col gap-3">
                {[
                  "Google Analytics 4 — page views, traffic sources, and performance data",
                  "Google Maps — required for the map feature",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-amber mt-0.5 shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="font-sans text-[0.7rem] tracking-wide uppercase text-muted/50 border border-warm-border rounded px-4 py-3">
                We do not use advertising or tracking cookies.
              </p>
            </div>
          </div>

          <div className="h-px bg-warm-border" />

          <div className="grid md:grid-cols-[120px_1fr] gap-6">
            <p className="font-sans text-[0.6rem] tracking-[0.18em] uppercase text-amber pt-1">
              Third parties
            </p>
            <div className="font-sans font-light text-charcoal/80 text-sm leading-relaxed flex flex-col gap-4">
              <ul className="flex flex-col gap-3">
                {[
                  "Supabase — database, hosted in EU",
                  "Vercel — hosting",
                  "Google Maps — map feature",
                  "Google Analytics 4 — usage analytics",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-amber mt-0.5 shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                None of these services receive your personal data beyond what is
                technically necessary to operate the site.
              </p>
            </div>
          </div>

          <div className="h-px bg-warm-border" />

          <div className="grid md:grid-cols-[120px_1fr] gap-6">
            <p className="font-sans text-[0.6rem] tracking-[0.18em] uppercase text-amber pt-1">
              Changes
            </p>
            <p className="font-sans font-light text-charcoal/80 text-sm leading-relaxed">
              We may update this policy. The date at the top shows when it was
              last changed.
            </p>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-20 pt-10 border-t border-warm-border">
          <p className="font-display italic text-green-700/50 text-sm">
            Questions about your data?{" "}
            <a
              href={`mailto:${email}`}
              className="text-green-600 underline underline-offset-2 not-italic font-sans text-xs"
            >
              Get in touch →
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
