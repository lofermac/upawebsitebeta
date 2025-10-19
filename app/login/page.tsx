'use client'

import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = login(email, password);
    if (!success) {
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
                    Username
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
                      placeholder="admin or player"
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

                {/* Login Button - Same as View All Deals */}
                <div className="flex justify-center mt-8">
                  <button
                    type="submit"
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
                  <span className="relative z-10 tracking-wide drop-shadow-lg">Login</span>
                  
                  {/* Animated arrow */}
                  <ArrowRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 drop-shadow-lg" strokeWidth={3} />
                  
                  {/* Top edge highlight */}
                  <div className="absolute inset-x-0 top-[1px] h-px bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"></div>
                  
                  {/* Bottom edge shadow */}
                  <div className="absolute inset-x-0 bottom-[1px] h-px bg-gradient-to-r from-transparent via-black/50 to-transparent rounded-full"></div>
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

