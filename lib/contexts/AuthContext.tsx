'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

type UserType = 'admin' | 'player' | null;

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: { email: string; fullName?: string; userType?: UserType } | null;
  userType: UserType;
  login: (email: string, password: string, skipRedirect?: boolean) => Promise<void>;
  register: (data: RegisterData, skipRedirect?: boolean) => Promise<void>;
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
  const [isLoading, setIsLoading] = useState(true); // Começa como loading
  const [user, setUser] = useState<{ email: string; fullName?: string; userType?: UserType } | null>(null);
  const [userType, setUserType] = useState<UserType>(null);
  const router = useRouter();

  // Load auth state from localStorage on mount
  useEffect(() => {
    const storedUserType = localStorage.getItem('userType') as UserType;
    const storedEmail = localStorage.getItem('userEmail');
    if (storedUserType && storedEmail) {
      setUserType(storedUserType);
      setIsLoggedIn(true);
      setUser({ email: storedEmail, userType: storedUserType });
    }
    setIsLoading(false); // Terminou de carregar
  }, []);

  const login = async (email: string, password: string, skipRedirect?: boolean) => {
    // Mock authentication with validation
    await new Promise(resolve => setTimeout(resolve, 300)); // Simula delay de API
    
    // Validar credenciais
    if (email === 'admin' && password === 'admin') {
      setUserType('admin');
      setIsLoggedIn(true);
      setUser({ email, userType: 'admin' });
      localStorage.setItem('userType', 'admin');
      localStorage.setItem('userEmail', email);
      if (!skipRedirect) {
        router.push('/admin/dashboard');
      }
    } else if (email === 'player' && password === 'player') {
      setUserType('player');
      setIsLoggedIn(true);
      setUser({ email, userType: 'player' });
      localStorage.setItem('userType', 'player');
      localStorage.setItem('userEmail', email);
      if (!skipRedirect) {
        router.push('/player/dashboard');
      }
    } else {
      // Credenciais inválidas
      throw new Error('Invalid credentials');
    }
  };

  const register = async (data: RegisterData, skipRedirect?: boolean) => {
    // TODO: Integrar com Supabase
    // Por enquanto, mock authentication
    await new Promise(resolve => setTimeout(resolve, 500)); // Simula delay de API
    
    console.log('Register mockado:', data);
    setUserType('player'); // Novos registros são players por padrão
    setIsLoggedIn(true);
    setUser({ email: data.email, fullName: data.fullName, userType: 'player' });
    localStorage.setItem('userType', 'player');
    localStorage.setItem('userEmail', data.email);
    
    if (!skipRedirect) {
      router.push('/player/dashboard');
    }
  };

  const logout = () => {
    setUserType(null);
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('userType');
    localStorage.removeItem('userEmail');
    router.push('/'); // Redireciona para homepage
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, user, userType, login, register, logout }}>
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

