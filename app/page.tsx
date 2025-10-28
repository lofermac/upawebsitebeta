 'use client'

import HeaderWithAuth from "./components/HeaderWithAuth";
import Footer from "./components/Footer";
import Link from "next/link";
import { ArrowRight, Users, Calendar, Award } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import DealCardWithGeo from "@/components/DealCardWithGeo";
import AuthModal from "@/components/AuthModal";
import JoinDealModal from "@/components/JoinDealModal";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useAuthModal } from "@/lib/hooks/useAuthModal";
import { getTestimonials, getHomeHero, getHomeStats, getHomeCashback, getHomeHowItWorks, getHomeHowItWorksSteps } from "@/lib/supabase/homepage";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

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


// Hook para animar contador com easing dinâmico baseado no tamanho do número
function useCountUp(end: number, duration: number = 3500, shouldStart: boolean = false) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!shouldStart) return;
    
    let startTime: number | null = null;
    const startValue = 0;
    
    // Calcular easing power baseado no tamanho do número (escala logarítmica)
    const calculateEasingPower = (num: number): number => {
      if (num <= 1) return 1.5; // Muito pequeno: quase linear
      
      const logValue = Math.log10(num);
      
      // Mapear log₁₀ para easing power
      // log 1-1.5 (1-30) → easing 1.5-2 (mais linear)
      // log 1.5-2.5 (30-300) → easing 2-3 (médio)
      // log 2.5-4+ (300-10000+) → easing 3-4 (suave)
      
      if (logValue < 1.5) return 1.5 + (logValue * 0.3); // 1.5-1.95
      if (logValue < 2.5) return 2.0 + ((logValue - 1.5) * 1.0); // 2.0-3.0
      return Math.min(4, 3.0 + ((logValue - 2.5) * 0.67)); // 3.0-4.0 (max)
    };
    
    const easingPower = calculateEasingPower(end);
    console.log(`📊 Animating ${end}: easing power = ${easingPower.toFixed(2)}`);
    
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Aplicar easing dinâmico
      const easedProgress = 1 - Math.pow(1 - progress, easingPower);
      const currentCount = Math.floor(easedProgress * (end - startValue) + startValue);
      
      setCount(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration, shouldStart]);
  
  return count;
}

// Hook para efeito de digitação
function useTypingEffect(text: string, speed: number = 50, shouldStart: boolean = false, delay: number = 0) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    if (!shouldStart) {
      setDisplayedText('');
      setIsComplete(false);
      return;
    }
    
    // Delay antes de começar a digitar
    const delayTimeout = setTimeout(() => {
      let currentIndex = 0;
      setDisplayedText('');
      setIsComplete(false);
      
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          setIsComplete(true);
          clearInterval(interval);
        }
      }, speed);
      
      return () => clearInterval(interval);
    }, delay);
    
    return () => clearTimeout(delayTimeout);
  }, [text, speed, shouldStart, delay]);
  
  return { displayedText, isComplete };
}

// Componente para os subtítulos com efeito de digitação
function CashbackSubtitles({ 
  subtitle, 
  description, 
  shouldStart 
}: { 
  subtitle: string; 
  description: string; 
  shouldStart: boolean;
}) {
  // Primeiro texto começa após 3.5s (duração da animação do número)
  const subtitleTyping = useTypingEffect(subtitle || '', 30, shouldStart, 3500);
  
  // Segundo texto começa após o primeiro terminar (3.5s + tempo do primeiro texto)
  const descriptionDelay = 3500 + (subtitle?.length || 0) * 30 + 200; // 200ms de pausa entre textos
  const descriptionTyping = useTypingEffect(description || '', 30, shouldStart, descriptionDelay);
  
  return (
    <div className="max-w-2xl mx-auto space-y-4 mb-6">
      {subtitle && (
        <p className="text-sm sm:text-base md:text-lg text-gray-400 font-normal leading-relaxed"
           style={{ 
             textShadow: '0 1px 8px rgba(0,0,0,0.3)',
             letterSpacing: '-0.01em',
             fontWeight: '400',
             minHeight: '1.5em',
             whiteSpace: 'pre-wrap',
             wordBreak: 'keep-all',
             overflowWrap: 'normal'
           }}>
          {subtitleTyping.displayedText || '\u00A0'}
        </p>
      )}
      {description && (
        <p className="text-sm sm:text-base md:text-lg text-gray-400 font-normal leading-relaxed"
           style={{ 
             textShadow: '0 1px 8px rgba(0,0,0,0.3)',
             letterSpacing: '-0.01em',
             fontWeight: '400',
             minHeight: '1.5em',
             whiteSpace: 'pre-wrap',
             wordBreak: 'keep-all',
             overflowWrap: 'normal'
           }}>
          {descriptionTyping.displayedText || '\u00A0'}
        </p>
      )}
    </div>
  );
}

// Hook para detectar quando elemento entra na viewport
function useInView(options = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isInView) {
        setIsInView(true);
      }
    }, { threshold: 0.3, ...options });
    
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isInView, options]);
  
  return [ref, isInView] as const;
}

// Componente para estatística animada
function AnimatedStat({ 
  label, 
  value, 
  icon: Icon, 
  isInView 
}: { 
  label: string; 
  value: string; 
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; 
  isInView: boolean;
}) {
  // Usar regex para separar número e sufixo preservando espaços
  const match = value.match(/^([\d,]+)(.*)$/);
  
  const numericValue = match 
    ? parseInt(match[1].replace(/,/g, '')) 
    : 0;
  
  const suffix = match ? match[2] : '';  // Preserva espaços
  
  // DURAÇÃO FIXA de 3.5 segundos para TODOS
  // O easing é calculado automaticamente dentro do hook baseado no tamanho do número
  const FIXED_DURATION = 3500;
  
  // Animar contador com duração fixa e easing dinâmico
  const animatedValue = useCountUp(numericValue, FIXED_DURATION, isInView);
  
  // Formatar com vírgulas
  const formattedValue = animatedValue.toLocaleString('en-US');
  
  return (
    <div className="flex flex-col items-center justify-center p-10">
      {/* Icon */}
      <div className="relative flex justify-center mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-[#077124] rounded-2xl blur-lg opacity-30"></div>
          <div className="relative bg-[#077124] p-4 rounded-2xl shadow-lg">
            <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />
          </div>
        </div>
      </div>
      
      {/* Title */}
      <h3 className="text-sm sm:text-base md:text-base lg:text-lg font-semibold mb-4 text-center tracking-tight text-gray-400"
          style={{ 
            textShadow: '0 2px 12px rgba(0,0,0,0.4)',
            letterSpacing: '-0.01em',
            fontWeight: '600'
          }}>
        {label}
      </h3>
      
      {/* Animated Value */}
      <div className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-white drop-shadow-lg tracking-tight"
           style={{ 
             textShadow: '0 2px 16px rgba(0,0,0,0.5)',
             letterSpacing: '-0.02em',
             fontWeight: '700'
           }}>
        {formattedValue}{suffix}
      </div>
    </div>
  );
}

// Componente para Cashback animado (reutiliza mesma lógica das Stats)
function AnimatedCashback({ 
  value, 
  isInView 
}: { 
  value: string; 
  isInView: boolean;
}) {
  // Usar regex para separar número e sufixo (aceita $ opcional)
  const match = value.match(/^[\$]?([\d,]+)(.*)$/);
  
  const numericValue = match 
    ? parseInt(match[1].replace(/,/g, '')) 
    : 0;
  
  const suffix = match ? match[2] : '';
  
  // MESMA DURAÇÃO das Stats (3.5s) para sincronização perfeita
  const FIXED_DURATION = 3500;
  
  // Hook com easing dinâmico automático (calculado baseado no tamanho do número)
  const animatedValue = useCountUp(numericValue, FIXED_DURATION, isInView);
  
  // Formatar com vírgulas
  const formattedValue = animatedValue.toLocaleString('en-US');
  
  return (
    <div className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold bg-gradient-to-r from-[#077124] via-[#0a9b30] to-[#077124] bg-clip-text text-transparent relative leading-relaxed"
         style={{ 
           letterSpacing: '-0.02em',
           fontWeight: '800',
           WebkitFontSmoothing: 'antialiased',
           MozOsxFontSmoothing: 'grayscale',
           textRendering: 'optimizeLegibility'
         }}>
      ${formattedValue}{suffix}
    </div>
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
  },
  {
    question: "How Long Does It Take To Get Approved?",
    answer: "New account approvals are typically instant. If you're applying to transfer an existing account to our rakeback program, the review process usually takes 2-3 business days. We work quickly to get you started as soon as possible."
  },
  {
    question: "What If I Have Issues With My Rakeback?",
    answer: "Our dedicated support team is here to help with any rakeback-related questions or issues. You can contact us via email, live chat, or through our contact form, and we'll resolve your concerns promptly. We pride ourselves on providing excellent customer service."
  }
];

// Helper para renderizar texto com parágrafos
function renderTextWithParagraphs(text: string) {
  const lines = text.split('\n').filter(line => line.trim());
  
  return lines.map((line, index) => (
    <p key={index} className="mb-4 last:mb-0">
      {line}
    </p>
  ));
}

export default function Home() {
  const { isLoggedIn } = useAuth();
  const authModal = useAuthModal();
  const [cardsVisible, setCardsVisible] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  
  // Detectar quando stats entram na viewport
  const [statsRef, statsInView] = useInView();
  
  // Detectar quando cashback entra na viewport
  const [cashbackRef, cashbackInView] = useInView();
  
  // Detectar quando How It Works entra na viewport
  const [howItWorksVisible, setHowItWorksVisible] = useState(false);
  const howItWorksRef = useRef<HTMLElement>(null);
  
  // Hero Section from Supabase
  const [heroData, setHeroData] = useState({
    title: 'Exclusive Deals On The',
    title_line_2: 'World\'s Best Poker Sites',
    subtitle: 'More Rakeback. More Support. Maximum Value.',
    button_text: 'Explore Deals',
    button_link: '/deals'
  });
  
  // Statistics from Supabase
  const [statsData, setStatsData] = useState([
    { label: 'Number Of Players With Us', value: '10,000+' },
    { label: 'How Long We\'ve Been Here', value: '13 Years' },
    { label: 'Team Experience in Poker', value: '100+ Years' }
  ]);
  
  // Cashback from Supabase
  const [cashbackData, setCashbackData] = useState({
    section_title: 'Rewards & Cashback Paid in 2025',
    amount: 2450000,
    subtitle: 'And counting...',
    description: 'Join thousands of players maximizing their poker profits with exclusive rakeback deals.'
  });
  
  // How It Works from Supabase
  const [howItWorksData, setHowItWorksData] = useState({
    section_title: 'How It Works - 3 Simple Steps',
    section_subtitle: 'No complicated rules. No hidden hoops. Just connect, play, and get rewarded.'
  });
  const [howItWorksSteps, setHowItWorksSteps] = useState([
    { title: 'Choose Your Deal', description: 'We partner with the top poker sites.\n\nPick one you already play on or try a new one with a better offer.', display_order: 1 },
    { title: 'New & Existing Players Welcome', description: 'Create a new account through us and you\'re automatically accepted.\n\nAlready have an account? Apply to join our deal and we\'ll review it on a case-by-case basis.', display_order: 2 },
    { title: 'Same Play. More Rewards', description: 'Nothing changes about how you play.\n\nYou\'ll still receive the poker sites rewards, plus extra cashback from us on top.', display_order: 3 }
  ]);
  
  // Testimonials from Supabase
  const [testimonials, setTestimonials] = useState<Array<{
    id: string;
    name: string;
    meta: string | null;
    image: string;
    quote: string;
  }>>([]);
  const [isLoadingTestimonials, setIsLoadingTestimonials] = useState(true);

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

  // Load hero section and testimonials from Supabase
  useEffect(() => {
    async function loadHomepageData() {
      try {
        // Load Hero Section
        console.log('📥 [Homepage] Loading hero section from Supabase...');
        const heroFromDb = await getHomeHero();
        if (heroFromDb) {
          setHeroData({
            title: heroFromDb.title,
            title_line_2: heroFromDb.title_line_2 || '',
            subtitle: heroFromDb.subtitle || 'More Rakeback. More Support. Maximum Value.',
            button_text: heroFromDb.button_text,
            button_link: heroFromDb.button_link || '/deals'
          });
          console.log('✅ [Homepage] Loaded hero section:', heroFromDb);
        }
        
        // Load Statistics
        console.log('📥 [Homepage] Loading statistics from Supabase...');
        const stats = await getHomeStats();
        if (stats && stats.length > 0) {
          setStatsData(stats.map(stat => ({
            label: stat.label,
            value: stat.value
          })));
          console.log('✅ [Homepage] Loaded statistics:', stats);
        }
        
        // Load Cashback
        console.log('📥 [Homepage] Loading cashback from Supabase...');
        const cashback = await getHomeCashback();
        if (cashback) {
          setCashbackData({
            section_title: cashback.section_title,
            amount: cashback.amount,
            subtitle: cashback.subtitle || 'And counting...',
            description: cashback.description || ''
          });
          console.log('✅ [Homepage] Loaded cashback:', cashback);
        }
        
        // Load How It Works
        console.log('📥 [Homepage] Loading how it works from Supabase...');
        const howItWorks = await getHomeHowItWorks();
        const steps = await getHomeHowItWorksSteps();
        
        if (howItWorks) {
          setHowItWorksData({
            section_title: howItWorks.section_title,
            section_subtitle: howItWorks.section_subtitle || ''
          });
        }
        
        if (steps && steps.length > 0) {
          setHowItWorksSteps(steps.map(step => ({
            title: step.title,
            description: step.description || '',
            display_order: step.display_order
          })));
          console.log('✅ [Homepage] Loaded', steps.length, 'how it works steps');
        }
        
        // Load Testimonials
        setIsLoadingTestimonials(true);
        const data = await getTestimonials();
        
        // Map Supabase data to component format
        const mappedTestimonials = data.map(t => ({
          id: t.id || '',
          name: t.author_name,
          meta: t.author_role || null,
          image: t.author_photo_url,
          quote: t.testimonial_text
        }));
        
        setTestimonials(mappedTestimonials);
        console.log('✅ Loaded', mappedTestimonials.length, 'testimonials from Supabase');
      } catch (error) {
        console.error('❌ Error loading homepage data:', error);
      } finally {
        setIsLoadingTestimonials(false);
      }
    }
    
    loadHomepageData();
  }, []);

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
  
  // Intersection Observer para How It Works animação premium
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !howItWorksVisible) {
            console.log('🎬 [How It Works] Animação INICIADA:', new Date().toLocaleTimeString());
            setHowItWorksVisible(true);
            
            // Debug: verificar quando linha deveria terminar
            setTimeout(() => {
              console.log('⏱️ [How It Works] 6 segundos se passaram (linha deveria ter terminado):', new Date().toLocaleTimeString());
            }, 6000);
            
            // Debug: verificar timing dos steps (valores precisos com linear)
            setTimeout(() => console.log('1️⃣ Step 1 começou aos 650ms, completa aos 1350ms (linha em 22.5%)'), 650);
            setTimeout(() => console.log('2️⃣ Step 2 começou aos 2650ms, completa aos 3350ms (linha em 55.8%)'), 2650);
            setTimeout(() => console.log('3️⃣ Step 3 começou aos 4650ms, completa aos 5350ms (linha em 89.2%)'), 4650);
            
            // Debug: mostrar progresso da linha a cada 500ms
            for (let i = 0; i <= 12; i++) {
              setTimeout(() => {
                const progress = (i/12*100).toFixed(1);
                const time = i*500;
                console.log(`📊 Linha em ${progress}% aos ${time}ms`);
              }, i * 500);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    if (howItWorksRef.current) {
      observer.observe(howItWorksRef.current);
    }

    return () => observer.disconnect();
  }, [howItWorksVisible]);

  return (
    <div className="bg-black min-h-screen flex flex-col">
      {/* HERO SECTION */}
      <section className="relative bg-black w-full h-screen flex flex-col items-center justify-start px-3 md:px-4 pt-6">
        {/* Premium Container Card - engloba o header e todo conteÃºdo */}
        <div className="relative w-full h-[calc(100vh-3rem)] rounded-[2.5rem] overflow-hidden group/hero transition-all duration-700">
          {/* Header dentro do card */}
          <div className="absolute top-0 left-0 right-0 z-50 pt-6 px-4">
      <HeaderWithAuth />
          </div>
          
          {/* Background Video */}
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/hero-bg.mp4?v=2" type="video/mp4" />
          </video>
          
          {/* Dark overlay semi-transparent - por cima do vídeo */}
          <div className="absolute inset-0 bg-black/60"></div>
          
          {/* Background with gradient - tom intermediÃ¡rio entre preto e cinza (fallback se vídeo não carregar) */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#121212] to-[#0d0d0d] transition-all duration-700 group-hover/hero:from-[#0e0e0e] group-hover/hero:via-[#131313] group-hover/hero:to-[#0e0e0e] -z-10"></div>
          
          {/* Subtle border effect - borda completa ao redor */}
          <div className="absolute inset-0 rounded-[2.5rem] border border-white/[0.06] shadow-2xl shadow-black/50 transition-all duration-700 group-hover/hero:border-white/[0.09] group-hover/hero:shadow-black/60 pointer-events-none"></div>
          
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
                <div className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] font-semibold leading-tight tracking-[-0.02em]">
                  {/* Dynamic title from Supabase - supports 2 lines */}
                  {heroData.title_line_2 ? (
                    <>
                      {/* Two-line title */}
                      <span className="block text-white/95 font-medium" 
                            style={{ 
                              textShadow: '0 2px 16px rgba(0,0,0,0.4)',
                              letterSpacing: '-0.02em'
                            }}>
                        {heroData.title}
                      </span>
                      <span className="block mt-1 bg-gradient-to-br from-white via-white to-gray-200 bg-clip-text text-transparent font-semibold" 
                            style={{ 
                              textShadow: '0 4px 24px rgba(255,255,255,0.08)',
                              letterSpacing: '-0.03em'
                            }}>
                        {heroData.title_line_2}
                      </span>
                    </>
                  ) : (
                    <>
                      {/* Single-line title */}
                      <span className="block mt-1 bg-gradient-to-br from-white via-white to-gray-200 bg-clip-text text-transparent font-semibold" 
                            style={{ 
                              textShadow: '0 4px 24px rgba(255,255,255,0.08)',
                              letterSpacing: '-0.03em'
                            }}>
                        {heroData.title}
                      </span>
                    </>
                  )}
                </div>
              </h1>
              
              {/* Subtitle - Apple-style minimalista */}
              <p className="text-lg sm:text-xl md:text-xl lg:text-2xl text-gray-400 font-normal max-w-4xl mx-auto leading-relaxed animate-fade-up-delay-1200"
                 style={{ 
                   textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                   letterSpacing: '-0.01em',
                   fontWeight: '400'
                 }}>
            {heroData.subtitle}
          </p>
          
              {/* CTA Button - Register Style */}
              <div className="flex justify-center pt-6 animate-fade-up-delay-1400">
          <a 
            href={heroData.button_link}
                  className="relative font-semibold text-lg md:text-xl px-10 py-4 rounded-full bg-[#077124] text-white shadow-lg shadow-[#077124]/20 hover:shadow-2xl hover:shadow-[#077124]/40 hover:scale-[1.03] transition-all duration-300 group/btn overflow-hidden inline-flex items-center gap-3"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {heroData.button_text}
                    <svg className="w-5 h-5 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  {/* Animated shine effect */}
                  <div className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  {/* Subtle inner glow */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* STATS & RAKEBACK SECTION - Premium */}
      <section id="mission" className="relative bg-black w-full py-20 md:py-32 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Stats Grid - Dynamic from Supabase with Animation */}
          <div 
            ref={statsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 mb-20"
          >
            {statsData.map((stat, index) => {
              // Select icon based on index
              const Icon = index === 0 ? Users : index === 1 ? Calendar : Award;
              
              return (
                <AnimatedStat
                  key={index}
                  label={stat.label}
                  value={stat.value}
                  icon={Icon}
                  isInView={statsInView}
                />
              );
            })}
          </div>

          {/* Rakeback Section - Integrated Premium */}
          <div 
            ref={cashbackRef}
            className="relative max-w-5xl mx-auto text-center"
          >
            {/* Ambient glow effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#077124]/[0.08] rounded-full blur-[120px] animate-pulse-slow pointer-events-none"></div>
            
            <div className="relative z-10">
              {/* Title with Apple-like typography */}
              <h2 className="text-white text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-semibold mb-4 leading-relaxed tracking-tight animate-fade-up"
                  style={{ 
                    textShadow: '0 2px 16px rgba(0,0,0,0.4)',
                    letterSpacing: '-0.02em',
                    fontWeight: '600'
                  }}>
                {cashbackData.section_title}
              </h2>
              
              {/* Big Counter - Premium Style with Synchronized Animation */}
              <div className="inline-block mb-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
                <AnimatedCashback 
                  value={`${cashbackData.amount}+`}
                  isInView={cashbackInView} 
                />
              </div>
              
              {/* Subtitle texts with typing effect */}
              <CashbackSubtitles 
                subtitle={cashbackData.subtitle}
                description={cashbackData.description}
                shouldStart={cashbackInView}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED DEALS SECTION - 9 Real Poker Room Deals */}
      <section id="deals" className="relative bg-black w-full py-6 md:py-8 px-3 md:px-4">
          <div className="w-full py-20 md:py-24 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-white text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
                  style={{ 
                    textShadow: '0 2px 16px rgba(0,0,0,0.4)',
                    letterSpacing: '-0.02em',
                    fontWeight: '600'
                  }}>
                Stop Leaving Money On The Table
              </h2>
              <p className="text-gray-400 text-center text-base md:text-lg mb-20 font-normal leading-relaxed"
                 style={{ 
                   textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                   letterSpacing: '-0.01em',
                   fontWeight: '400'
                 }}>
                Take a look at our deals and start maximising your rewards through our promotions
              </p>
          
          {/* Deals Grid - 3 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 auto-rows-auto">

            {/* Deal 2: PARTYPOKER - Primeira Linha */}
            <DealCardWithGeo dealId={2}>
            <div className="group relative rounded-[2rem] overflow-hidden backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/50 via-amber-600/40 to-zinc-900/50 rounded-[2rem] blur-sm group-hover:blur-md transition-all duration-500"></div>
              
              {/* Card Content */}
              <div className="relative border border-orange-900/20 rounded-[2rem] overflow-hidden shadow-2xl group-hover:shadow-orange-500/40 group-hover:shadow-2xl transition-all duration-500 flex flex-col min-h-[540px]"
                   style={{
                     background: 'radial-gradient(ellipse at center top, #C8582B 0%, #B85425 20%, #A04920 40%, #8B3D1A 60%, #6B2F15 80%, #4D2310 100%)'
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
                    <p className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-white drop-shadow-lg leading-none">65%</p>
                    <p className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-white drop-shadow-lg leading-none mt-1">Cashback</p>
                    <p className="text-sm sm:text-base md:text-lg lg:text-[1.5rem] text-white/90 leading-relaxed pt-4 font-medium">Through Our Promotions</p>
                  </div>
                  
                  {/* Buttons - 2 side by side */}
                  <div className="flex gap-3 justify-center mb-4 px-2">
                    {/* Claim Offer Button - Register Style */}
                    <a href="/platform-connection?platform_id=1368" className="relative font-semibold text-sm px-6 py-3.5 rounded-full bg-[#077124] text-white shadow-lg shadow-[#077124]/20 hover:shadow-2xl hover:shadow-[#077124]/40 hover:scale-[1.03] transition-all duration-300 group/claimBtn overflow-hidden flex-1 text-center">
                      <span className="relative z-10">Claim Offer</span>
                      {/* Animated shine effect */}
                      <div className="absolute inset-0 translate-x-[-100%] group-hover/claimBtn:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                      {/* Subtle inner glow */}
                      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover/claimBtn:opacity-100 transition-opacity duration-300"></div>
                    </a>
                    {/* Learn More Button - Secondary */}
                    <a href="#" className="relative group/btn2 overflow-hidden bg-white/10 border border-white/20 text-white font-semibold px-6 py-3.5 rounded-full text-center text-sm transition-all duration-300 hover:bg-white/15 hover:border-white/30 active:scale-[0.98] flex-1 backdrop-blur-sm">
                      <span className="relative z-10 tracking-wide drop-shadow-lg">Learn More</span>
                    </a>
                  </div>
                  
                  {/* Terms */}
                  <div className="mt-auto pt-5 border-t border-white/[0.15]">
                    <p className="text-[0.7rem] text-white/60 leading-tight text-center px-2">18+ (19+ in Canada) | Please Play Responsibly | Full PartyPoker T&amp;C&apos;s Apply | Full Universal Poker T&amp;C&apos;s Apply | GambleAware</p>
                  </div>
                </div>
              </div>
            </div>
            </DealCardWithGeo>

            {/* Deal 3: 888POKER - Primeira Linha */}
            <DealCardWithGeo dealId={3}>
            <div className="group relative rounded-[2rem] overflow-hidden backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/50 via-cyan-600/40 to-zinc-900/50 rounded-[2rem] blur-sm group-hover:blur-md transition-all duration-500"></div>
              
              {/* Card Content */}
              <div className="relative border border-blue-900/20 rounded-[2rem] overflow-hidden shadow-2xl group-hover:shadow-blue-500/40 group-hover:shadow-2xl transition-all duration-500 flex flex-col min-h-[540px]"
                   style={{
                     background: 'radial-gradient(ellipse at center top, #3B5FA3 0%, #2E56A3 20%, #264A8C 40%, #234489 60%, #1A3470 80%, #142958 100%)'
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
                    <p className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-white drop-shadow-lg leading-none">50%</p>
                    <p className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-white drop-shadow-lg leading-none mt-1">Cashback</p>
                    <p className="text-sm sm:text-base md:text-lg lg:text-[1.5rem] text-white/90 leading-relaxed pt-4 font-medium">Through Our Promotions</p>
                  </div>
                  
                  {/* Buttons - 2 side by side */}
                  <div className="flex gap-3 justify-center mb-4 px-2">
                    {/* Claim Offer Button - Register Style */}
                    <a href="/platform-connection?platform_id=1367" onClick={handleClaimOffer888} className="relative font-semibold text-sm px-6 py-3.5 rounded-full bg-[#077124] text-white shadow-lg shadow-[#077124]/20 hover:shadow-2xl hover:shadow-[#077124]/40 hover:scale-[1.03] transition-all duration-300 group/claimBtn overflow-hidden flex-1 text-center">
                      <span className="relative z-10">Claim Offer</span>
                      {/* Animated shine effect */}
                      <div className="absolute inset-0 translate-x-[-100%] group-hover/claimBtn:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                      {/* Subtle inner glow */}
                      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover/claimBtn:opacity-100 transition-opacity duration-300"></div>
                    </a>
                    {/* Learn More Button - Secondary */}
                    <a href="#" className="relative group/btn2 overflow-hidden bg-white/10 border border-white/20 text-white font-semibold px-6 py-3.5 rounded-full text-center text-sm transition-all duration-300 hover:bg-white/15 hover:border-white/30 active:scale-[0.98] flex-1 backdrop-blur-sm">
                      <span className="relative z-10 tracking-wide drop-shadow-lg">Learn More</span>
                    </a>
                  </div>
                  
                  {/* Terms */}
                  <div className="mt-auto pt-5 border-t border-white/[0.15]">
                    <p className="text-[0.7rem] text-white/60 leading-tight text-center px-2">#Ad | 18+ | Please Play Responsibly | Full 888Poker T&amp;C&apos;s Apply | Full Universal Poker T&amp;C&apos;s Apply | GambleAware</p>
                  </div>
                </div>
              </div>
            </div>
            </DealCardWithGeo>

            {/* Deal 10: COINPOKER - Quarta Linha */}
            <DealCardWithGeo dealId={10}>
            <div className="group relative rounded-[2rem] overflow-hidden backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/50 via-orange-600/40 to-zinc-900/50 rounded-[2rem] blur-sm group-hover:blur-md transition-all duration-500"></div>
              <div className="relative border border-red-900/20 rounded-[2rem] overflow-hidden shadow-2xl group-hover:shadow-red-500/40 group-hover:shadow-2xl transition-all duration-500 flex flex-col min-h-[540px]"
                   style={{
                     background: 'radial-gradient(ellipse at center top, #7D2C2C 0%, #6E2424 20%, #5F1F1F 40%, #551B1B 60%, #3D1414 80%, #2B0F0F 100%)'
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
                    <p className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-white drop-shadow-lg leading-none">Monthly Rake</p>
                    <p className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-white drop-shadow-lg leading-none mt-1">Chase</p>
                    <p className="text-sm sm:text-base md:text-lg lg:text-[1.5rem] text-white/90 leading-relaxed pt-4 font-medium">Up To $1500 Every Month</p>
                  </div>
                  
                  {/* Buttons - 2 side by side */}
                  <div className="flex gap-3 justify-center mb-4 px-2">
                    {/* Claim Offer Button - Register Style */}
                    <a href="#" className="relative font-semibold text-sm px-6 py-3.5 rounded-full bg-[#077124] text-white shadow-lg shadow-[#077124]/20 hover:shadow-2xl hover:shadow-[#077124]/40 hover:scale-[1.03] transition-all duration-300 group/claimBtn overflow-hidden flex-1 text-center">
                      <span className="relative z-10">Claim Offer</span>
                      {/* Animated shine effect */}
                      <div className="absolute inset-0 translate-x-[-100%] group-hover/claimBtn:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                      {/* Subtle inner glow */}
                      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover/claimBtn:opacity-100 transition-opacity duration-300"></div>
                    </a>
                    {/* Learn More Button - Secondary */}
                    <a href="#" className="relative group/btn2 overflow-hidden bg-white/10 border border-white/20 text-white font-semibold px-6 py-3.5 rounded-full text-center text-sm transition-all duration-300 hover:bg-white/15 hover:border-white/30 active:scale-[0.98] flex-1 backdrop-blur-sm">
                      <span className="relative z-10 tracking-wide drop-shadow-lg">Learn More</span>
                    </a>
                  </div>
                  
                  {/* Terms */}
                  <div className="mt-auto pt-5 border-t border-white/[0.15]">
                    <p className="text-[0.7rem] text-white/60 leading-tight text-center px-2">18+ (19+ in Canada) | Please Play Responsibly | Full CoinPoker T&amp;C&apos;s Apply | Full Universal Poker T&amp;C&apos;s Apply | GambleAware</p>
                  </div>
                </div>
              </div>
            </div>
            </DealCardWithGeo>

            </div>

          {/* View All Deals Button - Register Style */}
          <div className="text-center mt-12">
            <Link 
              href="/deals"
              className="relative font-semibold text-lg md:text-xl px-10 py-4 rounded-full bg-[#077124] text-white shadow-lg shadow-[#077124]/20 hover:shadow-2xl hover:shadow-[#077124]/40 hover:scale-[1.03] transition-all duration-300 group/btn overflow-hidden inline-flex items-center gap-3"
            >
              <span className="relative z-10 flex items-center gap-3">
                View All Deals
                <ArrowRight className="w-5 h-5 transition-all duration-300" strokeWidth={2.5} />
              </span>
              {/* Animated shine effect */}
              <div className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
            </div>
          </div>
      </section>

      {/* HOW IT WORKS SECTION - 3 Simple Steps */}
      <section ref={howItWorksRef} id="how-it-works" className="relative w-full py-40 md:py-48 lg:py-56 px-4" style={{ backgroundColor: '#0e0e10' }}>
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-28">
            <h2 className="text-white text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold mb-4"
                style={{ 
                  textShadow: '0 2px 16px rgba(0,0,0,0.4)',
                  letterSpacing: '-0.02em',
                  fontWeight: '600'
                }}>
              {howItWorksData.section_title}
            </h2>
            {howItWorksData.section_subtitle && (
              <p className="text-gray-400 text-base sm:text-base md:text-lg lg:text-lg max-w-3xl mx-auto font-normal leading-relaxed"
                 style={{ 
                   textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                   letterSpacing: '-0.01em',
                   fontWeight: '400'
                 }}>
                {howItWorksData.section_subtitle}
              </p>
            )}
          </div>

          {/* Steps Grid - 3 columns with horizontal line */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
            {/* Linha horizontal animada - desktop only (6 segundos - LINEAR sem aceleração) */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gray-800/40 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#077124] via-emerald-400 to-emerald-500 origin-left transition-transform shadow-[0_0_12px_rgba(16,185,129,0.6)]"
                style={{
                  transform: howItWorksVisible ? 'scaleX(1)' : 'scaleX(0)',
                  transitionDuration: '6000ms',
                  transitionTimingFunction: 'linear',  // SEM aceleração - velocidade constante
                }}
              ></div>
            </div>
            
            {/* Dynamic Steps from Supabase */}
            {howItWorksSteps.map((step) => {
              // Timing PRECISO sincronizado com a linha linear (6s total)
              // Grid com 3 colunas: cada coluna = 33.33% da largura
              // Step 1: centro da 1ª coluna = 16.66% → 16.66% de 6000ms = 1000ms
              // Step 2: centro da 2ª coluna = 50% → 50% de 6000ms = 3000ms  
              // Step 3: centro da 3ª coluna = 83.33% → 83.33% de 6000ms = 5000ms
              // 
              // MAS: Como elementos têm fade-in de 700ms, antecipamos 350ms (metade)
              // para que COMPLETEM quando linha CRUZAR (não quando começam)
              const timings = {
                1: { number: 650, title: 650, description: 850 },   // 1000 - 350 = 650ms
                2: { number: 2650, title: 2650, description: 2850 }, // 3000 - 350 = 2650ms
                3: { number: 4650, title: 4650, description: 4850 }  // 5000 - 350 = 4650ms
              };
              
              const timing = timings[step.display_order as keyof typeof timings];
              
              return (
                <div 
                  key={step.display_order} 
                  className="flex flex-col items-center text-center relative"
                >
                  {/* Número quadrado com animação premium - aparece junto com o título */}
                  <div 
                    className="relative z-10 bg-[#077124] w-16 h-16 rounded-lg flex items-center justify-center mb-8 transition-all duration-700 ease-out"
                    style={{
                      opacity: howItWorksVisible ? 1 : 0,
                      transform: howItWorksVisible ? 'scale(1)' : 'scale(0.7)',
                      transitionDelay: `${timing.number}ms`
                    }}
                  >
                    <span className="text-white text-3xl font-bold">{step.display_order}</span>
                  </div>
                  
                  {/* Título com fade-in - aparece junto com o número */}
                  <h3 
                    className="text-white text-xl font-bold mb-4 transition-all duration-700 ease-out"
                    style={{
                      opacity: howItWorksVisible ? 1 : 0,
                      transform: howItWorksVisible ? 'translateY(0)' : 'translateY(10px)',
                      transitionDelay: `${timing.title}ms`
                    }}
                  >
                    {step.title}
                  </h3>
                  
                  {/* Descrição com fade-in - aparece 200ms depois */}
                  <div 
                    className="text-gray-300 text-base leading-relaxed transition-all duration-700 ease-out"
                    style={{
                      opacity: howItWorksVisible ? 1 : 0,
                      transform: howItWorksVisible ? 'translateY(0)' : 'translateY(10px)',
                      transitionDelay: `${timing.description}ms`
                    }}
                  >
                    {renderTextWithParagraphs(step.description || '')}
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* OUR PARTNERS SECTION */}
      <section id="partners" className="section-partners">
        <div className="section-intro">
          <h2 className="text-white text-center text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold mb-4"
              style={{ 
                textShadow: '0 2px 16px rgba(0,0,0,0.4)',
                letterSpacing: '-0.02em',
                fontWeight: '600'
              }}>
            Our Partners
          </h2>
          <p className="text-gray-400 text-center text-base sm:text-base md:text-lg lg:text-lg mb-12 px-4 font-normal leading-relaxed"
             style={{ 
               textShadow: '0 1px 8px rgba(0,0,0,0.3)',
               letterSpacing: '-0.01em',
               fontWeight: '400'
             }}>
            Don&apos;t just take our word for it, take theirs.
          </p>
        </div>

        {isLoadingTestimonials ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-[#10b981] border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-400 text-sm">Loading testimonials...</p>
            </div>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400">No testimonials available at the moment.</p>
          </div>
        ) : (
          <div className="partners-slideshow">
            <Swiper
              modules={[Pagination, Autoplay, EffectCoverflow]}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={2.2}
              loop={true}
              autoplay={{
                delay: 7000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              speed={400}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
                slideShadows: false,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  coverflowEffect: {
                    modifier: 1,
                  },
                },
                768: {
                  slidesPerView: 1.8,
                  coverflowEffect: {
                    modifier: 2,
                  },
                },
                1024: {
                  slidesPerView: 2.2,
                  coverflowEffect: {
                    modifier: 2.5,
                  },
                },
              }}
              className="swiper-testimonials"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <div className="testimonial-item">
                    <div className="testimonial-image">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={255}
                          height={255}
                          className="rounded-full"
                        />
                    </div>
                    <div className="testimonial-content">
                      <h3 className="testimonial-name">{testimonial.name}</h3>
                      {testimonial.meta && (
                        <p className="testimonial-meta">{testimonial.meta}</p>
                      )}
                      <p className="testimonial-quote">
                        &quot;{testimonial.quote}&quot;
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="relative w-full py-24 md:py-32 px-4" style={{ backgroundColor: '#0e0f11' }}>
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-white text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold mb-4"
                style={{ 
                  textShadow: '0 2px 16px rgba(0,0,0,0.4)',
                  letterSpacing: '-0.02em',
                  fontWeight: '600'
                }}>
              Frequently Asked Questions
            </h2>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-0">
            {faqData.map((faq, index) => (
              <div 
                key={index}
                className="group border-b border-white/10 transition-all duration-300"
              >
                {/* Question Button */}
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
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
                    openFaqIndex === index ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'
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
      </section>

      {/* LATEST NEWS SECTION */}
      <section id="news" className="relative w-full py-12 md:py-16 px-3 md:px-4" style={{ backgroundColor: '#0e0f12' }}>
        <div className="w-full py-8 md:py-12 px-4">
            <h2 className="text-white text-center text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold mb-4"
                style={{ 
                  textShadow: '0 2px 16px rgba(0,0,0,0.4)',
                  letterSpacing: '-0.02em',
                  fontWeight: '600'
                }}>
              Latest News & Updates
            </h2>
            <p className="text-gray-400 text-center text-base sm:text-base md:text-lg lg:text-lg mb-12 px-4 font-normal leading-relaxed"
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
                  className="group relative bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-[#077124] transition-all duration-300 hover:-translate-y-2"
                >
                  {/* Image */}
                  <Link href={post.url} className="block overflow-hidden">
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.alt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </Link>

                  {/* Content */}
            <div className="p-8">
                    {/* Date & Category */}
                    <div className="flex items-center gap-3 mb-3">
                      <time className="text-xs text-zinc-400 font-medium">{post.date}</time>
                      <span className="text-xs text-zinc-600">•</span>
                      <span className="text-xs text-[#077124] font-semibold uppercase tracking-wide">{post.category}</span>
            </div>

                    {/* Title */}
                    <Link href={post.url}>
                      <h3 className="text-white text-base font-semibold mb-4 line-clamp-2 group-hover:text-[#077124] transition-colors duration-300 leading-snug">
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
                className="relative group/btn2 inline-flex items-center justify-center gap-2 overflow-hidden bg-white/10 border border-white/20 text-white font-semibold px-8 py-4 rounded-full text-base transition-all duration-300 hover:bg-white/15 hover:border-white/30 active:scale-[0.98] backdrop-blur-sm"
              >
                <span className="relative z-10 tracking-wide drop-shadow-lg">Read More</span>
                <ArrowRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover/btn2:translate-x-1 drop-shadow-lg" strokeWidth={2} />
              </Link>
            </div>
        </div>
      </section>

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
