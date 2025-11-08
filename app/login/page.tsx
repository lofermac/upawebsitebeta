'use client'

import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "@/lib/contexts/AuthContext";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password);
    } catch {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header Container - Same as homepage */}
      <section className="relative bg-black w-full px-3 md:px-4 pt-6">
        <div className="relative w-full">
          <div className="relative z-50">
            <Header />
          </div>
        </div>
      </section>

      {/* Main Content - Login Form */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 md:py-16">
        <div className="w-full max-w-[520px]">
          {/* Login Card - Premium Container */}
          <div className="relative group/card">
            {/* Background with gradient - Same as homepage */}
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
              {/* Title - Same typography as "Stop Leaving Money On The Table" */}
              <div className="text-center mb-10">
                <h1 className="text-[1.75rem] sm:text-3xl md:text-4xl lg:text-[2.4rem] font-bold text-white mb-4 animate-fade-up-delay-800"
                    style={{ 
                      textShadow: '0 2px 16px rgba(0,0,0,0.4)',
                      letterSpacing: '-0.02em',
                      fontWeight: '600'
                    }}>
                  Welcome Back
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-[1.4rem] text-gray-400 font-normal animate-fade-up-delay-1200"
                   style={{ 
                     textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                     letterSpacing: '-0.01em',
                     fontWeight: '400'
                   }}>
                  Sign in to access your account
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6 animate-fade-up-delay-1400">
                {/* Error Message */}
                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm text-center">
                    {error}
                  </div>
                )}
                
                {/* Email Field */}
                <div className="space-y-3">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-300 tracking-tight">
                    Email
                  </label>
                  <div className="relative group/input">
                    {/* Icon with subtle glow on focus */}
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
                      <Mail className="h-5 w-5 text-gray-500 transition-colors duration-300 group-hover/input:text-gray-400 group-focus-within/input:text-[#077124]" strokeWidth={2} />
                    </div>
                    
                    {/* Glow effect on focus */}
                    <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300 blur-xl bg-[#077124]/10"></div>
                    
                    <input
                      type="text"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="relative w-full pl-14 pr-5 py-4 bg-black/40 border border-white/[0.08] rounded-xl text-white text-base placeholder-gray-500 focus:outline-none focus:border-[#077124]/50 focus:ring-2 focus:ring-[#077124]/20 transition-all duration-300 hover:border-white/[0.12] hover:bg-black/50"
                      placeholder="email@example.com"
                      required
                      style={{
                        boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.3)'
                      }}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-3">
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-300 tracking-tight">
                    Password
                  </label>
                  <div className="relative group/input">
                    {/* Lock Icon */}
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
                      <Lock className="h-5 w-5 text-gray-500 transition-colors duration-300 group-hover/input:text-gray-400 group-focus-within/input:text-[#077124]" strokeWidth={2} />
                    </div>
                    
                    {/* Glow effect on focus */}
                    <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300 blur-xl bg-[#077124]/10"></div>
                    
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="relative w-full pl-14 pr-14 py-4 bg-black/40 border border-white/[0.08] rounded-xl text-white text-base placeholder-gray-500 focus:outline-none focus:border-[#077124]/50 focus:ring-2 focus:ring-[#077124]/20 transition-all duration-300 hover:border-white/[0.12] hover:bg-black/50"
                      placeholder="••••••••"
                      required
                      style={{
                        boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.3)'
                      }}
                    />
                    
                    {/* Toggle Password Visibility */}
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

                {/* Keep Me Signed In & Forgot Password */}
                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center cursor-pointer group/checkbox">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={keepSignedIn}
                        onChange={(e) => setKeepSignedIn(e.target.checked)}
                        className="w-5 h-5 rounded-md border-2 border-white/[0.12] bg-black/40 text-[#077124] focus:ring-2 focus:ring-[#077124]/30 focus:ring-offset-0 transition-all duration-300 cursor-pointer checked:bg-[#077124] checked:border-[#077124]"
                      />
                    </div>
                    <span className="ml-3 text-sm text-gray-400 group-hover/checkbox:text-gray-300 transition-colors duration-300 font-medium">
                      Keep Me Signed In
                    </span>
                  </label>
                  
                  <a
                    href="#forgot-password"
                    className="text-sm text-gray-400 hover:text-[#077124] transition-colors duration-300 font-semibold"
                  >
                    Forgot Password?
                  </a>
                </div>

                {/* Login Button - Mesmo estilo dos CTAs da Homepage */}
                <div className="flex justify-center mt-8">
                  <button
                    type="submit"
                    className="relative font-semibold px-14 py-5 text-lg md:text-xl rounded-full bg-[#077124] text-white shadow-lg shadow-[#077124]/20 hover:shadow-2xl hover:shadow-[#077124]/40 hover:scale-[1.03] transition-all duration-300 group/btn overflow-hidden"
                  >
                    <span className="relative z-10">Login</span>
                    {/* Animated shine effect */}
                    <div className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    {/* Subtle inner glow */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>

                {/* Sign Up Link */}
                <div className="text-center mt-8">
                  <p className="text-base text-gray-400 font-normal mb-2">
                    Don&apos;t Have An Account?
                  </p>
                  <Link
                    href="/register"
                    className="font-semibold text-[#077124] hover:text-[#0a9b30] transition-colors duration-300 hover:underline underline-offset-4 text-base"
                  >
                    Sign Up
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
  );
}

