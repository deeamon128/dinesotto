export const metadata = {
  title: "Our Story",
  description:
    "Sotto was built by someone hard of hearing who couldn't find a quiet restaurant guide. So she built one.",
};

import AboutHero from "@/components/about/AboutHero";
import FounderStory from "@/components/about/FounderStory";
import PullQuote from "@/components/about/PullQuote";
import HowWeCalculate from "@/components/about/HowWeCalculate";
import WhoThisIsFor from "@/components/about/WhoThisIsFor";
import ContactSection from "@/components/about/ContactSection";
import CTABand from "@/components/home/CTABand";

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <FounderStory />
      <PullQuote />
      <HowWeCalculate />
      <WhoThisIsFor />
      <ContactSection />
      <CTABand />
    </main>
  );
}
