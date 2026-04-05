export default function NoiseDesigned() {
  return (
    <section className="bg-green-900 py-24 px-8 relative overflow-hidden">
      <div className="absolute inset-0 grain opacity-20 pointer-events-none" />
      <div className="relative z-10 max-w-2xl mx-auto">
        <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-green-300/40 mb-4">
          The uncomfortable truth
        </p>
        <h2 className="font-display text-4xl font-light italic text-green-100 mb-8">
          Restaurants are often loud on purpose.
        </h2>
        <div className="flex flex-col gap-6 font-sans font-light text-green-300/60 text-sm leading-relaxed">
          <p>
            Modern restaurant design has moved toward hard floors, open
            kitchens, bare walls, and no soft furnishings. These choices amplify
            sound rather than absorb it. The result is an atmosphere that feels
            buzzy and energetic — which research shows causes people to eat
            faster, drink more, and turn over their tables sooner.
          </p>
          <p>
            The financial incentives for louder restaurants are real. The cost
            to diners — in exhaustion, missed conversation, and sensory overload
            — is rarely counted.
          </p>
          <p>
            DineSotto does not exist to campaign against loud restaurants. It
            exists to give you the information to make your own choice before
            you arrive.
          </p>
        </div>
      </div>
    </section>
  );
}
