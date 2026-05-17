const EFFECTS = [
  {
    heading: "The Lombard Effect",
    body: "When background noise rises above a comfortable level, everyone at the table involuntarily raises their voice to be heard. This increases the overall noise, which causes everyone to raise their voices further. The room gets louder simply by being full. Research places the threshold where this cycle accelerates at around 50 to 58 dB. Most busy London restaurants sit well above that.",
    source: "PMC9023576",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9023576/",
  },
  {
    heading: "Cognitive overload",
    body: "When your brain works harder to filter background noise and follow a conversation, it draws on the same resources needed for memory, problem solving and concentration. Those resources are finite. You leave the table having spent them.",
    source: "PMC10088431",
    href: "https://link.springer.com/article/10.1007/s10111-023-00746-2",
  },
  {
    heading: "Stress and cortisol",
    body: "Research has found that loud environments suppress the perception of sweetness and sourness, meaning food genuinely tastes different in a noisy room. Background noise also reduces our ability to appreciate aroma and flavour complexity, affecting the overall satisfaction of the dining experience",
    source: "PMC10088431",
    href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10088431/",
  },
  {
    heading: "It even changes how food tastes",
    body: "Research has found that loud environments suppress the perception of sweetness and sourness, meaning food genuinely tastes different in a noisy room. Background noise also reduces our ability to appreciate aroma and flavour complexity, affecting the overall satisfaction of the dining experience.",
    source: "PMC9023576",
    href: "https://link.springer.com/article/10.1186/2044-7248-3-9",
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
