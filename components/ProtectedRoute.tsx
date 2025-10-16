'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedUserType: 'admin' | 'player';
}

export default function ProtectedRoute({ children, allowedUserType }: ProtectedRouteProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const userType = localStorage.getItem('userType');

    if (!userType) {
      // No user logged in, redirect to login
      router.push('/login');
      return;
    }

    if (userType !== allowedUserType) {
      // Wrong user type, redirect to their correct dashboard
      router.push(`/${userType}/dashboard`);
      return;
    }

    // User is authorized
    setIsAuthorized(true);
    setIsLoading(false);
  }, [router, allowedUserType]);

  if (isLoading || !isAuthorized) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
}

