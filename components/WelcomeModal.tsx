'use client';

import { useEffect } from 'react';
import { X, LayoutDashboard, CheckCircle } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
}

export default function WelcomeModal({ isOpen, onClose, userName }: WelcomeModalProps) {

  // Bloqueia scroll do body quando modal está aberto
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    }

    return () => {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    };
  }, [isOpen]);

  const handleNavigation = async (path: string) => {
    console.log('🎯 ============================================');
    console.log('🎯 WelcomeModal - INICIANDO NAVEGAÇÃO');
    console.log('🎯 Path destino:', path);
    console.log('🎯 ============================================');
    
    // Listar TODOS os cookies antes de navegar
    console.log('🍪 TODOS os cookies antes de navegar:');
    document.cookie.split(';').forEach(cookie => {
      console.log('🍪', cookie.trim());
    });
    
    onClose();
    
    // Aguardar mais tempo para garantir que os cookies estão salvos
    console.log('🎯 Aguardando 1000ms para cookies serem salvos...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('🍪 TODOS os cookies APÓS aguardar:');
    document.cookie.split(';').forEach(cookie => {
      console.log('🍪', cookie.trim());
    });
    
    console.log('🎯 Redirecionando via window.location.href para:', path);
    console.log('🎯 ============================================');
    
    // Usar window.location.href para forçar reload completo com cookies
    window.location.href = path;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md animate-fade-in" />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl animate-scale-in">
        <div className="relative group/card">
          {/* Background com gradiente escuro */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#121212] to-[#0d0d0d] rounded-[2rem] transition-all duration-700"></div>
          
          {/* Border effect */}
          <div className="absolute inset-0 rounded-[2rem] border border-white/[0.06] shadow-2xl shadow-black/50 pointer-events-none"></div>
          
          {/* Inner glow effect */}
          <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.025)]"></div>
          
          {/* Top light rim */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent rounded-t-[2rem]"></div>
          
          {/* Ambient glow effect verde */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#077124]/[0.06] rounded-full blur-[120px] animate-pulse-slow"></div>
          
          {/* Noise texture */}
          <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none rounded-[2rem]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
          
          {/* Close Button - Redireciona para homepage */}
          <button
            onClick={() => {
              console.log('🎯 WelcomeModal: Fechando e indo para homepage');
              onClose();
              window.location.href = '/';
            }}
            className="absolute top-6 right-6 z-50 p-2 rounded-full bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/[0.08] transition-all duration-200"
            aria-label="Close modal"
            type="button"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Content */}
          <div className="relative z-10 p-10 md:p-12">
            {/* Icon de sucesso - CheckCircle */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-[#077124] rounded-full blur-2xl opacity-40 animate-pulse-slow"></div>
                <div className="relative p-4 rounded-full bg-gradient-to-b from-[#088929] to-[#055a1c]">
                  <CheckCircle className="w-10 h-10 text-white" strokeWidth={2} />
                </div>
              </div>
            </div>

            {/* Welcome Message */}
            <div className="text-center mb-10">
              <h1 
                className="text-[1.75rem] sm:text-3xl md:text-4xl font-bold text-white mb-4"
                style={{ 
                  textShadow: '0 2px 16px rgba(0,0,0,0.4)',
                  letterSpacing: '-0.02em',
                  fontWeight: '600'
                }}
              >
                Welcome{userName ? `, ${userName}` : ''}!
              </h1>
              <div className="text-base sm:text-lg md:text-xl text-gray-400 font-normal max-w-xl mx-auto space-y-2">
                <p 
                  style={{ 
                    textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                    letterSpacing: '-0.01em',
                    fontWeight: '400'
                  }}
                >
                  Your account has been created successfully.
                </p>
                <p 
                  style={{ 
                    textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                    letterSpacing: '-0.01em',
                    fontWeight: '400'
                  }}
                >
                  What would you like to do next?
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Dashboard Button */}
              <button
                onClick={() => handleNavigation('/player/dashboard')}
                className="group relative overflow-hidden rounded-2xl p-8 transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] to-[#121212] border border-white/[0.08] rounded-2xl transition-all duration-300 group-hover:border-[#077124]/30"></div>
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl bg-gradient-to-br from-[#077124]/10 to-transparent"></div>
                
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="p-4 rounded-xl bg-[#077124]/10 border border-[#077124]/20 mb-4 group-hover:bg-[#077124]/20 transition-colors duration-300">
                    <LayoutDashboard className="w-8 h-8 text-[#077124]" strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                    Go to Dashboard
                  </h3>
                  <p className="text-sm text-gray-400 font-normal">
                    View your stats, earnings, and account settings
                  </p>
                </div>
              </button>

              {/* View Deals Button */}
              <button
                onClick={() => handleNavigation('/deals')}
                className="group relative overflow-hidden rounded-2xl p-8 transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] to-[#121212] border border-white/[0.08] rounded-2xl transition-all duration-300 group-hover:border-[#077124]/30"></div>
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl bg-gradient-to-br from-[#077124]/10 to-transparent"></div>
                
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="p-4 rounded-xl bg-[#077124]/10 border border-[#077124]/20 mb-4 group-hover:bg-[#077124]/20 transition-colors duration-300">
                    <svg className="w-8 h-8 text-[#077124]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                    View Deals
                  </h3>
                  <p className="text-sm text-gray-400 font-normal">
                    Browse available affiliate deals and start earning
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

