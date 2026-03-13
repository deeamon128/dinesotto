export default function AboutHero() {
  return (
    <section className="relative min-h-[50vh] flex items-left bg-green-900 overflow-hidden">
      {/* Amber glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-amber/15 blur-[100px] pointer-events-none" />

      {/* Grain */}
      <div className="absolute inset-0 grain opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto w-full px-8 py-32 text-center">
        <p className="font-sans text-[0.65rem] tracking-[0.22em] uppercase text-green-300/40 mb-4">
          Our Story
        </p>
        <h1 className="font-display text-5xl md:text-6xl font-light italic text-green-100 leading-[1.1] max-w-2xl mx-auto">
          Built by someone who needed it.
          <br />
          <span className="text-amber/80">For everyone who deserves it.</span>
        </h1>
      </div>
    </section>
  );
}
