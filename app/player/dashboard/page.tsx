'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import ProtectedRoute from '@/components/ProtectedRoute';
import HeaderWithAuth from '@/app/components/HeaderWithAuth';
import Footer from '@/app/components/Footer';
import DealDetailsModal from '@/components/DealDetailsModal';
import SubAffiliateRequestModal from '@/components/SubAffiliateRequestModal';
import { getPlayerDeals, getPlayerEarnings, type PlayerDeal, type PlayerEarning } from '@/lib/api/playerApi';
import { supabase } from '@/lib/supabase/client';
import { 
  ChevronRight,
  HelpCircle,
  Info,
  Sparkles
} from 'lucide-react';

// Helper functions
function getMonthName(month: number): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[month - 1] || '';
}

function formatDate(dateString: string | null): string {
  if (!dateString) return '—';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
}

function formatPeriod(month: number, year: number): string {
  return `${getMonthName(month)} ${year}`;
}

// Type for deal details modal (legacy format)
interface DealDetailsType {
  id: string;
  platform: string;
  logo: string;
  deal: string;
  description: string;
  status: string;
  rakeback: string;
  username: string;
  paymentSchedule: string;
  currency: string;
  nextPayment: string;
  paymentMethod: string;
  rejectionReason?: string | null;
  dealTitle?: string;
  dealMainValue?: string;
  dealMainValueSecondLine?: string;
  dealSubtitle?: string;
}

export default function PlayerDashboard() {
  // State
  const [connectedDeals, setConnectedDeals] = useState<PlayerDeal[]>([]);
  const [earningsData, setEarningsData] = useState<PlayerEarning[]>([]);
  const [isLoadingDeals, setIsLoadingDeals] = useState(true);
  const [isLoadingEarnings, setIsLoadingEarnings] = useState(true);
  
  const [selectedDeal, setSelectedDeal] = useState<DealDetailsType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string>('all');

  // Sub-Affiliate States
  const [isSubAffiliateModalOpen, setIsSubAffiliateModalOpen] = useState(false);
  const [subAffiliateStatus, setSubAffiliateStatus] = useState<'none' | 'pending' | 'approved' | 'rejected'>('none');
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string>('');

  // NOVOS STATES para Sub-Affiliate Dashboard
  interface SubAffiliateData {
    id: string;
    player_id: string;
    referral_code: string;
    created_at: string;
  }
  const [subAffiliateData, setSubAffiliateData] = useState<SubAffiliateData | null>(null);

  // Fetch deals e earnings ao carregar
  useEffect(() => {
    console.log('🚀 [PlayerDashboard] useEffect executado - iniciando fetch de dados');
    
    async function fetchData() {
      console.log('🔍 [PlayerDashboard] fetchData iniciado');
      
      try {
        // Fetch deals
        console.log('🔍 [PlayerDashboard] Chamando getPlayerDeals()...');
        const dealsResult = await getPlayerDeals();
        console.log('✅ [PlayerDashboard] getPlayerDeals() retornou:', dealsResult);
        console.log('🔍 [PlayerDashboard] API Response:', dealsResult);
        
        if (dealsResult.success && dealsResult.deals) {
          console.log('✅ [PlayerDashboard] Success! Total deals:', dealsResult.deals.length);
          console.log('🔍 [PlayerDashboard] Deals data:', dealsResult.deals);
          console.log('🔍 [PlayerDashboard] First deal:', dealsResult.deals[0]);
          console.log('🔍 [PlayerDashboard] Rejection reasons:', dealsResult.deals.map(d => ({ 
            name: d.dealName, 
            status: d.status, 
            rejection: d.rejectionReason 
          })));
          setConnectedDeals(dealsResult.deals);
        } else {
          console.error('❌ [PlayerDashboard] Failed to load deals:', dealsResult.error);
        }
        setIsLoadingDeals(false);

        // Fetch earnings
        console.log('🔍 [PlayerDashboard] Chamando getPlayerEarnings()...');
        const earningsResult = await getPlayerEarnings();
        console.log('✅ [PlayerDashboard] getPlayerEarnings() retornou:', earningsResult);
        
        if (earningsResult.success && earningsResult.earnings) {
          setEarningsData(earningsResult.earnings);
        } else {
          console.error('❌ [PlayerDashboard] Failed to load earnings:', earningsResult.error);
        }
        setIsLoadingEarnings(false);
      } catch (err: unknown) {
        console.error('❌ [PlayerDashboard] Erro no catch:', err);
        console.error('❌ [PlayerDashboard] Error fetching data:', err);
        setIsLoadingDeals(false);
        setIsLoadingEarnings(false);
      }
    }

    console.log('🔍 [PlayerDashboard] Chamando fetchData()...');
    fetchData();
    console.log('🔍 [PlayerDashboard] fetchData() chamado (async)');
  }, []);

  // Check sub-affiliate status
  useEffect(() => {
    async function checkSubAffiliateStatus() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setIsCheckingStatus(false);
          return;
        }

        setCurrentUserId(user.id);

        // Verificar se já é sub-affiliate
        const { data: subAffiliate } = await supabase
          .from('sub_affiliates')
          .select('*')
          .eq('player_id', user.id)
          .single();

        if (subAffiliate) {
          setSubAffiliateStatus('approved');
          setSubAffiliateData(subAffiliate);
          setIsCheckingStatus(false);
          return;
        }

        // Verificar se tem request pendente
        const { data: request } = await supabase
          .from('sub_affiliate_requests')
          .select('status')
          .eq('player_id', user.id)
          .eq('status', 'pending')
          .single();

        if (request) {
          setSubAffiliateStatus('pending');
        }

        setIsCheckingStatus(false);
      } catch (error) {
        console.error('Error checking sub-affiliate status:', error);
        setIsCheckingStatus(false);
      }
    }

    checkSubAffiliateStatus();
  }, []);

  const handleRequestSuccess = () => {
    setSubAffiliateStatus('pending');
  };

  const handleViewDetails = (deal: PlayerDeal) => {
    console.log('🔍 [handleViewDetails] Deal clicado:', deal);
    console.log('🔍 [handleViewDetails] Status original:', deal.status);
    console.log('🔍 [handleViewDetails] RejectionReason:', deal.rejectionReason);
    console.log('🔍 [handleViewDetails] Deal completo:', JSON.stringify(deal, null, 2));
    
    // Converter PlayerDeal para formato esperado pelo modal
    const dealDetails: DealDetailsType = {
      id: deal.id,
      platform: deal.dealName,
      logo: deal.dealLogo,
      deal: deal.dealName, // Usar dealName como descrição do deal
      description: `${deal.status} deal`,
      status: deal.status, // Manter lowercase para funcionar com o modal
      rakeback: deal.rakebackPercentage ? `${deal.rakebackPercentage}%` : 'N/A',
      username: deal.platformUsername,
      paymentSchedule: deal.paymentSchedule || 'N/A',
      currency: deal.currency || 'USD',
      nextPayment: 'TBD', // Calcular baseado em payment_day
      paymentMethod: deal.paymentMethod || 'N/A',
      rejectionReason: deal.rejectionReason,
      dealTitle: deal.dealTitle,
      dealMainValue: deal.dealMainValue,
      dealMainValueSecondLine: deal.dealMainValueSecondLine,
      dealSubtitle: deal.dealSubtitle
    };
    
    console.log('🔍 [handleViewDetails] DealDetails criado:', dealDetails);
    console.log('🔍 [handleViewDetails] Status formatado:', dealDetails.status);
    console.log('🔍 [handleViewDetails] RejectionReason no dealDetails:', dealDetails.rejectionReason);
    
    setSelectedDeal(dealDetails);
    setIsModalOpen(true);
    
    console.log('✅ [handleViewDetails] Modal aberto com deal:', {
      id: dealDetails.id,
      status: dealDetails.status,
      rejectionReason: dealDetails.rejectionReason
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedDeal(null), 200); // Delay to allow animation
  };

  // Filter earnings based on selected month
  const filteredEarnings = selectedMonth === 'all' 
    ? earningsData 
    : earningsData.filter(earning => formatPeriod(earning.periodMonth, earning.periodYear) === selectedMonth);

  // Get unique months for filter dropdown
  const uniqueMonths = Array.from(
    new Set(earningsData.map(e => formatPeriod(e.periodMonth, e.periodYear)))
  );

  return (
    <ProtectedRoute allowedUserType="player">
      <div className="min-h-screen bg-black text-white flex flex-col">
        {/* Site Header */}
        <section className="relative bg-black w-full px-3 md:px-4 pt-6">
          <div className="relative w-full">
            <div className="relative z-50">
              <HeaderWithAuth />
            </div>
          </div>
        </section>

        {/* Main Content - Full Width */}
        <main className="flex-1 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {/* Page Title */}
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
                Player Dashboard
              </h1>
              <p className="text-gray-400 text-lg">
                Track your affiliate deals and earnings
              </p>
            </div>

            {/* ========================================== */}
            {/* SUB-AFFILIATE CARDS */}
            {/* ========================================== */}

            {/* Card 1: Become a Sub-Affiliate (quando não é sub) */}
            {!isCheckingStatus && subAffiliateStatus === 'none' && (
              <div className="relative">
                <div className="absolute -top-32 right-0 z-10">
                  <div className="w-80 bg-gradient-to-br from-emerald-900/20 via-gray-900 to-gray-900 rounded-xl border border-emerald-500/30 p-5 shadow-lg shadow-emerald-500/5">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-emerald-500/10 rounded-lg flex-shrink-0">
                        <Sparkles className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-white mb-1">
                          Become a Sub-Affiliate
                        </h3>
                        <p className="text-gray-400 text-sm mb-3 leading-snug">
                          Refer players and earn rewards!
                        </p>
                        <button
                          onClick={() => setIsSubAffiliateModalOpen(true)}
                          className="w-full px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white text-sm rounded-lg transition-all font-semibold"
                        >
                          Apply Now →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Card 2: Application Under Review */}
            {!isCheckingStatus && subAffiliateStatus === 'pending' && (
              <div className="relative">
                <div className="absolute -top-32 right-0 z-10">
                  <div className="w-80 bg-gradient-to-br from-yellow-900/20 via-gray-900 to-gray-900 rounded-xl border border-yellow-500/30 p-5 shadow-lg shadow-yellow-500/5">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-yellow-500/10 rounded-lg flex-shrink-0">
                        <Sparkles className="w-5 h-5 text-yellow-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-white mb-1">
                          Application Under Review
                        </h3>
                        <p className="text-gray-400 text-sm leading-snug">
                          Your application is being reviewed. We&apos;ll notify you soon.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Card 3: Sub-Affiliate - Compacto */}
            {!isCheckingStatus && subAffiliateStatus === 'approved' && subAffiliateData && (
              <div className="relative">
                <div className="absolute -top-32 right-0 z-10">
                  <div className="w-80 bg-gradient-to-br from-purple-900/20 via-gray-900 to-gray-900 rounded-xl border border-purple-500/30 p-5 shadow-lg shadow-purple-500/5">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-purple-500/10 rounded-lg flex-shrink-0">
                        <Sparkles className="w-5 h-5 text-purple-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-white mb-1">
                          Sub-Affiliate
                        </h3>
                        <p className="text-sm text-gray-400 mb-2">
                          Code: <code className="text-purple-400 font-semibold">{subAffiliateData.referral_code}</code>
                        </p>
                        <button
                          onClick={() => window.location.href = '/player/dashboard/affiliate'}
                          className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white text-sm rounded-lg transition-all font-semibold"
                        >
                          Access Affiliate Panel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Your Connected Deals Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold text-white">Your Connected Deals</h2>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#10b981] animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-300">
                      {connectedDeals.length} <span className="text-gray-500">Active</span>
                    </span>
                  </div>
                </div>
              </div>
              {isLoadingDeals ? (
                <div className="col-span-full text-center py-12">
                  <div className="inline-block w-8 h-8 border-4 border-[#10b981]/30 border-t-[#10b981] rounded-full animate-spin"></div>
                  <p className="text-gray-400 mt-4">Loading deals...</p>
                </div>
              ) : connectedDeals.length === 0 ? (
                <div className="col-span-full text-center py-12 bg-gradient-to-b from-[#0d0d0d] to-[#121212] border border-white/[0.06] rounded-2xl">
                  <p className="text-gray-400 mb-2">No deals connected yet.</p>
                  <p className="text-sm text-gray-500">Browse available deals and request access to get started.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 overflow-visible">
                  {connectedDeals.map((deal) => (
                    <div
                      key={deal.id}
                      className="relative group/deal overflow-visible rounded-2xl bg-gradient-to-b from-[#0d0d0d] to-[#121212] border border-white/[0.06] p-6 hover:border-[#10b981]/30 hover:shadow-xl hover:shadow-[#10b981]/10 transition-all duration-300"
                    >
                      {/* Ambient glow effect on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#10b981]/0 via-[#10b981]/0 to-[#10b981]/5 opacity-0 group-hover/deal:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                      
                      {/* Platform Logo & Status */}
                      <div className="relative flex items-start justify-between mb-6">
                        <div className="h-10 flex items-center">
                          <Image 
                            src={deal.dealLogo} 
                            alt={`${deal.dealName} logo`}
                            width={128}
                            height={40}
                            className="h-8 w-auto object-contain brightness-110 transition-transform duration-300 group-hover/deal:scale-105"
                          />
                        </div>
                        <div className="relative group/status">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                            deal.status === 'active' 
                              ? 'bg-gradient-to-br from-green-400/10 to-green-400/5 text-green-400 border border-green-400/20 shadow-lg shadow-green-400/10'
                              : deal.status === 'pending'
                              ? 'bg-gradient-to-br from-orange-400/10 to-orange-400/5 text-orange-400 border border-orange-400/20 shadow-lg shadow-orange-400/10'
                              : deal.status === 'rejected'
                              ? 'bg-gradient-to-br from-red-500/10 to-red-500/5 text-red-500 border border-red-500/20 shadow-lg shadow-red-500/10'
                              : 'bg-gradient-to-br from-blue-400/10 to-blue-400/5 text-blue-400 border border-blue-400/20 shadow-lg shadow-blue-400/10'
                          }`}>
                            {deal.status === 'rejected' ? 'Try Again' : deal.status.charAt(0).toUpperCase() + deal.status.slice(1)}
                          </span>
                          
                          {/* Tooltip para deals rejeitados */}
                          {deal.status === 'rejected' && deal.rejectionReason && (
                            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover/status:block w-80 max-w-[90vw] p-4 bg-[#0a0e13] border border-red-500/30 rounded-lg shadow-2xl z-[100]">
                              <p className="text-sm font-semibold text-red-500 mb-2">
                                Reason:
                              </p>
                              <p className="text-sm text-gray-300 leading-relaxed mb-3">
                                {deal.rejectionReason}
                              </p>
                              <p className="text-xs text-gray-500">
                                Please correct the issue and resubmit your application.
                              </p>
                              {/* Seta apontando para baixo */}
                              <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-red-500/30"></div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Deal Summary - Dynamic with full description */}
                      <div className="relative mb-6 h-5 flex items-center group/description">
                        <p className="text-xs text-gray-300 leading-tight truncate w-full">
                          {deal.dealTitle && deal.dealMainValue ? (
                            <>
                              {deal.dealTitle}{' '}
                              <span className="font-bold text-white">{deal.dealMainValue}</span>
                              {deal.dealMainValueSecondLine && <span className="font-bold text-white"> {deal.dealMainValueSecondLine}</span>}
                              {deal.dealSubtitle && <span className="text-gray-400"> {deal.dealSubtitle}</span>}
                            </>
                          ) : (
                            <span className="text-sm font-semibold text-white">{deal.dealName}</span>
                          )}
                        </p>
                        
                        {/* Tooltip com texto completo */}
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover/description:block w-80 max-w-[90vw] p-3 bg-[#0a0e13] border border-white/10 rounded-lg shadow-2xl z-[100] pointer-events-none">
                          <p className="text-xs text-gray-300 leading-relaxed text-center">
                            {deal.dealTitle && deal.dealMainValue ? (
                              <>
                                {deal.dealTitle}{' '}
                                <span className="font-bold text-white">{deal.dealMainValue}</span>
                                {deal.dealMainValueSecondLine && <span className="font-bold text-white"> {deal.dealMainValueSecondLine}</span>}
                                {deal.dealSubtitle && <span className="text-gray-400"> {deal.dealSubtitle}</span>}
                              </>
                            ) : (
                              <span className="text-sm font-semibold text-white">{deal.dealName}</span>
                            )}
                          </p>
                          {/* Seta apontando para baixo */}
                          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-white/10"></div>
                        </div>
                      </div>
                      
                      {/* Details Button */}
                      <button 
                        onClick={() => handleViewDetails(deal)}
                        className="relative w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] hover:from-white/[0.08] hover:to-white/[0.04] border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300 text-sm font-semibold text-gray-300 hover:text-white group/btn shadow-lg shadow-black/20"
                      >
                        <span>View Details</span>
                        <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" strokeWidth={2.5} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Earnings Breakdown Table */}
            <div className="rounded-2xl bg-gradient-to-b from-[#0d0d0d] to-[#121212] border border-white/[0.06] overflow-hidden mb-8">
              <div className="p-6 border-b border-white/[0.06]">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Earnings Breakdown</h2>
                    <p className="text-sm text-gray-400 mt-1">Your rakeback earnings by platform and period</p>
                  </div>
                  
                  {/* Month Filter */}
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Filter:
                    </label>
                    <select
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                      className="px-3 py-2 text-sm font-medium text-white bg-black/40 border border-white/[0.08] rounded-lg hover:border-white/[0.15] focus:outline-none focus:border-[#10b981]/50 focus:ring-2 focus:ring-[#10b981]/20 transition-all duration-300 cursor-pointer"
                      style={{ boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.3)' }}
                    >
                      <option value="all" className="bg-[#0d0d0d]">All Months</option>
                      {uniqueMonths.map(month => (
                        <option key={month} value={month} className="bg-[#0d0d0d]">{month}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-black/40">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Platform
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Period
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Gross Rake
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Net Rake
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider group/tooltip relative">
                        <div className="flex items-center gap-1.5">
                          <span>Updated</span>
                          <Info size={14} className="text-gray-500 cursor-help" />
                        </div>
                        {/* Tooltip */}
                        <div className="absolute left-0 top-full mt-2 px-3 py-2 bg-black/95 border border-white/[0.15] rounded-lg shadow-xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 pointer-events-none z-10 w-64 normal-case">
                          <p className="text-xs text-gray-300">We update this rake data when we receive reports from the site. This is typically weekly.</p>
                          <div className="absolute left-6 bottom-full w-2 h-2 bg-black/95 border-l border-t border-white/[0.15] transform rotate-45 -mb-1"></div>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Payment
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Payment Made
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    {isLoadingEarnings ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-12 text-center">
                          <div className="inline-block w-8 h-8 border-4 border-[#10b981]/30 border-t-[#10b981] rounded-full animate-spin"></div>
                          <p className="text-gray-400 mt-4">Loading earnings...</p>
                        </td>
                      </tr>
                    ) : filteredEarnings.length > 0 ? (
                      filteredEarnings.map((earning) => (
                        <tr key={earning.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <div className="text-sm font-semibold text-white">{earning.dealName}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-400">{formatPeriod(earning.periodMonth, earning.periodYear)}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-300 font-medium">${earning.grossRake.toFixed(2)}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-300 font-medium">${earning.netRake.toFixed(2)}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.03] text-gray-400 border border-white/[0.06]">
                              {formatDate(earning.dataUpdatedAt)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {earning.rakebackAmount > 0 ? (
                              <span className="text-sm font-bold text-[#10b981]">${earning.rakebackAmount.toFixed(2)}</span>
                            ) : (
                              <span className="text-sm text-gray-600">—</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {earning.paymentStatus === 'paid' && earning.paymentDate ? (
                              <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-br from-green-400/10 to-green-400/5 text-green-400 border border-green-400/20 shadow-sm">
                                {formatDate(earning.paymentDate)}
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-br from-orange-400/10 to-orange-400/5 text-orange-400 border border-orange-400/20 shadow-sm">
                                Pending
                              </span>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="px-6 py-12 text-center">
                          <p className="text-gray-400 text-sm">No earnings found for the selected period</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Help Section */}
            <div className="rounded-2xl bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-white/[0.06] p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-[#10b981]/10 border border-[#10b981]/20">
                  <HelpCircle size={24} className="text-[#10b981]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">Need help with your payments or deals?</h3>
                  <p className="text-sm text-gray-400">Our support team is here to assist you with any questions.</p>
                </div>
                <a
                  href="/contact-us"
                  className="px-6 py-3 rounded-lg bg-[#10b981] hover:bg-[#0a9b30] text-white font-semibold transition-all duration-300 hover:scale-[1.02] whitespace-nowrap"
                >
                  Contact Country Manager
                </a>
              </div>
            </div>
          </div>
        </main>

        {/* Site Footer */}
        <Footer />
      </div>

      {/* Deal Details Modal */}
      <DealDetailsModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        deal={selectedDeal}
      />

      {/* Sub-Affiliate Request Modal */}
      <SubAffiliateRequestModal
        isOpen={isSubAffiliateModalOpen}
        onClose={() => setIsSubAffiliateModalOpen(false)}
        onSuccess={handleRequestSuccess}
        userId={currentUserId}
      />
    </ProtectedRoute>
  );
}

