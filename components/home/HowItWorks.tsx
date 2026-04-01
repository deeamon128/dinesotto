const STEPS = [
  {
    number: "01",
    heading: "Browse by noise level",
    body: "Every restaurant is rated for music volume, crowd noise, and table spacing.",
  },
  {
    number: "02",
    heading: "Check the time heatmap",
    body: "See exactly how loud a restaurant gets at lunch vs peak evening. Pick the right moment.",
  },
  {
    number: "03",
    heading: "Rate your visit",
    body: "Been somewhere quiet? Add your rating. Every submission helps someone else find their perfect table.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-ivory py-24 px-8 border-t border-warm-border">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-amber mb-3">
            How it works
          </p>
          <h2 className="font-display text-4xl font-light italic text-green-700">
            Simple, honest, community-driven
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {STEPS.map(({ number, heading, body }) => (
            <div key={number} className="flex flex-col">
              <span className="font-display text-5xl font-light text-amber/50 mb-4">
                {number}
              </span>
              <h3 className="font-display text-xl font-medium text-green-800 mb-3">
                {heading}
              </h3>
              <p className="font-sans font-light text-muted text-sm leading-relaxed">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
