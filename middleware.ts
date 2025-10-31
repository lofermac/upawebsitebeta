import { createClient } from '@supabase/supabase-js'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // LOG DE TODOS OS COOKIES
  console.log('🍪 TODOS OS COOKIES:', request.cookies.getAll().map(c => c.name))

  // Rotas protegidas
  const isPlayerRoute = request.nextUrl.pathname.startsWith('/player')
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')

  // Se não é rota protegida, deixa passar
  if (!isPlayerRoute && !isAdminRoute) {
    return NextResponse.next()
  }

  console.log('🛡️ Middleware: Rota protegida acessada:', request.nextUrl.pathname)

  // Para rotas protegidas, deixar o cliente verificar a sessão
  // O middleware apenas passa adiante, e os componentes ProtectedRoute farão a verificação real
  const response = NextResponse.next()
  
  // Adicionar header para informar que passou pelo middleware
  response.headers.set('x-middleware-verified', 'true')
  
  console.log('🛡️ Middleware: Permitindo acesso (verificação será feita no cliente)')
  
  return response
}

export const config = {
  matcher: ['/player/:path*', '/admin/:path*'],
}
