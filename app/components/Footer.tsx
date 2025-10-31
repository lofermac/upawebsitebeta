'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getFooterPokerSites, getFooterQuickLinks, FooterPokerSite, FooterQuickLink } from '@/lib/supabase/footer';
import { getFooterBadges, FooterBadge } from '@/lib/supabase/badges';

export default function Footer({ bgColor = 'black' }: { bgColor?: 'black' | 'dark-gray' }) {
  const [pokerSites, setPokerSites] = useState<FooterPokerSite[]>([]);
  const [quickLinks, setQuickLinks] = useState<FooterQuickLink[]>([]);
  const [badges, setBadges] = useState<FooterBadge[]>([]);
  const [isLoadingPokerSites, setIsLoadingPokerSites] = useState(true);
  const [isLoadingQuickLinks, setIsLoadingQuickLinks] = useState(true);
  const [isLoadingBadges, setIsLoadingBadges] = useState(true);
  
  // Define background color based on prop
  const footerBgColor = bgColor === 'dark-gray' ? '#0e0f12' : '#000000';

  // Load poker sites
  useEffect(() => {
    async function loadPokerSites() {
      try {
        const { data, error } = await getFooterPokerSites();
        
        if (!error && data) {
          setPokerSites(data);
        } else {
          console.warn('Failed to load footer poker sites, using defaults');
          setPokerSites([]);
        }
      } catch (err) {
        console.error('Error loading footer poker sites:', err);
        setPokerSites([]);
      } finally {
        setIsLoadingPokerSites(false);
      }
    }

    loadPokerSites();
  }, []);

  // Load quick links
  useEffect(() => {
    async function loadQuickLinks() {
      try {
        const { data, error } = await getFooterQuickLinks();
        
        if (!error && data) {
          setQuickLinks(data);
        } else {
          console.warn('Failed to load footer quick links, using defaults');
          setQuickLinks([]);
        }
      } catch (err) {
        console.error('Error loading footer quick links:', err);
        setQuickLinks([]);
      } finally {
        setIsLoadingQuickLinks(false);
      }
    }

    loadQuickLinks();
  }, []);

  // Load badges
  useEffect(() => {
    async function loadBadges() {
      try {
        const { data, error } = await getFooterBadges();
        
        if (!error && data) {
          setBadges(data);
        } else {
          console.warn('Failed to load footer badges');
          setBadges([]);
        }
      } catch (err) {
        console.error('Error loading footer badges:', err);
        setBadges([]);
      } finally {
        setIsLoadingBadges(false);
      }
    }

    loadBadges();
  }, []);

  return (
    <footer className="relative w-full px-3 md:px-4 pb-0" style={{ backgroundColor: footerBgColor }}>
      {/* Premium Container Card - Rounded top, cut bottom */}
      <div className="relative w-full rounded-t-[2.5rem] overflow-hidden group/footer transition-all duration-700">
        {/* Background with gradient - tom intermediário entre preto e cinza */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#121212] to-[#0d0d0d] transition-all duration-700 group-hover/footer:from-[#0e0e0e] group-hover/footer:via-[#131313] group-hover/footer:to-[#0e0e0e]"></div>
        
        {/* Subtle border effect - borda completa ao redor (exceto embaixo) */}
        <div className="absolute inset-x-0 top-0 bottom-0 left-0 right-0 rounded-t-[2.5rem] border-t border-l border-r border-white/[0.06] shadow-2xl shadow-black/50 transition-all duration-700 group-hover/footer:border-white/[0.09] group-hover/footer:shadow-black/60 pointer-events-none"></div>
        
        {/* Inner glow effect - brilho interno sutil */}
        <div className="absolute inset-0 rounded-t-[2.5rem] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.025)] transition-all duration-700 group-hover/footer:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"></div>
        
        {/* Top light rim - brilho no topo */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent rounded-t-[2.5rem]"></div>
        
        {/* Ambient background effects - glows verdes sutis */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#077124]/[0.04] rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/[0.025] rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Subtle noise texture overlay for premium feel */}
        <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulance type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
        
        {/* Content wrapper */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-20">
        {/* Footer Grid - 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          
          {/* Column 1 - Poker Sites */}
          <div className="space-y-6">
            <h3 className="text-base font-bold text-white tracking-wide uppercase text-sm">Poker Sites</h3>
            <ul className="space-y-3.5">
              {isLoadingPokerSites ? (
                // Loading skeleton
                <>
                  <li>
                    <div className="h-5 bg-gray-700/30 rounded animate-pulse w-32"></div>
                  </li>
                  <li>
                    <div className="h-5 bg-gray-700/30 rounded animate-pulse w-28"></div>
                  </li>
                  <li>
                    <div className="h-5 bg-gray-700/30 rounded animate-pulse w-36"></div>
                  </li>
                </> 
              ) : pokerSites.length > 0 ? (
                pokerSites.map((site) => (
                  <li key={site.id}>
                    <Link 
                      href={site.deal?.learn_more_url || '/deals'} 
                      className="group inline-flex items-center text-gray-400 hover:text-white transition-all duration-300 text-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-[#077124] transition-colors duration-300 mr-3"></span>
                      {site.deal?.name || 'Poker Site'}
                    </Link>
                  </li>
                ))
              ) : (
                // Fallback to default sites if none configured
                <>
                  <li>
                    <Link href="/deals" className="group inline-flex items-center text-gray-400 hover:text-white transition-all duration-300 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-[#077124] transition-colors duration-300 mr-3"></span>
                      View All Deals
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="space-y-6">
            <h3 className="text-base font-bold text-white tracking-wide uppercase text-sm">Quick Links</h3>
            <ul className="space-y-3.5">
              {isLoadingQuickLinks ? (
                // Loading skeleton
                <>
                  <li>
                    <div className="h-5 bg-gray-700/30 rounded animate-pulse w-24"></div>
                  </li>
                  <li>
                    <div className="h-5 bg-gray-700/30 rounded animate-pulse w-32"></div>
                  </li>
                  <li>
                    <div className="h-5 bg-gray-700/30 rounded animate-pulse w-28"></div>
                  </li>
                </>
              ) : quickLinks.length > 0 ? (
                quickLinks.map((link) => (
                  <li key={link.id}>
                    <Link 
                      href={link.link_url} 
                      className="group inline-flex items-center text-gray-400 hover:text-white transition-all duration-300 text-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-[#077124] transition-colors duration-300 mr-3"></span>
                      {link.link_text}
                    </Link>
                  </li>
                ))
              ) : (
                // Fallback to default links if none configured
                <>
                  <li>
                    <Link href="/deals" className="group inline-flex items-center text-gray-400 hover:text-white transition-all duration-300 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-[#077124] transition-colors duration-300 mr-3"></span>
                      Deals
                    </Link>
                  </li>
                  <li>
                    <Link href="/news" className="group inline-flex items-center text-gray-400 hover:text-white transition-all duration-300 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-[#077124] transition-colors duration-300 mr-3"></span>
                      News and Updates
                    </Link>
                  </li>
                  <li>
                    <Link href="/team" className="group inline-flex items-center text-gray-400 hover:text-white transition-all duration-300 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-[#077124] transition-colors duration-300 mr-3"></span>
                      Partners
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact-us" className="group inline-flex items-center text-gray-400 hover:text-white transition-all duration-300 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-[#077124] transition-colors duration-300 mr-3"></span>
                      Contact Us
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Column 3 - Legal */}
          <div className="space-y-6">
            <h3 className="text-base font-bold text-white tracking-wide uppercase text-sm">Legal</h3>
            <ul className="space-y-3.5">
              <li>
                <a href="/terms" className="group inline-flex items-center text-gray-400 hover:text-white transition-all duration-300 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-[#077124] transition-colors duration-300 mr-3"></span>
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="/privacy" className="group inline-flex items-center text-gray-400 hover:text-white transition-all duration-300 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-[#077124] transition-colors duration-300 mr-3"></span>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/team" className="group inline-flex items-center text-gray-400 hover:text-white transition-all duration-300 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-[#077124] transition-colors duration-300 mr-3"></span>
                  Meet The Team
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Company Info (No Links) */}
          <div className="space-y-6">
            <h3 className="text-base font-bold text-white tracking-wide uppercase text-sm">Contact Information</h3>
            <div className="space-y-2 text-sm text-gray-400 leading-relaxed">
              <p className="font-semibold text-white mb-3">Universal Affiliates Limited</p>
              <p>Sutherland House</p>
              <p>1759 London Road</p>
              <p>Leigh on Sea</p>
              <p>Essex, SS9 2RZ</p>
              <p className="pt-2">Company Number 11667550</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Copyright */}
        <div className="relative pt-8 border-t border-white/[0.05]">
          {/* Subtle gradient line on top of border */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-8">
            <p className="text-sm text-gray-400 font-medium">
              <span className="text-white font-bold">UNIVERSALPOKER.COM</span> © {new Date().getFullYear()} All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>Poker Deals</span>
              <span className="w-1 h-1 rounded-full bg-gray-600"></span>
              <span>18+</span>
              <span className="w-1 h-1 rounded-full bg-gray-600"></span>
              <span>T&Cs Apply</span>
            </div>
          </div>
        </div>

        {/* Gambling Commission Badges */}
        <div className="relative pb-8">
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 px-4">
            {isLoadingBadges ? (
              // Loading skeleton
              <>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-8 w-16 bg-gray-700/30 rounded-lg animate-pulse"></div>
                ))}
              </>
            ) : badges.length > 0 ? (
              // Dynamic badges from database
              badges.map((badge) => {
                const BadgeWrapper = badge.external_link ? 'a' : 'div';
                const wrapperProps = badge.external_link
                  ? {
                      href: badge.external_link,
                      target: '_blank',
                      rel: 'noopener noreferrer',
                      className: 'group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg px-2 py-1.5 transition-all duration-300 flex items-center justify-center cursor-pointer'
                    }
                  : {
                      className: 'group relative bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 flex items-center justify-center'
                    };

                return (
                  <BadgeWrapper key={badge.id} {...wrapperProps}>
                    <img
                      src={badge.badge_image_url}
                      alt={badge.badge_name}
                      className="h-7 w-auto max-w-[60px] object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                      loading="lazy"
                    />
                  </BadgeWrapper>
                );
              })
            ) : (
              // Fallback to placeholder badges if none configured
              <>
                {/* Badge 1 - EGBA */}
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg px-2 py-1.5 transition-all duration-300 flex items-center justify-center"
                >
                  <div className="w-14 h-6 bg-gray-700/30 rounded flex items-center justify-center">
                    <span className="text-[8px] text-gray-500 font-semibold">EGBA</span>
                  </div>
                </a>

                {/* Badge 2 - BeGambleAware */}
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg px-2 py-1.5 transition-all duration-300 flex items-center justify-center"
                >
                  <div className="w-14 h-6 bg-gray-700/30 rounded flex items-center justify-center">
                    <span className="text-[8px] text-gray-500 font-semibold">BeGamble</span>
                  </div>
                </a>

                {/* Badge 3 - MGA */}
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg px-2 py-1.5 transition-all duration-300 flex items-center justify-center"
                >
                  <div className="w-14 h-6 bg-gray-700/30 rounded flex items-center justify-center">
                    <span className="text-[8px] text-gray-500 font-semibold">MGA</span>
                  </div>
                </a>

                {/* Badge 4 - Know Your Limits */}
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg px-2 py-1.5 transition-all duration-300 flex items-center justify-center"
                >
                  <div className="w-14 h-6 bg-gray-700/30 rounded flex items-center justify-center">
                    <span className="text-[8px] text-gray-500 font-semibold">Know</span>
                  </div>
                </a>

                {/* Badge 5 - eCOGRA */}
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg px-2 py-1.5 transition-all duration-300 flex items-center justify-center"
                >
                  <div className="w-14 h-6 bg-gray-700/30 rounded flex items-center justify-center">
                    <span className="text-[8px] text-gray-500 font-semibold">eCOGRA</span>
                  </div>
                </a>

                {/* Badge 6 - Problem Gambling */}
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg px-2 py-1.5 transition-all duration-300 flex items-center justify-center"
                >
                  <div className="w-14 h-6 bg-gray-700/30 rounded flex items-center justify-center">
                    <span className="text-[8px] text-gray-500 font-semibold">Problem</span>
                  </div>
                </a>

                {/* Badge 7 - HM Government Gibraltar */}
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg px-2 py-1.5 transition-all duration-300 flex items-center justify-center"
                >
                  <div className="w-14 h-6 bg-gray-700/30 rounded flex items-center justify-center">
                    <span className="text-[8px] text-gray-500 font-semibold">Gibraltar</span>
                  </div>
                </a>

                {/* Badge 8 - Gambling Commission */}
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg px-2 py-1.5 transition-all duration-300 flex items-center justify-center"
                >
                  <div className="w-14 h-6 bg-gray-700/30 rounded flex items-center justify-center">
                    <span className="text-[8px] text-gray-500 font-semibold">UK GC</span>
                  </div>
                </a>

                {/* Badge 9 - 18+ */}
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg px-2 py-1.5 transition-all duration-300 flex items-center justify-center"
                >
                  <div className="w-14 h-6 bg-gray-700/30 rounded flex items-center justify-center">
                    <span className="text-[8px] text-gray-500 font-semibold">18+</span>
                  </div>
                </a>
              </>
            )}
          </div>
        </div>
        </div>
      </div>
    </footer>
  );
}
