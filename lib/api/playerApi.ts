/**
 * PLAYER API CLIENT
 * 
 * Client-side queries diretas ao Supabase
 * RLS policies protegem os dados automaticamente
 * 
 * @author Universal Poker
 */

import { supabase } from '@/lib/supabase/client';

// ============================================
// TYPES & INTERFACES
// ============================================

export interface DealRequest {
  dealId: number;
  platformUsername: string;
  platformEmail: string;
}

export interface PlayerDeal {
  id: string;
  dealId: number;
  dealName: string;
  dealLogo: string;
  dealSlug: string;
  dealTitle?: string;
  dealMainValue?: string;
  dealMainValueSecondLine?: string;
  dealSubtitle?: string;
  platformUsername: string;
  platformEmail: string;
  status: 'pending' | 'approved' | 'active' | 'rejected' | 'suspended';
  rakebackPercentage: number | null;
  paymentSchedule: string | null;
  paymentDay: number | null;
  currency: string | null;
  paymentMethod: string | null;
  requestedAt: string;
  approvedAt: string | null;
  rejectionReason?: string | null;
}

export interface PlayerEarning {
  id: string;
  dealName: string;
  platformUsername: string;
  periodMonth: number;
  periodYear: number;
  grossRake: number;
  netRake: number;
  rakebackAmount: number;
  dataUpdatedAt: string;
  paymentStatus: 'pending' | 'processing' | 'paid' | 'failed';
  paymentDate: string | null;
  paymentAmount: number | null;
  paymentReference: string | null;
}

// ============================================
// SUPABASE RAW TYPES (from database)
// ============================================

interface SupabasePlayerDeal {
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

interface SupabasePlayerEarning {
  id: string;
  deal_name: string;
  platform_username: string;
  period_month: number;
  period_year: number;
  gross_rake: string;
  net_rake: string;
  rakeback_amount: string;
  data_updated_at: string;
  payment_status: string;
  payment_date: string | null;
  payment_amount: string | null;
  payment_reference: string | null;
}


// ============================================
// API FUNCTIONS
// ============================================

/**
 * Solicita acesso a um deal
 * @param data - Dados da solicitação (dealId, username, email)
 * @returns Promise com resultado da operação
 */
export async function requestDeal(data: DealRequest): Promise<{
  success: boolean;
  dealRequestId?: string;
  message?: string;
  error?: string;
}> {
  try {
    // 1. Verificar se está autenticado
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return { success: false, error: 'Not authenticated' };
    }

    // 2. Inserir deal request
    const { data: newDeal, error: insertError } = await supabase
      .from('player_deals')
      .insert({
        user_id: user.id,
        deal_id: data.dealId,
        platform_username: data.platformUsername,
        platform_email: data.platformEmail,
        status: 'pending',
      })
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      
      // Checar se é duplicata
      if (insertError.code === '23505') {
        return { success: false, error: 'You already have a request for this deal' };
      }
      
      return { success: false, error: insertError.message };
    }

    return {
      success: true,
      dealRequestId: newDeal.id,
      message: 'Deal request submitted successfully. Our team will review it shortly.'
    };
  } catch (error: unknown) {
    console.error('Request deal error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Network error' };
  }
}

/**
 * Busca todos os deals do player logado
 * @returns Promise com lista de deals
 */
export async function getPlayerDeals(): Promise<{
  success: boolean;
  deals?: PlayerDeal[];
  error?: string;
}> {
  console.log('🚀 [playerApi] getPlayerDeals() chamado');
  
  try {
    // 1. Verificar autenticação
    console.log('🔍 [playerApi] Verificando autenticação...');
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    console.log('🔍 [playerApi] User:', user?.id);
    console.log('🔍 [playerApi] Auth error:', authError);
    
    if (authError || !user) {
      console.log('❌ [playerApi] Not authenticated');
      return { success: false, error: 'Not authenticated' };
    }

    // 2. Buscar deals com JOIN
    console.log('🔍 [playerApi] Fazendo fetch de player_deals para user:', user.id);
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
        rejection_reason,
        deals (
          name,
          logo_url,
          slug,
          title,
          main_value,
          main_value_second_line,
          subtitle
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    console.log('🔍 [playerApi] Fetch result:', { data: playerDeals, error: fetchError });
    console.log('🔍 [playerApi] Total deals encontrados:', playerDeals?.length || 0);

    if (fetchError) {
      console.error('❌ [playerApi] Fetch error:', fetchError);
      return { success: false, error: fetchError.message };
    }

    // 3. Formatar resposta
    console.log('🔍 [playerApi] Formatando deals...');
    const formattedDeals: PlayerDeal[] = (playerDeals || []).map((deal) => {
      // Supabase JOIN pode retornar deals como array, pegar o primeiro
      const dealInfo = Array.isArray(deal.deals) ? deal.deals[0] : deal.deals;
      
      return {
        id: deal.id,
        dealId: deal.deal_id,
        dealName: dealInfo?.name || 'Unknown Deal',
        dealLogo: dealInfo?.logo_url || '',
        dealSlug: dealInfo?.slug || '',
        dealTitle: dealInfo?.title,
        dealMainValue: dealInfo?.main_value,
        dealMainValueSecondLine: dealInfo?.main_value_second_line,
        dealSubtitle: dealInfo?.subtitle,
        platformUsername: deal.platform_username,
        platformEmail: deal.platform_email,
        status: deal.status as 'pending' | 'approved' | 'active' | 'rejected' | 'suspended',
        rakebackPercentage: deal.rakeback_percentage,
        paymentSchedule: deal.payment_schedule,
        paymentDay: deal.payment_day,
        currency: deal.currency,
        paymentMethod: deal.payment_method,
        requestedAt: deal.requested_at,
        approvedAt: deal.approved_at,
        rejectionReason: deal.rejection_reason
      };
    });

    console.log('✅ [playerApi] Deals formatados:', formattedDeals);
    console.log('✅ [playerApi] Primeiro deal com rejectionReason:', formattedDeals[0]?.rejectionReason);
    console.log('✅ [playerApi] Todos rejection reasons:', 
      formattedDeals.map(d => ({ 
        name: d.dealName, 
        status: d.status, 
        rejection: d.rejectionReason 
      }))
    );
    console.log('✅ [playerApi] Retornando sucesso com', formattedDeals.length, 'deals');

    return { success: true, deals: formattedDeals };
  } catch (error: unknown) {
    console.error('❌ [playerApi] Erro no catch:', error);
    console.error('❌ [playerApi] Get player deals error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Network error' };
  }
}

/**
 * Busca earnings do player (com filtros opcionais)
 * @param params - Parâmetros opcionais (month, year)
 * @returns Promise com lista de earnings
 */
export async function getPlayerEarnings(params?: {
  month?: number;
  year?: number;
}): Promise<{
  success: boolean;
  earnings?: PlayerEarning[];
  error?: string;
}> {
  try {
    // 1. Verificar autenticação
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return { success: false, error: 'Not authenticated' };
    }

    // 2. Build query usando a view helper
    let query = supabase
      .from('player_earnings_with_deal')
      .select('*')
      .eq('user_id', user.id);

    // 3. Filtrar por período se fornecido
    if (params?.month) {
      query = query.eq('period_month', params.month);
    }

    if (params?.year) {
      query = query.eq('period_year', params.year);
    }

    // 4. Ordenar por período (mais recente primeiro)
    query = query
      .order('period_year', { ascending: false })
      .order('period_month', { ascending: false });

    const { data: earnings, error: fetchError } = await query;

    if (fetchError) {
      console.error('Fetch earnings error:', fetchError);
      return { success: false, error: fetchError.message };
    }

    // 5. Formatar resposta
    const formattedEarnings: PlayerEarning[] = (earnings || []).map((earning) => ({
      id: earning.id,
      dealName: earning.deal_name,
      platformUsername: earning.platform_username,
      periodMonth: earning.period_month,
      periodYear: earning.period_year,
      grossRake: parseFloat(earning.gross_rake || '0'),
      netRake: parseFloat(earning.net_rake || '0'),
      rakebackAmount: parseFloat(earning.rakeback_amount || '0'),
      dataUpdatedAt: earning.data_updated_at,
      paymentStatus: earning.payment_status as 'pending' | 'processing' | 'paid' | 'failed',
      paymentDate: earning.payment_date,
      paymentAmount: earning.payment_amount ? parseFloat(earning.payment_amount) : null,
      paymentReference: earning.payment_reference
    }));

    return { success: true, earnings: formattedEarnings };
  } catch (error: unknown) {
    console.error('Get player earnings error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Network error' };
  }
}
