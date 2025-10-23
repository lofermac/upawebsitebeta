'use client'

import { useState } from 'react';
import Image from 'next/image';
import ProtectedRoute from '@/components/ProtectedRoute';
import HeaderWithAuth from '@/app/components/HeaderWithAuth';
import Footer from '@/app/components/Footer';
import DealDetailsModal from '@/components/DealDetailsModal';
import { 
  ChevronRight,
  HelpCircle,
  Info
} from 'lucide-react';

// Mock earnings data
const earningsData = [
  { id: 1, platform: 'Betfair Poker', period: 'Oct 2025', grossRake: '$156.00', netRake: '$101.40', updated: '21-Oct-2025', reward: null, paymentMade: null },
  { id: 2, platform: 'Champion Poker', period: 'Oct 2025', grossRake: '$94.50', netRake: '$66.15', updated: '21-Oct-2025', reward: null, paymentMade: null },
  { id: 3, platform: 'WPT Global', period: 'Oct 2025', grossRake: '$112.30', netRake: '$67.38', updated: '20-Oct-2025', reward: null, paymentMade: null },
  { id: 4, platform: 'Betfair Poker', period: 'Sep 2025', grossRake: '$125.00', netRake: '$81.25', updated: '30-Sep-2025', reward: '$81.25', paymentMade: '05-Oct-2025' },
  { id: 5, platform: 'Champion Poker', period: 'Sep 2025', grossRake: '$89.15', netRake: '$62.41', updated: '30-Sep-2025', reward: '$62.41', paymentMade: '03-Oct-2025' },
  { id: 6, platform: 'WPT Global', period: 'Sep 2025', grossRake: '$78.50', netRake: '$47.10', updated: '29-Sep-2025', reward: '$47.10', paymentMade: '08-Oct-2025' },
  { id: 7, platform: 'Betfair Poker', period: 'Aug 2025', grossRake: '$340.00', netRake: '$221.00', updated: '31-Aug-2025', reward: '$221.00', paymentMade: '05-Sep-2025' },
  { id: 8, platform: 'Champion Poker', period: 'Aug 2025', grossRake: '$156.00', netRake: '$109.20', updated: '31-Aug-2025', reward: '$109.20', paymentMade: '02-Sep-2025' },
];

// Mock connected deals
const connectedDeals = [
  { 
    id: 1, 
    platform: 'Betfair Poker', 
    logo: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/09/17185334/Betfair-Website-Logo-1-1-1-1024x185.webp',
    deal: 'Instant VIP Upgrade To 35% Cashback + €50k In Races', 
    description: 'Premium VIP treatment from day one',
    status: 'Connected',
    rakeback: '35%',
    username: 'player_betfair_2025',
    paymentSchedule: 'Monthly (1st of month)',
    currency: 'EUR (€)',
    nextPayment: 'Nov 1, 2025',
    paymentMethod: 'Bank Transfer'
  },
  { 
    id: 2, 
    platform: 'WPT Global', 
    logo: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/01/07105909/WPT-LOGO-WebP-1920x350-1-1024x168.webp',
    deal: 'Get Up To An Extra 40% Cashback Every Month', 
    description: 'Play on the official World Poker Tour platform',
    status: 'Connected',
    rakeback: '40%',
    username: 'wptplayer2025',
    paymentSchedule: 'Monthly (5th of month)',
    currency: 'USD ($)',
    nextPayment: 'Nov 5, 2025',
    paymentMethod: 'Skrill'
  },
  { 
    id: 3, 
    platform: 'Champion Poker', 
    logo: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/17184626/CHAMPIONPOKER-logo-1024x160.webp',
    deal: 'Get An Instant Upgrade To 30% Cashback + All On-Site Promotions', 
    description: 'Rising star in the poker network scene',
    status: 'Connected',
    rakeback: '30%',
    username: 'champion_player_uk',
    paymentSchedule: 'Bi-weekly (1st and 15th)',
    currency: 'EUR (€)',
    nextPayment: 'Nov 1, 2025',
    paymentMethod: 'Neteller'
  },
];

export default function PlayerDashboard() {
  const [selectedDeal, setSelectedDeal] = useState<typeof connectedDeals[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string>('all');

  const handleViewDetails = (deal: typeof connectedDeals[0]) => {
    setSelectedDeal(deal);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedDeal(null), 200); // Delay to allow animation
  };

  // Filter earnings based on selected month
  const filteredEarnings = selectedMonth === 'all' 
    ? earningsData 
    : earningsData.filter(earning => earning.period === selectedMonth);

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

            {/* Your Connected Deals Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Your Connected Deals</h2>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#10b981] animate-pulse"></div>
                  <span className="text-sm font-semibold text-gray-300">
                    {connectedDeals.length} <span className="text-gray-500">Active Deals</span>
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {connectedDeals.map((deal) => (
                  <div
                    key={deal.id}
                    className="relative group/deal overflow-hidden rounded-2xl bg-gradient-to-b from-[#0d0d0d] to-[#121212] border border-white/[0.06] p-6 hover:border-[#10b981]/30 hover:shadow-xl hover:shadow-[#10b981]/10 transition-all duration-300"
                  >
                    {/* Ambient glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#10b981]/0 via-[#10b981]/0 to-[#10b981]/5 opacity-0 group-hover/deal:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                    
                    {/* Platform Logo & Status */}
                    <div className="relative flex items-start justify-between mb-6">
                      <div className="h-10 flex items-center">
                        <Image 
                          src={deal.logo} 
                          alt={`${deal.platform} logo`}
                          width={128}
                          height={40}
                          className="h-8 w-auto object-contain brightness-110 transition-transform duration-300 group-hover/deal:scale-105"
                        />
                      </div>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gradient-to-br from-green-400/10 to-green-400/5 text-green-400 border border-green-400/20 shadow-lg shadow-green-400/10">
                        {deal.status}
                      </span>
                    </div>
                    
                    {/* Deal Summary - Fixed 2 lines */}
                    <p className="relative text-sm text-gray-400 mb-6 h-10 line-clamp-2 leading-5 font-medium">{deal.deal}</p>
                    
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
                      <option value="Oct 2025" className="bg-[#0d0d0d]">October 2025</option>
                      <option value="Sep 2025" className="bg-[#0d0d0d]">September 2025</option>
                      <option value="Aug 2025" className="bg-[#0d0d0d]">August 2025</option>
                      <option value="Jul 2025" className="bg-[#0d0d0d]">July 2025</option>
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
                    {filteredEarnings.length > 0 ? (
                      filteredEarnings.map((earning) => (
                        <tr key={earning.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <div className="text-sm font-semibold text-white">{earning.platform}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-400">{earning.period}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-300 font-medium">{earning.grossRake}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-300 font-medium">{earning.netRake}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.03] text-gray-400 border border-white/[0.06]">
                              {earning.updated}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {earning.reward ? (
                              <span className="text-sm font-bold text-[#10b981]">{earning.reward}</span>
                            ) : (
                              <span className="text-sm text-gray-600">—</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {earning.paymentMade ? (
                              <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-br from-green-400/10 to-green-400/5 text-green-400 border border-green-400/20 shadow-sm">
                                {earning.paymentMade}
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
    </ProtectedRoute>
  );
}

