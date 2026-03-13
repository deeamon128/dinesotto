import FilterBar from "@/components/explore/FilterBar";
import ExploreLayout from "@/components/explore/ExploreLayout";

export default function ExplorePage() {
  return (
    <main>
      <div className="pt-16">
        <div className="bg-ivory border-b border-warm-border px-8 py-8">
          <div className="max-w-5xl mx-auto">
            <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-amber mb-2">
              London
            </p>
            <h1 className="font-display text-4xl font-light italic text-green-700">
              Explore quiet restaurants
            </h1>
          </div>
        </div>
        <FilterBar />
        <ExploreLayout />
      </div>
    </main>
  );
}
