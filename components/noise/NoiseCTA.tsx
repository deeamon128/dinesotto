import Link from "next/link";

export default function NoiseCTA() {
  return (
    <section className="bg-ivory py-24 px-8 border-t border-warm-border">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-display text-4xl font-light italic text-green-700 mb-4">
          Find your quiet table.
        </h2>
        <p className="font-sans font-light text-muted text-sm mb-10 leading-relaxed">
          DineSotto lists London restaurants rated by noise level, time of day,
          and table spacing — so you can choose with confidence.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/explore"
            className="bg-green-600 hover:bg-green-500 text-white font-sans text-sm tracking-wide px-6 py-3 rounded transition-colors"
          >
            Explore Restaurants
          </Link>
          <Link
            href="/rate"
            className="border border-warm-border hover:border-green-400 text-muted hover:text-green-600 font-sans text-sm tracking-wide px-6 py-3 rounded transition-all"
          >
            Rate a Visit
          </Link>
        </div>
      </div>
    </section>
  );
}
