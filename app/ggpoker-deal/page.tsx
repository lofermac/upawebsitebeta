"use client";

import { useState, useEffect } from "react";
import HeaderWithAuth from "../components/HeaderWithAuth";
import Footer from "../components/Footer";
import TableOfContents from "../../components/TableOfContents";
import { useGeoLocation } from "../../lib/hooks/useGeoLocation";
import { Info, ChevronDown, ChevronUp, MessageCircle, Mail, Send, Phone } from "lucide-react";
import * as flags from 'country-flag-icons/react/3x2';

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

export default function GGPokerDealPage() {
  const { userCountry: detectedCountry, isLoading: geoLoading } = useGeoLocation();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  
  // Para demonstração, usar Brasil ao invés do país detectado
  const userCountry = DEMO_COUNTRY;
  
  // Determinar se o país do usuário é aceito
  const isCountryAccepted = userCountry ? ACCEPTED_COUNTRIES.includes(userCountry) : true;
  
  // Pegar componente de bandeira do país
  const CountryFlag = userCountry ? (flags as any)[userCountry] : null;
  
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

  // Sections para Table of Contents
  const sections = [
    { id: "monthly-rake-chase", title: "Monthly Rake Chase" },
    { id: "payment-information", title: "Payment Information" },
    { id: "how-to-join", title: "How To Join" },
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
          <div className="relative z-10 pt-16 pb-12 px-4">
            <div className="max-w-7xl mx-auto text-center">
              <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4" 
                  style={{ 
                    textShadow: '0 2px 16px rgba(0,0,0,0.4)',
                    letterSpacing: '-0.02em'
                  }}>
                GGPoker: Our Deal & Site Review 2025
              </h1>
              <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
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
                      className="group/btn relative inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white bg-gradient-to-b from-[#088929] to-[#055a1c] rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.05] active:scale-[0.98] w-full shadow-xl"
                      style={{
                        boxShadow: `
                          0 0 0 1px rgba(255,255,255,0.1),
                          0 2px 8px 0 rgba(0,0,0,0.5),
                          0 4px 20px rgba(7,113,36,0.5),
                          0 8px 32px rgba(7,113,36,0.3),
                          inset 0 1px 1px rgba(255,255,255,0.3)
                        `
                      }}
                    >
                      {/* Animated glow effects */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#077124] via-[#0a9b30] to-[#077124] rounded-full blur-xl opacity-50 group-hover/btn:opacity-90 transition-opacity duration-500 animate-pulse-slow"></div>
                      <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 via-[#077124] to-emerald-400 rounded-full blur-2xl opacity-30 group-hover/btn:opacity-60 transition-opacity duration-500"></div>
                      
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

          {/* Main Content with Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar - Table of Contents */}
            <aside className="lg:col-span-1 lg:sticky lg:top-24 self-start">
              <TableOfContents sections={sections} />
            </aside>

            {/* Main Article Content */}
            <article className="lg:col-span-3 space-y-12">
              
              {/* Section: Our Deal Explained */}
              <div className="relative rounded-2xl overflow-hidden backdrop-blur-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/95 via-black/95 to-zinc-900/95"></div>
                <div className="absolute inset-0 border border-white/[0.1] rounded-2xl"></div>
                
                <div className="relative p-8 md:p-10">
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
                </div>

              {/* Section: Monthly Rake Chase */}
              <div id="monthly-rake-chase" className="relative rounded-2xl overflow-hidden backdrop-blur-xl scroll-mt-24">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/95 via-black/95 to-zinc-900/95"></div>
                <div className="absolute inset-0 border border-white/[0.1] rounded-2xl"></div>
                
                <div className="relative p-8 md:p-10">
                  <h3 className="text-white text-2xl md:text-3xl font-bold mb-6">
                    Monthly Rake Chase
                  </h3>
                  
                  <p className="text-gray-300 text-lg leading-relaxed mb-8">
                    Players on our deal will have access to our Monthly Rake Chase, where you can get up to $1500 in rewards, every month.
                  </p>
                  
                  <p className="text-gray-300 text-lg leading-relaxed mb-8">
                    If you play and hit a certain rake tier, you will get the corresponding reward:
                  </p>

                  {/* Events Table */}
                  <div className="overflow-x-auto mb-8">
                    <table className="w-full border border-white/[0.1] rounded-xl overflow-hidden">
                      <thead className="bg-[#077124]/20">
                        <tr>
                          <th className="text-left py-4 px-6 text-white font-bold">Event</th>
                          <th className="text-center py-4 px-6 text-[#077124] font-bold">Buy-In</th>
                          <th className="text-center py-4 px-6 text-white font-bold">Guarantee</th>
                          <th className="text-center py-4 px-6 text-white font-bold">Dates</th>
                        </tr>
                      </thead>
                      <tbody>
                        {GGPOKER_DATA.events.map((event, index) => (
                          <tr key={index} className="border-t border-white/[0.05] hover:bg-white/[0.02] transition-colors">
                            <td className="py-4 px-6 text-gray-300 font-medium">{event.event}</td>
                            <td className="py-4 px-6 text-center text-[#077124] font-bold">{event.buyin}</td>
                            <td className="py-4 px-6 text-center text-gray-300">{event.guarantee}</td>
                            <td className="py-4 px-6 text-center text-gray-400 text-sm">{event.dates}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <p className="text-gray-400 text-base leading-relaxed">
                    You will not receive the reward in the next tier until you hit the requirement. For example, if achieve $1300 rake, you will still be places at level 6 and receive $120.
                  </p>
                </div>
              </div>

              {/* Section: Payment Information */}
              <div id="payment-information" className="relative rounded-2xl overflow-hidden backdrop-blur-xl scroll-mt-24">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/95 via-black/95 to-zinc-900/95"></div>
                <div className="absolute inset-0 border border-white/[0.1] rounded-2xl"></div>
                
                <div className="relative p-8 md:p-10">
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
                    </div>

              {/* Section: How To Join */}
              <div id="how-to-join" className="relative rounded-2xl overflow-hidden backdrop-blur-xl scroll-mt-24">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/95 via-black/95 to-zinc-900/95"></div>
                <div className="absolute inset-0 border border-white/[0.1] rounded-2xl"></div>
                
                <div className="relative p-8 md:p-10">
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
                        <div className="relative rounded-xl overflow-hidden backdrop-blur-xl border border-white/[0.08] p-6 hover:border-[#077124]/30 transition-all duration-500">
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
                </div>

              {/* Account Manager Section */}
              <div className="relative rounded-2xl overflow-hidden backdrop-blur-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/95 via-black/95 to-zinc-900/95"></div>
                <div className="absolute inset-0 border border-white/[0.1] rounded-2xl"></div>
                
                <div className="relative p-8 md:p-10">
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
                        <p className="text-gray-400 text-sm mb-2">Got a question? Let&apos;s chat:</p>
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
                        <button className="px-6 py-3 bg-[#077124] hover:bg-[#088929] text-white font-bold rounded-lg transition-all duration-300 flex items-center gap-2">
                          <MessageCircle className="w-4 h-4" />
                          Live chat
                        </button>
                        <button className="p-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-all duration-300">
                          <Mail className="w-5 h-5" />
                        </button>
                        <button className="p-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-all duration-300">
                          <Send className="w-5 h-5" />
                        </button>
                        <button className="p-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-all duration-300">
                          <Phone className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="relative rounded-2xl overflow-hidden backdrop-blur-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/95 via-black/95 to-zinc-900/95"></div>
                <div className="absolute inset-0 border border-white/[0.1] rounded-2xl"></div>
                
                <div className="relative p-8 md:p-10">
                  <h3 className="text-white text-2xl md:text-3xl font-bold mb-8">FAQ</h3>

                  <div className="space-y-4">
                    {GGPOKER_DATA.faqs.map((faq, index) => (
                      <div key={index} className="border border-white/[0.08] rounded-xl overflow-hidden hover:border-white/[0.12] transition-all duration-300">
                        <button
                          onClick={() => toggleFAQ(index)}
                          className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
                        >
                          <span className="text-white font-bold text-lg pr-4">{faq.question}</span>
                          {expandedFAQ === index ? (
                            <ChevronUp className="w-5 h-5 text-[#077124] flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          )}
                        </button>
                        
                        {expandedFAQ === index && (
                          <div className="px-6 pb-6 pt-2 border-t border-white/[0.05]">
                            <p className="text-gray-300 text-base leading-relaxed">{faq.answer}</p>
                          </div>
                        )}
                  </div>
                    ))}
                </div>
              </div>
            </div>

            </article>
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
