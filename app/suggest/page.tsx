import SuggestForm from "@/components/rate/SuggestForm";

export default function SuggestPage() {
  return (
    <main>
      <section className="relative bg-green-900 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-amber/10 blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 grain opacity-30 pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto px-8 pt-32 pb-16 text-center">
          <p className="font-sans text-[0.65rem] tracking-[0.22em] uppercase text-green-300/40 mb-4">
            Community
          </p>
          <h1 className="font-display text-5xl font-light italic text-green-100 leading-[1.1] mb-4">
            Know a quiet spot?
          </h1>
          <p className="font-sans font-light text-green-300/60 text-sm max-w-md mx-auto">
            Suggest a restaurant and we'll research it. Every submission helps
            someone find their perfect quiet table.
          </p>
        </div>
      </section>

      <section className="bg-ivory py-16 px-8">
        <div className="max-w-2xl mx-auto">
          <SuggestForm />
        </div>
      </section>
    </main>
  );
}
