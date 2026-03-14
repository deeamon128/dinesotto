import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import FeaturedRestaurants from "@/components/home/FeaturedRestaurants";
import HowItWorks from "@/components/home/HowItWorks";
import CTABand from "@/components/home/CTABand";
import { getRestaurants } from "@/lib/supabase/queries";

export default async function Home() {
  const restaurants = await getRestaurants();
  const featured = restaurants.filter((r) => r.verified).slice(0, 3);

  return (
    <main>
      <Hero />
      <TrustBar />
      <FeaturedRestaurants restaurants={featured} />
      <HowItWorks />
      <CTABand />
    </main>
  );
}
