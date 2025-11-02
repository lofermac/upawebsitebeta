"use client";

import { useState, useEffect } from 'react';
import HeaderWithAuth from "../components/HeaderWithAuth";
import Footer from "../components/Footer";
import DealCardWithGeo from "@/components/DealCardWithGeo";
import AuthModal from "@/components/AuthModal";
import JoinDealModal from "@/components/JoinDealModal";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useAuthModal } from "@/lib/hooks/useAuthModal";
import { getDeals, type Deal } from "@/lib/supabase/deals";
import { generateRadialGradient, generateGlowClasses } from "@/lib/utils/colorUtils";

export default function DealsPage() {
  const { isLoggedIn } = useAuth();
  const authModal = useAuthModal();
  
  // Deals state
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load deals from Supabase
  useEffect(() => {
    async function loadDeals() {
      try {
        const { data, error } = await getDeals();
        if (data && !error) {
          setDeals(data);
        } else {
          console.error('Error loading deals:', error);
        }
      } catch (err) {
        console.error('Failed to load deals:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadDeals();
  }, []);

  // Handler para Claim Offer - verifica autenticação (FUNCIONA PARA TODOS OS DEALS)
  const handleClaimOffer = (e: React.MouseEvent<HTMLAnchorElement>, dealId: number, dealName: string) => {
    e.preventDefault(); // Sempre previne navegação
    
    if (!isLoggedIn) {
      authModal.openLogin(dealName, dealId); // Passa nome e ID do deal
    } else {
      // Se já está logado, abre direto o JoinDealModal
      authModal.openJoinDeal(dealName, dealId);
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
            <div className="max-w-6xl mx-auto text-center">
              {/* Main Heading - Apple-like Typography */}
              <h1 className="animate-fade-up-delay-800 mb-4">
                <div className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] font-semibold leading-tight tracking-[-0.02em]">
                  <span className="block mt-1 bg-gradient-to-br from-white via-white to-gray-200 bg-clip-text text-transparent font-semibold" 
                        style={{ 
                          textShadow: '0 4px 24px rgba(255,255,255,0.08)',
                          letterSpacing: '-0.03em'
                        }}>
                    Poker Deals
                  </span>
                </div>
              </h1>
              
              {/* Subtitle - Apple-style minimalista */}
              <p className="text-lg md:text-xl lg:text-[1.35rem] text-gray-400 font-normal max-w-4xl mx-auto leading-relaxed animate-fade-up-delay-1200"
                 style={{ 
                   textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                   letterSpacing: '-0.01em',
                   fontWeight: '400'
                 }}>
                We have a wide variety of Poker Deals available, with each one offering a unique deal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Deals Section - Pure Black Background */}
      <main className="relative bg-black w-full pt-8 pb-24">
        <div className="w-full pt-2 md:pt-4 pb-20 md:pb-24 px-4">
          <div className="max-w-7xl mx-auto">
        
        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Deals Grid - 3 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 auto-rows-auto">
              {deals.map((deal) => {
                const gradientStyle = generateRadialGradient(deal.primary_color);
                const glowClasses = generateGlowClasses(deal.glow_color);
                
                return (
                  <DealCardWithGeo key={deal.id} dealId={deal.id}>
                    <div className="group relative rounded-[2rem] overflow-hidden backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
                      <div className={`absolute inset-0 bg-gradient-to-br ${glowClasses.outerGlowFrom} ${glowClasses.outerGlowVia} ${glowClasses.outerGlowTo} rounded-[2rem] blur-sm group-hover:blur-md transition-all duration-500`}></div>
                      <div 
                        className={`relative border ${glowClasses.borderColor} rounded-[2rem] overflow-hidden shadow-2xl group-hover:${glowClasses.hoverShadow} group-hover:shadow-2xl transition-all duration-500 flex flex-col min-h-[540px]`}
                        style={{ background: gradientStyle }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/30 pointer-events-none"></div>
                        
                        {/* Logo */}
                        {deal.logo_url && (
                          <div className="relative h-36 flex items-center justify-center px-8 pt-8 pb-6 flex-shrink-0">
                            <img 
                              src={deal.logo_url} 
                              alt={deal.logo_alt} 
                              className={`${deal.logo_max_height} max-w-full object-contain drop-shadow-2xl filter brightness-110 z-10`} 
                            />
                          </div>
                        )}
                        
                        {/* Content */}
                        <div className="relative px-8 pt-0 pb-6 flex flex-col flex-grow">
                          <div className="text-center space-y-0 mb-8">
                            <p className="text-sm sm:text-base md:text-lg lg:text-[1.5rem] font-semibold text-white/95 tracking-wide mb-3">
                              {deal.title}
                            </p>
                            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-white drop-shadow-lg leading-none">
                              {deal.main_value}
                            </p>
                            {deal.main_value_second_line && (
                              <p className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-white drop-shadow-lg leading-none mt-1">
                                {deal.main_value_second_line}
                              </p>
                            )}
                            {deal.subtitle && (
                              <p className="text-sm sm:text-base md:text-lg lg:text-[1.5rem] text-white/90 leading-relaxed pt-4 font-medium">
                                {deal.subtitle}
                              </p>
                            )}
                          </div>
                          
                          {/* Buttons */}
                          <div className="flex gap-3 justify-center mb-4 px-2">
                            {/* Claim Offer Button */}
                            <a 
                              href={deal.claim_offer_url} 
                              onClick={(e) => handleClaimOffer(e, deal.id, deal.name)}
                              className="relative font-semibold text-sm px-6 py-3.5 rounded-full bg-[#077124] text-white shadow-lg shadow-[#077124]/20 hover:shadow-2xl hover:shadow-[#077124]/40 hover:scale-[1.03] transition-all duration-300 group/claimBtn overflow-hidden flex-1 text-center"
                            >
                              <span className="relative z-10">Claim Offer</span>
                              <div className="absolute inset-0 translate-x-[-100%] group-hover/claimBtn:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover/claimBtn:opacity-100 transition-opacity duration-300"></div>
                            </a>
                            
                            {/* Learn More Button */}
                            {deal.learn_more_url && (
                              <a 
                                href={deal.learn_more_url} 
                                className="relative group/btn2 overflow-hidden bg-white/10 border border-white/20 text-white font-semibold px-6 py-3.5 rounded-full text-center text-sm transition-all duration-300 hover:bg-white/15 hover:border-white/30 active:scale-[0.98] flex-1 backdrop-blur-sm"
                              >
                                <span className="relative z-10 tracking-wide drop-shadow-lg">Learn More</span>
                              </a>
                            )}
                          </div>
                          
                          {/* Terms */}
                          <div className="mt-auto pt-5 border-t border-white/[0.15]">
                            <p className="text-[0.7rem] text-white/60 leading-tight text-center px-2">
                              {deal.terms}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DealCardWithGeo>
                );
              })}
            </div>
          </>
        )}
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
        dealId={authModal.dealId || 0}
      />
    </div>
  );
}
