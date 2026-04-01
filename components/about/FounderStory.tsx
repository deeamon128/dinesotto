export default function FounderStory() {
  return (
    <section className="bg-ivory py-24 px-8">
      <div className="max-w-2xl mx-auto">
        <p className="font-sans font-light text-charcoal text-lg leading-[1.85] mb-8">
          <span
            aria-hidden="true"
            className="font-display text-7xl font-light text-green-700 float-left leading-[0.8] mr-3 mt-2"
          >
            I
          </span>
          <span className="sr-only">I </span>
          built DineSotto because I needed it. I am hard of hearing, and for
          years I kept choosing the wrong restaurants for dates, for meetings,
          for dinners that mattered. I smiled and nodded through conversations I
          could not hear, and went home more exhausted than when I arrived.
        </p>

        <p className="font-sans font-light text-charcoal text-lg leading-[1.85] mb-8">
          What I wanted was simple: something that told me honestly what a
          restaurant actually sounds like at 7pm on a Friday, with a full room
          and music playing. Not a star rating or a mood description, but real
          information from real people who had sat there. I could not find it
          anywhere, so I built it myself.
        </p>

        <p className="font-sans font-light text-charcoal text-lg leading-[1.85] mb-8">
          DineSotto is free, independent, and community-driven. Every rating
          comes from a real person who sat at a real table. I have not visited
          every restaurant on here, and we never pretend otherwise. You have
          been to these places. Your experience is the whole point.
        </p>

        <p className="font-sans font-light text-charcoal text-lg leading-[1.85] mb-8">
          If you have ever struggled to follow a conversation across a
          restaurant table, or left a dinner feeling more drained than when you
          arrived, this was built for you too.
        </p>

        {/* Founder signature */}
        <div className="border-t border-warm-border pt-8">
          <p className="font-display text-2xl italic text-green-700 mb-1">
            Andreea
          </p>
          <div className="w-16 h-px bg-amber mt-2 mb-3" />
          <p className="font-sans text-xs tracking-[0.12em] uppercase text-muted/60">
            Founder, DineSotto
          </p>
        </div>
      </div>
    </section>
  );
}
