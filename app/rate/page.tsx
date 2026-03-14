import { getRestaurants } from "@/lib/supabase/queries";
import RateVisitForm from "@/components/rate/RateVisitForm";

export default async function RatePage() {
  const restaurants = await getRestaurants();

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
            Rate a recent visit.
          </h1>
          <p className="font-sans font-light text-green-300/60 text-sm max-w-md mx-auto">
            Your rating is anonymous and helps real people make better choices.
          </p>
        </div>
      </section>

      <section className="bg-ivory py-16 px-8">
        <div className="max-w-2xl mx-auto">
          <RateVisitForm restaurants={restaurants} />
        </div>
      </section>
    </main>
  );
}
