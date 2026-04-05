const STEPS = [
  {
    number: "01",
    heading: "A real visit",
    body: "Someone visits the restaurant and submits their experience — the time of day, music level, crowd noise, and table spacing. No scraped reviews, guesswork, or AI summaries. Just a person who was actually there.",
  },
  {
    number: "02",
    heading: "Time-aware data",
    body: "Every rating is tagged to a time slot and day of the week, because a Tuesday lunch and a Friday evening are completely different experiences. When enough ratings come in, you can see exactly how noise changes through the day and choose the window that works for you.",
  },
  {
    number: "03",
    heading: "A weighted score",
    body: "Crowd noise counts for half the score, because it is the hardest thing to escape. Music and table spacing each make up a quarter. If a room is packed and loud, no amount of quiet music will make it a peaceful dinner — and the score reflects that honestly.",
  },
];

export default function HowWeCalculate() {
  return (
    <section
      id="how"
      className="bg-ivory-dark py-24 px-8 border-t border-warm-border"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-amber mb-3">
            Transparency
          </p>
          <h2 className="font-display text-4xl font-light italic text-green-700 mb-4">
            How every score is calculated.
          </h2>
          <p className="font-sans font-light text-muted text-sm  leading-relaxed">
            Real people, real visits, real data. You can always see how many
            ratings a restaurant has. We never hide thin data behind a polished
            score
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
