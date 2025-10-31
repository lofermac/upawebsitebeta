"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/contexts/AuthContext";
import { LogOut, User } from "lucide-react";
import { getHeaderNavigation, HeaderNavigation } from "@/lib/supabase/header";

export default function HeaderWithAuth() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isLoggedIn, loading, userType, logout } = useAuth();
  const [navButtons, setNavButtons] = useState<HeaderNavigation[]>([]);
  const [isLoadingNav, setIsLoadingNav] = useState(true);

  // Get username based on userType
  const getUsername = () => {
    if (userType === 'admin') return 'Admin';
    if (userType === 'player') return 'Player';
    return '';
  };

  // Load navigation buttons
  useEffect(() => {
    async function loadNavigation() {
      try {
        const { data, error } = await getHeaderNavigation();
        
        if (!error && data) {
          setNavButtons(data);
        } else {
          // Fallback to default navigation if error
          console.warn('Failed to load navigation, using defaults');
          setNavButtons([
            { id: '1', button_text: 'Deals', button_url: '/deals', display_order: 1, is_active: true, created_at: '', updated_at: '' },
            { id: '2', button_text: 'News', button_url: '/news', display_order: 2, is_active: true, created_at: '', updated_at: '' },
            { id: '3', button_text: 'Team', button_url: '/team', display_order: 3, is_active: true, created_at: '', updated_at: '' },
            { id: '4', button_text: 'Contact Us', button_url: '/contact-us', display_order: 4, is_active: true, created_at: '', updated_at: '' }
          ]);
        }
      } catch (err) {
        console.error('Error loading navigation:', err);
        // Use fallback
        setNavButtons([
          { id: '1', button_text: 'Deals', button_url: '/deals', display_order: 1, is_active: true, created_at: '', updated_at: '' },
          { id: '2', button_text: 'News', button_url: '/news', display_order: 2, is_active: true, created_at: '', updated_at: '' },
          { id: '3', button_text: 'Team', button_url: '/team', display_order: 3, is_active: true, created_at: '', updated_at: '' },
          { id: '4', button_text: 'Contact Us', button_url: '/contact-us', display_order: 4, is_active: true, created_at: '', updated_at: '' }
        ]);
      } finally {
        setIsLoadingNav(false);
      }
    }

    loadNavigation();
  }, []);

  return (
    <header className="flex justify-center transition-all duration-500">
      <div 
        className={`max-w-7xl w-full flex items-center justify-between px-4 md:px-8 py-4 md:py-4 rounded-full backdrop-blur-xl bg-gradient-to-r from-black/90 via-black/85 to-black/90 border border-white/10 shadow-2xl shadow-black/50 transition-all duration-500 relative overflow-hidden group`}
      >
        {/* Animated gradient border effect */}
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#077124]/20 via-emerald-400/20 to-[#077124]/20 blur-xl animate-pulse-slow"></div>
        </div>
        
        {/* Shine effect on hover */}
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
          <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"></div>
        </div>
        
        {/* Logo */}
        <Link href="/" className="flex items-center relative z-10 group/logo">
          <div className="relative">
            <Image
              src="/images/logo.png"
              alt="Universal Poker Logo"
              width={150}
              height={40}
              className="h-9 md:h-10 w-auto object-contain transition-all duration-500 group-hover/logo:brightness-110 group-hover/logo:scale-[1.02]"
              priority
            />
            {/* Subtle glow effect on logo */}
            <div className="absolute inset-0 blur-lg opacity-0 group-hover/logo:opacity-30 transition-opacity duration-500 bg-white/20 rounded-full"></div>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-1 lg:gap-2 text-sm font-medium items-center flex-1 justify-center relative z-10">
          {isLoadingNav ? (
            // Loading skeleton
            <>
              <div className="h-9 w-20 bg-white/5 rounded-full animate-pulse"></div>
              <div className="h-9 w-20 bg-white/5 rounded-full animate-pulse"></div>
              <div className="h-9 w-20 bg-white/5 rounded-full animate-pulse"></div>
              <div className="h-9 w-20 bg-white/5 rounded-full animate-pulse"></div>
            </>
          ) : (
            navButtons.map((button) => (
              <Link 
                key={button.id}
                href={button.button_url} 
                className="relative px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 group/nav rounded-full"
              >
                <span className="relative z-10">{button.button_text}</span>
                <div className="absolute inset-0 rounded-full bg-white/5 scale-0 group-hover/nav:scale-100 transition-transform duration-300"></div>
              </Link>
            ))
          )}
        </nav>
        
        {/* Auth Section - Conditional rendering based on auth state */}
        <div className="hidden md:flex items-center gap-3 relative z-10">
          {loading ? (
            // Loading skeleton
            <>
              <div className="h-9 w-20 bg-white/5 rounded-full animate-pulse"></div>
              <div className="h-9 w-24 bg-white/5 rounded-full animate-pulse"></div>
            </>
          ) : isLoggedIn && userType === 'player' ? (
            // Player logged in view
            <>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                <User size={18} className="text-[#10b981]" />
                <span className="text-gray-300 text-sm">Hello,</span>
                <span className="text-[#10b981] font-semibold text-sm">{getUsername()}</span>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-full transition-all duration-300 text-red-400 hover:text-red-300 text-sm font-medium"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            // Not logged in or admin (show normal buttons)
            <>
              <Link 
                href="/login" 
                className="relative px-5 py-2 text-gray-300 font-medium hover:text-white transition-all duration-300 text-sm group/login rounded-full overflow-hidden"
              >
                <span className="relative z-10">Login</span>
                <div className="absolute inset-0 bg-white/5 scale-0 group-hover/login:scale-100 transition-transform duration-300 rounded-full"></div>
              </Link>
              <Link
                href="/register"
                className="relative font-semibold text-sm px-6 py-2.5 rounded-full bg-[#077124] text-white shadow-lg shadow-[#077124]/20 hover:shadow-2xl hover:shadow-[#077124]/40 hover:scale-[1.03] transition-all duration-300 group/register overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Register
                  <svg className="w-0 group-hover/register:w-4 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                {/* Animated shine effect */}
                <div className="absolute inset-0 translate-x-[-100%] group-hover/register:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                {/* Subtle inner glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover/register:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden relative flex items-center justify-center p-2.5 ml-2 text-gray-300 hover:text-white transition-all duration-300 rounded-full group/menu z-10"
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
        >
          <div className="absolute inset-0 rounded-full bg-white/5 scale-0 group-hover/menu:scale-100 transition-transform duration-300"></div>
          <svg className="relative z-10" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16"/>
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileOpen && (
        <>
          {/* Backdrop with blur */}
          <div 
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setMobileOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="fixed inset-y-0 right-0 z-[70] w-80 max-w-[85vw] animate-slide-in-right">
            <div className="h-full bg-gradient-to-b from-black/98 via-black/95 to-black/98 backdrop-blur-2xl border-l border-white/10 flex flex-col shadow-2xl shadow-black/80 relative overflow-hidden">
              {/* Ambient glow effect */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#077124]/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
              
              {/* Close button */}
              <button
                className="absolute top-6 right-6 z-10 p-2.5 text-gray-400 hover:text-white transition-all duration-300 rounded-full group/close"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                <div className="absolute inset-0 rounded-full bg-white/5 scale-0 group-hover/close:scale-100 transition-transform duration-300"></div>
                <svg className="relative z-10" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M6 18L18 6"/>
                </svg>
              </button>
              
              {/* Navigation */}
              <nav className="flex flex-col gap-3 mt-20 px-8 relative z-10">
                {isLoadingNav ? (
                  // Loading skeleton for mobile nav
                  <>
                    <div className="h-14 bg-white/5 rounded-xl animate-pulse"></div>
                    <div className="h-14 bg-white/5 rounded-xl animate-pulse"></div>
                    <div className="h-14 bg-white/5 rounded-xl animate-pulse"></div>
                    <div className="h-14 bg-white/5 rounded-xl animate-pulse"></div>
                  </>
                ) : (
                  navButtons.map((button) => (
                    <Link 
                      key={button.id}
                      href={button.button_url} 
                      className="relative px-4 py-3.5 text-gray-300 hover:text-white transition-all duration-300 rounded-xl font-medium group/mobile overflow-hidden"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="relative z-10">{button.button_text}</span>
                      <div className="absolute inset-0 bg-white/5 translate-x-[-100%] group-hover/mobile:translate-x-0 transition-transform duration-300"></div>
                    </Link>
                  ))
                )}
                
                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-4"></div>
                
                {/* Mobile Auth Section */}
                {loading ? (
                  // Loading skeleton for mobile
                  <>
                    <div className="h-14 bg-white/5 rounded-xl animate-pulse"></div>
                    <div className="h-14 bg-white/5 rounded-xl animate-pulse"></div>
                  </>
                ) : isLoggedIn && userType === 'player' ? (
                  <>
                    <div className="px-4 py-3.5 bg-white/5 rounded-xl border border-white/10">
                      <div className="flex items-center gap-2">
                        <User size={18} className="text-[#10b981]" />
                        <span className="text-gray-300 text-sm">Hello,</span>
                        <span className="text-[#10b981] font-semibold text-sm">{getUsername()}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setMobileOpen(false);
                      }}
                      className="flex items-center justify-center gap-2 px-4 py-3.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-xl transition-all duration-300 text-red-400 hover:text-red-300 text-sm font-medium"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      href="/login" 
                      className="relative px-4 py-3.5 text-gray-300 hover:text-white transition-all duration-300 rounded-xl font-medium group/mobile overflow-hidden"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="relative z-10">Login</span>
                      <div className="absolute inset-0 bg-white/5 translate-x-[-100%] group-hover/mobile:translate-x-0 transition-transform duration-300"></div>
                    </Link>
                    <Link
                      href="/register"
                      className="relative font-semibold text-sm px-6 py-3.5 rounded-xl bg-[#077124] text-white shadow-lg shadow-[#077124]/30 hover:shadow-xl hover:shadow-[#077124]/40 hover:scale-[1.02] transition-all duration-300 text-center group/register-mobile overflow-hidden mt-2"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Register
                        <svg className="w-0 group-hover/register-mobile:w-4 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                      <div className="absolute inset-0 translate-x-[-100%] group-hover/register-mobile:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    </Link>
                  </>
                )}
              </nav>
            </div>
          </div>
        </>
      )}
      
      <style jsx global>{`
        @keyframes slide-in-right {
          from { 
            transform: translateX(100%);
            opacity: 0;
          }
          to { 
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </header>
  );
}

