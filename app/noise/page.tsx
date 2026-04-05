import { Metadata } from "next";
import NoiseHero from "@/components/noise/NoiseHero";
import NoisePullQuote from "@/components/noise/NoisePullQuote";
import NoiseStats from "@/components/noise/NoiseStats";
import NoiseEffects from "@/components/noise/NoiseEffects";
import NoiseDesigned from "@/components/noise/NoiseDesigned";
import NoiseCTA from "@/components/noise/NoiseCTA";

export const metadata: Metadata = {
  title: "The Noise Problem | DineSotto",
  description:
    "Why restaurant noise matters — the science, the data, and who it affects.",
};

export default function NoisePage() {
  return (
    <main className="bg-ivory min-h-screen">
      <NoiseHero />
      <NoisePullQuote />
      <NoiseStats />
      <NoiseEffects />
      <NoiseDesigned />
      <NoiseCTA />
    </main>
  );
}
