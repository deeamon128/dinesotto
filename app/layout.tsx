import type { Metadata } from "next";
import { Newsreader, DM_Sans } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dine Sotto — Quiet Dining Guide",
  description: "Find restaurants where you can actually hear each other.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
        ${newsreader.variable}
        ${dmSans.variable}
        antialiased
      `}
      >
        <Header />
        <SpeedInsights />
        {children}
        <Footer />
      </body>
    </html>
  );
}
