"use client";

import Link from "next/link";
import HeaderWithAuth from "./components/HeaderWithAuth";
import Footer from "./components/Footer";
import { Search, Home, HelpCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-black min-h-screen flex flex-col">
      {/* Header Section */}
      <section className="relative bg-black w-full px-3 md:px-4 pt-6">
        <div className="absolute top-0 left-0 right-0 z-50 pt-6 px-4">
          <HeaderWithAuth />
        </div>
      </section>

      {/* Main Content */}
      <main className="relative bg-black w-full pt-32 pb-16 flex-1 flex items-center justify-center z-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          
          {/* 404 Animation Container */}
          <div className="relative mb-8">
            {/* Glowing background effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#077124]/10 rounded-full blur-[100px] animate-pulse-slow"></div>
            
            {/* 404 Text */}
            <div className="relative">
              <h1 className="text-[120px] md:text-[140px] lg:text-[160px] font-black text-transparent bg-clip-text bg-gradient-to-b from-[#077124] via-[#0a9b30] to-[#077124] leading-none tracking-tighter"
                  style={{ 
                    textShadow: '0 0 60px rgba(7,113,36,0.5)',
                    WebkitTextStroke: '2px rgba(7,113,36,0.3)'
                  }}>
                404
              </h1>
              {/* Decorative elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                <div className="absolute top-0 left-1/4 w-2 h-2 bg-[#077124] rounded-full animate-ping"></div>
                <div className="absolute bottom-0 right-1/4 w-2 h-2 bg-emerald-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-[#077124] rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-3 mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#077124]/20 to-emerald-500/10 border border-[#077124]/30 mb-2">
              <Search className="h-7 w-7 text-[#077124]" strokeWidth={2} />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2"
                style={{ 
                  textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                  letterSpacing: '-0.01em'
                }}>
              Page Not Found
            </h2>
            
            <p className="text-base text-gray-400 max-w-xl mx-auto leading-relaxed">
              Oops! The page you&apos;re looking for doesn&apos;t exist. It might have been moved or deleted.
            </p>
          </div>

          {/* Action Button */}
          <div className="flex items-center justify-center mb-10">
            {/* Home Button */}
            <Link
              href="/"
              className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white bg-gradient-to-b from-[#088929] to-[#055a1c] rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.03] active:scale-[0.98]"
              style={{
                boxShadow: `
                  0 0 0 1px rgba(255,255,255,0.1),
                  0 1px 3px 0 rgba(0,0,0,0.5),
                  0 4px 12px rgba(7,113,36,0.3),
                  0 8px 32px rgba(7,113,36,0.25),
                  0 16px 64px rgba(7,113,36,0.2),
                  inset 0 1px 1px rgba(255,255,255,0.3),
                  inset 0 -1px 1px rgba(0,0,0,0.2)
                `
              }}
            >
              {/* Glow layers */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#077124] via-[#0a9b30] to-[#077124] rounded-full blur-xl opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 via-[#077124] to-emerald-400 rounded-full blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-500 animate-pulse-slow"></div>
              
              {/* Glass reflection */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 via-white/5 to-transparent" style={{ height: '50%' }}></div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 skew-x-12"></div>
              
              {/* Button content */}
              <Home className="relative z-10 w-4 h-4 drop-shadow-lg" strokeWidth={2.5} />
              <span className="relative z-10 tracking-wide drop-shadow-lg">Back to Home</span>
              
              {/* Edge highlights */}
              <div className="absolute inset-x-0 top-[1px] h-px bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"></div>
              <div className="absolute inset-x-0 bottom-[1px] h-px bg-gradient-to-r from-transparent via-black/50 to-transparent rounded-full"></div>
            </Link>
          </div>

          {/* Help Section */}
          <div className="relative rounded-2xl overflow-hidden max-w-2xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/5"></div>
            <div className="relative border border-blue-500/20 rounded-2xl p-5 bg-black/40 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <HelpCircle className="h-5 w-5 text-blue-400" strokeWidth={2} />
                </div>
                <div className="text-left">
                  <h3 className="text-sm font-semibold text-white mb-1">Need Help?</h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-2">
                    If you believe this is an error or need assistance, please don&apos;t hesitate to contact our support team.
                  </p>
                  <Link 
                    href="/contact-us"
                    className="inline-flex items-center text-xs font-semibold text-[#077124] hover:text-[#0a9b30] transition-colors duration-300"
                  >
                    Contact Support
                    <svg className="w-3 h-3 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Suggested Links */}
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-gray-400 mb-4">You might be looking for:</h3>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Link href="/deals" className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full text-xs text-gray-300 hover:text-white transition-all duration-300">
                Deals
              </Link>
              <Link href="/news" className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full text-xs text-gray-300 hover:text-white transition-all duration-300">
                News
              </Link>
              <Link href="/contact-us" className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full text-xs text-gray-300 hover:text-white transition-all duration-300">
                Contact Us
              </Link>
              <Link href="/terms" className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full text-xs text-gray-300 hover:text-white transition-all duration-300">
                Terms & Conditions
              </Link>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer />

      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

