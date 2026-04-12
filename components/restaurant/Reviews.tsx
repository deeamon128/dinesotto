interface Review {
  id: string;
  time_slot: string;
  day_of_week: string;
  music_score: number;
  crowd_score: number;
  spacing_score: number;
  review_text: string | null;
  created_at: string;
}

interface Props {
  reviews: Review[];
}

const TIME_LABEL: Record<string, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  afternoon: "Afternoon",
  early_evening: "Early Evening",
  peak_evening: "Peak Evening",
  late: "Late",
};

const DAY_LABEL: Record<string, string> = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

export default function Reviews({ reviews }: Props) {
  if (reviews.length === 0) {
    return (
      <section className="bg-ivory-dark py-16 px-8 border-t border-warm-border">
        <div className="max-w-5xl mx-auto text-center py-8">
          <p className="font-display text-2xl italic text-muted/40 mb-2">
            No reviews yet
          </p>
          <p className="font-sans text-sm text-muted/40">
            Be the first to share your experience.
          </p>
        </div>
      </section>
    );
  }

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
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-ivory rounded border border-warm-border p-4 md:p-6"
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-4 gap-2 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-sans text-[0.62rem] tracking-[0.1em] uppercase px-2.5 py-1 rounded-full bg-green-50 text-green-600">
                    {TIME_LABEL[review.time_slot] ?? review.time_slot}
                  </span>
                  <span className="font-sans text-xs text-muted/50">
                    {DAY_LABEL[review.day_of_week] ?? review.day_of_week}
                  </span>
                </div>
                <span className="font-sans text-[0.6rem] text-muted/40 shrink-0">
                  {new Date(review.created_at).toLocaleDateString("en-GB", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>

              {/* Score bars */}
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                {[
                  { label: "Music", score: review.music_score },
                  { label: "Crowd", score: review.crowd_score },
                  { label: "Spacing", score: review.spacing_score },
                ].map(({ label, score }) => (
                  <div key={label} className="flex items-center gap-3 flex-1">
                    <span className="font-sans text-[0.6rem] tracking-[0.1em] uppercase text-muted/50 w-10 shrink-0">
                      {label}
                    </span>
                    <div className="flex-1 h-1 bg-warm-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${score * 20}%` }}
                      />
                    </div>
                    <span className="font-display text-sm text-green-600 shrink-0">
                      {score}/5
                    </span>
                  </div>
                ))}
              </div>

              {/* Review text */}
              {review.review_text && (
                <p className="font-display italic text-charcoal/80 text-base leading-[1.7]">
                  "{review.review_text}"
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
