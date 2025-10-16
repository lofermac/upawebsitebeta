'use client'

import { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/lib/auth-context';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  FileText, 
  LogOut,
  Menu,
  X,
  UserPlus,
  DollarSign,
  ClipboardList,
  Building2
} from 'lucide-react';

// Mock platforms data
const platformsData = [
  {
    id: 1,
    name: 'WPT Global',
    standardPlayers: 124,
    exclusivePlayers: 18,
    monthlyRake: 24500,
    code: 'WPT'
  },
  {
    id: 2,
    name: 'GGPoker',
    standardPlayers: 312,
    exclusivePlayers: 42,
    monthlyRake: 51200,
    code: 'GG'
  },
  {
    id: 3,
    name: 'Unibet',
    standardPlayers: 87,
    exclusivePlayers: 9,
    monthlyRake: 9800,
    code: 'UNI'
  },
  {
    id: 4,
    name: 'Champion Poker',
    standardPlayers: 56,
    exclusivePlayers: 7,
    monthlyRake: 4100,
    code: 'CHP'
  },
  {
    id: 5,
    name: '888poker',
    standardPlayers: 203,
    exclusivePlayers: 25,
    monthlyRake: 18700,
    code: '888'
  },
  {
    id: 6,
    name: 'PartyPoker',
    standardPlayers: 178,
    exclusivePlayers: 21,
    monthlyRake: 15300,
    code: 'PP'
  },
  {
    id: 7,
    name: 'Optibet',
    standardPlayers: 44,
    exclusivePlayers: 5,
    monthlyRake: 3200,
    code: 'OPT'
  },
  {
    id: 8,
    name: 'Betfair',
    standardPlayers: 92,
    exclusivePlayers: 11,
    monthlyRake: 7200,
    code: 'BF'
  },
  {
    id: 9,
    name: 'WSOP.ca',
    standardPlayers: 61,
    exclusivePlayers: 8,
    monthlyRake: 5400,
    code: 'WSOP'
  },
];

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'reports', label: 'Reports', icon: FileText },
  ];

  // Calculate totals from platforms data
  const totalActivePlayers = platformsData.reduce((sum, p) => sum + p.standardPlayers + p.exclusivePlayers, 0);
  const totalNewPlayers = 37; // Mock value for new registrations this month
  const totalPaymentsDue = platformsData.reduce((sum, p) => sum + (p.monthlyRake * 0.35), 0); // Assuming 35% average rakeback
  const pendingTasks = 8; // Mock value

  const stats = [
    { 
      label: 'Active Players',
      subtitle: 'Active players across all networks',
      value: totalActivePlayers.toLocaleString(), 
      icon: Users,
      color: 'from-green-500 to-green-600',
      iconBg: 'bg-gradient-to-br from-green-500 to-green-600',
      textColor: 'text-green-500'
    },
    { 
      label: 'New Players',
      subtitle: 'New registrations this month', 
      value: totalNewPlayers.toString(), 
      icon: UserPlus,
      color: 'from-blue-500 to-blue-600',
      iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600',
      textColor: 'text-blue-500'
    },
    { 
      label: 'Payments Due',
      subtitle: 'Pending rakeback payments',
      value: `$${Math.round(totalPaymentsDue).toLocaleString()}`, 
      icon: DollarSign,
      color: 'from-orange-500 to-orange-600',
      iconBg: 'bg-gradient-to-br from-orange-500 to-orange-600',
      textColor: 'text-orange-500'
    },
    { 
      label: 'Pending Tasks',
      subtitle: 'Open operational tasks', 
      value: pendingTasks.toString(), 
      icon: ClipboardList,
      color: 'from-purple-500 to-purple-600',
      iconBg: 'bg-gradient-to-br from-purple-500 to-purple-600',
      textColor: 'text-purple-500'
    },
  ];

  return (
    <ProtectedRoute allowedUserType="admin">
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <header className="bg-gradient-to-b from-[#0d0d0d] to-[#121212] border-b border-white/[0.06] sticky top-0 z-50">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2 rounded-lg hover:bg-white/[0.05] transition-colors"
                >
                  {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  Admin Panel - <span className="text-[#10b981]">Chris</span>
                </h1>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg transition-all duration-300 text-red-400 hover:text-red-300"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar */}
          <aside className={`
            fixed lg:static inset-y-0 left-0 z-40 w-64
            bg-gradient-to-b from-[#0d0d0d] to-[#121212] border-r border-white/[0.06]
            transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            mt-[73px] lg:mt-0
          `}>
            <nav className="p-4 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
                    ${activeTab === item.id 
                      ? 'bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30' 
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'
                    }
                  `}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6 lg:p-8">
            {/* Page Title */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">General Dashboard</h1>
              <p className="text-lg text-gray-400">Overview of Universal Poker affiliate network metrics and operations</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg ${stat.iconBg} flex items-center justify-center shadow-lg`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm font-medium text-gray-400 mb-1">{stat.label}</div>
                  <div className="text-xs text-gray-500">{stat.subtitle}</div>
                </div>
              ))}
            </div>

            {/* Network Management Section */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Network Management</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {platformsData.map((platform) => (
                  <div
                    key={platform.id}
                    className="bg-gray-900 border border-gray-800 rounded-xl p-8 hover:border-green-500/20 hover:shadow-lg hover:shadow-green-500/5 transition-all duration-300"
                  >
                    {/* Platform Header */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-5 h-5 text-gray-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-bold text-white truncate">{platform.name}</h3>
                        <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">{platform.code}</span>
                      </div>
                    </div>
                    
                    {/* Metrics */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Standard Players</span>
                        <span className="text-lg font-bold text-green-500">{platform.standardPlayers}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Exclusive Players</span>
                        <span className="text-lg font-bold text-orange-500">{platform.exclusivePlayers}</span>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                        <span className="text-sm text-gray-400">Monthly Rake</span>
                        <span className="text-xl font-bold text-green-500">${platform.monthlyRake.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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

