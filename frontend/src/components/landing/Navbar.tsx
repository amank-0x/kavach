import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "How It Works", href: "#problem" },
    { name: "Technology", href: "#technology" },
    { name: "Security", href: "#security" },
    { name: "About Kavach", href: "#about" },
  ];

  return (
    <header className="fixed w-full top-0 left-0 z-50 backdrop-blur-xl bg-gray-950/40 border-b border-red-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)] px-8!">
      <div className="w-full px-4 sm:px-6 lg:px-8 h-14 sm:h-16 grid grid-cols-[1fr_auto] md:grid-cols-[auto_1fr_auto] items-center gap-4">
        
        {/* Left Side: Brand Identity (No Icon) */}
        <div className="flex min-w-0 items-center self-center gap-2.5">
          <a href="/" className="inline-flex items-center gap-1.5 group focus:outline-none">
            <span className="text-xl sm:text-2xl font-extrabold leading-none tracking-tight text-white group-hover:text-red-400 transition-colors">
              Kavach<span className="text-red-500">-AI</span>
            </span>
          </a>
        </div>

        {/* Center: Core Navigation Links (Desktop) */}
        <nav className="hidden md:flex h-full items-center justify-center gap-6 lg:gap-9">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative inline-flex h-full items-center self-center text-sm font-medium leading-none text-gray-300 hover:text-white transition-colors after:absolute after:bottom-3 after:left-0 after:w-0 after:h-0.5 after:bg-red-500 hover:after:w-full after:transition-all after:duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Side: Action & Access (CTAs with proper padding) */}
        <div className="hidden md:flex items-center self-center justify-end gap-3">
          {/* Primary entry point for the analysis workspace */}
          <a
            href="/home"
            className="inline-flex h-10 min-w-[132px] items-center justify-center rounded-lg px-8 text-sm font-bold leading-none text-red-300 border border-red-500/40 bg-red-500/10 backdrop-blur-md hover:bg-red-500/20 hover:border-red-500/70 hover:text-white transition-all duration-200 shadow-[0_0_15px_rgba(220,38,38,0.15)] active:scale-95"
          >
            Get Started
          </a>

          {/* User access */}
          <a
            href="/login"
            className="inline-flex h-10 min-w-[132px] items-center justify-center rounded-lg px-8 text-sm font-bold leading-none text-white bg-red-600/90 hover:bg-red-500 border border-red-400/40 backdrop-blur-md transition-all duration-200 shadow-[0_0_20px_rgba(220,38,38,0.45)] hover:shadow-[0_0_28px_rgba(239,68,68,0.65)] active:scale-95"
          >
            User Login
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center justify-end">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-300 hover:text-white bg-white/5 border border-white/10 backdrop-blur-md"
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 pt-3 pb-5 border-t border-red-500/20 bg-gray-950/90 backdrop-blur-2xl flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-gray-300 hover:text-red-400 py-2"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-3 flex flex-col gap-3 border-t border-white/10">
            <a
              href="/home"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center px-6 py-2.5 rounded-xl text-sm font-bold text-red-300 border border-red-500/40 bg-red-500/10"
            >
              Get Started
            </a>
            <a
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-red-600"
            >
              User Login
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
