"use client";

import { useState, useEffect } from "react";
import HeaderWithAuth from "../components/HeaderWithAuth";
import Footer from "../components/Footer";
import TableOfContents from "../../components/TableOfContents";
import { useGeoLocation } from "../../lib/hooks/useGeoLocation";
import { Info, MessageCircle, Mail, Send, Phone } from "lucide-react";
import * as flags from 'country-flag-icons/react/3x2';

// Custom SVG Icons for social media
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// Dados hardcoded do GGPoker
const GGPOKER_DATA = {
  standardRakeback: "15-20%",
  ourRakeback: "60%",
  welcomeBonus: "100% up to $1000",
  totalRakeback: "Up to 33%",
  totalRakebackEnhanced: "Up to 33% + Rake Chase",
  events: [
    { event: "Mini Main Event", buyin: "£150", guarantee: "£60,000", dates: "11-16 October" },
    { event: "Main Event", buyin: "£500", guarantee: "£100,000", dates: "16 – 19 October" },
    { event: "PLO Masters", buyin: "£250", guarantee: "£20,000", dates: "17 – 19 October" },
    { event: "High Roller", buyin: "£1,000", guarantee: "Based on entries", dates: "19 October" },
  ],
  faqs: [
    {
      question: "What countries are allowed to join?",
      answer: "GGPoker is available in most countries worldwide. However, players from the United States, United Kingdom, France, and several other jurisdictions are restricted. Please check GGPoker's terms of service for a complete list of restricted countries."
    },
    {
      question: "How Do I Know When I'm Paid?",
      answer: "Payments are processed monthly, typically around the 15th of each month. You'll receive a notification in your dashboard when your rakeback payment has been credited to your GGPoker account. You can track your progress in real-time through our player dashboard."
    },
    {
      question: "What Customer Support Issues Can You Help With?",
      answer: "Our dedicated support team can assist with account linking, rakeback tracking, payment inquiries, bonus redemption, technical issues, and general questions about our deals. For GGPoker-specific issues (deposits, withdrawals, game issues), please contact GGPoker's support directly."
    },
    {
      question: "Do I Need To Pay For This Service?",
      answer: "No! Our service is completely free. We earn a commission from the poker rooms when you play, which allows us to offer you enhanced rakeback deals at no cost to you. There are no hidden fees or charges."
    },
    {
      question: "How does Rake Work at GGPoker?",
      answer: "GGPoker uses the weighted contributed rake method. This means rake is calculated based on the amount you contribute to each pot. The more you play, the more rake you generate, and the more rakeback you earn through our enhanced deal."
    },
  ],
  accountManager: {
    name: "Leonardo",
    role: "Brazilian Country Manager",
    status: "online",
    image: "/images/leo.png", // Usando a imagem existente
    contacts: [
      { type: "livechat", label: "Live Chat", icon: MessageCircle },
      { type: "email", label: "Email", icon: Mail },
      { type: "telegram", label: "Telegram", icon: Send },
      { type: "whatsapp", label: "WhatsApp", icon: Phone },
    ]
  }
};

// Lista de países aceitos pelo GGPoker (exemplo - ajustar conforme real)
const ACCEPTED_COUNTRIES = ["BR", "CA", "DE", "PT", "IN", "MX", "AR", "CL", "PE", "CO"];

// Para demonstração, forçar Brasil
const DEMO_COUNTRY = "BR";

interface FlagsModule {
  [key: string]: React.ComponentType<{ className?: string }>;
}

export default function GGPokerDealPage() {
  const { isLoading: geoLoading } = useGeoLocation();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showStickyButton, setShowStickyButton] = useState(false);
  
  // Para demonstração, usar Brasil ao invés do país detectado
  const userCountry = DEMO_COUNTRY;
  
  // Determinar se o país do usuário é aceito
  const isCountryAccepted = userCountry ? ACCEPTED_COUNTRIES.includes(userCountry) : true;
  
  // Pegar componente de bandeira do país
  const CountryFlag = userCountry ? (flags as FlagsModule)[userCountry] : null;
  
  // Detectar nome do país
  const getCountryName = (code: string | null) => {
    if (!code) return "your country";
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
    try {
      return regionNames.of(code);
    } catch {
      return code;
    }
  };

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  // Detectar scroll para mostrar/esconder sticky button
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Tentar múltiplas formas de obter o scroll
          const scrollY = window.scrollY || 
                         window.pageYOffset || 
                         document.documentElement.scrollTop || 
                         document.body.scrollTop || 
                         0;
          
          // Mostrar botão após 200px de scroll
          const shouldShow = scrollY > 200;
          setShowStickyButton(shouldShow);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Chamar uma vez no mount para verificar posição inicial
    handleScroll();

    // Adicionar listeners em múltiplos alvos
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    
    // Tentar adicionar no body e html também
    if (document.body) {
      document.body.addEventListener('scroll', handleScroll, { passive: true });
    }
    if (document.documentElement) {
      document.documentElement.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    // Verificação por polling a cada 500ms (fallback caso eventos não disparem)
    const testInterval = setInterval(() => {
      const scrollY = window.scrollY || 
                     window.pageYOffset || 
                     document.documentElement.scrollTop || 
                     document.body.scrollTop || 
                     0;
      
      // Forçar verificação
      if (scrollY > 200 && !showStickyButton) {
        setShowStickyButton(true);
      } else if (scrollY <= 200 && showStickyButton) {
        setShowStickyButton(false);
      }
    }, 500);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
      if (document.body) {
        document.body.removeEventListener('scroll', handleScroll);
      }
      if (document.documentElement) {
        document.documentElement.removeEventListener('scroll', handleScroll);
      }
      clearInterval(testInterval);
    };
  }, [showStickyButton]);

  // Sections para Table of Contents
  const sections = [
    { id: "monthly-rake-chase", title: "Monthly Rake Chase" },
    { id: "payment-information", title: "Payment Information" },
    { id: "how-to-join", title: "How To Join" },
  ];

  // Sections para GGPoker Review
  const reviewSections = [
    { id: "on-site-rakeback", title: "On-Site Rakeback" },
    { id: "on-site-promotions", title: "On-Site Promotions" },
    { id: "rake-charges", title: "Rake Charges" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Hero Section */}
      <section className="relative bg-black w-full px-3 md:px-4 pt-6 pb-8">
        <div className="relative w-full rounded-[2.5rem] overflow-hidden group/hero transition-all duration-700">
          {/* Background gradiente */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#121212] to-[#0d0d0d]"></div>
          
          {/* Bordas e efeitos */}
          <div className="absolute inset-0 rounded-[2.5rem] border border-white/[0.06] shadow-2xl shadow-black/50"></div>
          <div className="absolute inset-0 rounded-[2.5rem] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.025)]"></div>
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent rounded-t-[2.5rem]"></div>
          
          {/* Glow effects */}
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#077124]/[0.03] rounded-full blur-[100px] animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-emerald-500/[0.02] rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
          
          {/* Header */}
          <div className="relative z-10 pt-6 px-4">
            <HeaderWithAuth />
          </div>
          
          {/* Hero Content */}
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
                    GGPoker: Our Deal & Site Review 2025
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
                We&apos;ll break down everything you need to know about GGPoker&apos;s site and what we offer on top through our deals
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="relative bg-black w-full pt-12 pb-24">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Comparison Table + Country Eligibility */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
            
            {/* Comparison Table (2/3) - Premium Version */}
            <div className="lg:col-span-2 relative rounded-2xl overflow-hidden backdrop-blur-xl group/table">
              {/* Premium Background Layers */}
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/95 via-black/95 to-zinc-900/95"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#077124]/[0.02] via-transparent to-emerald-500/[0.01]"></div>
              <div className="absolute inset-0 border border-white/[0.1] rounded-2xl group-hover/table:border-white/[0.15] transition-colors duration-500"></div>
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              
              <div className="relative p-6 md:p-8">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-white/[0.15]">
                        <th className="text-left py-5 px-5 text-white font-bold text-base md:text-lg tracking-tight">
                          Feature
                        </th>
                        <th className="text-center py-5 px-5 text-white font-bold text-base md:text-lg tracking-tight">
                          Standard
                        </th>
                        <th className="text-center py-5 px-5 text-white font-bold text-base md:text-lg tracking-tight">
                          Our Offer
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-base">
                      {/* Row 1: Universal Poker Promotions - DIFERENTE (destaque verde) */}
                      <tr className="border-b border-white/[0.06] hover:bg-white/[0.02] transition-colors duration-300">
                        <td className="py-5 px-5 text-gray-300 font-semibold">
                          Universal Poker Promotions
                        </td>
                        <td className="py-5 px-5 text-center">
                          <span className="text-red-400 font-bold text-base">N/A</span>
                        </td>
                        <td className="py-5 px-5 text-center">
                          <div className="inline-flex items-center gap-2 group/tooltip relative">
                            <span className="text-[#077124] font-bold text-base drop-shadow-sm">
                              Monthly Rake Chase
                            </span>
                            <Info className="w-4 h-4 text-[#077124]/60 hover:text-[#077124] transition-colors cursor-help" />
                  </div>
                        </td>
                      </tr>

                      {/* Row 2: On-Site Promotions - IGUAL (cinza) */}
                      <tr className="border-b border-white/[0.06] hover:bg-white/[0.02] transition-colors duration-300">
                        <td className="py-5 px-5 text-gray-300 font-semibold">
                          On-Site Promotions
                        </td>
                        <td className="py-5 px-5 text-center text-gray-400 font-medium text-base">
                          Access To All
                        </td>
                        <td className="py-5 px-5 text-center text-gray-400 font-medium text-base">
                          Access To All
                        </td>
                      </tr>

                      {/* Row 3: Welcome Bonus - IGUAL (cinza) */}
                      <tr className="border-b border-white/[0.06] hover:bg-white/[0.02] transition-colors duration-300">
                        <td className="py-5 px-5 text-gray-300 font-semibold">
                          Welcome Bonus
                        </td>
                        <td className="py-5 px-5 text-center text-gray-400 font-medium text-base">
                          100% up to $1000
                        </td>
                        <td className="py-5 px-5 text-center text-gray-400 font-medium text-base">
                          100% up to $1000
                        </td>
                      </tr>

                      {/* Row 4: Extra Support - DIFERENTE (destaque verde) */}
                      <tr className="border-b border-white/[0.06] hover:bg-white/[0.02] transition-colors duration-300">
                        <td className="py-5 px-5 text-gray-300 font-semibold">
                          Extra Support
                        </td>
                        <td className="py-5 px-5 text-center text-gray-400 font-medium text-base">
                          Regular Support
                        </td>
                        <td className="py-5 px-5 text-center">
                          <div className="inline-flex items-center gap-2 group/tooltip relative">
                            <span className="text-[#077124] font-bold text-base drop-shadow-sm">
                              Universal Poker Support
                            </span>
                            <Info className="w-4 h-4 text-[#077124]/60 hover:text-[#077124] transition-colors cursor-help" />
                          </div>
                        </td>
                      </tr>

                      {/* Row 5: Total Rakeback - DESTAQUE PREMIUM (fundo verde sutil) */}
                      <tr className="relative group/highlight">
                        <td className="relative py-5 px-5 bg-[#077124]/[0.08] border-y border-[#077124]/20 group-hover/highlight:bg-[#077124]/[0.12] transition-all duration-300">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#077124]/5 to-transparent opacity-0 group-hover/highlight:opacity-100 transition-opacity duration-500"></div>
                          <span className="relative text-white font-bold text-base">
                            Total Rakeback
                          </span>
                        </td>
                        <td className="relative py-5 px-5 text-center bg-[#077124]/[0.08] border-y border-[#077124]/20 group-hover/highlight:bg-[#077124]/[0.12] transition-all duration-300">
                          <span className="text-red-400 font-bold text-base">
                            Up to 33%
                          </span>
                        </td>
                        <td className="relative py-5 px-5 text-center bg-[#077124]/[0.08] border-y border-[#077124]/20 group-hover/highlight:bg-[#077124]/[0.12] transition-all duration-300">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#077124]/5 to-transparent opacity-0 group-hover/highlight:opacity-100 transition-opacity duration-500"></div>
                          <div className="relative inline-flex items-center gap-2 group/tooltip">
                            <span className="text-[#077124] font-bold text-base drop-shadow-sm">
                              Up To 33% + Rake Chase
                            </span>
                            <Info className="w-4 h-4 text-[#077124]/60 hover:text-[#077124] transition-colors cursor-help" />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
                </div>

            {/* Country Eligibility (1/3) - Premium Enhanced Version */}
            <div className="lg:col-span-1 relative rounded-2xl overflow-hidden backdrop-blur-xl group/country">
              {/* Premium Background Layers */}
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/95 via-black/95 to-zinc-900/95"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#077124]/[0.03] via-transparent to-emerald-500/[0.02]"></div>
              <div className="absolute inset-0 border border-white/[0.1] rounded-2xl group-hover/country:border-white/[0.15] transition-colors duration-500"></div>
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              
              {/* Subtle glow effect */}
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#077124]/[0.08] rounded-full blur-[80px] opacity-0 group-hover/country:opacity-100 transition-opacity duration-700"></div>
              
              <div className="relative p-6 md:p-8 h-full flex flex-col">
                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight mb-2" style={{ letterSpacing: '-0.01em' }}>
                    Country Eligibility
                  </h3>
                  <div className="w-16 h-1 bg-gradient-to-r from-transparent via-[#077124] to-transparent mx-auto rounded-full"></div>
                </div>
                
                {/* Content */}
                <div className="flex-1 flex flex-col justify-center space-y-6">
                  {geoLoading ? (
                    <div className="text-center py-12">
                      <div className="inline-block w-10 h-10 border-4 border-[#077124]/20 border-t-[#077124] rounded-full animate-spin mb-4"></div>
                      <p className="text-gray-400 text-sm">Detecting your location...</p>
                    </div>
                  ) : (
                    <>
                      {/* Country Detection Card */}
                      <div className="relative group/detection">
                        <div className="absolute inset-0 bg-gradient-to-r from-zinc-800/30 via-zinc-800/50 to-zinc-800/30 rounded-xl blur-sm"></div>
                        <div className="relative bg-gradient-to-br from-zinc-800/40 via-zinc-900/40 to-black/40 border border-white/[0.08] rounded-xl p-5 backdrop-blur-sm transition-all duration-300 group-hover/detection:border-white/[0.12]">
                          <p className="text-gray-400 text-xs uppercase tracking-wider mb-3 text-center font-semibold">
                            Accessing from
                          </p>
                          <div className="flex items-center justify-center gap-3">
                            {CountryFlag && (
                              <div className="relative">
                                <div className="absolute inset-0 bg-white/20 rounded-md blur-sm"></div>
                                <CountryFlag className="relative w-10 h-6 rounded-md shadow-xl border border-white/10" />
                              </div>
                            )}
                            <span className="text-white font-bold text-xl tracking-tight">
                              {getCountryName(userCountry)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Status Message - Enhanced */}
                      {isCountryAccepted ? (
                        <div className="relative group/status">
                          {/* Success Background Glow */}
                          <div className="absolute inset-0 bg-gradient-to-br from-[#077124]/30 via-[#077124]/20 to-emerald-500/20 rounded-xl blur-md opacity-60 group-hover/status:opacity-80 transition-opacity duration-500"></div>
                          
                          <div className="relative bg-gradient-to-br from-[#077124]/15 via-[#077124]/10 to-emerald-500/10 border-2 border-[#077124]/40 rounded-xl p-6 backdrop-blur-sm transition-all duration-300 group-hover/status:border-[#077124]/60">
                            {/* Checkmark Icon - Larger & Centered */}
                            <div className="flex justify-center mb-4">
                              <div className="relative">
                                <div className="absolute inset-0 bg-[#077124] rounded-full blur-lg opacity-40"></div>
                                <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[#088929] to-[#055a1c] flex items-center justify-center shadow-xl"
                                     style={{
                                       boxShadow: '0 0 0 1px rgba(255,255,255,0.1), 0 8px 24px rgba(7,113,36,0.4), inset 0 1px 1px rgba(255,255,255,0.2)'
                                     }}>
                                  <svg className="w-7 h-7 text-white drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                            
                            {/* Success Message */}
                            <div className="text-center space-y-2">
                              <p className="text-[#077124] font-bold text-lg leading-tight">
                                Great News!
                              </p>
                              <p className="text-gray-300 text-sm leading-relaxed">
                                Players from <span className="text-white font-semibold">{getCountryName(userCountry)}</span> are welcome to join this exclusive deal.
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="relative group/status">
                          {/* Error Background Glow */}
                          <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 via-red-500/20 to-red-600/20 rounded-xl blur-md opacity-60"></div>
                          
                          <div className="relative bg-gradient-to-br from-red-500/15 via-red-500/10 to-red-600/10 border-2 border-red-500/40 rounded-xl p-6 backdrop-blur-sm">
                            {/* X Icon - Larger & Centered */}
                            <div className="flex justify-center mb-4">
                              <div className="relative">
                                <div className="absolute inset-0 bg-red-500 rounded-full blur-lg opacity-40"></div>
                                <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-xl"
                                     style={{
                                       boxShadow: '0 0 0 1px rgba(255,255,255,0.1), 0 8px 24px rgba(239,68,68,0.4)'
                                     }}>
                                  <svg className="w-7 h-7 text-white drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                            
                            {/* Error Message */}
                            <div className="text-center space-y-2">
                              <p className="text-red-400 font-bold text-lg leading-tight">
                                Not Available
                              </p>
                              <p className="text-gray-400 text-sm leading-relaxed">
                                Unfortunately, this deal is not available for players from <span className="text-white font-semibold">{getCountryName(userCountry)}</span>.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
                
                {/* CTA Button - Only if accepted */}
                {isCountryAccepted && !geoLoading && (
                  <div className="mt-8">
                    <a
                      href="/platform-connection?platform_id=1365"
                      className="group/btn relative inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white bg-gradient-to-b from-[#088929] to-[#055a1c] rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.05] active:scale-[0.98] w-full shadow-xl"
                      style={{
                        boxShadow: `
                          0 0 0 1px rgba(255,255,255,0.1),
                          0 2px 8px 0 rgba(0,0,0,0.5),
                          inset 0 1px 1px rgba(255,255,255,0.3)
                        `
                      }}
                    >
                      {/* Glass reflection */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 via-white/5 to-transparent" style={{ height: '50%' }}></div>
                      
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000 skew-x-12"></div>
                      
                      <span className="relative z-10 tracking-wide drop-shadow-lg">Claim Offer</span>
                      
                      {/* Top highlight */}
                      <div className="absolute inset-x-0 top-[1px] h-px bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"></div>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content with Sidebar - Container com limite de sticky */}
          <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
              
              {/* Sidebar - Table of Contents */}
              <aside className="lg:col-span-1">
                <div className="lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)]">
                  <TableOfContents sections={sections} />
                </div>
              </aside>

            {/* Main Article Content - Unified Card */}
            <article className="lg:col-span-3">
              
              {/* Unified Card Container */}
              <div className="relative rounded-2xl overflow-hidden backdrop-blur-xl">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#121212] to-[#0d0d0d]"></div>
                <div className="absolute inset-0 border border-white/[0.1] rounded-2xl"></div>
                
                <div className="relative p-8 md:p-10 space-y-12">
                  
                  {/* Section: Our Deal Explained */}
                  <div>
                    <h2 className="text-white text-3xl md:text-4xl font-bold mb-6" 
                        style={{ letterSpacing: '-0.02em' }}>
                      Our GGPoker Deal Explained
                    </h2>
                    
                    <p className="text-gray-300 text-lg leading-relaxed mb-4">
                      When you join our GGPoker deal, you will gain access to everything that they offer on-site, plus our promotions.
                    </p>
                    
                    <p className="text-gray-300 text-lg leading-relaxed">
                      We&apos;ll break down how everything works below.
                    </p>
                  </div>

                  {/* Section: Monthly Rake Chase */}
                  <div id="monthly-rake-chase" className="scroll-mt-28">
                  <h3 className="text-white text-2xl md:text-3xl font-bold mb-6">
                    Monthly Rake Chase
                  </h3>
                  
                  <p className="text-gray-300 text-lg leading-relaxed mb-8">
                    Players on our deal will have access to our Monthly Rake Chase, where you can get up to $1500 in rewards, every month.
                  </p>
                  
                  <p className="text-gray-300 text-lg leading-relaxed mb-8">
                    If you play and hit a certain rake tier, you will get the corresponding reward:
                  </p>

                  {/* Events Table - Premium Design */}
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
                          {GGPOKER_DATA.events.map((event, index) => (
                            <tr key={index} className={`${index < GGPOKER_DATA.events.length - 1 ? 'border-b border-[#077124]/10' : ''} hover:bg-[#077124]/10 transition-all duration-300 group/row`}>
                              <td className="px-6 py-5 text-gray-200 font-semibold group-hover/row:text-white transition-colors">{event.event}</td>
                              <td className="px-6 py-5 text-emerald-400 font-bold">{event.buyin}</td>
                              <td className="px-6 py-5 text-gray-300 group-hover/row:text-white transition-colors">{event.guarantee}</td>
                              <td className="px-6 py-5 text-gray-400 group-hover/row:text-gray-200 transition-colors">{event.dates}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    {/* Bottom glow accent */}
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#077124]/60 to-transparent"></div>
                  </div>

                  <p className="text-gray-400 text-base leading-relaxed">
                    You will not receive the reward in the next tier until you hit the requirement. For example, if achieve $1300 rake, you will still be places at level 6 and receive $120.
                  </p>
                </div>

                {/* Section: Payment Information */}
                <div id="payment-information" className="scroll-mt-28">
                  <h3 className="text-white text-2xl md:text-3xl font-bold mb-6">
                    Payments
                  </h3>
                  
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    Payments will be made directly into your GGPoker account, every month.
                  </p>
                  
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    For example, if you generate $1000 in rake in January, you will receive $120 in February.
                  </p>

                  <p className="text-gray-300 text-lg leading-relaxed">
                    Payment dates aren&apos;t fixed, but they&apos;re usually paid around the 15<sup>th</sup>. If you would like payment updates, you can{" "}
                    <a href="/player/dashboard" className="text-[#077124] hover:underline font-semibold">
                      link your account to our Dashboard
                    </a>.
                  </p>
                </div>

                {/* Section: How To Join */}
                <div id="how-to-join" className="scroll-mt-28">
                  <h3 className="text-white text-2xl md:text-3xl font-bold mb-10">
                    How To Join
                  </h3>

                  {/* 3 Steps */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        number: "1",
                        title: "Create Your Account",
                        description: "Click the Register button and sign up through our exclusive link. Takes less than 2 minutes.",
                      },
                      {
                        number: "2",
                        title: "Make Your First Deposit",
                        description: "Fund your account with your preferred payment method. Minimum deposit: $10.",
                      },
                      {
                        number: "3",
                        title: "Start Playing & Earning",
                        description: "Play cash games or tournaments and watch your cashback grow automatically.",
                      },
                    ].map((step) => (
                      <div key={step.number} className="relative group">
                        <div className="relative rounded-xl overflow-hidden backdrop-blur-xl bg-gradient-to-br from-zinc-800/50 via-zinc-900/50 to-black/50 border border-white/[0.08] p-6 hover:border-[#077124]/30 transition-all duration-500">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="relative bg-gradient-to-br from-[#088929] via-[#077124] to-[#055a1c] w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
                                 style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.1), 0 4px 12px rgba(7,113,36,0.3)' }}>
                              <span className="text-white text-2xl font-black">{step.number}</span>
                            </div>
                          </div>
                          <h4 className="text-white text-lg font-bold mb-3">{step.title}</h4>
                          <p className="text-gray-400 text-base leading-relaxed">{step.description}</p>
                        </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section: Account Manager Details */}
                  <div>
                    <h3 className="text-white text-2xl font-bold mb-6 text-center">
                      Account Manager Details
                    </h3>

                    <div className="bg-gradient-to-br from-zinc-800/50 via-zinc-900/50 to-black/50 border border-white/[0.08] rounded-xl p-6 md:p-8">
                      <div className="flex flex-col md:flex-row items-center gap-6">
                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                          <img 
                            src={GGPOKER_DATA.accountManager.image} 
                            alt={GGPOKER_DATA.accountManager.name}
                            className="w-20 h-20 rounded-full border-2 border-[#077124] shadow-lg"
                          />
                          <div className="absolute bottom-0 right-0 w-5 h-5 bg-[#077124] border-2 border-black rounded-full"></div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 text-center md:text-left">
                          <p className="text-gray-400 text-sm mb-2">Any questions?</p>
                          <h4 className="text-white text-xl font-bold mb-1">
                            {GGPOKER_DATA.accountManager.name}{" "}
                            <span className="inline-flex items-center gap-1 text-sm font-normal text-[#077124] bg-[#077124]/20 px-2 py-0.5 rounded-full">
                              {GGPOKER_DATA.accountManager.status}
                            </span>
                          </h4>
                          <p className="text-gray-400 text-sm">{GGPOKER_DATA.accountManager.role}</p>
                        </div>

                        {/* Contact Buttons */}
                        <div className="flex flex-wrap gap-3 justify-center">
                          <button className="px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-lg transition-all duration-300 flex items-center gap-2">
                            <WhatsAppIcon className="w-4 h-4" />
                            WhatsApp
                          </button>
                          <button className="p-3 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-lg transition-all duration-300">
                            <DiscordIcon className="w-5 h-5" />
                          </button>
                          <button className="p-3 bg-[#0088cc] hover:bg-[#006ba3] text-white rounded-lg transition-all duration-300">
                            <Send className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>

            </article>
          </div>
        </div>
        {/* Fim do container de sticky - TOC para aqui */}

          {/* NOVA SEÇÃO: GGPoker Site Review */}
          
          {/* Divider / Separator */}
          <div className="my-16 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/[0.1]"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-black px-6 text-gray-400 text-sm font-semibold uppercase tracking-wider">
                GGPoker Site Review
              </span>
            </div>
          </div>

          {/* New Review Section with its own sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
            
            {/* Sidebar - Table of Contents for Review */}
            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)]">
                <TableOfContents sections={reviewSections} />
              </div>
            </aside>

            {/* Review Content - Unified Card */}
            <article className="lg:col-span-3">
              
              {/* Unified Card Container */}
              <div className="relative rounded-2xl overflow-hidden backdrop-blur-xl">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#121212] to-[#0d0d0d]"></div>
                <div className="absolute inset-0 border border-white/[0.1] rounded-2xl"></div>
                
                <div className="relative p-8 md:p-10 space-y-12">
                  
                  {/* Introduction Section */}
                  <div>
                    <h2 className="text-white text-3xl md:text-4xl font-bold mb-6" 
                        style={{ letterSpacing: '-0.02em' }}>
                      GGPoker Review - Everything You Need To Know About Their Site
                    </h2>
                    
                    <p className="text-gray-300 text-lg leading-relaxed mb-4">
                      When you join our GGPoker deal, you will gain access to everything that they offer on-site, plus our promotions.
                    </p>
                    
                    <p className="text-gray-300 text-lg leading-relaxed">
                      We&apos;ll break down how everything works below.
                    </p>
                  </div>

                  {/* Section: On-Site Rakeback */}
                  <div id="on-site-rakeback" className="scroll-mt-28">
                  <h3 className="text-white text-2xl md:text-3xl font-bold mb-6">
                    GGPoker On-Site Rakeback
                  </h3>
                  
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    GGPoker offers a comprehensive Fish Buffet rewards program that provides rakeback based on your play volume. The system rewards consistent players with increasing percentages as you climb through the levels.
                  </p>
                  
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    The Fish Buffet has multiple tiers, starting from Bronze and going up to Diamond. Each level offers better rakeback percentages, ranging from 15% at the lower levels to up to 60% for VIP players.
                  </p>

                  <p className="text-gray-300 text-lg leading-relaxed">
                    When you join through Universal Poker, you get access to this standard rakeback PLUS our exclusive Monthly Rake Chase, giving you even more value for your play.
                  </p>
                </div>

                {/* Section: On-Site Promotions */}
                <div id="on-site-promotions" className="scroll-mt-28">
                  <h3 className="text-white text-2xl md:text-3xl font-bold mb-6">
                    Promotions They Hold
                  </h3>
                  
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    GGPoker regularly runs exciting promotions for all player types. These include daily freerolls, tournament leaderboards, and special event series throughout the year.
                  </p>
                  
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    Some of their most popular promotions include:
                  </p>

                  <ul className="space-y-4 mb-6">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#077124] mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        <span className="font-semibold text-white">Daily Freerolls:</span> Free tournaments running every day with real money prizes
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#077124] mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        <span className="font-semibold text-white">Honeymoon Promotions:</span> Special bonuses for new players during their first weeks
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#077124] mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        <span className="font-semibold text-white">WSOP Satellites:</span> Win your way to major live poker events around the world
                      </p>
                    </li>
                  </ul>

                  <p className="text-gray-300 text-lg leading-relaxed">
                    All players who sign up through Universal Poker maintain full access to these on-site promotions while also receiving our exclusive benefits.
                  </p>
                </div>

                {/* Section: Rake Charges */}
                <div id="rake-charges" className="scroll-mt-28">
                  <h3 className="text-white text-2xl md:text-3xl font-bold mb-6">
                    Rake Charges per Format
                  </h3>
                  
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    GGPoker uses competitive rake structures across all game formats. Understanding how rake works helps you maximize your returns through our rakeback deal.
                  </p>
                  
                  <div className="space-y-6 mb-6">
                    <div className="bg-gradient-to-br from-zinc-800/40 via-zinc-900/40 to-black/40 border border-white/[0.08] rounded-xl p-6">
                      <h4 className="text-white text-xl font-bold mb-3">Cash Games</h4>
                      <p className="text-gray-300 text-base leading-relaxed">
                        Cash game rake is capped at 5% with maximum rake depending on the stakes. Lower stakes have lower rake caps, making GGPoker competitive for recreational players. The weighted contributed method ensures fair rake distribution.
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-zinc-800/40 via-zinc-900/40 to-black/40 border border-white/[0.08] rounded-xl p-6">
                      <h4 className="text-white text-xl font-bold mb-3">Tournaments</h4>
                      <p className="text-gray-300 text-base leading-relaxed">
                        Tournament fees range from 5% to 10% depending on the buy-in level. Major series and special events often feature reduced fees. Higher buy-in tournaments typically have lower percentage fees.
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-zinc-800/40 via-zinc-900/40 to-black/40 border border-white/[0.08] rounded-xl p-6">
                      <h4 className="text-white text-xl font-bold mb-3">Spin & Gold</h4>
                      <p className="text-gray-300 text-base leading-relaxed">
                        GGPoker&apos;s jackpot sit-and-go format features a 5-7% fee structure. These fast-paced games with randomized prize pools are perfect for players who want quick action with potential for big multipliers.
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-300 text-lg leading-relaxed">
                    Remember, all rake you generate counts toward both your Fish Buffet progress and our Monthly Rake Chase rewards, maximizing your overall returns.
                  </p>
                </div>

                </div>
              </div>

            </article>
          </div>

          {/* FAQ Section - Direct on Black Background */}
          <div className="py-24 md:py-32">
            <div className="max-w-4xl mx-auto px-4">
              {/* Section Header */}
              <div className="text-center mb-16">
                <h3 className="text-white text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold"
                    style={{ 
                      textShadow: '0 2px 16px rgba(0,0,0,0.4)',
                      letterSpacing: '-0.02em',
                      fontWeight: '600'
                    }}>
                  Frequently Asked Questions
                </h3>
              </div>

              {/* FAQ Accordion */}
              <div className="space-y-0">
                {GGPOKER_DATA.faqs.map((faq, index) => (
                  <div 
                    key={index}
                    className="group border-b border-white/10 transition-all duration-300"
                  >
                    {/* Question Button */}
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full flex items-center justify-between py-5 text-left transition-all duration-300 hover:opacity-80"
                    >
                      <span className="text-white text-base sm:text-base md:text-lg lg:text-lg font-semibold pr-8"
                            style={{ 
                              textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                              letterSpacing: '-0.01em'
                            }}>
                        {faq.question}
                      </span>
                      
                      {/* Plus/Minus Icon */}
                      <div className="relative flex-shrink-0">
                        <div className={`transition-all duration-300 ${expandedFAQ === index ? 'rotate-45' : 'rotate-0'}`}>
                          <svg 
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-[#077124]"
                          >
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                        </div>
                      </div>
                    </button>

                    {/* Answer with smooth expansion */}
                    <div 
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        expandedFAQ === index ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="pb-2">
                        <p className="text-sm md:text-base leading-relaxed text-gray-400"
                           style={{ 
                             textShadow: '0 1px 4px rgba(0,0,0,0.2)',
                             letterSpacing: '-0.005em'
                           }}>
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Sticky Sign Up Button - Premium Design */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-[9999] transition-all duration-500 ease-out ${
          showStickyButton 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        {/* Background with blur and gradient */}
        <div className="relative">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/95 to-transparent backdrop-blur-xl"></div>
          
          {/* Top border glow */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#077124]/50 to-transparent"></div>
          
          {/* Content */}
          <div className="relative px-3 sm:px-4 py-2.5 sm:py-3 md:py-3.5">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-12">
              
              {/* Left CTA - New Player */}
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <span className="text-white text-base sm:text-lg font-semibold whitespace-nowrap">
                  New Player
                </span>
                <a
                  href="/platform-connection?platform_id=1365"
                  className="group/sticky relative inline-flex items-center justify-center gap-2 px-8 py-3 text-sm sm:text-base font-bold text-white bg-gradient-to-b from-[#088929] to-[#055a1c] rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.05] active:scale-[0.98] shadow-xl flex-shrink-0 w-full sm:w-auto tracking-wide"
                  style={{
                    boxShadow: `
                      0 0 0 1px rgba(255,255,255,0.1),
                      0 2px 8px 0 rgba(0,0,0,0.5),
                      inset 0 1px 1px rgba(255,255,255,0.3)
                    `
                  }}
                >
                  {/* Glass reflection */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 via-white/5 to-transparent" style={{ height: '50%' }}></div>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/sticky:translate-x-[200%] transition-transform duration-1000 skew-x-12"></div>
                  
                  <span className="relative z-10 drop-shadow-lg">Create An Account</span>
                  
                  {/* Top highlight */}
                  <div className="absolute inset-x-0 top-[1px] h-px bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"></div>
                </a>
              </div>

              {/* Right CTA - Existing Player */}
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <span className="text-white text-base sm:text-lg font-semibold whitespace-nowrap">
                  Existing Player
                </span>
                <a
                  href="/contact"
                  className="group/sticky relative inline-flex items-center justify-center gap-2 px-8 py-3 text-sm sm:text-base font-bold text-white bg-gradient-to-b from-[#088929] to-[#055a1c] rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.05] active:scale-[0.98] shadow-xl flex-shrink-0 w-full sm:w-auto tracking-wide"
                  style={{
                    boxShadow: `
                      0 0 0 1px rgba(255,255,255,0.1),
                      0 2px 8px 0 rgba(0,0,0,0.5),
                      inset 0 1px 1px rgba(255,255,255,0.3)
                    `
                  }}
                >
                  {/* Glass reflection */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 via-white/5 to-transparent" style={{ height: '50%' }}></div>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/sticky:translate-x-[200%] transition-transform duration-1000 skew-x-12"></div>
                  
                  <span className="relative z-10 drop-shadow-lg">Contact Us</span>
                  
                  {/* Top highlight */}
                  <div className="absolute inset-x-0 top-[1px] h-px bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"></div>
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 6rem;
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        /* Melhorar scroll em mobile */
        @media (max-width: 1024px) {
          html {
            scroll-padding-top: 4rem;
          }
        }
      `}</style>

      <Footer />
    </div>
  );
}
