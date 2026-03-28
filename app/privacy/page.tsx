import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How DineSotto collects and uses your data.",
};

export default function PrivacyPage() {
  const email = "hello@dinesotto.com";
  return (
    <main className="bg-ivory min-h-screen">
      <div className="max-w-2xl mx-auto px-8 py-32">
        <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-amber mb-3">
          Legal
        </p>
        <h1 className="font-display text-4xl font-light italic text-green-700 mb-2">
          Privacy Policy
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
              What we collect
            </h2>
            <p className="mb-4">
              <span className="font-medium text-charcoal">
                When you submit a rating:
              </span>
            </p>
            <ul className="flex flex-col gap-2 mb-6 pl-4 border-l border-warm-border">
              <li>Your ratings and optional review text</li>
              <li>The time and date of submission</li>
              <li>
                Your IP address — used only to detect spam and abuse, never
                shared or sold
              </li>
            </ul>
            <p className="mb-4">
              <span className="font-medium text-charcoal">
                When you suggest a restaurant:
              </span>
            </p>
            <ul className="flex flex-col gap-2 mb-6 pl-4 border-l border-warm-border">
              <li>The information you provide in the form</li>
              <li>Your IP address</li>
            </ul>
            <p className="mb-4">
              <span className="font-medium text-charcoal">
                When you contact us:
              </span>
            </p>
            <ul className="flex flex-col gap-2 mb-6 pl-4 border-l border-warm-border">
              <li>Your name and email address</li>
              <li>The content of your message</li>
            </ul>
            <p className="mb-4">
              <span className="font-medium text-charcoal">
                Automatically collected:
              </span>
            </p>
            <ul className="flex flex-col gap-2 pl-4 border-l border-warm-border">
              <li>
                Basic analytics via Google Analytics 4 (page views, traffic
                sources, device type)
              </li>
              <li>Google Maps usage data when you use the map view</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl italic text-green-700 mb-4">
              What we do not collect
            </h2>
            <ul className="flex flex-col gap-2 pl-4 border-l border-warm-border">
              <li>Your name — ratings are fully anonymous</li>
              <li>Your email address — unless you contact us directly</li>
              <li>Any payment information</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl italic text-green-700 mb-4">
              Why we collect it
            </h2>
            <ul className="flex flex-col gap-2 pl-4 border-l border-warm-border">
              <li>
                IP addresses — to prevent spam and abuse only. Not shared, not
                sold, deleted after 90 days.
              </li>
              <li>Contact details — to respond to your message only.</li>
              <li>
                Analytics — to understand how the site is used and improve it.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl italic text-green-700 mb-4">
              How long we keep it
            </h2>
            <ul className="flex flex-col gap-2 pl-4 border-l border-warm-border">
              <li>Ratings — indefinitely (they are the product)</li>
              <li>IP addresses — 90 days, then deleted</li>
              <li>Contact messages — 12 months</li>
              <li>
                Analytics — as per Google Analytics data retention settings
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl italic text-green-700 mb-4">
              Your rights (UK GDPR)
            </h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="flex flex-col gap-2 pl-4 border-l border-warm-border mb-4">
              <li>Access the data we hold about you</li>
              <li>Request deletion of your data</li>
              <li>Object to how we use your data</li>
            </ul>
            <p>
              To exercise any of these rights, email{" "}
              <a href={`mailto:${email}`} className="text-green-600 underline">
                {email}
              </a>
              . We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl italic text-green-700 mb-4">
              Cookies
            </h2>
            <p className="mb-4">DineSotto uses minimal cookies:</p>
            <ul className="flex flex-col gap-2 pl-4 border-l border-warm-border">
              <li>
                Google Analytics 4 — page views, traffic sources, and
                performance data
              </li>
              <li>Google Maps — required for the map feature</li>
            </ul>
            <p className="mt-4">
              We do not use advertising or tracking cookies.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl italic text-green-700 mb-4">
              Third parties
            </h2>
            <ul className="flex flex-col gap-2 pl-4 border-l border-warm-border">
              <li>Supabase — database, hosted in EU</li>
              <li>Vercel — hosting</li>
              <li>Google Maps — map feature</li>
              <li>Google Analytics 4 — usage analytics</li>
            </ul>
            <p className="mt-4">
              None of these services receive your personal data beyond what is
              technically necessary to operate the site.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl italic text-green-700 mb-4">
              Changes
            </h2>
            <p>
              We may update this policy. The date at the top shows when it was
              last changed.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
