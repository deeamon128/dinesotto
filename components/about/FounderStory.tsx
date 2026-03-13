export default function FounderStory() {
  return (
    <section className="bg-ivory py-24 px-8">
      <div className="max-w-2xl mx-auto">
        {/* Drop cap first paragraph */}
        <p className="font-sans font-light text-charcoal text-lg leading-[1.85] mb-8">
          <span className="font-display text-7xl font-light text-green-700 float-left leading-[0.8] mr-3 mt-2">
            I
          </span>
          built Sotto because I needed it. I am hard of hearing, and for years I
          chose the wrong restaurants — for dates, for meetings, for dinners
          that mattered. I smiled and nodded through conversations I could not
          hear. I went home exhausted.
        </p>

        <p className="font-sans font-light text-charcoal text-lg leading-[1.85] mb-8">
          I could not find a single resource that told me, honestly, what a
          restaurant actually sounds like. Not a star rating. Not a vibe. The
          real noise — at 7pm on a Friday, with a full room and music playing.
          So I built it myself.
        </p>

        <p className="font-sans font-light text-charcoal text-lg leading-[1.85] mb-12">
          Sotto is free, independent, and community-driven. Every rating comes
          from a real person who sat at a real table. If you have ever struggled
          to hear across a restaurant table, this was built for you.
        </p>

        {/* Founder signature */}
        <div className="border-t border-warm-border pt-8">
          <p className="font-display text-2xl italic text-green-700 mb-1">
            The Sotto Team
          </p>
          <div className="w-16 h-px bg-amber mt-2 mb-3" />
          <p className="font-sans text-xs tracking-[0.12em] uppercase text-muted/60">
            Founder, Sotto
          </p>
        </div>
      </div>
    </section>
  );
}
