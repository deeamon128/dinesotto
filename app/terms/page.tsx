import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms and conditions for using DineSotto.",
};

export default function TermsPage() {
  const email = "hello@dinesotto.com";

  return (
    <main className="bg-ivory min-h-screen">
      {/* Hero — warm, personal, not clinical */}
      <section className="relative bg-green-900 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-amber/10 blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 grain opacity-30 pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto px-8 pt-32 pb-20">
          <p className="font-sans text-[0.65rem] tracking-[0.22em] uppercase text-green-300/40 mb-4">
            Legal
          </p>
          <h1 className="font-display text-5xl font-light italic text-green-100 leading-[1.1] mb-6">
            The honest small print.
          </h1>
          <p className="font-sans font-light text-green-300/60 text-sm max-w-md leading-relaxed">
            DineSotto is built by one person, for a community of people who just
            want to enjoy a meal without shouting. These terms reflect that — no
            legalese, no surprises.
          </p>
        </div>
      </section>

      {/* Pull quote */}
      <section className="bg-amber/5 border-y border-amber/20 py-10 px-8">
        <div className="max-w-2xl mx-auto">
          <p className="font-display text-xl italic text-amber/80 leading-relaxed">
            "Every rating is a personal experience at a specific moment in time.
            We share them honestly — and ask you to do the same."
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-2xl mx-auto px-8 py-20">
        <p className="font-sans text-[0.65rem] tracking-[0.15em] uppercase text-muted/40 mb-16">
          Last updated: March 2026
        </p>

        <div className="flex flex-col gap-16">
          {/* Section */}
          <div className="grid md:grid-cols-[120px_1fr] gap-6">
            <p className="font-sans text-[0.6rem] tracking-[0.18em] uppercase text-amber pt-1">
              Who we are
            </p>
            <div className="font-sans font-light text-charcoal/80 text-sm leading-relaxed">
              <p>
                DineSotto is an independent, community-driven directory of
                London restaurants rated by noise level. It's run by Andreea,
                based in London. Questions? Reach us at{" "}
                <a
                  href={`mailto:${email}`}
                  className="text-green-600 underline underline-offset-2"
                >
                  {email}
                </a>
              </p>
            </div>
          </div>

          <div className="h-px bg-warm-border" />

          <div className="grid md:grid-cols-[120px_1fr] gap-6">
            <p className="font-sans text-[0.6rem] tracking-[0.18em] uppercase text-amber pt-1">
              What this is
            </p>
            <div className="font-sans font-light text-charcoal/80 text-sm leading-relaxed flex flex-col gap-4">
              <p>
                DineSotto is a platform for sharing personal dining experiences.
                All ratings reflect the individual opinions of visitors at a
                specific time and date — not statements of fact.
              </p>
              <p>
                Noise levels change. A restaurant that was quiet on a Tuesday
                lunch may be loud on a Friday evening. Always check the time
                slot and rating count before making decisions.
              </p>
            </div>
          </div>

          <div className="h-px bg-warm-border" />

          <div className="grid md:grid-cols-[120px_1fr] gap-6">
            <p className="font-sans text-[0.6rem] tracking-[0.18em] uppercase text-amber pt-1">
              Your ratings
            </p>
            <div className="font-sans font-light text-charcoal/80 text-sm leading-relaxed flex flex-col gap-4">
              <p>By submitting a rating you confirm that:</p>
              <ul className="flex flex-col gap-3">
                {[
                  "It reflects your genuine personal experience",
                  "It is not defamatory, abusive, or deliberately misleading",
                  "You are not submitting on behalf of a restaurant or competitor",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-amber mt-0.5 shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                We reserve the right to remove any rating that violates these
                terms without notice.
              </p>
            </div>
          </div>

          <div className="h-px bg-warm-border" />

          <div className="grid md:grid-cols-[120px_1fr] gap-6">
            <p className="font-sans text-[0.6rem] tracking-[0.18em] uppercase text-amber pt-1">
              Restaurants
            </p>
            <div className="font-sans font-light text-charcoal/80 text-sm leading-relaxed flex flex-col gap-4">
              <p>
                If you're a restaurant owner and believe a rating is inaccurate
                or unfair, contact us at{" "}
                <a
                  href={`mailto:${email}`}
                  className="text-green-600 underline underline-offset-2"
                >
                  {email}
                </a>
                . We review all legitimate disputes within 14 days.
              </p>
              <p className="font-sans text-[0.7rem] tracking-wide uppercase text-muted/50 border border-warm-border rounded px-4 py-3">
                We do not accept payment to remove or alter ratings. Ever.
              </p>
            </div>
          </div>

          <div className="h-px bg-warm-border" />

          <div className="grid md:grid-cols-[120px_1fr] gap-6">
            <p className="font-sans text-[0.6rem] tracking-[0.18em] uppercase text-amber pt-1">
              Liability
            </p>
            <p className="font-sans font-light text-charcoal/80 text-sm leading-relaxed">
              DineSotto is provided as-is. We're not liable for any decisions
              made based on ratings or information on this site. Use your own
              judgement — you know your needs best.
            </p>
          </div>

          <div className="h-px bg-warm-border" />

          <div className="grid md:grid-cols-[120px_1fr] gap-6">
            <p className="font-sans text-[0.6rem] tracking-[0.18em] uppercase text-amber pt-1">
              Changes
            </p>
            <p className="font-sans font-light text-charcoal/80 text-sm leading-relaxed">
              We may update these terms at any time. Continued use of the site
              means you accept the current terms.
            </p>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-20 pt-10 border-t border-warm-border">
          <p className="font-display italic text-green-700/50 text-sm">
            Still have questions?{" "}
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
