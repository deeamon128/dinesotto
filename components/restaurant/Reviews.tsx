const REVIEWS = [
  {
    id: 1,
    timeSlot: "Lunch",
    day: "Wednesday",
    musicScore: 8,
    crowdScore: 7,
    text: "Genuinely one of the quietest spots in Mayfair at lunch. We could have a full conversation without leaning in. Music was soft and unobtrusive.",
    date: "March 2025",
  },
  {
    id: 2,
    timeSlot: "Peak Evening",
    day: "Friday",
    musicScore: 6,
    crowdScore: 5,
    text: "Gets noticeably busier on Friday evenings — still manageable but not ideal if you need to hear well. Lunch is far better.",
    date: "February 2025",
  },
  {
    id: 3,
    timeSlot: "Early Evening",
    day: "Tuesday",
    musicScore: 9,
    crowdScore: 8,
    text: "Perfect for a business dinner. Arrived at 6pm and had the place almost to ourselves. Staff were attentive without hovering.",
    date: "January 2025",
  },
];

export default function Reviews() {
  return (
    <section className="bg-ivory-dark py-16 px-8 border-t border-warm-border">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-amber mb-2">
            Community
          </p>
          <h2 className="font-display text-3xl font-light italic text-green-700">
            Recent visits
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-ivory rounded border border-warm-border p-6"
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="font-sans text-[0.62rem] tracking-[0.1em] uppercase px-2.5 py-1 rounded-full bg-green-50 text-green-600">
                    {review.timeSlot}
                  </span>
                  <span className="font-sans text-xs text-muted/50">
                    {review.day}
                  </span>
                </div>
                <span className="font-sans text-[0.6rem] text-muted/40">
                  {review.date}
                </span>
              </div>

              {/* Score bars */}
              <div className="flex gap-8 mb-4">
                {[
                  { label: "Music", score: review.musicScore },
                  { label: "Crowd", score: review.crowdScore },
                ].map(({ label, score }) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="font-sans text-[0.6rem] tracking-[0.1em] uppercase text-muted/50 w-10">
                      {label}
                    </span>
                    <div className="w-24 h-1 bg-warm-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${score * 10}%` }}
                      />
                    </div>
                    <span className="font-display text-sm text-green-600">
                      {score}
                    </span>
                  </div>
                ))}
              </div>

              {/* Review text */}
              <p className="font-display italic text-charcoal/80 text-base leading-[1.7]">
                "{review.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
