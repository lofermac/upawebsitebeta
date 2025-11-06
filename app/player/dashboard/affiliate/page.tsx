'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Users, Copy, Check, ArrowLeft, DollarSign, TrendingUp, Calendar, Filter } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Types
interface SubAffiliateData {
  id: string;
  player_id: string;
  referral_code: string;
  created_at: string;
}

interface Referral {
  id: string;
  sub_affiliate_id: string;
  referred_player_id: string;
  player_deal_id: string | null;
  status: string;
  created_at: string;
  referred_player?: {
    id: string;
    full_name: string;
    email: string;
  };
  player_deal?: {
    id: string;
    status: string;
    deal?: {
      name: string;
    };
  };
}

interface ReferralEarning {
  id: string;
  period_month: number;
  period_year: number;
  gross_rake: number;
  net_rake: number;
  payment_status: string;
  player_name: string;
  player_email: string;
  deal_name: string;
  platform_username: string;
}

export default function AffiliatePanel() {
  const router = useRouter();
  const [subAffiliateData, setSubAffiliateData] = useState<SubAffiliateData | null>(null);
  const [myReferrals, setMyReferrals] = useState<Referral[]>([]);
  const [isLoadingReferrals, setIsLoadingReferrals] = useState(true);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  // Earnings states
  const [earnings, setEarnings] = useState<ReferralEarning[]>([]);
  const [isLoadingEarnings, setIsLoadingEarnings] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState<string>('all');
  const [selectedDeal, setSelectedDeal] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('all');

  useEffect(() => {
    async function loadAffiliateData() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          // Não está logado, redirecionar
          window.location.href = '/player/dashboard';
          return;
        }

        // Buscar dados do sub-affiliate
        const { data: subAffiliate, error } = await supabase
          .from('sub_affiliates')
          .select('*')
          .eq('player_id', user.id)
          .single();

        if (error || !subAffiliate) {
          // Não é sub-affiliate, redirecionar usando window.location
          window.location.href = '/player/dashboard';
          return;
        }

        // É sub-affiliate válido
        setIsAuthorized(true);
        setSubAffiliateData(subAffiliate);
        
        // Carregar referrals
        await loadMyReferrals(subAffiliate.id);
        
        // Carregar earnings
        await loadReferralEarnings(subAffiliate.id);
      } catch (error) {
        console.error('Error loading affiliate data:', error);
        window.location.href = '/player/dashboard';
      } finally {
        setIsLoading(false);
      }
    }

    loadAffiliateData();
  }, []);

  const loadMyReferrals = async (subAffiliateId: string) => {
    setIsLoadingReferrals(true);
    
    try {
      const { data, error } = await supabase
        .from('referrals')
        .select(`
          *,
          referred_player:profiles!referrals_referred_player_id_fkey(
            id,
            full_name,
            email
          ),
          player_deal:player_deals!referrals_player_deal_id_fkey(
            id,
            status,
            deal:deals(name)
          )
        `)
        .eq('sub_affiliate_id', subAffiliateId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setMyReferrals(data || []);
    } catch (error) {
      console.error('Error loading referrals:', error);
    } finally {
      setIsLoadingReferrals(false);
    }
  };

  const loadReferralEarnings = async (subAffiliateId: string) => {
    setIsLoadingEarnings(true);
    
    try {
      const { data, error } = await supabase
        .from('player_earnings')
        .select(`
          *,
          player_deal:player_deals!player_earnings_player_deal_id_fkey(
            user_id,
            platform_username,
            deals(name)
          )
        `)
        .order('period_year', { ascending: false })
        .order('period_month', { ascending: false });

      if (!error && data) {
        // Filter earnings to only include referrals from this sub-affiliate
        const { data: referralsData } = await supabase
          .from('referrals')
          .select('referred_player_id')
          .eq('sub_affiliate_id', subAffiliateId)
          .eq('status', 'active');

        if (referralsData) {
          const referredPlayerIds = referralsData.map(r => r.referred_player_id);
          
          // Get player profiles
          const { data: profilesData } = await supabase
            .from('profiles')
            .select('id, full_name, email')
            .in('id', referredPlayerIds);

          // Filter and map earnings
          const filteredEarnings = data
            .filter(earning => 
              earning.player_deal && 
              referredPlayerIds.includes(earning.player_deal.user_id)
            )
            .map(earning => {
              const profile = profilesData?.find(p => p.id === earning.player_deal.user_id);
              return {
                id: earning.id,
                period_month: earning.period_month,
                period_year: earning.period_year,
                gross_rake: parseFloat(earning.gross_rake),
                net_rake: parseFloat(earning.net_rake),
                payment_status: earning.payment_status,
                player_name: profile?.full_name || 'Unknown',
                player_email: profile?.email || '',
                deal_name: earning.player_deal?.deals?.name || 'Unknown',
                platform_username: earning.player_deal?.platform_username || '',
              };
            });

          setEarnings(filteredEarnings);
        }
      }
    } catch (error) {
      console.error('Error loading earnings:', error);
    } finally {
      setIsLoadingEarnings(false);
    }
  };

  const handleCopyCode = () => {
    if (!subAffiliateData?.referral_code) return;
    
    navigator.clipboard.writeText(subAffiliateData.referral_code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyLink = () => {
    if (!subAffiliateData?.referral_code) return;
    
    const link = `${window.location.origin}/deals/ref=${subAffiliateData.referral_code}`;
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Helper functions for earnings
  const getMonthName = (month: number) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[month - 1] || '';
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  // Filter earnings
  const filteredEarnings = earnings.filter(earning => {
    if (selectedPlayer !== 'all' && earning.player_name !== selectedPlayer) return false;
    if (selectedDeal !== 'all' && earning.deal_name !== selectedDeal) return false;
    if (selectedPeriod !== 'all') {
      const period = `${earning.period_year}-${earning.period_month.toString().padStart(2, '0')}`;
      if (period !== selectedPeriod) return false;
    }
    return true;
  });

  // Calculate summary stats
  const totalGrossRake = filteredEarnings.reduce((sum, e) => sum + e.gross_rake, 0);
  const totalNetRake = filteredEarnings.reduce((sum, e) => sum + e.net_rake, 0);
  
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const lastMonthYear = currentMonth === 1 ? currentYear - 1 : currentYear;
  
  const thisMonthRake = earnings
    .filter(e => e.period_month === currentMonth && e.period_year === currentYear)
    .reduce((sum, e) => sum + e.gross_rake, 0);
  
  const lastMonthRake = earnings
    .filter(e => e.period_month === lastMonth && e.period_year === lastMonthYear)
    .reduce((sum, e) => sum + e.gross_rake, 0);

  // Get unique values for filters
  const uniquePlayers = Array.from(new Set(earnings.map(e => e.player_name))).sort();
  const uniqueDeals = Array.from(new Set(earnings.map(e => e.deal_name))).sort();
  const uniquePeriods = Array.from(new Set(earnings.map(e => 
    `${e.period_year}-${e.period_month.toString().padStart(2, '0')}`
  ))).sort().reverse();

  // Mostrar loading enquanto verifica autorização
  if (isLoading || !isAuthorized) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/player/dashboard')}
            className="text-gray-400 hover:text-white mb-4 text-sm flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <h1 className="text-4xl font-bold mb-2">Affiliate Panel</h1>
          <p className="text-gray-400">Manage your referrals and track performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-900/20 via-gray-900 to-gray-900 border border-purple-500/30 rounded-xl p-6">
            <p className="text-sm text-gray-400 mb-2">Total Referrals</p>
            <p className="text-3xl font-bold text-purple-400">{myReferrals.length}</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-900/20 via-gray-900 to-gray-900 border border-emerald-500/30 rounded-xl p-6">
            <p className="text-sm text-gray-400 mb-2">Active Referrals</p>
            <p className="text-3xl font-bold text-emerald-400">
              {myReferrals.filter(r => r.status === 'active').length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-900/20 via-gray-900 to-gray-900 border border-blue-500/30 rounded-xl p-6">
            <p className="text-sm text-gray-400 mb-2">Pending Referrals</p>
            <p className="text-3xl font-bold text-blue-400">
              {myReferrals.filter(r => r.status === 'pending').length}
            </p>
          </div>
        </div>

        {/* Referral Info Card */}
        <div className="bg-gradient-to-br from-purple-900/20 via-gray-900 to-gray-900 rounded-2xl border border-purple-500/30 p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Your Referral Information</h2>
          
          {/* Referral Code */}
          <div className="mb-6">
            <p className="text-sm text-gray-400 uppercase font-medium mb-2">
              Your Referral Code
            </p>
            <div className="flex items-center gap-3">
              <code className="flex-1 text-3xl font-bold text-purple-400 tracking-wider bg-black/30 rounded-lg px-6 py-4">
                {subAffiliateData?.referral_code}
              </code>
              <button
                onClick={handleCopyCode}
                className="px-6 py-4 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/50 text-purple-400 rounded-lg transition-colors flex items-center gap-2"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-5 h-5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copy Code
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Referral Link */}
          <div>
            <p className="text-sm text-gray-400 uppercase font-medium mb-2">
              Your Referral Link
            </p>
            <div className="flex items-center gap-3">
              <code className="flex-1 text-base text-gray-300 bg-black/30 rounded-lg px-6 py-4 truncate">
                {`${typeof window !== 'undefined' ? window.location.origin : ''}/deals/ref=${subAffiliateData?.referral_code}`}
              </code>
              <button
                onClick={handleCopyLink}
                className="px-6 py-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors font-semibold whitespace-nowrap flex items-center gap-2"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-5 h-5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copy Link
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* My Referrals Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">My Referrals</h2>
              <p className="text-gray-400 mb-6">Players you&apos;ve referred and their performance</p>

          {isLoadingReferrals ? (
            <div className="bg-[#0a0e13] border border-gray-800 rounded-xl p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mb-4"></div>
              <p className="text-gray-400">Loading referrals...</p>
            </div>
          ) : myReferrals.length === 0 ? (
            <div className="bg-[#0a0e13] border border-gray-800 rounded-xl p-12 text-center">
              <div className="inline-block p-4 bg-gray-800 rounded-full mb-4">
                <Users className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                No Referrals Yet
              </h3>
              <p className="text-gray-400 mb-4">
                Start sharing your referral link to build your network!
              </p>
              <button
                onClick={handleCopyLink}
                className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors font-semibold"
              >
                Copy Referral Link
              </button>
            </div>
          ) : (
            <div className="bg-[#0a0e13] border border-gray-800 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-900/50 border-b border-gray-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Player
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Deal
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Joined
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {myReferrals.map((referral) => (
                    <tr key={referral.id} className="hover:bg-gray-900/30 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-white font-medium">
                            {referral.referred_player?.full_name || 'Unknown'}
                          </p>
                          <p className="text-sm text-gray-400">
                            {referral.referred_player?.email || 'No email'}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-300">
                          {referral.player_deal?.deal?.name || 'No deal yet'}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          referral.status === 'active' 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : referral.status === 'pending'
                            ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'
                            : 'bg-gray-500/10 text-gray-400 border border-gray-500/30'
                        }`}>
                          {referral.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {new Date(referral.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Referral Earnings Breakdown Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-2">Referral Earnings Breakdown</h2>
          <p className="text-gray-400 mb-6">Track rake generated by your referred players</p>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-purple-900/20 via-gray-900 to-gray-900 border border-purple-500/30 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="w-5 h-5 text-purple-400" />
                <p className="text-sm text-gray-400">Total Gross Rake</p>
              </div>
              <p className="text-2xl font-bold text-white">{formatCurrency(totalGrossRake)}</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-900/20 via-gray-900 to-gray-900 border border-emerald-500/30 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <p className="text-sm text-gray-400">Total Net Rake</p>
              </div>
              <p className="text-2xl font-bold text-white">{formatCurrency(totalNetRake)}</p>
            </div>
            <div className="bg-gradient-to-br from-blue-900/20 via-gray-900 to-gray-900 border border-blue-500/30 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-5 h-5 text-blue-400" />
                <p className="text-sm text-gray-400">This Month</p>
              </div>
              <p className="text-2xl font-bold text-white">{formatCurrency(thisMonthRake)}</p>
            </div>
            <div className="bg-gradient-to-br from-orange-900/20 via-gray-900 to-gray-900 border border-orange-500/30 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-5 h-5 text-orange-400" />
                <p className="text-sm text-gray-400">Last Month</p>
              </div>
              <p className="text-2xl font-bold text-white">{formatCurrency(lastMonthRake)}</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-[#0a0e13] border border-gray-800 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-gray-400" />
              <h3 className="text-lg font-semibold text-white">Filters</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Player Filter */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Player</label>
                <select
                  value={selectedPlayer}
                  onChange={(e) => setSelectedPlayer(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors"
                >
                  <option value="all">All Players</option>
                  {uniquePlayers.map(player => (
                    <option key={player} value={player}>{player}</option>
                  ))}
                </select>
              </div>

              {/* Deal Filter */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Deal</label>
                <select
                  value={selectedDeal}
                  onChange={(e) => setSelectedDeal(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors"
                >
                  <option value="all">All Deals</option>
                  {uniqueDeals.map(deal => (
                    <option key={deal} value={deal}>{deal}</option>
                  ))}
                </select>
              </div>

              {/* Period Filter */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Period</label>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500 transition-colors"
                >
                  <option value="all">All Periods</option>
                  {uniquePeriods.map(period => {
                    const [year, month] = period.split('-');
                    return (
                      <option key={period} value={period}>
                        {getMonthName(parseInt(month))} {year}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>

          {/* Earnings Table */}
          {isLoadingEarnings ? (
            <div className="bg-[#0a0e13] border border-gray-800 rounded-xl p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mb-4"></div>
              <p className="text-gray-400">Loading earnings...</p>
            </div>
          ) : filteredEarnings.length === 0 ? (
            <div className="bg-[#0a0e13] border border-gray-800 rounded-xl p-12 text-center">
              <div className="inline-block p-4 bg-gray-800 rounded-full mb-4">
                <DollarSign className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                No Earnings Data Yet
              </h3>
              <p className="text-gray-400">
                Earnings will appear here once your referred players generate rake
              </p>
            </div>
          ) : (
            <div className="bg-[#0a0e13] border border-gray-800 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-900/50 border-b border-gray-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Player
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Deal
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Period
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Gross Rake
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Net Rake
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {filteredEarnings.map((earning) => (
                    <tr key={earning.id} className="hover:bg-gray-900/30 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-white font-medium">{earning.player_name}</p>
                          <p className="text-sm text-gray-400">{earning.platform_username}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-300">{earning.deal_name}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-300">
                          {getMonthName(earning.period_month)} {earning.period_year}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <p className="text-white font-semibold">
                          {formatCurrency(earning.gross_rake)}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <p className="text-emerald-400 font-semibold">
                          {formatCurrency(earning.net_rake)}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-900/50 border-t border-gray-800">
                  <tr>
                    <td colSpan={3} className="px-6 py-4 text-right font-semibold text-white">
                      TOTAL:
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="text-white font-bold text-lg">
                        {formatCurrency(totalGrossRake)}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="text-emerald-400 font-bold text-lg">
                        {formatCurrency(totalNetRake)}
                      </p>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
