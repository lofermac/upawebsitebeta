'use client'

import Header from "./components/Header";
import Footer from "./components/Footer";
import { MessageCircle, Search, ThumbsUp, Users, Star, Award, Phone, ArrowRight, Zap } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Header />
      {/* HERO SECTION */}
      <section className="relative bg-black w-full h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* PERFECT Premium Background - $10,000 Design */}
        <div className="pointer-events-none absolute inset-0 z-0">
          {/* Background Foundation */}
          <div className="absolute inset-0 w-full h-full" style={{
            background: 'radial-gradient(ellipse at center, #0a0d1a 0%, #000000 70%)',
            zIndex: 1
          }} />
          
          {/* Hexagonal Grid - Increased Visibility */}
          <svg className="absolute inset-0 w-full h-full" style={{zIndex: 2}} width="100%" height="100%">
            <defs>
              <pattern id="premium-hex-grid" patternUnits="userSpaceOnUse" width="140" height="121.2">
                <polygon 
                  points="70,0 122.5,35 122.5,105 70,140 17.5,105 17.5,35" 
                  fill="none" 
                  stroke="rgba(255,255,255,0.20)" 
                  strokeWidth="1.5"
                  filter="drop-shadow(0 0 8px rgba(255,255,255,0.2))"
                />
              </pattern>
              <linearGradient id="fade-edges" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="15%" stopColor="black" />
                <stop offset="85%" stopColor="black" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#premium-hex-grid)" mask="url(#fade-edges)" />
          </svg>
          
          {/* Center Circle - The Focal Point */}
          <div className="absolute inset-0 flex items-center justify-center" style={{zIndex: 3}}>
            {/* Outer circle - DOMINANT */}
            <div 
              className="w-[700px] h-[700px] rounded-full border-[3px] border-white opacity-35 animate-rotate-obvious"
              style={{
                filter: 'drop-shadow(0 0 60px rgba(255,255,255,0.6)) drop-shadow(0 0 120px rgba(255,255,255,0.3))',
                willChange: 'transform'
              }}
            />
            {/* Middle circle - opposite rotation */}
            <div 
              className="absolute w-[500px] h-[500px] rounded-full border-2 border-white opacity-25 animate-rotate-reverse-obvious"
              style={{
                filter: 'drop-shadow(0 0 40px rgba(255,255,255,0.4))',
                willChange: 'transform'
              }}
            />
            {/* Innermost circle */}
            <div 
              className="absolute w-[350px] h-[350px] rounded-full border-[1.5px] border-white opacity-18 animate-rotate-obvious"
              style={{
                filter: 'drop-shadow(0 0 25px rgba(255,255,255,0.3))',
                willChange: 'transform'
              }}
            />
          </div>
          
          {/* Perfect X - Diagonal Accent Lines */}
          <svg className="absolute inset-0 w-full h-full" style={{zIndex: 4}} width="100%" height="100%">
            {/* Top-left to center */}
            <line x1="0%" y1="0%" x2="45%" y2="45%" 
                  stroke="rgba(255,255,255,0.25)" strokeWidth="2" 
                  filter="drop-shadow(0 0 40px rgba(255,255,255,0.5)) drop-shadow(0 0 80px rgba(255,255,255,0.25))" />
            {/* Top-right to center */}
            <line x1="100%" y1="0%" x2="55%" y2="45%" 
                  stroke="rgba(255,255,255,0.25)" strokeWidth="2" 
                  filter="drop-shadow(0 0 40px rgba(255,255,255,0.5)) drop-shadow(0 0 80px rgba(255,255,255,0.25))" />
            {/* Bottom-left to center */}
            <line x1="0%" y1="100%" x2="45%" y2="55%" 
                  stroke="rgba(255,255,255,0.25)" strokeWidth="2" 
                  filter="drop-shadow(0 0 40px rgba(255,255,255,0.5)) drop-shadow(0 0 80px rgba(255,255,255,0.25))" />
            {/* Bottom-right to center */}
            <line x1="100%" y1="100%" x2="55%" y2="55%" 
                  stroke="rgba(255,255,255,0.25)" strokeWidth="2" 
                  filter="drop-shadow(0 0 40px rgba(255,255,255,0.5)) drop-shadow(0 0 80px rgba(255,255,255,0.25))" />
          </svg>
          
          {/* Poker Suits - Strategic Placement */}
          <div className="absolute inset-0 flex items-center justify-center" style={{zIndex: 5}}>
            {/* Spade at 45° (top-right) */}
            <div 
              className="absolute text-white text-[60px] opacity-40 animate-pulse-suit-glow-primary"
              style={{
                top: '20%', right: '20%',
                filter: 'drop-shadow(0 0 25px rgba(255,255,255,0.5))',
                animationDelay: '0s',
                willChange: 'opacity, filter'
              }}
            >♠</div>
            {/* Heart at 135° (top-left) */}
            <div 
              className="absolute text-white text-[60px] opacity-35 animate-pulse-suit-glow-secondary"
              style={{
                top: '20%', left: '20%',
                filter: 'drop-shadow(0 0 25px rgba(255,255,255,0.5))',
                animationDelay: '1s',
                willChange: 'opacity, filter'
              }}
            >♥</div>
            {/* Diamond at 225° (bottom-left) */}
            <div 
              className="absolute text-white text-[60px] opacity-35 animate-pulse-suit-glow-secondary"
              style={{
                bottom: '20%', left: '20%',
                filter: 'drop-shadow(0 0 25px rgba(255,255,255,0.5))',
                animationDelay: '2s',
                willChange: 'opacity, filter'
              }}
            >♦</div>
            {/* Club at 315° (bottom-right) */}
            <div 
              className="absolute text-white text-[60px] opacity-38 animate-pulse-suit-glow-tertiary"
              style={{
                bottom: '20%', right: '20%',
                filter: 'drop-shadow(0 0 25px rgba(255,255,255,0.5))',
                animationDelay: '3s',
                willChange: 'opacity, filter'
              }}
            >♣</div>
          </div>
          
          {/* Glowing Nodes - 12 Perfect Circle */}
          <div className="absolute inset-0 flex items-center justify-center" style={{zIndex: 6}}>
            {Array.from({length: 12}).map((_, i) => {
              const angle = (i * 30) * (Math.PI / 180); // 30° increments
              const radius = 350;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              
              return (
                <div
                  key={i}
                  className="absolute w-[7px] h-[7px] bg-white opacity-100 rounded-full animate-pulse-node-intense"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: 'translate(-50%, -50%)',
                    boxShadow: '0 0 20px rgba(255,255,255,1.0), 0 0 40px rgba(255,255,255,0.6), 0 0 60px rgba(255,255,255,0.3)',
                    animationDelay: `${i * 0.125}s`,
                    willChange: 'opacity'
                  }}
                />
              );
            })}
          </div>
          
          {/* Center Radial Glow - STRONGER */}
          <div className="absolute inset-0 w-full h-full" style={{
            background: 'radial-gradient(circle 800px at center, rgba(255,255,255,0.15) 0%, transparent 100%)',
            zIndex: 7
          }} />
          
          {/* Noise Texture Overlay */}
          <div className="absolute inset-0 w-full h-full pointer-events-none opacity-3" style={{
            background: 'url("data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.03\'/%3E%3C/svg%3E")',
            zIndex: 8
          }} />
          
          {/* Edge Vignette - Reduced */}
          <div className="absolute inset-0 w-full h-full" style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
            zIndex: 9
          }} />
        </div>
        <div className="relative z-10 w-full flex flex-col items-center">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="animate-fade-up-delay-800">
              <div className="text-4xl md:text-5xl font-black tracking-wider bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent" 
                   style={{ textShadow: '0 0 40px rgba(255,255,255,0.3), 0 4px 12px rgba(0,0,0,0.8)' }}>
                EXCLUSIVE DEALS
              </div>
              <div className="text-5xl md:text-6xl font-black tracking-tighter bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent mt-2">
                On the World&apos;s Best Online Poker Sites
              </div>
            </h1>
          </div>
          
          <p className="text-2xl text-gray-300 font-normal tracking-wide mt-8 mb-24 max-w-2xl mx-auto text-center animate-fade-up-delay-1200" 
             style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
            Maximize your profits with exclusive rakeback deals
          </p>

          <div className="flex flex-col md:flex-row gap-6 md:gap-10 w-full max-w-5xl justify-center">
            <div className="relative flex-1 min-w-[420px] bg-white/10 backdrop-blur-2xl border border-white/25 rounded-3xl flex flex-col items-center p-12 transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) hover:bg-white/12 hover:border-white/30 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(0,0,0,0.6),0_0_1px_rgba(255,255,255,0.2)_inset] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent space-y-10 animate-fade-up-delay-1400" 
                 style={{
                   boxShadow: '0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 0 rgba(255,255,255,0.1)'
                 }}>
              <span className="text-white font-bold text-xl tracking-tight" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>Contact Us</span>
              <div className="flex flex-row gap-5 w-full justify-center">
                <a href="#" className="flex items-center gap-3 px-12 py-5 bg-white text-gray-900 font-bold text-lg rounded-full transition-all duration-300 ease-out hover:bg-gray-50 hover:scale-[1.02] hover:ring-1 hover:ring-black/5 active:scale-[0.98] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]"
                   style={{
                     boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.8), inset 0 -1px 0 0 rgba(0,0,0,0.05), 0 2px 8px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.12)'
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.boxShadow = 'inset 0 1px 0 0 rgba(255,255,255,0.8), inset 0 -1px 0 0 rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.12), 0 12px 32px rgba(0,0,0,0.16)';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.boxShadow = 'inset 0 1px 0 0 rgba(255,255,255,0.8), inset 0 -1px 0 0 rgba(0,0,0,0.05), 0 2px 8px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.12)';
                   }}>
                  <Phone className="w-6 h-6 text-gray-900" strokeWidth={2} /> WhatsApp
                </a>
                <a href="#discord" className="flex items-center gap-3 px-12 py-5 bg-white text-gray-900 font-bold text-lg rounded-full transition-all duration-300 ease-out hover:bg-gray-50 hover:scale-[1.02] hover:ring-1 hover:ring-black/5 active:scale-[0.98] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]"
                   style={{
                     boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.8), inset 0 -1px 0 0 rgba(0,0,0,0.05), 0 2px 8px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.12)'
                   }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.boxShadow = 'inset 0 1px 0 0 rgba(255,255,255,0.8), inset 0 -1px 0 0 rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.12), 0 12px 32px rgba(0,0,0,0.16)';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.boxShadow = 'inset 0 1px 0 0 rgba(255,255,255,0.8), inset 0 -1px 0 0 rgba(0,0,0,0.05), 0 2px 8px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.12)';
                   }}>
                  <MessageCircle className="w-6 h-6 text-gray-900" strokeWidth={2} /> Discord
                </a>
              </div>
            </div>
            <div className="relative flex-1 min-w-[420px] bg-white/10 backdrop-blur-2xl border border-white/25 rounded-3xl flex flex-col items-center p-12 transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) hover:bg-white/12 hover:border-white/30 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(0,0,0,0.6),0_0_1px_rgba(255,255,255,0.2)_inset] before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent space-y-10 animate-fade-up-delay-1600"
                 style={{
                   boxShadow: '0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 0 rgba(255,255,255,0.1)'
                 }}>
              <span className="text-white font-bold text-xl tracking-tight" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>Find the best deal for you!</span>
              <a href="#deals" className="flex items-center gap-3 px-12 py-5 bg-white text-gray-900 font-bold text-lg rounded-full transition-all duration-300 ease-out hover:bg-gray-50 hover:scale-[1.02] hover:ring-1 hover:ring-black/5 active:scale-[0.98] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]"
                 style={{
                   boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.8), inset 0 -1px 0 0 rgba(0,0,0,0.05), 0 2px 8px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.12)'
                 }}
                 onMouseEnter={(e) => {
                   e.currentTarget.style.boxShadow = 'inset 0 1px 0 0 rgba(255,255,255,0.8), inset 0 -1px 0 0 rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.12), 0 12px 32px rgba(0,0,0,0.16)';
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.boxShadow = 'inset 0 1px 0 0 rgba(255,255,255,0.8), inset 0 -1px 0 0 rgba(0,0,0,0.05), 0 2px 8px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.12)';
                 }}>
                <Search className="w-6 h-6 text-gray-900" strokeWidth={2} /> View Deals
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* WHO ARE WE SECTION */}
      <section className="bg-[#0f1729] w-full py-20 md:py-24 px-4 mb-24">
        <h2 className="text-white text-center text-4xl font-bold mb-12">Who are Universal Poker?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-8">
          <div className="bg-[#13203a] rounded-2xl p-8 flex flex-col justify-between min-h-[260px] shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div>
              <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-3"><Users className="w-8 h-8 text-green-400" /> Trusted Community</h3>
              <p className="text-gray-300">We connect thousands of poker players to the best deals and exclusive rakeback offers worldwide.</p>
            </div>
            <a href="#deals" className="mt-8 inline-block bg-[#84cc16] text-black font-bold rounded-full px-6 py-3 text-center hover:bg-green-500 transition-all duration-200">VIEW DEALS</a>
          </div>
          <div className="bg-[#13203a] rounded-2xl p-8 flex flex-col justify-between min-h-[260px] shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div>
              <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-3"><ThumbsUp className="w-8 h-8 text-green-400" /> Best Offers</h3>
              <p className="text-gray-300">Our team negotiates directly with poker rooms to bring you the highest value and safest deals.</p>
            </div>
            <a href="#deals" className="mt-8 inline-block bg-[#84cc16] text-black font-bold rounded-full px-6 py-3 text-center hover:bg-green-500 transition-all duration-200">VIEW DEALS</a>
          </div>
          <div className="bg-[#13203a] rounded-2xl p-8 flex flex-col justify-between min-h-[260px] shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div>
              <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-3"><Star className="w-8 h-8 text-green-400" /> Player Support</h3>
              <p className="text-gray-300">We offer personalized support to help you choose and join the right poker room for your needs.</p>
            </div>
            <a href="#deals" className="mt-8 inline-block bg-[#84cc16] text-black font-bold rounded-full px-6 py-3 text-center hover:bg-green-500 transition-all duration-200">VIEW DEALS</a>
          </div>
          <div className="bg-[#13203a] rounded-2xl p-8 flex flex-col justify-between min-h-[260px] shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div>
              <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-3"><Award className="w-8 h-8 text-green-400" /> Proven Results</h3>
              <p className="text-gray-300">Our partners and players consistently rate us as the top affiliate for online poker deals.</p>
            </div>
            <a href="#deals" className="mt-8 inline-block bg-[#84cc16] text-black font-bold rounded-full px-6 py-3 text-center hover:bg-green-500 transition-all duration-200">VIEW DEALS</a>
          </div>
        </div>
        <div className="text-center max-w-2xl mx-auto text-white text-lg mt-8">
          We understand finding the perfect deal might be difficult, but that&apos;s where we come in! <a href="#survey" className="text-[#84cc16] font-bold underline hover:text-green-400 transition-all duration-200">Take our survey</a> to find the best deal for you!
        </div>
      </section>
      {/* PARTNERS/TESTIMONIALS SECTION */}
      <section className="bg-black w-full py-24 px-4 flex flex-col items-center">
        <h2 className="text-white text-center text-4xl font-bold mb-2">Our Partners</h2>
        <p className="text-gray-400 text-center mb-12">Don&apos;t just take our word for it, take theirs.</p>
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
          {/* Left: Testimonial */}
          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="bg-[#1a1a1a] rounded-2xl p-8 max-w-xs shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-white font-bold text-lg mb-1">Jane Doe</div>
              <div className="text-gray-400 text-sm mb-2">@janedoe</div>
              <p className="text-gray-400 mt-2">&quot;Universal Poker helped me find the best rakeback deal. Super easy and trustworthy!&quot;</p>
            </div>
          </div>
          {/* Center: Logo/Image */}
          <div className="flex flex-col items-center">
            <div className="w-48 h-48 rounded-full bg-[#0f1729] flex items-center justify-center shadow-xl">
              <Zap className="w-24 h-24 text-green-400" />
            </div>
          </div>
          {/* Right: Testimonial */}
          <div className="flex flex-col items-center md:items-start gap-6">
            <div className="bg-[#1a1a1a] rounded-2xl p-8 max-w-xs shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col items-center">
              <Image src="/avatar.png" alt="John Smith" className="w-20 h-20 rounded-full mb-3" width={80} height={80} />
              <div className="text-white font-bold text-lg mb-1">John Smith</div>
              <div className="text-gray-400 text-sm mb-2">Professional Player</div>
              <p className="text-gray-400 mt-2 text-center">&quot;The support team was amazing and the deals are unbeatable!&quot;</p>
            </div>
          </div>
        </div>
      </section>
      {/* POKER ROOMS DEALS SECTION */}
      <section id="deals" className="w-full py-24 px-4 bg-[#18181b]">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          {/* Card 1 */}
          <div className="flex flex-col md:flex-row items-center bg-[#c2410c] rounded-2xl min-h-[200px] p-8 md:px-12 gap-8 shadow-xl hover:scale-[1.02] hover:shadow-2xl transition-transform duration-300">
            <Image src="/ggpoker-logo.png" alt="GGPoker" className="w-32 h-32 rounded-xl bg-white p-2" width={128} height={128} />
            <div className="flex-1 text-white text-2xl font-bold">GGPoker: Up to 60% Rakeback + Exclusive Promotions</div>
            <div className="flex flex-col gap-3 min-w-[180px]">
              <a href="#" className="bg-white text-[#c2410c] font-bold rounded-full px-7 py-3 text-center text-lg hover:bg-orange-200 transition-all duration-200">JOIN DEAL</a>
              <a href="#" className="bg-white text-[#c2410c] font-bold rounded-full px-7 py-3 text-center text-lg hover:bg-orange-200 transition-all duration-200">LEARN MORE</a>
            </div>
            <div className="w-full text-xs text-white/80 mt-4 md:mt-0 md:w-auto">*Terms and conditions apply.</div>
          </div>
          {/* Card 2 */}
          <div className="flex flex-col md:flex-row items-center bg-[#0369a1] rounded-2xl min-h-[200px] p-8 md:px-12 gap-8 shadow-xl hover:scale-[1.02] hover:shadow-2xl transition-transform duration-300">
            <Image src="/pokerstars-logo.png" alt="PokerStars" className="w-32 h-32 rounded-xl bg-white p-2" width={128} height={128} />
            <div className="flex-1 text-white text-2xl font-bold">PokerStars: Private Rakeback Deals for High Volume Players</div>
            <div className="flex flex-col gap-3 min-w-[180px]">
              <a href="#" className="bg-white text-[#0369a1] font-bold rounded-full px-7 py-3 text-center text-lg hover:bg-blue-200 transition-all duration-200">JOIN DEAL</a>
              <a href="#" className="bg-white text-[#0369a1] font-bold rounded-full px-7 py-3 text-center text-lg hover:bg-blue-200 transition-all duration-200">LEARN MORE</a>
            </div>
            <div className="w-full text-xs text-white/80 mt-4 md:mt-0 md:w-auto">*Contact us for eligibility.</div>
          </div>
          {/* Card 3 */}
          <div className="flex flex-col md:flex-row items-center bg-[#7f1d1d] rounded-2xl min-h-[200px] p-8 md:px-12 gap-8 shadow-xl hover:scale-[1.02] hover:shadow-2xl transition-transform duration-300">
            <Image src="/888poker-logo.png" alt="888poker" className="w-32 h-32 rounded-xl bg-white p-2" width={128} height={128} />
            <div className="flex-1 text-white text-2xl font-bold">888poker: Up to 40% Rakeback + Welcome Bonus</div>
            <div className="flex flex-col gap-3 min-w-[180px]">
              <a href="#" className="bg-white text-[#7f1d1d] font-bold rounded-full px-7 py-3 text-center text-lg hover:bg-red-200 transition-all duration-200">JOIN DEAL</a>
              <a href="#" className="bg-white text-[#7f1d1d] font-bold rounded-full px-7 py-3 text-center text-lg hover:bg-red-200 transition-all duration-200">LEARN MORE</a>
            </div>
            <div className="w-full text-xs text-white/80 mt-4 md:mt-0 md:w-auto">*Bonus subject to change.</div>
          </div>
        </div>
      </section>
      {/* LATEST NEWS SECTION */}
      <section className="w-full py-24 px-4 bg-[#0f1729]">
        <h2 className="text-white text-center text-4xl font-bold mb-12">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* News Card 1 */}
          <div className="bg-[#18181b] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 hover:scale-105">
            <Image src="/news1.jpg" alt="News 1" className="w-full h-56 object-cover rounded-t-2xl" width={600} height={224} />
            <div className="p-6">
              <div className="text-white text-xs mb-2">Oct 2025</div>
              <div className="text-white font-bold text-xl mb-3">Universal Poker launches new exclusive deals!</div>
              <a href="#" className="flex items-center gap-1 text-[#ea580c] font-bold hover:underline transition-all duration-200">Read More <ArrowRight className="w-4 h-4" /></a>
            </div>
          </div>
          {/* News Card 2 */}
          <div className="bg-[#18181b] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 hover:scale-105">
            <Image src="/news2.jpg" alt="News 2" className="w-full h-56 object-cover rounded-t-2xl" width={600} height={224} />
            <div className="p-6">
              <div className="text-white text-xs mb-2">Sep 2025</div>
              <div className="text-white font-bold text-xl mb-3">Interview with top online poker pros</div>
              <a href="#" className="flex items-center gap-1 text-[#ea580c] font-bold hover:underline transition-all duration-200">Read More <ArrowRight className="w-4 h-4" /></a>
            </div>
          </div>
          {/* News Card 3 */}
          <div className="bg-[#18181b] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 hover:scale-105">
            <Image src="/news3.jpg" alt="News 3" className="w-full h-56 object-cover rounded-t-2xl" width={600} height={224} />
            <div className="p-6">
              <div className="text-white text-xs mb-2">Aug 2025</div>
              <div className="text-white font-bold text-xl mb-3">How to maximize your rakeback in 2025</div>
              <a href="#" className="flex items-center gap-1 text-[#ea580c] font-bold hover:underline transition-all duration-200">Read More <ArrowRight className="w-4 h-4" /></a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
