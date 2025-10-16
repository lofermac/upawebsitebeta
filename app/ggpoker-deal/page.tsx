"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

export default function GGPokerDealPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section - Black Background */}
      <section className="relative bg-black w-full px-3 md:px-4 pt-6 pb-8">
        {/* Premium Container Card - envolve Header, Título e Subtítulo */}
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
          
          {/* Hero Content - Title */}
          <div className="relative z-10 pt-20 pb-12 px-4">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-white text-center text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-12" 
                  style={{ 
                    textShadow: '0 2px 16px rgba(0,0,0,0.4)',
                    letterSpacing: '-0.02em'
                  }}>
                GGPoker Cashback Deal
              </h1>

              {/* Without Us vs With Us Comparison */}
              <div className="max-w-6xl mx-auto">
                <div className="relative rounded-[2rem] overflow-hidden backdrop-blur-xl group/comparison">
                  {/* Subtle background glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/60 via-zinc-800/50 to-zinc-900/60 rounded-[2rem] blur-sm"></div>
                  
                  {/* Main container with refined styling */}
                  <div className="relative bg-gradient-to-b from-black/70 via-black/60 to-black/70 backdrop-blur-2xl rounded-[2rem] border border-white/[0.1] overflow-hidden shadow-2xl shadow-black/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/[0.1]">
                      
                      {/* Without Us */}
                      <div className="p-10 md:p-12 flex flex-col items-center text-center group/without relative overflow-hidden transition-all duration-700">
                        {/* Subtle dark overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/10 opacity-0 group-hover/without:opacity-100 transition-opacity duration-700"></div>
                        
                        <div className="relative z-10 w-full">
                          <h3 className="text-white/50 text-xl md:text-2xl font-bold mb-10 tracking-tight group-hover/without:text-white/40 transition-colors duration-500"
                              style={{ 
                                textShadow: '0 2px 12px rgba(0,0,0,0.5)',
                                letterSpacing: '-0.015em'
                              }}>
                            Without Us
                          </h3>
                          <div className="space-y-8 w-full">
                            <div className="flex flex-col items-center">
                              <span className="text-white/40 text-sm mb-3 font-medium uppercase tracking-wider">Standard Rakeback</span>
                              <div className="relative">
                                <span className="text-5xl md:text-6xl font-black text-white/30 tracking-tight"
                                      style={{ 
                                        textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                                        letterSpacing: '-0.02em'
                                      }}>
                                  15-20%
                                </span>
                              </div>
                            </div>
                            <div className="pt-6 border-t border-white/[0.05]">
                              <p className="text-white/30 text-sm leading-relaxed max-w-xs mx-auto">
                                Basic Fish Buffet rewards with standard progression
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* With Us */}
                      <div className="p-10 md:p-12 flex flex-col items-center text-center group/with relative overflow-hidden">
                        {/* Subtle premium glow effects */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#077124]/[0.04] via-emerald-500/[0.02] to-[#077124]/[0.04] opacity-0 group-hover/with:opacity-100 transition-opacity duration-700"></div>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#077124]/10 rounded-full blur-3xl"></div>
                        
                        <div className="relative z-10 w-full">
                          <h3 className="text-white text-xl md:text-2xl font-bold mb-10 tracking-tight transition-colors duration-500"
                              style={{ 
                                textShadow: '0 2px 12px rgba(0,0,0,0.4)',
                                letterSpacing: '-0.015em'
                              }}>
                            With Us
                          </h3>
                          <div className="space-y-8 w-full">
                            <div className="flex flex-col items-center">
                              <span className="text-[#077124] text-sm mb-3 font-bold uppercase tracking-wider">Enhanced Rakeback</span>
                              <div className="relative">
                                {/* Refined single-layer glow */}
                                <div className="absolute inset-0 bg-gradient-to-r from-[#077124] to-emerald-400 blur-2xl opacity-20"></div>
                                
                                <span className="relative text-6xl md:text-7xl font-black bg-gradient-to-r from-[#077124] via-emerald-400 to-[#077124] bg-clip-text text-transparent tracking-tight"
                                      style={{ 
                                        letterSpacing: '-0.03em'
                                      }}>
                                  60%
                                </span>
                              </div>
                            </div>
                            <div className="pt-6 border-t border-[#077124]/20">
                              <p className="text-gray-200 text-sm leading-relaxed max-w-xs mx-auto">
                                Maximized Fish Buffet + exclusive Universal Poker bonuses
                              </p>
                            </div>
                          </div>
                          
                          {/* Register Button */}
                          <div className="mt-10">
                            <a href="/platform-connection?platform_id=1365" className="group/btn relative inline-flex items-center justify-center gap-2 px-12 py-4 text-base font-bold text-white bg-gradient-to-b from-[#088929] to-[#055a1c] rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.05] active:scale-[0.95]"
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
                              <span className="relative z-10 tracking-wide drop-shadow-lg">Register</span>
                              <div className="absolute inset-x-0 top-[1px] h-px bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"></div>
                            </a>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section - Pure Black Background */}
      <main className="relative bg-black w-full pt-12 pb-24">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Full Width Content */}
          <div className="space-y-12">
            
            {/* Sign Up Journey Section */}
            <div className="relative rounded-[2rem] overflow-hidden backdrop-blur-xl">
              {/* Background layers */}
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/95 via-black/95 to-zinc-900/95"></div>
              <div className="absolute inset-0 border border-white/[0.1] rounded-[2rem]"></div>
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              
              <div className="relative p-10 md:p-14">
                <div className="flex items-center gap-4 mb-12">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#077124] rounded-full blur-md opacity-30"></div>
                    <div className="relative w-2 h-2 rounded-full bg-gradient-to-br from-[#077124] to-emerald-400 shadow-lg shadow-[#077124]/30"></div>
                  </div>
                  <h2 className="text-white text-3xl md:text-[2.5rem] font-bold tracking-tight"
                      style={{ 
                        textShadow: '0 2px 20px rgba(0,0,0,0.5)',
                        letterSpacing: '-0.025em'
                      }}>
                    Sign Up Journey
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      step: '1',
                      title: 'Create Your Account',
                      description: 'Click the Register button and sign up through our exclusive link. Takes less than 2 minutes.',
                      icon: '📝'
                    },
                    {
                      step: '2',
                      title: 'Make Your First Deposit',
                      description: 'Fund your account with your preferred payment method. Minimum deposit: $10.',
                      icon: '💳'
                    },
                    {
                      step: '3',
                      title: 'Start Playing & Earning',
                      description: 'Play cash games or tournaments and watch your cashback grow automatically.',
                      icon: '🎯'
                    }
                  ].map((item, index) => (
                    <div key={index} className="group relative">
                      {/* Card Background */}
                      <div className="relative rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1">
                        {/* Background layers */}
                        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/50 via-zinc-900/50 to-black/50 group-hover:from-zinc-800/70 group-hover:via-zinc-900/70 group-hover:to-black/70 transition-all duration-500"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-[#077124]/[0.02] to-emerald-500/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="relative border border-white/[0.08] group-hover:border-[#077124]/30 rounded-2xl p-9 transition-all duration-500 shadow-xl">
                          
                          {/* Step Number & Icon */}
                          <div className="flex items-start justify-between mb-8">
                            <div className="relative flex-shrink-0">
                              {/* Subtle glow for step number */}
                              <div className="absolute inset-0 bg-gradient-to-r from-[#077124] to-emerald-400 rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                              
                              <div className="relative bg-gradient-to-br from-[#088929] via-[#077124] to-[#055a1c] w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl shadow-[#077124]/30 group-hover:shadow-[#077124]/50 transition-all duration-700"
                                   style={{
                                     boxShadow: '0 0 0 1px rgba(255,255,255,0.1), 0 8px 24px rgba(7,113,36,0.3), inset 0 1px 1px rgba(255,255,255,0.2)'
                                   }}>
                                <span className="text-white text-2xl font-black drop-shadow-lg">{item.step}</span>
                                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-2xl" style={{ height: '50%' }}></div>
                              </div>
                            </div>
                            <span className="text-5xl opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all duration-700">{item.icon}</span>
                          </div>

                          {/* Content */}
                          <h3 className="text-white text-xl font-bold mb-4 group-hover:text-[#077124] transition-colors duration-500"
                              style={{ 
                                letterSpacing: '-0.015em',
                                textShadow: '0 2px 12px rgba(0,0,0,0.3)'
                              }}>
                            {item.title}
                          </h3>
                          <p className="text-gray-400 text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-500">
                            {item.description}
                          </p>

                          {/* Bottom decoration with animation */}
                          <div className="mt-8 pt-6 border-t border-white/[0.08] group-hover:border-[#077124]/30 transition-colors duration-700">
                            <div className="flex items-center gap-2 text-[#077124] text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-1">
                              <span>Step {item.step}</span>
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA at bottom of Sign Up Journey */}
                <div className="mt-10 text-center">
                  <a href="/platform-connection?platform_id=1365" className="group/btn relative inline-flex items-center justify-center gap-3 px-12 py-5 text-lg font-bold text-white bg-gradient-to-b from-[#088929] to-[#055a1c] rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.05] active:scale-[0.98]"
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
                     }}>
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#077124] via-[#0a9b30] to-[#077124] rounded-full blur-xl opacity-60 group-hover/btn:opacity-90 transition-opacity duration-500"></div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 via-[#077124] to-emerald-400 rounded-full blur-2xl opacity-40 group-hover/btn:opacity-70 transition-opacity duration-500 animate-pulse-slow"></div>
                    <div className="absolute -inset-4 bg-[#077124] rounded-full blur-3xl opacity-20 group-hover/btn:opacity-40 transition-opacity duration-700"></div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 via-white/5 to-transparent" style={{ height: '50%' }}></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000 skew-x-12"></div>
                    <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]"></div>
                    <span className="relative z-10 tracking-wide drop-shadow-lg">Start Your Journey Now</span>
                    <ArrowRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1 drop-shadow-lg" strokeWidth={3} />
                    <div className="absolute inset-x-0 top-[1px] h-px bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"></div>
                    <div className="absolute inset-x-0 bottom-[1px] h-px bg-gradient-to-r from-transparent via-black/50 to-transparent rounded-full"></div>
                  </a>
                </div>
              </div>
            </div>

            {/* Review Section */}
            <div className="relative rounded-[2rem] overflow-hidden backdrop-blur-xl">
              {/* Background layers */}
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/95 via-black/95 to-zinc-900/95"></div>
              <div className="absolute inset-0 border border-white/[0.1] rounded-[2rem]"></div>
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              
              <div className="relative p-10 md:p-14">
                <div className="flex items-center gap-4 mb-12">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#077124] rounded-full blur-md opacity-30"></div>
                    <div className="relative w-2 h-2 rounded-full bg-gradient-to-br from-[#077124] to-emerald-400 shadow-lg shadow-[#077124]/30"></div>
                  </div>
                  <h2 className="text-white text-3xl md:text-[2.5rem] font-bold tracking-tight"
                      style={{ 
                        textShadow: '0 2px 20px rgba(0,0,0,0.5)',
                        letterSpacing: '-0.025em'
                      }}>
                    GGPoker Review
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  
                  {/* Left Column - Pros */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#077124] to-emerald-500 flex items-center justify-center shadow-lg">
                        <Check className="w-6 h-6 text-white" strokeWidth={3} />
                      </div>
                      <h3 className="text-white text-2xl font-bold">Pros</h3>
                    </div>
                    <div className="space-y-4">
                      {[
                        'Largest player pool globally',
                        'Innovative features (Rush & Cash, All-In Insurance)',
                        'Regular WSOP Online bracelet events',
                        'Excellent mobile app',
                        'Fast and secure cashouts',
                        'High-stakes action available',
                        'Comprehensive tournament schedule',
                        'Multi-table tournament guarantees'
                      ].map((pro, index) => (
                        <div key={index} className="flex items-start gap-3 group/item">
                          <div className="relative flex-shrink-0 mt-1">
                            <div className="absolute inset-0 bg-[#077124]/20 rounded-full blur-sm group-hover/item:bg-[#077124]/40 transition-all duration-300"></div>
                            <Check className="relative w-5 h-5 text-[#077124]" strokeWidth={3} />
                          </div>
                          <span className="text-gray-300 text-base leading-relaxed group-hover/item:text-white transition-colors duration-300">{pro}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column - Cons */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-700 to-zinc-600 flex items-center justify-center shadow-lg">
                        <span className="text-white text-2xl font-bold">−</span>
                      </div>
                      <h3 className="text-white text-2xl font-bold">Cons</h3>
                    </div>
                    <div className="space-y-4">
                      {[
                        'Not available in all countries',
                        'Rakeback capped at lower stakes',
                        'Some features require learning curve',
                        'High competition at popular times'
                      ].map((con, index) => (
                        <div key={index} className="flex items-start gap-3 group/item">
                          <div className="relative flex-shrink-0 mt-1">
                            <div className="w-5 h-5 rounded-full border-2 border-zinc-600 flex items-center justify-center">
                              <span className="text-zinc-500 text-xs font-bold">−</span>
                            </div>
                          </div>
                          <span className="text-gray-400 text-base leading-relaxed">{con}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Overall Rating - Ultra Premium */}
                <div className="mt-12 pt-12 border-t border-white/[0.1]">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="text-center md:text-left">
                      <h3 className="text-white text-2xl md:text-3xl font-bold mb-3"
                          style={{ 
                            textShadow: '0 2px 16px rgba(0,0,0,0.4)',
                            letterSpacing: '-0.02em'
                          }}>
                        Overall Rating
                      </h3>
                      <p className="text-gray-400 text-base leading-relaxed">Based on player pool, features, and rakeback potential</p>
                    </div>
                    <div className="relative group/rating">
                      {/* Subtle single-layer glow */}
                      <div className="absolute -inset-2 bg-gradient-to-r from-[#077124] to-emerald-400 rounded-3xl blur-2xl opacity-20 group-hover/rating:opacity-30 transition-opacity duration-500"></div>
                      
                      <div className="relative bg-gradient-to-br from-[#088929] via-[#077124] to-[#055a1c] px-12 py-8 rounded-3xl shadow-2xl group-hover/rating:scale-[1.02] transition-transform duration-500"
                           style={{
                             boxShadow: `
                               0 0 0 1px rgba(255,255,255,0.1),
                               0 8px 32px rgba(7,113,36,0.25),
                               inset 0 1px 1px rgba(255,255,255,0.2),
                               inset 0 -1px 1px rgba(0,0,0,0.2)
                             `
                           }}>
                        {/* Glass reflection */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent rounded-3xl" style={{ height: '50%' }}></div>
                        
                        <div className="relative flex items-center gap-3">
                          <span className="text-7xl font-black text-white drop-shadow-lg"
                                style={{ 
                                  textShadow: '0 2px 16px rgba(0,0,0,0.5)',
                                  letterSpacing: '-0.02em'
                                }}>
                            9.5
                          </span>
                          <span className="text-3xl text-white/70 font-bold">/10</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom info - Enhanced */}
                <div className="mt-12 relative group/info">
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-800/30 via-zinc-700/20 to-zinc-800/30 rounded-2xl blur-sm"></div>
                  <div className="relative p-8 rounded-2xl bg-gradient-to-br from-zinc-800/30 via-zinc-900/20 to-zinc-800/30 border border-white/[0.08] backdrop-blur-sm group-hover/info:border-[#077124]/30 transition-all duration-700">
                    <p className="text-gray-300 text-base md:text-lg leading-relaxed text-center">
                      <span className="text-white font-bold text-lg">Why GGPoker?</span>
                      <br />
                      <span className="text-gray-400 mt-2 inline-block">
                        With the world&apos;s largest player pool, innovative features, and our exclusive 60% rakeback deal, GGPoker offers unmatched value for serious players. Whether you&apos;re grinding cash games or chasing WSOP bracelets, this is where you want to play.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Back to Deals Link */}
            <div className="text-center pt-4">
              <Link href="/deals" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#077124] transition-colors duration-300 text-base font-semibold group">
                <span>← Back to All Deals</span>
              </Link>
            </div>

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

