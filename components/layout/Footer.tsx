import Link from "next/link";
import SottoLogo from "@/components/ui/SottoLogo";

const NAV = [
  {
    heading: "Explore",
    links: [
      { label: "All Restaurants", href: "/explore" },
      { label: "Verified Quiet", href: "/explore?filter=verified" },
      { label: "Rate a Visit", href: "/rate" },
      { label: "Suggest a Restaurant", href: "/suggest" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "The Noise Problem", href: "/noise" },
      { label: "How It Works", href: "/about#how" },
      { label: "Contact", href: "/about#contact" },
      { label: "Partner With Us", href: "/about#contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
    ],
  },
  {
    heading: "Community",
    links: [
      { label: "Instagram", href: "https://www.instagram.com/dinesottouk/" },
      { label: "Threads", href: "https://www.threads.com/@dinesottouk" },
      { label: "Newsletter", href: "#newsletter" },
      { label: "Press", href: "/about#contact" },
    ],
  },
];

const yearNow = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-ivory-dark border-t border-warm-border">
      {/* Main footer */}
      <div className="max-w-5xl mx-auto px-8 py-16 grid grid-cols-2 md:grid-cols-4 gap-12">
        {/* Brand col */}
        <div className="flex flex-col gap-5">
          <SottoLogo className="h-14 w-auto self-start" darkMode={false} />
          <p className="font-display italic text-amber text-sm leading-relaxed">
            For anyone who values conversation.
          </p>
        </div>

        {/* Nav cols */}
        {NAV.map(({ heading, links }) => (
          <div key={heading}>
            <p className="font-sans text-[0.6rem] tracking-[0.18em] uppercase text-muted/40 mb-5">
              {heading}
            </p>
            <ul className="flex flex-col gap-3">
              {links.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    target={href.startsWith("https://") ? "_blank" : undefined}
                    rel={
                      href.startsWith("https://")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="font-sans font-light text-sm text-muted/70 hover:text-green-600 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom strip */}
      <div className="border-t border-warm-border">
        <div className="max-w-5xl mx-auto px-8 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-1.5">
          <p className="font-sans text-[0.65rem] text-muted/40">
            © {yearNow} DineSotto. All rights reserved.
          </p>
          <p className="font-sans text-[0.65rem] text-muted/40">
            Ratings reflect personal experiences. Photos are illustrative.{" "}
            <a
              href="/about#contact"
              className="underline underline-offset-2 hover:text-muted/60 transition-colors"
            >
              Restaurant owner?
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
