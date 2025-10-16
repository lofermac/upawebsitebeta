"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";

export default function PartyPokerBirminghamNewsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section - Black Background */}
      <section className="relative bg-black w-full px-3 md:px-4 pt-6 pb-8">
        {/* Premium Container Card - envolve Header, Título, Author e Data */}
        <div className="relative w-full rounded-[2.5rem] overflow-hidden group/hero transition-all duration-700">
          
          {/* Background com gradiente cinza escuro premium - mesmo tom da homepage */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#121212] to-[#0d0d0d] transition-all duration-700 group-hover/hero:from-[#0e0e0e] group-hover/hero:via-[#131313] group-hover/hero:to-[#0e0e0e]"></div>
          
          {/* Borda sutil ao redor do card */}
          <div className="absolute inset-0 rounded-[2.5rem] border border-white/[0.06] shadow-2xl shadow-black/50 transition-all duration-700 group-hover/hero:border-white/[0.09] group-hover/hero:shadow-black/60"></div>
          
          {/* Brilho interno sutil */}
          <div className="absolute inset-0 rounded-[2.5rem] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.025)] transition-all duration-700 group-hover/hero:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"></div>
          
          {/* Brilho no topo do card */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent rounded-t-[2.5rem]"></div>
          
          {/* Efeitos de glow verde sutil (marca Universal Poker) */}
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#077124]/[0.03] rounded-full blur-[100px] animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-emerald-500/[0.02] rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
          
          {/* Textura de ruído sutil para sensação premium */}
          <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
          
          {/* Header */}
          <div className="relative z-10 pt-6 px-4">
            <Header />
          </div>
          
          {/* Hero Content - Title, Author and Date */}
          <div className="relative z-10 pt-20 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
              
              {/* Article Title */}
              <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 text-center" 
                  style={{ 
                    textShadow: '0 2px 16px rgba(0,0,0,0.4)',
                    letterSpacing: '-0.02em'
                  }}>
                PartyPoker Tour Returns to Birmingham this October
              </h1>

              {/* Meta Information - Author and Date */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-gray-400">
                {/* Published by */}
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#077124]/20 rounded-full blur-sm"></div>
                    <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-[#077124] to-emerald-500 flex items-center justify-center">
                      <User className="w-4 h-4 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Published by</span>
                    <p className="text-sm font-semibold text-white">Chris Andreou</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-8 w-px bg-white/[0.08]"></div>

                {/* Date */}
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#077124]" />
                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Published</span>
                    <p className="text-sm font-semibold text-white">October 6, 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content Section - Pure Black Background */}
      <main className="relative bg-black w-full pt-12 pb-24">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Featured Image - Full Width Premium */}
          <div className="relative rounded-3xl overflow-hidden mb-16 group shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="absolute inset-0 border border-white/[0.05] rounded-3xl"></div>
            <img 
              src="https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/10/06190843/PartyPoker-Tour-Birmingham.png"
              alt="PartyPoker Tour Birmingham promotional banner"
              className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </div>

          {/* Article Body */}
          <article className="max-w-5xl mx-auto">
            
             {/* Introduction Paragraph */}
             <div className="mb-12">
               <p className="text-gray-300 text-lg md:text-xl leading-relaxed" style={{ lineHeight: '1.8' }}>
                 Players, mark your calendars: the PartyPoker Tour Birmingham is back from 11-19 October 2025 at the Resorts World Genting Casino in Birmingham, and it&apos;s shaping up to be one of the most accessible, value-driven poker festivals in the UK.
               </p>
             </div>

            {/* Festival Highlights Section */}
            <div className="mb-12">
              <h2 className="text-white text-2xl md:text-3xl font-bold mb-6"
                  style={{ 
                    textShadow: '0 2px 12px rgba(0,0,0,0.4)',
                    letterSpacing: '-0.015em'
                  }}>
                Festival Highlights & Key Events
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6" style={{ lineHeight: '1.8' }}>
                The Festival offers a variety of tournaments designed to appeal to a wide range of bankrolls and styles:
              </p>

              {/* Premium Table */}
              <div className="relative rounded-2xl overflow-hidden backdrop-blur-xl mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/40 via-black/60 to-zinc-900/40"></div>
                <div className="relative border border-white/[0.08] rounded-2xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/[0.08]">
                        <th className="px-6 py-4 text-white font-bold text-base">Event</th>
                        <th className="px-6 py-4 text-white font-bold text-base">Buy-In</th>
                        <th className="px-6 py-4 text-white font-bold text-base">Guarantee</th>
                        <th className="px-6 py-4 text-white font-bold text-base">Dates</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors duration-300">
                        <td className="px-6 py-4 text-gray-300">Mini Main Event</td>
                        <td className="px-6 py-4 text-gray-300">£150</td>
                        <td className="px-6 py-4 text-gray-300">£50,000</td>
                        <td className="px-6 py-4 text-gray-300">11-16 October</td>
                      </tr>
                      <tr className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors duration-300">
                        <td className="px-6 py-4 text-gray-300">Main Event</td>
                        <td className="px-6 py-4 text-gray-300">£500</td>
                        <td className="px-6 py-4 text-gray-300">£100,000</td>
                        <td className="px-6 py-4 text-gray-300">16 – 19 October</td>
                      </tr>
                      <tr className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors duration-300">
                        <td className="px-6 py-4 text-gray-300">PLO Masters</td>
                        <td className="px-6 py-4 text-gray-300">£250</td>
                        <td className="px-6 py-4 text-gray-300">£20,000</td>
                        <td className="px-6 py-4 text-gray-300">17 – 19 October</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02] transition-colors duration-300">
                        <td className="px-6 py-4 text-gray-300">High Roller</td>
                        <td className="px-6 py-4 text-gray-300">£1,000</td>
                        <td className="px-6 py-4 text-gray-300">Based on entries</td>
                        <td className="px-6 py-4 text-gray-300">19 October</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Qualifying Section */}
            <div className="mb-12">
              <p className="text-gray-300 text-lg leading-relaxed mb-6" style={{ lineHeight: '1.8' }}>
                You can qualify to visit Birmingham for an extremely low cost by playing satellites on partypoker, starting from just $1!
              </p>
              <p className="text-gray-300 text-lg leading-relaxed" style={{ lineHeight: '1.8' }}>
                Want to get involved? Make sure you create or link your account to Universal Poker to claim the excellent benefits we provide:
              </p>
            </div>

            {/* Premium CTA Card - Mimic poker deal tab style */}
            <div className="relative rounded-3xl overflow-hidden backdrop-blur-xl mb-16 group/cta">
              {/* Background with gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/60 via-black/80 to-zinc-900/60"></div>
              
              {/* Subtle green glow effects */}
              <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#077124]/[0.08] rounded-full blur-[120px] opacity-0 group-hover/cta:opacity-100 transition-opacity duration-1000"></div>
              <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-emerald-500/[0.06] rounded-full blur-[120px] opacity-0 group-hover/cta:opacity-100 transition-opacity duration-1000" style={{ animationDelay: '500ms' }}></div>
              
              {/* Border and content */}
              <div className="relative border border-white/[0.08] group-hover/cta:border-[#077124]/30 rounded-3xl p-12 text-center transition-all duration-700">
                
                <h3 className="text-white text-2xl md:text-3xl font-bold mb-4"
                    style={{ 
                      textShadow: '0 2px 12px rgba(0,0,0,0.4)',
                      letterSpacing: '-0.015em'
                    }}>
                  Start your journey with Universal
                </h3>
                
                <p className="text-gray-300 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                  Join PartyPoker through Universal Poker and unlock exclusive benefits, including enhanced rakeback, special promotions, and access to premium tournament packages like the Birmingham Tour.
                </p>
                
                {/* Premium Button */}
                <Link href="/deals" className="group/btn relative inline-flex items-center justify-center gap-3 px-12 py-5 text-base md:text-lg font-bold text-white bg-gradient-to-b from-[#088929] to-[#055a1c] rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.05] active:scale-[0.95]"
                   style={{
                     boxShadow: `
                       0 0 0 1px rgba(255,255,255,0.1),
                       0 1px 3px 0 rgba(0,0,0,0.5),
                       0 4px 12px rgba(7,113,36,0.3),
                       0 8px 32px rgba(7,113,36,0.25),
                       inset 0 1px 1px rgba(255,255,255,0.3),
                       inset 0 -1px 1px rgba(0,0,0,0.2)
                     `
                   }}>
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#077124] via-[#0a9b30] to-[#077124] rounded-full blur-xl opacity-60 group-hover/btn:opacity-90 transition-opacity duration-500"></div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 via-[#077124] to-emerald-400 rounded-full blur-2xl opacity-40 group-hover/btn:opacity-70 transition-opacity duration-500 animate-pulse-slow"></div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 via-white/5 to-transparent" style={{ height: '50%' }}></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000 skew-x-12"></div>
                  <span className="relative z-10 tracking-wide drop-shadow-lg">View Our Deals</span>
                  <div className="absolute inset-x-0 top-[1px] h-px bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"></div>
                </Link>
              </div>
            </div>

          </article>

          {/* Back to News Button */}
          <div className="max-w-5xl mx-auto mt-16 pt-8 border-t border-white/[0.08]">
            <Link href="/news" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#077124] transition-colors duration-300 text-base font-semibold group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Back to All News</span>
            </Link>
          </div>

        </div>
      </main>

      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>

      <Footer />
    </div>
  );
}

