import { Metadata } from "next";
import NoiseHero from "@/components/noise/NoiseHero";
import NoiseSolutions from "@/components/noise/NoiseSolution";
import NoiseStats from "@/components/noise/NoiseStats";
import NoiseEffects from "@/components/noise/NoiseEffects";
import NoiseCTA from "@/components/noise/NoiseCTA";

export const metadata: Metadata = {
  title: "The Noise Problem",
  description:
    "Why restaurant noise matters. The science, the data, and who it affects.",
};

export default function NoisePage() {
  return (
    <main className="bg-ivory min-h-screen">
      <NoiseHero />
      <NoiseStats />
      <NoiseEffects />
      <NoiseSolutions />
      <NoiseCTA />
    </main>
  );
}
