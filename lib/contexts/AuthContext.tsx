'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  user: { email: string; fullName?: string } | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

interface RegisterData {
  email: string;
  password: string;
  country: string;
  fullName?: string;
  telegram?: string;
  discord?: string;
  agreeTerms: boolean;
  agreePrivacy: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ email: string; fullName?: string } | null>(null);

  const login = async (email: string, password: string) => {
    // TODO: Integrar com Supabase
    // Por enquanto, mock authentication
    await new Promise(resolve => setTimeout(resolve, 500)); // Simula delay de API
    
    console.log('Login mockado:', { email, password });
    setIsLoggedIn(true);
    setUser({ email });
  };

  const register = async (data: RegisterData) => {
    // TODO: Integrar com Supabase
    // Por enquanto, mock authentication
    await new Promise(resolve => setTimeout(resolve, 500)); // Simula delay de API
    
    console.log('Register mockado:', data);
    setIsLoggedIn(true);
    setUser({ email: data.email, fullName: data.fullName });
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    console.log('Logout executado');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

