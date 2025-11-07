"use client";

import HeaderWithAuth from "../../components/HeaderWithAuth";
import Footer from "../../components/Footer";
import TableOfContents from "../../../components/TableOfContents";
import RelatedNews from "../../../components/RelatedNews";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Link2, Check, Share2, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

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

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

export default function PartyPokerBirminghamNewsPage() {
  const [copied, setCopied] = useState(false);
  const [accordionOpen, setAccordionOpen] = useState(false);

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Check out this article: PartyPoker Tour Returns to Birmingham this October");
    
    let shareUrl = "";
    switch(platform) {
      case "discord":
        // Discord doesn't have a direct share URL, so we copy the link
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${text}%20${url}`;
        break;
      case "instagram":
        // Instagram doesn't support web sharing, copy link to clipboard
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  };

  return (
    <div className="bg-[#1E1E1E] min-h-screen flex flex-col">
      {/* Header Section */}
      <section className="relative bg-[#1E1E1E] w-full px-3 md:px-4 pt-6">
        <div className="absolute top-0 left-0 right-0 z-50 pt-6 px-4">
          <HeaderWithAuth />
        </div>
      </section>

      {/* Main Content */}
      <main className="relative bg-[#1E1E1E] w-full pt-20 pb-24 flex-1">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Go Back Button */}
          <div className="mt-6 mb-8">
            <Link href="/news" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#077124] transition-colors duration-300 text-sm font-medium group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Go back</span>
            </Link>
          </div>

          {/* Hero Section: Title + Sidebar + Image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
            
            {/* Left Column - Empty space to align with sidebar below */}
            <div className="lg:col-span-3 hidden lg:block"></div>

            {/* Right Column - Title and Subtitle aligned with image */}
            <div className="lg:col-span-9 mb-6 lg:mb-8">
              <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight" 
                  style={{ 
                    textShadow: '0 2px 16px rgba(0,0,0,0.4)',
                    letterSpacing: '-0.02em'
                  }}>
                PartyPoker Tour Returns to Birmingham this October
              </h1>
              {/* Subtitle/Description */}
              <p className="text-gray-400 text-lg md:text-xl mt-4 leading-relaxed">
                Five key numbers to keep tabs on your whole-body health.
              </p>
            </div>
          </div>

          {/* Hero Section: Sidebar + Image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            
            {/* Left Sidebar - Info Cards */}
            <div className="lg:col-span-3 space-y-4">
              
              {/* Date Published Card */}
              <div className="relative rounded-2xl overflow-hidden group/card">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#121212] to-[#0d0d0d]"></div>
                <div className="relative border border-white/[0.08] rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#077124]/10 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-[#077124]" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Date Published</h3>
                  </div>
                  <p className="text-white text-base font-semibold">October 6, 2025</p>
                </div>
              </div>

              {/* Publisher Card */}
              <div className="relative rounded-2xl overflow-hidden group/card">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#121212] to-[#0d0d0d]"></div>
                <div className="relative border border-white/[0.08] rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-[#077124]/20 rounded-xl blur-sm"></div>
                      <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#077124] to-emerald-500 flex items-center justify-center">
                        <User className="w-5 h-5 text-white" strokeWidth={2.5} />
                      </div>
                    </div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Publisher</h3>
                  </div>
                  <p className="text-white text-base font-semibold">Chris Andreou</p>
                </div>
              </div>

              {/* Share Card */}
              <div className="relative rounded-2xl overflow-hidden group/card">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#121212] to-[#0d0d0d]"></div>
                <div className="relative border border-white/[0.08] rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#077124]/10 flex items-center justify-center">
                      <Share2 className="w-5 h-5 text-[#077124]" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Share Article</h3>
                  </div>
                  
                  {/* Copy Link Button */}
                  <button
                    onClick={handleCopyLink}
                    className="w-full mb-3 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300 group/copy"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-[#077124]" strokeWidth={2.5} />
                        <span className="text-[#077124]">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Link2 className="w-4 h-4 group-hover/copy:text-[#077124] transition-colors" strokeWidth={2.5} />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>

                  {/* Social Share Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleShare("discord")}
                      className="flex-1 inline-flex items-center justify-center p-2.5 bg-white/5 hover:bg-indigo-600/20 border border-white/10 hover:border-indigo-600/30 rounded-xl transition-all duration-300 group/dc"
                      aria-label="Share on Discord"
                    >
                      <DiscordIcon className="w-4 h-4 text-gray-400 group-hover/dc:text-indigo-400 transition-colors" />
                    </button>
                    
                    <button
                      onClick={() => handleShare("whatsapp")}
                      className="flex-1 inline-flex items-center justify-center p-2.5 bg-white/5 hover:bg-green-600/20 border border-white/10 hover:border-green-600/30 rounded-xl transition-all duration-300 group/wa"
                      aria-label="Share on WhatsApp"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-gray-400 group-hover/wa:text-green-500 transition-colors" />
                    </button>
                    
                    <button
                      onClick={() => handleShare("instagram")}
                      className="flex-1 inline-flex items-center justify-center p-2.5 bg-white/5 hover:bg-pink-600/20 border border-white/10 hover:border-pink-600/30 rounded-xl transition-all duration-300 group/ig"
                      aria-label="Share on Instagram"
                    >
                      <InstagramIcon className="w-4 h-4 text-gray-400 group-hover/ig:text-pink-500 transition-colors" />
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Side - Featured Image */}
            <div className="lg:col-span-9">
              <div className="relative rounded-3xl overflow-hidden group shadow-2xl h-full">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="absolute inset-0 border border-white/[0.05] rounded-3xl"></div>
                <img 
                  src="https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/10/06190843/PartyPoker-Tour-Birmingham.png"
                  alt="PartyPoker Tour Birmingham promotional banner"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
            </div>

          </div>

          {/* Article Body - Aligned with image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column - Sticky Sidebar with TableOfContents */}
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-[120px] mb-8 lg:mb-0">
                <TableOfContents />
              </div>
            </aside>

            {/* Right Column - Article content aligned with image */}
            <article className="lg:col-span-9">
            
             {/* Introduction Paragraph */}
             <div className="mb-12">
               <p className="text-gray-300 text-lg md:text-xl leading-relaxed" style={{ lineHeight: '1.8' }}>
                 Players, mark your calendars: the PartyPoker Tour Birmingham is back from 11-19 October 2025 at the Resorts World Genting Casino in Birmingham, and it&apos;s shaping up to be one of the most accessible, value-driven poker festivals in the UK.
               </p>
             </div>

            {/* Festival Highlights Section */}
            <div className="mb-12">
              <h2 
                id="festival-highlights-key-events"
                className="text-white text-2xl md:text-3xl font-bold mb-6"
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
              <h2 
                id="how-to-qualify"
                className="text-white text-2xl md:text-3xl font-bold mb-6"
                style={{ 
                  textShadow: '0 2px 12px rgba(0,0,0,0.4)',
                  letterSpacing: '-0.015em'
                }}>
                How to Qualify
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6" style={{ lineHeight: '1.8' }}>
                You can qualify to visit Birmingham for an extremely low cost by playing satellites on partypoker, starting from just $1!
              </p>
              <p className="text-gray-300 text-lg leading-relaxed" style={{ lineHeight: '1.8' }}>
                Want to get involved? Make sure you create or link your account to Universal Poker to claim the excellent benefits we provide:
              </p>
            </div>

            {/* Benefits Section */}
            <div className="mb-12">
              <h2 
                id="universal-poker-benefits"
                className="text-white text-2xl md:text-3xl font-bold mb-6"
                style={{ 
                  textShadow: '0 2px 12px rgba(0,0,0,0.4)',
                  letterSpacing: '-0.015em'
                }}>
                Universal Poker Benefits
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6" style={{ lineHeight: '1.8' }}>
                As a Universal Poker member, you gain access to exclusive deals and enhanced rakeback on PartyPoker. Our team provides personalized support to help you maximize your poker journey, whether you&apos;re a recreational player or a seasoned pro.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed" style={{ lineHeight: '1.8' }}>
                Join thousands of players who trust Universal Poker for their poker affiliations and start enjoying premium benefits today.
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

          </div>

          {/* ===== MOCKUPS SECTION - NEW BLOCKS FOR APPROVAL ===== */}
          <div className="mt-24 pt-12 border-t-4 border-yellow-500/30">
            <div className="mb-12 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-yellow-500/10 border border-yellow-500/30 rounded-full mb-4">
                <span className="text-2xl">🎨</span>
                <span className="text-yellow-400 font-bold uppercase tracking-wider text-sm">Mockups - Novos Blocos</span>
              </div>
              <h2 className="text-white text-3xl md:text-4xl font-bold mb-3">
                Elementos Disponíveis para o Editor
              </h2>
              <p className="text-gray-400 text-lg max-w-3xl mx-auto">
                Visualize abaixo todos os blocos que estarão disponíveis no Admin Panel para criar artigos ricos
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Empty left column for alignment */}
              <div className="lg:col-span-3 hidden lg:block"></div>

              {/* Main content column - aligned with article */}
              <div className="lg:col-span-9 space-y-16">

                {/* BLOCO 1: ACCORDION (Terms & Conditions) */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">1️⃣</span>
                    <h3 className="text-xl font-bold text-white">Accordion / Expansível</h3>
                  </div>
                  
                  {/* CUSTOMIZÁVEL: Título do accordion e todo o conteúdo interno */}
                  <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#0d0d0d] via-[#121212] to-[#0d0d0d] border border-white/[0.08]">
                    <button
                      onClick={() => setAccordionOpen(!accordionOpen)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
                    >
                      {/* CUSTOMIZÁVEL: Título */}
                      <span className="text-white text-lg font-semibold">Terms & Conditions</span>
                      {accordionOpen ? (
                        <ChevronUp className="w-5 h-5 text-[#077124]" strokeWidth={2.5} />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-[#077124]" strokeWidth={2.5} />
                      )}
                    </button>
                    
                    {accordionOpen && (
                      <div className="px-6 pb-6 border-t border-white/[0.05] pt-6">
                        {/* CUSTOMIZÁVEL: Todo o conteúdo (H4, listas, parágrafos) */}
                        <h4 className="text-white font-bold text-base mb-3">Eligibility:</h4>
                        <ul className="list-disc list-inside space-y-2 text-gray-300 mb-6">
                          <li>Participants must be 18 years or older</li>
                          <li>Unavailable if accessing from a restricted country</li>
                          <li>Limited to one person per household or device</li>
                          <li>Provide accurate personal information during registration</li>
                        </ul>
                        
                        <h4 className="text-white font-bold text-base mb-3">Account Restrictions:</h4>
                        <ul className="list-disc list-inside space-y-2 text-gray-300 mb-6">
                          <li>There may be restrictions due to legal or regulatory compliance</li>
                          <li>We are not responsible for restrictions that prevent participation</li>
                        </ul>
                        
                        <h4 className="text-white font-bold text-base mb-3">Changes and Cancellation:</h4>
                        <ul className="list-disc list-inside space-y-2 text-gray-300">
                          <li>We reserve the right to modify, terminate or restrict access to promotions</li>
                          <li>By participating, you agree to these terms and General Terms and Conditions</li>
                          <li>Non-compliance may result in removal of rewards without notice</li>
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-400 text-center mt-4 italic">
                    ✨ Totalmente customizável: título, conteúdo, formatação
                  </p>
                </div>

                {/* BLOCO 2: BANNER IMAGES (3 sizes) */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">2️⃣</span>
                    <h3 className="text-xl font-bold text-white">Banner Images (3 tamanhos)</h3>
                  </div>
                  
                  <div className="space-y-6">
                    {/* CUSTOMIZÁVEL: Upload de imagem */}
                    {/* Small Banner */}
                    <div>
                      <p className="text-sm text-gray-400 mb-2 font-medium">Small (16:3 ratio)</p>
                      <div className="relative rounded-2xl overflow-hidden group shadow-xl" style={{ aspectRatio: '16/3' }}>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white text-2xl font-bold drop-shadow-lg">Banner Image</span>
                        </div>
                      </div>
                    </div>

                    {/* Medium Banner */}
                    <div>
                      <p className="text-sm text-gray-400 mb-2 font-medium">Medium (16:5 ratio)</p>
                      <div className="relative rounded-2xl overflow-hidden group shadow-xl" style={{ aspectRatio: '16/5' }}>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white text-3xl font-bold drop-shadow-lg">Banner Image</span>
                        </div>
                      </div>
                    </div>

                    {/* Large Banner */}
                    <div>
                      <p className="text-sm text-gray-400 mb-2 font-medium">Large (16:9 ratio)</p>
                      <div className="relative rounded-2xl overflow-hidden group shadow-xl" style={{ aspectRatio: '16/9' }}>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white text-4xl font-bold drop-shadow-lg">Banner Image</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-400 text-center mt-4 italic">
                    ✨ Admin escolhe tamanho e faz upload da imagem
                  </p>
                </div>

                {/* BLOCO 3: GALLERIES */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">3️⃣</span>
                    <h3 className="text-xl font-bold text-white">Galerias de Imagens</h3>
                  </div>
                  
                  {/* CUSTOMIZÁVEL: Upload de múltiplas imagens */}
                  <div className="space-y-8">
                    {/* 2 Images Gallery (1x2) */}
                    <div>
                      <p className="text-sm text-gray-400 mb-3 font-medium">2 Imagens (Grid 1x2)</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-red-500 to-red-700 aspect-video flex items-center justify-center">
                          <span className="text-white font-semibold text-lg">Image 1</span>
                        </div>
                        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-red-500 to-red-700 aspect-video flex items-center justify-center">
                          <span className="text-white font-semibold text-lg">Image 2</span>
                        </div>
                      </div>
                    </div>

                    {/* 3 Images Gallery (1x3) */}
                    <div>
                      <p className="text-sm text-gray-400 mb-3 font-medium">3 Imagens (Grid 1x3)</p>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-blue-700 aspect-video flex items-center justify-center">
                          <span className="text-white font-semibold text-lg">Image 1</span>
                        </div>
                        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-blue-700 aspect-video flex items-center justify-center">
                          <span className="text-white font-semibold text-lg">Image 2</span>
                        </div>
                        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500 to-blue-700 aspect-video flex items-center justify-center">
                          <span className="text-white font-semibold text-lg">Image 3</span>
                        </div>
                      </div>
                    </div>

                    {/* 4 Images Gallery (2x2) */}
                    <div>
                      <p className="text-sm text-gray-400 mb-3 font-medium">4 Imagens (Grid 2x2)</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500 to-purple-700 aspect-video flex items-center justify-center">
                          <span className="text-white font-semibold text-lg">Image 1</span>
                        </div>
                        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500 to-purple-700 aspect-video flex items-center justify-center">
                          <span className="text-white font-semibold text-lg">Image 2</span>
                        </div>
                        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500 to-purple-700 aspect-video flex items-center justify-center">
                          <span className="text-white font-semibold text-lg">Image 3</span>
                        </div>
                        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500 to-purple-700 aspect-video flex items-center justify-center">
                          <span className="text-white font-semibold text-lg">Image 4</span>
                        </div>
                      </div>
                    </div>

                    {/* 5 Images Gallery (3 top + 2 bottom centered) */}
                    <div>
                      <p className="text-sm text-gray-400 mb-3 font-medium">5 Imagens (3 em cima, 2 embaixo centralizadas)</p>
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-green-500 to-green-700 aspect-video flex items-center justify-center">
                            <span className="text-white font-semibold text-lg">Image 1</span>
                          </div>
                          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-green-500 to-green-700 aspect-video flex items-center justify-center">
                            <span className="text-white font-semibold text-lg">Image 2</span>
                          </div>
                          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-green-500 to-green-700 aspect-video flex items-center justify-center">
                            <span className="text-white font-semibold text-lg">Image 3</span>
                          </div>
                        </div>
                        <div className="flex justify-center gap-4">
                          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-green-500 to-green-700 aspect-video flex items-center justify-center" style={{ width: 'calc(33.333% - 0.667rem)' }}>
                            <span className="text-white font-semibold text-lg">Image 4</span>
                          </div>
                          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-green-500 to-green-700 aspect-video flex items-center justify-center" style={{ width: 'calc(33.333% - 0.667rem)' }}>
                            <span className="text-white font-semibold text-lg">Image 5</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 6 Images Gallery (2x3) */}
                    <div>
                      <p className="text-sm text-gray-400 mb-3 font-medium">6 Imagens (Grid 2x3)</p>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-500 to-cyan-700 aspect-video flex items-center justify-center">
                          <span className="text-white font-semibold text-lg">Image 1</span>
                        </div>
                        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-500 to-cyan-700 aspect-video flex items-center justify-center">
                          <span className="text-white font-semibold text-lg">Image 2</span>
                        </div>
                        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-500 to-cyan-700 aspect-video flex items-center justify-center">
                          <span className="text-white font-semibold text-lg">Image 3</span>
                        </div>
                        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-500 to-cyan-700 aspect-video flex items-center justify-center">
                          <span className="text-white font-semibold text-lg">Image 4</span>
                        </div>
                        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-500 to-cyan-700 aspect-video flex items-center justify-center">
                          <span className="text-white font-semibold text-lg">Image 5</span>
                        </div>
                        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-500 to-cyan-700 aspect-video flex items-center justify-center">
                          <span className="text-white font-semibold text-lg">Image 6</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-400 text-center mt-4 italic">
                    ✨ Admin escolhe quantas imagens (2, 3, 4, 5 ou 6) e faz upload
                  </p>
                </div>

                {/* BLOCO 4: CTA BUTTON */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">4️⃣</span>
                    <h3 className="text-xl font-bold text-white">CTA Button</h3>
                  </div>
                  
                  {/* CUSTOMIZÁVEL: Texto do botão e URL */}
                  <div className="flex justify-center">
                    <Link 
                      href="/deals" 
                      className="group/btn relative inline-flex items-center justify-center gap-3 px-10 py-4 text-base font-bold text-white bg-gradient-to-b from-[#088929] to-[#055a1c] rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.05] active:scale-[0.95]"
                      style={{
                        boxShadow: `
                          0 0 0 1px rgba(255,255,255,0.1),
                          0 1px 3px 0 rgba(0,0,0,0.5),
                          0 4px 12px rgba(7,113,36,0.3),
                          0 8px 32px rgba(7,113,36,0.25),
                          inset 0 1px 1px rgba(255,255,255,0.3),
                          inset 0 -1px 1px rgba(0,0,0,0.2)
                        `
                      }}
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#077124] via-[#0a9b30] to-[#077124] rounded-full blur-xl opacity-60 group-hover/btn:opacity-90 transition-opacity duration-500"></div>
                      <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 via-[#077124] to-emerald-400 rounded-full blur-2xl opacity-40 group-hover/btn:opacity-70 transition-opacity duration-500 animate-pulse-slow"></div>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 via-white/5 to-transparent" style={{ height: '50%' }}></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000 skew-x-12"></div>
                      <span className="relative z-10 tracking-wide drop-shadow-lg">Click Here - Customizable Text</span>
                      <div className="absolute inset-x-0 top-[1px] h-px bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"></div>
                    </Link>
                  </div>
                  
                  <p className="text-sm text-gray-400 text-center mt-4 italic">
                    ✨ Texto e URL totalmente customizáveis
                  </p>
                </div>

                {/* BLOCO 4.5: HEADING H2 (Section Title) */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">4️⃣➕</span>
                    <h3 className="text-xl font-bold text-white">Heading H2 (Título de Seção)</h3>
                  </div>
                  
                  {/* CUSTOMIZÁVEL: Texto do H2 */}
                  <h2 
                    className="text-white text-2xl md:text-3xl font-bold"
                    style={{ 
                      textShadow: '0 2px 12px rgba(0,0,0,0.4)',
                      letterSpacing: '-0.015em'
                    }}>
                    How to Qualify
                  </h2>
                  
                  <p className="text-sm text-gray-400 text-center mt-4 italic">
                    ✨ Texto customizável - para dividir seções do artigo
                  </p>
                </div>

                {/* BLOCO 5: BANNER CTA (Full Width) */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">5️⃣</span>
                    <h3 className="text-xl font-bold text-white">Banner CTA (Full Width)</h3>
                  </div>
                  
                  <div className="relative rounded-3xl overflow-hidden backdrop-blur-xl group/cta shadow-2xl">
                    {/* CUSTOMIZÁVEL: Cor de fundo com gradiente */}
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/60 via-black/80 to-zinc-900/60"></div>
                    <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#077124]/[0.08] rounded-full blur-[120px] opacity-0 group-hover/cta:opacity-100 transition-opacity duration-1000"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-emerald-500/[0.06] rounded-full blur-[120px] opacity-0 group-hover/cta:opacity-100 transition-opacity duration-1000"></div>
                    
                    <div className="relative border border-white/[0.08] group-hover/cta:border-[#077124]/30 rounded-3xl p-12 text-center transition-all duration-700">
                      {/* CUSTOMIZÁVEL: Título */}
                      <h3 className="text-white text-2xl md:text-3xl font-bold mb-4"
                          style={{ 
                            textShadow: '0 2px 12px rgba(0,0,0,0.4)',
                            letterSpacing: '-0.015em'
                          }}>
                        Start your journey with Universal
                      </h3>
                      
                      {/* CUSTOMIZÁVEL: Descrição */}
                      <p className="text-gray-300 text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                        Join PartyPoker through Universal Poker and unlock exclusive benefits, including enhanced rakeback, special promotions, and access to premium tournament packages.
                      </p>
                      
                      {/* CUSTOMIZÁVEL: Botão (texto + URL) */}
                      <Link 
                        href="/deals" 
                        className="group/btn relative inline-flex items-center justify-center gap-3 px-12 py-5 text-base md:text-lg font-bold text-white bg-gradient-to-b from-[#088929] to-[#055a1c] rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.05] active:scale-[0.95]"
                        style={{
                          boxShadow: `
                            0 0 0 1px rgba(255,255,255,0.1),
                            0 1px 3px 0 rgba(0,0,0,0.5),
                            0 4px 12px rgba(7,113,36,0.3),
                            0 8px 32px rgba(7,113,36,0.25),
                            inset 0 1px 1px rgba(255,255,255,0.3),
                            inset 0 -1px 1px rgba(0,0,0,0.2)
                          `
                        }}
                      >
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#077124] via-[#0a9b30] to-[#077124] rounded-full blur-xl opacity-60 group-hover/btn:opacity-90 transition-opacity duration-500"></div>
                        <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 via-[#077124] to-emerald-400 rounded-full blur-2xl opacity-40 group-hover/btn:opacity-70 transition-opacity duration-500 animate-pulse-slow"></div>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 via-white/5 to-transparent" style={{ height: '50%' }}></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000 skew-x-12"></div>
                        <span className="relative z-10 tracking-wide drop-shadow-lg">View Our Deals</span>
                        <div className="absolute inset-x-0 top-[1px] h-px bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"></div>
                      </Link>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-400 text-center mt-4 italic">
                    ✨ Totalmente customizável: cor de fundo, textos, URL do botão
                  </p>
                </div>

                {/* BLOCO 6: SIGN UP CARD (Layout Horizontal) */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">6️⃣</span>
                    <h3 className="text-xl font-bold text-white">Sign Up Card (Layout Horizontal)</h3>
                  </div>
                  
                  {/* CUSTOMIZÁVEL: Logo, gradiente de fundo, textos, URL */}
                  {/* Largura reduzida: max-w-4xl ao invés de full width */}
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl max-w-4xl">
                    {/* CUSTOMIZÁVEL: Gradiente de fundo (cores ajustáveis) */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#077124]/20 via-emerald-900/30 to-[#077124]/20"></div>
                    
                    {/* Layout horizontal - mais estreito */}
                    <div className="relative border-2 border-[#077124]/30 rounded-3xl p-6 backdrop-blur-sm bg-black/40">
                      <div className="flex items-center gap-8">
                        
                        {/* CUSTOMIZÁVEL: Logo da sala (esquerda) - MAIOR */}
                        <div className="flex-shrink-0">
                          <div className="w-32 h-32 rounded-2xl bg-black/80 border border-white/10 flex items-center justify-center shadow-lg">
                            <span className="text-white text-3xl font-bold">LOGO</span>
                          </div>
                        </div>
                        
                        {/* Conteúdo (direita) - mais espaçamento */}
                        <div className="flex-1 pr-4">
                          {/* CUSTOMIZÁVEL: Título */}
                          <h3 className="text-white text-xl md:text-2xl font-bold mb-2"
                              style={{ 
                                textShadow: '0 2px 12px rgba(0,0,0,0.6)',
                                letterSpacing: '-0.015em'
                              }}>
                            Create Your Account Today
                          </h3>
                          
                          {/* CUSTOMIZÁVEL: Subtítulo/Descrição */}
                          <p className="text-gray-300 text-sm md:text-base mb-4 leading-relaxed">
                            Join thousands of players and start enjoying exclusive benefits.
                          </p>
                          
                          {/* CUSTOMIZÁVEL: Botão (texto + URL) */}
                          <Link 
                            href="/register" 
                            className="group/btn relative inline-flex items-center justify-center gap-2 px-8 py-3 text-sm md:text-base font-bold text-white bg-gradient-to-b from-[#088929] to-[#055a1c] rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.05] active:scale-[0.95]"
                            style={{
                              boxShadow: `
                                0 0 0 1px rgba(255,255,255,0.1),
                                0 1px 3px 0 rgba(0,0,0,0.5),
                                0 4px 12px rgba(7,113,36,0.4),
                                0 8px 32px rgba(7,113,36,0.3),
                                inset 0 1px 1px rgba(255,255,255,0.3),
                                inset 0 -1px 1px rgba(0,0,0,0.2)
                              `
                            }}
                          >
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#077124] via-[#0a9b30] to-[#077124] rounded-full blur-xl opacity-70 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 via-white/5 to-transparent" style={{ height: '50%' }}></div>
                            <span className="relative z-10 tracking-wide drop-shadow-lg">Sign Up Now</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-400 text-center mt-4 italic">
                    ✨ Layout horizontal: logo maior à esquerda, conteúdo à direita - largura reduzida
                  </p>
                </div>

                {/* BLOCO 6.5: PARAGRAPH (Texto Livre) */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">6️⃣➕</span>
                    <h3 className="text-xl font-bold text-white">Paragraph (Texto Livre)</h3>
                  </div>
                  
                  {/* CUSTOMIZÁVEL: Texto completo */}
                  <p className="text-gray-300 text-lg leading-relaxed" style={{ lineHeight: '1.8' }}>
                    The Festival offers a variety of tournaments designed to appeal to a wide range of bankrolls and styles. Whether you&apos;re a recreational player or a seasoned pro, there&apos;s something for everyone at this event.
                  </p>
                  
                  <p className="text-sm text-gray-400 text-center mt-4 italic">
                    ✨ Texto livre - fonte igual ao corpo do artigo
                  </p>
                </div>

                {/* BLOCO 7: DIVIDER */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">7️⃣</span>
                    <h3 className="text-xl font-bold text-white">Divider (Linha Separadora)</h3>
                  </div>
                  
                  {/* CUSTOMIZÁVEL: Cor da linha */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#077124] blur-sm opacity-30"></div>
                    <div className="relative h-[2px] bg-gradient-to-r from-transparent via-[#077124] to-transparent"></div>
                  </div>
                  
                  <p className="text-sm text-gray-400 text-center mt-4 italic">
                    ✨ Linha com glow - cor customizável
                  </p>
                </div>

                {/* BLOCO 8: TABELA PREMIUM (já existe no conteúdo, mas vamos mostrar variação) */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">8️⃣</span>
                    <h3 className="text-xl font-bold text-white">Tabela Premium (Customizável)</h3>
                  </div>
                  
                  {/* CUSTOMIZÁVEL: Número de linhas, colunas, conteúdo de cada célula */}
                  <div className="relative rounded-3xl overflow-hidden mb-8 group/table shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#077124]/20 via-emerald-900/30 to-[#077124]/20"></div>
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#077124]/20 rounded-full blur-[120px] animate-pulse-slow"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
                    
                    <div className="relative border-2 border-[#077124]/30 rounded-3xl overflow-hidden backdrop-blur-sm bg-black/60">
                      {/* CUSTOMIZÁVEL: Tabela completa - add/remove linhas e colunas conforme necessário */}
                      <table className="w-full text-left">
                        <thead>
                          {/* CUSTOMIZÁVEL: Nomes das colunas */}
                          <tr className="bg-gradient-to-r from-[#077124]/40 via-[#077124]/50 to-[#077124]/40 border-b-2 border-[#077124]/40">
                            <th className="px-6 py-5 text-white font-bold text-base tracking-wide">Feature</th>
                            <th className="px-6 py-5 text-white font-bold text-base tracking-wide">Standard</th>
                            <th className="px-6 py-5 text-white font-bold text-base tracking-wide">Premium</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* CUSTOMIZÁVEL: Cada linha pode ser adicionada/removida/editada */}
                          <tr className="border-b border-[#077124]/10 hover:bg-[#077124]/10 transition-all duration-300 group/row">
                            <td className="px-6 py-5 text-gray-200 font-semibold group-hover/row:text-white transition-colors">Rakeback</td>
                            <td className="px-6 py-5 text-gray-300 group-hover/row:text-white transition-colors">30%</td>
                            <td className="px-6 py-5 text-emerald-400 font-bold">65%</td>
                          </tr>
                          <tr className="border-b border-[#077124]/10 hover:bg-[#077124]/10 transition-all duration-300 group/row">
                            <td className="px-6 py-5 text-gray-200 font-semibold group-hover/row:text-white transition-colors">Bonus</td>
                            <td className="px-6 py-5 text-gray-300 group-hover/row:text-white transition-colors">$500</td>
                            <td className="px-6 py-5 text-emerald-400 font-bold">$2,000</td>
                          </tr>
                          <tr className="hover:bg-[#077124]/10 transition-all duration-300 group/row">
                            <td className="px-6 py-5 text-gray-200 font-semibold group-hover/row:text-white transition-colors">Support</td>
                            <td className="px-6 py-5 text-gray-300 group-hover/row:text-white transition-colors">Email</td>
                            <td className="px-6 py-5 text-emerald-400 font-bold">24/7 Priority</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#077124]/60 to-transparent"></div>
                  </div>
                  
                  <p className="text-sm text-gray-400 text-center italic">
                    ✨ Admin poderá customizar: número de linhas, colunas, todo o conteúdo, cores destacadas
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Related News Section */}
      <RelatedNews currentArticleId="birmingham-tour" />

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

