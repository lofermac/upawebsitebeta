import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    
    // 1. Verificar autenticação
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
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

    // 7. Inserir deal request
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

    if (insertError) {
      console.error('Insert error:', insertError);
      return NextResponse.json(
        { success: false, error: 'Failed to submit deal request' },
        { status: 500 }
      );
    }

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

