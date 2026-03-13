export default function ContactSection() {
  return (
    <section className="bg-ivory-dark py-24 px-8 border-t border-warm-border">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Left */}
        <div>
          <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-amber mb-3">
            Get in touch
          </p>
          <h2 className="font-display text-4xl font-light italic text-green-700 mb-6">
            We'd love to hear from you.
          </h2>
          <p className="font-sans font-light text-muted text-sm leading-relaxed mb-10">
            Whether you want to suggest a restaurant, report an inaccurate
            rating, discuss a partnership, or just say hello — we read
            everything.
          </p>

          <div className="flex flex-col gap-0">
            {[
              {
                label: "For restaurants",
                text: "Interested in a Verified Quiet badge?",
              },
              {
                label: "Press & media",
                text: "Writing about quiet dining or accessibility?",
              },
              { label: "Everything else", text: "hello@dinesotto.com" },
            ].map(({ label, text }) => (
              <div key={label} className="py-5 border-b border-warm-border">
                <p className="font-sans text-[0.65rem] tracking-[0.12em] uppercase text-muted/50 mb-1">
                  {label}
                </p>
                <p className="font-sans text-sm text-green-700 font-light">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — contact form */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="font-sans text-[0.65rem] tracking-[0.12em] uppercase text-muted/60">
              Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="bg-ivory border border-warm-border rounded px-4 py-3 font-sans text-sm text-charcoal placeholder:text-muted/40 focus:outline-none focus:border-green-400 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-sans text-[0.65rem] tracking-[0.12em] uppercase text-muted/60">
              Email
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              className="bg-ivory border border-warm-border rounded px-4 py-3 font-sans text-sm text-charcoal placeholder:text-muted/40 focus:outline-none focus:border-green-400 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-sans text-[0.65rem] tracking-[0.12em] uppercase text-muted/60">
              What is this about?
            </label>
            <select className="bg-ivory border border-warm-border rounded px-4 py-3 font-sans text-sm text-charcoal focus:outline-none focus:border-green-400 transition-colors appearance-none">
              <option>General</option>
              <option>Restaurant suggestion</option>
              <option>Partnership</option>
              <option>Press</option>
              <option>Report a rating</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-sans text-[0.65rem] tracking-[0.12em] uppercase text-muted/60">
              Message
            </label>
            <textarea
              rows={5}
              placeholder="How can we help?"
              className="bg-ivory border border-warm-border rounded px-4 py-3 font-sans text-sm text-charcoal placeholder:text-muted/40 focus:outline-none focus:border-green-400 transition-colors resize-none"
            />
          </div>

          <button className="bg-green-600 hover:bg-green-500 text-white font-display italic text-base px-6 py-3.5 rounded transition-colors">
            Send Message
          </button>

          <p className="font-sans text-[0.65rem] text-muted/40 text-center">
            We aim to reply within 2 working days.
          </p>
        </div>
      </div>
    </section>
  );
}
