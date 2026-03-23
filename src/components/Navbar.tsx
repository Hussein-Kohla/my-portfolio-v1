import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#090909]/90 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between h-16 max-w-5xl px-6 mx-auto">
        {/* ── Logo + avatar ── */}
        <a href="#" className="flex items-center gap-2.5 group">
          {/* Small circular avatar */}
          <div className="relative flex-shrink-0 overflow-hidden transition-all duration-300 border rounded-full w-7 h-7 border-white/15 bg-white/5 group-hover:border-white/35">
            <img
              src="/profile.jpg"
              alt="HK"
              className="object-cover object-top w-full h-full"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-[9px] font-display text-white/35 select-none">
              H
            </span>
          </div>
          <span className="text-base tracking-tight text-white transition-opacity duration-300 font-display group-hover:opacity-70">
            Hussein<span className="text-[#a78bfa]">.</span>
          </span>
        </a>

        {/* ── Desktop links ── */}
        <div className="items-center hidden gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm tracking-wide transition-colors duration-300 text-white/50 hover:text-white"
            >
              {l.label}
            </a>
          ))}

          {/* My CV — download button */}
          <a
            href="/Hussein_Ahmed_CV_2026.pdf"
            download
            className="flex items-center gap-1.5 text-sm px-4 py-1.5 rounded-full border border-white/15 text-white/70 hover:border-white/40 hover:text-white transition-all duration-300"
          >
            My CV
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path
                d="M5.5 1v6M2 7.5l3.5 2.5L9 7.5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          className="p-1 md:hidden text-white/60 hover:text-white"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="block w-5 h-px bg-current mb-1.5" />
          <span
            className={`block h-px bg-current transition-all ${menuOpen ? "w-5" : "w-3"}`}
          />
        </button>
      </div>

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <div className="md:hidden bg-[#090909]/95 backdrop-blur-md border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="py-1 transition-colors text-white/60 hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/cv.pdf"
            download
            className="py-1 transition-colors text-white/60 hover:text-white"
          >
            My CV ↓
          </a>
        </div>
      )}
    </nav>
  );
}
