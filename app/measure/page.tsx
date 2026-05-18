import { Metadata } from "next";
import NoiseMeter from "@/components/measure/NoiseMeter";

export const metadata: Metadata = {
  title: "Noise Meter",
  description:
    "Measure the noise level of any restaurant in real time using your phone's microphone. No app needed.",
};

export default function MeasurePage() {
  return (
    <main className="bg-ivory min-h-screen">
      <div className="bg-green-900 pt-32 pb-16 px-8 relative overflow-hidden">
        <div className="absolute inset-0 grain opacity-30 pointer-events-none" />
        <div className="relative z-10 max-w-xl mx-auto text-center">
          <p className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-green-300/40 mb-4">
            In the restaurant?
          </p>
          <h1 className="font-display text-5xl font-light italic text-green-100 leading-[1.1] mb-4">
            Measure the noise level.
          </h1>
          <p className="font-sans font-light text-green-300/60 text-sm leading-relaxed">
            Hold your phone up and tap start. We will measure the ambient noise
            level and tell you where it sits on the DineSotto scale.
          </p>
        </div>
      </div>

      <div className="px-8 py-16">
        <NoiseMeter />
      </div>
    </main>
  );
}
