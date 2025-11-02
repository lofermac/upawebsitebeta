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
  TrendingDown,
  Globe,
  LayoutGrid,
  FileCheck
} from 'lucide-react';
import { getDeals } from '@/lib/supabase/deals';
import RejectDealModal from '@/components/admin/RejectDealModal';
import ViewNotesModal from '@/components/admin/ViewNotesModal';

// Network platforms data
const platformsData = [
  {
    id: 1,
    name: 'WPT Global',
    code: 'WPT',
    logo: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/01/07105909/WPT-LOGO-WebP-1920x350-1-1024x168.webp',
    totalPlayers: 142,
    standardPlayers: 124,
    exclusivePlayers: 18,
    monthlyRake: '$24,500',
    commissionDue: '$6,125',
    avgPerPlayer: '$173',
    trend: '+8%',
    trendPositive: true
  },
  {
    id: 2,
    name: 'GGPoker',
    code: 'GG',
    logo: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/09/07144333/ggpoker_logo-1_white-1.webp',
    totalPlayers: 354,
    standardPlayers: 312,
    exclusivePlayers: 42,
    monthlyRake: '$51,200',
    commissionDue: '$12,800',
    avgPerPlayer: '$145',
    trend: '+15%',
    trendPositive: true
  },
  {
    id: 3,
    name: 'Unibet',
    code: 'UNI',
    logo: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/08/15110203/Unitbet-Logo.png',
    totalPlayers: 96,
    standardPlayers: 87,
    exclusivePlayers: 9,
    monthlyRake: '$9,800',
    commissionDue: '$2,450',
    avgPerPlayer: '$102',
    trend: '-3%',
    trendPositive: false
  },
  {
    id: 4,
    name: 'Champion Poker',
    code: 'CHP',
    logo: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2024/05/17184626/CHAMPIONPOKER-logo-1024x160.webp',
    totalPlayers: 63,
    standardPlayers: 56,
    exclusivePlayers: 7,
    monthlyRake: '$4,100',
    commissionDue: '$1,025',
    avgPerPlayer: '$65',
    trend: '+5%',
    trendPositive: true
  },
  {
    id: 5,
    name: '888poker',
    code: '888',
    logo: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/09/17183728/888-LOGO-webp-1024x309.webp',
    totalPlayers: 228,
    standardPlayers: 203,
    exclusivePlayers: 25,
    monthlyRake: '$18,700',
    commissionDue: '$4,675',
    avgPerPlayer: '$82',
    trend: '+11%',
    trendPositive: true
  },
  {
    id: 6,
    name: 'PartyPoker',
    code: 'PP',
    logo: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/07/07144334/ENT_PartyPoker_Landscape_FullWhite_RGB.png',
    totalPlayers: 199,
    standardPlayers: 178,
    exclusivePlayers: 21,
    monthlyRake: '$15,300',
    commissionDue: '$3,825',
    avgPerPlayer: '$77',
    trend: '+6%',
    trendPositive: true
  },
  {
    id: 7,
    name: 'Optibet',
    code: 'OPT',
    logo: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/09/17100841/Optibet-Poker-logo-2D-horizontal-red-bg-1024x298.png',
    totalPlayers: 49,
    standardPlayers: 44,
    exclusivePlayers: 5,
    monthlyRake: '$3,200',
    commissionDue: '$800',
    avgPerPlayer: '$65',
    trend: '-1%',
    trendPositive: false
  },
  {
    id: 8,
    name: 'Betfair',
    code: 'BF',
    logo: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/09/17185334/Betfair-Website-Logo-1-1-1-1024x185.webp',
    totalPlayers: 103,
    standardPlayers: 92,
    exclusivePlayers: 11,
    monthlyRake: '$7,200',
    commissionDue: '$1,800',
    avgPerPlayer: '$70',
    trend: '+4%',
    trendPositive: true
  },
  {
    id: 9,
    name: 'WSOP.ca',
    code: 'WSOP',
    logo: 'https://upa-cdn.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/12/11192441/wsop-ontario-logo-1024x376.webp',
    totalPlayers: 69,
    standardPlayers: 61,
    exclusivePlayers: 8,
    monthlyRake: '$5,400',
    commissionDue: '$1,350',
    avgPerPlayer: '$78',
    trend: '+9%',
    trendPositive: true
  },
];

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dealsCount, setDealsCount] = useState(0);

  // Load deals count
  useEffect(() => {
    async function loadDealsCount() {
      const { data } = await getDeals();
      setDealsCount(data?.length || 0);
    }
    loadDealsCount();
  }, []);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'dealrequests', label: 'Deal Requests', icon: FileCheck },
    { id: 'players', label: 'Players', icon: Users },
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
      value: '1,450', 
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600',
      textColor: 'text-blue-500'
    },
    { 
      label: 'Active Players',
      subtitle: 'Active players across all networks',
      value: '1,096', 
      icon: Users,
      color: 'from-green-500 to-green-600',
      iconBg: 'bg-gradient-to-br from-green-500 to-green-600',
      textColor: 'text-green-500'
    },
    { 
      label: 'Monthly Sign Ups',
      subtitle: 'New registrations this month',
      value: '127', 
      icon: Users,
      color: 'from-orange-500 to-orange-600',
      iconBg: 'bg-gradient-to-br from-orange-500 to-orange-600',
      textColor: 'text-orange-500'
    },
    { 
      label: 'Monthly Deals Applications',
      subtitle: 'Deal applications received this month',
      value: '284', 
      icon: FileText,
      color: 'from-purple-500 to-purple-600',
      iconBg: 'bg-gradient-to-br from-purple-500 to-purple-600',
      textColor: 'text-purple-500'
    },
  ];

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
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-[#10b981] to-emerald-600 rounded-full"></div>
                    <h1 className="text-3xl font-bold text-white">General Dashboard</h1>
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
                      {/* Live indicator with pulsing dot */}
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-500/10 border border-green-500/20 rounded-md">
                        <div className="relative flex items-center justify-center w-2 h-2">
                          <div className="absolute w-2 h-2 bg-green-500 rounded-full animate-ping opacity-75"></div>
                          <div className="relative w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-xs font-semibold text-green-500">Live</span>
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
               <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-3">
                   <div className="w-1 h-8 bg-gradient-to-b from-[#10b981] to-emerald-600 rounded-full"></div>
                   <h2 className="text-2xl font-bold text-white">Network Management</h2>
                 </div>
                 <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-900/50 border border-gray-800 rounded-lg">
                   <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                   <span className="text-xs font-medium text-gray-400">Real-time data</span>
                 </div>
               </div>
               
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {platformsData.map((platform) => (
                 <div
                   key={platform.id}
                     className="relative bg-[#0f1419] border border-white/[0.06] rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.4)] hover:bg-[#161b22] hover:border-white/10 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.6)] transition-all duration-300"
                   >
                     {/* Header with Logo */}
                     <div className="relative flex items-center justify-center h-20 mb-4">
                       {/* Logo centralizada */}
                       <img 
                         src={platform.logo} 
                         alt={`${platform.name} Logo`} 
                         className="max-h-14 max-w-[80%] object-contain drop-shadow-lg filter brightness-110"
                       />
                       {/* Live badge no canto superior direito */}
                       <div className="absolute top-0 right-0 bg-[#10b981]/10 border border-[#10b981]/20 text-[#10b981] text-[10px] font-semibold px-2.5 py-1 rounded-xl uppercase tracking-wide">
                         Live
                       </div>
                     </div>

                     {/* Total Players */}
                     <div className="text-center my-6">
                       <div className="text-[56px] font-bold text-white leading-none">
                         {platform.totalPlayers}
                       </div>
                       <div className="text-[11px] text-gray-500 uppercase tracking-widest mt-2">Total Players</div>
                     </div>

                     {/* Player Breakdown */}
                     <div className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-4 mb-5">
                       {/* Standard Players */}
                       <div className="flex items-center mb-3">
                         <div className="flex items-center gap-3 min-w-[140px]">
                           <span className="text-[13px] text-gray-400">Standard</span>
                           <span className="text-lg font-semibold text-white">{platform.standardPlayers}</span>
                         </div>
                         <div className="flex-1 h-1.5 bg-white/[0.05] rounded-full overflow-hidden ml-4">
                           <div 
                             className="h-full bg-[#10b981] rounded-full transition-all duration-500"
                             style={{ 
                               width: `${(platform.standardPlayers / platform.totalPlayers) * 100}%`,
                               boxShadow: '0 0 6px rgba(16, 185, 129, 0.2)'
                             }}
                           ></div>
                         </div>
                       </div>

                       {/* Exclusive Players */}
                       <div className="flex items-center">
                         <div className="flex items-center gap-3 min-w-[140px]">
                           <span className="text-[13px] text-gray-400">Exclusive</span>
                           <span className="text-lg font-semibold text-white">{platform.exclusivePlayers}</span>
                         </div>
                         <div className="flex-1 h-1.5 bg-white/[0.05] rounded-full overflow-hidden ml-4">
                           <div 
                             className="h-full bg-[#f97316] rounded-full transition-all duration-500"
                             style={{ 
                               width: `${(platform.exclusivePlayers / platform.totalPlayers) * 100}%`,
                               boxShadow: '0 0 6px rgba(249, 115, 22, 0.2)'
                             }}
                           ></div>
                         </div>
                       </div>
                     </div>

                     {/* Financial Metrics */}
                     <div className="flex flex-col gap-3 mb-5">
                       {/* Monthly Rake */}
                       <div className="flex justify-between items-center">
                         <span className="text-[11px] text-gray-500 uppercase tracking-wide">Monthly Rake</span>
                         <span className="text-2xl font-semibold text-[#10b981]" style={{ textShadow: '0 0 10px rgba(16, 185, 129, 0.2)' }}>
                           {platform.monthlyRake}
                         </span>
                       </div>

                       {/* Commission */}
                       <div className="flex justify-between items-center">
                         <span className="text-[11px] text-gray-500 uppercase tracking-wide">Commission</span>
                         <span className="text-xl font-semibold text-[#f97316]" style={{ textShadow: '0 0 10px rgba(249, 115, 22, 0.2)' }}>
                           {platform.commissionDue}
                         </span>
                       </div>

                       {/* Avg/Player */}
                       <div className="flex justify-between items-center">
                         <span className="text-[11px] text-gray-500 uppercase tracking-wide">Avg/Player</span>
                         <span className="text-base font-semibold text-gray-400">
                           {platform.avgPerPlayer}
                         </span>
                       </div>
                     </div>

                     {/* Trend Footer */}
                     <div className="flex items-center gap-2 pt-4 border-t border-white/[0.05]">
                       {platform.trendPositive ? (
                         <TrendingUp className="w-4 h-4 text-[#10b981]" />
                       ) : (
                         <TrendingDown className="w-4 h-4 text-[#ef4444]" />
                       )}
                       <span className={`text-[13px] font-semibold ${platform.trendPositive ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
                         {platform.trend}
                       </span>
                       <span className="text-xs text-gray-500">vs last month</span>
                     </div>
                   </div>
                 ))}
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
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-8 bg-gradient-to-b from-[#10b981] to-emerald-600 rounded-full"></div>
                      <h1 className="text-3xl font-bold text-white">Player Management</h1>
                    </div>
                    <button className="px-4 py-2 bg-[#10b981] hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors duration-200">
                      + Add Player
                    </button>
                  </div>
                  <p className="text-base text-gray-400 ml-6">Manage poker players and track their performance</p>
                </div>

                {/* Player Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
                  <div className="bg-[#0f1419] border border-white/[0.06] rounded-xl p-5">
                    <div className="text-2xl font-bold text-white mb-1">1,303</div>
                    <div className="text-sm text-gray-400">Total Players</div>
                  </div>
                  <div className="bg-[#0f1419] border border-white/[0.06] rounded-xl p-5">
                    <div className="text-2xl font-bold text-[#10b981] mb-1">1,096</div>
                    <div className="text-sm text-gray-400">Active Players</div>
                  </div>
                  <div className="bg-[#0f1419] border border-white/[0.06] rounded-xl p-5">
                    <div className="text-2xl font-bold text-blue-500 mb-1">37</div>
                    <div className="text-sm text-gray-400">New This Month</div>
                  </div>
                  <div className="bg-[#0f1419] border border-white/[0.06] rounded-xl p-5">
                    <div className="text-2xl font-bold text-orange-500 mb-1">$248,790</div>
                    <div className="text-sm text-gray-400">Total Rake</div>
                  </div>
                </div>

                {/* Filters & Search */}
                <div className="bg-[#0f1419] border border-white/[0.06] rounded-xl p-5 mb-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <input 
                        type="text" 
                        placeholder="Search players..." 
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#10b981] transition-colors"
                      />
                    </div>
                    <select className="bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#10b981] transition-colors">
                      <option>All Networks</option>
                      <option>GGPoker</option>
                      <option>PartyPoker</option>
                      <option>888poker</option>
                      <option>WPT Global</option>
                      <option>Unibet</option>
                    </select>
                    <select className="bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#10b981] transition-colors">
                      <option>All Status</option>
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                </div>

                {/* Players Table */}
                <div className="bg-[#0f1419] border border-white/[0.06] rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-white/[0.02] border-b border-white/[0.06]">
                        <tr>
                          <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Player</th>
                          <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Email</th>
                          <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Network</th>
                          <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Player ID</th>
                          <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Rake</th>
                          <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Joined</th>
                          <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                          <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.06]">
                        {[
                          { id: 1, name: 'John Mitchell', email: 'john.mitchell@email.com', network: 'GGPoker', playerId: 'GG-482931', rake: '$4,250', joined: 'Jan 15, 2025', status: 'Active' },
                          { id: 2, name: 'Sarah Chen', email: 'sarah.chen@email.com', network: 'PartyPoker', playerId: 'PP-729401', rake: '$3,890', joined: 'Jan 10, 2025', status: 'Active' },
                          { id: 3, name: 'Emily Watson', email: 'emily.w@email.com', network: '888poker', playerId: '888-582047', rake: '$2,150', joined: 'Jan 8, 2025', status: 'Active' },
                          { id: 4, name: 'David Kim', email: 'david.kim@email.com', network: 'WPT Global', playerId: 'WPT-391827', rake: '$5,320', joined: 'Dec 28, 2024', status: 'Active' },
                          { id: 5, name: 'Lisa Anderson', email: 'lisa.anderson@email.com', network: 'Unibet', playerId: 'UNI-648293', rake: '$1,890', joined: 'Dec 15, 2024', status: 'Inactive' },
                          { id: 6, name: 'Maria Garcia', email: 'maria.g@email.com', network: 'Betfair', playerId: 'BF-729401', rake: '$3,240', joined: 'Dec 5, 2024', status: 'Active' },
                          { id: 7, name: 'Robert Taylor', email: 'r.taylor@email.com', network: 'GGPoker', playerId: 'GG-129485', rake: '$6,780', joined: 'Nov 20, 2024', status: 'Active' },
                          { id: 8, name: 'Jessica Brown', email: 'jessica.b@email.com', network: 'PartyPoker', playerId: 'PP-384756', rake: '$2,950', joined: 'Nov 12, 2024', status: 'Active' },
                        ].map((player) => (
                          <tr key={player.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                                  {player.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <span className="text-sm font-medium text-white">{player.name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-400">{player.email}</td>
                            <td className="px-6 py-4 text-sm text-gray-300">{player.network}</td>
                            <td className="px-6 py-4 text-sm font-mono text-gray-400">{player.playerId}</td>
                            <td className="px-6 py-4 text-sm font-semibold text-[#10b981]">{player.rake}</td>
                            <td className="px-6 py-4 text-sm text-gray-400">{player.joined}</td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                                player.status === 'Active' 
                                  ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                                  : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                              }`}>
                                {player.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <button className="px-3 py-1.5 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-gray-300 text-xs rounded-lg transition-colors">
                                  View
                                </button>
                                <button className="px-3 py-1.5 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-gray-300 text-xs rounded-lg transition-colors">
                                  Edit
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Pagination */}
                  <div className="px-6 py-4 border-t border-white/[0.06] flex items-center justify-between">
                    <div className="text-sm text-gray-400">
                      Showing 1 to 8 of 1,303 players
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1.5 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-gray-300 text-sm rounded-lg transition-colors">
                        Previous
                      </button>
                      <button className="px-3 py-1.5 bg-[#10b981] text-white text-sm rounded-lg font-semibold">
                        1
                      </button>
                      <button className="px-3 py-1.5 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-gray-300 text-sm rounded-lg transition-colors">
                        2
                      </button>
                      <button className="px-3 py-1.5 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-gray-300 text-sm rounded-lg transition-colors">
                        3
                      </button>
                      <button className="px-3 py-1.5 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-gray-300 text-sm rounded-lg transition-colors">
                        Next
                      </button>
                    </div>
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
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
                  <div className="bg-[#0f1419] border border-white/[0.06] rounded-xl p-5">
                    <div className="text-2xl font-bold text-white mb-1">12</div>
                    <div className="text-sm text-gray-400">Active Sub-Affiliates</div>
                  </div>
                  <div className="bg-[#0f1419] border border-white/[0.06] rounded-xl p-5">
                    <div className="text-2xl font-bold text-blue-500 mb-1">247</div>
                    <div className="text-sm text-gray-400">Total Players Referred</div>
                  </div>
                  <div className="bg-[#0f1419] border border-white/[0.06] rounded-xl p-5">
                    <div className="text-2xl font-bold text-[#10b981] mb-1">$42,850</div>
                    <div className="text-sm text-gray-400">Total Rake Generated</div>
                  </div>
                  <div className="bg-[#0f1419] border border-white/[0.06] rounded-xl p-5">
                    <div className="text-2xl font-bold text-orange-500 mb-1">$8,570</div>
                    <div className="text-sm text-gray-400">Commission Paid</div>
                  </div>
                </div>

                {/* Filters & Search */}
                <div className="bg-[#0f1419] border border-white/[0.06] rounded-xl p-5 mb-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <input 
                        type="text" 
                        placeholder="Search sub-affiliates..." 
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#10b981] transition-colors"
                      />
                    </div>
                    <select className="bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#10b981] transition-colors">
                      <option>All Tiers</option>
                      <option>Bronze (0-50 players)</option>
                      <option>Silver (51-100 players)</option>
                      <option>Gold (101+ players)</option>
                    </select>
                    <select className="bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#10b981] transition-colors">
                      <option>All Status</option>
                      <option>Active</option>
                      <option>Pending</option>
                      <option>Suspended</option>
                    </select>
                  </div>
                </div>

                {/* Sub-Affiliates Table */}
                <div className="bg-[#0f1419] border border-white/[0.06] rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-white/[0.02] border-b border-white/[0.06]">
                        <tr>
                          <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Sub-Affiliate</th>
                          <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Email</th>
                          <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Players</th>
                          <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Rake</th>
                          <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Commission</th>
                          <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Tier</th>
                          <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                          <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.06]">
                        {[
                          { id: 1, name: 'Michael Rodriguez', email: 'm.rodriguez@email.com', players: 64, rake: '$12,450', commission: '$2,490', tier: 'Silver', status: 'Active' },
                          { id: 2, name: 'James Wilson', email: 'j.wilson@email.com', players: 52, rake: '$8,750', commission: '$1,750', tier: 'Silver', status: 'Active' },
                          { id: 3, name: 'Alexandra Turner', email: 'alex.turner@email.com', players: 28, rake: '$4,230', commission: '$846', tier: 'Bronze', status: 'Active' },
                          { id: 4, name: 'Thomas Martinez', email: 't.martinez@email.com', players: 45, rake: '$6,890', commission: '$1,378', tier: 'Bronze', status: 'Active' },
                          { id: 5, name: 'Sophie Anderson', email: 'sophie.a@email.com', players: 18, rake: '$2,450', commission: '$490', tier: 'Bronze', status: 'Active' },
                          { id: 6, name: 'Daniel Cooper', email: 'd.cooper@email.com', players: 31, rake: '$5,120', commission: '$1,024', tier: 'Bronze', status: 'Active' },
                          { id: 7, name: 'Emma Williams', email: 'emma.w@email.com', players: 9, rake: '$1,960', commission: '$392', tier: 'Bronze', status: 'Pending' },
                        ].map((affiliate) => (
                          <tr key={affiliate.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                                  {affiliate.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <span className="text-sm font-medium text-white">{affiliate.name}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-400">{affiliate.email}</td>
                            <td className="px-6 py-4 text-sm font-semibold text-blue-400">{affiliate.players}</td>
                            <td className="px-6 py-4 text-sm font-semibold text-[#10b981]">{affiliate.rake}</td>
                            <td className="px-6 py-4 text-sm font-semibold text-orange-400">{affiliate.commission}</td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                                affiliate.tier === 'Gold' 
                                  ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' 
                                  : affiliate.tier === 'Silver'
                                  ? 'bg-gray-400/10 text-gray-300 border border-gray-400/20'
                                  : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                              }`}>
                                {affiliate.tier}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                                affiliate.status === 'Active' 
                                  ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                                  : affiliate.status === 'Pending'
                                  ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                                  : 'bg-red-500/10 text-red-400 border border-red-500/20'
                              }`}>
                                {affiliate.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <button className="px-3 py-1.5 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-gray-300 text-xs rounded-lg transition-colors">
                                  View
                                </button>
                                <button className="px-3 py-1.5 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-gray-300 text-xs rounded-lg transition-colors">
                                  Edit
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Pagination */}
                  <div className="px-6 py-4 border-t border-white/[0.06] flex items-center justify-between">
                    <div className="text-sm text-gray-400">
                      Showing 1 to 7 of 12 sub-affiliates
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1.5 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-gray-300 text-sm rounded-lg transition-colors">
                        Previous
                      </button>
                      <button className="px-3 py-1.5 bg-[#10b981] text-white text-sm rounded-lg font-semibold">
                        1
                      </button>
                      <button className="px-3 py-1.5 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-gray-300 text-sm rounded-lg transition-colors">
                        2
                      </button>
                      <button className="px-3 py-1.5 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-gray-300 text-sm rounded-lg transition-colors">
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
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                          <span className="text-xs text-gray-500">Live</span>
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
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                          <span className="text-xs text-gray-500">Live</span>
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
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                          <span className="text-xs text-gray-500">Live</span>
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
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                          <span className="text-xs text-gray-500">Live</span>
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
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                          <span className="text-xs text-gray-500">Live</span>
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
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                          <span className="text-xs text-gray-500">Live</span>
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        <div className="bg-[#0f1419] border border-white/[0.06] rounded-xl p-5">
          <div className="text-2xl font-bold text-yellow-500 mb-1">{pendingCount}</div>
          <div className="text-sm text-gray-400">Pending</div>
        </div>
        <div className="bg-[#0f1419] border border-white/[0.06] rounded-xl p-5">
          <div className="text-2xl font-bold text-[#10b981] mb-1">{approvedCount}</div>
          <div className="text-sm text-gray-400">Approved</div>
        </div>
        <div className="bg-[#0f1419] border border-white/[0.06] rounded-xl p-5">
          <div className="text-2xl font-bold text-red-500 mb-1">{rejectedCount}</div>
          <div className="text-sm text-gray-400">Rejected</div>
        </div>
        <div className="bg-[#0f1419] border border-white/[0.06] rounded-xl p-5">
          <div className="text-2xl font-bold text-blue-500 mb-1">{deals.length}</div>
          <div className="text-sm text-gray-400">Total</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'all'
              ? 'bg-[#10b981] text-white'
              : 'bg-[#0f1419] text-gray-400 hover:bg-gray-800 border border-white/[0.06]'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'pending'
              ? 'bg-[#10b981] text-white'
              : 'bg-[#0f1419] text-gray-400 hover:bg-gray-800 border border-white/[0.06]'
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter('approved')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'approved'
              ? 'bg-[#10b981] text-white'
              : 'bg-[#0f1419] text-gray-400 hover:bg-gray-800 border border-white/[0.06]'
          }`}
        >
          Approved
        </button>
        <button
          onClick={() => setFilter('rejected')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'rejected'
              ? 'bg-[#10b981] text-white'
              : 'bg-[#0f1419] text-gray-400 hover:bg-gray-800 border border-white/[0.06]'
          }`}
        >
          Rejected
        </button>
      </div>

      {/* Deals Table */}
      <div className="bg-[#0f1419] border border-white/[0.06] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#0a0e13] border-b border-white/[0.06]">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Deal</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Player</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Platform Info</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Requested</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Notes</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.06]">
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
                <tr key={deal.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={deal.deal_logo} alt={deal.deal_name} className="w-10 h-10 rounded-lg object-contain bg-white/5 p-1" />
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
                  <td className="px-6 py-4">
                    <p className="text-white text-sm">
                      {new Date(deal.requested_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      deal.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
                      deal.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500' :
                      deal.status === 'rejected' ? 'bg-red-500/10 text-red-500' :
                      'bg-blue-500/10 text-blue-500'
                    }`}>
                      {deal.status.charAt(0).toUpperCase() + deal.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {(deal.rejection_reason || deal.admin_notes) ? (
                      <button
                        onClick={() => setViewingNotes(deal)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-[#0f1419] hover:bg-gray-800 text-gray-300 hover:text-white text-sm font-medium rounded-lg transition-colors border border-white/[0.06]"
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
                      <span className="text-sm text-gray-600">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {deal.status === 'pending' && (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleApprove(deal.id)}
                          className="px-3 py-1.5 bg-[#10b981] hover:bg-emerald-600 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => setRejectingDeal(deal)}
                          className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    )}
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

