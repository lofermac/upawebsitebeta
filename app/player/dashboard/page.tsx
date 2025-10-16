'use client'

import ProtectedRoute from '@/components/ProtectedRoute';
import HeaderWithAuth from '@/app/components/HeaderWithAuth';
import Footer from '@/app/components/Footer';
import { 
  Link as LinkIcon, 
  DollarSign,
  TrendingUp,
  Clock,
  Shield,
  Star,
  Trophy,
  ChevronRight,
  HelpCircle
} from 'lucide-react';

// Mock earnings data
const earningsData = [
  { id: 1, platform: 'Betfair', period: 'Sep 2025', grossRake: '€125.00', netRake: '€81.25', updated: '30-Sep-2025' },
  { id: 2, platform: 'Champion', period: 'Sep 2025', grossRake: '€89.15', netRake: '€62.41', updated: '30-Sep-2025' },
  { id: 3, platform: 'WPT Global', period: 'Sep 2025', grossRake: '€78.50', netRake: '€47.10', updated: '29-Sep-2025' },
  { id: 4, platform: 'Betfair', period: 'Aug 2025', grossRake: '€340.00', netRake: '€221.00', updated: '31-Aug-2025' },
  { id: 5, platform: 'Champion', period: 'Aug 2025', grossRake: '€156.00', netRake: '€109.20', updated: '31-Aug-2025' },
];

// Mock connected deals
const connectedDeals = [
  { 
    id: 1, 
    platform: 'Betfair', 
    icon: Shield, 
    deal: '35% cashback + €50,000 races', 
    status: 'Connected',
    rakeback: '35%'
  },
  { 
    id: 2, 
    platform: 'WPT Global', 
    icon: Star, 
    deal: '60% rakeback + VIP upgrades', 
    status: 'Connected',
    rakeback: '60%'
  },
  { 
    id: 3, 
    platform: 'Champion', 
    icon: Trophy, 
    deal: '€1,000 first deposit bonus', 
    status: 'Connected',
    rakeback: '45%'
  },
];

export default function PlayerDashboard() {

  const stats = [
    { 
      title: 'Total Deals Connected',
      label: 'Active Platforms', 
      value: '3', 
      change: '+1 this month', 
      icon: LinkIcon,
      color: 'from-blue-500 to-blue-600'
    },
    { 
      title: 'Total Rakeback',
      label: 'Average Rakeback', 
      value: '32.5%', 
      change: 'Across all deals', 
      icon: DollarSign,
      color: 'from-green-500 to-green-600'
    },
    { 
      title: 'This Month Earnings',
      label: 'September 2025', 
      value: '€156.42', 
      change: '+€45 vs last month', 
      icon: TrendingUp,
      color: 'from-emerald-500 to-emerald-600'
    },
    { 
      title: 'Pending Payments',
      label: 'To be processed', 
      value: '€89.15', 
      change: '2 platforms', 
      icon: Clock,
      color: 'from-orange-500 to-orange-600'
    },
  ];

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

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="relative group/card overflow-hidden rounded-2xl bg-gradient-to-b from-[#0d0d0d] to-[#121212] border border-white/[0.06] p-6 hover:border-white/[0.12] transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                      <stat.icon size={24} className="text-white" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">{stat.title}</p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</h3>
                  <p className="text-sm text-gray-400 mb-2">{stat.label}</p>
                  <p className={`text-xs font-semibold ${stat.change.startsWith('+') ? 'text-green-400' : 'text-gray-400'}`}>{stat.change}</p>
                </div>
              ))}
            </div>

            {/* Your Connected Deals Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Your Connected Deals</h2>
                <span className="text-sm text-gray-400">{connectedDeals.length} active platforms</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {connectedDeals.map((deal) => (
                  <div
                    key={deal.id}
                    className="relative group/deal overflow-hidden rounded-2xl bg-gradient-to-b from-[#0d0d0d] to-[#121212] border border-white/[0.06] p-6 hover:border-[#10b981]/30 transition-all duration-300"
                  >
                    {/* Platform Icon */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-[#10b981]/20 to-[#10b981]/10 border border-[#10b981]/20">
                        <deal.icon size={24} className="text-[#10b981]" />
                      </div>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-400/10 text-green-400 border border-green-400/20">
                        {deal.status}
                      </span>
                    </div>
                    
                    {/* Platform Name */}
                    <h3 className="text-xl font-bold text-white mb-2">{deal.platform}</h3>
                    
                    {/* Deal Summary */}
                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">{deal.deal}</p>
                    
                    {/* Rakeback Badge */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                      <span className="text-xs text-gray-500">Rakeback:</span>
                      <span className="text-sm font-bold text-[#10b981]">{deal.rakeback}</span>
                    </div>
                    
                    {/* Details Button */}
                    <button className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 text-sm text-gray-300 hover:text-white group/btn">
                      <span>View Details</span>
                      <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Earnings Breakdown Table */}
            <div className="rounded-2xl bg-gradient-to-b from-[#0d0d0d] to-[#121212] border border-white/[0.06] overflow-hidden mb-8">
              <div className="p-6 border-b border-white/[0.06]">
                <h2 className="text-2xl font-bold text-white">Earnings Breakdown</h2>
                <p className="text-sm text-gray-400 mt-1">Your rakeback earnings by platform and period</p>
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
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Updated
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    {earningsData.map((earning) => (
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
                          <span className="text-sm font-bold text-[#10b981]">{earning.netRake}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {earning.updated}
                        </td>
                      </tr>
                    ))}
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
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </main>

        {/* Site Footer */}
        <Footer />
      </div>
    </ProtectedRoute>
  );
}

