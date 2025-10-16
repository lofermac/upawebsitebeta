'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type UserType = 'admin' | 'player' | null;

interface AuthContextType {
  userType: UserType;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userType, setUserType] = useState<UserType>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Load auth state from localStorage on mount
  useEffect(() => {
    const storedUserType = localStorage.getItem('userType') as UserType;
    if (storedUserType) {
      setUserType(storedUserType);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    // Mock authentication logic
    if (email === 'admin' && password === 'admin') {
      setUserType('admin');
      setIsAuthenticated(true);
      localStorage.setItem('userType', 'admin');
      router.push('/admin/dashboard');
      return true;
    } else if (email === 'player' && password === 'player') {
      setUserType('player');
      setIsAuthenticated(true);
      localStorage.setItem('userType', 'player');
      router.push('/player/dashboard');
      return true;
    }
    return false;
  };

  const logout = () => {
    setUserType(null);
    setIsAuthenticated(false);
    localStorage.removeItem('userType');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ userType, login, logout, isAuthenticated }}>
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

