"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function DealsPage() {
  return (
    <div className="bg-[#1E1E1E] min-h-screen flex flex-col">
      {/* Header Section with same styling as homepage */}
      <section className="relative bg-[#1E1E1E] w-full px-3 md:px-4 pt-6">
        <div className="absolute top-0 left-0 right-0 z-50 pt-6 px-4">
          <Header />
        </div>
      </section>

      <main className="relative bg-[#1E1E1E] w-full pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-white text-center text-4xl md:text-5xl font-bold mb-4">Our Exclusive Deals</h1>
        <p className="text-gray-400 text-center text-lg mb-16">Here you can see all of our deals</p>
        
        {/* Deals Grid - 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-auto">
          
          {/* Deal 1: GGPOKER - Primeira Linha */}
          <div className="group relative rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/40 via-zinc-800/50 to-zinc-900/50 rounded-2xl blur-sm group-hover:blur-md transition-all duration-500"></div>
            
            {/* Card Content */}
            <div className="relative bg-gradient-to-br from-zinc-900/95 via-black/95 to-zinc-900/95 border border-zinc-800/50 rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-red-600/20 group-hover:shadow-2xl transition-all duration-500 flex flex-col min-h-[580px]">
              {/* Background Image with Overlay */}
              <div className="relative h-48 overflow-hidden flex-shrink-0">
                {/* GGPoker brand red gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/30 via-red-700/20 to-zinc-900/40"></div>
                <img src="https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/01/07124324/GG-BACKRGOUND-WebP.webp" alt="GGPoker" className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-110 transition-all duration-700 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-red-600/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                {/* Subtle red glow effect */}
                <div className="absolute inset-0 bg-red-500/5 backdrop-blur-[1px]"></div>
              </div>
              
              {/* Logo */}
              <div className="absolute inset-0 h-48 flex items-center justify-center px-8">
                <img src="https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/09/07144333/ggpoker_logo-1_white-1.webp" alt="GGPoker Logo" className="max-h-16 max-w-full object-contain drop-shadow-2xl filter brightness-110 z-10" />
              </div>
              
              {/* Content - Compact layout */}
              <div className="relative px-6 pt-5 pb-3 flex flex-col">
                <div className="text-center space-y-2 mb-5">
                  <p className="text-base font-semibold text-zinc-400 tracking-wide">Get Up To</p>
                  <p className="text-5xl font-black text-white drop-shadow-lg leading-tight">60%<br />Cashback</p>
                  <p className="text-base text-zinc-400 leading-relaxed pt-1">Through The GGPoker Fish Buffet</p>
                </div>
                
                {/* Buttons */}
                <div className="flex gap-3 mb-3">
                  <a href="/platform-connection?platform_id=1365" className="flex-1 relative group/btn overflow-hidden bg-gradient-to-b from-[#088929] to-[#055a1c] text-white font-bold px-5 py-3 rounded-full text-center text-sm transition-all duration-500 hover:scale-[1.03] active:scale-[0.98]"
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
                    {/* Outer glow - Layer 1 (most intense) */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#077124] via-[#0a9b30] to-[#077124] rounded-full blur-xl opacity-60 group-hover/btn:opacity-90 transition-opacity duration-500"></div>
                    
                    {/* Outer glow - Layer 2 (medium spread) */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 via-[#077124] to-emerald-400 rounded-full blur-2xl opacity-40 group-hover/btn:opacity-70 transition-opacity duration-500 animate-pulse-slow"></div>
                    
                    {/* Outer glow - Layer 3 (soft wide spread) */}
                    <div className="absolute -inset-4 bg-[#077124] rounded-full blur-3xl opacity-20 group-hover/btn:opacity-40 transition-opacity duration-700"></div>
                    
                    {/* Glass reflection effect on top */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 via-white/5 to-transparent" style={{ height: '50%' }}></div>
                    
                    {/* Animated shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000 skew-x-12"></div>
                    
                    {/* Inner shadow for depth */}
                    <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]"></div>
                    
                    {/* Button content */}
                    <span className="relative z-10 tracking-wide drop-shadow-lg">Claim Offer</span>
                    
                    {/* Top edge highlight */}
                    <div className="absolute inset-x-0 top-[1px] h-px bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"></div>
                    
                    {/* Bottom edge shadow */}
                    <div className="absolute inset-x-0 bottom-[1px] h-px bg-gradient-to-r from-transparent via-black/50 to-transparent rounded-full"></div>
                  </a>
                  <a href="/deals/ggpoker/" className="flex-1 relative group/info overflow-hidden border-2 border-[#077124] text-[#077124] hover:text-white font-bold px-5 py-3 rounded-full text-center text-sm transition-all duration-300 hover:border-[#0a9b30] hover:scale-[1.03] backdrop-blur-sm bg-[#077124]/5">
                    <span className="relative z-10">More Info</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#077124] to-[#0a9b30] opacity-0 group-hover/info:opacity-100 transition-opacity duration-300"></div>
                  </a>
                </div>
                
                {/* Terms */}
                <p className="text-xs text-zinc-500 leading-snug text-center pt-3 border-t border-zinc-800/50">18+ (19+ in Canada) | Please Play Responsibly | Full GGPoker T&amp;C&apos;s Apply | Full Universal Poker T&amp;C&apos;s Apply | GambleAware</p>
              </div>
            </div>
          </div>

          {/* Deal 2: PARTYPOKER - Primeira Linha */}
          <div className="group relative rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/50 via-amber-600/40 to-zinc-900/50 rounded-2xl blur-sm group-hover:blur-md transition-all duration-500"></div>
            
            {/* Card Content */}
            <div className="relative bg-gradient-to-br from-zinc-900/95 via-black/95 to-zinc-900/95 border border-zinc-800/50 rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-orange-500/25 group-hover:shadow-2xl transition-all duration-500 flex flex-col min-h-[580px]">
              {/* Background Image with Overlay */}
              <div className="relative h-48 overflow-hidden flex-shrink-0">
                {/* PartyPoker brand orange/brown gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/35 via-amber-700/25 to-orange-900/30"></div>
                <img src="https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/01/17184316/PARTYPOKER-background-788x1024.webp" alt="PartyPoker" className="w-full h-full object-cover opacity-55 group-hover:opacity-75 group-hover:scale-110 transition-all duration-700 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/25 via-amber-600/15 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-500"></div>
                {/* Subtle warm glow effect */}
                <div className="absolute inset-0 bg-orange-600/8 backdrop-blur-[1px]"></div>
              </div>
              
              {/* Logo */}
              <div className="absolute inset-0 h-48 flex items-center justify-center px-8">
                <img src="https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/07/07144334/ENT_PartyPoker_Landscape_FullWhite_RGB.png" alt="PartyPoker Logo" className="max-h-16 max-w-full object-contain drop-shadow-2xl filter brightness-110 z-10" />
              </div>
              
              {/* Content */}
              <div className="relative px-6 pt-5 pb-3 flex flex-col">
                <div className="text-center space-y-2 mb-5">
                  <p className="text-base font-semibold text-zinc-400 tracking-wide">Get Up To</p>
                  <p className="text-5xl font-black text-white drop-shadow-lg leading-tight">65%<br />Cashback</p>
                  <p className="text-base text-zinc-400 leading-relaxed pt-1">Through Our Promotions</p>
                </div>
                
                {/* Buttons */}
                <div className="flex gap-3 mb-3">
                  <a href="/platform-connection?platform_id=1368" className="flex-1 relative group/btn overflow-hidden bg-gradient-to-b from-[#088929] to-[#055a1c] text-white font-bold px-5 py-3 rounded-full text-center text-sm transition-all duration-500 hover:scale-[1.03] active:scale-[0.98]"
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
                    <span className="relative z-10 tracking-wide drop-shadow-lg">Claim Offer</span>
                    <div className="absolute inset-x-0 top-[1px] h-px bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"></div>
                    <div className="absolute inset-x-0 bottom-[1px] h-px bg-gradient-to-r from-transparent via-black/50 to-transparent rounded-full"></div>
                  </a>
                  <a href="/deals/partypoker/" className="flex-1 relative group/info overflow-hidden border-2 border-[#077124] text-[#077124] hover:text-white font-bold px-5 py-3 rounded-full text-center text-sm transition-all duration-300 hover:border-[#0a9b30] hover:scale-[1.03] backdrop-blur-sm bg-[#077124]/5">
                    <span className="relative z-10">Learn More</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#077124] to-[#0a9b30] opacity-0 group-hover/info:opacity-100 transition-opacity duration-300"></div>
                  </a>
                </div>
                
                {/* Terms */}
                <p className="text-xs text-zinc-500 leading-snug text-center pt-3 border-t border-zinc-800/50">18+ (19+ in Canada) | Please Play Responsibly | Full PartyPoker T&amp;C&apos;s Apply | Full Universal Poker T&amp;C&apos;s Apply | GambleAware</p>
              </div>
            </div>
          </div>

          {/* Deal 3: 888POKER - Primeira Linha */}
          <div className="group relative rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/50 via-cyan-600/40 to-zinc-900/50 rounded-2xl blur-sm group-hover:blur-md transition-all duration-500"></div>
            
            {/* Card Content */}
            <div className="relative bg-gradient-to-br from-zinc-900/95 via-black/95 to-zinc-900/95 border border-zinc-800/50 rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-blue-500/25 group-hover:shadow-2xl transition-all duration-500 flex flex-col min-h-[580px]">
              {/* Background Image with Overlay */}
              <div className="relative h-48 overflow-hidden flex-shrink-0">
                {/* 888poker brand blue gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/35 via-cyan-700/25 to-blue-900/30"></div>
                <img src="https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/09/17183600/888-background-788x1024.webp" alt="888poker" className="w-full h-full object-cover opacity-55 group-hover:opacity-75 group-hover:scale-110 transition-all duration-700 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/25 via-cyan-600/15 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-500"></div>
                {/* Subtle blue glow effect */}
                <div className="absolute inset-0 bg-blue-500/8 backdrop-blur-[1px]"></div>
              </div>
              
              {/* Logo */}
              <div className="absolute inset-0 h-48 flex items-center justify-center px-8">
                <img src="https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/09/17183728/888-LOGO-webp-1024x309.webp" alt="888poker Logo" className="max-h-16 max-w-full object-contain drop-shadow-2xl filter brightness-110 z-10" />
              </div>
              
              {/* Content */}
              <div className="relative px-6 pt-5 pb-3 flex flex-col">
                <div className="text-center space-y-2 mb-5">
                  <p className="text-base font-semibold text-zinc-400 tracking-wide">Get An Extra</p>
                  <p className="text-5xl font-black text-white drop-shadow-lg leading-tight">50%<br />Cashback</p>
                  <p className="text-base text-zinc-400 leading-relaxed pt-1">Through Our Offer</p>
                </div>
                
                {/* Buttons */}
                <div className="flex gap-3 mb-3">
                  <a href="/platform-connection?platform_id=1367" className="flex-1 relative group/btn overflow-hidden bg-gradient-to-b from-[#088929] to-[#055a1c] text-white font-bold px-5 py-3 rounded-full text-center text-sm transition-all duration-500 hover:scale-[1.03] active:scale-[0.98]"
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
                    <span className="relative z-10 tracking-wide drop-shadow-lg">Claim Offer</span>
                    <div className="absolute inset-x-0 top-[1px] h-px bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"></div>
                    <div className="absolute inset-x-0 bottom-[1px] h-px bg-gradient-to-r from-transparent via-black/50 to-transparent rounded-full"></div>
                  </a>
                  <a href="/deals/888poker/" className="flex-1 relative group/info overflow-hidden border-2 border-[#077124] text-[#077124] hover:text-white font-bold px-5 py-3 rounded-full text-center text-sm transition-all duration-300 hover:border-[#0a9b30] hover:scale-[1.03] backdrop-blur-sm bg-[#077124]/5">
                    <span className="relative z-10">Learn More</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#077124] to-[#0a9b30] opacity-0 group-hover/info:opacity-100 transition-opacity duration-300"></div>
                  </a>
                </div>
                
                {/* Terms */}
                <p className="text-xs text-zinc-500 leading-snug text-center pt-3 border-t border-zinc-800/50">18+ (19+ in Canada) | Please Play Responsibly | Full 888Poker T&amp;C&apos;s Apply | Full Universal Poker T&amp;C&apos;s Apply | GambleAware</p>
              </div>
            </div>
          </div>

          {/* Deal 4: WPT GLOBAL - Segunda Linha */}
          <div className="group relative rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/50 via-indigo-600/40 to-zinc-900/50 rounded-2xl blur-sm group-hover:blur-md transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-zinc-900/95 via-black/95 to-zinc-900/95 border border-zinc-800/50 rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-purple-500/25 group-hover:shadow-2xl transition-all duration-500 flex flex-col min-h-[580px]">
              <div className="relative h-48 overflow-hidden flex-shrink-0">
                {/* WPT Global brand purple gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/35 via-indigo-700/25 to-purple-900/30"></div>
                <img src="https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/01/07104357/WPT-BG-WebP-1920x1002-1-1024x534.webp" alt="WPT Global" className="w-full h-full object-cover opacity-55 group-hover:opacity-75 group-hover:scale-110 transition-all duration-700 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/25 via-indigo-600/15 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-500"></div>
                {/* Subtle purple glow effect */}
                <div className="absolute inset-0 bg-purple-500/8 backdrop-blur-[1px]"></div>
              </div>
              <div className="absolute inset-0 h-48 flex items-center justify-center px-8">
                <img src="https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/01/07105909/WPT-LOGO-WebP-1920x350-1-1024x168.webp" alt="WPT Global Logo" className="max-h-16 max-w-full object-contain drop-shadow-2xl filter brightness-110 z-10" />
              </div>
              <div className="relative px-6 pt-5 pb-5 flex flex-col">
                <div className="text-center space-y-2 mb-5">
                  <p className="text-base font-semibold text-zinc-400 tracking-wide">Get Up To An Extra</p>
                  <p className="text-5xl font-black text-white drop-shadow-lg leading-tight">40%<br />Cashback</p>
                  <p className="text-base text-zinc-400 leading-relaxed pt-1">Every Month</p>
                </div>
                <div className="flex gap-3 mb-3">
                  <a href="/platform-connection?platform_id=1364" className="flex-1 relative group/btn overflow-hidden bg-gradient-to-b from-[#088929] to-[#055a1c] text-white font-bold px-5 py-3 rounded-full text-center text-sm transition-all duration-500 hover:scale-[1.03] active:scale-[0.98]"
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
                    <span className="relative z-10 tracking-wide drop-shadow-lg">Claim Offer</span>
                    <div className="absolute inset-x-0 top-[1px] h-px bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"></div>
                    <div className="absolute inset-x-0 bottom-[1px] h-px bg-gradient-to-r from-transparent via-black/50 to-transparent rounded-full"></div>
                  </a>
                  <a href="/deals/wptglobal/" className="flex-1 relative group/info overflow-hidden border-2 border-[#077124] text-[#077124] hover:text-white font-bold px-5 py-3 rounded-full text-center text-sm transition-all duration-300 hover:border-[#0a9b30] hover:scale-[1.03] backdrop-blur-sm bg-[#077124]/5">
                    <span className="relative z-10">More Info</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#077124] to-[#0a9b30] opacity-0 group-hover/info:opacity-100 transition-opacity duration-300"></div>
                  </a>
                </div>
                <p className="text-xs text-zinc-500 leading-snug text-center pt-3 border-t border-zinc-800/50">18+ | Please Play Responsibly | Full WPT Global T&amp;C&apos;s Apply | Full Universal Poker T&amp;C&apos;s Apply | GambleAware</p>
              </div>
            </div>
          </div>

          {/* Deal 5: UNIBET - Segunda Linha */}
          <div className="group relative rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/50 via-green-600/40 to-zinc-900/50 rounded-2xl blur-sm group-hover:blur-md transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-zinc-900/95 via-black/95 to-zinc-900/95 border border-zinc-800/50 rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-emerald-500/25 group-hover:shadow-2xl transition-all duration-500 flex flex-col min-h-[580px]">
              <div className="relative h-48 overflow-hidden flex-shrink-0">
                {/* Unibet brand green gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/35 via-green-700/25 to-emerald-900/30"></div>
                <img src="https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/08/28150352/Unibet-Deal-Tab-Final.png" alt="Unibet Poker" className="w-full h-full object-cover opacity-55 group-hover:opacity-75 group-hover:scale-110 transition-all duration-700 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/25 via-green-600/15 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-500"></div>
                {/* Subtle green glow effect */}
                <div className="absolute inset-0 bg-emerald-500/8 backdrop-blur-[1px]"></div>
              </div>
              <div className="absolute inset-0 h-48 flex items-center justify-center px-8">
                <img src="https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/08/15110203/Unitbet-Logo.png" alt="Unibet Logo" className="max-h-16 max-w-full object-contain drop-shadow-2xl filter brightness-110 z-10" />
              </div>
              <div className="relative px-6 pt-5 pb-5 flex flex-col">
                <div className="text-center space-y-2 mb-5">
                  <p className="text-base font-semibold text-zinc-400 tracking-wide">Enhanced Welcome Bonus</p>
                  <p className="text-5xl font-black text-white drop-shadow-lg leading-tight">Worth<br />£540</p>
                  <p className="text-base text-zinc-400 leading-relaxed pt-1">Plus 4 x €500 Freerolls</p>
                </div>
                <div className="flex gap-3 mb-3">
                  <a href="/platform-connection?platform_id=9074" className="flex-1 relative group/btn overflow-hidden bg-gradient-to-b from-[#088929] to-[#055a1c] text-white font-bold px-5 py-3 rounded-full text-center text-sm transition-all duration-500 hover:scale-[1.03] active:scale-[0.98]"
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
                    <span className="relative z-10 tracking-wide drop-shadow-lg">Claim Offer</span>
                    <div className="absolute inset-x-0 top-[1px] h-px bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"></div>
                    <div className="absolute inset-x-0 bottom-[1px] h-px bg-gradient-to-r from-transparent via-black/50 to-transparent rounded-full"></div>
                  </a>
                  <a href="/deals/unibet/" className="flex-1 relative group/info overflow-hidden border-2 border-[#077124] text-[#077124] hover:text-white font-bold px-5 py-3 rounded-full text-center text-sm transition-all duration-300 hover:border-[#0a9b30] hover:scale-[1.03] backdrop-blur-sm bg-[#077124]/5">
                    <span className="relative z-10">More Info</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#077124] to-[#0a9b30] opacity-0 group-hover/info:opacity-100 transition-opacity duration-300"></div>
                  </a>
                </div>
                <p className="text-xs text-zinc-500 leading-snug text-center pt-3 border-t border-zinc-800/50">18+ | GambleAware | Full Unibet T&amp;C&apos;s apply | Full Universal Poker T&amp;C&apos;s apply | Play Responsibly | New UK players only</p>
              </div>
            </div>
          </div>

          {/* Deal 6: BETFAIR POKER - Segunda Linha */}
          <div className="group relative rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/50 via-amber-600/40 to-zinc-900/50 rounded-2xl blur-sm group-hover:blur-md transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-zinc-900/95 via-black/95 to-zinc-900/95 border border-zinc-800/50 rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-yellow-500/25 group-hover:shadow-2xl transition-all duration-500 flex flex-col min-h-[580px]">
              <div className="relative h-48 overflow-hidden flex-shrink-0">
                {/* Betfair brand yellow gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/35 via-amber-700/25 to-yellow-900/30"></div>
                <img src="https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/09/24142934/betfair-webp.webp" alt="Betfair Poker" className="w-full h-full object-cover opacity-55 group-hover:opacity-75 group-hover:scale-110 transition-all duration-700 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/25 via-amber-600/15 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-500"></div>
                {/* Subtle yellow glow effect */}
                <div className="absolute inset-0 bg-yellow-500/8 backdrop-blur-[1px]"></div>
              </div>
              <div className="absolute inset-0 h-48 flex items-center justify-center px-8">
                <img src="https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/09/17185334/Betfair-Website-Logo-1-1-1-1024x185.webp" alt="Betfair Logo" className="max-h-16 max-w-full object-contain drop-shadow-2xl filter brightness-110 z-10" />
              </div>
              <div className="relative px-6 pt-5 pb-5 flex flex-col">
                <div className="text-center space-y-2 mb-5">
                  <p className="text-base font-semibold text-zinc-400 tracking-wide">Instant VIP Upgrade To</p>
                  <p className="text-5xl font-black text-white drop-shadow-lg leading-tight">35%<br />Cashback</p>
                  <p className="text-base text-zinc-400 leading-relaxed pt-1">+ €50k In Races</p>
                </div>
                <div className="flex gap-3 mb-3">
                  <a href="/platform-connection?platform_id=1363" className="flex-1 relative group/btn overflow-hidden bg-gradient-to-b from-[#088929] to-[#055a1c] text-white font-bold px-5 py-3 rounded-full text-center text-sm transition-all duration-500 hover:scale-[1.03] active:scale-[0.98]"
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
                    <span className="relative z-10 tracking-wide drop-shadow-lg">Claim Offer</span>
                    <div className="absolute inset-x-0 top-[1px] h-px bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"></div>
                    <div className="absolute inset-x-0 bottom-[1px] h-px bg-gradient-to-r from-transparent via-black/50 to-transparent rounded-full"></div>
                  </a>
                  <a href="/deals/betfair/" className="flex-1 relative group/info overflow-hidden border-2 border-[#077124] text-[#077124] hover:text-white font-bold px-5 py-3 rounded-full text-center text-sm transition-all duration-300 hover:border-[#0a9b30] hover:scale-[1.03] backdrop-blur-sm bg-[#077124]/5">
                    <span className="relative z-10">More Info</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#077124] to-[#0a9b30] opacity-0 group-hover/info:opacity-100 transition-opacity duration-300"></div>
                  </a>
                </div>
                <p className="text-xs text-zinc-500 leading-snug text-center pt-3 border-t border-zinc-800/50">18+ | Please Play Responsibly | Full Betfair T&amp;C&apos;s Apply | Full Universal Poker T&amp;C&apos;s Apply | GambleAware</p>
              </div>
            </div>
          </div>

          {/* Deal 7: CHAMPION POKER - Terceira Linha */}
          <div className="group relative rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/50 via-rose-600/40 to-zinc-900/50 rounded-2xl blur-sm group-hover:blur-md transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-zinc-900/95 via-black/95 to-zinc-900/95 border border-zinc-800/50 rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-red-500/25 group-hover:shadow-2xl transition-all duration-500 flex flex-col min-h-[580px]">
              <div className="relative h-48 overflow-hidden flex-shrink-0">
                {/* Champion Poker brand red gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/35 via-rose-700/25 to-red-900/30"></div>
                <img src="https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/01/17184718/ChampionPoker-background-1024x392.webp" alt="Champion Poker" className="w-full h-full object-cover opacity-55 group-hover:opacity-75 group-hover:scale-110 transition-all duration-700 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/25 via-rose-600/15 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-500"></div>
                {/* Subtle red glow effect */}
                <div className="absolute inset-0 bg-red-500/8 backdrop-blur-[1px]"></div>
              </div>
              <div className="absolute inset-0 h-48 flex items-center justify-center px-8">
                <img src="https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/17184626/CHAMPIONPOKER-logo-1024x160.webp" alt="Champion Poker Logo" className="max-h-16 max-w-full object-contain drop-shadow-2xl filter brightness-110 z-10" />
              </div>
              <div className="relative px-6 pt-5 pb-5 flex flex-col">
                <div className="text-center space-y-2 mb-5">
                  <p className="text-base font-semibold text-zinc-400 tracking-wide">Get An Instant Upgrade To</p>
                  <p className="text-5xl font-black text-white drop-shadow-lg leading-tight">30%<br />Cashback</p>
                  <p className="text-base text-zinc-400 leading-relaxed pt-1">+ All On-Site Promotions</p>
                </div>
                <div className="flex gap-3 mb-3">
                  <a href="/platform-connection?platform_id=6016" className="flex-1 relative group/btn overflow-hidden bg-gradient-to-b from-[#088929] to-[#055a1c] text-white font-bold px-5 py-3 rounded-full text-center text-sm transition-all duration-500 hover:scale-[1.03] active:scale-[0.98]"
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
                    <span className="relative z-10 tracking-wide drop-shadow-lg">Claim Offer</span>
                    <div className="absolute inset-x-0 top-[1px] h-px bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"></div>
                    <div className="absolute inset-x-0 bottom-[1px] h-px bg-gradient-to-r from-transparent via-black/50 to-transparent rounded-full"></div>
                  </a>
                  <a href="/deals/championpoker/" className="flex-1 relative group/info overflow-hidden border-2 border-[#077124] text-[#077124] hover:text-white font-bold px-5 py-3 rounded-full text-center text-sm transition-all duration-300 hover:border-[#0a9b30] hover:scale-[1.03] backdrop-blur-sm bg-[#077124]/5">
                    <span className="relative z-10">More Info</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#077124] to-[#0a9b30] opacity-0 group-hover/info:opacity-100 transition-opacity duration-300"></div>
                  </a>
                </div>
                <p className="text-xs text-zinc-500 leading-snug text-center pt-3 border-t border-zinc-800/50">18+ | Play Responsibly | Full Champion Poker T&amp;C&apos;s Apply | Full Universal Poker T&amp;C&apos;s Apply | GambleAware</p>
              </div>
            </div>
          </div>

          {/* Deal 8: WSOP.CA - Terceira Linha */}
          <div className="group relative rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/50 via-yellow-600/40 to-zinc-900/50 rounded-2xl blur-sm group-hover:blur-md transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-zinc-900/95 via-black/95 to-zinc-900/95 border border-zinc-800/50 rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-amber-500/25 group-hover:shadow-2xl transition-all duration-500 flex flex-col min-h-[580px]">
              <div className="relative h-48 overflow-hidden flex-shrink-0">
                {/* WSOP.CA brand gold/amber gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-600/35 via-yellow-700/25 to-amber-900/30"></div>
                <img src="https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/01/13213231/WSOPca-Tab-NENW-788x1024.png" alt="WSOP.CA" className="w-full h-full object-cover opacity-55 group-hover:opacity-75 group-hover:scale-110 transition-all duration-700 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/25 via-yellow-600/15 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-500"></div>
                {/* Subtle gold glow effect */}
                <div className="absolute inset-0 bg-amber-500/8 backdrop-blur-[1px]"></div>
              </div>
              <div className="absolute inset-0 h-48 flex items-center justify-center px-8">
                <img src="https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/12/11192441/wsop-ontario-logo-1024x376.webp" alt="WSOP.CA Logo" className="max-h-16 max-w-full object-contain drop-shadow-2xl filter brightness-110 z-10" />
              </div>
              <div className="relative px-6 pt-5 pb-5 flex flex-col">
                  <div className="text-center space-y-2 mb-5">
                    <p className="text-base font-semibold text-zinc-400 tracking-wide">Play On A</p>
                    <p className="text-5xl font-black text-white drop-shadow-lg leading-tight">GGPoker<br />Alternative</p>
                    <p className="text-base text-zinc-400 leading-relaxed pt-1">From Ontario Only</p>
                  </div>
                <div className="flex gap-3 mb-3">
                  <a href="/platform-connection?platform_id=2933" className="flex-1 relative group/btn overflow-hidden bg-gradient-to-b from-[#088929] to-[#055a1c] text-white font-bold px-5 py-3 rounded-full text-center text-sm transition-all duration-500 hover:scale-[1.03] active:scale-[0.98]"
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
                    <span className="relative z-10 tracking-wide drop-shadow-lg">Claim Offer</span>
                    <div className="absolute inset-x-0 top-[1px] h-px bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"></div>
                    <div className="absolute inset-x-0 bottom-[1px] h-px bg-gradient-to-r from-transparent via-black/50 to-transparent rounded-full"></div>
                  </a>
                  <a href="/deals/wsop-ca/" className="flex-1 relative group/info overflow-hidden border-2 border-[#077124] text-[#077124] hover:text-white font-bold px-5 py-3 rounded-full text-center text-sm transition-all duration-300 hover:border-[#0a9b30] hover:scale-[1.03] backdrop-blur-sm bg-[#077124]/5">
                    <span className="relative z-10">More Info</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#077124] to-[#0a9b30] opacity-0 group-hover/info:opacity-100 transition-opacity duration-300"></div>
                  </a>
                </div>
                <p className="text-xs text-zinc-500 leading-snug text-center pt-3 border-t border-zinc-800/50">19+ | Please Play Responsibly | Full WSOP.ca T&amp;C&apos;s Apply | Full Universal Poker T&amp;C&apos;s Apply | www.ConnexOntario.ca</p>
              </div>
            </div>
          </div>

          {/* Deal 9: OPTIBET POKER - Terceira Linha */}
          <div className="group relative rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/50 via-pink-600/40 to-zinc-900/50 rounded-2xl blur-sm group-hover:blur-md transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-zinc-900/95 via-black/95 to-zinc-900/95 border border-zinc-800/50 rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-rose-500/25 group-hover:shadow-2xl transition-all duration-500 flex flex-col min-h-[580px]">
              <div className="relative h-48 overflow-hidden flex-shrink-0">
                {/* Optibet brand rose/red gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-rose-600/35 via-pink-700/25 to-rose-900/30"></div>
                <img src="https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/09/07144315/MicrosoftTeams-image-110.png" alt="Optibet Poker" className="w-full h-full object-cover opacity-55 group-hover:opacity-75 group-hover:scale-110 transition-all duration-700 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/25 via-pink-600/15 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-500"></div>
                {/* Subtle rose glow effect */}
                <div className="absolute inset-0 bg-rose-500/8 backdrop-blur-[1px]"></div>
              </div>
              <div className="absolute inset-0 h-48 flex items-center justify-center px-8">
                <img src="https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/09/17100841/Optibet-Poker-logo-2D-horizontal-red-bg-1024x298.png" alt="Optibet Poker Logo" className="max-h-16 max-w-full object-contain drop-shadow-2xl filter brightness-110 z-10" />
              </div>
              <div className="relative px-6 pt-5 pb-5 flex flex-col">
                <div className="text-center space-y-2 mb-5">
                  <p className="text-base font-semibold text-zinc-400 tracking-wide">Get Up To</p>
                  <p className="text-5xl font-black text-white drop-shadow-lg leading-tight">60%<br />Cashback</p>
                  <p className="text-base text-zinc-400 leading-relaxed pt-1">Every Month</p>
                </div>
                <div className="flex gap-3 mb-3">
                  <a href="/platform-connection?platform_id=1362" className="flex-1 relative group/btn overflow-hidden bg-gradient-to-b from-[#088929] to-[#055a1c] text-white font-bold px-5 py-3 rounded-full text-center text-sm transition-all duration-500 hover:scale-[1.03] active:scale-[0.98]"
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
                    <span className="relative z-10 tracking-wide drop-shadow-lg">Claim Offer</span>
                    <div className="absolute inset-x-0 top-[1px] h-px bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"></div>
                    <div className="absolute inset-x-0 bottom-[1px] h-px bg-gradient-to-r from-transparent via-black/50 to-transparent rounded-full"></div>
                  </a>
                  <a href="/deals/optibet/" className="flex-1 relative group/info overflow-hidden border-2 border-[#077124] text-[#077124] hover:text-white font-bold px-5 py-3 rounded-full text-center text-sm transition-all duration-300 hover:border-[#0a9b30] hover:scale-[1.03] backdrop-blur-sm bg-[#077124]/5">
                    <span className="relative z-10">More Info</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#077124] to-[#0a9b30] opacity-0 group-hover/info:opacity-100 transition-opacity duration-300"></div>
                  </a>
                </div>
                <p className="text-xs text-zinc-500 leading-snug text-center pt-3 border-t border-zinc-800/50">18+ | Please Play Responsibly | GambleAware | Full Optibet T&amp;C&apos;s Apply | Full Universal Poker T&amp;C&apos;s Apply | EE &amp; LAT Only</p>
              </div>
            </div>
          </div>

          {/* Deal 10: COINPOKER - Quarta Linha */}
          <div className="group relative rounded-2xl overflow-hidden backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/50 via-orange-600/40 to-zinc-900/50 rounded-2xl blur-sm group-hover:blur-md transition-all duration-500"></div>
            <div className="relative bg-gradient-to-br from-zinc-900/95 via-black/95 to-zinc-900/95 border border-zinc-800/50 rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-red-500/25 group-hover:shadow-2xl transition-all duration-500 flex flex-col min-h-[580px]">
              <div className="relative h-48 overflow-hidden flex-shrink-0">
                {/* CoinPoker brand red/orange gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/35 via-orange-700/25 to-red-900/30"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/25 via-orange-600/15 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-500"></div>
                {/* Subtle red glow effect */}
                <div className="absolute inset-0 bg-red-500/8 backdrop-blur-[1px]"></div>
              </div>
              <div className="absolute inset-0 h-48 flex items-center justify-center px-8">
                <img src="/images/coinlogo.png" alt="CoinPoker Logo" className="max-h-64 max-w-full object-contain drop-shadow-2xl filter brightness-110 z-10" />
              </div>
              <div className="relative px-6 pt-5 pb-5 flex flex-col">
                <div className="text-center space-y-2 mb-5">
                  <p className="text-base font-semibold text-zinc-400 tracking-wide">Join Our</p>
                  <p className="text-5xl font-black text-white drop-shadow-lg leading-tight">Monthly Rake<br />Chase</p>
                  <p className="text-base text-zinc-400 leading-relaxed pt-1">Up To $1500 In Rewards</p>
                </div>
                <div className="flex gap-3 mb-3">
                  <a href="#" className="flex-1 relative group/btn overflow-hidden bg-gradient-to-b from-[#088929] to-[#055a1c] text-white font-bold px-5 py-3 rounded-full text-center text-sm transition-all duration-500 hover:scale-[1.03] active:scale-[0.98]"
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
                    <span className="relative z-10 tracking-wide drop-shadow-lg">Claim Offer</span>
                    <div className="absolute inset-x-0 top-[1px] h-px bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"></div>
                    <div className="absolute inset-x-0 bottom-[1px] h-px bg-gradient-to-r from-transparent via-black/50 to-transparent rounded-full"></div>
                  </a>
                  <a href="#" className="flex-1 relative group/info overflow-hidden border-2 border-[#077124] text-[#077124] hover:text-white font-bold px-5 py-3 rounded-full text-center text-sm transition-all duration-300 hover:border-[#0a9b30] hover:scale-[1.03] backdrop-blur-sm bg-[#077124]/5">
                    <span className="relative z-10">Learn More</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#077124] to-[#0a9b30] opacity-0 group-hover/info:opacity-100 transition-opacity duration-300"></div>
                  </a>
                </div>
                <p className="text-xs text-zinc-500 leading-snug text-center pt-3 border-t border-zinc-800/50">18+ (19+ in Canada) | Please Play Responsibly | Full CoinPoker T&amp;C&apos;s Apply | Full Universal Poker T&amp;C&apos;s Apply | GambleAware</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
      </main>
      <Footer />
    </div>
  );
}

