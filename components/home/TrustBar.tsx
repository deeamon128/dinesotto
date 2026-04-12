type Props = {
  totalRestaurants: number;
  verifiedCount: number;
  ratingsCount: number;
};

export default function TrustBar({
  totalRestaurants = 0,
  verifiedCount = 0,
  ratingsCount = 0,
}: Props) {
  const STATS = [
    {
      number: totalRestaurants.toString(),
      label: "Restaurants Listed",
    },
    {
      number: verifiedCount.toString(),
      label: "Founder Visits",
    },
    {
      number:
        ratingsCount >= 1000
          ? `${(ratingsCount / 1000).toFixed(1)}k`
          : ratingsCount > 0
            ? ratingsCount.toString()
            : "Growing",
      label: "Community Ratings",
    },
    {
      number: "32",
      label: "London Boroughs",
    },
  ];

  return (
    <section className="bg-ivory border-y border-warm-border">
      <div className="max-w-4xl mx-auto px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map(({ number, label }, i) => (
          <div
            key={label}
            className={`text-center ${i < 3 ? "md:border-r md:border-warm-border" : ""}`}
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
