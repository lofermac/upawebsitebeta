"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";

export default function PartyPokerBirminghamNewsPage() {
  return (
    <div className="bg-[#1E1E1E] min-h-screen flex flex-col">
      {/* Header Section */}
      <section className="relative bg-[#1E1E1E] w-full px-3 md:px-4 pt-6">
        <div className="absolute top-0 left-0 right-0 z-50 pt-6 px-4">
          <Header />
        </div>
      </section>

      {/* Main Content */}
      <main className="relative bg-[#1E1E1E] w-full pt-32 pb-24 flex-1">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Article Title and Meta */}
          <div className="max-w-5xl mx-auto mb-12">
            {/* Article Title */}
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-8 text-center" 
                style={{ 
                  textShadow: '0 2px 16px rgba(0,0,0,0.4)',
                  letterSpacing: '-0.02em'
                }}>
              PartyPoker Tour Returns to Birmingham this October
            </h1>

            {/* Meta Information - Author and Date */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-400 mb-12">
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

          {/* Featured Image - 60% Width Premium */}
          <div className="relative rounded-3xl overflow-hidden mb-16 group shadow-2xl mx-auto" style={{ maxWidth: '60%' }}>
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

              {/* Premium Table - Eye-catching design */}
              <div className="relative rounded-3xl overflow-hidden mb-8 group/table shadow-2xl">
                {/* Vibrant gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#077124]/20 via-emerald-900/30 to-[#077124]/20"></div>
                
                {/* Animated glow effects */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#077124]/20 rounded-full blur-[120px] animate-pulse-slow"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
                
                {/* Border with green accent */}
                <div className="relative border-2 border-[#077124]/30 rounded-3xl overflow-hidden backdrop-blur-sm bg-black/60">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gradient-to-r from-[#077124]/40 via-[#077124]/50 to-[#077124]/40 border-b-2 border-[#077124]/40">
                        <th className="px-6 py-5 text-white font-bold text-base tracking-wide">Event</th>
                        <th className="px-6 py-5 text-white font-bold text-base tracking-wide">Buy-In</th>
                        <th className="px-6 py-5 text-white font-bold text-base tracking-wide">Guarantee</th>
                        <th className="px-6 py-5 text-white font-bold text-base tracking-wide">Dates</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[#077124]/10 hover:bg-[#077124]/10 transition-all duration-300 group/row">
                        <td className="px-6 py-5 text-gray-200 font-semibold group-hover/row:text-white transition-colors">Mini Main Event</td>
                        <td className="px-6 py-5 text-emerald-400 font-bold">£150</td>
                        <td className="px-6 py-5 text-gray-300 group-hover/row:text-white transition-colors">£50,000</td>
                        <td className="px-6 py-5 text-gray-400 group-hover/row:text-gray-200 transition-colors">11-16 October</td>
                      </tr>
                      <tr className="border-b border-[#077124]/10 hover:bg-[#077124]/10 transition-all duration-300 group/row">
                        <td className="px-6 py-5 text-gray-200 font-semibold group-hover/row:text-white transition-colors">Main Event</td>
                        <td className="px-6 py-5 text-emerald-400 font-bold">£500</td>
                        <td className="px-6 py-5 text-gray-300 group-hover/row:text-white transition-colors">£100,000</td>
                        <td className="px-6 py-5 text-gray-400 group-hover/row:text-gray-200 transition-colors">16 – 19 October</td>
                      </tr>
                      <tr className="border-b border-[#077124]/10 hover:bg-[#077124]/10 transition-all duration-300 group/row">
                        <td className="px-6 py-5 text-gray-200 font-semibold group-hover/row:text-white transition-colors">PLO Masters</td>
                        <td className="px-6 py-5 text-emerald-400 font-bold">£250</td>
                        <td className="px-6 py-5 text-gray-300 group-hover/row:text-white transition-colors">£20,000</td>
                        <td className="px-6 py-5 text-gray-400 group-hover/row:text-gray-200 transition-colors">17 – 19 October</td>
                      </tr>
                      <tr className="hover:bg-[#077124]/10 transition-all duration-300 group/row">
                        <td className="px-6 py-5 text-gray-200 font-semibold group-hover/row:text-white transition-colors">High Roller</td>
                        <td className="px-6 py-5 text-emerald-400 font-bold">£1,000</td>
                        <td className="px-6 py-5 text-gray-300 group-hover/row:text-white transition-colors">Based on entries</td>
                        <td className="px-6 py-5 text-gray-400 group-hover/row:text-gray-200 transition-colors">19 October</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                {/* Bottom glow accent */}
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#077124]/60 to-transparent"></div>
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

