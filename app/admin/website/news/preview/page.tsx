'use client';

import { useEffect, useState } from 'react';
import DynamicNewsContent from '@/components/DynamicNewsContent';
import { Calendar, User, ArrowLeft } from 'lucide-react';

interface PreviewData {
  title: string;
  author: string;
  category: string;
  excerpt: string;
  featured_image: string;
  content: string;
  created_at: string;
}

export default function NewsPreviewPage() {
  const [article, setArticle] = useState<PreviewData | null>(null);

  useEffect(() => {
    // Get preview data from sessionStorage
    const previewData = sessionStorage.getItem('newsPreview');
    
    if (previewData) {
      try {
        const parsedData = JSON.parse(previewData);
        setArticle(parsedData);
      } catch (error) {
        console.error('Error parsing preview data:', error);
      }
    }
  }, []);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#1E1E1E] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-800 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading preview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1E1E1E] min-h-screen flex flex-col">
      {/* Preview Banner - Sticky */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-blue-900/95 via-blue-800/95 to-blue-900/95 border-b border-blue-700/50 backdrop-blur-md shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-bold text-blue-200 uppercase tracking-wider">Preview Mode</span>
              <span className="text-xs text-blue-300/70 hidden md:inline">This is how your article will look when published</span>
            </div>
            <button
              onClick={() => window.close()}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all text-sm font-medium text-white"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Close Preview</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Same structure as real page */}
      <main className="relative bg-[#1E1E1E] w-full pt-8 pb-24 flex-1">
        <div className="max-w-7xl mx-auto px-4">

          {/* Hero Section: Title + Sidebar + Image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
            
            {/* Left Column - Empty space to align with sidebar below */}
            <div className="lg:col-span-3 hidden lg:block"></div>

            {/* Right Column - Title and Subtitle aligned with image */}
            <div className="lg:col-span-9 mb-6 lg:mb-8">
              <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight" 
                  style={{ 
                    textShadow: '0 2px 16px rgba(0,0,0,0.4)',
                    letterSpacing: '-0.02em'
                  }}>
                {article.title}
              </h1>
              {/* Subtitle/Description */}
              {article.excerpt && (
                <p className="text-gray-400 text-lg md:text-xl mt-4 leading-relaxed">
                  {article.excerpt}
                </p>
              )}
            </div>
          </div>

          {/* Hero Section: Sidebar + Image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            
            {/* Left Sidebar - Info Cards */}
            <div className="lg:col-span-3 space-y-4">
              
              {/* Date Published Card */}
              <div className="relative rounded-2xl overflow-hidden group/card">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#121212] to-[#0d0d0d]"></div>
                <div className="relative border border-white/[0.08] rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#077124]/10 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-[#077124]" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Date Published</h3>
                  </div>
                  <p className="text-white text-base font-semibold">
                    {new Date(article.created_at).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              {/* Publisher Card */}
              {article.author && (
                <div className="relative rounded-2xl overflow-hidden group/card">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#121212] to-[#0d0d0d]"></div>
                  <div className="relative border border-white/[0.08] rounded-2xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="relative">
                        <div className="absolute inset-0 bg-[#077124]/20 rounded-xl blur-sm"></div>
                        <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#077124] to-emerald-500 flex items-center justify-center">
                          <User className="w-5 h-5 text-white" strokeWidth={2.5} />
                        </div>
                      </div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Publisher</h3>
                    </div>
                    <p className="text-white text-base font-semibold">{article.author}</p>
                  </div>
                </div>
              )}

              {/* Preview Note Card */}
              <div className="relative rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-blue-800/10 to-blue-900/20"></div>
                <div className="relative border border-blue-500/20 rounded-2xl p-5">
                  <p className="text-blue-300 text-sm">
                    👁️ <strong>Preview:</strong> Share options will appear here when published
                  </p>
                </div>
              </div>

            </div>

            {/* Right Side - Featured Image */}
            <div className="lg:col-span-9">
              {article.featured_image ? (
                <div className="relative rounded-3xl overflow-hidden group shadow-2xl h-full">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="absolute inset-0 border border-white/[0.05] rounded-3xl"></div>
                  <img 
                    src={article.featured_image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>
              ) : (
                <div className="relative rounded-3xl overflow-hidden shadow-2xl h-full min-h-[400px] bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📰</div>
                    <p className="text-gray-500 text-sm">No featured image</p>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Article Body - Aligned with image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column - Empty (TableOfContents would go here) */}
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-[120px] mb-8 lg:mb-0">
                <div className="relative rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-blue-800/10 to-blue-900/20"></div>
                  <div className="relative border border-blue-500/20 rounded-2xl p-5">
                    <p className="text-blue-300 text-sm">
                      📑 <strong>Preview:</strong> Table of contents will auto-generate here
                    </p>
                  </div>
                </div>
              </div>
            </aside>

            {/* Right Column - Article content aligned with image */}
            <article className="lg:col-span-9">
              <DynamicNewsContent htmlContent={article.content} />
            </article>

          </div>

        </div>
      </main>
    </div>
  );
}

