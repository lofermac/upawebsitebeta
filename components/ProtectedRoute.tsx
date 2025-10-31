'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedUserType: 'admin' | 'player';
}

export default function ProtectedRoute({ children, allowedUserType }: ProtectedRouteProps) {
  const router = useRouter();
  const { isLoggedIn, userType, loading } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Aguardar o loading terminar
    if (loading) return;

    console.log('🛡️ ProtectedRoute: Verificando autorização', { isLoggedIn, userType, allowedUserType });

    if (!isLoggedIn) {
      // No user logged in, redirect to login
      console.log('🛡️ ProtectedRoute: Não logado, redirecionando para login');
      router.push('/login');
      return;
    }

    if (userType !== allowedUserType) {
      // Wrong user type, redirect to their correct dashboard
      console.log('🛡️ ProtectedRoute: Tipo errado, redirecionando para', `/${userType}/dashboard`);
      router.push(`/${userType}/dashboard`);
      return;
    }

    // User is authorized
    console.log('🛡️ ProtectedRoute: Autorizado!');
    setIsAuthorized(true);
  }, [loading, isLoggedIn, userType, router, allowedUserType]);

  // Mostrar loading enquanto verifica auth
  if (loading || (!isAuthorized && isLoggedIn)) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#10b981]/30 border-t-[#10b981] rounded-full animate-spin"></div>
          <div className="text-white text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  // Se não está autorizado, não renderiza nada (está redirecionando)
  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}
