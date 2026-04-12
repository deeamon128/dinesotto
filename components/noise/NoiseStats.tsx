const STATS = [
  {
    number: "1 in 6",
    label: "people in the UK live with hearing loss",
    context:
      "That is 12 million people today, rising to 14.2 million by 2035. Most restaurant guides ignore all of them.",
    source: "Hearing Review",
    href: "https://hearingreview.com/hearing-loss/most-adult-britons-struggle-hear-noisy-environments",
  },
  {
    number: "62%",
    label: "of UK adults struggle to hear conversations in noisy environments",
    context:
      "Nearly two in three people are affected — not just those with diagnosed hearing loss. This is the cocktail party problem, experienced by almost everyone.",
    source: "Hearing Review",
    href: "https://hearingreview.com/hearing-loss/most-adult-britons-struggle-hear-noisy-environments",
  },
  {
    number: "76 dB+",
    label: "is the average noise level in many London restaurants",
    context:
      "Above this threshold, normal conversation becomes genuinely difficult. Some London venues exceed 90 dB — louder than a lawnmower.",
    source: "Quiet Coalition",
    href: "https://quietcoalition.org/londons-restaurants-are-the-loudest-in-europe/",
  },
  {
    number: "91%",
    label: "of people say they would not return to a loud venue",
    context:
      "And close to eight in ten UK residents have already left a restaurant, café or bar because it was too loud.",
    source: "SoundPrint Research",
    href: "https://www.soundprint.co/blog/noise-in-restaurants",
  },
];

export default function NoiseStats() {
  return (
    <section className="bg-ivory py-24 px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-amber mb-3">
            The numbers
          </p>
          <h2 className="font-display text-4xl font-light italic text-green-700">
            The scale of the problem.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-warm-border">
          {STATS.map(({ number, label, context, source, href }) => (
            <div key={number} className="bg-ivory p-10 flex flex-col gap-4">
              <p className="font-display text-6xl font-light text-green-600 leading-none">
                {number}
              </p>
              <p className="font-display text-lg italic text-green-800">
                {label}
              </p>
              <p className="font-sans font-light text-muted text-sm leading-relaxed flex-1">
                {context}
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
          ))}
        </div>
      </div>
    </section>
  );
}
