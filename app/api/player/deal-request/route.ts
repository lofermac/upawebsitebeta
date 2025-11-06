import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Criar cliente Supabase (Next.js 15)
    const supabase = createRouteHandlerClient({ 
      cookies
    });
    
    // Obter cookieStore para uso posterior
    const cookieStore = await cookies();
    
    // DEBUG: Log de cookies
    console.log('🔍 DEBUG - Cookies disponíveis:', {
      hasCookieStore: !!cookieStore,
      allCookies: cookieStore.getAll().map(c => c.name)
    });

    // 1. Verificar autenticação
    // Primeiro, tentar pegar do header Authorization (prioridade)
    const authHeader = request.headers.get('authorization');
    let user = null;
    let authError = null;

    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      console.log('🔍 DEBUG - Token encontrado no header');
      
      const { data, error } = await supabase.auth.getUser(token);
      user = data.user;
      authError = error;
    } else {
      // Fallback: tentar pegar dos cookies
      console.log('🔍 DEBUG - Tentando autenticação via cookies');
      const { data, error } = await supabase.auth.getUser();
      user = data.user;
      authError = error;
    }

    // DEBUG: Log de autenticação
    console.log('🔍 DEBUG - Auth result:', {
      hasUser: !!user,
      userId: user?.id,
      hasError: !!authError,
      errorMessage: authError?.message
    });
    
    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 2. Parse request body
    const body = await request.json();
    const { dealId, platformUsername, platformEmail } = body;

    // 3. Validar campos obrigatórios
    if (!dealId || !platformUsername || !platformEmail) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 4. Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(platformEmail)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // 5. Verificar se deal existe
    const { data: dealExists } = await supabase
      .from('deals')
      .select('id')
      .eq('id', dealId)
      .single();

    if (!dealExists) {
      return NextResponse.json(
        { success: false, error: 'Deal not found' },
        { status: 404 }
      );
    }

    // 6. Verificar se player já tem esse deal
    const { data: existingDeal } = await supabase
      .from('player_deals')
      .select('id, status')
      .eq('user_id', user.id)
      .eq('deal_id', dealId)
      .single();

    if (existingDeal) {
      return NextResponse.json(
        { 
          success: false, 
          error: `You already have a ${existingDeal.status} request for this deal` 
        },
        { status: 409 }
      );
    }

    // ============================================
    // 1. INSERIR PLAYER_DEAL
    // ============================================

    const { data: newDeal, error: insertError } = await supabase
      .from('player_deals')
      .insert({
        user_id: user.id,
        deal_id: dealId,
        platform_username: platformUsername,
        platform_email: platformEmail,
        status: 'pending',
        requested_at: new Date().toISOString()
      })
      .select()
      .single();

    if (insertError || !newDeal) {
      console.error('Error inserting deal:', insertError);
      return NextResponse.json(
        { success: false, error: insertError?.message || 'Failed to create deal request' },
        { status: 500 }
      );
    }

    // ============================================
    // 2. VERIFICAR E PROCESSAR REFERRAL
    // ============================================

    try {
      // Buscar cookie de referral (reutilizando cookieStore do início)
      const referralCookie = cookieStore.get('referrer_code');
      
      if (referralCookie?.value) {
        console.log('🎯 Referral code encontrado no cookie:', referralCookie.value);
        
        // Buscar sub-affiliate pelo código
        const { data: subAffiliate, error: subAffError } = await supabase
          .from('sub_affiliates')
          .select('id, referral_code, total_referrals')
          .eq('referral_code', referralCookie.value)
          .eq('status', 'active')
          .single();
        
        if (subAffError || !subAffiliate) {
          console.log('⚠️ Sub-affiliate não encontrado ou inativo:', referralCookie.value);
        } else {
          console.log('✅ Sub-affiliate encontrado:', subAffiliate.id);
          
          // Verificar se player JÁ foi referido por alguém (evitar duplicatas)
          const { data: existingReferral } = await supabase
            .from('referrals')
            .select('id')
            .eq('referred_player_id', user.id)
            .single();
          
          if (existingReferral) {
            console.log('ℹ️ Player já tem referral existente - mantendo original');
          } else {
            // Criar registro de referral
            const { error: referralError } = await supabase
              .from('referrals')
              .insert({
                sub_affiliate_id: subAffiliate.id,
                referred_player_id: user.id,
                referral_code_used: referralCookie.value,
                player_deal_id: newDeal.id,
                status: 'pending', // Mesmo status do deal
                created_at: new Date().toISOString()
              });
            
            if (referralError) {
              console.error('❌ Erro ao criar referral:', referralError);
            } else {
              console.log('🎉 Referral criado com sucesso!');
              
              // Incrementar contador no sub-affiliate
              await supabase
                .from('sub_affiliates')
                .update({
                  total_referrals: subAffiliate.total_referrals ? subAffiliate.total_referrals + 1 : 1
                })
                .eq('id', subAffiliate.id);
              
              console.log('📊 Contador de referrals atualizado');
            }
          }
        }
      } else {
        console.log('ℹ️ Nenhum cookie de referral encontrado');
      }
    } catch (referralError) {
      console.error('⚠️ Erro ao processar referral (não crítico):', referralError);
      // Não retornar erro - deal request já foi criado com sucesso
    }

    // ============================================
    // 3. RETORNAR SUCESSO
    // ============================================

    return NextResponse.json({
      success: true,
      dealRequestId: newDeal.id,
      message: 'Deal request submitted successfully. Our team will review it shortly.'
    });

  } catch (error: unknown) {
    console.error('Deal request error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

