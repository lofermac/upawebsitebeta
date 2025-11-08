import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  
  console.log('🔵 ============================================');
  console.log('🔵 MIDDLEWARE INICIADO');
  console.log('🔵 Path:', pathname);
  console.log('🔵 Cookies disponíveis:', request.cookies.getAll().map(c => c.name));
  console.log('🔵 ============================================');
  
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // ============================================
  // TRACKING DE REFERRAL
  // ============================================
  
  const referralCode = searchParams.get('ref');
  
  if (referralCode && pathname === '/deals') {
    const existingReferral = request.cookies.get('referrer_code');
    
    response = NextResponse.redirect(new URL('/deals', request.url));
    
    if (!existingReferral) {
      response.cookies.set('referrer_code', referralCode, {
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
        httpOnly: false,
        sameSite: 'lax',
      });
      
      console.log('🎯 Referral code saved:', referralCode);
    } else {
      console.log('🔒 Referral já existe (first click wins):', existingReferral.value);
    }
    
    return response;
  }

  // ============================================
  // PROTEÇÃO DE ROTAS
  // ============================================
  
  const isPlayerRoute = pathname.startsWith('/player');
  const isAdminRoute = pathname.startsWith('/admin');
  const isAdminLoginRoute = pathname === '/admin/login';

  console.log('🔵 Análise de rota:');
  console.log('🔵 - isPlayerRoute:', isPlayerRoute);
  console.log('🔵 - isAdminRoute:', isAdminRoute);
  console.log('🔵 - isAdminLoginRoute:', isAdminLoginRoute);

  // Rotas públicas - não verificar autenticação
  if (!isPlayerRoute && !isAdminRoute) {
    console.log('✅ Rota pública - passando sem verificação');
    return response;
  }

  // Admin login é público
  if (isAdminLoginRoute) {
    console.log('✅ Admin login - rota pública');
    return response;
  }

  console.log('🔵 Rota protegida detectada - verificando autenticação...');

  // Criar cliente Supabase com cookies do middleware
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          const value = request.cookies.get(name)?.value;
          console.log('🍪 Cookie GET:', name, '=', value ? 'presente' : 'ausente');
          return value;
        },
        set(name: string, value: string, options: CookieOptions) {
          console.log('🍪 Cookie SET:', name);
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          console.log('🍪 Cookie REMOVE:', name);
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  // Verificar sessão do Supabase
  try {
    console.log('🔵 Chamando supabase.auth.getUser()...');
    const { data: { user }, error } = await supabase.auth.getUser();

    console.log('🔵 ============================================');
    console.log('🔵 RESULTADO getUser():');
    console.log('🔵 - User ID:', user?.id || 'NULL');
    console.log('🔵 - User Email:', user?.email || 'NULL');
    console.log('🔵 - Error:', error?.message || 'none');
    console.log('🔵 - Error Status:', error?.status || 'none');
    console.log('🔵 ============================================');

    // Se não há usuário autenticado, redirecionar para login
    if (!user || error) {
      console.log('❌ SEM AUTENTICAÇÃO - Redirecionando para login');
      console.log('❌ Motivo:', !user ? 'Usuário null' : `Erro: ${error?.message}`);
      
      if (isAdminRoute) {
        console.log('❌ Redirecionando para: /admin/login');
        return NextResponse.redirect(new URL('/admin/login', request.url));
      } else {
        console.log('❌ Redirecionando para: /login');
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }

    console.log('✅ Usuário autenticado! Verificando perfil...');

    // Buscar perfil para verificar tipo de usuário
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('user_type')
      .eq('id', user.id)
      .single();

    console.log('🔵 ============================================');
    console.log('🔵 RESULTADO Profile:');
    console.log('🔵 - Profile:', profile);
    console.log('🔵 - Profile Error:', profileError?.message || 'none');
    console.log('🔵 - User Type:', profile?.user_type || 'NULL');
    console.log('🔵 ============================================');

    // Verificar se o tipo de usuário corresponde à rota
    if (isAdminRoute && profile?.user_type !== 'admin') {
      console.log('❌ Player tentando acessar rota admin');
      console.log('❌ Redirecionando para: /player/dashboard');
      return NextResponse.redirect(new URL('/player/dashboard', request.url));
    }

    if (isPlayerRoute && profile?.user_type === 'admin') {
      console.log('❌ Admin tentando acessar rota player');
      console.log('❌ Redirecionando para: /admin/dashboard');
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    console.log('✅✅✅ ACESSO PERMITIDO! ✅✅✅');
    console.log('✅ User:', user.email);
    console.log('✅ Type:', profile?.user_type);
    console.log('✅ Path:', pathname);
    console.log('🔵 ============================================');
    return response;
    
  } catch (error) {
    console.error('❌❌❌ ERRO CRÍTICO NO MIDDLEWARE ❌❌❌');
    console.error('❌ Error:', error);
    console.error('❌ Stack:', error instanceof Error ? error.stack : 'N/A');
    console.log('🔵 ============================================');
    
    // Em caso de erro, redirecionar para login
    if (isAdminRoute) {
      console.log('❌ Redirecionando para: /admin/login (erro)');
      return NextResponse.redirect(new URL('/admin/login', request.url));
    } else {
      console.log('❌ Redirecionando para: /login (erro)');
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
}

export const config = {
  matcher: [
    '/deals',
    '/player/:path*',
    '/admin/:path*',
  ],
};
