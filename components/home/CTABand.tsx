import Link from "next/link";

export default function CTABand() {
  return (
    <section className="bg-green-900 py-20 px-8">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-display text-4xl font-light italic text-green-100 mb-4">
          Know a quiet spot?
        </h2>
        <p className="font-sans font-light text-green-300/60 text-sm mb-10 leading-relaxed">
          DineSotto is built by the community, for the community. Every
          suggestion and rating makes the guide better for everyone.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            href="/suggest"
            className="bg-green-600 hover:bg-green-500 text-white font-sans text-sm tracking-wide px-6 py-3 rounded transition-colors"
          >
            Suggest a Restaurant
          </Link>
          <Link
            href="/rate"
            className="border border-green-300/25 hover:border-green-300/50 text-green-300/70 hover:text-green-100 font-sans text-sm tracking-wide px-6 py-3 rounded transition-all"
          >
            Rate a Recent Visit
          </Link>
        </div>
      </div>
    </section>
  );
}
