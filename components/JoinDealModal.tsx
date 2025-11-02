'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { requestDeal } from '@/lib/api/playerApi';
import { showToast } from '@/lib/toast';

interface JoinDealModalProps {
  isOpen: boolean;
  onClose: () => void;
  dealName: string; // Nome do deal (ex: "888Poker")
  dealId: number; // ID do deal para API
}

export default function JoinDealModal({ isOpen, onClose, dealName, dealId }: JoinDealModalProps) {
  const [formData, setFormData] = useState({
    pokerUsername: '',
    pokerEmail: '',
    consentShare: false,
    agreeTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Bloqueia scroll do body e previne scroll ao abrir
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

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validação
    const newErrors: Record<string, string> = {};

    if (!formData.pokerUsername.trim()) {
      newErrors.pokerUsername = `${dealName} Username is required`;
    }

    if (!formData.pokerEmail.trim()) {
      newErrors.pokerEmail = `${dealName} Email is required`;
    } else if (!validateEmail(formData.pokerEmail)) {
      newErrors.pokerEmail = 'Invalid email format';
    }

    if (!formData.consentShare) {
      newErrors.consentShare = 'You must give consent to share your details';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = `You must agree to the ${dealName} Terms & Conditions`;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submeter aplicação
    setIsLoading(true);
    try {
      const result = await requestDeal({
        dealId: dealId,
        platformUsername: formData.pokerUsername,
        platformEmail: formData.pokerEmail,
      });

      if (result.success) {
        // Sucesso - mostrar mensagem e fechar modal
        showToast.success(result.message || 'Application submitted successfully! Our team will review it shortly.');
        
        // Reset form
        setFormData({
          pokerUsername: '',
          pokerEmail: '',
          consentShare: false,
          agreeTerms: false,
        });
        
        onClose();
      } else {
        // Erro da API
        showToast.error(result.error || 'Failed to submit application. Please try again.');
      }
    } catch (error: unknown) {
      console.error('Submit error:', error);
      showToast.error(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 overflow-y-auto">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md animate-fade-in" />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl my-8 animate-scale-in">
        <div className="relative group/card">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#121212] to-[#0d0d0d] rounded-[2rem] transition-all duration-700"></div>
          
          {/* Border effect */}
          <div className="absolute inset-0 rounded-[2rem] border border-white/[0.06] shadow-2xl shadow-black/50 pointer-events-none"></div>
          
          {/* Inner glow */}
          <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.025)]"></div>
          
          {/* Top light rim */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent rounded-t-[2rem]"></div>
          
          {/* Ambient glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#077124]/[0.04] rounded-full blur-[120px] animate-pulse-slow"></div>
          
          {/* Noise texture */}
          <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none rounded-[2rem]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-50 p-2 rounded-full bg-[#077124] text-white hover:bg-[#055a1c] transition-colors duration-200 shadow-lg"
            aria-label="Close modal"
            type="button"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Content */}
          <div className="relative z-10 p-8 md:p-10">
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3"
                  style={{ 
                    textShadow: '0 2px 16px rgba(0,0,0,0.4)',
                    letterSpacing: '-0.02em'
                  }}>
                Join Our Deal
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed font-normal">
                Complete the following steps to join our {dealName} deal.
              </p>
            </div>

            {/* Erro geral */}
            {errors.general && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm mb-6">
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1 */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-white/[0.06]">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#077124]/20 border border-[#077124]/40">
                    <span className="text-[#077124] font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight"
                        style={{ 
                          textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                          letterSpacing: '-0.01em'
                        }}>
                      Create A {dealName} Account
                    </h3>
                  </div>
                </div>

                <div className="pl-11">
                  <p className="text-sm text-gray-400 mb-3">
                    <span className="font-semibold text-gray-300">Already have an account?</span> Skip to step 2.
                  </p>
                  
                  <a
                    href={`https://www.${dealName.toLowerCase()}.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <button
                      type="button"
                      className="group relative inline-flex items-center justify-center gap-2 px-8 py-3 text-sm font-bold text-white bg-gradient-to-b from-[#088929] to-[#055a1c] rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.03] active:scale-[0.98]"
                      style={{
                        boxShadow: `
                          0 0 0 1px rgba(255,255,255,0.1),
                          0 1px 3px 0 rgba(0,0,0,0.5),
                          0 4px 12px rgba(7,113,36,0.3),
                          inset 0 1px 1px rgba(255,255,255,0.3)
                        `
                      }}
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#077124] via-[#0a9b30] to-[#077124] rounded-full blur-xl opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>
                      <span className="relative z-10 tracking-wide drop-shadow-lg">
                        Create Account
                      </span>
                    </button>
                  </a>
                </div>
              </div>

              {/* Step 2 */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-white/[0.06]">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#077124]/20 border border-[#077124]/40">
                    <span className="text-[#077124] font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight"
                        style={{ 
                          textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                          letterSpacing: '-0.01em'
                        }}>
                      Apply To Our Deal
                    </h3>
                  </div>
                </div>

                <div className="pl-11 space-y-4">
                  <p className="text-sm text-gray-400">
                    Once you have created your account or if you already have one, send us your details and we&apos;ll see whether we can accept you on our deal.
                  </p>

                  {/* Username Field */}
                  <div className="space-y-2">
                    <label htmlFor="pokerUsername" className="block text-sm font-semibold text-gray-300 tracking-tight">
                      {dealName} Username<span className="text-[#10b981] ml-1">*</span>
                    </label>
                    <div className="relative group/input">
                      <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300 blur-xl bg-[#077124]/10"></div>
                      
                      <input
                        type="text"
                        id="pokerUsername"
                        value={formData.pokerUsername}
                        onChange={(e) => setFormData(prev => ({ ...prev, pokerUsername: e.target.value }))}
                        className={`relative w-full px-4 py-3 bg-black/40 border rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 hover:bg-black/50 ${
                          errors.pokerUsername
                            ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20'
                            : 'border-white/[0.08] focus:border-[#077124]/50 focus:ring-[#077124]/20 hover:border-white/[0.12]'
                        }`}
                        placeholder="Your username"
                        style={{ boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.3)' }}
                      />
                    </div>
                    {errors.pokerUsername && <p className="text-red-400 text-xs mt-1 ml-1">{errors.pokerUsername}</p>}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label htmlFor="pokerEmail" className="block text-sm font-semibold text-gray-300 tracking-tight">
                      {dealName} Email<span className="text-[#10b981] ml-1">*</span>
                    </label>
                    <div className="relative group/input">
                      <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300 blur-xl bg-[#077124]/10"></div>
                      
                      <input
                        type="email"
                        id="pokerEmail"
                        value={formData.pokerEmail}
                        onChange={(e) => setFormData(prev => ({ ...prev, pokerEmail: e.target.value }))}
                        className={`relative w-full px-4 py-3 bg-black/40 border rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 hover:bg-black/50 ${
                          errors.pokerEmail
                            ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20'
                            : 'border-white/[0.08] focus:border-[#077124]/50 focus:ring-[#077124]/20 hover:border-white/[0.12]'
                        }`}
                        placeholder="your.email@example.com"
                        style={{ boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.3)' }}
                      />
                    </div>
                    {errors.pokerEmail && <p className="text-red-400 text-xs mt-1 ml-1">{errors.pokerEmail}</p>}
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-3 pt-2">
                    {/* Consent Checkbox */}
                    <label className="flex items-start cursor-pointer group/checkbox">
                      <input
                        type="checkbox"
                        checked={formData.consentShare}
                        onChange={(e) => setFormData(prev => ({ ...prev, consentShare: e.target.checked }))}
                        className="mt-0.5 w-4 h-4 rounded border-2 border-white/[0.12] bg-black/40 text-[#077124] focus:ring-2 focus:ring-[#077124]/30 cursor-pointer checked:bg-[#077124] checked:border-[#077124] flex-shrink-0"
                      />
                      <span className="ml-3 text-xs text-gray-400 group-hover/checkbox:text-gray-300 transition-colors duration-300 font-normal leading-tight">
                        I give my full consent to {dealName} to share my details and any relevant information in relation to my account with Universal Affiliates Ltd.
                        <span className="text-[#10b981] ml-1">*</span>
                      </span>
                    </label>
                    {errors.consentShare && <p className="text-red-400 text-xs ml-7">{errors.consentShare}</p>}

                    {/* Terms Checkbox */}
                    <label className="flex items-start cursor-pointer group/checkbox">
                      <input
                        type="checkbox"
                        checked={formData.agreeTerms}
                        onChange={(e) => setFormData(prev => ({ ...prev, agreeTerms: e.target.checked }))}
                        className="mt-0.5 w-4 h-4 rounded border-2 border-white/[0.12] bg-black/40 text-[#077124] focus:ring-2 focus:ring-[#077124]/30 cursor-pointer checked:bg-[#077124] checked:border-[#077124] flex-shrink-0"
                      />
                      <span className="ml-3 text-xs text-gray-400 group-hover/checkbox:text-gray-300 transition-colors duration-300 font-normal leading-tight">
                        I agree to the {dealName}{' '}
                        <a href="#" className="text-[#077124] hover:text-[#0a9b30] font-semibold transition-colors duration-300 underline-offset-4 hover:underline">
                          Terms & Conditions
                        </a>
                        <span className="text-[#10b981] ml-1">*</span>
                      </span>
                    </label>
                    {errors.agreeTerms && <p className="text-red-400 text-xs ml-7">{errors.agreeTerms}</p>}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative inline-flex items-center justify-center gap-2 px-12 py-4 text-base md:text-lg font-bold text-white bg-gradient-to-b from-[#088929] to-[#055a1c] rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.03] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
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
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#077124] via-[#0a9b30] to-[#077124] rounded-full blur-xl opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 via-[#077124] to-emerald-400 rounded-full blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 via-white/5 to-transparent" style={{ height: '50%' }}></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 skew-x-12"></div>
                  <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]"></div>
                  
                  <span className="relative z-10 tracking-wide drop-shadow-lg">
                    {isLoading ? 'Submitting...' : 'Submit Application'}
                  </span>
                  
                  <div className="absolute inset-x-0 top-[1px] h-px bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"></div>
                  <div className="absolute inset-x-0 bottom-[1px] h-px bg-gradient-to-r from-transparent via-black/50 to-transparent rounded-full"></div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

