import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms and conditions for using DineSotto.",
};

export default function TermsPage() {
  const email = "hello@dinesotto.com";

  return (
    <main className="bg-ivory min-h-screen">
      <div className="max-w-2xl mx-auto px-8 py-32">
        <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-amber mb-3">
          Legal
        </p>
        <h1 className="font-display text-4xl font-light italic text-green-700 mb-2">
          Terms of Use
        </h1>
        <p className="font-sans text-xs text-muted/50 mb-16">
          Last updated: March 2026
        </p>

        <div className="flex flex-col gap-12 font-sans font-light text-charcoal/80 text-sm leading-relaxed">
          <section>
            <h2 className="font-display text-xl italic text-green-700 mb-4">
              Who we are
            </h2>
            <p>
              DineSotto is an independent, community-driven directory of London
              restaurants rated by noise level. It is operated by Andreea,
              London, UK. Contact:{" "}
              <a href={`mailto:${email}`} className="text-green-600 underline">
                {email}
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl italic text-green-700 mb-4">
              What DineSotto is
            </h2>
            <p className="mb-4">
              DineSotto is a platform for sharing personal dining experiences.
              All ratings and reviews reflect the individual opinions of
              visitors at a specific time and date. They are not statements of
              fact.
            </p>
            <p>
              We do not guarantee the accuracy, completeness, or timeliness of
              any rating. Noise levels change. A restaurant that was quiet on a
              Tuesday lunch may be loud on a Friday evening. Always check the
              time slot and rating count before making decisions.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl italic text-green-700 mb-4">
              Your ratings
            </h2>
            <p className="mb-4">By submitting a rating you confirm that:</p>
            <ul className="flex flex-col gap-2 pl-4 border-l border-warm-border mb-4">
              <li>It reflects your genuine personal experience</li>
              <li>It is not defamatory, abusive, or deliberately misleading</li>
              <li>
                You are not submitting on behalf of a restaurant or competitor
              </li>
            </ul>
            <p>
              We reserve the right to remove any rating that violates these
              terms without notice.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl italic text-green-700 mb-4">
              Restaurants
            </h2>
            <p className="mb-4">
              If you are a restaurant owner and believe a rating is inaccurate
              or unfair, contact us at{" "}
              <a href={`mailto:${email}`} className="text-green-600 underline">
                {email}
              </a>
              . We will review all legitimate disputes within 14 days.
            </p>
            <p>We do not accept payment to remove or alter ratings.</p>
          </section>

          <section>
            <h2 className="font-display text-xl italic text-green-700 mb-4">
              Limitation of liability
            </h2>
            <p>
              DineSotto is provided as-is. We are not liable for any decisions
              made based on ratings or information on this site. Use your own
              judgement.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl italic text-green-700 mb-4">
              Changes
            </h2>
            <p>
              We may update these terms at any time. Continued use of the site
              means you accept the current terms.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
