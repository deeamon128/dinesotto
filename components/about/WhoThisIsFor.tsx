const AUDIENCE = [
  {
    name: "The Hard of Hearing Community",
    description:
      "Navigating the world with hearing aids or cochlear implants means every environment matters. DineSotto gives you the information no other guide does.",
  },
  {
    name: "Neurodivergent Diners",
    description:
      "For those with sensory processing sensitivities, a loud restaurant can tip an otherwise lovely evening into something overwhelming.",
  },
  {
    name: "Meaningful Gatherings",
    description:
      "Whether it is a delicate first date or a catch-up with elderly parents, some moments deserve a space where you can actually hear each other.",
  },
  {
    name: "Business Lunches",
    description:
      "Have the conversation that matters in a space that allows it.",
  },
];

export default function WhoThisIsFor() {
  return (
    <section className="bg-ivory py-24 px-8 border-t border-warm-border">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-4xl font-light italic text-green-700 mb-16">
          Who is this for?
        </h2>

        <div className="flex flex-col">
          {AUDIENCE.map(({ name, description }) => (
            <div
              key={name}
              className="flex items-start gap-8 py-6 border-b border-warm-border last:border-0"
            >
              <div className="w-1 self-stretch bg-green-600 rounded-full shrink-0" />
              <div className="flex flex-col gap-2 flex-1">
                <h3 className="font-display text-lg font-medium text-green-800">
                  {name}
                </h3>
                <p className="font-sans font-light text-muted text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
