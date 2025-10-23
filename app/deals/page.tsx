"use client";

import HeaderWithAuth from "../components/HeaderWithAuth";
import Footer from "../components/Footer";
import DealCardWithGeo from "@/components/DealCardWithGeo";
import AuthModal from "@/components/AuthModal";
import JoinDealModal from "@/components/JoinDealModal";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useAuthModal } from "@/lib/hooks/useAuthModal";

export default function DealsPage() {
  const { isLoggedIn } = useAuth();
  const authModal = useAuthModal();

  // Handler para Claim Offer - verifica autenticação (APENAS 888poker para teste)
  const handleClaimOffer888 = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Sempre previne navegação
    
    if (!isLoggedIn) {
      authModal.openLogin('888Poker'); // Passa o nome do deal
    } else {
      // Se já está logado, abre direto o JoinDealModal
      authModal.openJoinDeal('888Poker');
    }
  };

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
            <HeaderWithAuth />
          </div>
          
          {/* Hero Content - Title and Subtitle */}
          <div className="relative z-10 pt-20 pb-20 px-4">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-white text-center text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-4" 
                  style={{ 
                    textShadow: '0 2px 16px rgba(0,0,0,0.4)',
                    letterSpacing: '-0.02em'
                  }}>
                Poker Deals
              </h1>
              <p className="text-gray-400 text-center text-lg md:text-xl lg:text-[1.35rem] max-w-5xl mx-auto leading-relaxed font-normal whitespace-nowrap"
                 style={{ 
                   textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                   letterSpacing: '-0.01em'
                 }}>
                We have a wide variety of Poker Deals available, with each one offering a unique deal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Deals Section - Pure Black Background */}
      <main className="relative bg-black w-full pt-8 pb-24">
        <div className="max-w-7xl mx-auto px-4">
        
        {/* Deals Grid - 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-auto">
          
          {/* Deal 1: GGPOKER */}
          <DealCardWithGeo dealId={1}>
          <div className="group relative rounded-[2rem] overflow-hidden backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/50 via-red-600/40 to-zinc-900/50 rounded-[2rem] blur-sm group-hover:blur-md transition-all duration-500"></div>
            <div className="relative border border-red-900/20 rounded-[2rem] overflow-hidden shadow-2xl group-hover:shadow-red-500/40 group-hover:shadow-2xl transition-all duration-500 flex flex-col min-h-[540px]"
                 style={{ background: 'radial-gradient(ellipse at center top, #962727 0%, #7D1F1F 20%, #6A1A1A 40%, #5C1616 60%, #3D0E0E 80%, #2B0A0A 100%)' }}>
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/30 pointer-events-none"></div>
              <div className="relative h-36 flex items-center justify-center px-8 pt-8 pb-6 flex-shrink-0">
                <img src="https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/09/07144333/ggpoker_logo-1_white-1.webp" alt="GGPoker Logo" className="max-h-14 max-w-full object-contain drop-shadow-2xl filter brightness-110 z-10" />
              </div>
              <div className="relative px-8 pt-0 pb-6 flex flex-col flex-grow">
                <div className="text-center space-y-0 mb-8">
                  <p className="text-sm sm:text-base md:text-lg lg:text-[1.5rem] font-semibold text-white/95 tracking-wide mb-3">Get Up To</p>
                  <p className="text-4xl sm:text-5xl md:text-6xl lg:text-[3rem] font-black text-white drop-shadow-lg leading-none">60%</p>
                  <p className="text-3xl sm:text-4xl md:text-5xl lg:text-[3rem] font-black text-white drop-shadow-lg leading-none mt-1">Cashback</p>
                  <p className="text-sm sm:text-base md:text-lg lg:text-[1.5rem] text-white/90 leading-relaxed pt-4 font-medium">With GGPoker Fish Buffet</p>
                </div>
                <div className="flex gap-3 justify-center mb-4 px-2">
                  {/* Claim Offer Button - Primary */}
                  <a href="/platform-connection?platform_id=1365" className="relative group/btn overflow-hidden bg-gradient-to-b from-[#088929] to-[#055a1c] text-white font-bold px-6 py-3.5 rounded-full text-center text-sm transition-all duration-500 hover:scale-[1.03] active:scale-[0.98] flex-1"
                     style={{ boxShadow: `0 1px 3px 0 rgba(0,0,0,0.5), 0 4px 12px rgba(7,113,36,0.3), 0 8px 32px rgba(7,113,36,0.25), 0 16px 64px rgba(7,113,36,0.2), inset 0 1px 1px rgba(255,255,255,0.3), inset 0 -1px 1px rgba(0,0,0,0.2)` }}>
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#077124] via-[#0a9b30] to-[#077124] rounded-full blur-xl opacity-60 group-hover/btn:opacity-90 transition-opacity duration-500"></div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 via-[#077124] to-emerald-400 rounded-full blur-2xl opacity-40 group-hover/btn:opacity-70 transition-opacity duration-500 animate-pulse-slow"></div>
                    <div className="absolute -inset-4 bg-[#077124] rounded-full blur-3xl opacity-20 group-hover/btn:opacity-40 transition-opacity duration-700"></div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 via-white/5 to-transparent" style={{ height: '50%' }}></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000 skew-x-12"></div>
                    <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]"></div>
                    <span className="relative z-10 tracking-wide drop-shadow-lg">Claim Offer</span>
                  </a>
                  {/* Learn More Button - Secondary */}
                  <a href="/ggpoker-deal" className="relative group/btn2 overflow-hidden bg-white/10 border border-white/20 text-white font-semibold px-6 py-3.5 rounded-full text-center text-sm transition-all duration-300 hover:bg-white/15 hover:border-white/30 active:scale-[0.98] flex-1 backdrop-blur-sm">
                    <span className="relative z-10 tracking-wide drop-shadow-lg">Learn More</span>
                  </a>
                </div>
                <div className="mt-auto pt-5 border-t border-white/[0.15]">
                  <p className="text-[0.7rem] text-white/60 leading-tight text-center px-2">18+ (19+ in Canada) | Please Play Responsibly | Full GGPoker T&amp;C&apos;s Apply | Full Universal Poker T&amp;C&apos;s Apply | GambleAware</p>
                </div>
              </div>
            </div>
          </div>
          </DealCardWithGeo>

          {/* Deal 2: PARTYPOKER */}
          <DealCardWithGeo dealId={2}>
          <div className="group relative rounded-[2rem] overflow-hidden backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/50 via-amber-600/40 to-zinc-900/50 rounded-[2rem] blur-sm group-hover:blur-md transition-all duration-500"></div>
            <div className="relative border border-orange-900/20 rounded-[2rem] overflow-hidden shadow-2xl group-hover:shadow-orange-500/40 group-hover:shadow-2xl transition-all duration-500 flex flex-col min-h-[540px]"
                 style={{ background: 'radial-gradient(ellipse at center top, #C8582B 0%, #B85425 20%, #A04920 40%, #8B3D1A 60%, #6B2F15 80%, #4D2310 100%)' }}>
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/30 pointer-events-none"></div>
              <div className="relative h-36 flex items-center justify-center px-8 pt-8 pb-6 flex-shrink-0">
                <img src="https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/07/07144334/ENT_PartyPoker_Landscape_FullWhite_RGB.png" alt="PartyPoker Logo" className="max-h-14 max-w-full object-contain drop-shadow-2xl filter brightness-110 z-10" />
              </div>
              <div className="relative px-8 pt-0 pb-6 flex flex-col flex-grow">
                <div className="text-center space-y-0 mb-8">
                  <p className="text-sm sm:text-base md:text-lg lg:text-[1.5rem] font-semibold text-white/95 tracking-wide mb-3">Get Up To</p>
                  <p className="text-4xl sm:text-5xl md:text-6xl lg:text-[3rem] font-black text-white drop-shadow-lg leading-none">65%</p>
                  <p className="text-3xl sm:text-4xl md:text-5xl lg:text-[3rem] font-black text-white drop-shadow-lg leading-none mt-1">Cashback</p>
                  <p className="text-sm sm:text-base md:text-lg lg:text-[1.5rem] text-white/90 leading-relaxed pt-4 font-medium">Through Our Promotions</p>
                </div>
                <div className="flex gap-3 justify-center mb-4 px-2">
                  <a href="/platform-connection?platform_id=1368" className="relative group/btn overflow-hidden bg-gradient-to-b from-[#088929] to-[#055a1c] text-white font-bold px-6 py-3.5 rounded-full text-center text-sm transition-all duration-500 hover:scale-[1.03] active:scale-[0.98] flex-1"
                     style={{ boxShadow: `0 1px 3px 0 rgba(0,0,0,0.5), 0 4px 12px rgba(7,113,36,0.3), 0 8px 32px rgba(7,113,36,0.25), 0 16px 64px rgba(7,113,36,0.2), inset 0 1px 1px rgba(255,255,255,0.3), inset 0 -1px 1px rgba(0,0,0,0.2)` }}>
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#077124] via-[#0a9b30] to-[#077124] rounded-full blur-xl opacity-60 group-hover/btn:opacity-90 transition-opacity duration-500"></div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 via-[#077124] to-emerald-400 rounded-full blur-2xl opacity-40 group-hover/btn:opacity-70 transition-opacity duration-500 animate-pulse-slow"></div>
                    <div className="absolute -inset-4 bg-[#077124] rounded-full blur-3xl opacity-20 group-hover/btn:opacity-40 transition-opacity duration-700"></div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 via-white/5 to-transparent" style={{ height: '50%' }}></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000 skew-x-12"></div>
                    <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]"></div>
                    <span className="relative z-10 tracking-wide drop-shadow-lg">Claim Offer</span>
                  </a>
                  <a href="#" className="relative group/btn2 overflow-hidden bg-white/10 border border-white/20 text-white font-semibold px-6 py-3.5 rounded-full text-center text-sm transition-all duration-300 hover:bg-white/15 hover:border-white/30 active:scale-[0.98] flex-1 backdrop-blur-sm">
                    <span className="relative z-10 tracking-wide drop-shadow-lg">Learn More</span>
                  </a>
                </div>
                <div className="mt-auto pt-5 border-t border-white/[0.15]">
                  <p className="text-[0.7rem] text-white/60 leading-tight text-center px-2">18+ (19+ in Canada) | Please Play Responsibly | Full PartyPoker T&amp;C&apos;s Apply | Full Universal Poker T&amp;C&apos;s Apply | GambleAware</p>
                </div>
              </div>
            </div>
          </div>
          </DealCardWithGeo>

          {/* Deal 3: 888POKER */}
          <DealCardWithGeo dealId={3}>
          <div className="group relative rounded-[2rem] overflow-hidden backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/50 via-cyan-600/40 to-zinc-900/50 rounded-[2rem] blur-sm group-hover:blur-md transition-all duration-500"></div>
            <div className="relative border border-blue-900/20 rounded-[2rem] overflow-hidden shadow-2xl group-hover:shadow-blue-500/40 group-hover:shadow-2xl transition-all duration-500 flex flex-col min-h-[540px]"
                 style={{ background: 'radial-gradient(ellipse at center top, #3B5FA3 0%, #2E56A3 20%, #264A8C 40%, #234489 60%, #1A3470 80%, #142958 100%)' }}>
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/30 pointer-events-none"></div>
              <div className="relative h-36 flex items-center justify-center px-8 pt-8 pb-6 flex-shrink-0">
                <img src="https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/09/17183728/888-LOGO-webp-1024x309.webp" alt="888poker Logo" className="max-h-14 max-w-full object-contain drop-shadow-2xl filter brightness-110 z-10" />
              </div>
              <div className="relative px-8 pt-0 pb-6 flex flex-col flex-grow">
                <div className="text-center space-y-0 mb-8">
                  <p className="text-sm sm:text-base md:text-lg lg:text-[1.5rem] font-semibold text-white/95 tracking-wide mb-3">Get An Extra</p>
                  <p className="text-4xl sm:text-5xl md:text-6xl lg:text-[3rem] font-black text-white drop-shadow-lg leading-none">50%</p>
                  <p className="text-3xl sm:text-4xl md:text-5xl lg:text-[3rem] font-black text-white drop-shadow-lg leading-none mt-1">Cashback</p>
                  <p className="text-sm sm:text-base md:text-lg lg:text-[1.5rem] text-white/90 leading-relaxed pt-4 font-medium">Through Our Promotions</p>
                </div>
                <div className="flex gap-3 justify-center mb-4 px-2">
                  <a href="/platform-connection?platform_id=1367" onClick={handleClaimOffer888} className="relative group/btn overflow-hidden bg-gradient-to-b from-[#088929] to-[#055a1c] text-white font-bold px-6 py-3.5 rounded-full text-center text-sm transition-all duration-500 hover:scale-[1.03] active:scale-[0.98] flex-1"
                     style={{ boxShadow: `0 1px 3px 0 rgba(0,0,0,0.5), 0 4px 12px rgba(7,113,36,0.3), 0 8px 32px rgba(7,113,36,0.25), 0 16px 64px rgba(7,113,36,0.2), inset 0 1px 1px rgba(255,255,255,0.3), inset 0 -1px 1px rgba(0,0,0,0.2)` }}>
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#077124] via-[#0a9b30] to-[#077124] rounded-full blur-xl opacity-60 group-hover/btn:opacity-90 transition-opacity duration-500"></div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 via-[#077124] to-emerald-400 rounded-full blur-2xl opacity-40 group-hover/btn:opacity-70 transition-opacity duration-500 animate-pulse-slow"></div>
                    <div className="absolute -inset-4 bg-[#077124] rounded-full blur-3xl opacity-20 group-hover/btn:opacity-40 transition-opacity duration-700"></div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 via-white/5 to-transparent" style={{ height: '50%' }}></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000 skew-x-12"></div>
                    <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]"></div>
                    <span className="relative z-10 tracking-wide drop-shadow-lg">Claim Offer</span>
                  </a>
                  <a href="#" className="relative group/btn2 overflow-hidden bg-white/10 border border-white/20 text-white font-semibold px-6 py-3.5 rounded-full text-center text-sm transition-all duration-300 hover:bg-white/15 hover:border-white/30 active:scale-[0.98] flex-1 backdrop-blur-sm">
                    <span className="relative z-10 tracking-wide drop-shadow-lg">Learn More</span>
                  </a>
                </div>
                <div className="mt-auto pt-5 border-t border-white/[0.15]">
                  <p className="text-[0.7rem] text-white/60 leading-tight text-center px-2">#Ad | 18+ | Please Play Responsibly | Full 888Poker T&amp;C&apos;s Apply | Full Universal Poker T&amp;C&apos;s Apply | GambleAware</p>
                </div>
              </div>
            </div>
          </div>
          </DealCardWithGeo>

          {/* Deal 4: WPT GLOBAL */}
          <DealCardWithGeo dealId={4}>
          <div className="group relative rounded-[2rem] overflow-hidden backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/50 via-indigo-600/40 to-zinc-900/50 rounded-[2rem] blur-sm group-hover:blur-md transition-all duration-500"></div>
            <div className="relative border border-purple-900/20 rounded-[2rem] overflow-hidden shadow-2xl group-hover:shadow-purple-500/40 group-hover:shadow-2xl transition-all duration-500 flex flex-col min-h-[540px]"
                 style={{ background: 'radial-gradient(ellipse at center top, #633C9A 0%, #563391 20%, #4A2C7D 40%, #43277A 60%, #301C63 80%, #20134C 100%)' }}>
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/30 pointer-events-none"></div>
              <div className="relative h-36 flex items-center justify-center px-8 pt-8 pb-6 flex-shrink-0">
                <img src="https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/01/07105909/WPT-LOGO-WebP-1920x350-1-1024x168.webp" alt="WPT Global Logo" className="max-h-14 max-w-full object-contain drop-shadow-2xl filter brightness-110 z-10" />
              </div>
              <div className="relative px-8 pt-0 pb-6 flex flex-col flex-grow">
                <div className="text-center space-y-0 mb-8">
                  <p className="text-sm sm:text-base md:text-lg lg:text-[1.5rem] font-semibold text-white/95 tracking-wide mb-3">Get Up To An Extra</p>
                  <p className="text-4xl sm:text-5xl md:text-6xl lg:text-[3rem] font-black text-white drop-shadow-lg leading-none">40%</p>
                  <p className="text-3xl sm:text-4xl md:text-5xl lg:text-[3rem] font-black text-white drop-shadow-lg leading-none mt-1">Cashback</p>
                  <p className="text-sm sm:text-base md:text-lg lg:text-[1.5rem] text-white/90 leading-relaxed pt-4 font-medium">Every Month</p>
                </div>
                <div className="flex gap-3 justify-center mb-4 px-2">
                  <a href="/platform-connection?platform_id=1364" className="relative group/btn overflow-hidden bg-gradient-to-b from-[#088929] to-[#055a1c] text-white font-bold px-6 py-3.5 rounded-full text-center text-sm transition-all duration-500 hover:scale-[1.03] active:scale-[0.98] flex-1"
                     style={{ boxShadow: `0 1px 3px 0 rgba(0,0,0,0.5), 0 4px 12px rgba(7,113,36,0.3), 0 8px 32px rgba(7,113,36,0.25), 0 16px 64px rgba(7,113,36,0.2), inset 0 1px 1px rgba(255,255,255,0.3), inset 0 -1px 1px rgba(0,0,0,0.2)` }}>
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#077124] via-[#0a9b30] to-[#077124] rounded-full blur-xl opacity-60 group-hover/btn:opacity-90 transition-opacity duration-500"></div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 via-[#077124] to-emerald-400 rounded-full blur-2xl opacity-40 group-hover/btn:opacity-70 transition-opacity duration-500 animate-pulse-slow"></div>
                    <div className="absolute -inset-4 bg-[#077124] rounded-full blur-3xl opacity-20 group-hover/btn:opacity-40 transition-opacity duration-700"></div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 via-white/5 to-transparent" style={{ height: '50%' }}></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000 skew-x-12"></div>
                    <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]"></div>
                    <span className="relative z-10 tracking-wide drop-shadow-lg">Claim Offer</span>
                  </a>
                  <a href="#" className="relative group/btn2 overflow-hidden bg-white/10 border border-white/20 text-white font-semibold px-6 py-3.5 rounded-full text-center text-sm transition-all duration-300 hover:bg-white/15 hover:border-white/30 active:scale-[0.98] flex-1 backdrop-blur-sm">
                    <span className="relative z-10 tracking-wide drop-shadow-lg">Learn More</span>
                  </a>
                </div>
                <div className="mt-auto pt-5 border-t border-white/[0.15]">
                  <p className="text-[0.7rem] text-white/60 leading-tight text-center px-2">18+ | Please Play Responsibly | Full WPT Global T&amp;C&apos;s Apply | Full Universal Poker T&amp;C&apos;s Apply | GambleAware</p>
                </div>
              </div>
            </div>
          </div>
          </DealCardWithGeo>

          {/* Deal 5: UNIBET */}
          <DealCardWithGeo dealId={5}>
          <div className="group relative rounded-[2rem] overflow-hidden backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/50 via-green-600/40 to-zinc-900/50 rounded-[2rem] blur-sm group-hover:blur-md transition-all duration-500"></div>
            <div className="relative border border-emerald-900/20 rounded-[2rem] overflow-hidden shadow-2xl group-hover:shadow-emerald-500/40 group-hover:shadow-2xl transition-all duration-500 flex flex-col min-h-[540px]"
                 style={{ background: 'radial-gradient(ellipse at center top, #398654 0%, #2F7547 20%, #28653D 40%, #235935 60%, #183E24 80%, #0F2A18 100%)' }}>
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/30 pointer-events-none"></div>
              <div className="relative h-36 flex items-center justify-center px-8 pt-8 pb-6 flex-shrink-0">
                <img src="https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/08/15110203/Unitbet-Logo.png" alt="Unibet Logo" className="max-h-14 max-w-full object-contain drop-shadow-2xl filter brightness-110 z-10" />
              </div>
              <div className="relative px-8 pt-0 pb-6 flex flex-col flex-grow">
                <div className="text-center space-y-0 mb-8">
                  <p className="text-sm sm:text-base md:text-lg lg:text-[1.5rem] font-semibold text-white/95 tracking-wide mb-3">Enhanced Welcome Bonus</p>
                  <p className="text-4xl sm:text-5xl md:text-6xl lg:text-[3rem] font-black text-white drop-shadow-lg leading-none">Worth</p>
                  <p className="text-3xl sm:text-4xl md:text-5xl lg:text-[3rem] font-black text-white drop-shadow-lg leading-none mt-1">£540</p>
                  <p className="text-sm sm:text-base md:text-lg lg:text-[1.5rem] text-white/90 leading-relaxed pt-4 font-medium">Plus 4 x €500 Freerolls</p>
                </div>
                <div className="flex gap-3 justify-center mb-4 px-2">
                  <a href="/platform-connection?platform_id=9074" className="relative group/btn overflow-hidden bg-gradient-to-b from-[#088929] to-[#055a1c] text-white font-bold px-6 py-3.5 rounded-full text-center text-sm transition-all duration-500 hover:scale-[1.03] active:scale-[0.98] flex-1"
                     style={{ boxShadow: `0 1px 3px 0 rgba(0,0,0,0.5), 0 4px 12px rgba(7,113,36,0.3), 0 8px 32px rgba(7,113,36,0.25), 0 16px 64px rgba(7,113,36,0.2), inset 0 1px 1px rgba(255,255,255,0.3), inset 0 -1px 1px rgba(0,0,0,0.2)` }}>
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#077124] via-[#0a9b30] to-[#077124] rounded-full blur-xl opacity-60 group-hover/btn:opacity-90 transition-opacity duration-500"></div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 via-[#077124] to-emerald-400 rounded-full blur-2xl opacity-40 group-hover/btn:opacity-70 transition-opacity duration-500 animate-pulse-slow"></div>
                    <div className="absolute -inset-4 bg-[#077124] rounded-full blur-3xl opacity-20 group-hover/btn:opacity-40 transition-opacity duration-700"></div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 via-white/5 to-transparent" style={{ height: '50%' }}></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000 skew-x-12"></div>
                    <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]"></div>
                    <span className="relative z-10 tracking-wide drop-shadow-lg">Claim Offer</span>
                  </a>
                  <a href="#" className="relative group/btn2 overflow-hidden bg-white/10 border border-white/20 text-white font-semibold px-6 py-3.5 rounded-full text-center text-sm transition-all duration-300 hover:bg-white/15 hover:border-white/30 active:scale-[0.98] flex-1 backdrop-blur-sm">
                    <span className="relative z-10 tracking-wide drop-shadow-lg">Learn More</span>
                  </a>
                </div>
                <div className="mt-auto pt-5 border-t border-white/[0.15]">
                  <p className="text-[0.7rem] text-white/60 leading-tight text-center px-2">18+ | GambleAware | Full Unibet T&amp;C&apos;s apply | Full Universal Poker T&amp;C&apos;s apply | Play Responsibly | New UK players only</p>
                </div>
              </div>
            </div>
          </div>
          </DealCardWithGeo>

          {/* Deal 6: BETFAIR POKER */}
          <DealCardWithGeo dealId={6}>
          <div className="group relative rounded-[2rem] overflow-hidden backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/50 via-amber-600/40 to-zinc-900/50 rounded-[2rem] blur-sm group-hover:blur-md transition-all duration-500"></div>
            <div className="relative border border-yellow-900/20 rounded-[2rem] overflow-hidden shadow-2xl group-hover:shadow-yellow-500/40 group-hover:shadow-2xl transition-all duration-500 flex flex-col min-h-[540px]"
                 style={{ background: 'radial-gradient(ellipse at center top, #AA872C 0%, #947625 20%, #80651F 40%, #705A1C 60%, #4D3F14 80%, #352B0E 100%)' }}>
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/30 pointer-events-none"></div>
              <div className="relative h-36 flex items-center justify-center px-8 pt-8 pb-6 flex-shrink-0">
                <img src="https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/09/17185334/Betfair-Website-Logo-1-1-1-1024x185.webp" alt="Betfair Logo" className="max-h-14 max-w-full object-contain drop-shadow-2xl filter brightness-110 z-10" />
              </div>
              <div className="relative px-8 pt-0 pb-6 flex flex-col flex-grow">
                <div className="text-center space-y-0 mb-8">
                  <p className="text-sm sm:text-base md:text-lg lg:text-[1.5rem] font-semibold text-white/95 tracking-wide mb-3">Instant VIP Upgrade To</p>
                  <p className="text-4xl sm:text-5xl md:text-6xl lg:text-[3rem] font-black text-white drop-shadow-lg leading-none">35%</p>
                  <p className="text-3xl sm:text-4xl md:text-5xl lg:text-[3rem] font-black text-white drop-shadow-lg leading-none mt-1">Cashback</p>
                  <p className="text-sm sm:text-base md:text-lg lg:text-[1.5rem] text-white/90 leading-relaxed pt-4 font-medium">+ €50k In Races</p>
                </div>
                <div className="flex gap-3 justify-center mb-4 px-2">
                  <a href="/platform-connection?platform_id=1363" className="relative group/btn overflow-hidden bg-gradient-to-b from-[#088929] to-[#055a1c] text-white font-bold px-6 py-3.5 rounded-full text-center text-sm transition-all duration-500 hover:scale-[1.03] active:scale-[0.98] flex-1"
                     style={{ boxShadow: `0 1px 3px 0 rgba(0,0,0,0.5), 0 4px 12px rgba(7,113,36,0.3), 0 8px 32px rgba(7,113,36,0.25), 0 16px 64px rgba(7,113,36,0.2), inset 0 1px 1px rgba(255,255,255,0.3), inset 0 -1px 1px rgba(0,0,0,0.2)` }}>
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#077124] via-[#0a9b30] to-[#077124] rounded-full blur-xl opacity-60 group-hover/btn:opacity-90 transition-opacity duration-500"></div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 via-[#077124] to-emerald-400 rounded-full blur-2xl opacity-40 group-hover/btn:opacity-70 transition-opacity duration-500 animate-pulse-slow"></div>
                    <div className="absolute -inset-4 bg-[#077124] rounded-full blur-3xl opacity-20 group-hover/btn:opacity-40 transition-opacity duration-700"></div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 via-white/5 to-transparent" style={{ height: '50%' }}></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000 skew-x-12"></div>
                    <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]"></div>
                    <span className="relative z-10 tracking-wide drop-shadow-lg">Claim Offer</span>
                  </a>
                  <a href="#" className="relative group/btn2 overflow-hidden bg-white/10 border border-white/20 text-white font-semibold px-6 py-3.5 rounded-full text-center text-sm transition-all duration-300 hover:bg-white/15 hover:border-white/30 active:scale-[0.98] flex-1 backdrop-blur-sm">
                    <span className="relative z-10 tracking-wide drop-shadow-lg">Learn More</span>
                  </a>
                </div>
                <div className="mt-auto pt-5 border-t border-white/[0.15]">
                  <p className="text-[0.7rem] text-white/60 leading-tight text-center px-2">18+ | Please Play Responsibly | Full Betfair T&amp;C&apos;s Apply | Full Universal Poker T&amp;C&apos;s Apply | GambleAware</p>
                </div>
              </div>
            </div>
          </div>
          </DealCardWithGeo>

          {/* Deal 7: CHAMPION POKER */}
          <DealCardWithGeo dealId={7}>
          <div className="group relative rounded-[2rem] overflow-hidden backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/50 via-rose-600/40 to-zinc-900/50 rounded-[2rem] blur-sm group-hover:blur-md transition-all duration-500"></div>
            <div className="relative border border-red-900/20 rounded-[2rem] overflow-hidden shadow-2xl group-hover:shadow-red-500/40 group-hover:shadow-2xl transition-all duration-500 flex flex-col min-h-[540px]"
                 style={{ background: 'radial-gradient(ellipse at center top, #943636 0%, #7D2D2D 20%, #6A2626 40%, #5C2121 60%, #3D1616 80%, #2B0F0F 100%)' }}>
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/30 pointer-events-none"></div>
              <div className="relative h-36 flex items-center justify-center px-8 pt-8 pb-6 flex-shrink-0">
                <img src="https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/17184626/CHAMPIONPOKER-logo-1024x160.webp" alt="Champion Poker Logo" className="max-h-14 max-w-full object-contain drop-shadow-2xl filter brightness-110 z-10" />
              </div>
              <div className="relative px-8 pt-0 pb-6 flex flex-col flex-grow">
                <div className="text-center space-y-0 mb-8">
                  <p className="text-sm sm:text-base md:text-lg lg:text-[1.5rem] font-semibold text-white/95 tracking-wide mb-3">Get An Instant Upgrade To</p>
                  <p className="text-4xl sm:text-5xl md:text-6xl lg:text-[3rem] font-black text-white drop-shadow-lg leading-none">30%</p>
                  <p className="text-3xl sm:text-4xl md:text-5xl lg:text-[3rem] font-black text-white drop-shadow-lg leading-none mt-1">Cashback</p>
                  <p className="text-sm sm:text-base md:text-lg lg:text-[1.5rem] text-white/90 leading-relaxed pt-4 font-medium">+ All On-Site Promotions</p>
                </div>
                <div className="flex gap-3 justify-center mb-4 px-2">
                  <a href="/platform-connection?platform_id=6016" className="relative group/btn overflow-hidden bg-gradient-to-b from-[#088929] to-[#055a1c] text-white font-bold px-6 py-3.5 rounded-full text-center text-sm transition-all duration-500 hover:scale-[1.03] active:scale-[0.98] flex-1"
                     style={{ boxShadow: `0 1px 3px 0 rgba(0,0,0,0.5), 0 4px 12px rgba(7,113,36,0.3), 0 8px 32px rgba(7,113,36,0.25), 0 16px 64px rgba(7,113,36,0.2), inset 0 1px 1px rgba(255,255,255,0.3), inset 0 -1px 1px rgba(0,0,0,0.2)` }}>
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#077124] via-[#0a9b30] to-[#077124] rounded-full blur-xl opacity-60 group-hover/btn:opacity-90 transition-opacity duration-500"></div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 via-[#077124] to-emerald-400 rounded-full blur-2xl opacity-40 group-hover/btn:opacity-70 transition-opacity duration-500 animate-pulse-slow"></div>
                    <div className="absolute -inset-4 bg-[#077124] rounded-full blur-3xl opacity-20 group-hover/btn:opacity-40 transition-opacity duration-700"></div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 via-white/5 to-transparent" style={{ height: '50%' }}></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000 skew-x-12"></div>
                    <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]"></div>
                    <span className="relative z-10 tracking-wide drop-shadow-lg">Claim Offer</span>
                  </a>
                  <a href="#" className="relative group/btn2 overflow-hidden bg-white/10 border border-white/20 text-white font-semibold px-6 py-3.5 rounded-full text-center text-sm transition-all duration-300 hover:bg-white/15 hover:border-white/30 active:scale-[0.98] flex-1 backdrop-blur-sm">
                    <span className="relative z-10 tracking-wide drop-shadow-lg">Learn More</span>
                  </a>
                </div>
                <div className="mt-auto pt-5 border-t border-white/[0.15]">
                  <p className="text-[0.7rem] text-white/60 leading-tight text-center px-2">18+ | Play Responsibly | Full Champion Poker T&amp;C&apos;s Apply | Full Universal Poker T&amp;C&apos;s Apply | GambleAware</p>
                </div>
              </div>
            </div>
          </div>
          </DealCardWithGeo>

          {/* Deal 8: WSOP.CA */}
          <DealCardWithGeo dealId={8}>
          <div className="group relative rounded-[2rem] overflow-hidden backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/50 via-yellow-600/40 to-zinc-900/50 rounded-[2rem] blur-sm group-hover:blur-md transition-all duration-500"></div>
            <div className="relative border border-amber-900/20 rounded-[2rem] overflow-hidden shadow-2xl group-hover:shadow-amber-500/40 group-hover:shadow-2xl transition-all duration-500 flex flex-col min-h-[540px]"
                 style={{ background: 'radial-gradient(ellipse at center top, #AA7F2B 0%, #947225 20%, #7F611F 40%, #70541C 60%, #4D3914 80%, #35270E 100%)' }}>
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/30 pointer-events-none"></div>
              <div className="relative h-36 flex items-center justify-center px-8 pt-8 pb-6 flex-shrink-0">
                <img src="https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/12/11192441/wsop-ontario-logo-1024x376.webp" alt="WSOP.CA Logo" className="max-h-14 max-w-full object-contain drop-shadow-2xl filter brightness-110 z-10" />
              </div>
              <div className="relative px-8 pt-0 pb-6 flex flex-col flex-grow">
                <div className="text-center space-y-0 mb-8">
                  <p className="text-sm sm:text-base md:text-lg lg:text-[1.5rem] font-semibold text-white/95 tracking-wide mb-3">Play On A</p>
                  <p className="text-4xl sm:text-5xl md:text-6xl lg:text-[3rem] font-black text-white drop-shadow-lg leading-none">GGPoker</p>
                  <p className="text-3xl sm:text-4xl md:text-5xl lg:text-[3rem] font-black text-white drop-shadow-lg leading-none mt-1">Alternative</p>
                  <p className="text-sm sm:text-base md:text-lg lg:text-[1.5rem] text-white/90 leading-relaxed pt-4 font-medium">From Ontario Only</p>
                </div>
                <div className="flex gap-3 justify-center mb-4 px-2">
                  <a href="/platform-connection?platform_id=2933" className="relative group/btn overflow-hidden bg-gradient-to-b from-[#088929] to-[#055a1c] text-white font-bold px-6 py-3.5 rounded-full text-center text-sm transition-all duration-500 hover:scale-[1.03] active:scale-[0.98] flex-1"
                     style={{ boxShadow: `0 1px 3px 0 rgba(0,0,0,0.5), 0 4px 12px rgba(7,113,36,0.3), 0 8px 32px rgba(7,113,36,0.25), 0 16px 64px rgba(7,113,36,0.2), inset 0 1px 1px rgba(255,255,255,0.3), inset 0 -1px 1px rgba(0,0,0,0.2)` }}>
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#077124] via-[#0a9b30] to-[#077124] rounded-full blur-xl opacity-60 group-hover/btn:opacity-90 transition-opacity duration-500"></div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 via-[#077124] to-emerald-400 rounded-full blur-2xl opacity-40 group-hover/btn:opacity-70 transition-opacity duration-500 animate-pulse-slow"></div>
                    <div className="absolute -inset-4 bg-[#077124] rounded-full blur-3xl opacity-20 group-hover/btn:opacity-40 transition-opacity duration-700"></div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 via-white/5 to-transparent" style={{ height: '50%' }}></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000 skew-x-12"></div>
                    <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]"></div>
                    <span className="relative z-10 tracking-wide drop-shadow-lg">Claim Offer</span>
                  </a>
                  <a href="#" className="relative group/btn2 overflow-hidden bg-white/10 border border-white/20 text-white font-semibold px-6 py-3.5 rounded-full text-center text-sm transition-all duration-300 hover:bg-white/15 hover:border-white/30 active:scale-[0.98] flex-1 backdrop-blur-sm">
                    <span className="relative z-10 tracking-wide drop-shadow-lg">Learn More</span>
                  </a>
                </div>
                <div className="mt-auto pt-5 border-t border-white/[0.15]">
                  <p className="text-[0.7rem] text-white/60 leading-tight text-center px-2">19+ | Please Play Responsibly | Full WSOP.ca T&amp;C&apos;s Apply | Full Universal Poker T&amp;C&apos;s Apply | www.ConnexOntario.ca</p>
                </div>
              </div>
            </div>
          </div>
          </DealCardWithGeo>

          {/* Deal 9: OPTIBET POKER */}
          <DealCardWithGeo dealId={9}>
          <div className="group relative rounded-[2rem] overflow-hidden backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/50 via-pink-600/40 to-zinc-900/50 rounded-[2rem] blur-sm group-hover:blur-md transition-all duration-500"></div>
            <div className="relative border border-rose-900/20 rounded-[2rem] overflow-hidden shadow-2xl group-hover:shadow-rose-500/40 group-hover:shadow-2xl transition-all duration-500 flex flex-col min-h-[540px]"
                 style={{ background: 'radial-gradient(ellipse at center top, #A23D56 0%, #8E3750 20%, #7C3044 40%, #6C2A3D 60%, #491D29 80%, #31141C 100%)' }}>
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/30 pointer-events-none"></div>
              <div className="relative h-36 flex items-center justify-center px-8 pt-8 pb-6 flex-shrink-0">
                <img src="https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/09/17100841/Optibet-Poker-logo-2D-horizontal-red-bg-1024x298.png" alt="Optibet Poker Logo" className="max-h-14 max-w-full object-contain drop-shadow-2xl filter brightness-110 z-10" />
              </div>
              <div className="relative px-8 pt-0 pb-6 flex flex-col flex-grow">
                <div className="text-center space-y-0 mb-8">
                  <p className="text-sm sm:text-base md:text-lg lg:text-[1.5rem] font-semibold text-white/95 tracking-wide mb-3">Get Up To</p>
                  <p className="text-4xl sm:text-5xl md:text-6xl lg:text-[3rem] font-black text-white drop-shadow-lg leading-none">60%</p>
                  <p className="text-3xl sm:text-4xl md:text-5xl lg:text-[3rem] font-black text-white drop-shadow-lg leading-none mt-1">Cashback</p>
                  <p className="text-sm sm:text-base md:text-lg lg:text-[1.5rem] text-white/90 leading-relaxed pt-4 font-medium">Every Month</p>
                </div>
                <div className="flex gap-3 justify-center mb-4 px-2">
                  <a href="/platform-connection?platform_id=1362" className="relative group/btn overflow-hidden bg-gradient-to-b from-[#088929] to-[#055a1c] text-white font-bold px-6 py-3.5 rounded-full text-center text-sm transition-all duration-500 hover:scale-[1.03] active:scale-[0.98] flex-1"
                     style={{ boxShadow: `0 1px 3px 0 rgba(0,0,0,0.5), 0 4px 12px rgba(7,113,36,0.3), 0 8px 32px rgba(7,113,36,0.25), 0 16px 64px rgba(7,113,36,0.2), inset 0 1px 1px rgba(255,255,255,0.3), inset 0 -1px 1px rgba(0,0,0,0.2)` }}>
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#077124] via-[#0a9b30] to-[#077124] rounded-full blur-xl opacity-60 group-hover/btn:opacity-90 transition-opacity duration-500"></div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 via-[#077124] to-emerald-400 rounded-full blur-2xl opacity-40 group-hover/btn:opacity-70 transition-opacity duration-500 animate-pulse-slow"></div>
                    <div className="absolute -inset-4 bg-[#077124] rounded-full blur-3xl opacity-20 group-hover/btn:opacity-40 transition-opacity duration-700"></div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 via-white/5 to-transparent" style={{ height: '50%' }}></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000 skew-x-12"></div>
                    <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]"></div>
                    <span className="relative z-10 tracking-wide drop-shadow-lg">Claim Offer</span>
                  </a>
                  <a href="#" className="relative group/btn2 overflow-hidden bg-white/10 border border-white/20 text-white font-semibold px-6 py-3.5 rounded-full text-center text-sm transition-all duration-300 hover:bg-white/15 hover:border-white/30 active:scale-[0.98] flex-1 backdrop-blur-sm">
                    <span className="relative z-10 tracking-wide drop-shadow-lg">Learn More</span>
                  </a>
                </div>
                <div className="mt-auto pt-5 border-t border-white/[0.15]">
                  <p className="text-[0.7rem] text-white/60 leading-tight text-center px-2">18+ | Please Play Responsibly | GambleAware | Full Optibet T&amp;C&apos;s Apply | Full Universal Poker T&amp;C&apos;s Apply | EE &amp; LAT Only</p>
                </div>
              </div>
            </div>
          </div>
          </DealCardWithGeo>

          {/* Deal 10: COINPOKER */}
          <DealCardWithGeo dealId={10}>
          <div className="group relative rounded-[2rem] overflow-hidden backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/50 via-orange-600/40 to-zinc-900/50 rounded-[2rem] blur-sm group-hover:blur-md transition-all duration-500"></div>
            <div className="relative border border-red-900/20 rounded-[2rem] overflow-hidden shadow-2xl group-hover:shadow-red-500/40 group-hover:shadow-2xl transition-all duration-500 flex flex-col min-h-[540px]"
                 style={{ background: 'radial-gradient(ellipse at center top, #7D2C2C 0%, #6E2424 20%, #5F1F1F 40%, #551B1B 60%, #3D1414 80%, #2B0F0F 100%)' }}>
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/30 pointer-events-none"></div>
              <div className="relative h-36 flex items-center justify-center px-8 pt-8 pb-6 flex-shrink-0">
                <img src="/images/coinlogo.png" alt="CoinPoker Logo" className="max-h-60 max-w-full object-contain drop-shadow-2xl filter brightness-110 z-10" />
              </div>
              <div className="relative px-8 pt-0 pb-6 flex flex-col flex-grow">
                <div className="text-center space-y-0 mb-8">
                  <p className="text-sm sm:text-base md:text-lg lg:text-[1.5rem] font-semibold text-white/95 tracking-wide mb-3">Join Our</p>
                  <p className="text-4xl sm:text-5xl md:text-6xl lg:text-[3rem] font-black text-white drop-shadow-lg leading-none">Monthly Rake</p>
                  <p className="text-3xl sm:text-4xl md:text-5xl lg:text-[3rem] font-black text-white drop-shadow-lg leading-none mt-1">Chase</p>
                  <p className="text-sm sm:text-base md:text-lg lg:text-[1.5rem] text-white/90 leading-relaxed pt-4 font-medium">Up To $1500 Every Month</p>
                </div>
                <div className="flex gap-3 justify-center mb-4 px-2">
                  <a href="#" className="relative group/btn overflow-hidden bg-gradient-to-b from-[#088929] to-[#055a1c] text-white font-bold px-6 py-3.5 rounded-full text-center text-sm transition-all duration-500 hover:scale-[1.03] active:scale-[0.98] flex-1"
                     style={{ boxShadow: `0 1px 3px 0 rgba(0,0,0,0.5), 0 4px 12px rgba(7,113,36,0.3), 0 8px 32px rgba(7,113,36,0.25), 0 16px 64px rgba(7,113,36,0.2), inset 0 1px 1px rgba(255,255,255,0.3), inset 0 -1px 1px rgba(0,0,0,0.2)` }}>
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#077124] via-[#0a9b30] to-[#077124] rounded-full blur-xl opacity-60 group-hover/btn:opacity-90 transition-opacity duration-500"></div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 via-[#077124] to-emerald-400 rounded-full blur-2xl opacity-40 group-hover/btn:opacity-70 transition-opacity duration-500 animate-pulse-slow"></div>
                    <div className="absolute -inset-4 bg-[#077124] rounded-full blur-3xl opacity-20 group-hover/btn:opacity-40 transition-opacity duration-700"></div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 via-white/5 to-transparent" style={{ height: '50%' }}></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000 skew-x-12"></div>
                    <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]"></div>
                    <span className="relative z-10 tracking-wide drop-shadow-lg">Claim Offer</span>
                  </a>
                  <a href="#" className="relative group/btn2 overflow-hidden bg-white/10 border border-white/20 text-white font-semibold px-6 py-3.5 rounded-full text-center text-sm transition-all duration-300 hover:bg-white/15 hover:border-white/30 active:scale-[0.98] flex-1 backdrop-blur-sm">
                    <span className="relative z-10 tracking-wide drop-shadow-lg">Learn More</span>
                  </a>
                </div>
                <div className="mt-auto pt-5 border-t border-white/[0.15]">
                  <p className="text-[0.7rem] text-white/60 leading-tight text-center px-2">18+ (19+ in Canada) | Please Play Responsibly | Full CoinPoker T&amp;C&apos;s Apply | Full Universal Poker T&amp;C&apos;s Apply | GambleAware</p>
                </div>
              </div>
            </div>
          </div>
          </DealCardWithGeo>

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

      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModal.isOpen} 
        onClose={authModal.close}
        initialTab={authModal.initialTab}
        onSuccess={authModal.onAuthSuccess}
      />

      {/* Join Deal Modal */}
      <JoinDealModal
        isOpen={authModal.isJoinDealOpen}
        onClose={authModal.closeJoinDeal}
        dealName={authModal.dealName}
      />
    </div>
  );
}
