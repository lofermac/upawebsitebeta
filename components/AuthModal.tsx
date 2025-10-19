'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'register';
  onSuccess?: () => void;
}

export default function AuthModal({ isOpen, onClose, initialTab = 'login', onSuccess }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab);

  // Atualiza tab quando initialTab muda
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // Bloqueia scroll do body e previne scroll ao abrir
  useEffect(() => {
    if (isOpen) {
      // Previne scroll ao abrir o modal
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    }

    return () => {
      // Restaura scroll ao fechar
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 overflow-y-auto">
      {/* Overlay - Tema escuro - SEM onClick para não fechar ao clicar fora */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-fade-in"
      />

      {/* Modal Container - Tema escuro premium - MESMA LARGURA para Login e Register */}
      <div className="relative w-full max-w-3xl my-8 animate-scale-in">
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
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#077124]/[0.04] rounded-full blur-[120px] animate-pulse-slow"></div>
          
          {/* Noise texture */}
          <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none rounded-[2rem]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
          
          {/* Close Button - Verde */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-50 p-2 rounded-full bg-[#077124] text-white hover:bg-[#055a1c] transition-colors duration-200 shadow-lg"
            aria-label="Close modal"
            type="button"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Content */}
          <div className="relative z-10 p-6 md:p-8">
            {/* Tabs - Tema escuro */}
            <div className="flex items-center justify-center gap-3 mb-5">
              {/* Login Tab */}
              <button
                onClick={() => setActiveTab('login')}
                className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                  activeTab === 'login'
                    ? 'bg-gradient-to-b from-[#088929] to-[#055a1c] text-white shadow-lg scale-105'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/[0.08]'
                }`}
              >
                Log In
              </button>

              {/* OR Divider */}
              <span className="text-gray-500 font-medium text-sm">OR</span>

              {/* Register Tab */}
              <button
                onClick={() => setActiveTab('register')}
                className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                  activeTab === 'register'
                    ? 'bg-gradient-to-b from-[#088929] to-[#055a1c] text-white shadow-lg scale-105'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/[0.08]'
                }`}
              >
                Register
              </button>
            </div>

            {/* Form Content */}
            <div className="transition-all duration-300">
              {activeTab === 'login' ? (
                <LoginForm
                  onSwitchToRegister={() => setActiveTab('register')}
                  onSuccess={onSuccess || onClose}
                />
              ) : (
                <RegisterForm
                  onSwitchToLogin={() => setActiveTab('login')}
                  onSuccess={onSuccess || onClose}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

