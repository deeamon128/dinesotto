import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import FeaturedRestaurants from "@/components/home/FeaturedRestaurants";
import HowItWorks from "@/components/home/HowItWorks";
import CTABand from "@/components/home/CTABand";
import { getRestaurants } from "@/lib/supabase/queries";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createServerSupabaseClient();

  const [
    allRestaurants,
    featured,
    topRated,
    { count: totalRestaurants },
    { count: verifiedCount },
    { count: ratingsCount },
  ] = await Promise.all([
    getRestaurants(),
    getRestaurants({ featured: true, limit: 3 }),
    getRestaurants({ orderBy: "overall_score", limit: 3, minRatings: 1 }),
    supabase.from("restaurants").select("*", { count: "exact", head: true }),
    supabase
      .from("restaurants")
      .select("*", { count: "exact", head: true })
      .eq("verified", true),
    supabase
      .from("ratings")
      .select("*", { count: "exact", head: true })
      .eq("status", "approved"),
  ]);

  return (
    <main>
      <Hero restaurants={allRestaurants} />
      <TrustBar
        totalRestaurants={totalRestaurants ?? 0}
        verifiedCount={verifiedCount ?? 0}
        ratingsCount={ratingsCount ?? 0}
      />
      <FeaturedRestaurants restaurants={featured} topRated={topRated} />
      <HowItWorks />
      <CTABand />
    </main>
  );
}
