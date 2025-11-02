'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

interface AuthContextType {
  isLoggedIn: boolean;
  userType: 'player' | 'admin' | null;
  user: { email: string; userType: string; full_name?: string } | null;
  login: (email: string, password: string, skipRedirect?: boolean) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  userType: null,
  user: null,
  login: async () => {},
  logout: () => {},
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<'player' | 'admin' | null>(null);
  const [user, setUser] = useState<{ email: string; userType: string; full_name?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Debug: Log do estado atual do user
  console.log('🔍 AuthContext - User atual:', user);
  console.log('🔍 AuthContext - isLoggedIn:', isLoggedIn);

  // Verificar se o usuário já está logado ao carregar a página
  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      console.log('🔍 checkUser - Session:', session);
      
      if (session?.user) {
        console.log('🔍 checkUser - Supabase user:', session.user);
        
        // Buscar o perfil do usuário para saber o tipo (player/admin)
        const { data: profile } = await supabase
          .from('profiles')
          .select('user_type, email, full_name')
          .eq('id', session.user.id)
          .single();

        console.log('🔍 checkUser - Profile data:', profile);

        if (profile) {
          setIsLoggedIn(true);
          setUserType(profile.user_type as 'player' | 'admin');
          setUser({ 
            email: profile.email, 
            userType: profile.user_type,
            full_name: profile.full_name || undefined
          });
          
          console.log('🔍 checkUser - User setado:', {
            email: profile.email,
            userType: profile.user_type,
            full_name: profile.full_name
          });
        }
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string, skipRedirect?: boolean) => {
    try {
      console.log('🔐 Login: Iniciando...', { email });
      
      // Fazer login no Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('🔐 Login: Resposta do Supabase', { data, error });

      if (error) throw error;

      if (data.user) {
        console.log('🔐 Login: Usuário autenticado, buscando profile...');
        
        // Buscar o perfil para saber o tipo de usuário
        const { data: profile } = await supabase
          .from('profiles')
          .select('user_type, email, full_name')
          .eq('id', data.user.id)
          .single();

        console.log('🔐 Login: Profile encontrado', { profile });

        if (profile) {
          setIsLoggedIn(true);
          setUserType(profile.user_type as 'player' | 'admin');
          setUser({ 
            email: profile.email, 
            userType: profile.user_type,
            full_name: profile.full_name || undefined
          });

          console.log('🔐 Login: Estados atualizados', { 
            userType: profile.user_type,
            full_name: profile.full_name,
            skipRedirect 
          });
          
          console.log('🔐 Login: User setado:', {
            email: profile.email,
            userType: profile.user_type,
            full_name: profile.full_name
          });

          // Redirecionar para o dashboard correto
          if (!skipRedirect) {
            if (profile.user_type === 'admin') {
              console.log('🔐 Login: Redirecionando para /admin/dashboard');
              // Aguardar sessão ser salva nos cookies
              await new Promise(resolve => setTimeout(resolve, 500));
              window.location.href = '/admin/dashboard';
            } else {
              console.log('🔐 Login: Redirecionando para /player/dashboard');
              // Aguardar sessão ser salva nos cookies
              await new Promise(resolve => setTimeout(resolve, 500));
              window.location.href = '/player/dashboard';
            }
          }
        }
      }
    } catch (error: unknown) {
      console.error('🔐 Login: ERRO', error);
      throw new Error(error instanceof Error ? error.message : 'Invalid credentials');
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setUserType(null);
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userType, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

