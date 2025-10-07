"use client";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full h-24 border-b border-white/10 backdrop-blur-md bg-black/90 flex items-center relative after:absolute after:inset-x-0 after:top-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-4 h-full relative">
        {/* Logo */}
        <a href="/" className="flex items-center h-full group transition-transform duration-300 hover:scale-105">
          <Image
            src="/images/logo.png"
            alt="Universal Poker Logo"
            width={180}
            height={50}
            className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 group-hover:opacity-80 drop-shadow-lg"
            priority
          />
        </a>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 text-sm font-medium tracking-wide uppercase h-full items-center">
          <a href="#news" className="text-gray-300 hover:text-white transition-colors duration-200">News</a>
          <a href="#deals" className="text-gray-300 hover:text-white transition-colors duration-200">Deals</a>
          <a href="#blog" className="text-gray-300 hover:text-white transition-colors duration-200">Blog</a>
        </nav>
        {/* Auth Buttons */}
        <div className="hidden md:flex items-center h-full gap-6">
          <a href="#login" className="text-gray-400 font-medium hover:text-white transition-colors duration-200 text-sm tracking-wide">Login</a>
          <a
            href="#register"
            className="font-bold text-sm tracking-wide px-8 py-2.5 rounded-full bg-white text-black shadow-lg shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)] hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Register
          </a>
        </div>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center justify-center p-2 ml-2 text-gray-300 hover:text-white transition-colors"
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
        >
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16"/></svg>
        </button>
        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <div className="bg-black/90 backdrop-blur-md w-72 max-w-full h-full flex flex-col p-8 gap-8 shadow-2xl animate-slide-in-right relative">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M6 18L18 6"/></svg>
              </button>
              <nav className="flex flex-col gap-8 mt-12 text-sm font-medium tracking-wide uppercase">
                <a href="#news" className="text-gray-300 hover:text-white transition-colors duration-200" onClick={() => setMobileOpen(false)}>News</a>
                <a href="#deals" className="text-gray-300 hover:text-white transition-colors duration-200" onClick={() => setMobileOpen(false)}>Deals</a>
                <a href="#blog" className="text-gray-300 hover:text-white transition-colors duration-200" onClick={() => setMobileOpen(false)}>Blog</a>
                <a href="#login" className="text-gray-400 font-medium hover:text-white transition-colors duration-200 text-sm tracking-wide" onClick={() => setMobileOpen(false)}>Login</a>
                <a
                  href="#register"
                  className="font-bold text-sm tracking-wide px-8 py-2.5 rounded-full bg-white text-black shadow-lg shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)] hover:shadow-xl hover:scale-105 transition-all duration-300 mt-2"
                  onClick={() => setMobileOpen(false)}
                >
                  Register
                </a>
              </nav>
            </div>
            {/* Overlay */}
            <div className="flex-1" onClick={() => setMobileOpen(false)} />
          </div>
        )}
      </div>
      <style jsx global>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </header>
  );
}
