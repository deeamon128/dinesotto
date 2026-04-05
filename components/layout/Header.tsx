"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import SottoLogo from "@/components/ui/SottoLogo";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Force scrolled style on pages without a dark hero
  const isLightPage = pathname !== "/";
  const showScrolled = scrolled || isLightPage;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 h-16
        flex items-center justify-between
        px-8 transition-all duration-300
        ${
          showScrolled
            ? "bg-ivory/95 backdrop-blur-md border-b border-warm-border shadow-sm"
            : "bg-transparent"
        }
      `}
    >
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
        <Link href="/" className="flex items-center group">
          <SottoLogo
            className="h-14 w-auto transition-all duration-300"
            darkMode={!showScrolled}
          />
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {[
            { label: "Home", href: "/" },
            { label: "Explore", href: "/explore" },
            { label: "About", href: "/about" },
            { label: "The Noise Problem", href: "/noise" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`
                text-[0.78rem] tracking-[0.07em] uppercase
                transition-colors duration-200
                ${
                  showScrolled
                    ? "text-muted hover:text-green-600"
                    : "text-green-300/60 hover:text-green-100"
                }
              `}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/suggest"
            className="bg-green-600 hover:bg-green-400 text-white text-[0.76rem] font-medium tracking-[0.04em] px-4 py-2 rounded transition-colors duration-200"
          >
            Suggest a Restaurant
          </Link>
        </div>
      </div>

      <button
        className="md:hidden text-green-600"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-ivory border-b border-warm-border flex flex-col px-8 py-6 gap-5 md:hidden">
          {[
            { label: "Home", href: "/" },
            { label: "Explore", href: "/explore" },
            { label: "About", href: "/about" },
            { label: "The Noise Problem", href: "/noise" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-sm text-muted hover:text-green-600 tracking-wide uppercase transition-colors"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/suggest"
            onClick={() => setMenuOpen(false)}
            className="bg-green-600 text-white text-sm font-medium px-4 py-3 rounded text-center tracking-wide transition-colors hover:bg-green-400"
          >
            Suggest a Restaurant
          </Link>
        </div>
      )}
    </header>
  );
}
