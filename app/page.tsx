 'use client'

import Header from "./components/Header";
import Footer from "./components/Footer";
import Link from "next/link";
import { ArrowRight, Users, Calendar, Award } from "lucide-react";
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
    url: '/news/partypoker-tour-returns-to-birmingham-this-october',
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
    title: 'UP Private Tournament â€" Unibet Poker â‚¬500 Freeroll',
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
    title: 'Join the PartyPoker Tour Challenge â€" Win Free Live Event Packages!',
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

// FAQ Data
const faqData = [
  {
    question: "Do I Have To Pay For This Service?",
    answer: "No, our service is completely free for players. We earn a commission from the poker sites when you play, which allows us to offer you additional rakeback and benefits at no cost to you."
  },
  {
    question: "Can Any Country Join?",
    answer: "Most countries can join our deals, but it depends on the specific poker site's restrictions. Some sites have regional limitations. Contact us with your location, and we'll let you know which deals are available for you."
  },
  {
    question: "How Do Payments Work?",
    answer: "Rakeback payments are typically processed monthly. Once you accumulate rakeback, we'll transfer it directly to your poker account or via your preferred payment method (Skrill, Neteller, bank transfer, etc.). Payment schedules vary by site."
  },
  {
    question: "Can I Join If I Already Have An Account?",
    answer: "Yes! If you already have an account with a poker site, you can apply to switch to our deal. We'll review your application on a case-by-case basis and work with the poker room to transfer you to our rakeback program."
  },
  {
    question: "What Makes Universal Poker Different?",
    answer: "We offer higher rakeback percentages, personalized support, exclusive promotions, and work directly with poker rooms to ensure you get the best possible deal. We've been in business for 13+ years and have paid out millions in rakeback."
  }
];

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
  const [cardsVisible, setCardsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(2); // Start at first real slide (Ryan)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
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
    if (selectedIndex === 0) displayIndex = 8; // Clone PÃ©ter â†' real PÃ©ter
    else if (selectedIndex === 1) displayIndex = 9; // Clone RYE â†' real RYE
    else if (selectedIndex === 11) displayIndex = 2; // Clone Ryan â†' real Ryan
    else if (selectedIndex === 12) displayIndex = 3; // Clone Smart Spin â†' real Smart Spin
    
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

  // Intersection Observer for How It Works cards animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !cardsVisible) {
          setCardsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('how-it-works');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, [cardsVisible]);

  return (
    <div className="bg-black min-h-screen flex flex-col">
      {/* HERO SECTION */}
      <section className="relative bg-black w-full h-screen flex flex-col items-center justify-start px-3 md:px-4 pt-6">
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
                  className="group relative inline-flex items-center justify-center gap-3 px-14 py-5 text-lg md:text-xl font-bold text-white bg-gradient-to-b from-[#088929] to-[#055a1c] rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.03] active:scale-[0.98]"
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
                  <span className="relative z-10 tracking-wide drop-shadow-lg">Explore Deals</span>
                  
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
      
      {/* STATS & RAKEBACK SECTION - Premium */}
      <section id="mission" className="relative bg-black w-full py-16 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Stats Grid - No Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-20">
            {/* Stat 1: Number Of Players With Us */}
            <div className="flex flex-col items-center justify-center p-10">
              {/* Icon */}
              <div className="relative flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#077124] to-emerald-400 rounded-2xl blur-lg opacity-30"></div>
                  <div className="relative bg-gradient-to-br from-[#077124] to-emerald-500 p-4 rounded-2xl shadow-lg">
                    <Users className="w-8 h-8 text-white" strokeWidth={2.5} />
                  </div>
                </div>
              </div>
              
              {/* Title */}
              <h3 className="text-gray-400 text-lg sm:text-xl md:text-[1.225rem] lg:text-[1.4rem] font-semibold mb-4 text-center tracking-tight"
                  style={{ 
                    textShadow: '0 2px 12px rgba(0,0,0,0.4)',
                    letterSpacing: '-0.01em',
                    fontWeight: '600'
                  }}>
                Number Of Players With Us
              </h3>
              
              {/* Counter */}
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.8rem] font-bold text-white drop-shadow-lg tracking-tight"
                   style={{ 
                     textShadow: '0 2px 16px rgba(0,0,0,0.5)',
                     letterSpacing: '-0.02em',
                     fontWeight: '700'
                   }}>
                <AnimatedCounter end={10000} duration={5000} suffix="+" decimals={0} />
              </div>
            </div>

            {/* Stat 2: How Long We've Been Here */}
            <div className="flex flex-col items-center justify-center p-10">
              {/* Icon */}
              <div className="relative flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#077124] to-emerald-400 rounded-2xl blur-lg opacity-30"></div>
                  <div className="relative bg-gradient-to-br from-[#077124] to-emerald-500 p-4 rounded-2xl shadow-lg">
                    <Calendar className="w-8 h-8 text-white" strokeWidth={2.5} />
                  </div>
                </div>
              </div>
              
              {/* Title */}
              <h3 className="text-gray-400 text-lg sm:text-xl md:text-[1.225rem] lg:text-[1.4rem] font-semibold mb-4 text-center tracking-tight"
                  style={{ 
                    textShadow: '0 2px 12px rgba(0,0,0,0.4)',
                    letterSpacing: '-0.01em',
                    fontWeight: '600'
                  }}>
                How Long We&apos;ve Been Here
              </h3>
              
              {/* Counter */}
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.8rem] font-bold text-white drop-shadow-lg tracking-tight"
                   style={{ 
                     textShadow: '0 2px 16px rgba(0,0,0,0.5)',
                     letterSpacing: '-0.02em',
                     fontWeight: '700'
                   }}>
                <AnimatedCounter end={13} duration={5000} suffix=" Years" decimals={0} />
              </div>
            </div>

            {/* Stat 3: Team Experience in Poker */}
            <div className="flex flex-col items-center justify-center p-10">
              {/* Icon */}
              <div className="relative flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#077124] to-emerald-400 rounded-2xl blur-lg opacity-30"></div>
                  <div className="relative bg-gradient-to-br from-[#077124] to-emerald-500 p-4 rounded-2xl shadow-lg">
                    <Award className="w-8 h-8 text-white" strokeWidth={2.5} />
                  </div>
                </div>
              </div>
              
              {/* Title */}
              <h3 className="text-gray-400 text-lg sm:text-xl md:text-[1.225rem] lg:text-[1.4rem] font-semibold mb-4 text-center tracking-tight"
                  style={{ 
                    textShadow: '0 2px 12px rgba(0,0,0,0.4)',
                    letterSpacing: '-0.01em',
                    fontWeight: '600'
                  }}>
                Team Experience in Poker
              </h3>
              
              {/* Counter */}
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.8rem] font-bold text-white drop-shadow-lg tracking-tight"
                   style={{ 
                     textShadow: '0 2px 16px rgba(0,0,0,0.5)',
                     letterSpacing: '-0.02em',
                     fontWeight: '700'
                   }}>
                <AnimatedCounter end={100} duration={5000} suffix="+ Years" decimals={0} />
              </div>
            </div>
          </div>

          {/* Rakeback Section - Integrated Premium */}
          <div className="relative max-w-5xl mx-auto text-center">
            {/* Ambient glow effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#077124]/[0.08] rounded-full blur-[120px] animate-pulse-slow pointer-events-none"></div>
            
            <div className="relative z-10">
              {/* Title with Apple-like typography */}
              <h2 className="text-white text-[1.75rem] sm:text-4xl md:text-5xl lg:text-[2.2rem] font-semibold mb-8 leading-[1.1] tracking-tight animate-fade-up"
                  style={{ 
                    textShadow: '0 2px 16px rgba(0,0,0,0.4)',
                    letterSpacing: '-0.02em',
                    fontWeight: '600'
                  }}>
                Rewards & Cashback Paid in 2025
              </h2>
              
              {/* Big Counter - Premium Style */}
              <div className="inline-block mb-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
                <div className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[3.5rem] font-bold bg-gradient-to-r from-[#077124] via-emerald-400 to-[#077124] bg-clip-text text-transparent relative leading-[1.1]"
                     style={{ 
                       WebkitTextStroke: '1px rgba(7, 113, 36, 0.3)',
                       textShadow: '0 0 80px rgba(7, 113, 36, 0.5)',
                       letterSpacing: '-0.02em',
                       fontWeight: '700'
                     }}>
                  <AnimatedCounter end={2450000} duration={5000} prefix="$" suffix="+" decimals={0} />
                </div>
              </div>
              
              {/* Subtitle texts */}
              <div className="max-w-2xl mx-auto space-y-4 animate-fade-up" style={{ animationDelay: '0.4s' }}>
                <p className="text-base sm:text-lg md:text-xl lg:text-[1.4rem] text-gray-400 font-normal leading-[1.4]"
                   style={{ 
                     textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                     letterSpacing: '-0.01em',
                     fontWeight: '400'
                   }}>
                  And counting...
                </p>
                <p className="text-base sm:text-lg md:text-xl lg:text-[1.4rem] text-gray-400 font-normal leading-[1.5]"
                   style={{ 
                     textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                     letterSpacing: '-0.01em',
                     fontWeight: '400'
                   }}>
                  Join thousands of players maximizing their poker profits with exclusive rakeback deals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED DEALS SECTION - 9 Real Poker Room Deals */}
      <section id="deals" className="relative bg-black w-full py-6 md:py-8 px-3 md:px-4">
        {/* Premium Container Card */}
        <div className="relative w-full rounded-[2.5rem] overflow-hidden group/deals transition-all duration-700">
          {/* Background with gradient - tom intermediário entre preto e cinza */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#121212] to-[#0d0d0d] transition-all duration-700 group-hover/deals:from-[#0e0e0e] group-hover/deals:via-[#131313] group-hover/deals:to-[#0e0e0e]"></div>
          
          {/* Subtle border effect - borda completa ao redor */}
          <div className="absolute inset-0 rounded-[2.5rem] border border-white/[0.06] shadow-2xl shadow-black/50 transition-all duration-700 group-hover/deals:border-white/[0.09] group-hover/deals:shadow-black/60"></div>
          
          {/* Inner glow effect - brilho interno sutil */}
          <div className="absolute inset-0 rounded-[2.5rem] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.025)] transition-all duration-700 group-hover/deals:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"></div>
          
          {/* Top light rim - brilho no topo */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent rounded-t-[2.5rem]"></div>
          
          {/* Ambient background effects - glows verdes sutis */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#077124]/[0.04] rounded-full blur-[120px] animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/[0.025] rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
          
          {/* Subtle noise texture overlay for premium feel */}
          <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
          
          {/* Content wrapper */}
          <div className="relative z-10 w-full py-20 md:py-24 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-white text-center text-[1.75rem] sm:text-3xl md:text-4xl lg:text-[2.4rem] font-bold mb-4"
                  style={{ 
                    textShadow: '0 2px 16px rgba(0,0,0,0.4)',
                    letterSpacing: '-0.02em',
                    fontWeight: '600'
                  }}>
                Stop Leaving Money On The Table
              </h2>
              <p className="text-gray-400 text-center text-base sm:text-lg md:text-xl lg:text-[1.4rem] mb-16 font-normal"
                 style={{ 
                   textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                   letterSpacing: '-0.01em',
                   fontWeight: '400'
                 }}>
                Take a look at our deals and start maximising your rewards through our promotions
              </p>
          
          {/* Deals Grid - 3 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-auto">

            {/* Deal 2: PARTYPOKER - Primeira Linha */}
            <div className="group relative rounded-[2rem] overflow-hidden backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/50 via-amber-600/40 to-zinc-900/50 rounded-[2rem] blur-sm group-hover:blur-md transition-all duration-500"></div>
              
              {/* Card Content */}
              <div className="relative border border-orange-900/20 rounded-[2rem] overflow-hidden shadow-2xl group-hover:shadow-orange-500/40 group-hover:shadow-2xl transition-all duration-500 flex flex-col min-h-[540px]"
                   style={{
                     background: 'radial-gradient(ellipse at center top, #E67339 0%, #D4642D 20%, #B85425 40%, #8B3D1A 60%, #6B2F15 80%, #4D2310 100%)'
                   }}>
                {/* Subtle vignette for extra depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/30 pointer-events-none"></div>
                
                {/* Logo Container at Top */}
                <div className="relative h-36 flex items-center justify-center px-8 pt-8 pb-6 flex-shrink-0">
                  <img src="https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/07/07144334/ENT_PartyPoker_Landscape_FullWhite_RGB.png" alt="PartyPoker Logo" className="max-h-14 max-w-full object-contain drop-shadow-2xl filter brightness-110 z-10" />
                </div>
                
                {/* Content */}
                <div className="relative px-8 pt-0 pb-6 flex flex-col flex-grow">
                  <div className="text-center space-y-0 mb-8">
                    <p className="text-sm sm:text-base md:text-lg lg:text-[1.5rem] font-semibold text-white/95 tracking-wide mb-3">Get Up To</p>
                    <p className="text-4xl sm:text-5xl md:text-6xl lg:text-[3rem] font-black text-white drop-shadow-lg leading-none">65%</p>
                    <p className="text-3xl sm:text-4xl md:text-5xl lg:text-[3rem] font-black text-white drop-shadow-lg leading-none mt-1">Cashback</p>
                    <p className="text-sm sm:text-base md:text-lg lg:text-[1.5rem] text-white/90 leading-relaxed pt-4 font-medium">Through Our Promotions</p>
                  </div>
                  
                  {/* Button */}
                  <div className="flex justify-center mb-4">
                    <a href="/platform-connection?platform_id=1368" className="relative group/btn overflow-hidden bg-gradient-to-b from-[#088929] to-[#055a1c] text-white font-bold px-12 py-3.5 rounded-full text-center text-base transition-all duration-500 hover:scale-[1.03] active:scale-[0.98]"
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
                      <span className="relative z-10 tracking-wide drop-shadow-lg">Claim Deal</span>
                      <div className="absolute inset-x-0 top-[1px] h-px bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"></div>
                      <div className="absolute inset-x-0 bottom-[1px] h-px bg-gradient-to-r from-transparent via-black/50 to-transparent rounded-full"></div>
                    </a>
                  </div>
                  
                  {/* Terms */}
                  <div className="mt-auto pt-5 border-t border-white/[0.15]">
                    <p className="text-[0.7rem] text-white/60 leading-tight text-center px-2">18+ (19+ in Canada) | Please Play Responsibly | Full PartyPoker T&amp;C&apos;s Apply | Full Universal Poker T&amp;C&apos;s Apply | GambleAware</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Deal 3: 888POKER - Primeira Linha */}
            <div className="group relative rounded-[2rem] overflow-hidden backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/50 via-cyan-600/40 to-zinc-900/50 rounded-[2rem] blur-sm group-hover:blur-md transition-all duration-500"></div>
              
              {/* Card Content */}
              <div className="relative border border-blue-900/20 rounded-[2rem] overflow-hidden shadow-2xl group-hover:shadow-blue-500/40 group-hover:shadow-2xl transition-all duration-500 flex flex-col min-h-[540px]"
                   style={{
                     background: 'radial-gradient(ellipse at center top, #4A7AC9 0%, #3B68B8 20%, #2E56A3 40%, #234489 60%, #1A3470 80%, #142958 100%)'
                   }}>
                {/* Subtle vignette for extra depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/30 pointer-events-none"></div>
                
                {/* Logo Container at Top */}
                <div className="relative h-36 flex items-center justify-center px-8 pt-8 pb-6 flex-shrink-0">
                  <img src="https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/09/17183728/888-LOGO-webp-1024x309.webp" alt="888poker Logo" className="max-h-14 max-w-full object-contain drop-shadow-2xl filter brightness-110 z-10" />
                </div>
                
                {/* Content */}
                <div className="relative px-8 pt-0 pb-6 flex flex-col flex-grow">
                  <div className="text-center space-y-0 mb-8">
                    <p className="text-sm sm:text-base md:text-lg lg:text-[1.5rem] font-semibold text-white/95 tracking-wide mb-3">Get An Extra</p>
                    <p className="text-4xl sm:text-5xl md:text-6xl lg:text-[3rem] font-black text-white drop-shadow-lg leading-none">50%</p>
                    <p className="text-3xl sm:text-4xl md:text-5xl lg:text-[3rem] font-black text-white drop-shadow-lg leading-none mt-1">Cashback</p>
                    <p className="text-sm sm:text-base md:text-lg lg:text-[1.5rem] text-white/90 leading-relaxed pt-4 font-medium">Through Our Promotions</p>
                  </div>
                  
                  {/* Button */}
                  <div className="flex justify-center mb-4">
                    <a href="/platform-connection?platform_id=1367" className="relative group/btn overflow-hidden bg-gradient-to-b from-[#088929] to-[#055a1c] text-white font-bold px-12 py-3.5 rounded-full text-center text-base transition-all duration-500 hover:scale-[1.03] active:scale-[0.98]"
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
                      <span className="relative z-10 tracking-wide drop-shadow-lg">Claim Deal</span>
                      <div className="absolute inset-x-0 top-[1px] h-px bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"></div>
                      <div className="absolute inset-x-0 bottom-[1px] h-px bg-gradient-to-r from-transparent via-black/50 to-transparent rounded-full"></div>
                    </a>
                  </div>
                  
                  {/* Terms */}
                  <div className="mt-auto pt-5 border-t border-white/[0.15]">
                    <p className="text-[0.7rem] text-white/60 leading-tight text-center px-2">#Ad | 18+ | Please Play Responsibly | Full 888Poker T&amp;C&apos;s Apply | Full Universal Poker T&amp;C&apos;s Apply | GambleAware</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Deal 10: COINPOKER - Quarta Linha */}
            <div className="group relative rounded-[2rem] overflow-hidden backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/50 via-orange-600/40 to-zinc-900/50 rounded-[2rem] blur-sm group-hover:blur-md transition-all duration-500"></div>
              <div className="relative border border-red-900/20 rounded-[2rem] overflow-hidden shadow-2xl group-hover:shadow-red-500/40 group-hover:shadow-2xl transition-all duration-500 flex flex-col min-h-[540px]"
                   style={{
                     background: 'radial-gradient(ellipse at center top, #9A3838 0%, #872E2E 20%, #6E2424 40%, #551B1B 60%, #3D1414 80%, #2B0F0F 100%)'
                   }}>
                {/* Subtle vignette for extra depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/30 pointer-events-none"></div>
                
                {/* Logo Container at Top */}
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
                  <div className="flex justify-center mb-4">
                    <a href="#" className="relative group/btn overflow-hidden bg-gradient-to-b from-[#088929] to-[#055a1c] text-white font-bold px-12 py-3.5 rounded-full text-center text-base transition-all duration-500 hover:scale-[1.03] active:scale-[0.98]"
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
                      <span className="relative z-10 tracking-wide drop-shadow-lg">Claim Deal</span>
                      <div className="absolute inset-x-0 top-[1px] h-px bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"></div>
                      <div className="absolute inset-x-0 bottom-[1px] h-px bg-gradient-to-r from-transparent via-black/50 to-transparent rounded-full"></div>
                    </a>
                  </div>
                  {/* Terms */}
                  <div className="mt-auto pt-5 border-t border-white/[0.15]">
                    <p className="text-[0.7rem] text-white/60 leading-tight text-center px-2">18+ (19+ in Canada) | Please Play Responsibly | Full CoinPoker T&amp;C&apos;s Apply | Full Universal Poker T&amp;C&apos;s Apply | GambleAware</p>
                  </div>
                </div>
              </div>
            </div>

            </div>

          {/* View All Deals Button */}
          <div className="text-center mt-12">
            <Link 
              href="/deals"
              className="group relative inline-flex items-center justify-center gap-3 px-14 py-5 text-lg md:text-xl font-bold text-white bg-gradient-to-b from-[#088929] to-[#055a1c] rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.03] active:scale-[0.98]"
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
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION - 3 Simple Steps */}
      <section id="how-it-works" className="relative bg-black w-full py-16 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-white text-[1.75rem] sm:text-3xl md:text-4xl lg:text-[2.4rem] font-bold mb-4"
                style={{ 
                  textShadow: '0 2px 16px rgba(0,0,0,0.4)',
                  letterSpacing: '-0.02em',
                  fontWeight: '600'
                }}>
              How It Works - 3 Simple Steps
            </h2>
            <p className="text-gray-400 text-base sm:text-lg md:text-xl lg:text-[1.4rem] max-w-3xl mx-auto font-normal"
               style={{ 
                 textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                 letterSpacing: '-0.01em',
                 fontWeight: '400'
               }}>
              No complicated rules. No hidden hoops. Just connect, play, and get rewarded.
            </p>
          </div>

          {/* Steps Grid - 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 1: Choose Your Deal */}
            <div className={`group relative rounded-3xl overflow-hidden backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 ${cardsVisible ? 'animate-fade-in-up-1' : 'opacity-0'}`}>
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 via-[#077124]/20 to-zinc-900/50 rounded-3xl blur-sm group-hover:blur-md transition-all duration-500"></div>
              
              {/* Card Content */}
              <div className="relative bg-gradient-to-br from-zinc-900/95 via-black/95 to-zinc-900/95 border border-white/[0.08] rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-emerald-500/20 group-hover:shadow-2xl transition-all duration-500 px-8 py-10 flex flex-col min-h-[420px]">
                {/* Background subtle effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.03] via-transparent to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-500"></div>
                
                {/* Step Number Badge */}
                <div className="relative flex justify-center mb-5 z-10">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#077124] to-emerald-400 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                    <div className="relative bg-gradient-to-br from-[#077124] to-emerald-500 w-16 h-16 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-3xl font-bold">1</span>
                    </div>
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="relative text-white text-xl md:text-2xl font-bold mb-4 text-center z-10 tracking-tight"
                    style={{ 
                      textShadow: '0 2px 12px rgba(0,0,0,0.4)',
                      letterSpacing: '-0.01em',
                      fontWeight: '700'
                    }}>
                  Choose Your Deal
                </h3>
                
                {/* Description */}
                <div className="relative text-gray-300 text-sm md:text-base leading-relaxed text-center space-y-3 z-10">
                  <p>We partner with the top poker sites.</p>
                  <p>Pick one you already play on or try a new one with a better offer.</p>
                </div>
              </div>
            </div>

            {/* Step 2: New & Existing Players Welcome */}
            <div className={`group relative rounded-3xl overflow-hidden backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 ${cardsVisible ? 'animate-fade-in-up-2' : 'opacity-0'}`}>
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 via-[#077124]/20 to-zinc-900/50 rounded-3xl blur-sm group-hover:blur-md transition-all duration-500"></div>
              
              {/* Card Content */}
              <div className="relative bg-gradient-to-br from-zinc-900/95 via-black/95 to-zinc-900/95 border border-white/[0.08] rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-emerald-500/20 group-hover:shadow-2xl transition-all duration-500 px-8 py-10 flex flex-col min-h-[420px]">
                {/* Background subtle effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.03] via-transparent to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-500"></div>
                
                {/* Step Number Badge */}
                <div className="relative flex justify-center mb-5 z-10">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#077124] to-emerald-400 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                    <div className="relative bg-gradient-to-br from-[#077124] to-emerald-500 w-16 h-16 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-3xl font-bold">2</span>
                    </div>
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="relative text-white text-lg md:text-xl font-bold mb-4 text-center z-10 tracking-tight"
                    style={{ 
                      textShadow: '0 2px 12px rgba(0,0,0,0.4)',
                      letterSpacing: '-0.01em',
                      fontWeight: '700'
                    }}>
                  New & Existing Players Welcome
                </h3>
                
                {/* Description */}
                <div className="relative text-gray-300 text-sm md:text-base leading-relaxed text-center space-y-3 z-10">
                  <p>Create a new account through us and you&apos;re automatically accepted.</p>
                  <p>Already have an account? Apply to join our deal and we&apos;ll review it on a case-by-case basis.</p>
                </div>
              </div>
            </div>

            {/* Step 3: Same Play. More Rewards */}
            <div className={`group relative rounded-3xl overflow-hidden backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 ${cardsVisible ? 'animate-fade-in-up-3' : 'opacity-0'}`}>
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 via-[#077124]/20 to-zinc-900/50 rounded-3xl blur-sm group-hover:blur-md transition-all duration-500"></div>
              
              {/* Card Content */}
              <div className="relative bg-gradient-to-br from-zinc-900/95 via-black/95 to-zinc-900/95 border border-white/[0.08] rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-emerald-500/20 group-hover:shadow-2xl transition-all duration-500 px-8 py-10 flex flex-col min-h-[420px]">
                {/* Background subtle effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.03] via-transparent to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-500"></div>
                
                {/* Step Number Badge */}
                <div className="relative flex justify-center mb-5 z-10">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#077124] to-emerald-400 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                    <div className="relative bg-gradient-to-br from-[#077124] to-emerald-500 w-16 h-16 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-3xl font-bold">3</span>
                    </div>
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="relative text-white text-xl md:text-2xl font-bold mb-4 text-center z-10 tracking-tight"
                    style={{ 
                      textShadow: '0 2px 12px rgba(0,0,0,0.4)',
                      letterSpacing: '-0.01em',
                      fontWeight: '700'
                    }}>
                  Same Play. More Rewards
                </h3>
                
                {/* Description */}
                <div className="relative text-gray-300 text-sm md:text-base leading-relaxed text-center space-y-3 z-10">
                  <p>Nothing changes about how you play.</p>
                  <p>You&apos;ll still receive the poker sites rewards, plus extra cashback from us on top.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* OUR PARTNERS SECTION - Carousel de testimonials */}
      <section id="partners" className="relative bg-black w-full py-6 md:py-8 px-3 md:px-4 overflow-hidden select-none">
        {/* Content wrapper */}
        <div className="relative w-full py-20 md:py-24 px-4 flex flex-col items-center">
            <h2 className="text-white text-center text-[1.75rem] sm:text-3xl md:text-4xl lg:text-[2.4rem] font-bold mb-2 px-4"
                style={{ 
                  textShadow: '0 2px 16px rgba(0,0,0,0.4)',
                  letterSpacing: '-0.02em',
                  fontWeight: '600'
                }}>
              Our Partners
            </h2>
            <p className="text-gray-400 text-center text-base sm:text-lg md:text-xl lg:text-[1.4rem] mb-16 px-4 font-normal"
               style={{ 
                 textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                 letterSpacing: '-0.01em',
                 fontWeight: '400'
               }}>
              Don&apos;t just take our word for it, take theirs.
            </p>
            
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
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="relative bg-black w-full py-16 md:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-white text-[1.75rem] sm:text-3xl md:text-4xl lg:text-[2.4rem] font-bold mb-4"
                style={{ 
                  textShadow: '0 2px 16px rgba(0,0,0,0.4)',
                  letterSpacing: '-0.02em',
                  fontWeight: '600'
                }}>
              Frequently Asked Questions
            </h2>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div 
                key={index}
                className="group border-b border-white/10 transition-all duration-300"
              >
                {/* Question Button */}
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full flex items-center justify-between py-6 text-left transition-all duration-300 hover:opacity-80"
                >
                  <span className="text-white text-base sm:text-lg md:text-xl lg:text-[1.4rem] font-semibold pr-8"
                        style={{ 
                          textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                          letterSpacing: '-0.01em'
                        }}>
                    {faq.question}
                  </span>
                  
                  {/* Plus/Minus Icon */}
                  <div className="relative flex-shrink-0">
                    <div className={`transition-all duration-300 ${openFaqIndex === index ? 'rotate-45' : 'rotate-0'}`}>
                      <svg 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
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
                    openFaqIndex === index ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pb-2">
                    <p className="text-gray-400 text-base md:text-lg leading-relaxed"
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
      </section>

      {/* LATEST NEWS SECTION */}
      <section id="news" className="relative bg-black w-full py-12 md:py-16 px-3 md:px-4">
        <div className="w-full py-8 md:py-12 px-4">
            <h2 className="text-white text-center text-[1.75rem] sm:text-3xl md:text-4xl lg:text-[2.4rem] font-bold mb-4"
                style={{ 
                  textShadow: '0 2px 16px rgba(0,0,0,0.4)',
                  letterSpacing: '-0.02em',
                  fontWeight: '600'
                }}>
              Latest News & Updates
            </h2>
            <p className="text-gray-400 text-center text-base sm:text-lg md:text-xl lg:text-[1.4rem] mb-12 px-4 font-normal"
               style={{ 
                 textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                 letterSpacing: '-0.01em',
                 fontWeight: '400'
               }}>
              Stay updated with the latest poker news, site promotions and Universal Poker updates
            </p>
            
            {/* Blog Posts Grid - 1x3 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {blogPosts.slice(0, 3).map((post) => (
                <article 
                  key={post.id}
                  className="group relative bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-[#077124] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#077124]/20"
                >
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
                href="/news"
                className="group relative inline-flex items-center justify-center gap-3 px-14 py-5 text-lg md:text-xl font-bold text-white bg-gradient-to-b from-[#088929] to-[#055a1c] rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.03] active:scale-[0.98]"
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
                <span className="relative z-10 tracking-wide drop-shadow-lg">Read More</span>
                
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
