'use client'

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { 
  ArrowLeft, 
  Save, 
  Eye,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { 
  getContactLinks, 
  updateContactLink,
  type ContactLink 
} from '@/lib/supabase/contact';

// Platform icons mapping
const platformIcons = {
  whatsapp: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  ),
  discord: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
  ),
  telegram: (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  )
};

const platformColors = {
  whatsapp: {
    gradient: 'from-green-500 to-green-600',
    bg: 'bg-green-500/20',
    border: 'border-green-500/30',
    text: 'text-green-400'
  },
  discord: {
    gradient: 'from-indigo-500 to-indigo-600',
    bg: 'bg-indigo-500/20',
    border: 'border-indigo-500/30',
    text: 'text-indigo-400'
  },
  telegram: {
    gradient: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-500/20',
    border: 'border-blue-500/30',
    text: 'text-blue-400'
  }
};

export default function ContactManagementPage() {
  // Loading & Save States
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSaving, setIsSaving] = useState<Record<string, boolean>>({});
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccessState, setSaveSuccessState] = useState<Record<string, boolean>>({});
  
  // Contact Data
  const [contactLinks, setContactLinks] = useState<ContactLink[]>([]);
  const [urls, setUrls] = useState<Record<string, string>>({});

  // Load Contact Links
  useEffect(() => {
    loadContactLinks();
  }, []);

  async function loadContactLinks() {
    setIsLoadingData(true);
    
    try {
      console.log('📥 Loading contact links from Supabase...');
      const { data, error } = await getContactLinks();
      
      if (error) {
        console.error('❌ Error loading contact links:', error);
        setSaveError('Failed to load contact links');
        return;
      }

      if (data) {
        setContactLinks(data);
        
        // Initialize URLs
        const initialUrls: Record<string, string> = {};
        data.forEach((link) => {
          initialUrls[link.id] = link.url;
        });
        setUrls(initialUrls);
        
        console.log('✅ Loaded', data.length, 'contact links');
      }
    } catch (error) {
      console.error('❌ Failed to load contact links:', error);
      setSaveError('Failed to load contact links');
    } finally {
      setIsLoadingData(false);
    }
  }

  // Handle URL Change
  function handleUrlChange(linkId: string, newUrl: string) {
    setUrls((prev) => ({
      ...prev,
      [linkId]: newUrl,
    }));
  }

  // Save Link
  async function saveLink(linkId: string) {
    const link = contactLinks.find((l) => l.id === linkId);
    if (!link) return;

    const newUrl = urls[linkId];

    // Validate
    if (!newUrl || !newUrl.trim()) {
      setSaveError('URL cannot be empty');
      setTimeout(() => setSaveError(null), 5000);
      return;
    }

    setIsSaving((prev) => ({ ...prev, [linkId]: true }));
    setSaveError(null);
    setSaveSuccessState((prev) => ({ ...prev, [linkId]: false }));

    try {
      console.log('💾 Saving link for', link.platform);
      const { data: updatedLink, error } = await updateContactLink(linkId, newUrl);

      if (error || !updatedLink) {
        throw new Error('Failed to save link');
      }

      // Update local state
      setContactLinks((prev) =>
        prev.map((l) => (l.id === linkId ? updatedLink : l))
      );

      // Show success
      setSaveSuccess(`${link.label} link saved successfully!`);
      setSaveSuccessState((prev) => ({ ...prev, [linkId]: true }));

      setTimeout(() => {
        setSaveSuccess(null);
        setSaveSuccessState((prev) => ({ ...prev, [linkId]: false }));
      }, 2000);

      console.log('✅ Link saved successfully');
    } catch (error) {
      console.error('❌ Save error:', error);
      setSaveError(error instanceof Error ? error.message : 'Failed to save link');
      setTimeout(() => setSaveError(null), 5000);
    } finally {
      setIsSaving((prev) => ({ ...prev, [linkId]: false }));
    }
  }

  return (
    <ProtectedRoute allowedUserType="admin">
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <header className="bg-gradient-to-r from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a] border-b border-gray-800/50 sticky top-0 z-50 backdrop-blur-xl">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center gap-4">
                <Link 
                  href="/admin/dashboard"
                  className="p-2.5 rounded-lg hover:bg-white/[0.05] border border-transparent hover:border-gray-800 transition-all duration-300 group"
                >
                  <ArrowLeft size={20} className="text-gray-400 group-hover:text-white" />
                </Link>
                
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src="/images/logo.png"
                      alt="Universal Poker"
                      className="h-8 w-auto object-contain"
                    />
                  </div>
                  <div className="hidden sm:block w-px h-8 bg-gradient-to-b from-transparent via-gray-700 to-transparent"></div>
                  <div className="hidden sm:flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Contact Links Editor</span>
                    <span className="text-xs text-gray-600 font-medium">Website Content Management</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Preview Button */}
                <a 
                  href="/contact-us"
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2.5 bg-gray-900/50 hover:bg-gray-800/50 border border-gray-800 hover:border-gray-700 rounded-lg transition-all duration-300 text-gray-300 hover:text-white group"
                >
                  <Eye size={16} />
                  <span className="hidden sm:inline text-sm font-medium">Preview Contact Page</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent"></div>
        </header>

        {/* Main Content */}
        <main className="max-w-5xl mx-auto p-6 lg:p-8">
          
          {/* Success/Error Messages */}
          {saveSuccess && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-green-400 text-sm font-medium">{saveSuccess}</span>
            </div>
          )}
          
          {saveError && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3">
              <AlertCircle size={16} className="text-red-400" />
              <span className="text-red-400 text-sm font-medium">{saveError}</span>
            </div>
          )}

          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1 h-8 bg-gradient-to-b from-[#10b981] to-emerald-600 rounded-full"></div>
              <h1 className="text-3xl font-bold text-white">Contact Links Management</h1>
            </div>
            <p className="text-base text-gray-400 ml-6">Edit social media and contact platform links displayed on the contact page.</p>
          </div>

          {/* Loading State */}
          {isLoadingData ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-[#10b981] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-gray-400">Loading contact links...</p>
              </div>
            </div>
          ) : (
            /* Contact Links Cards */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contactLinks.map((link) => {
                const Icon = platformIcons[link.platform];
                const colors = platformColors[link.platform];
                
                return (
                  <div key={link.id} className="bg-[#0f1419] border border-white/[0.06] rounded-xl overflow-hidden">
                    <div className="p-6">
                      {/* Platform Header */}
                      <div className="flex items-center gap-3 mb-5">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-lg`}>
                          <div className="text-white">
                            {Icon}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{link.label}</h3>
                          <p className="text-xs text-gray-500 capitalize">{link.platform}</p>
                        </div>
                      </div>

                      {/* URL Input */}
                      <div className="mb-5">
                        <label htmlFor={`url-${link.id}`} className="block text-sm font-semibold text-gray-300 mb-2">
                          Platform URL
                        </label>
                        <input
                          id={`url-${link.id}`}
                          type="text"
                          value={urls[link.id] || ''}
                          onChange={(e) => handleUrlChange(link.id, e.target.value)}
                          placeholder={`https://...`}
                          className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white text-sm placeholder-white/40 focus:outline-none focus:border-[#10b981] focus:ring-2 focus:ring-[#10b981]/20 transition-all"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Full URL including https://
                        </p>
                      </div>

                      {/* Save Button */}
                      <button
                        onClick={() => saveLink(link.id)}
                        disabled={isSaving[link.id] || !urls[link.id]?.trim()}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#10b981] hover:bg-emerald-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all"
                      >
                        {isSaving[link.id] ? (
                          <>
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                            </svg>
                            Saving...
                          </>
                        ) : saveSuccessState[link.id] ? (
                          <>
                            <svg 
                              className="w-4 h-4 animate-bounce" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                            Saved!
                          </>
                        ) : (
                          <>
                            <Save size={16} />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}

