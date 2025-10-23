'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/contexts/AuthContext';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onSuccess: () => void;
}

export default function LoginForm({ onSwitchToRegister, onSuccess }: LoginFormProps) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validação básica (não precisa validar email format pois aceita "player")
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = 'Username is required';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Tentar login (aceita qualquer credencial por enquanto - mock)
    setIsLoading(true);
    try {
      await login(email, password, true); // skipRedirect = true quando login via modal
      onSuccess(); // Fecha modal e abre Join Deal
    } catch {
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      {/* Título */}
      <div className="text-center mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-1.5"
            style={{ 
              textShadow: '0 2px 16px rgba(0,0,0,0.4)',
              letterSpacing: '-0.02em'
            }}>
          Log In
        </h2>
        <p className="text-sm text-gray-400 leading-relaxed font-normal">
          Before you can apply to our deal, you need to log in to your Universal Poker account.
        </p>
      </div>

      {/* Erro geral */}
      {errors.general && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm">
          {errors.general}
        </div>
      )}

      {/* Username Field */}
      <div className="space-y-2">
        <label htmlFor="login-email" className="block text-sm font-semibold text-gray-300 tracking-tight">
          Username<span className="text-[#10b981] ml-1">*</span>
        </label>
        <div className="relative group/input">
          {/* Ícone */}
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
            <Mail className={`h-4 w-4 transition-colors duration-300 ${
              errors.email 
                ? 'text-red-400' 
                : 'text-gray-500 group-hover/input:text-gray-400 group-focus-within/input:text-[#077124]'
            }`} strokeWidth={2} />
          </div>
          
          {/* Glow effect on focus */}
          <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300 blur-xl bg-[#077124]/10"></div>
          
          <input
            id="login-email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`relative w-full pl-12 pr-4 py-3 bg-black/40 border rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 hover:bg-black/50 ${
              errors.email
                ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20'
                : 'border-white/[0.08] focus:border-[#077124]/50 focus:ring-[#077124]/20 hover:border-white/[0.12]'
            }`}
            placeholder="admin or player"
            style={{
              boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.3)'
            }}
          />
        </div>
        {errors.email && (
          <p className="text-red-400 text-xs mt-1 ml-1">{errors.email}</p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <label htmlFor="login-password" className="block text-sm font-semibold text-gray-300 tracking-tight">
          Password<span className="text-[#10b981] ml-1">*</span>
        </label>
        <div className="relative group/input">
          {/* Ícone cadeado */}
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
            <Lock className={`h-4 w-4 transition-colors duration-300 ${
              errors.password 
                ? 'text-red-400' 
                : 'text-gray-500 group-hover/input:text-gray-400 group-focus-within/input:text-[#077124]'
            }`} strokeWidth={2} />
          </div>
          
          {/* Glow effect on focus */}
          <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300 blur-xl bg-[#077124]/10"></div>
          
          <input
            id="login-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`relative w-full pl-12 pr-12 py-3 bg-black/40 border rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 hover:bg-black/50 ${
              errors.password
                ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20'
                : 'border-white/[0.08] focus:border-[#077124]/50 focus:ring-[#077124]/20 hover:border-white/[0.12]'
            }`}
            placeholder="••••••••"
            style={{
              boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.3)'
            }}
          />
          
          {/* Botão toggle password */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300 transition-colors duration-300 z-10"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" strokeWidth={2} />
            ) : (
              <Eye className="h-4 w-4" strokeWidth={2} />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-400 text-xs mt-1 ml-1">{errors.password}</p>
        )}
      </div>

      {/* Submit Button - Mesmo estilo da /register */}
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
          {/* Glows */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#077124] via-[#0a9b30] to-[#077124] rounded-full blur-xl opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>
          <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 via-[#077124] to-emerald-400 rounded-full blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-500"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 via-white/5 to-transparent" style={{ height: '50%' }}></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 skew-x-12"></div>
          <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]"></div>
          
          <span className="relative z-10 tracking-wide drop-shadow-lg">
            {isLoading ? 'Logging in...' : 'Log In'}
          </span>
          
          <div className="absolute inset-x-0 top-[1px] h-px bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"></div>
          <div className="absolute inset-x-0 bottom-[1px] h-px bg-gradient-to-r from-transparent via-black/50 to-transparent rounded-full"></div>
        </button>
      </div>

      {/* Switch to Register */}
      <div className="text-center mt-4">
        <p className="text-sm text-gray-400 font-normal">
          Don&apos;t have an account?
        </p>
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-sm text-[#077124] font-semibold hover:text-[#0a9b30] hover:underline underline-offset-4 transition-colors duration-300 mt-1"
        >
          Register
        </button>
      </div>
    </form>
  );
}
