'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/lib/contexts/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  FileText, 
  LogOut,
  Menu,
  X,
  Building2,
  TrendingUp,
  Globe,
  LayoutGrid,
  FileCheck,
  RefreshCw
} from 'lucide-react';
import { getDeals } from '@/lib/supabase/deals';
import RejectDealModal from '@/components/admin/RejectDealModal';
import ViewNotesModal from '@/components/admin/ViewNotesModal';
import ReactCountryFlag from 'react-country-flag';
import { supabase } from '@/lib/supabase/client';

// Interface for Player Profile Modal
interface PlayerProfile {
  name: string;
  email: string;
  flag: string;
  country: string;
  totalDeals: number;
  totalRake: string;
  ytdRake: string;
  joined: string;
  lastPayment: string;
  status: string;
  telegram?: string;
  whatsapp?: string;
  discord?: string;
  deals: Array<{
    name: string;
    username: string;
    status: string;
    logo?: string;
  }>;
}

// Database types
interface PlayerEarning {
  rakeback_amount: number | string;
  payment_date: string | null;
  period_year: number;
  player_deals?: {
    user_id: string;
  };
}

interface PlayerDeal {
  id: string;
  deal_id: string;
  status: string;
  platform_username: string;
  platform_email: string;
  updated_at: string;
  deals?: {
    name: string;
    logo_url: string;
    slug: string;
  } | null;
}

interface PlayerProfile_DB {
  id: string;
  email: string;
  full_name: string | null;
  country: string | null;
  created_at: string;
  discord_id: string | null;
  whatsapp: string | null;
  telegram: string | null;
}

interface PlayerData {
  id: string;
  name: string;
  email: string;
  country: string;
  discord: string | null;
  whatsapp: string | null;
  telegram: string | null;
  totalDeals: number;
  totalRake: number;
  ytdRake: number;
  joined: string;
  lastPayment: string | null;
  status: string;
  deals: Array<{
    name: string;
    username: string;
    status: string;
    logo: string;
  }>;
}

// Interface for Deal Metrics (Dashboard)
interface DealMetrics {
  id: number;
  name: string;
  logo: string | null;
  slug: string;
  totalPlayers: number;
  activePlayers: number;
  inactivePlayers: number;
  monthlyGrossRake: number;
  monthlyNetRake: number;
  avgPerPlayer: number;
  growthPercentage: number;
  isMocked: boolean;
}

// CSV Upload error type
interface CsvUploadError {
  row: number;
  error: string;
  line?: string;
  player?: string;
}

// Upload history type
interface UploadHistory {
  id: string;
  deal_id: number;
  uploaded_by: string;
  period_month: number;
  period_year: number;
  rows_processed: number;
  rows_failed: number;
  status: string;
  created_at: string;
  deals?: {
    name: string;
  };
  profiles?: {
    full_name: string;
  };
}

// Network platforms data (commented out as not currently used)
// const platformsData = [
//   {
//     id: 1,
//     name: 'WPT Global',
//     code: 'WPT',
//     logo: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/01/07105909/WPT-LOGO-WebP-1920x350-1-1024x168.webp',
//     totalPlayers: 142,
//     standardPlayers: 124,
//     exclusivePlayers: 18,
//     monthlyRake: '$24,500',
//     commissionDue: '$6,125',
//     avgPerPlayer: '$173',
//     trend: '+8%',
//     trendPositive: true
//   },
//   {
//     id: 2,
//     name: 'GGPoker',
//     code: 'GG',
//     logo: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/09/07144333/ggpoker_logo-1_white-1.webp',
//     totalPlayers: 354,
//     standardPlayers: 312,
//     exclusivePlayers: 42,
//     monthlyRake: '$51,200',
//     commissionDue: '$12,800',
//     avgPerPlayer: '$145',
//     trend: '+15%',
//     trendPositive: true
//   },
//   {
//     id: 3,
//     name: 'Unibet',
//     code: 'UNI',
//     logo: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/08/15110203/Unitbet-Logo.png',
//     totalPlayers: 96,
//     standardPlayers: 87,
//     exclusivePlayers: 9,
//     monthlyRake: '$9,800',
//     commissionDue: '$2,450',
//     avgPerPlayer: '$102',
//     trend: '-3%',
//     trendPositive: false
//   },
//   {
//     id: 4,
//     name: 'Champion Poker',
//     code: 'CHP',
//     logo: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/17184626/CHAMPIONPOKER-logo-1024x160.webp',
//     totalPlayers: 63,
//     standardPlayers: 56,
//     exclusivePlayers: 7,
//     monthlyRake: '$4,100',
//     commissionDue: '$1,025',
//     avgPerPlayer: '$65',
//     trend: '+5%',
//     trendPositive: true
//   },
//   {
//     id: 5,
//     name: '888poker',
//     code: '888',
//     logo: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/09/17183728/888-LOGO-webp-1024x309.webp',
//     totalPlayers: 228,
//     standardPlayers: 203,
//     exclusivePlayers: 25,
//     monthlyRake: '$18,700',
//     commissionDue: '$4,675',
//     avgPerPlayer: '$82',
//     trend: '+11%',
//     trendPositive: true
//   },
//   {
//     id: 6,
//     name: 'PartyPoker',
//     code: 'PP',
//     logo: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/07/07144334/ENT_PartyPoker_Landscape_FullWhite_RGB.png',
//     totalPlayers: 199,
//     standardPlayers: 178,
//     exclusivePlayers: 21,
//     monthlyRake: '$15,300',
//     commissionDue: '$3,825',
//     avgPerPlayer: '$77',
//     trend: '+6%',
//     trendPositive: true
//   },
//   {
//     id: 7,
//     name: 'Optibet',
//     code: 'OPT',
//     logo: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/09/17100841/Optibet-Poker-logo-2D-horizontal-red-bg-1024x298.png',
//     totalPlayers: 49,
//     standardPlayers: 44,
//     exclusivePlayers: 5,
//     monthlyRake: '$3,200',
//     commissionDue: '$800',
//     avgPerPlayer: '$65',
//     trend: '-1%',
//     trendPositive: false
//   },
//   {
//     id: 8,
//     name: 'Betfair',
//     code: 'BF',
//     logo: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/09/17185334/Betfair-Website-Logo-1-1-1-1024x185.webp',
//     totalPlayers: 103,
//     standardPlayers: 92,
//     exclusivePlayers: 11,
//     monthlyRake: '$7,200',
//     commissionDue: '$1,800',
//     avgPerPlayer: '$70',
//     trend: '+4%',
//     trendPositive: true
//   },
//   {
//     id: 9,
//     name: 'WSOP.ca',
//     code: 'WSOP',
//     logo: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/12/11192441/wsop-ontario-logo-1024x376.webp',
//     totalPlayers: 69,
//     standardPlayers: 61,
//     exclusivePlayers: 8,
//     monthlyRake: '$5,400',
//     commissionDue: '$1,350',
//     avgPerPlayer: '$78',
//     trend: '+9%',
//     trendPositive: true
//   },
// ];

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dealsCount, setDealsCount] = useState(0);
  
  // Players Tab - Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortFilter, setSortFilter] = useState('joined-desc');
  
  // Players Tab - Modal States
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerProfile | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // CSV Upload Tab States
  const [selectedDeal, setSelectedDeal] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvPreview, setCsvPreview] = useState<Record<string, string>[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadHistory, setUploadHistory] = useState<UploadHistory[]>([]);
  const [uploadResult, setUploadResult] = useState<{
    success: boolean;
    message: string;
    errors?: CsvUploadError[];
  } | null>(null);

  // Players Tab - Real Data States
  const [playersData, setPlayersData] = useState<PlayerData[]>([]);
  const [playersStats, setPlayersStats] = useState({
    totalPlayers: 0,
    activePlayers: 0,
    newThisMonth: 0,
    newToday: 0,
  });
  const [loadingPlayers, setLoadingPlayers] = useState(true);

  // Dashboard Tab - Real Data States
  const [dashboardStats, setDashboardStats] = useState({
    totalPlayers: 0,
    activePlayers: 0,
    monthlySignUps: 0,
    monthlyDealsApplications: 0
  });
  const [dealsData, setDealsData] = useState<DealMetrics[]>([]);
  const [loadingDashboard, setLoadingDashboard] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Load deals count
  useEffect(() => {
    async function loadDealsCount() {
      const { data } = await getDeals();
      setDealsCount(data?.length || 0);
    }
    loadDealsCount();
  }, []);

  // Load Players Data
  useEffect(() => {
    async function loadPlayersData() {
      if (activeTab !== 'players') return;
      
      setLoadingPlayers(true);

      try {
        // Buscar todos os players
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('id, email, full_name, country, created_at, discord_id, whatsapp, telegram')
          .eq('user_type', 'player')
          .order('created_at', { ascending: false });

        if (profilesError) {
          console.error('❌ Erro ao buscar profiles:', profilesError);
          setLoadingPlayers(false);
          return;
        }

        console.log('✅ Profiles carregados:', profiles?.length);

        // Buscar stats
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
        const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString();

        // New This Month
        const { count: newThisMonth } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .eq('user_type', 'player')
          .gte('created_at', startOfMonth);

        // New Today
        const { count: newToday } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .eq('user_type', 'player')
          .gte('created_at', startOfToday);

        // Active Players (com earnings nos últimos 90 dias)
        const { data: recentEarnings } = await supabase
          .from('player_earnings')
          .select('player_deals!inner(user_id)')
          .gte('payment_date', ninetyDaysAgo);

        const activePlayerIds = new Set(
          (recentEarnings as PlayerEarning[] | null)?.map((e) => e.player_deals?.user_id).filter(Boolean) || []
        );

        setPlayersStats({
          totalPlayers: profiles?.length || 0,
          activePlayers: activePlayerIds.size,
          newThisMonth: newThisMonth || 0,
          newToday: newToday || 0,
        });

        // Para cada player, buscar deals e earnings
        const playersWithData = await Promise.all(
          (profiles || []).map(async (player: PlayerProfile_DB) => {
            // Buscar deals do player
            const { data: playerDeals } = await supabase
              .from('player_deals')
              .select(`
                id,
                deal_id,
                status,
                platform_username,
                platform_email,
                updated_at,
                deals (
                  name,
                  logo_url,
                  slug
                )
              `)
              .eq('user_id', player.id);

            // Contar TODOS os deals (independente do status)
            const totalDeals = playerDeals?.length || 0;

            // Buscar earnings
            const dealIds = (playerDeals as PlayerDeal[] | null)?.map((d) => d.id) || [];
            let totalRake = 0;
            let ytdRake = 0;
            let lastPayment = null;

            if (dealIds.length > 0) {
              const { data: earnings } = await supabase
                .from('player_earnings')
                .select('rakeback_amount, payment_date, period_year')
                .in('player_deal_id', dealIds)
                .eq('payment_status', 'paid');

              if (earnings) {
                totalRake = earnings.reduce((sum: number, e: PlayerEarning) => sum + (Number(e.rakeback_amount) || 0), 0);
                const currentYear = new Date().getFullYear();
                ytdRake = earnings
                  .filter((e: PlayerEarning) => e.period_year === currentYear)
                  .reduce((sum: number, e: PlayerEarning) => sum + (Number(e.rakeback_amount) || 0), 0);

                // Último pagamento
                const payments = earnings
                  .filter((e: PlayerEarning) => e.payment_date)
                  .map((e: PlayerEarning) => new Date(e.payment_date as string))
                  .sort((a: Date, b: Date) => b.getTime() - a.getTime());

                lastPayment = payments[0] || null;
              }
            }

            // Status: Active se teve payment nos últimos 90 dias
            const isActive = activePlayerIds.has(player.id);

            return {
              id: player.id,
              name: player.full_name || 'No Name',
              email: player.email,
              country: player.country || 'US',
              discord: player.discord_id,
              whatsapp: player.whatsapp,
              telegram: player.telegram,
              totalDeals,
              totalRake,
              ytdRake,
              joined: player.created_at,
              lastPayment: lastPayment ? lastPayment.toISOString() : null,
              status: isActive ? 'Active' : 'Inactive',
              deals: (playerDeals as PlayerDeal[] | null)?.map((d) => ({
                name: d.deals?.name || 'Unknown',
                username: d.platform_username,
                status: d.status,
                logo: d.deals?.logo_url || ''
              })) || []
            };
          })
        );

        console.log('✅ Players processados:', playersWithData.length);
        setPlayersData(playersWithData);
      } catch (error) {
        console.error('❌ Erro ao carregar players:', error);
      } finally {
        setLoadingPlayers(false);
      }
    }

    loadPlayersData();
  }, [activeTab]);

  // Load Dashboard Data
  useEffect(() => {
    async function loadDashboardData() {
      if (activeTab !== 'dashboard') return;
      
      console.log('🔄 [Dashboard] Carregando dados da dashboard...');
      setLoadingDashboard(true);

      try {
        // 1. TOTAL PLAYERS
        const { count: totalPlayers } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .eq('user_type', 'player');

        console.log('✅ [Dashboard] Total Players:', totalPlayers);

        // 2. ACTIVE PLAYERS (status='approved')
        const { data: activeDeals } = await supabase
          .from('player_deals')
          .select('user_id')
          .eq('status', 'approved');
        
        const activePlayers = new Set(activeDeals?.map(d => d.user_id)).size;
        console.log('✅ [Dashboard] Active Players:', activePlayers);

        // 3. MONTHLY SIGN-UPS (criados este mês)
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
        const { count: monthlySignUps } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .eq('user_type', 'player')
          .gte('created_at', startOfMonth);

        console.log('✅ [Dashboard] Monthly Sign-Ups:', monthlySignUps);

        // 4. MONTHLY DEALS APPLICATIONS (requested_at este mês)
        const { count: monthlyDealsApplications } = await supabase
          .from('player_deals')
          .select('*', { count: 'exact', head: true })
          .gte('requested_at', startOfMonth);

        console.log('✅ [Dashboard] Monthly Deals Applications:', monthlyDealsApplications);

        // Atualizar stats
        setDashboardStats({
          totalPlayers: totalPlayers || 0,
          activePlayers,
          monthlySignUps: monthlySignUps || 0,
          monthlyDealsApplications: monthlyDealsApplications || 0
        });

        // 5. BUSCAR TODOS OS DEALS
        const { data: allDeals } = await supabase
          .from('deals')
          .select('id, name, logo_url, slug')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        console.log('✅ [Dashboard] Deals encontrados:', allDeals?.length);

        // 6. PARA CADA DEAL, CALCULAR MÉTRICAS
        const dealsWithMetrics = await Promise.all(
          (allDeals || []).map(async (deal) => {
            // Total players do deal
            const { data: dealPlayers } = await supabase
              .from('player_deals')
              .select('id, user_id, status')
              .eq('deal_id', deal.id);

            const totalPlayers = dealPlayers?.length || 0;
            
            // Active players (status='approved')
            const activePlayers = dealPlayers?.filter(d => d.status === 'approved').length || 0;
            
            // Inactive players (outros status)
            const inactivePlayers = totalPlayers - activePlayers;

            // Buscar earnings do mês atual para este deal
            const dealPlayerIds = dealPlayers?.map(d => d.id) || [];
            
            let monthlyGrossRake = 0;
            let monthlyNetRake = 0;

            if (dealPlayerIds.length > 0) {
              const currentMonth = new Date().getMonth() + 1;
              const currentYear = new Date().getFullYear();

              const { data: earnings } = await supabase
                .from('player_earnings')
                .select('gross_rake, net_rake')
                .in('player_deal_id', dealPlayerIds)
                .eq('period_month', currentMonth)
                .eq('period_year', currentYear);

              monthlyGrossRake = earnings?.reduce((sum, e) => sum + (Number(e.gross_rake) || 0), 0) || 0;
              monthlyNetRake = earnings?.reduce((sum, e) => sum + (Number(e.net_rake) || 0), 0) || 0;
            }

            // Avg/Player
            const avgPerPlayer = totalPlayers > 0 ? monthlyGrossRake / totalPlayers : 0;

            // Growth % MOCKADO (entre +5% e +20%)
            const mockGrowth = Math.floor(Math.random() * 16) + 5; // 5 a 20

            return {
              id: deal.id,
              name: deal.name,
              logo: deal.logo_url,
              slug: deal.slug,
              totalPlayers,
              activePlayers,
              inactivePlayers,
              monthlyGrossRake,
              monthlyNetRake,
              avgPerPlayer,
              growthPercentage: mockGrowth,
              isMocked: true // Flag para indicar que o growth é mockado
            };
          })
        );

        console.log('✅ [Dashboard] Deals processados:', dealsWithMetrics.length);
        setDealsData(dealsWithMetrics);
        setLoadingDashboard(false);

      } catch (error) {
        console.error('❌ [Dashboard] Erro ao carregar dados:', error);
        setLoadingDashboard(false);
      }
    }

    if (activeTab === 'dashboard') {
      loadDashboardData();
    }
  }, [activeTab]);

  // Load CSV Upload History
  useEffect(() => {
    async function loadUploadHistory() {
      if (activeTab !== 'csv-upload') return;
      
      try {
        const { data, error } = await supabase
          .from('csv_uploads')
          .select(`
            *,
            deals(name),
            profiles:uploaded_by(full_name)
          `)
          .order('created_at', { ascending: false })
          .limit(10);

        if (error) throw error;
        setUploadHistory(data || []);
      } catch (error) {
        console.error('Error loading upload history:', error);
      }
    }

    if (activeTab === 'csv-upload') {
      loadUploadHistory();
    }
  }, [activeTab]);

  // Function to manually refresh Dashboard data
  const handleRefreshDashboard = async () => {
    if (activeTab !== 'dashboard' || isRefreshing) return;
    
    setIsRefreshing(true);
    console.log('🔄 [Dashboard] Atualizando dados manualmente...');
    
    try {
      // 1. TOTAL PLAYERS
      const { count: totalPlayers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('user_type', 'player');

      // 2. ACTIVE PLAYERS
      const { data: activeDeals } = await supabase
        .from('player_deals')
        .select('user_id')
        .eq('status', 'approved');
      
      const activePlayers = new Set(activeDeals?.map(d => d.user_id)).size;

      // 3. MONTHLY SIGN-UPS
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
      const { count: monthlySignUps } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('user_type', 'player')
        .gte('created_at', startOfMonth);

      // 4. MONTHLY DEALS APPLICATIONS
      const { count: monthlyDealsApplications } = await supabase
        .from('player_deals')
        .select('*', { count: 'exact', head: true })
        .gte('requested_at', startOfMonth);

      // Atualizar stats
      setDashboardStats({
        totalPlayers: totalPlayers || 0,
        activePlayers,
        monthlySignUps: monthlySignUps || 0,
        monthlyDealsApplications: monthlyDealsApplications || 0
      });

      // 5. BUSCAR TODOS OS DEALS
      const { data: allDeals } = await supabase
        .from('deals')
        .select('id, name, logo_url, slug')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      // 6. PARA CADA DEAL, CALCULAR MÉTRICAS
      const dealsWithMetrics = await Promise.all(
        (allDeals || []).map(async (deal) => {
          const { data: dealPlayers } = await supabase
            .from('player_deals')
            .select('id, user_id, status')
            .eq('deal_id', deal.id);

          const totalPlayers = dealPlayers?.length || 0;
          const activePlayers = dealPlayers?.filter(d => d.status === 'approved').length || 0;
          const inactivePlayers = totalPlayers - activePlayers;

          const dealPlayerIds = dealPlayers?.map(d => d.id) || [];
          let monthlyGrossRake = 0;
          let monthlyNetRake = 0;

          if (dealPlayerIds.length > 0) {
            const currentMonth = new Date().getMonth() + 1;
            const currentYear = new Date().getFullYear();

            const { data: earnings } = await supabase
              .from('player_earnings')
              .select('gross_rake, net_rake')
              .in('player_deal_id', dealPlayerIds)
              .eq('period_month', currentMonth)
              .eq('period_year', currentYear);

            monthlyGrossRake = earnings?.reduce((sum, e) => sum + (Number(e.gross_rake) || 0), 0) || 0;
            monthlyNetRake = earnings?.reduce((sum, e) => sum + (Number(e.net_rake) || 0), 0) || 0;
          }

          const avgPerPlayer = totalPlayers > 0 ? monthlyGrossRake / totalPlayers : 0;
          const mockGrowth = Math.floor(Math.random() * 16) + 5;

          return {
            id: deal.id,
            name: deal.name,
            logo: deal.logo_url,
            slug: deal.slug,
            totalPlayers,
            activePlayers,
            inactivePlayers,
            monthlyGrossRake,
            monthlyNetRake,
            avgPerPlayer,
            growthPercentage: mockGrowth,
            isMocked: true
          };
        })
      );

      setDealsData(dealsWithMetrics);
      console.log('✅ [Dashboard] Dados atualizados com sucesso!');
      
    } catch (error) {
      console.error('❌ [Dashboard] Erro ao atualizar dados:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Check if any filters are active
  const hasActiveFilters = searchQuery !== '' || statusFilter !== '' || sortFilter !== 'joined-desc';

  // Function to clear all filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('');
    setSortFilter('joined-desc');
  };

  // Function to handle viewing player details
  const handleViewPlayer = (player: PlayerProfile) => {
    setSelectedPlayer(player);
    setIsViewModalOpen(true);
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'dealrequests', label: 'Deal Requests', icon: FileCheck },
    { id: 'players', label: 'Players', icon: Users },
    { id: 'csv-upload', label: 'CSV Upload', icon: FileText },
    { id: 'subaffiliates', label: 'Sub-Affiliates', icon: Building2 },
    { id: 'website', label: 'Website', icon: Globe },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Dashboard stats data
  const stats = [
    { 
      label: 'Total Players',
      subtitle: 'Total players registered on the platform',
      value: loadingDashboard ? '...' : dashboardStats.totalPlayers.toLocaleString(), 
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600',
      textColor: 'text-blue-500'
    },
    { 
      label: 'Active Players',
      subtitle: 'Active players across all networks',
      value: loadingDashboard ? '...' : dashboardStats.activePlayers.toLocaleString(), 
      icon: Users,
      color: 'from-green-500 to-green-600',
      iconBg: 'bg-gradient-to-br from-green-500 to-green-600',
      textColor: 'text-green-500'
    },
    { 
      label: 'Monthly Sign Ups',
      subtitle: 'New registrations this month',
      value: loadingDashboard ? '...' : dashboardStats.monthlySignUps.toLocaleString(), 
      icon: Users,
      color: 'from-orange-500 to-orange-600',
      iconBg: 'bg-gradient-to-br from-orange-500 to-orange-600',
      textColor: 'text-orange-500'
    },
    { 
      label: 'Monthly Deals Applications',
      subtitle: 'Deal applications received this month',
      value: loadingDashboard ? '...' : dashboardStats.monthlyDealsApplications.toLocaleString(), 
      icon: FileText,
      color: 'from-purple-500 to-purple-600',
      iconBg: 'bg-gradient-to-br from-purple-500 to-purple-600',
      textColor: 'text-purple-500'
    },
  ];

  // CSV Upload Functions
  const handleFileChange = async (file: File) => {
    if (!file) return;
    
    setCsvFile(file);
    setUploadResult(null);
    
    // Read and preview CSV
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n').filter(line => line.trim());
      
      if (lines.length < 2) {
        setUploadResult({
          success: false,
          message: 'CSV file is empty or invalid'
        });
        return;
      }
      
      // Parse CSV (assuming ; delimiter)
      const headers = lines[0].toLowerCase().split(';').map(h => h.trim());
      const rows = lines.slice(1).map(line => {
        const values = line.split(';');
        const row: Record<string, string> = {};
        headers.forEach((header, index) => {
          row[header] = values[index]?.trim() || '';
        });
        return row;
      });
      
      setCsvPreview(rows.slice(0, 10)); // Show only first 10 rows
    };
    
    reader.readAsText(file);
  };

  const handleUploadCSV = async () => {
    if (!csvFile || !selectedDeal) {
      setUploadResult({
        success: false,
        message: 'Please select a deal and a CSV file'
      });
      return;
    }
    
    setIsProcessing(true);
    setUploadResult(null);
    
    try {
      // 1. Upload file to Storage
      const fileName = `${selectedDeal}_${selectedYear}-${selectedMonth}_${Date.now()}.csv`;
      const { error: uploadError } = await supabase.storage
        .from('csv-uploads')
        .upload(fileName, csvFile);
      
      if (uploadError) throw uploadError;
      
      // 2. Process CSV
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target?.result as string;
        const lines = text.split('\n').filter(line => line.trim());
        const rows = lines.slice(1);
        
        const errors: CsvUploadError[] = [];
        let processed = 0;
        let failed = 0;
        
        // Create upload record
        const { data: uploadRecord, error: recordError } = await supabase
          .from('csv_uploads')
          .insert({
            deal_id: selectedDeal,
            uploaded_by: (await supabase.auth.getUser()).data.user?.id,
            period_month: selectedMonth,
            period_year: selectedYear,
            file_name: csvFile.name,
            file_path: fileName,
            rows_total: rows.length,
            status: 'processing'
          })
          .select()
          .single();
        
        if (recordError) throw recordError;
        
        // Process each row
        for (let i = 0; i < rows.length; i++) {
          const line = rows[i];
          const rowNumber = i + 2; // +2 because: +1 for array index, +1 for header row
          const values = line.split(';');
          const player = values[0]?.trim();
          const grossRake = parseFloat(values[1]?.replace(',', '.') || '0');
          const netRake = parseFloat(values[2]?.replace(',', '.') || '0');
          const payment = parseFloat(values[3]?.replace(',', '.') || '0');
          
          if (!player) {
            errors.push({ row: rowNumber, error: 'Player name is empty', line });
            failed++;
            continue;
          }
          
          // Find player_deal
          const { data: playerDeal, error: dealError } = await supabase
            .from('player_deals')
            .select('id')
            .eq('deal_id', selectedDeal)
            .eq('platform_username', player)
            .eq('status', 'approved')
            .single();
          
          if (dealError || !playerDeal) {
            errors.push({ 
              row: rowNumber,
              player, 
              error: 'Player not found or deal not approved' 
            });
            failed++;
            continue;
          }
          
          // UPSERT earnings (overwrite if exists)
          const { error: earningsError } = await supabase
            .from('player_earnings')
            .upsert({
              player_deal_id: playerDeal.id,
              period_month: selectedMonth,
              period_year: selectedYear,
              gross_rake: grossRake,
              net_rake: netRake,
              payment_made: payment,
              data_updated_at: new Date().toISOString()
            }, {
              onConflict: 'player_deal_id,period_month,period_year'
            });
          
          if (earningsError) {
            errors.push({ row: rowNumber, player, error: earningsError.message });
            failed++;
          } else {
            processed++;
          }
        }
        
        // Update upload record
        await supabase
          .from('csv_uploads')
          .update({
            rows_processed: processed,
            rows_failed: failed,
            errors_log: errors,
            status: failed === 0 ? 'completed' : 'failed'
          })
          .eq('id', uploadRecord.id);
        
        setUploadResult({
          success: failed === 0,
          message: `Upload completed! ${processed} rows processed, ${failed} failed.`,
          errors: errors.length > 0 ? errors : undefined
        });
        
        // Reload history
        const { data: history } = await supabase
          .from('csv_uploads')
          .select(`
            *,
            deals(name),
            profiles:uploaded_by(full_name)
          `)
          .order('created_at', { ascending: false })
          .limit(10);
        
        setUploadHistory(history || []);
        
        // Clear form
        setCsvFile(null);
        setCsvPreview([]);
      };
      
      reader.readAsText(csvFile);
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setUploadResult({
        success: false,
        message: `Error: ${errorMessage}`
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ProtectedRoute allowedUserType="admin">
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <header className="bg-gradient-to-r from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a] border-b border-gray-800/50 sticky top-0 z-50 backdrop-blur-xl">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Left Section - Logo & Mobile Menu */}
              <div className="flex items-center gap-6">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2.5 rounded-lg hover:bg-white/[0.05] border border-transparent hover:border-gray-800 transition-all duration-300"
                >
                  {sidebarOpen ? <X size={20} className="text-gray-400" /> : <Menu size={20} className="text-gray-400" />}
                </button>
                
                {/* Logo */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src="/images/logo.png"
                      alt="Universal Poker"
                      className="h-8 w-auto object-contain"
                    />
                    <div className="absolute -inset-1 bg-gradient-to-r from-gray-800/20 to-transparent rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="hidden sm:block w-px h-8 bg-gradient-to-b from-transparent via-gray-700 to-transparent"></div>
                  <div className="hidden sm:flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Admin Control Panel</span>
                    <span className="text-xs text-gray-600 font-medium">Universal Poker Affiliates</span>
                  </div>
                </div>
              </div>

              {/* Right Section - User Info & Actions */}
              <div className="flex items-center gap-4">
                {/* User Info */}
                <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-gray-900/50 border border-gray-800/50 rounded-lg">
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-[#10b981] to-emerald-600 shadow-lg shadow-emerald-500/20">
                    <span className="text-white font-bold text-sm">C</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white">Chris</span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wide">Administrator</span>
                  </div>
              </div>

                {/* Divider */}
                <div className="hidden md:block w-px h-10 bg-gradient-to-b from-transparent via-gray-800 to-transparent"></div>

                {/* Logout Button */}
              <button
                onClick={logout}
                  className="flex items-center gap-2 px-4 py-2.5 bg-red-950/30 hover:bg-red-950/50 border border-red-900/30 hover:border-red-900/50 rounded-lg transition-all duration-300 text-red-400 hover:text-red-300 group"
              >
                  <LogOut size={16} className="group-hover:rotate-12 transition-transform duration-300" />
                  <span className="hidden sm:inline text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
          </div>
          
          {/* Bottom glow effect */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent"></div>
        </header>

        <div className="flex">
          {/* Sidebar */}
          <aside className={`
            fixed lg:static inset-y-0 left-0 z-40 w-72
            min-h-screen
            bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a] border-r border-gray-800/50
            transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            mt-[80px] lg:mt-0
          `}>
            <nav className="p-6 space-y-2">
              {/* Navigation Title */}
              <div className="mb-6 pb-4 border-b border-gray-800/50">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest px-2">Navigation</h3>
              </div>
              
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`
                    relative w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group overflow-hidden
                    ${activeTab === item.id 
                      ? 'bg-gradient-to-r from-[#10b981]/20 to-emerald-600/10 text-[#10b981] border border-[#10b981]/30 shadow-lg shadow-emerald-500/10' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/30 border border-transparent'
                    }
                  `}
                >
                  {/* Active indicator bar */}
                  {activeTab === item.id && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-[#10b981] to-emerald-600 rounded-r-full"></div>
                  )}
                  
                  {/* Icon with background */}
                  <div className={`
                    w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300
                    ${activeTab === item.id 
                      ? 'bg-[#10b981]/20 text-[#10b981]' 
                      : 'bg-gray-800/50 text-gray-400 group-hover:bg-gray-800 group-hover:text-white'
                    }
                  `}>
                  <item.icon size={20} />
                  </div>
                  
                  <span className="font-semibold text-sm">{item.label}</span>
                  
                  {/* Hover effect */}
                  {activeTab !== item.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  )}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6 lg:p-8 bg-gradient-to-br from-black via-[#0a0a0a] to-black">
            {activeTab === 'dashboard' && (
              <>
            {/* Page Title */}
            <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-8 bg-gradient-to-b from-[#10b981] to-emerald-600 rounded-full"></div>
                      <h1 className="text-3xl font-bold text-white">General Dashboard</h1>
                    </div>
                    <div className="flex items-center gap-3">
                      {/* Live Data Badge */}
                      <div className="flex items-center gap-2 px-4 py-2.5 bg-green-500/10 border border-green-500/20 rounded-xl">
                        <div className="relative flex items-center justify-center w-2.5 h-2.5">
                          <div className="absolute w-2.5 h-2.5 bg-green-500 rounded-full animate-ping opacity-75"></div>
                          <div className="relative w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium text-green-500">Live Data</span>
                      </div>
                      {/* Refresh Button */}
                      <button
                        onClick={handleRefreshDashboard}
                        disabled={isRefreshing}
                        className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                      >
                        <RefreshCw 
                          className={`w-4 h-4 text-gray-400 group-hover:text-white transition-colors ${isRefreshing ? 'animate-spin' : ''}`}
                        />
                        <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
                          {isRefreshing ? 'Updating...' : 'Refresh'}
                        </span>
                      </button>
                    </div>
                  </div>
                  <p className="text-base text-gray-400 ml-6">Overview of Universal Poker affiliate network metrics and operations</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="relative group bg-gradient-to-br from-gray-900/90 via-gray-900/50 to-gray-900/90 border border-gray-800/80 rounded-2xl p-6 hover:border-gray-700 transition-all duration-300 overflow-hidden"
                >
                  {/* Background gradient effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  
                  {/* Top decorative line */}
                  <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${stat.color} opacity-60`}></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-5">
                      <div className={`w-14 h-14 rounded-xl ${stat.iconBg} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <stat.icon className="w-7 h-7 text-white" />
                      </div>
                  </div>
                    <div className="text-3xl font-bold text-white mb-2 tracking-tight">{stat.value}</div>
                    <div className="text-sm font-semibold text-gray-300 mb-1">{stat.label}</div>
                    <div className="text-xs text-gray-500 leading-relaxed">{stat.subtitle}</div>
                  </div>
                  
                  {/* Bottom decorative corner */}
                  <div className="absolute bottom-0 right-0 w-24 h-24 opacity-5">
                    <stat.icon className="w-full h-full text-white" />
                  </div>
                </div>
              ))}
            </div>

            {/* Network Management Section */}
            <div>
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-1 h-8 bg-gradient-to-b from-[#10b981] to-emerald-600 rounded-full"></div>
                 <h2 className="text-2xl font-bold text-white">Network Management</h2>
               </div>
              
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {loadingDashboard ? (
                 <div className="col-span-3 text-center py-12 text-gray-400">
                   Loading deals data...
                 </div>
               ) : dealsData.length === 0 ? (
                 <div className="col-span-3 text-center py-12 text-gray-400">
                   No deals found
                 </div>
               ) : (
                 dealsData.map((deal) => (
                  <div
                    key={deal.id}
                    className="relative bg-[#0f1419] border border-white/[0.06] rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.4)] hover:bg-[#161b22] hover:border-white/10 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.6)] transition-all duration-300"
                  >
                    {/* Header with Logo */}
                    <div className="relative flex items-center justify-center h-20 mb-4">
                      {/* Logo centralizada */}
                      <img 
                        src={deal.logo || ''} 
                        alt={`${deal.name} Logo`} 
                        className="max-h-14 max-w-[80%] object-contain drop-shadow-lg filter brightness-110"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>

                    {/* Total Players */}
                    <div className="text-center my-6">
                      <div className="text-[56px] font-bold text-white leading-none">
                        {deal.totalPlayers}
                      </div>
                      <div className="text-[11px] text-gray-500 uppercase tracking-widest mt-2">Total Players</div>
                    </div>

                   {/* Player Breakdown */}
                   <div className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-4 mb-5">
                     {/* Active Players */}
                     <div className="flex items-center mb-3">
                       <div className="flex items-center gap-3 min-w-[140px]">
                         <span className="text-[13px] text-gray-400">Active</span>
                         <span className="text-lg font-semibold text-white">{deal.activePlayers}</span>
                       </div>
                       <div className="flex-1 h-1.5 bg-white/[0.05] rounded-full overflow-hidden ml-4">
                         <div 
                           className="h-full bg-[#10b981] rounded-full transition-all duration-500"
                           style={{ 
                             width: `${deal.totalPlayers > 0 ? (deal.activePlayers / deal.totalPlayers) * 100 : 0}%`,
                             boxShadow: '0 0 6px rgba(16, 185, 129, 0.2)'
                           }}
                         ></div>
                       </div>
                     </div>

                     {/* Inactive Players */}
                     <div className="flex items-center">
                       <div className="flex items-center gap-3 min-w-[140px]">
                         <span className="text-[13px] text-gray-400">Inactive</span>
                         <span className="text-lg font-semibold text-white">{deal.inactivePlayers}</span>
                       </div>
                       <div className="flex-1 h-1.5 bg-white/[0.05] rounded-full overflow-hidden ml-4">
                         <div 
                           className="h-full bg-[#f97316] rounded-full transition-all duration-500"
                           style={{ 
                             width: `${deal.totalPlayers > 0 ? (deal.inactivePlayers / deal.totalPlayers) * 100 : 0}%`,
                             boxShadow: '0 0 6px rgba(249, 115, 22, 0.2)'
                           }}
                         ></div>
                       </div>
                     </div>
                   </div>

                   {/* Financial Metrics */}
                   <div className="flex flex-col gap-3 mb-5">
                     {/* Monthly Gross Rake */}
                     <div className="flex justify-between items-center">
                       <span className="text-[11px] text-gray-500 uppercase tracking-wide">Monthly Gross Rake</span>
                       <span className="text-2xl font-semibold text-[#10b981]" style={{ textShadow: '0 0 10px rgba(16, 185, 129, 0.2)' }}>
                         ${deal.monthlyGrossRake.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                       </span>
                     </div>

                     {/* Monthly Net Rake */}
                     <div className="flex justify-between items-center">
                       <span className="text-[11px] text-gray-500 uppercase tracking-wide">Monthly Net Rake</span>
                       <span className="text-xl font-semibold text-[#f97316]" style={{ textShadow: '0 0 10px rgba(249, 115, 22, 0.2)' }}>
                         ${deal.monthlyNetRake.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                       </span>
                     </div>

                     {/* Avg/Player */}
                     <div className="flex justify-between items-center">
                       <span className="text-[11px] text-gray-500 uppercase tracking-wide">Avg/Player</span>
                       <span className="text-base font-semibold text-gray-400">
                         ${deal.avgPerPlayer.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                       </span>
                     </div>
                   </div>

                    {/* Trend Footer */}
                    <div className="flex items-center gap-2 pt-4 border-t border-white/[0.05]">
                      <TrendingUp className="w-4 h-4 text-[#10b981]" />
                      <span className="text-[13px] font-semibold text-[#10b981]">
                        +{deal.growthPercentage}%
                      </span>
                      <span className="text-xs text-gray-500">vs last month</span>
                      <span className="text-[10px] text-gray-600 italic">(mockado)</span>
                    </div>
                  </div>
                ))
              )}
              </div>
             </div>
              </>
            )}

            {/* Deal Requests Tab */}
            {activeTab === 'dealrequests' && (
              <DealRequestsContent />
            )}

            {/* Players Tab */}
            {activeTab === 'players' && (
              <>
                {/* Page Title */}
                <div className="mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-[#10b981] to-emerald-600 rounded-full"></div>
                    <h1 className="text-3xl font-bold text-white">Player Management</h1>
                  </div>
                  <p className="text-base text-gray-400 ml-6 mt-3">Manage poker players and track their performance</p>
                </div>

                {/* Player Stats - 4 Cards com Ícones */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {/* Card 1: Total Players */}
                  <div className="bg-[#0a0e13] border border-gray-800 rounded-lg p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white">{loadingPlayers ? '...' : playersStats.totalPlayers.toLocaleString()}</p>
                        <p className="text-sm text-gray-400">Total Players</p>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Active Players */}
                  <div className="bg-[#0a0e13] border border-gray-800 rounded-lg p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                        <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-emerald-500">{loadingPlayers ? '...' : playersStats.activePlayers.toLocaleString()}</p>
                        <p className="text-sm text-gray-400">Active Players</p>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: New This Month */}
                  <div className="bg-[#0a0e13] border border-gray-800 rounded-lg p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-600/10 flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-blue-600">{loadingPlayers ? '...' : playersStats.newThisMonth.toLocaleString()}</p>
                        <p className="text-sm text-gray-400">New This Month</p>
                      </div>
                    </div>
                  </div>

                  {/* Card 4: New Today */}
                  <div className="bg-[#0a0e13] border border-gray-800 rounded-lg p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-400/10 flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-blue-400">{loadingPlayers ? '...' : playersStats.newToday.toLocaleString()}</p>
                        <p className="text-sm text-gray-400">New Today</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filters & Search Bar */}
                <div className="bg-[#0a0e13] border border-gray-800 rounded-lg p-4 mb-6">
                  <div className="flex flex-col lg:flex-row gap-4 items-center">
                    {/* Search Input */}
                    <div className="flex-1 w-full lg:w-auto">
                      <div className="relative">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                          type="text"
                          placeholder="Search by Player Name or Email"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Status Filter */}
                    <select 
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full lg:w-auto px-4 py-2.5 bg-[#0a0e13] border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all min-w-[140px] cursor-pointer hover:border-gray-600 [&>option]:bg-[#1a1f2e] [&>option]:text-gray-200 [&>option]:py-2 [&>option:checked]:bg-emerald-500/20 [&>option:checked]:text-emerald-400"
                    >
                      <option value="">All Status</option>
                      <option value="active">Active Only</option>
                      <option value="inactive">Inactive Only</option>
                    </select>

                    {/* Sort By */}
                    <select 
                      value={sortFilter}
                      onChange={(e) => setSortFilter(e.target.value)}
                      className="w-full lg:w-auto px-4 py-2.5 bg-[#0a0e13] border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all min-w-[180px] cursor-pointer hover:border-gray-600 [&>option]:bg-[#1a1f2e] [&>option]:text-gray-200 [&>option]:py-2 [&>option:checked]:bg-emerald-500/20 [&>option:checked]:text-emerald-400"
                    >
                      <option value="joined-desc">Sort: Newest First</option>
                      <option value="joined-asc">Sort: Oldest First</option>
                      <option value="rake-desc">Sort: Highest Rake</option>
                      <option value="name-asc">Sort: Name (A-Z)</option>
                      <option value="name-desc">Sort: Name (Z-A)</option>
                    </select>

                    {/* Clear Filters Button */}
                    <button 
                      onClick={handleClearFilters}
                      className={`w-full lg:w-auto px-4 py-2.5 border text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${
                        hasActiveFilters 
                          ? 'bg-red-500/10 hover:bg-red-500/20 border-red-500/50 text-red-500 hover:text-red-400' 
                          : 'bg-gray-800 hover:bg-gray-700 border-gray-700 text-gray-400 hover:text-gray-300'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Clear Filters
                    </button>
                  </div>
                </div>

                {/* Players Table - 6 Colunas */}
                <div className="bg-[#0a0e13] border border-gray-800 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-900/50 border-b border-gray-800">
                      <tr>
                        <th className="py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider" style={{ paddingLeft: '5.25rem' }}>
                          Player
                        </th>
                        <th className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Deals
                        </th>
                        <th className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Total Rake
                        </th>
                        <th className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Joined
                        </th>
                        <th className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {loadingPlayers ? (
                        <tr>
                          <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                            Loading players...
                          </td>
                        </tr>
                      ) : playersData.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                            No players found
                          </td>
                        </tr>
                      ) : (
                        playersData.map((player: PlayerData) => (
                          <tr key={player.id} className="hover:bg-gray-900/30 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-8 rounded-md overflow-hidden border border-white/10">
                                  <ReactCountryFlag 
                                    countryCode={player.country} 
                                    svg 
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      objectFit: 'cover'
                                    }}
                                  />
                                </div>
                                <div>
                                  <p className="font-medium text-white">{player.name}</p>
                                  <p className="text-sm text-gray-400">{player.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className="text-2xl font-black text-gray-100 tracking-tight" style={{ fontFamily: 'ui-rounded, system-ui, sans-serif' }}>
                                {player.totalDeals}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className="text-sm font-semibold text-emerald-500">
                                ${player.totalRake.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className="text-sm text-gray-300">
                                {new Date(player.joined).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                                player.status === 'Active'
                                  ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                  : 'bg-red-500/10 text-red-500 border-red-500/20'
                              }`}>
                                {player.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <button 
                                onClick={() => handleViewPlayer({
                                  name: player.name,
                                  email: player.email,
                                  flag: player.country,
                                  country: player.country,
                                  totalDeals: player.totalDeals,
                                  totalRake: `$${player.totalRake.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
                                  ytdRake: `$${player.ytdRake.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
                                  joined: new Date(player.joined).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                                  lastPayment: player.lastPayment ? new Date(player.lastPayment).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Never',
                                  status: player.status,
                                  telegram: player.telegram ?? undefined,
                                  whatsapp: player.whatsapp ?? undefined,
                                  discord: player.discord ?? undefined,
                                  deals: player.deals.map((deal) => ({
                                    name: deal.name,
                                    username: deal.username,
                                    status: deal.status.charAt(0).toUpperCase() + deal.status.slice(1),
                                    logo: deal.logo
                                  }))
                                })}
                                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-lg transition-colors"
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* View Player Modal */}
                {isViewModalOpen && selectedPlayer && (
                  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-[#0a0e13] border border-gray-800 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
                      {/* Header */}
                      <div className="sticky top-0 bg-[#0a0e13] border-b border-gray-800 p-6 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white">Player Profile</h2>
                        <button
                          onClick={() => setIsViewModalOpen(false)}
                          className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                        >
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      {/* Player Info */}
                      <div className="p-6 border-b border-gray-800">
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-14 rounded-lg overflow-hidden border-2 border-white/20 shadow-lg">
                            <ReactCountryFlag 
                              countryCode={selectedPlayer.flag} 
                              svg 
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                              }}
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-white">{selectedPlayer.name}</h3>
                            <p className="text-sm text-gray-400">{selectedPlayer.email}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {selectedPlayer.country} • Joined: {selectedPlayer.joined}
                            </p>
                          </div>
                          <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                            selectedPlayer.status === 'Active'
                              ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                              : 'bg-red-500/10 text-red-500 border border-red-500/20'
                          }`}>
                            {selectedPlayer.status}
                          </span>
                        </div>
                      </div>

                      {/* Two Column Layout */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                        {/* Left Column */}
                        <div className="space-y-6">
                          {/* Contact Details Section */}
                          <div>
                            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                              Contact Details
                            </h4>
                            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 space-y-3">
                              {/* Telegram */}
                              {selectedPlayer.telegram && (
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.654-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                                    </svg>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs text-gray-500 mb-0.5">Telegram</p>
                                    <p className="text-sm text-white font-medium truncate">{selectedPlayer.telegram}</p>
                                  </div>
                                  <button 
                                    onClick={() => navigator.clipboard.writeText(selectedPlayer.telegram!)}
                                    className="px-3 py-1.5 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
                                  >
                                    Copy
                                  </button>
                                </div>
                              )}

                              {/* WhatsApp */}
                              {selectedPlayer.whatsapp && (
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                    </svg>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs text-gray-500 mb-0.5">WhatsApp</p>
                                    <p className="text-sm text-white font-medium truncate">{selectedPlayer.whatsapp}</p>
                                  </div>
                                  <button 
                                    onClick={() => navigator.clipboard.writeText(selectedPlayer.whatsapp!)}
                                    className="px-3 py-1.5 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
                                  >
                                    Copy
                                  </button>
                                </div>
                              )}

                              {/* Discord */}
                              {selectedPlayer.discord && (
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-indigo-500" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                                    </svg>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs text-gray-500 mb-0.5">Discord</p>
                                    <p className="text-sm text-white font-medium truncate">{selectedPlayer.discord}</p>
                                  </div>
                                  <button 
                                    onClick={() => navigator.clipboard.writeText(selectedPlayer.discord!)}
                                    className="px-3 py-1.5 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
                                  >
                                    Copy
                                  </button>
                                </div>
                              )}

                              {/* Empty State */}
                              {!selectedPlayer.telegram && !selectedPlayer.whatsapp && !selectedPlayer.discord && (
                                <div className="text-center py-6">
                                  <p className="text-sm text-gray-500">No contact information available</p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Performance Section */}
                          <div>
                            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                              Performance
                            </h4>
                            <div className="grid grid-cols-1 gap-3">
                              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                                <p className="text-xs text-gray-500 mb-1">Total Rake</p>
                                <p className="text-xl font-bold text-emerald-500">{selectedPlayer.totalRake}</p>
                              </div>
                              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                                <p className="text-xs text-gray-500 mb-1">YTD Rake</p>
                                <p className="text-xl font-bold text-emerald-500">{selectedPlayer.ytdRake}</p>
                              </div>
                              <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                                <p className="text-xs text-gray-500 mb-1">Last Payment</p>
                                <p className="text-sm font-medium text-gray-300">{selectedPlayer.lastPayment}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right Column - Deals */}
                        <div>
                          <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                            Deals ({selectedPlayer.totalDeals})
                          </h4>
                          <div className="space-y-3">
                            {selectedPlayer.deals.map((deal, index: number) => (
                              <div key={index} className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
                                    {deal.logo ? (
                                      <img src={deal.logo} alt={deal.name} className="w-full h-full object-contain p-1" />
                                    ) : (
                                      <span className="text-xs text-gray-400">{deal.name.slice(0, 2)}</span>
                                    )}
                                  </div>
                                  <div>
                                    <p className="font-medium text-white">{deal.name}</p>
                                    <p className="text-sm text-gray-400">Username: {deal.username}</p>
                                  </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                                  deal.status.toLowerCase() === 'active' 
                                    ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                    : deal.status.toLowerCase() === 'approved'
                                    ? 'bg-lime-500/10 text-lime-500 border-lime-500/20'
                                    : deal.status.toLowerCase() === 'pending'
                                    ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                    : deal.status.toLowerCase() === 'rejected'
                                    ? 'bg-red-500/10 text-red-500 border-red-500/20'
                                    : 'bg-gray-500/10 text-gray-500 border-gray-500/20'
                                }`}>
                                  {deal.status}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="sticky bottom-0 bg-[#0a0e13] border-t border-gray-800 p-6 flex justify-end gap-3">
                        <button
                          onClick={() => setIsViewModalOpen(false)}
                          className="px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* CSV UPLOAD TAB */}
            {activeTab === 'csv-upload' && (
              <>
                {/* Page Title */}
                <div className="mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-[#10b981] to-emerald-600 rounded-full"></div>
                    <h1 className="text-3xl font-bold text-white">CSV Upload</h1>
                  </div>
                  <p className="text-base text-gray-400 ml-6 mt-3">Upload earnings data from poker rooms</p>
                </div>

                {/* Upload Form Card */}
                <div className="bg-[#0a0e13] border border-gray-800 rounded-xl p-8 mb-6">
                  <div className="space-y-6">
                    {/* Form Fields - All in One Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                      {/* Poker Room */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold shadow-lg shadow-emerald-500/10">1</span>
                          <span className="text-sm font-semibold text-white">Select Poker Room & Period</span>
                        </div>
                        <label className="block text-xs font-medium text-gray-400 mb-2">Poker Room</label>
                        <select
                          value={selectedDeal || ''}
                          onChange={(e) => setSelectedDeal(Number(e.target.value))}
                          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all cursor-pointer hover:border-emerald-500/50 hover:bg-gray-900 [&>option]:bg-[#1a2332] [&>option]:text-white [&>option:checked]:bg-blue-600 [&>option:hover]:bg-blue-600"
                        >
                          <option value="">Choose a poker room...</option>
                          {dealsData.map((deal) => (
                            <option key={deal.id} value={deal.id}>
                              {deal.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      {/* Month */}
                      <div>
                        <div className="h-[40px]"></div>
                        <label className="block text-xs font-medium text-gray-400 mb-2">Month</label>
                        <select
                          value={selectedMonth}
                          onChange={(e) => setSelectedMonth(Number(e.target.value))}
                          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all cursor-pointer hover:border-emerald-500/50 hover:bg-gray-900 [&>option]:bg-[#1a2332] [&>option]:text-white [&>option:checked]:bg-blue-600 [&>option:hover]:bg-blue-600"
                        >
                          {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, index) => (
                            <option key={index} value={index + 1}>{month}</option>
                          ))}
                        </select>
                      </div>
                      
                      {/* Year */}
                      <div>
                        <div className="h-[40px]"></div>
                        <label className="block text-xs font-medium text-gray-400 mb-2">Year</label>
                        <select
                          value={selectedYear}
                          onChange={(e) => setSelectedYear(Number(e.target.value))}
                          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all cursor-pointer hover:border-emerald-500/50 hover:bg-gray-900 [&>option]:bg-[#1a2332] [&>option]:text-white [&>option:checked]:bg-blue-600 [&>option:hover]:bg-blue-600"
                        >
                          {[2024, 2025, 2026].map((year) => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                      </div>

                      {/* Upload CSV - Compact */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold shadow-lg shadow-emerald-500/10">2</span>
                          <span className="text-sm font-semibold text-white">Upload CSV File</span>
                        </div>
                        <label className="block text-xs font-medium text-gray-400 mb-2">CSV File</label>
                        <div className="relative h-[52px]">
                          <input
                            type="file"
                            accept=".csv"
                            onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                            className="hidden"
                            id="csv-upload"
                          />
                          <label 
                            htmlFor="csv-upload" 
                            className="flex items-center justify-center gap-2 w-full h-full px-4 py-3 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-emerald-500 hover:bg-emerald-500/5 transition-all duration-200 group"
                          >
                            <svg className="w-5 h-5 text-gray-500 group-hover:text-emerald-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <span className="text-sm text-gray-400 group-hover:text-emerald-400 transition-colors duration-200 truncate font-medium">
                              {csvFile ? csvFile.name : 'Choose file...'}
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Format Info - Below CSV File */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                      <div className="lg:col-span-3"></div>
                      <div className="flex items-center gap-2 px-3 py-2 bg-gray-900/30 rounded-lg border border-gray-800/50">
                        <svg className="w-4 h-4 flex-shrink-0 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-mono text-[10px] text-gray-500">player;gross_rake;net_rake;payment</span>
                      </div>
                    </div>

                    {/* Preview Table */}
                    {csvPreview.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold shadow-lg shadow-emerald-500/10">3</span>
                          <span className="text-sm font-semibold text-white">Preview</span>
                          <span className="text-xs text-gray-500 font-normal ml-1">(First 10 rows)</span>
                        </div>
                        <div className="overflow-hidden rounded-lg border border-gray-800">
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="bg-gray-900/50">
                                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">Player</th>
                                  <th className="text-right py-3 px-4 text-gray-400 font-semibold">Gross Rake</th>
                                  <th className="text-right py-3 px-4 text-gray-400 font-semibold">Net Rake</th>
                                  <th className="text-right py-3 px-4 text-gray-400 font-semibold">Payment</th>
                                </tr>
                              </thead>
                              <tbody className="bg-[#0a0e13]">
                                {csvPreview.map((row, index) => (
                                  <tr key={index} className="border-t border-gray-800 hover:bg-gray-900/30 transition-colors">
                                    <td className="py-3 px-4 text-white font-medium">{row.player}</td>
                                    <td className="py-3 px-4 text-right text-emerald-400 font-semibold">${row['gross rake']}</td>
                                    <td className="py-3 px-4 text-right text-blue-400 font-semibold">${row['net rake']}</td>
                                    <td className="py-3 px-4 text-right text-gray-300 font-semibold">${row.payment}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <button
                        onClick={handleUploadCSV}
                        disabled={!csvFile || !selectedDeal || isProcessing}
                        className={`flex-1 px-6 py-3.5 font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
                          !csvFile || !selectedDeal
                            ? 'bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed'
                            : 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40'
                        } ${isProcessing ? 'opacity-75 cursor-wait' : ''}`}
                      >
                        {isProcessing ? (
                          <>
                            <RefreshCw className="w-5 h-5 animate-spin" />
                            <span>Processing...</span>
                          </>
                        ) : !csvFile || !selectedDeal ? (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <span>
                              {!selectedDeal && !csvFile 
                                ? 'Select Poker Room, Period and CSV File'
                                : !selectedDeal 
                                  ? 'Select Poker Room'
                                  : 'Select a CSV File'
                              }
                            </span>
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="truncate">
                              Process: {dealsData.find(d => d.id === selectedDeal)?.name} • {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][selectedMonth - 1]} {selectedYear} • {csvFile.name}
                            </span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setSelectedDeal(null);
                          setCsvFile(null);
                          setCsvPreview([]);
                          setUploadResult(null);
                        }}
                        className="px-6 py-3.5 bg-gray-800 text-gray-300 font-semibold rounded-lg hover:bg-gray-700 transition-all border border-gray-700 hover:border-gray-600 flex items-center justify-center gap-2"
                      >
                        <X className="w-5 h-5" />
                        <span>Clear</span>
                      </button>
                    </div>

                    {/* Result Alert */}
                    {uploadResult && (
                      <div className={`rounded-lg p-4 border-l-4 ${uploadResult.success ? 'bg-emerald-500/10 border-emerald-500' : 'bg-red-500/10 border-red-500'}`}>
                        <div className="flex items-start gap-3">
                          {uploadResult.success ? (
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                              <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          ) : (
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
                              <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </div>
                          )}
                          <div className="flex-1">
                            <p className={`font-semibold ${uploadResult.success ? 'text-emerald-400' : 'text-red-400'}`}>
                              {uploadResult.message}
                            </p>
                            {uploadResult.errors && uploadResult.errors.length > 0 && (
                              <div className="mt-3 space-y-1.5">
                                <p className="text-sm text-gray-400 font-medium">Error Details:</p>
                                <div className="space-y-1">
                                  {uploadResult.errors.slice(0, 5).map((err, index) => (
                                    <p key={index} className="text-xs text-red-400 font-mono bg-red-500/5 px-2 py-1 rounded">
                                      • {err.player || 'Unknown'}: {err.error}
                                    </p>
                                  ))}
                                  {uploadResult.errors.length > 5 && (
                                    <p className="text-xs text-gray-500 italic mt-2">
                                      ... and {uploadResult.errors.length - 5} more errors
                                    </p>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Upload History Card */}
                <div className="bg-[#0a0e13] border border-gray-800 rounded-xl overflow-hidden">
                  <div className="px-8 py-6 border-b border-gray-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-purple-500" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">Upload History</h3>
                        <p className="text-sm text-gray-500">Recent CSV upload records</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    {uploadHistory.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 rounded-full bg-gray-800 mx-auto mb-4 flex items-center justify-center">
                          <FileText className="w-8 h-8 text-gray-600" />
                        </div>
                        <p className="text-gray-500 font-medium">No uploads yet</p>
                        <p className="text-sm text-gray-600 mt-1">Upload your first CSV file to see history</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {uploadHistory.map((upload) => (
                          <div key={upload.id} className="flex items-center justify-between p-4 bg-gray-900/30 rounded-lg border border-gray-800 hover:border-gray-700 hover:bg-gray-900/50 transition-all">
                            <div className="flex items-center gap-4">
                              <div className={`w-3 h-3 rounded-full ${upload.status === 'completed' ? 'bg-emerald-500' : upload.status === 'failed' ? 'bg-red-500' : 'bg-yellow-500'} shadow-lg ${upload.status === 'completed' ? 'shadow-emerald-500/50' : upload.status === 'failed' ? 'shadow-red-500/50' : 'shadow-yellow-500/50'}`} />
                              <div>
                                <p className="text-white font-semibold">
                                  {upload.deals?.name}
                                  <span className="text-gray-500 font-normal mx-2">•</span>
                                  <span className="text-gray-400 font-normal">
                                    {new Date(0, upload.period_month - 1).toLocaleString('en', { month: 'short' })} {upload.period_year}
                                  </span>
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  Uploaded by {upload.profiles?.full_name} • {new Date(upload.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-semibold text-emerald-400">{upload.rows_processed} processed</p>
                              {upload.rows_failed > 0 && (
                                <p className="text-xs text-red-400 mt-1">{upload.rows_failed} failed</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Sub-Affiliates Tab */}
            {activeTab === 'subaffiliates' && (
              <>
                {/* Page Title */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-8 bg-gradient-to-b from-[#10b981] to-emerald-600 rounded-full"></div>
                      <h1 className="text-3xl font-bold text-white">Sub-Affiliate Management</h1>
                    </div>
                    <button className="px-4 py-2 bg-[#10b981] hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors duration-200">
                      + Approve New Sub-Affiliate
                    </button>
                  </div>
                  <p className="text-base text-gray-400 ml-6">Manage partners promoting your deals and track their performance</p>
                </div>

                {/* Sub-Affiliate Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {/* Card 1: Active Sub-Affiliates */}
                  <div className="bg-[#0a0e13] border border-gray-800 rounded-lg p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white">12</p>
                        <p className="text-sm text-gray-400">Active Sub-Affiliates</p>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Total Players Referred */}
                  <div className="bg-[#0a0e13] border border-gray-800 rounded-lg p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                        <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-purple-500">247</p>
                        <p className="text-sm text-gray-400">Total Players Referred</p>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Total Rake Generated */}
                  <div className="bg-[#0a0e13] border border-gray-800 rounded-lg p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                        <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-emerald-500">$42,850</p>
                        <p className="text-sm text-gray-400">Total Rake Generated</p>
                      </div>
                    </div>
                  </div>

                  {/* Card 4: Commission Paid */}
                  <div className="bg-[#0a0e13] border border-gray-800 rounded-lg p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                        <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-orange-500">$8,570</p>
                        <p className="text-sm text-gray-400">Commission Paid</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filters & Search */}
                <div className="bg-[#0a0e13] border border-gray-800 rounded-lg p-4 mb-6">
                  <div className="flex flex-col lg:flex-row gap-4 items-center">
                    {/* Search Input */}
                    <div className="flex-1 w-full lg:w-auto">
                      <div className="relative">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input 
                          type="text" 
                          placeholder="Search sub-affiliates..." 
                          className="w-full pl-10 pr-4 py-2.5 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Tier Filter */}
                    <select className="w-full lg:w-auto px-4 py-2.5 bg-[#0a0e13] border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all min-w-[180px] cursor-pointer hover:border-gray-600 [&>option]:bg-[#1a1f2e] [&>option]:text-gray-200 [&>option]:py-2">
                      <option>All Tiers</option>
                      <option>Bronze (0-50 players)</option>
                      <option>Silver (51-100 players)</option>
                      <option>Gold (101+ players)</option>
                    </select>

                    {/* Status Filter */}
                    <select className="w-full lg:w-auto px-4 py-2.5 bg-[#0a0e13] border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all min-w-[140px] cursor-pointer hover:border-gray-600 [&>option]:bg-[#1a1f2e] [&>option]:text-gray-200 [&>option]:py-2">
                      <option>All Status</option>
                      <option>Active</option>
                      <option>Pending</option>
                      <option>Suspended</option>
                    </select>
                  </div>
                </div>

                {/* Sub-Affiliates Table */}
                <div className="bg-[#0a0e13] border border-gray-800 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-900/50 border-b border-gray-800">
                        <tr>
                          <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Sub-Affiliate</th>
                          <th className="text-left px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                          <th className="text-center px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Players</th>
                          <th className="text-center px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Total Rake</th>
                          <th className="text-center px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Commission</th>
                          <th className="text-center px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Tier</th>
                          <th className="text-center px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                          <th className="text-center px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        {[
                          { id: 1, name: 'Michael Rodriguez', email: 'm.rodriguez@email.com', players: 64, rake: '$12,450', commission: '$2,490', tier: 'Silver', status: 'Active' },
                          { id: 2, name: 'James Wilson', email: 'j.wilson@email.com', players: 52, rake: '$8,750', commission: '$1,750', tier: 'Silver', status: 'Active' },
                          { id: 3, name: 'Alexandra Turner', email: 'alex.turner@email.com', players: 28, rake: '$4,230', commission: '$846', tier: 'Bronze', status: 'Active' },
                          { id: 4, name: 'Thomas Martinez', email: 't.martinez@email.com', players: 45, rake: '$6,890', commission: '$1,378', tier: 'Bronze', status: 'Active' },
                          { id: 5, name: 'Sophie Anderson', email: 'sophie.a@email.com', players: 18, rake: '$2,450', commission: '$490', tier: 'Bronze', status: 'Active' },
                          { id: 6, name: 'Daniel Cooper', email: 'd.cooper@email.com', players: 31, rake: '$5,120', commission: '$1,024', tier: 'Bronze', status: 'Active' },
                          { id: 7, name: 'Emma Williams', email: 'emma.w@email.com', players: 9, rake: '$1,960', commission: '$392', tier: 'Bronze', status: 'Pending' },
                        ].map((affiliate) => (
                          <tr key={affiliate.id} className="hover:bg-gray-900/30 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                                  {affiliate.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <span className="text-sm font-medium text-white">{affiliate.name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-400">{affiliate.email}</td>
                            <td className="px-6 py-4 text-center text-sm font-semibold text-blue-400">{affiliate.players}</td>
                            <td className="px-6 py-4 text-center text-sm font-semibold text-emerald-500">{affiliate.rake}</td>
                            <td className="px-6 py-4 text-center text-sm font-semibold text-orange-400">{affiliate.commission}</td>
                            <td className="px-6 py-4 text-center">
                              <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${
                                affiliate.tier === 'Gold' 
                                  ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' 
                                  : affiliate.tier === 'Silver'
                                  ? 'bg-gray-400/10 text-gray-300 border-gray-400/20'
                                  : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                              }`}>
                                {affiliate.tier}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                                affiliate.status === 'Active' 
                                  ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                                  : affiliate.status === 'Pending'
                                  ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                  : 'bg-red-500/10 text-red-500 border-red-500/20'
                              }`}>
                                {affiliate.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-lg transition-colors">
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="px-6 py-4 border-t border-gray-800 flex items-center justify-between">
                    <div className="text-sm text-gray-400">
                      Showing 1 to 7 of 12 sub-affiliates
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 text-sm rounded-lg transition-colors">
                        Previous
                      </button>
                      <button className="px-4 py-2 bg-emerald-500 text-white text-sm rounded-lg font-semibold">
                        1
                      </button>
                      <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 text-sm rounded-lg transition-colors">
                        2
                      </button>
                      <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 text-sm rounded-lg transition-colors">
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Website Tab */}
            {activeTab === 'website' && (
              <>
                {/* Page Title */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-[#10b981] to-emerald-600 rounded-full"></div>
                    <h1 className="text-3xl font-bold text-white">Website Content Management</h1>
                  </div>
                  <p className="text-base text-gray-400 ml-6">Edit website content without touching code</p>
                </div>

                {/* Page Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  
                  {/* Homepage Card */}
                  <Link 
                    href="/admin/website/homepage"
                    className="group relative bg-[#0f1419] border border-white/[0.06] rounded-xl p-8 hover:bg-[#161b22] hover:border-white/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex flex-col h-full">
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#10b981] to-emerald-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#10b981] transition-colors">Homepage</h3>
                      
                      {/* Description */}
                      <p className="text-sm text-gray-400 mb-4 flex-grow">Edit hero section, stats, testimonials, FAQs and more</p>
                      
                      {/* Stats */}
                      <div className="flex items-center gap-4 pt-4 border-t border-white/[0.06]">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">7 Sections</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Arrow Icon */}
                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-5 h-5 text-[#10b981]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>

                  {/* Deals Card - Now Live */}
                  <Link 
                    href="/admin/website/deals"
                    className="group relative bg-[#0f1419] border border-white/[0.06] rounded-xl p-8 hover:bg-[#161b22] hover:border-white/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex flex-col h-full">
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-500 transition-colors">Deals</h3>
                      
                      {/* Description */}
                      <p className="text-sm text-gray-400 mb-4 flex-grow">Manage poker site deals and promotions</p>
                      
                      {/* Stats */}
                      <div className="flex items-center gap-4 pt-4 border-t border-white/[0.06]">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">{dealsCount} Deals</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Arrow Icon */}
                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>

                  {/* News Card */}
                  <Link 
                    href="/admin/website/news"
                    className="group relative bg-[#0f1419] border border-white/[0.06] rounded-xl p-8 hover:bg-[#161b22] hover:border-white/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex flex-col h-full">
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-500 transition-colors">News</h3>
                      
                      {/* Description */}
                      <p className="text-sm text-gray-400 mb-4 flex-grow">Create and manage blog posts and news articles</p>
                      
                      {/* Stats */}
                      <div className="flex items-center gap-4 pt-4 border-t border-white/[0.06]">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">0 Articles</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Arrow Icon */}
                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>

                  {/* Team Card */}
                  <Link 
                    href="/admin/website/team"
                    className="group relative bg-[#0f1419] border border-white/[0.06] rounded-xl p-8 hover:bg-[#161b22] hover:border-white/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex flex-col h-full">
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                        <Users className="w-7 h-7 text-white" strokeWidth={2} />
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-500 transition-colors">Team</h3>
                      
                      {/* Description */}
                      <p className="text-sm text-gray-400 mb-4 flex-grow">Manage team member profiles, photos and information</p>
                      
                      {/* Stats */}
                      <div className="flex items-center gap-4 pt-4 border-t border-white/[0.06]">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">6 Members</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Arrow Icon */}
                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>

                  {/* Contact Card */}
                  <Link 
                    href="/admin/website/contact"
                    className="group relative bg-[#0f1419] border border-white/[0.06] rounded-xl p-8 hover:bg-[#161b22] hover:border-white/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex flex-col h-full">
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-500 transition-colors">Contact</h3>
                      
                      {/* Description */}
                      <p className="text-sm text-gray-400 mb-4 flex-grow">Edit contact page links (WhatsApp, Discord, Telegram)</p>
                      
                      {/* Stats */}
                      <div className="flex items-center gap-4 pt-4 border-t border-white/[0.06]">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">3 Links</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Arrow Icon */}
                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>

                  {/* Others Card */}
                  <Link 
                    href="/admin/website/others"
                    className="group relative bg-[#0f1419] border border-white/[0.06] rounded-xl p-8 hover:bg-[#161b22] hover:border-white/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex flex-col h-full">
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                        <LayoutGrid className="w-7 h-7 text-white" strokeWidth={2} />
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-violet-500 transition-colors">Others</h3>
                      
                      {/* Description */}
                      <p className="text-sm text-gray-400 mb-4 flex-grow">Edit header, footer and other site-wide elements</p>
                      
                      {/* Stats */}
                      <div className="flex items-center gap-4 pt-4 border-t border-white/[0.06]">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">2 Sections</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Arrow Icon */}
                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-5 h-5 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>

                </div>
              </>
            )}
          </main>
        </div>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </ProtectedRoute>
  );
}

// Type for deal data
interface DealData {
  id: string;
  user_id: string;
  deal_id: number;
  deal_name: string;
  deal_logo: string;
  player_email: string;
  player_name: string;
  platform_username: string;
  platform_email: string;
  status: string;
  requested_at: string;
  rejection_reason?: string | null;
  admin_notes?: string | null;
}

// Deal Requests Component
function DealRequestsContent() {
  const [deals, setDeals] = useState<DealData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [rejectingDeal, setRejectingDeal] = useState<DealData | null>(null);
  const [viewingNotes, setViewingNotes] = useState<DealData | null>(null);

  const fetchDeals = async () => {
    setLoading(true);
    console.log('🔍 [DealRequests] Iniciando fetch...');
    console.log('🔍 [DealRequests] Filtro atual:', filter);
    
    try {
      const { supabase } = await import('@/lib/supabase/client');
      
      let query = supabase
        .from('admin_deal_requests')
        .select('*')
        .order('requested_at', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data, error } = await query;

      console.log('🔍 [DealRequests] Query result:', { data, error });
      console.log('🔍 [DealRequests] Data length:', data?.length);

      if (error) {
        console.error('❌ [DealRequests] Error:', error);
        throw error;
      }

      console.log('🔍 [DealRequests] Raw data:', JSON.stringify(data, null, 2));

      const formatted = data.map((item: Record<string, unknown>) => ({
        id: item.id as string,
        user_id: item.user_id as string,
        deal_id: item.deal_id as number,
        deal_name: (item.deal_name as string) || 'Unknown',
        deal_logo: (item.deal_logo as string) || '',
        player_email: (item.player_email as string) || '',
        player_name: (item.player_name as string) || 'Unknown',
        platform_username: item.platform_username as string,
        platform_email: item.platform_email as string,
        status: item.status as string,
        requested_at: item.requested_at as string,
        rejection_reason: item.rejection_reason as string | null | undefined,
        admin_notes: item.admin_notes as string | null | undefined,
      }));

      console.log('✅ [DealRequests] Formatted data:', formatted);
      console.log('✅ [DealRequests] Total deals:', formatted.length);

      setDeals(formatted);
    } catch (error) {
      console.error('💥 [DealRequests] Catch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  async function handleApprove(dealId: string) {
    try {
      const { supabase } = await import('@/lib/supabase/client');
      const { error } = await supabase
        .from('player_deals')
        .update({
          status: 'approved',
          approved_at: new Date().toISOString(),
        })
        .eq('id', dealId);

      if (error) throw error;
      fetchDeals();
    } catch (error) {
      console.error('Error approving deal:', error);
    }
  }

  async function handleReject(dealId: string, rejectionReason: string, adminNotes: string) {
    try {
      const { supabase } = await import('@/lib/supabase/client');
      const { error } = await supabase
        .from('player_deals')
        .update({
          status: 'rejected',
          rejection_reason: rejectionReason,
          admin_notes: adminNotes,
          updated_at: new Date().toISOString(),
        })
        .eq('id', dealId);

      if (error) throw error;
      
      setRejectingDeal(null);
      fetchDeals();
      
      // TODO: Send email notification to player
    } catch (error) {
      console.error('Error rejecting deal:', error);
      alert('Failed to reject deal. Please try again.');
    }
  }

  const pendingCount = deals.filter(d => d.status === 'pending').length;
  const approvedCount = deals.filter(d => d.status === 'approved').length;
  const rejectedCount = deals.filter(d => d.status === 'rejected').length;

  return (
    <>
      {/* Page Title */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-1 h-8 bg-gradient-to-b from-[#10b981] to-emerald-600 rounded-full"></div>
          <h1 className="text-3xl font-bold text-white">Deal Requests</h1>
        </div>
        <p className="text-base text-gray-400 ml-6">Review and approve player deal applications</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Card 1: Pending */}
        <div className="bg-[#0a0e13] border border-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-500">{pendingCount}</p>
              <p className="text-sm text-gray-400">Pending</p>
            </div>
          </div>
        </div>

        {/* Card 2: Approved */}
        <div className="bg-[#0a0e13] border border-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-500">{approvedCount}</p>
              <p className="text-sm text-gray-400">Approved</p>
            </div>
          </div>
        </div>

        {/* Card 3: Rejected */}
        <div className="bg-[#0a0e13] border border-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-500">{rejectedCount}</p>
              <p className="text-sm text-gray-400">Rejected</p>
            </div>
          </div>
        </div>

        {/* Card 4: Total */}
        <div className="bg-[#0a0e13] border border-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-500">{deals.length}</p>
              <p className="text-sm text-gray-400">Total</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#0a0e13] border border-gray-800 rounded-lg p-4 mb-6">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              filter === 'all'
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white border border-gray-700'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              filter === 'pending'
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white border border-gray-700'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              filter === 'approved'
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white border border-gray-700'
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter('rejected')}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              filter === 'rejected'
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white border border-gray-700'
            }`}
          >
            Rejected
          </button>
        </div>
      </div>

      {/* Deals Table */}
      <div className="bg-[#0a0e13] border border-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-900/50 border-b border-gray-800">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Deal</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Player</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Platform Info</th>
              <th className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">Requested</th>
              <th className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">Notes</th>
              <th className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : deals.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                  No deals found
                </td>
              </tr>
            ) : (
              deals.map((deal) => (
                <tr key={deal.id} className="hover:bg-gray-900/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={deal.deal_logo} alt={deal.deal_name} className="w-10 h-10 rounded-lg object-contain bg-gray-800/50 p-1" />
                      <span className="text-white font-medium">{deal.deal_name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-white font-medium">{deal.player_name}</p>
                      <p className="text-sm text-gray-400">{deal.player_email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-white text-sm">{deal.platform_username}</p>
                      <p className="text-sm text-gray-400">{deal.platform_email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <p className="text-gray-300 text-sm">
                      {new Date(deal.requested_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      deal.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                      deal.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                      deal.status === 'rejected' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                      'bg-blue-500/10 text-blue-500 border-blue-500/20'
                    }`}>
                      {deal.status.charAt(0).toUpperCase() + deal.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {(deal.rejection_reason || deal.admin_notes) ? (
                      <button
                        onClick={() => setViewingNotes(deal)}
                        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-lg transition-colors inline-flex items-center gap-2"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        View
                      </button>
                    ) : (
                      <span className="text-sm text-gray-500">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      {deal.status === 'pending' ? (
                        <>
                          <button
                            onClick={() => handleApprove(deal.id)}
                            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-lg transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => setRejectingDeal(deal)}
                            className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/50 text-red-500 hover:text-red-400 text-sm font-medium rounded-lg transition-colors"
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className="text-sm text-gray-500">—</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Reject Modal */}
      {rejectingDeal && (
        <RejectDealModal
          dealName={rejectingDeal.deal_name}
          playerName={rejectingDeal.player_name}
          onClose={() => setRejectingDeal(null)}
          onConfirm={(reason, notes) => handleReject(rejectingDeal.id, reason, notes)}
        />
      )}

      {/* View Notes Modal */}
      {viewingNotes && (
        <ViewNotesModal
          dealName={viewingNotes.deal_name}
          playerName={viewingNotes.player_name}
          rejectionReason={viewingNotes.rejection_reason ?? null}
          adminNotes={viewingNotes.admin_notes ?? null}
          onClose={() => setViewingNotes(null)}
        />
      )}
    </>
  );
}

