const EFFECTS = [
  {
    heading: "The Lombard Effect",
    body: "When background noise rises above a comfortable level, everyone at the table involuntarily raises their voice to be heard. This increases the overall noise, which causes everyone to raise their voices further. The room gets louder simply by being full. Research shows this cycle begins above around 50 dB — well below the level of most busy London restaurants.",
    source: "PMC9023576",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9023576/",
  },
  {
    heading: "Cognitive overload",
    body: "When your brain works harder to filter background noise and follow a conversation, it uses the same cognitive resources needed for memory, problem solving, and concentration. A noisy dinner is not just uncomfortable — it is genuinely tiring. This is why you can leave a meal feeling more drained than when you arrived, even if you had a good time.",
    source: "PMC10088431",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10088431/",
  },
  {
    heading: "Stress and cortisol",
    body: "Noise exposure activates the sympathetic nervous system — the same physiological response as stress. Studies show that louder environments correlate with elevated cortisol levels. For people already navigating noisy commutes, open-plan offices, and busy streets, a loud restaurant is one more demand on a system that may already be running close to its limit.",
    source: "PMC10088431",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10088431/",
  },
  {
    heading: "It even changes how food tastes",
    body: "Research has found that loud environments suppress the perception of saltiness and amplify bitterness, meaning food genuinely tastes different in a noisy room. Noise also correlates with faster eating, higher alcohol consumption, and less satisfaction with the overall experience — effects that benefit restaurant revenue but not the diner.",
    source: "PMC9023576",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9023576/",
  },
];

export default function NoiseEffects() {
  return (
    <section className="bg-ivory-dark py-24 px-8 border-t border-warm-border">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-amber mb-3">
            What the research shows
          </p>
          <h2 className="font-display text-4xl font-light italic text-green-700">
            What loud restaurants actually do to you.
          </h2>
        </div>

        <div className="flex flex-col gap-px bg-warm-border">
          {EFFECTS.map(({ heading, body, source, href }) => (
            <div
              key={heading}
              className="bg-ivory-dark grid md:grid-cols-[200px_1fr] gap-8 p-10"
            >
              <h3 className="font-display text-lg italic text-green-700 leading-snug">
                {heading}
              </h3>
              <div className="flex flex-col gap-4">
                <p className="font-sans font-light text-charcoal/80 text-sm leading-relaxed">
                  {body}
                </p>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[0.6rem] tracking-wide uppercase text-muted/40 hover:text-green-600 transition-colors"
                >
                  Source: {source} ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
