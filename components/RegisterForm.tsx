'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/contexts/AuthContext';
import { User, Mail, Lock, Eye, EyeOff, MessageCircle, Send } from 'lucide-react';
import CountrySelect from '@/app/components/CountrySelect';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
  onSuccess: () => void;
}

export default function RegisterForm({ onSwitchToLogin, onSuccess }: RegisterFormProps) {
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    country: '',
    discord: '',
    whatsapp: '',
    telegram: '',
    agreeTerms: false,
    agreePrivacy: false,
    receivePromotions: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validação
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.country) {
      newErrors.country = 'Country is required';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the Terms & Conditions';
    }

    if (!formData.agreePrivacy) {
      newErrors.agreePrivacy = 'You must agree to the Privacy Policy';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Tentar registro
    setIsLoading(true);
    try {
      await register({
        email: formData.email,
        password: formData.password,
        country: formData.country,
        fullName: formData.fullName,
        telegram: formData.telegram,
        discord: formData.discord,
        agreeTerms: formData.agreeTerms,
        agreePrivacy: formData.agreePrivacy,
      }, true); // skipRedirect = true quando registro via modal
      onSuccess(); // Fecha modal de Auth e executa callback (ex: abrir JoinDealModal)
    } catch {
      setErrors({ general: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Título */}
      <div className="text-center mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-1.5"
            style={{ 
              textShadow: '0 2px 16px rgba(0,0,0,0.4)',
              letterSpacing: '-0.02em'
            }}>
          Register
        </h2>
        <p className="text-sm text-gray-400 leading-relaxed font-normal">
          Take your seat at the table.
        </p>
      </div>

      {/* Erro geral */}
      {errors.general && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm">
          {errors.general}
        </div>
      )}

      {/* Account Details Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2.5 pb-2 border-b border-white/[0.06]">
          <div className="p-1.5 rounded-lg bg-[#077124]/10 border border-[#077124]/20">
            <User className="h-4 w-4 text-[#077124]" strokeWidth={2} />
          </div>
          <h3 className="text-base md:text-lg font-bold text-white tracking-tight"
              style={{ 
                textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                letterSpacing: '-0.01em'
              }}>
            Account Details
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Linha 1: Full Name e Country */}
          {/* Full Name */}
          <div className="space-y-2">
            <label htmlFor="fullName" className="block text-sm font-semibold text-gray-300 tracking-tight">
              Full Name<span className="text-[#10b981] ml-1">*</span>
            </label>
            <div className="relative group/input">
              <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300 blur-xl bg-[#077124]/10"></div>
              
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                className={`relative w-full px-4 py-3 bg-black/40 border rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 hover:bg-black/50 ${
                  errors.fullName
                    ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20'
                    : 'border-white/[0.08] focus:border-[#077124]/50 focus:ring-[#077124]/20 hover:border-white/[0.12]'
                }`}
                placeholder="Doyle Brunson"
                style={{ boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.3)' }}
              />
            </div>
            {errors.fullName && <p className="text-red-400 text-xs mt-1 ml-1">{errors.fullName}</p>}
          </div>

          {/* Country */}
          <div className="space-y-2">
            <label htmlFor="country" className="block text-sm font-semibold text-gray-300 tracking-tight">
              Country<span className="text-[#10b981] ml-1">*</span>
            </label>
            <CountrySelect
              value={formData.country}
              onChange={(code) => setFormData(prev => ({ ...prev, country: code }))}
              required
              error={errors.country}
              compact
            />
            {errors.country && <p className="text-red-400 text-xs mt-1 ml-1">{errors.country}</p>}
          </div>

          {/* Linha 2: Email e Password */}
          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-300 tracking-tight">
              E-mail<span className="text-[#10b981] ml-1">*</span>
            </label>
            <div className="relative group/input">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <Mail className={`h-4 w-4 transition-colors duration-300 ${
                  errors.email ? 'text-red-400' : 'text-gray-500 group-hover/input:text-gray-400 group-focus-within/input:text-[#077124]'
                }`} strokeWidth={2} />
              </div>
              <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300 blur-xl bg-[#077124]/10"></div>
              
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className={`relative w-full pl-12 pr-4 py-3 bg-black/40 border rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 hover:bg-black/50 ${
                  errors.email
                    ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20'
                    : 'border-white/[0.08] focus:border-[#077124]/50 focus:ring-[#077124]/20 hover:border-white/[0.12]'
                }`}
                placeholder="email@example.com"
                style={{ boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.3)' }}
              />
            </div>
            {errors.email && <p className="text-red-400 text-xs mt-1 ml-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-300 tracking-tight">
              Password<span className="text-[#10b981] ml-1">*</span>
            </label>
            <div className="relative group/input">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <Lock className={`h-4 w-4 transition-colors duration-300 ${
                  errors.password ? 'text-red-400' : 'text-gray-500 group-hover/input:text-gray-400 group-focus-within/input:text-[#077124]'
                }`} strokeWidth={2} />
              </div>
              <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300 blur-xl bg-[#077124]/10"></div>
              
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className={`relative w-full pl-12 pr-12 py-3 bg-black/40 border rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 hover:bg-black/50 ${
                  errors.password
                    ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20'
                    : 'border-white/[0.08] focus:border-[#077124]/50 focus:ring-[#077124]/20 hover:border-white/[0.12]'
                }`}
                placeholder="••••••••"
                style={{ boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.3)' }}
              />
              
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300 transition-colors duration-300 z-10"
              >
                {showPassword ? <EyeOff className="h-4 w-4" strokeWidth={2} /> : <Eye className="h-4 w-4" strokeWidth={2} />}
              </button>
            </div>
            {errors.password && <p className="text-red-400 text-xs mt-1 ml-1">{errors.password}</p>}
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center gap-2.5 pb-2 border-b border-white/[0.06]">
          <div className="p-1.5 rounded-lg bg-[#077124]/10 border border-[#077124]/20">
            <MessageCircle className="h-4 w-4 text-[#077124]" strokeWidth={2} />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-bold text-white tracking-tight"
                style={{ 
                  textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                  letterSpacing: '-0.01em'
                }}>
              Contact Information
            </h3>
            <p className="text-xs text-gray-400 mt-0.5 font-normal leading-tight">
              Help us get in touch to provide improved support!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Discord */}
          <div className="space-y-2">
            <label htmlFor="discord" className="block text-sm font-semibold text-gray-300 tracking-tight">
              Discord ID
            </label>
            <div className="relative group/input">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <svg className={`h-4 w-4 transition-colors duration-300 ${formData.discord ? 'text-[#5865F2]' : 'text-gray-500 group-hover/input:text-gray-400 group-focus-within/input:text-gray-400'}`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </div>
              <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300 blur-xl bg-[#077124]/10"></div>
              
              <input
                type="text"
                id="discord"
                value={formData.discord}
                onChange={(e) => setFormData(prev => ({ ...prev, discord: e.target.value }))}
                className="relative w-full pl-12 pr-4 py-3 bg-black/40 border border-white/[0.08] rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#077124]/50 focus:ring-2 focus:ring-[#077124]/20 transition-all duration-300 hover:border-white/[0.12] hover:bg-black/50"
                placeholder="username#1234"
                style={{ boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.3)' }}
              />
            </div>
          </div>

          {/* WhatsApp */}
          <div className="space-y-2">
            <label htmlFor="whatsapp" className="block text-sm font-semibold text-gray-300 tracking-tight">
              WhatsApp
            </label>
            <div className="relative group/input">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <svg className={`h-4 w-4 transition-colors duration-300 ${formData.whatsapp ? 'text-[#25D366]' : 'text-gray-500 group-hover/input:text-gray-400 group-focus-within/input:text-gray-400'}`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300 blur-xl bg-[#077124]/10"></div>
              
              <input
                type="tel"
                id="whatsapp"
                value={formData.whatsapp}
                onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
                className="relative w-full pl-12 pr-4 py-3 bg-black/40 border border-white/[0.08] rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#077124]/50 focus:ring-2 focus:ring-[#077124]/20 transition-all duration-300 hover:border-white/[0.12] hover:bg-black/50"
                placeholder="+1 234 567 8900"
                style={{ boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.3)' }}
              />
            </div>
          </div>

          {/* Telegram */}
          <div className="space-y-2">
            <label htmlFor="telegram" className="block text-sm font-semibold text-gray-300 tracking-tight">
              Telegram
            </label>
            <div className="relative group/input">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                <Send className={`h-4 w-4 transition-colors duration-300 ${formData.telegram ? 'text-[#0088cc]' : 'text-gray-500 group-hover/input:text-gray-400 group-focus-within/input:text-gray-400'}`} strokeWidth={2} />
              </div>
              <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300 blur-xl bg-[#077124]/10"></div>
              
              <input
                type="text"
                id="telegram"
                value={formData.telegram}
                onChange={(e) => setFormData(prev => ({ ...prev, telegram: e.target.value }))}
                className="relative w-full pl-12 pr-4 py-3 bg-black/40 border border-white/[0.08] rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#077124]/50 focus:ring-2 focus:ring-[#077124]/20 transition-all duration-300 hover:border-white/[0.12] hover:bg-black/50"
                placeholder="@username"
                style={{ boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.3)' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Checkboxes - Layout horizontal compacto */}
      <div className="pt-3 border-t border-white/[0.06]">
        <div className="flex flex-col md:flex-row md:items-start gap-3 md:gap-4">
          {/* Terms Checkbox - Required */}
          <label className="flex items-start cursor-pointer group/checkbox flex-1 min-w-0">
            <input
              type="checkbox"
              checked={formData.agreeTerms}
              onChange={(e) => setFormData(prev => ({ ...prev, agreeTerms: e.target.checked }))}
              className="mt-0.5 w-4 h-4 rounded border-2 border-white/[0.12] bg-black/40 text-[#077124] focus:ring-2 focus:ring-[#077124]/30 cursor-pointer checked:bg-[#077124] checked:border-[#077124] flex-shrink-0"
            />
            <span className="ml-2.5 text-xs text-gray-400 group-hover/checkbox:text-gray-300 transition-colors duration-300 font-normal leading-tight">
              I agree to the{' '}
              <a href="#" className="text-[#077124] hover:text-[#0a9b30] font-semibold transition-colors duration-300 underline-offset-4 hover:underline whitespace-nowrap">
                Terms & Conditions
              </a>
              <span className="text-[#10b981] ml-1">*</span>
            </span>
          </label>

          {/* Privacy Checkbox - Required */}
          <label className="flex items-start cursor-pointer group/checkbox flex-1 min-w-0">
            <input
              type="checkbox"
              checked={formData.agreePrivacy}
              onChange={(e) => setFormData(prev => ({ ...prev, agreePrivacy: e.target.checked }))}
              className="mt-0.5 w-4 h-4 rounded border-2 border-white/[0.12] bg-black/40 text-[#077124] focus:ring-2 focus:ring-[#077124]/30 cursor-pointer checked:bg-[#077124] checked:border-[#077124] flex-shrink-0"
            />
            <span className="ml-2.5 text-xs text-gray-400 group-hover/checkbox:text-gray-300 transition-colors duration-300 font-normal leading-tight">
              I agree to the{' '}
              <a href="#" className="text-[#077124] hover:text-[#0a9b30] font-semibold transition-colors duration-300 underline-offset-4 hover:underline whitespace-nowrap">
                Privacy Policy
              </a>
              <span className="text-[#10b981] ml-1">*</span>
            </span>
          </label>

          {/* Promotions Checkbox - Opcional */}
          <label className="flex items-start cursor-pointer group/checkbox flex-1 min-w-0">
            <input
              type="checkbox"
              checked={formData.receivePromotions}
              onChange={(e) => setFormData(prev => ({ ...prev, receivePromotions: e.target.checked }))}
              className="mt-0.5 w-4 h-4 rounded border-2 border-white/[0.12] bg-black/40 text-[#077124] focus:ring-2 focus:ring-[#077124]/30 cursor-pointer checked:bg-[#077124] checked:border-[#077124] flex-shrink-0"
            />
            <span className="ml-2.5 text-xs text-gray-400 group-hover/checkbox:text-gray-300 transition-colors duration-300 font-normal leading-tight">
              Get contacted about latest deals
            </span>
          </label>
        </div>
        
        {/* Error messages em linha separada */}
        {(errors.agreeTerms || errors.agreePrivacy) && (
          <div className="flex flex-col gap-1 mt-2">
            {errors.agreeTerms && <p className="text-red-400 text-xs">{errors.agreeTerms}</p>}
            {errors.agreePrivacy && <p className="text-red-400 text-xs">{errors.agreePrivacy}</p>}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-5">
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
            {isLoading ? 'Creating Account...' : 'Register'}
          </span>
          
          <div className="absolute inset-x-0 top-[1px] h-px bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"></div>
          <div className="absolute inset-x-0 bottom-[1px] h-px bg-gradient-to-r from-transparent via-black/50 to-transparent rounded-full"></div>
        </button>
      </div>

      {/* Switch to Login */}
      <div className="text-center mt-4">
        <p className="text-sm text-gray-400 font-normal">
          Already have an account?
        </p>
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-sm text-[#077124] font-semibold hover:text-[#0a9b30] hover:underline underline-offset-4 transition-colors duration-300 mt-1"
        >
          Log In
        </button>
      </div>
    </form>
  );
}
