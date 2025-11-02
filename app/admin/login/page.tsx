'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/contexts/AuthContext';
import { supabase } from '@/lib/supabase/client';
import { Eye, EyeOff, Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Fazer login e aguardar
      await login(email, password, true); // skipRedirect = true para verificar antes
      
      // Buscar o tipo de usuário para verificar se é admin
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('id', session.user.id)
          .single();

        if (profile?.user_type === 'admin') {
          // Usuário é admin, permitir acesso
          window.location.href = '/admin/dashboard';
        } else {
          // Usuário NÃO é admin, bloquear
          await supabase.auth.signOut(); // Fazer logout
          setError('Access denied. This area is restricted to administrators only.');
          setLoading(false);
        }
      }
    } catch (err) {
      console.error('Admin login error:', err);
      setError('Invalid credentials or unauthorized access.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 flex items-center justify-center p-4">
      {/* Container Principal */}
      <div className="w-full max-w-md">
        {/* Card de Login */}
        <div className="bg-neutral-900/90 backdrop-blur-xl border border-neutral-800/50 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header com gradiente sutil */}
          <div className="px-8 pt-10 pb-8 bg-gradient-to-b from-neutral-800/30 to-transparent border-b border-neutral-800/50">
            <div className="text-center">
              {/* Logo Universal Poker */}
              <div className="inline-flex items-center justify-center mb-5">
                <Image
                  src="/images/logo.png"
                  alt="Universal Poker Logo"
                  width={180}
                  height={48}
                  className="h-12 w-auto object-contain"
                  priority
                />
              </div>
              <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
                Internal Access
              </h1>
              <p className="text-sm text-neutral-400">
                Secure Portal · Authorized Personnel Only
              </p>
            </div>
          </div>

          {/* Formulário */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Error Message */}
              {error && (
                <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl backdrop-blur-sm">
                  <AlertCircle size={20} className="mt-0.5 flex-shrink-0 text-red-400" strokeWidth={2} />
                  <p className="text-sm text-red-300 leading-relaxed">{error}</p>
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-2.5">
                <label htmlFor="email" className="block text-sm font-semibold text-neutral-300">
                  Credential
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={18} className="text-neutral-500 group-focus-within:text-blue-400 transition-colors" strokeWidth={2} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 bg-neutral-950/50 border border-neutral-700/50 rounded-xl text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                    placeholder=""
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2.5">
                <label htmlFor="password" className="block text-sm font-semibold text-neutral-300">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock size={18} className="text-neutral-500 group-focus-within:text-blue-400 transition-colors" strokeWidth={2} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-11 pr-12 py-3 bg-neutral-950/50 border border-neutral-700/50 rounded-xl text-white text-sm placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                    placeholder="••••••••••••"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-500 hover:text-neutral-300 transition-colors"
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff size={18} strokeWidth={2} />
                    ) : (
                      <Eye size={18} strokeWidth={2} />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-4 py-3.5 mt-6 bg-[#077124] hover:bg-[#077124]/90 text-white text-sm font-semibold rounded-xl shadow-lg shadow-[#077124]/20 hover:shadow-[#077124]/40 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#077124]/50 focus:ring-offset-2 focus:ring-offset-neutral-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" strokeWidth={2.5} />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="px-8 py-5 bg-neutral-950/30 border-t border-neutral-800/50">
            <p className="text-xs text-neutral-500 text-center leading-relaxed">
              Protected by Enterprise-Grade Security
              <br />
              All Access Attempts Are Logged and Monitored
            </p>
          </div>
        </div>

        {/* Info adicional */}
        <div className="mt-6 text-center">
          <p className="text-xs text-neutral-600">
            Universal Poker Administration
          </p>
        </div>
      </div>
    </div>
  );
}

