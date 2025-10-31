'use client'

import { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock, MessageCircle, Send, ArrowRight } from "lucide-react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CountrySelect from "../components/CountrySelect";
import WelcomeModal from "@/components/WelcomeModal";
import { supabase } from '@/lib/supabase/client';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    country: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    discordId: '',
    whatsapp: '',
    telegram: '',
    agreeTerms: false,
    agreePrivacy: false,
    receivePromotions: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validações
    if (formData.email !== formData.confirmEmail) {
      setError('Emails do not match');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.agreeTerms || !formData.agreePrivacy) {
      setError('You must agree to the Terms and Privacy Policy');
      return;
    }

    try {
      // 1. Criar conta no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // 2. Criar perfil completo na tabela profiles
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            email: formData.email,
            full_name: formData.fullName,
            country: formData.country,
            discord_id: formData.discordId || null,
            whatsapp: formData.whatsapp || null,
            telegram: formData.telegram || null,
            user_type: 'player',
            is_sub_affiliate: false,
          });

        if (profileError) {
          console.error('Profile creation error:', profileError);
          // Se já existe o profile (criado pelo trigger), fazer update
          const { error: updateError } = await supabase
            .from('profiles')
            .update({
              full_name: formData.fullName,
              country: formData.country,
              discord_id: formData.discordId || null,
              whatsapp: formData.whatsapp || null,
              telegram: formData.telegram || null,
            })
            .eq('id', authData.user.id);
          
          if (updateError) {
            console.error('Profile update error:', updateError);
          }
        }

        // 3. Mostrar modal de boas-vindas
        setShowWelcomeModal(true);
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      setError(error.message || 'Failed to create account. Please try again.');
    }
  };

  const handleCloseWelcomeModal = () => {
    setShowWelcomeModal(false);
  };

  return (
    <>
      {/* Welcome Modal */}
      <WelcomeModal
        isOpen={showWelcomeModal}
        onClose={handleCloseWelcomeModal}
        userName={formData.fullName.split(' ')[0]} // Pega o primeiro nome
      />

      {/* Page Content */}
      <div className="min-h-screen bg-black flex flex-col">
      {/* Header Container - Same as login and homepage */}
      <section className="relative bg-black w-full px-3 md:px-4 pt-6">
        <div className="relative w-full">
          <div className="relative z-50">
            <Header />
          </div>
        </div>
      </section>

      {/* Main Content - Registration Form */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 md:py-16">
        <div className="w-full max-w-5xl">
          {/* Registration Card - Premium Container */}
          <div className="relative group/card">
            {/* Background with gradient - Same as login */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#121212] to-[#0d0d0d] rounded-[2rem] transition-all duration-700 group-hover/card:from-[#0e0e0e] group-hover/card:via-[#131313] group-hover/card:to-[#0e0e0e]"></div>
            
            {/* Border effect */}
            <div className="absolute inset-0 rounded-[2rem] border border-white/[0.06] shadow-2xl shadow-black/50 transition-all duration-700 group-hover/card:border-white/[0.09] group-hover/card:shadow-black/60 pointer-events-none"></div>
            
            {/* Inner glow effect */}
            <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.025)] transition-all duration-700 group-hover/card:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"></div>
            
            {/* Top light rim */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent rounded-t-[2rem]"></div>
            
            {/* Ambient glow effects - Multiple layers */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#077124]/[0.04] rounded-full blur-[120px] animate-pulse-slow"></div>
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-emerald-500/[0.025] rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
            
            {/* Subtle noise texture overlay for premium feel */}
            <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none rounded-[2rem]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
            
            {/* Content */}
            <div className="relative z-10 p-10 md:p-12">
              {/* Title - Same typography as homepage sections */}
              <div className="text-center mb-10">
                <h1 className="text-[1.75rem] sm:text-3xl md:text-4xl lg:text-[2.4rem] font-bold text-white mb-4 animate-fade-up-delay-800"
                    style={{ 
                      textShadow: '0 2px 16px rgba(0,0,0,0.4)',
                      letterSpacing: '-0.02em',
                      fontWeight: '600'
                    }}>
                  Register
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-[1.4rem] text-gray-400 font-normal max-w-2xl mx-auto animate-fade-up-delay-1200"
                   style={{ 
                     textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                     letterSpacing: '-0.01em',
                     fontWeight: '400'
                   }}>
                  Take your seat at the table.
                </p>
              </div>

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="space-y-8 animate-fade-up-delay-1400">
                {/* Account Details Section */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-3 border-b border-white/[0.06]">
                    <div className="p-2 rounded-lg bg-[#077124]/10 border border-[#077124]/20">
                      <User className="h-5 w-5 text-[#077124]" strokeWidth={2} />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight"
                        style={{ 
                          textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                          letterSpacing: '-0.01em'
                        }}>
                      Account Details
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Linha 1: Full Name e Country */}
                    {/* Full Name */}
                    <div className="space-y-3">
                      <label htmlFor="fullName" className="block text-sm font-semibold text-gray-300 tracking-tight">
                        Full Name <span className="text-[#10b981]">*</span>
                      </label>
                      <div className="relative group/input">
                        {/* Glow effect on focus */}
                        <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300 blur-xl bg-[#077124]/10"></div>
                        
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className="relative w-full px-5 py-4 bg-black/40 border border-white/[0.08] rounded-xl text-white text-base placeholder-gray-500 focus:outline-none focus:border-[#077124]/50 focus:ring-2 focus:ring-[#077124]/20 transition-all duration-300 hover:border-white/[0.12] hover:bg-black/50"
                          placeholder="Doyle Brunson"
                          required
                          style={{
                            boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.3)'
                          }}
                        />
                      </div>
                    </div>

                    {/* Country */}
                    <div className="space-y-3">
                      <label htmlFor="country" className="block text-sm font-semibold text-gray-300 tracking-tight">
                        Country <span className="text-[#10b981]">*</span>
                      </label>
                      <CountrySelect
                        value={formData.country}
                        onChange={(countryCode) => setFormData(prev => ({ ...prev, country: countryCode }))}
                        required
                      />
                    </div>

                    {/* Linha 2: E-mail e Confirm E-mail */}
                    {/* Email */}
                    <div className="space-y-3">
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-300 tracking-tight">
                        E-mail <span className="text-[#10b981]">*</span>
                      </label>
                      <div className="relative group/input">
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
                          <Mail className="h-5 w-5 text-gray-500 transition-colors duration-300 group-hover/input:text-gray-400 group-focus-within/input:text-[#077124]" strokeWidth={2} />
                        </div>
                        
                        {/* Glow effect on focus */}
                        <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300 blur-xl bg-[#077124]/10"></div>
                        
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="relative w-full pl-14 pr-5 py-4 bg-black/40 border border-white/[0.08] rounded-xl text-white text-base placeholder-gray-500 focus:outline-none focus:border-[#077124]/50 focus:ring-2 focus:ring-[#077124]/20 transition-all duration-300 hover:border-white/[0.12] hover:bg-black/50"
                          placeholder="email@example.com"
                          required
                          style={{
                            boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.3)'
                          }}
                        />
                      </div>
                    </div>

                    {/* Confirm Email */}
                    <div className="space-y-3">
                      <label htmlFor="confirmEmail" className="block text-sm font-semibold text-gray-300 tracking-tight">
                        Confirm E-mail <span className="text-[#10b981]">*</span>
                      </label>
                      <div className="relative group/input">
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
                          <Mail className="h-5 w-5 text-gray-500 transition-colors duration-300 group-hover/input:text-gray-400 group-focus-within/input:text-[#077124]" strokeWidth={2} />
                        </div>
                        
                        {/* Glow effect on focus */}
                        <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300 blur-xl bg-[#077124]/10"></div>
                        
                        <input
                          type="email"
                          id="confirmEmail"
                          name="confirmEmail"
                          value={formData.confirmEmail}
                          onChange={handleChange}
                          className="relative w-full pl-14 pr-5 py-4 bg-black/40 border border-white/[0.08] rounded-xl text-white text-base placeholder-gray-500 focus:outline-none focus:border-[#077124]/50 focus:ring-2 focus:ring-[#077124]/20 transition-all duration-300 hover:border-white/[0.12] hover:bg-black/50"
                          placeholder="email@example.com"
                          required
                          style={{
                            boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.3)'
                          }}
                        />
                      </div>
                    </div>

                    {/* Linha 3: Password e Confirm Password */}
                    {/* Password */}
                    <div className="space-y-3">
                      <label htmlFor="password" className="block text-sm font-semibold text-gray-300 tracking-tight">
                        Password <span className="text-[#10b981]">*</span>
                      </label>
                      <div className="relative group/input">
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
                          <Lock className="h-5 w-5 text-gray-500 transition-colors duration-300 group-hover/input:text-gray-400 group-focus-within/input:text-[#077124]" strokeWidth={2} />
                        </div>
                        
                        {/* Glow effect on focus */}
                        <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300 blur-xl bg-[#077124]/10"></div>
                        
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="relative w-full pl-14 pr-14 py-4 bg-black/40 border border-white/[0.08] rounded-xl text-white text-base placeholder-gray-500 focus:outline-none focus:border-[#077124]/50 focus:ring-2 focus:ring-[#077124]/20 transition-all duration-300 hover:border-white/[0.12] hover:bg-black/50"
                          placeholder="••••••••"
                          required
                          style={{
                            boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.3)'
                          }}
                        />
                        
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-500 hover:text-gray-300 transition-colors duration-300 z-10"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" strokeWidth={2} />
                          ) : (
                            <Eye className="h-5 w-5" strokeWidth={2} />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-3">
                      <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-300 tracking-tight">
                        Confirm Password <span className="text-[#10b981]">*</span>
                      </label>
                      <div className="relative group/input">
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
                          <Lock className="h-5 w-5 text-gray-500 transition-colors duration-300 group-hover/input:text-gray-400 group-focus-within/input:text-[#077124]" strokeWidth={2} />
                        </div>
                        
                        {/* Glow effect on focus */}
                        <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300 blur-xl bg-[#077124]/10"></div>
                        
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="relative w-full pl-14 pr-14 py-4 bg-black/40 border border-white/[0.08] rounded-xl text-white text-base placeholder-gray-500 focus:outline-none focus:border-[#077124]/50 focus:ring-2 focus:ring-[#077124]/20 transition-all duration-300 hover:border-white/[0.12] hover:bg-black/50"
                          placeholder="••••••••"
                          required
                          style={{
                            boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.3)'
                          }}
                        />
                        
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-500 hover:text-gray-300 transition-colors duration-300 z-10"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5" strokeWidth={2} />
                          ) : (
                            <Eye className="h-5 w-5" strokeWidth={2} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information Section */}
                <div className="space-y-6 pt-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-white/[0.06]">
                    <div className="p-2 rounded-lg bg-[#077124]/10 border border-[#077124]/20">
                      <MessageCircle className="h-5 w-5 text-[#077124]" strokeWidth={2} />
                    </div>
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight"
                          style={{ 
                            textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                            letterSpacing: '-0.01em'
                          }}>
                        Contact Information
                      </h2>
                      <p className="text-sm text-gray-400 mt-1 font-normal">
                        This information helps us get in touch so we can provide you with support on our affiliate deals.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Discord ID */}
                    <div className="space-y-3">
                      <label htmlFor="discordId" className="block text-sm font-semibold text-gray-300 tracking-tight">
                        Discord ID
                      </label>
                      <div className="relative group/input">
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
                          <svg className={`h-5 w-5 transition-colors duration-300 ${formData.discordId ? 'text-[#5865F2]' : 'text-gray-500 group-hover/input:text-gray-400 group-focus-within/input:text-gray-400'}`} fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                          </svg>
                        </div>
                        
                        {/* Glow effect on focus */}
                        <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300 blur-xl bg-[#077124]/10"></div>
                        
                        <input
                          type="text"
                          id="discordId"
                          name="discordId"
                          value={formData.discordId}
                          onChange={handleChange}
                          className="relative w-full pl-14 pr-5 py-4 bg-black/40 border border-white/[0.08] rounded-xl text-white text-base placeholder-gray-500 focus:outline-none focus:border-[#077124]/50 focus:ring-2 focus:ring-[#077124]/20 transition-all duration-300 hover:border-white/[0.12] hover:bg-black/50"
                          placeholder="username#1234"
                          style={{
                            boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.3)'
                          }}
                        />
                      </div>
                    </div>

                    {/* WhatsApp */}
                    <div className="space-y-3">
                      <label htmlFor="whatsapp" className="block text-sm font-semibold text-gray-300 tracking-tight">
                        WhatsApp
                      </label>
                      <div className="relative group/input">
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
                          <svg className={`h-5 w-5 transition-colors duration-300 ${formData.whatsapp ? 'text-[#25D366]' : 'text-gray-500 group-hover/input:text-gray-400 group-focus-within/input:text-gray-400'}`} fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                        </div>
                        
                        {/* Glow effect on focus */}
                        <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300 blur-xl bg-[#077124]/10"></div>
                        
                        <input
                          type="tel"
                          id="whatsapp"
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleChange}
                          className="relative w-full pl-14 pr-5 py-4 bg-black/40 border border-white/[0.08] rounded-xl text-white text-base placeholder-gray-500 focus:outline-none focus:border-[#077124]/50 focus:ring-2 focus:ring-[#077124]/20 transition-all duration-300 hover:border-white/[0.12] hover:bg-black/50"
                          placeholder="+1 234 567 8900"
                          style={{
                            boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.3)'
                          }}
                        />
                      </div>
                    </div>

                    {/* Telegram */}
                    <div className="space-y-3">
                      <label htmlFor="telegram" className="block text-sm font-semibold text-gray-300 tracking-tight">
                        Telegram
                      </label>
                      <div className="relative group/input">
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
                          <Send className={`h-5 w-5 transition-colors duration-300 ${formData.telegram ? 'text-[#0088cc]' : 'text-gray-500 group-hover/input:text-gray-400 group-focus-within/input:text-gray-400'}`} strokeWidth={2} />
                        </div>
                        
                        {/* Glow effect on focus */}
                        <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300 blur-xl bg-[#077124]/10"></div>
                        
                        <input
                          type="text"
                          id="telegram"
                          name="telegram"
                          value={formData.telegram}
                          onChange={handleChange}
                          className="relative w-full pl-14 pr-5 py-4 bg-black/40 border border-white/[0.08] rounded-xl text-white text-base placeholder-gray-500 focus:outline-none focus:border-[#077124]/50 focus:ring-2 focus:ring-[#077124]/20 transition-all duration-300 hover:border-white/[0.12] hover:bg-black/50"
                          placeholder="@username"
                          style={{
                            boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.3)'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions - Horizontal Compact Layout */}
                <div className="pt-6 border-t border-white/[0.06]">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
                    {/* Terms Checkbox */}
                    <label className="flex items-start cursor-pointer group/checkbox flex-1 min-w-0">
                      <div className="relative flex-shrink-0">
                        <input
                          type="checkbox"
                          name="agreeTerms"
                          checked={formData.agreeTerms}
                          onChange={handleChange}
                          className="mt-[2px] w-4 h-4 rounded border-2 border-white/[0.12] bg-black/40 text-[#077124] focus:ring-2 focus:ring-[#077124]/30 focus:ring-offset-0 transition-all duration-300 cursor-pointer checked:bg-[#077124] checked:border-[#077124]"
                          required
                        />
                      </div>
                      <span className="ml-2 text-xs text-gray-400 group-hover/checkbox:text-gray-300 transition-colors duration-300 font-normal leading-tight">
                        I agree to the{' '}
                        <a href="/terms" className="text-[#077124] hover:text-[#0a9b30] font-medium transition-colors duration-300 underline-offset-2 hover:underline whitespace-nowrap">
                          Universal Terms & Conditions
                        </a>
                      </span>
                    </label>

                    {/* Privacy Checkbox */}
                    <label className="flex items-start cursor-pointer group/checkbox flex-1 min-w-0">
                      <div className="relative flex-shrink-0">
                        <input
                          type="checkbox"
                          name="agreePrivacy"
                          checked={formData.agreePrivacy}
                          onChange={handleChange}
                          className="mt-[2px] w-4 h-4 rounded border-2 border-white/[0.12] bg-black/40 text-[#077124] focus:ring-2 focus:ring-[#077124]/30 focus:ring-offset-0 transition-all duration-300 cursor-pointer checked:bg-[#077124] checked:border-[#077124]"
                          required
                        />
                      </div>
                      <span className="ml-2 text-xs text-gray-400 group-hover/checkbox:text-gray-300 transition-colors duration-300 font-normal leading-tight">
                        I agree to the{' '}
                        <a href="/privacy" className="text-[#077124] hover:text-[#0a9b30] font-medium transition-colors duration-300 underline-offset-2 hover:underline whitespace-nowrap">
                          Universal Privacy Policy
                        </a>
                      </span>
                    </label>

                    {/* Promotions Checkbox */}
                    <label className="flex items-start cursor-pointer group/checkbox flex-1 min-w-0">
                      <div className="relative flex-shrink-0">
                        <input
                          type="checkbox"
                          name="receivePromotions"
                          checked={formData.receivePromotions}
                          onChange={handleChange}
                          className="mt-[2px] w-4 h-4 rounded border-2 border-white/[0.12] bg-black/40 text-[#077124] focus:ring-2 focus:ring-[#077124]/30 focus:ring-offset-0 transition-all duration-300 cursor-pointer checked:bg-[#077124] checked:border-[#077124]"
                        />
                      </div>
                      <span className="ml-2 text-xs text-gray-400 group-hover/checkbox:text-gray-300 transition-colors duration-300 font-normal leading-tight">
                        Get updates and deals from Universal Poker.<br />You can unsubscribe anytime.
                      </span>
                    </label>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                {/* Register Button - Same premium style as login */}
                <div className="flex justify-center mt-10">
                  <button
                    type="submit"
                    className="group relative inline-flex items-center justify-center gap-3 px-14 py-5 text-lg md:text-xl font-bold text-white bg-gradient-to-b from-[#088929] to-[#055a1c] rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.03] active:scale-[0.98]"
                    style={{
                      boxShadow: `
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
                    <span className="relative z-10 tracking-wide drop-shadow-lg">Register</span>
                    
                    {/* Animated arrow */}
                    <ArrowRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 drop-shadow-lg" strokeWidth={3} />
                  </button>
                </div>

                {/* Login Link */}
                <div className="text-center mt-8">
                  <p className="text-base text-gray-400 font-normal mb-2">
                    Already have an account?
                  </p>
                  <Link
                    href="/login"
                    className="font-semibold text-[#077124] hover:text-[#0a9b30] transition-colors duration-300 hover:underline underline-offset-4 text-base"
                  >
                    Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
    </>
  );
}

