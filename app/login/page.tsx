'use client'

import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Login logic will be implemented later
    console.log({ email, password, keepSignedIn });
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header with same positioning as home */}
      <div className="w-full pt-4 md:pt-6 px-3 md:px-4">
        <Header />
      </div>

      {/* Main Content - Login Form */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 md:py-20">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="relative group">
            {/* Background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#121212] to-[#0d0d0d] rounded-3xl transition-all duration-700 group-hover:from-[#0e0e0e] group-hover:via-[#131313] group-hover:to-[#0e0e0e]"></div>
            
            {/* Border effect */}
            <div className="absolute inset-0 rounded-3xl border border-white/[0.08] shadow-2xl shadow-black/50 transition-all duration-700 group-hover:border-white/[0.12] group-hover:shadow-black/60 pointer-events-none"></div>
            
            {/* Inner glow effect */}
            <div className="absolute inset-0 rounded-3xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)] transition-all duration-700 group-hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]"></div>
            
            {/* Top light rim */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent rounded-t-3xl"></div>
            
            {/* Ambient glow effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#077124]/[0.06] rounded-full blur-[100px] animate-pulse-slow"></div>
            
            {/* Content */}
            <div className="relative z-10 p-8 md:p-10">
              {/* Title */}
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  Welcome Back
                </h1>
                <p className="text-gray-400 text-sm">
                  Sign in to access your account
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <div className="relative group/input">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-500 transition-colors duration-300 group-hover/input:text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 bg-black/40 border border-white/[0.08] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#077124]/50 focus:ring-2 focus:ring-[#077124]/20 transition-all duration-300 hover:border-white/[0.12]"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                    Password
                  </label>
                  <div className="relative group/input">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-500 transition-colors duration-300 group-hover/input:text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-3.5 bg-black/40 border border-white/[0.08] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#077124]/50 focus:ring-2 focus:ring-[#077124]/20 transition-all duration-300 hover:border-white/[0.12]"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300 transition-colors duration-300"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Keep Me Signed In Checkbox */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center cursor-pointer group/checkbox">
                    <input
                      type="checkbox"
                      checked={keepSignedIn}
                      onChange={(e) => setKeepSignedIn(e.target.checked)}
                      className="w-4 h-4 rounded border-white/[0.08] bg-black/40 text-[#077124] focus:ring-2 focus:ring-[#077124]/20 focus:ring-offset-0 transition-all duration-300 cursor-pointer"
                    />
                    <span className="ml-2 text-sm text-gray-400 group-hover/checkbox:text-gray-300 transition-colors duration-300">
                      Keep Me Signed In
                    </span>
                  </label>
                  
                  <a
                    href="#forgot-password"
                    className="text-sm text-gray-400 hover:text-[#077124] transition-colors duration-300 font-medium"
                  >
                    Forgot Password?
                  </a>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full relative font-semibold text-base px-6 py-3.5 rounded-xl bg-[#077124] text-white shadow-lg shadow-[#077124]/30 hover:shadow-2xl hover:shadow-[#077124]/50 hover:scale-[1.02] transition-all duration-300 group/submit overflow-hidden mt-6"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Login
                    <svg className="w-0 group-hover/submit:w-5 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  {/* Animated shine effect */}
                  <div className="absolute inset-0 translate-x-[-100%] group-hover/submit:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  {/* Subtle inner glow */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover/submit:opacity-100 transition-opacity duration-300"></div>
                </button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/[0.06]"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-4 bg-[#121212] text-gray-500">OR</span>
                  </div>
                </div>

                {/* Sign Up Link */}
                <div className="text-center">
                  <p className="text-sm text-gray-400">
                    Don't Have An Account?{' '}
                    <Link
                      href="/register"
                      className="font-semibold text-[#077124] hover:text-[#088a2d] transition-colors duration-300 hover:underline"
                    >
                      Sign Up
                    </Link>
                  </p>
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

