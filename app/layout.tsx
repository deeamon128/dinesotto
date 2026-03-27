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
  metadataBase: new URL("https://sotto.com"),
  title: {
    default: "Sotto — Quiet Dining in London",
    template: "%s — Sotto",
  },
  description:
    "Find London restaurants where you can actually hear each other. Rated by noise level, music volume, and time of day.",
  keywords: [
    "quiet restaurants London",
    "noise level restaurant guide",
    "hearing loss dining",
    "quiet dining London",
    "restaurant noise rating",
    "sotto quiet dining",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://sotto.com",
    siteName: "Sotto",
    title: "Sotto — Quiet Dining in London",
    description:
      "Find London restaurants where you can actually hear each other. Rated by noise level, music volume, and time of day.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sotto — Quiet Dining in London",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sotto — Quiet Dining in London",
    description:
      "Find London restaurants where you can actually hear each other. Rated by noise level, music volume, and time of day.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://sotto.com",
  },
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
