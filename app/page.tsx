import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import FeaturedRestaurants from "@/components/home/FeaturedRestaurants";
import HowItWorks from "@/components/home/HowItWorks";
import CTABand from "@/components/home/CTABand";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <FeaturedRestaurants />
      <HowItWorks />
      <CTABand />
    </main>
  );
}
