export default function NoiseHero() {
  return (
    <section className="relative bg-green-900 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-amber/10 blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 grain opacity-30 pointer-events-none" />
      <div className="relative z-10 max-w-2xl mx-auto px-8 pt-32 pb-24">
        <p className="font-sans text-[0.65rem] tracking-[0.22em] uppercase text-green-300/40 mb-4">
          The science
        </p>
        <h1 className="font-display text-5xl md:text-6xl font-light italic text-green-100 leading-[1.1] mb-8">
          Why noise matters more than you think.
        </h1>
        <p className="font-sans font-light text-green-300/60 text-sm leading-relaxed max-w-lg">
          Loud restaurants are not just annoying. They affect how you hear, how
          you feel, how your food tastes, and how much energy you have left at
          the end of the evening. The research is clear. The information has
          just never been easy to find.
        </p>
      </div>
    </section>
  );
}
