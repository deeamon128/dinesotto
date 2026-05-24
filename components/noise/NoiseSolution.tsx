export default function NoiseSolutions() {
  return (
    <section className="bg-ivory py-24 px-8 border-t border-warm-border">
      <div className="max-w-5xl mx-auto">
        <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-amber mb-4">
          What could change
        </p>
        <h2 className="font-display text-4xl font-light italic text-green-700 mb-16">
          Restaurants don't need to be silent to be welcoming. They just need to
          give people a choice.
        </h2>

        <div className="flex flex-col gap-16">
          {/* Tier 1 */}
          <div className="grid md:grid-cols-[180px_1fr] gap-6">
            <p className="font-sans text-[0.6rem] tracking-[0.18em] uppercase text-amber pt-1">
              Tomorrow, no budget
            </p>
            <ul className="flex flex-col gap-4">
              {[
                "Turn the music down during lunch service as even 10 decibels makes a measurable difference.",
                "Offer a quieter table on request. Train staff to ask at booking.",
                "Add tablecloths, cushions, or curtains. Soft furnishings absorb sound immediately.",
                "Post your quietest times on your Google listing and website.",
                "Designate a quiet section of the room, away from the bar and kitchen.",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 font-sans font-light text-charcoal/80 text-sm leading-relaxed"
                >
                  <span className="text-amber mt-0.5 shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="h-px bg-warm-border" />

          {/* Tier 2 */}
          <div className="grid md:grid-cols-[180px_1fr] gap-6">
            <p className="font-sans text-[0.6rem] tracking-[0.18em] uppercase text-amber pt-1">
              Worth investing in
            </p>
            <ul className="flex flex-col gap-4">
              {[
                "Acoustic panels on ceilings and walls. They don't have to be ugly.",
                "Separate the bar from the dining room. A bar noise is the biggest offender.",
                "Smaller dining zones instead of one large reflective room.",
                "Upholstered seating and carpeted floors where possible.",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 font-sans font-light text-charcoal/80 text-sm leading-relaxed"
                >
                  <span className="text-amber mt-0.5 shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="h-px bg-warm-border" />

          {/* Tier 3 */}
          <div className="grid md:grid-cols-[180px_1fr] gap-6">
            <p className="font-sans text-[0.6rem] tracking-[0.18em] uppercase text-amber pt-1">
              The bigger picture
            </p>
            <ul className="flex flex-col gap-4">
              {[
                "Noise level disclosure at booking, the same way allergen information is now required.",
                "A quiet dining certification, a recognised standard restaurants can earn, based on real community data rather than a single inspection.",
                "Building regulations requiring acoustic standards in new restaurant fit-outs.",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 font-sans font-light text-charcoal/80 text-sm leading-relaxed"
                >
                  <span className="text-amber mt-0.5 shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
