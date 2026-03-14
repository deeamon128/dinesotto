import Link from "next/link";
import SottoLogo from "@/components/ui/SottoLogo";

const NAV = [
  {
    heading: "Explore",
    links: [
      { label: "Explore", href: "/explore" },
      { label: "Verified Quiet", href: "/directory?filter=verified" },
      { label: "By Borough", href: "/directory?view=boroughs" },
      { label: "Saved Places", href: "/saved" },
    ],
  },
  {
    heading: "Community",
    links: [
      { label: "Suggest a Restaurant", href: "/rate" },
      { label: "Rate a Visit", href: "/rate" },
      { label: "Partner With Us", href: "/about#contact" },
      { label: "Press", href: "/about#press" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "How It Works", href: "/about#how" },
      { label: "Contact", href: "/about#contact" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

const socialClass =
  "font-sans text-[0.65rem] tracking-[0.12em] uppercase text-muted/40 hover:text-green-600 transition-colors";
const yearNow = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-ivory-dark border-t border-warm-border">
      {/* Main footer */}
      <div className="max-w-5xl mx-auto px-8 py-16 grid grid-cols-2 md:grid-cols-4 gap-12">
        {/* Brand col */}
        <div className="flex flex-col gap-6">
          <SottoLogo className="w-28" darkMode={false} />
          <p className="font-sans font-light text-muted/60 text-xs leading-relaxed max-w-[180px]">
            Quiet dining, found. Built with care in London.
          </p>
          <p className="font-display italic text-amber text-sm">
            For the 12 million.
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
        <div className="max-w-5xl mx-auto px-8 py-5 flex items-center justify-between">
          <p className="font-sans text-[0.65rem] text-muted/40">
            © {yearNow} Sotto. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className={socialClass}>
              Instagram
            </a>
            <a href="#" className={socialClass}>
              Threads
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
