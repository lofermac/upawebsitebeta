'use client'

import Header from "./components/Header";
import Footer from "./components/Footer";
import Link from "next/link";
import { ArrowRight, Users, Headset, Shield, Clock, HelpCircle } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

// Blog Posts Data
const blogPosts = [
  {
    id: 9257,
    date: '06/10/25',
    title: 'PartyPoker Tour Returns to Birmingham this October',
    image: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/10/06190843/PartyPoker-Tour-Birmingham.png',
    alt: 'PartyPoker Tour Birmingham promotional banner',
    url: '/2025/10/partypoker-tour-returns-to-birmingham-this-october/',
    category: 'News',
    isHighlighted: true,
  },
  {
    id: 9224,
    date: '02/10/25',
    title: 'Gilles "TaxationIsTheft" Simon Wins $10K WCOOP Main Event for $736,237',
    image: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/10/02144825/Featured-Image-Gilles.png',
    alt: 'Gilles Simon wearing a Universal Poker patch while playing at the WCOOP Main Event',
    url: '/2025/10/gilles-simon-wins-wcoop-main-event-2025/',
    category: 'News',
    isHighlighted: true,
  },
  {
    id: 9190,
    date: '25/09/25',
    title: 'UP Private Tournament â€“ Unibet Poker â‚¬500 Freeroll',
    image: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/09/02162300/Unibet-Small-Banner.png',
    alt: 'Unibet UP Private Tournament banner for â‚¬500 freeroll poker event',
    url: '/2025/09/unibet-up-private-tournament-freeroll/',
    category: 'News',
    isHighlighted: false,
  },
  {
    id: 9169,
    date: '20/09/25',
    title: '888Poker Autumn Series XL: $2,000,000 GTD',
    image: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/09/20190538/Autumn-Series-Small.png',
    alt: 'XL Autumn Series logo with a colourful autumn-themed background',
    url: '/2025/09/xl-autumn-series-2025/',
    category: 'News',
    isHighlighted: false,
  },
  {
    id: 8996,
    date: '27/06/25',
    title: 'Join the PartyPoker Tour Challenge â€“ Win Free Live Event Packages!',
    image: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/06/12201637/PartyPoker-Tour-Small-New-1.png',
    alt: 'PartyPoker Tour Challenge promotional banner',
    url: '/2025/06/partypoker-tour-challenge/',
    category: 'News',
    isHighlighted: false,
  },
];

// Animated Counter Component with easing
function AnimatedCounter({ end, duration = 2000, prefix = '', suffix = '', decimals = 0 }: { 
  end: number; 
  duration?: number; 
  prefix?: string; 
  suffix?: string; 
  decimals?: number;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true);
          const startTime = Date.now();
          const startValue = 0;

          const animate = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function - ease out cubic for smooth deceleration
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const currentCount = startValue + (end - startValue) * easeOutCubic;

            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById(`counter-${end}-${suffix}`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated, suffix]);

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  return (
    <span id={`counter-${end}-${suffix}`}>
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
}

// Testimonials data with manual clones for seamless infinite loop
const testimonials = [
  // CLONES at beginning (for left peek)
  {
    id: 'clone-8',
    name: 'PÃ©ter Traply',
    meta: 'Belabasci',
    image: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/01/17174831/p2j-test.webp',
    quote: 'I really like working with Universal. They are always helpful, fast with their responses and even helped me with some unique requests. They have very good connections in the poker business which can be really helpful. Would recommend them for any serious player/stable.',
    isClone: true,
    realIndex: 8
  },
  {
    id: 'clone-9',
    name: 'Raise Your Edge',
    meta: null,
    image: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/01/17174840/rye-test.webp',
    quote: 'Universal includes one of the most knowledgeable guys around when it comes to affiliation AND poker in general. Their advice and knowledge are a constant source of inspiration for Raise Your Edge members and the poker community as a whole.',
    isClone: true,
    realIndex: 9
  },
  // ORIGINAL 9 SLIDES
  {
    id: '1',
    name: "Ryan O'Donnell",
    meta: 'Moca choca89',
    image: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/05/22160615/53224561601_8aa1359351_o-scaled-e1747930080750-1024x1020.jpg',
    quote: 'Universal Poker, an affiliate that\'s truly exceptional, a must-have for every poker player seeking exceptional rewards, benefits, and support.',
    isClone: false
  },
  {
    id: '2',
    name: 'Smart Spin',
    meta: null,
    image: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/10/07144142/ss-2.png',
    quote: 'Seeing how Universal Poker use their experience to offer excellent opportunities to poker communities such as Smart Spin is inspiring. What makes them stand out is that they perfectly understand players\' needs and their expectations.',
    isClone: false
  },
  {
    id: '3',
    name: 'David "Monkeybausss" Laka',
    meta: 'Owner of Nemesis Backing',
    image: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/01/17174836/9hg8_hKo_400x400-test.webp',
    quote: 'Universal is a long term focused affiliate who values their players and understands the industry from their perspective. As a player and as a staking group owner I haven\'t gotten a better experience elsewhere in the affiliate industry.',
    isClone: false
  },
  {
    id: '4',
    name: 'Douglas Ferreira',
    meta: 'Dowgh-Santos',
    image: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/01/17174834/dowgh-santos-test.webp',
    quote: 'Universal Ã© a melhor empresa de afiliados pois tem uma politica de transparencia muito grande, sempre cumprindo os prazos e dando um suporte VP aos afiliados atravÃ©s do grupo do Discord.',
    isClone: false
  },
  {
    id: '5',
    name: 'David Yan',
    meta: 'MissOracle',
    image: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/01/17174833/david-yan-win-test.webp',
    quote: 'Finding poker deals can be annoying because the affiliate industry aren\'t always the best to deal with. In my experience, Universal offer the best deals. I like that they act honestly and reliably. They understand the value of their players and treat them accordingly.',
    isClone: false
  },
  {
    id: '6',
    name: 'Jama-Dharma',
    meta: 'HS LHE Crusher',
    image: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/01/17174624/picturemessage_xfrlthne.dfz_webp.webp',
    quote: 'Universal Poker Affiliates are the nicest people in the affiliate business!',
    isClone: false
  },
  {
    id: '7',
    name: 'Joshua Hoesel',
    meta: 'Slayerv1fanpoker',
    image: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/01/17174838/unnamed-e1697105067784-test-1024x1019.webp',
    quote: 'Universal Affiliates is the best affiliate company I\'ve ever had a deal through. They\'re super timely with payments and quick to respond to any question or issue, quickly getting me a solution within their own house or through their top tier connections with the poker site itself. I\'m grateful to work with Universal!',
    isClone: false
  },
  {
    id: '8',
    name: 'PÃ©ter Traply',
    meta: 'Belabasci',
    image: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/01/17174831/p2j-test.webp',
    quote: 'I really like working with Universal. They are always helpful, fast with their responses and even helped me with some unique requests. They have very good connections in the poker business which can be really helpful. Would recommend them for any serious player/stable.',
    isClone: false
  },
  {
    id: '9',
    name: 'Raise Your Edge',
    meta: null,
    image: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/01/17174840/rye-test.webp',
    quote: 'Universal includes one of the most knowledgeable guys around when it comes to affiliation AND poker in general. Their advice and knowledge are a constant source of inspiration for Raise Your Edge members and the poker community as a whole.',
    isClone: false
  },
  // CLONES at end (for right peek)
  {
    id: 'clone-1',
    name: "Ryan O'Donnell",
    meta: 'Moca choca89',
    image: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/05/22160615/53224561601_8aa1359351_o-scaled-e1747930080750-1024x1020.jpg',
    quote: 'Universal Poker, an affiliate that\'s truly exceptional, a must-have for every poker player seeking exceptional rewards, benefits, and support.',
    isClone: true,
    realIndex: 1
  },
  {
    id: 'clone-2',
    name: 'Smart Spin',
    meta: null,
    image: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/10/07144142/ss-2.png',
    quote: 'Seeing how Universal Poker use their experience to offer excellent opportunities to poker communities such as Smart Spin is inspiring. What makes them stand out is that they perfectly understand players\' needs and their expectations.',
    isClone: true,
    realIndex: 2
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(2); // Start at first real slide (Ryan)
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: 'center',
      loop: false, // Disable auto-loop, we handle it manually
      skipSnaps: false,
      dragFree: false,
      duration: 30, // Smooth transition speed
      containScroll: false,
      slidesToScroll: 1,
      startIndex: 2, // Start at index 2 (first real Ryan, after clones)
      watchDrag: true,
      dragThreshold: 10,
      watchResize: true,
    },
    [
      Autoplay({ 
        delay: 7000,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
        playOnInit: true,
      })
    ]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const selectedIndex = emblaApi.selectedScrollSnap();
    
    // Map clone indices to real indices for dot navigation display
    let displayIndex = selectedIndex;
    if (selectedIndex === 0) displayIndex = 8; // Clone PÃ©ter â†’ real PÃ©ter
    else if (selectedIndex === 1) displayIndex = 9; // Clone RYE â†’ real RYE
    else if (selectedIndex === 11) displayIndex = 2; // Clone Ryan â†’ real Ryan
    else if (selectedIndex === 12) displayIndex = 3; // Clone Smart Spin â†’ real Smart Spin
    
    setCurrentSlide(displayIndex);
    
    // Add 'is-active' class to center slide for peek effect
    const slides = emblaApi.slideNodes();
    slides.forEach((slide, index) => {
      if (index === selectedIndex) {
        slide.classList.add('is-active');
        slide.classList.remove('is-inactive');
      } else {
        slide.classList.remove('is-active');
        slide.classList.add('is-inactive');
      }
    });
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="bg-[#1E1E1E] min-h-screen flex flex-col">
      {/* HERO SECTION */}
      <section className="relative bg-[#1E1E1E] w-full h-screen flex flex-col items-center justify-start px-3 md:px-4 pt-6">
        {/* Premium Container Card - engloba o header e todo conteÃºdo */}
        <div className="relative w-full h-[calc(100vh-3rem)] rounded-[2.5rem] overflow-hidden group/hero transition-all duration-700">
          {/* Header dentro do card */}
          <div className="absolute top-0 left-0 right-0 z-50 pt-6 px-4">
      <Header />
          </div>
          {/* Background with gradient - tom intermediÃ¡rio entre preto e cinza */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#121212] to-[#0d0d0d] transition-all duration-700 group-hover/hero:from-[#0e0e0e] group-hover/hero:via-[#131313] group-hover/hero:to-[#0e0e0e]"></div>
          
          {/* Subtle border effect - borda completa ao redor */}
          <div className="absolute inset-0 rounded-[2.5rem] border border-white/[0.06] shadow-2xl shadow-black/50 transition-all duration-700 group-hover/hero:border-white/[0.09] group-hover/hero:shadow-black/60"></div>
          
          {/* Inner glow effect - brilho interno sutil */}
          <div className="absolute inset-0 rounded-[2.5rem] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.025)] transition-all duration-700 group-hover/hero:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"></div>
          
          {/* Top light rim - brilho no topo */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent rounded-t-[2.5rem]"></div>
          
          {/* Ambient background effects - glows verdes sutis */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#077124]/[0.04] rounded-full blur-[120px] animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/[0.025] rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
          
          {/* Subtle noise texture overlay for premium feel */}
          <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
          
          {/* Content wrapper */}
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-8 md:px-16 lg:px-20 pt-24">
            {/* Hero Text Content */}
            <div className="max-w-6xl mx-auto text-center space-y-10">
              {/* Main Heading - Apple-like Typography */}
              <h1 className="animate-fade-up-delay-800">
                <div className="text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] font-semibold leading-[1.08] tracking-[-0.02em]">
                  {/* Primeira linha - Peso menor, mais sutil */}
                  <span className="block text-white/95 font-medium" 
                        style={{ 
                          textShadow: '0 2px 16px rgba(0,0,0,0.4)',
                          letterSpacing: '-0.02em'
                        }}>
                    Exclusive Deals On The
                  </span>
                  {/* Segunda linha - Destaque premium com gradiente sutil */}
                  <span className="block mt-1 bg-gradient-to-br from-white via-white to-gray-200 bg-clip-text text-transparent font-semibold" 
                        style={{ 
                          textShadow: '0 4px 24px rgba(255,255,255,0.08)',
                          letterSpacing: '-0.03em'
                        }}>
                    World&apos;s Best Poker Sites
                  </span>
                </div>
              </h1>
              
              {/* Subtitle - Apple-style minimalista */}
              <p className="text-[1.35rem] sm:text-2xl md:text-[1.75rem] lg:text-[2rem] text-gray-400 font-normal max-w-4xl mx-auto leading-[1.4] animate-fade-up-delay-1200"
                 style={{ 
                   textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                   letterSpacing: '-0.01em',
                   fontWeight: '400'
                 }}>
            More Rakeback. More Support. Maximum Value.
          </p>
          
              {/* CTA Button - Premium Apple-like Style */}
              <div className="flex justify-center pt-6 animate-fade-up-delay-1400">
          <a 
            href="#deals"
                  className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 text-lg md:text-xl font-bold text-white bg-gradient-to-b from-[#088929] to-[#055a1c] rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.03] active:scale-[0.98]"
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
                  }}
                >
                  {/* Outer glow - Layer 1 (most intense) */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#077124] via-[#0a9b30] to-[#077124] rounded-full blur-xl opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>
                  
                  {/* Outer glow - Layer 2 (medium spread) */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 via-[#077124] to-emerald-400 rounded-full blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-500 animate-pulse-slow"></div>
                  
                  {/* Outer glow - Layer 3 (soft wide spread) */}
                  <div className="absolute -inset-4 bg-[#077124] rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
                  
                  {/* Glass reflection effect on top */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 via-white/5 to-transparent" style={{ height: '50%' }}></div>
                  
                  {/* Animated shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 skew-x-12"></div>
                  
                  {/* Inner shadow for depth */}
                  <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]"></div>
                  
                  {/* Pulsing ambient glow on hover */}
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-[#0a9b30]/40 to-[#077124]/40 blur-2xl scale-110"></div>
                  
                  {/* Button content */}
                  <span className="relative z-10 tracking-wide drop-shadow-lg">Explore Our Deals</span>
                  
                  {/* Animated arrow */}
                  <svg 
                    className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 drop-shadow-lg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  
                  {/* Top edge highlight */}
                  <div className="absolute inset-x-0 top-[1px] h-px bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"></div>
                  
                  {/* Bottom edge shadow */}
                  <div className="absolute inset-x-0 bottom-[1px] h-px bg-gradient-to-r from-transparent via-black/50 to-transparent rounded-full"></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FEATURED DEALS SECTION - 9 Real Poker Room Deals */}
      <section id="deals" className="w-full py-24 px-4 bg-[#1E1E1E]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-white text-center text-4xl md:text-5xl font-bold mb-4">Most Popular Deals</h2>
          <p className="text-gray-400 text-center text-lg mb-16">Here are our most popular offers within our community</p>
          
          {/* Deals Grid - 3 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-auto">

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

          {/* View All Deals Button */}
          <div className="text-center mt-12">
            <Link 
              href="/deals"
              className="group relative inline-flex items-center justify-center gap-2.5 px-10 py-4.5 text-lg font-bold text-white bg-gradient-to-b from-[#088929] to-[#055a1c] rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.03] active:scale-[0.98]"
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
              }}
            >
              {/* Outer glow - Layer 1 (most intense) */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#077124] via-[#0a9b30] to-[#077124] rounded-full blur-xl opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>
              
              {/* Outer glow - Layer 2 (medium spread) */}
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 via-[#077124] to-emerald-400 rounded-full blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-500 animate-pulse-slow"></div>
              
              {/* Outer glow - Layer 3 (soft wide spread) */}
              <div className="absolute -inset-4 bg-[#077124] rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
              
              {/* Glass reflection effect on top */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 via-white/5 to-transparent" style={{ height: '50%' }}></div>
              
              {/* Animated shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 skew-x-12"></div>
              
              {/* Inner shadow for depth */}
                      <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]"></div>
              
              {/* Pulsing ambient glow on hover */}
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-[#0a9b30]/40 to-[#077124]/40 blur-2xl scale-110"></div>
              
              {/* Button content */}
              <span className="relative z-10 tracking-wide drop-shadow-lg">View All Deals</span>
              
              {/* Animated arrow */}
              <ArrowRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 drop-shadow-lg" strokeWidth={3} />
              
              {/* Top edge highlight */}
                      <div className="absolute inset-x-0 top-[1px] h-px bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"></div>
              
              {/* Bottom edge shadow */}
                      <div className="absolute inset-x-0 bottom-[1px] h-px bg-gradient-to-r from-transparent via-black/50 to-transparent rounded-full"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* WHO ARE UNIVERSAL POKER SECTION */}
      <section id="mission" className="relative bg-[#1E1E1E] w-full py-12 md:py-16 px-3 md:px-4">
        {/* Premium Container Card - engloba toda a seÃ§Ã£o */}
        <div className="relative w-full rounded-[2.5rem] overflow-hidden group/who transition-all duration-700">
          {/* Background with gradient - tom intermediÃ¡rio entre preto e cinza */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#121212] to-[#0d0d0d] transition-all duration-700 group-hover/who:from-[#0e0e0e] group-hover/who:via-[#131313] group-hover/who:to-[#0e0e0e]"></div>
          
          {/* Subtle border effect - borda completa ao redor */}
          <div className="absolute inset-0 rounded-[2.5rem] border border-white/[0.06] shadow-2xl shadow-black/50 transition-all duration-700 group-hover/who:border-white/[0.09] group-hover/who:shadow-black/60"></div>
          
          {/* Inner glow effect - brilho interno sutil */}
          <div className="absolute inset-0 rounded-[2.5rem] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.025)] transition-all duration-700 group-hover/who:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"></div>
          
          {/* Top light rim - brilho no topo */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent rounded-t-[2.5rem]"></div>
          
          {/* Ambient background effects - glows verdes sutis */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#077124]/[0.04] rounded-full blur-[120px] animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/[0.025] rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
          
          {/* Subtle noise texture overlay for premium feel */}
          <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
          
          {/* Content wrapper */}
          <div className="relative z-10 w-full py-20 md:py-24 px-4">
        <h2 className="text-white text-center text-4xl md:text-5xl font-bold mb-4">Why Universal Poker</h2>
        <p className="text-gray-400 text-center text-lg mb-16">Many Reasons...</p>
        
        {/* Grid: 2 linhas x 3 colunas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-8">
          {/* Primeira Linha */}
          {/* Card 1: Power In Numbers */}
          <div className="bg-zinc-900/80 backdrop-blur-sm rounded-3xl p-8 border border-zinc-800/50 hover:border-zinc-700/50 transition-all duration-300 hover:-translate-y-1 group">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#077124] to-emerald-400 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-br from-[#077124] to-emerald-500 p-4 rounded-2xl">
                  <Users className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
              </div>
            </div>
            <h3 className="text-white text-2xl font-bold mb-4 text-center">Power In Numbers</h3>
            <p className="text-gray-300 text-center leading-relaxed">
              Why do we have the best deals? There&apos;s power in numbers, the more players with us, the better benefits we can negotiate for you!
            </p>
          </div>

          {/* Card 2: Not A Regular Affiliate */}
          <div className="bg-zinc-900/80 backdrop-blur-sm rounded-3xl p-8 border border-zinc-800/50 hover:border-zinc-700/50 transition-all duration-300 hover:-translate-y-1 group">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#077124] to-emerald-400 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-br from-[#077124] to-emerald-500 p-4 rounded-2xl">
                  <Headset className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
              </div>
            </div>
            <h3 className="text-white text-2xl font-bold mb-4 text-center">Not A Regular Affiliate</h3>
            <p className="text-gray-300 text-center leading-relaxed">
              Normal Affiliates give you a sign-up link. We give you <span className="font-bold">lifetime support</span> the moment you sign-up.
            </p>
          </div>

          {/* Card 3: Trusted Community */}
          <div className="bg-zinc-900/80 backdrop-blur-sm rounded-3xl p-8 border border-zinc-800/50 hover:border-zinc-700/50 transition-all duration-300 hover:-translate-y-1 group">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#077124] to-emerald-400 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-br from-[#077124] to-emerald-500 p-4 rounded-2xl">
                  <Shield className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
              </div>
            </div>
            <h3 className="text-white text-2xl font-bold mb-4 text-center">Trusted Community</h3>
            <p className="text-gray-300 text-center leading-relaxed">
              We have a community of <span className="font-bold">thousands of players</span>. We&apos;ve been tried and stood the test of time.
            </p>
          </div>

          {/* Segunda Linha */}
          {/* Card 4: Number Of Players With Us */}
          <div className="bg-zinc-900/80 backdrop-blur-sm rounded-3xl p-8 border border-zinc-800/50 hover:border-zinc-700/50 transition-all duration-300 hover:-translate-y-1 flex flex-col items-center justify-center group">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#055a1c] to-emerald-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-br from-[#055a1c] to-emerald-600 p-4 rounded-2xl">
                  <Users className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
              </div>
            </div>
            <h3 className="text-white text-xl font-bold mb-4 text-center">Number Of Players With Us</h3>
            <div className="text-4xl font-black text-gray-400">
              <AnimatedCounter end={10000} duration={2500} suffix="+" decimals={0} />
            </div>
          </div>

          {/* Card 5: How Long We've Been Here */}
          <div className="bg-zinc-900/80 backdrop-blur-sm rounded-3xl p-8 border border-zinc-800/50 hover:border-zinc-700/50 transition-all duration-300 hover:-translate-y-1 flex flex-col items-center justify-center group">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#055a1c] to-emerald-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-br from-[#055a1c] to-emerald-600 p-4 rounded-2xl">
                  <Clock className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
              </div>
            </div>
            <h3 className="text-white text-xl font-bold mb-4 text-center">How Long We&apos;ve Been Here</h3>
            <div className="text-4xl font-black text-gray-400">
              <AnimatedCounter end={13} duration={2000} suffix=" Years" decimals={0} />
            </div>
          </div>

          {/* Card 6: Test */}
          <div className="bg-zinc-900/80 backdrop-blur-sm rounded-3xl p-8 border border-zinc-800/50 hover:border-zinc-700/50 transition-all duration-300 hover:-translate-y-1 flex flex-col items-center justify-center group">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#055a1c] to-emerald-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-br from-[#055a1c] to-emerald-600 p-4 rounded-2xl">
                  <HelpCircle className="w-8 h-8 text-white" strokeWidth={2.5} />
                </div>
              </div>
            </div>
            <h3 className="text-white text-xl font-bold mb-4 text-center">Test</h3>
            <div className="text-4xl font-black text-gray-400">
              <AnimatedCounter end={10} duration={2000} suffix="" decimals={0} />
            </div>
          </div>
        </div>
          </div>
        </div>
      </section>

      {/* RAKEBACK PAID IN 2025 SECTION */}
      <section className="bg-[#1E1E1E] w-full py-24 px-4">
        <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-white text-4xl md:text-5xl font-bold mb-6">Rakeback Paid in 2025</h2>
              <div className="inline-block">
                <div className="text-6xl md:text-8xl font-black bg-gradient-to-r from-[#077124] via-emerald-400 to-[#077124] bg-clip-text text-transparent mb-4"
                     style={{ 
                       WebkitTextStroke: '1px rgba(7, 113, 36, 0.3)',
                       textShadow: '0 0 60px rgba(7, 113, 36, 0.4)'
                     }}>
                  <AnimatedCounter end={2450000} duration={2500} prefix="$" suffix="+" decimals={0} />
                </div>
              </div>
              <div className="max-w-2xl mx-auto">
                <p className="text-xl md:text-2xl text-gray-300 font-light mb-6">
                  And counting...
                </p>
            <p className="text-xl md:text-2xl text-gray-300 font-light mb-8">
                  Join thousands of players maximizing their poker profits with exclusive rakeback deals.
                </p>
              </div>

          {/* Claim Your Share Button */}
          <div className="text-center mt-8">
            <Link 
              href="/deals"
              className="group relative inline-flex items-center justify-center gap-2.5 px-10 py-4.5 text-lg font-bold text-white bg-gradient-to-b from-[#088929] to-[#055a1c] rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.03] active:scale-[0.98]"
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
              }}
            >
              {/* Outer glow - Layer 1 (most intense) */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#077124] via-[#0a9b30] to-[#077124] rounded-full blur-xl opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>
              
              {/* Outer glow - Layer 2 (medium spread) */}
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 via-[#077124] to-emerald-400 rounded-full blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-500 animate-pulse-slow"></div>
              
              {/* Outer glow - Layer 3 (soft wide spread) */}
              <div className="absolute -inset-4 bg-[#077124] rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
              
              {/* Glass reflection effect on top */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 via-white/5 to-transparent" style={{ height: '50%' }}></div>
              
              {/* Animated shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 skew-x-12"></div>
              
              {/* Inner shadow for depth */}
              <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]"></div>
              
              {/* Pulsing ambient glow on hover */}
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-[#0a9b30]/40 to-[#077124]/40 blur-2xl scale-110"></div>
              
              {/* Button content */}
              <span className="relative z-10 tracking-wide drop-shadow-lg">Claim Your Share</span>
              
              {/* Animated arrow */}
              <ArrowRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 drop-shadow-lg" strokeWidth={3} />
              
              {/* Top edge highlight */}
              <div className="absolute inset-x-0 top-[1px] h-px bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"></div>
              
              {/* Bottom edge shadow */}
              <div className="absolute inset-x-0 bottom-[1px] h-px bg-gradient-to-r from-transparent via-black/50 to-transparent rounded-full"></div>
            </Link>
          </div>
        </div>
      </section>

      {/* OUR PARTNERS SECTION - Carousel de testimonials */}
      <section id="partners" className="relative bg-[#1E1E1E] w-full py-6 md:py-8 px-3 md:px-4 overflow-hidden select-none">
        {/* Premium Container Card */}
        <div className="relative w-full rounded-[2.5rem] overflow-hidden group/partners transition-all duration-700">
          {/* Background with gradient - tom intermediário entre preto e cinza */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#121212] to-[#0d0d0d] transition-all duration-700 group-hover/partners:from-[#0e0e0e] group-hover/partners:via-[#131313] group-hover/partners:to-[#0e0e0e]"></div>
          
          {/* Subtle border effect - borda completa ao redor */}
          <div className="absolute inset-0 rounded-[2.5rem] border border-white/[0.06] shadow-2xl shadow-black/50 transition-all duration-700 group-hover/partners:border-white/[0.09] group-hover/partners:shadow-black/60"></div>
          
          {/* Inner glow effect - brilho interno sutil */}
          <div className="absolute inset-0 rounded-[2.5rem] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.025)] transition-all duration-700 group-hover/partners:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"></div>
          
          {/* Top light rim - brilho no topo */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent rounded-t-[2.5rem]"></div>
          
          {/* Ambient background effects - glows verdes sutis */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#077124]/[0.04] rounded-full blur-[120px] animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/[0.025] rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
          
          {/* Subtle noise texture overlay for premium feel */}
          <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
          
          {/* Content wrapper */}
          <div className="relative z-10 w-full py-20 md:py-24 px-4 flex flex-col items-center">
            <h2 className="text-white text-center text-4xl font-bold mb-2 px-4">Our Partners</h2>
            <p className="text-gray-400 text-center mb-16 px-4">Don&apos;t just take our word for it, take theirs.</p>
            
            {/* Embla Carousel Container */}
            <div className="embla w-full max-w-[1800px] select-none" ref={emblaRef}>
          <div className="embla__container">
            {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="embla__slide flex items-center justify-center py-8 px-4">
              <div className="flex flex-col items-center text-center max-w-[500px]">
                <div className="w-[300px] h-[300px] md:w-[350px] md:h-[350px] rounded-full overflow-hidden border-4 border-white/20 shadow-2xl mb-6">
                  <Image 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                    width={350}
                    height={350}
                  />
                </div>
                <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">{testimonial.name}</h3>
                {testimonial.meta && (
                  <p className="text-gray-400 text-base md:text-lg mb-4">{testimonial.meta}</p>
                )}
                {!testimonial.meta && <div className="mb-4"></div>}
                <p className="text-white text-sm md:text-base leading-relaxed px-4">
                  &quot;{testimonial.quote}&quot;
                </p>
              </div>
            </div>
            ))}
          </div>
        </div>

            {/* Scroll Indicator Dots - Only for real slides (not clones) */}
            <div className="flex gap-2 mt-8">
              {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((index, displayIndex) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    currentSlide === index ? 'bg-white' : 'bg-gray-600'
                  }`}
                  onClick={() => emblaApi?.scrollTo(index)}
                  aria-label={`Go to slide ${displayIndex + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LATEST NEWS SECTION */}
      <section id="news" className="relative bg-[#1E1E1E] w-full py-12 md:py-16 px-3 md:px-4">
        <div className="w-full py-8 md:py-12 px-4">
            <h2 className="text-white text-center text-4xl md:text-5xl font-bold mb-4">Latest News & Updates</h2>
            <p className="text-gray-400 text-center mb-12 px-4">Stay updated with the latest poker news, site promotions and Universal Poker updates</p>
            
            {/* Blog Posts Grid - 1x3 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {blogPosts.slice(0, 3).map((post) => (
                <article 
                  key={post.id}
                  className={`group relative bg-zinc-900 rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                    post.isHighlighted 
                      ? 'border-2 border-[#077124]/50 hover:border-[#077124] hover:shadow-[#077124]/20' 
                      : 'border-zinc-800 hover:border-zinc-700 hover:shadow-green-600/10'
                  }`}
                >
                  {/* Featured Badge for Highlighted Posts */}
                  {post.isHighlighted && (
                    <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-[#077124] to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      FEATURED
                    </div>
                  )}

                  {/* Image */}
                  <Link href={post.url} className="block overflow-hidden">
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.alt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </Link>

                  {/* Content */}
            <div className="p-6">
                    {/* Date & Category */}
                    <div className="flex items-center gap-3 mb-3">
                      <time className="text-xs text-zinc-400 font-medium">{post.date}</time>
                      <span className="text-xs text-zinc-600">â€¢</span>
                      <span className="text-xs text-[#077124] font-semibold uppercase tracking-wide">{post.category}</span>
            </div>

                    {/* Title */}
                    <Link href={post.url}>
                      <h3 className="text-white text-lg font-bold mb-4 line-clamp-2 group-hover:text-[#077124] transition-colors duration-300 leading-snug">
                        {post.title}
                      </h3>
                    </Link>

                    {/* Read More Button */}
                    <Link 
                      href={post.url}
                      className="inline-flex items-center gap-2 text-[#077124] hover:text-emerald-400 font-semibold text-sm transition-all duration-300 group/btn"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Link>
          </div>
                </article>
              ))}
            </div>

            {/* View All News Button */}
            <div className="text-center mt-12">
              <Link 
                href="/blog"
                className="group relative inline-flex items-center justify-center gap-2.5 px-10 py-4.5 text-lg font-bold text-white bg-gradient-to-b from-[#088929] to-[#055a1c] rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.03] active:scale-[0.98]"
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
                }}
              >
                {/* Outer glow - Layer 1 (most intense) */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#077124] via-[#0a9b30] to-[#077124] rounded-full blur-xl opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>
                
                {/* Outer glow - Layer 2 (medium spread) */}
                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 via-[#077124] to-emerald-400 rounded-full blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-500 animate-pulse-slow"></div>
                
                {/* Outer glow - Layer 3 (soft wide spread) */}
                <div className="absolute -inset-4 bg-[#077124] rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
                
                {/* Glass reflection effect on top */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 via-white/5 to-transparent" style={{ height: '50%' }}></div>
                
                {/* Animated shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 skew-x-12"></div>
                
                {/* Inner shadow for depth */}
                <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]"></div>
                
                {/* Pulsing ambient glow on hover */}
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-[#0a9b30]/40 to-[#077124]/40 blur-2xl scale-110"></div>
                
                {/* Button content */}
                <span className="relative z-10 tracking-wide drop-shadow-lg">View All News</span>
                
                {/* Animated arrow */}
                <ArrowRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 drop-shadow-lg" strokeWidth={3} />
                
                {/* Top edge highlight */}
                <div className="absolute inset-x-0 top-[1px] h-px bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"></div>
                
                {/* Bottom edge shadow */}
                <div className="absolute inset-x-0 bottom-[1px] h-px bg-gradient-to-r from-transparent via-black/50 to-transparent rounded-full"></div>
              </Link>
            </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
