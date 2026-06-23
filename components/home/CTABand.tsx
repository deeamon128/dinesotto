import Link from "next/link";

export default function CTABand() {
  return (
    <section className="bg-green-900 py-20 px-8">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-display text-4xl font-light italic text-green-100 mb-4">
          Had a meal lately? Help the next person choose.
        </h2>
        <p className="font-sans font-light text-green-300/60 text-sm mb-10 leading-relaxed">
          Every rating helps someone else avoid the wrong table. Takes ~3
          minutes.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            href="/suggest"
            className="bg-green-600 hover:bg-green-500 text-white font-sans text-sm tracking-wide px-6 py-3 rounded transition-colors"
          >
            Rate a Recent Visit
          </Link>
          <Link
            href="/rate"
            className="border border-green-300/25 hover:border-green-300/50 text-green-300/70 hover:text-green-100 font-sans text-sm tracking-wide px-6 py-3 rounded transition-all"
          >
            Suggest a Restaurant
          </Link>
        </div>
      </div>
    </section>
  );
}
