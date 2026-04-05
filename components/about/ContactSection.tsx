"use client";

import { useState } from "react";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim()) return setError("Please enter your name.");
    if (!email.trim()) return setError("Please enter your email.");
    if (!message.trim()) return setError("Please enter a message.");

    setLoading(true);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, subject, message }),
    });

    setLoading(false);

    if (!response.ok) {
      setError("Something went wrong. Please try again.");
      return;
    }

    setSuccess(true);
  }

  if (success) {
    return (
      <section
        id="contact"
        className="bg-ivory-dark py-24 px-8 border-t border-warm-border"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
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
                  text: "Want to claim your listing or add real photos?",
                  value: "Partnership",
                },
                {
                  label: "Press & media",
                  text: "Writing about quiet dining or accessibility?",
                  value: "Press",
                },
                {
                  label: "Everything else",
                  text: "hello@dinesotto.com",
                  value: "General",
                },
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

          <div className="flex items-center justify-center">
            <div className="text-center py-16">
              <p className="font-display text-4xl italic text-green-700 mb-3">
                Message sent.
              </p>
              <p className="font-sans font-light text-muted text-sm">
                Thank you for getting in touch. We aim to reply within 2 working
                days.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      className="bg-ivory-dark py-24 px-8 border-t border-warm-border"
    >
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
                text: "Want to claim your listing or add real photos?",
                value: "Partnership",
              },
              {
                label: "Press & media",
                text: "Writing about quiet dining or accessibility?",
                value: "Press",
              },
              {
                label: "Everything else",
                text: "hello@dinesotto.com",
                value: "General",
              },
            ].map(({ label, text, value }) => (
              <button
                key={label}
                type="button"
                onClick={() => setSubject(value)}
                className={`py-5 border-b border-warm-border text-left transition-colors group ${
                  subject === value
                    ? "opacity-100"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <p className="font-sans text-[0.65rem] tracking-[0.12em] uppercase text-muted/50 mb-1 group-hover:text-muted/70 transition-colors">
                  {label}
                </p>
                <p className="font-sans text-sm text-green-700 font-light">
                  {text}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Right — contact form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {error && (
            <div className="bg-amber/10 border border-amber/30 rounded px-4 py-3">
              <p className="font-sans text-sm text-amber">{error}</p>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="font-sans text-[0.65rem] tracking-[0.12em] uppercase text-muted/60">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="bg-ivory border border-warm-border rounded px-4 py-3 font-sans text-sm text-charcoal placeholder:text-muted/40 focus:outline-none focus:border-green-400 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-sans text-[0.65rem] tracking-[0.12em] uppercase text-muted/60">
              What is this about?
            </label>
            <div className="relative">
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-ivory border border-warm-border rounded px-4 py-3 font-sans text-sm text-charcoal focus:outline-none focus:border-green-400 transition-colors appearance-none cursor-pointer"
              >
                <option>General</option>
                <option>Restaurant suggestion</option>
                <option>Partnership</option>
                <option>Press</option>
                <option>Report a rating</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted/40 text-[0.6rem]">
                ▾
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-sans text-[0.65rem] tracking-[0.12em] uppercase text-muted/60">
              Message
            </label>
            <textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can we help?"
              className="bg-ivory border border-warm-border rounded px-4 py-3 font-sans text-sm text-charcoal placeholder:text-muted/40 focus:outline-none focus:border-green-400 transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`text-white font-display italic text-base px-6 py-3.5 rounded transition-colors ${
              loading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-500"
            }`}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          <p className="font-sans text-[0.6rem] text-muted/40 leading-relaxed text-center">
            Your details will only be used to respond to your message.{" "}
            <a
              href="/privacy"
              className="underline underline-offset-2 hover:text-muted/60 transition-colors"
            >
              Privacy Policy
            </a>
          </p>

          <p className="font-sans text-[0.65rem] text-muted/40 text-center">
            We aim to reply within 2 working days.
          </p>
        </form>
      </div>
    </section>
  );
}
