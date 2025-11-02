import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
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

    // 2. Parse query params
    const { searchParams } = new URL(request.url);
    const month = searchParams.get('month');
    const year = searchParams.get('year');

    // 3. Build query usando a view helper
    let query = supabase
      .from('player_earnings_with_deal')
      .select('*')
      .eq('user_id', user.id);

    // 4. Filtrar por período se fornecido
    if (month) {
      const monthNum = parseInt(month);
      if (monthNum >= 1 && monthNum <= 12) {
        query = query.eq('period_month', monthNum);
      }
    }

    if (year) {
      const yearNum = parseInt(year);
      if (yearNum >= 2025) {
        query = query.eq('period_year', yearNum);
      }
    }

    // 5. Ordenar por período (mais recente primeiro)
    query = query.order('period_year', { ascending: false })
                 .order('period_month', { ascending: false });

    const { data: earnings, error: fetchError } = await query;

    if (fetchError) {
      console.error('Fetch earnings error:', fetchError);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch earnings' },
        { status: 500 }
      );
    }

    // 6. Formatar resposta
    const formattedEarnings = earnings?.map(earning => ({
      id: earning.id,
      dealName: earning.deal_name,
      platformUsername: earning.platform_username,
      periodMonth: earning.period_month,
      periodYear: earning.period_year,
      grossRake: parseFloat(earning.gross_rake || 0),
      netRake: parseFloat(earning.net_rake || 0),
      rakebackAmount: parseFloat(earning.rakeback_amount || 0),
      dataUpdatedAt: earning.data_updated_at,
      paymentStatus: earning.payment_status,
      paymentDate: earning.payment_date,
      paymentAmount: earning.payment_amount ? parseFloat(earning.payment_amount) : null,
      paymentReference: earning.payment_reference
    })) || [];

    return NextResponse.json({
      success: true,
      earnings: formattedEarnings
    });

  } catch (error: unknown) {
    console.error('Get earnings error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

