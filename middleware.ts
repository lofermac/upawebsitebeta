import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // ============================================
  // TRACKING DE REFERRAL
  // ============================================
  
  // Verificar se tem query param ref=CODIGO
  const referralCode = searchParams.get('ref');
  
  if (referralCode && pathname === '/deals') {
    // Verificar se JÁ tem cookie (first click wins)
    const existingReferral = request.cookies.get('referrer_code');
    
    const response = NextResponse.redirect(new URL('/deals', request.url));
    
    // Só salvar cookie se NÃO existir (first click wins)
    if (!existingReferral) {
      response.cookies.set('referrer_code', referralCode, {
        maxAge: 60 * 60 * 24 * 7, // 7 dias em segundos
        path: '/',
        httpOnly: false, // Precisa ser acessível no client-side também
        sameSite: 'lax',
      });
      
      console.log('🎯 Referral code saved:', referralCode);
    } else {
      console.log('🔒 Referral já existe (first click wins):', existingReferral.value);
    }
    
    return response;
  }

  // ============================================
  // PROTEÇÃO DE ROTAS (código existente)
  // ============================================
  
  const isPlayerRoute = pathname.startsWith('/player');
  const isAdminRoute = pathname.startsWith('/admin');

  if (!isPlayerRoute && !isAdminRoute) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  response.headers.set('x-middleware-verified', 'true');
  
  return response;
}

export const config = {
  matcher: [
    '/deals',           // Adicionar /deals ao matcher
    '/player/:path*',
    '/admin/:path*',
  ],
};
