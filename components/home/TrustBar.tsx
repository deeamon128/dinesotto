const STATS = [
  { number: "482", label: "Restaurants Listed" },
  { number: "261", label: "Verified Quiet" },
  { number: "8,4k", label: "Community Ratings" },
  { number: "32", label: "London Boroughs" },
];

export default function TrustBar() {
  return (
    <section className="bg-ivory border-y border-warm-border">
      <div className="max-w-4xl mx-auto px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map(({ number, label }, i) => (
          <div
            key={label}
            className={`
              text-center
              ${i < 3 ? "md:border-r md:border-warm-border" : ""}
            `}
          >
            <p className="font-display text-4xl font-light text-green-600 mb-1">
              {number}
            </p>
            <p className="font-sans text-[0.65rem] tracking-[0.15em] uppercase text-muted">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
