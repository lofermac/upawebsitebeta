import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// Type for Supabase response
interface PlayerDealRow {
  id: string;
  deal_id: number;
  platform_username: string;
  platform_email: string;
  status: string;
  rakeback_percentage: number | null;
  payment_schedule: string | null;
  payment_day: number | null;
  currency: string | null;
  payment_method: string | null;
  requested_at: string;
  approved_at: string | null;
  deals: {
    name: string;
    logo_url: string;
    slug: string;
  } | null;
}

export async function GET() {
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

    // 2. Buscar deals do player com JOIN
    const { data: playerDeals, error: fetchError } = await supabase
      .from('player_deals')
      .select(`
        id,
        deal_id,
        platform_username,
        platform_email,
        status,
        rakeback_percentage,
        payment_schedule,
        payment_day,
        currency,
        payment_method,
        requested_at,
        approved_at,
        deals (
          name,
          logo_url,
          slug
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .returns<PlayerDealRow[]>();

    if (fetchError) {
      console.error('Fetch error:', fetchError);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch deals' },
        { status: 500 }
      );
    }

    // 3. Formatar resposta
    const formattedDeals = playerDeals?.map(deal => ({
      id: deal.id,
      dealId: deal.deal_id,
      dealName: deal.deals?.name || 'Unknown Deal',
      dealLogo: deal.deals?.logo_url || '',
      dealSlug: deal.deals?.slug || '',
      platformUsername: deal.platform_username,
      platformEmail: deal.platform_email,
      status: deal.status,
      rakebackPercentage: deal.rakeback_percentage,
      paymentSchedule: deal.payment_schedule,
      paymentDay: deal.payment_day,
      currency: deal.currency,
      paymentMethod: deal.payment_method,
      requestedAt: deal.requested_at,
      approvedAt: deal.approved_at
    })) || [];

    return NextResponse.json({
      success: true,
      deals: formattedDeals
    });

  } catch (error: unknown) {
    console.error('Get deals error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

