'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Users, Copy, Check, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AffiliatePanel() {
  const router = useRouter();
  const [subAffiliateData, setSubAffiliateData] = useState<any>(null);
  const [myReferrals, setMyReferrals] = useState<any[]>([]);
  const [isLoadingReferrals, setIsLoadingReferrals] = useState(true);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

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
                {subAffiliateData.referral_code}
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
                {`${typeof window !== 'undefined' ? window.location.origin : ''}/deals/ref=${subAffiliateData.referral_code}`}
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
          <p className="text-gray-400 mb-6">Players you've referred and their performance</p>

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

      </div>
    </div>
  );
}
