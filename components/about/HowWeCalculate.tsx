const STEPS = [
  {
    number: "01",
    heading: "A real visit",
    body: "Someone visits the restaurant and submits their experience — time of day, music level, crowd noise, and table spacing. No algorithms, no scraped reviews.",
  },
  {
    number: "02",
    heading: "Time-aware data",
    body: "Every rating is tagged to a time slot. Lunch ratings are kept separate from peak evening. You see the full picture, not a misleading average.",
  },
  {
    number: "03",
    heading: "Confidence scoring",
    body: "A restaurant with 3 ratings shows a warning. One with 50 shows a verified badge. You always know exactly how much to trust a score.",
  },
];

export default function HowWeCalculate() {
  return (
    <section className="bg-ivory-dark py-24 px-8 border-t border-warm-border">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-amber mb-3">
            Transparency
          </p>
          <h2 className="font-display text-4xl font-light italic text-green-700 mb-4">
            How every score is calculated.
          </h2>
          <p className="font-sans font-light text-muted text-sm max-w-md">
            No algorithms guessing from old reviews. Real people, real visits,
            real data.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS.map(({ number, heading, body }) => (
            <div
              key={number}
              className="bg-ivory rounded border border-warm-border p-8"
            >
              <span className="font-display text-5xl font-light text-amber/40 block mb-6">
                {number}
              </span>
              <h3 className="font-display text-xl font-medium text-green-800 mb-3">
                {heading}
              </h3>
              <p className="font-sans font-light text-muted text-sm leading-relaxed">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
