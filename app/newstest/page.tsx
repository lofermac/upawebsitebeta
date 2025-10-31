"use client";

import HeaderWithAuth from "../components/HeaderWithAuth";
import Footer from "../components/Footer";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Filter, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { supabase } from '@/lib/supabase/client';

interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  author: string;
  category: string;
  excerpt: string;
  featured_image?: string;
  status: 'draft' | 'published';
  published_at: string;
  created_at: string;
  updated_at: string;
}

export default function NewsTestPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const filterRef = useRef<HTMLDivElement>(null);
  const postsPerPage = 12; // Grid 3x4 (3 colunas × 4 linhas)
  
  // Buscar artigos do Supabase
  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (!error && data) {
        setArticles(data);
      }
      setLoading(false);
    }

    fetchArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Extrair categorias únicas dos artigos
  const categories = [
    { id: 'All', name: 'All News', icon: '📰' },
    ...Array.from(new Set(articles.map(article => article.category)))
      .filter(cat => cat) // Remove valores vazios
      .map(cat => ({
        id: cat,
        name: cat,
        icon: '📢'
      }))
  ];
  
  // Filtrar posts por categoria
  const filteredPosts = selectedCategory === 'All' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);
  
  // Calcular posts para a página atual
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  
  // Calcular número total de páginas
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top suave
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset para primeira página ao trocar categoria
    setIsFilterOpen(false); // Fechar o filtro após selecionar
  };
  
  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };

    if (isFilterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterOpen]);

  // Formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section - Black Background */}
      <section className="relative bg-black w-full px-3 md:px-4 pt-6 pb-8">
        {/* Premium Container Card - envolve Header, Título e Subtítulo */}
        <div className="relative w-full rounded-[2.5rem] overflow-hidden group/hero transition-all duration-700">
          
          {/* Background com gradiente cinza escuro premium - mesmo tom da homepage */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#121212] to-[#0d0d0d] transition-all duration-700 group-hover/hero:from-[#0e0e0e] group-hover/hero:via-[#131313] group-hover/hero:to-[#0e0e0e]"></div>
          
          {/* Borda sutil ao redor do card */}
          <div className="absolute inset-0 rounded-[2.5rem] border border-white/[0.06] shadow-2xl shadow-black/50 transition-all duration-700 group-hover/hero:border-white/[0.09] group-hover/hero:shadow-black/60"></div>
          
          {/* Brilho interno sutil */}
          <div className="absolute inset-0 rounded-[2.5rem] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.025)] transition-all duration-700 group-hover/hero:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"></div>
          
          {/* Brilho no topo do card */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent rounded-t-[2.5rem]"></div>
          
          {/* Efeitos de glow verde sutil (marca Universal Poker) */}
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#077124]/[0.03] rounded-full blur-[100px] animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-emerald-500/[0.02] rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
          
          {/* Textura de ruído sutil para sensação premium */}
          <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
          
          {/* Header */}
          <div className="relative z-10 pt-6 px-4">
            <HeaderWithAuth />
          </div>
          
          {/* Hero Content - Title and Subtitle */}
          <div className="relative z-10 pt-20 pb-20 px-4">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-white text-center text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-4" 
                  style={{ 
                    textShadow: '0 2px 16px rgba(0,0,0,0.4)',
                    letterSpacing: '-0.02em'
                  }}>
                Poker News
              </h1>
              <p className="text-gray-400 text-center text-lg md:text-xl lg:text-[1.35rem] max-w-5xl mx-auto leading-relaxed font-normal whitespace-nowrap"
                 style={{ 
                   textShadow: '0 1px 8px rgba(0,0,0,0.3)',
                   letterSpacing: '-0.01em'
                 }}>
                Stay updated with the latest poker news, tournaments, and industry updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* News Section - Pure Black Background */}
      <main className="relative bg-black w-full pt-4 pb-24">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Minimalist Filter Button - Top Right */}
          <div className="flex justify-end mb-6">
            <div className="relative" ref={filterRef}>
              {/* Filter Toggle Button */}
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`group relative flex items-center gap-2.5 px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                  isFilterOpen
                    ? 'bg-gradient-to-r from-[#088929] to-[#077124] text-white shadow-lg shadow-[#077124]/30'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800/80 border border-zinc-800/50'
                }`}
              >
                <Filter className={`w-4 h-4 transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
                <span>Filter</span>
                {selectedCategory !== 'All' && (
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white/20 text-xs font-bold">
                    1
                  </span>
                )}
              </button>

              {/* Dropdown Filter Menu */}
              {isFilterOpen && (
                <div className="absolute right-0 mt-2 w-80 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="relative group/dropdown">
                      {/* Background Glow */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#077124]/20 to-emerald-500/20 rounded-2xl blur-xl opacity-50"></div>
                      
                      {/* Dropdown Content */}
                      <div className="relative bg-zinc-900 border border-zinc-800/50 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-zinc-800/50">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#077124] shadow-lg shadow-[#077124]/50 animate-pulse-slow"></div>
                            <h3 className="text-white font-semibold text-sm">Filter by Category</h3>
                          </div>
                          <button
                            onClick={() => setIsFilterOpen(false)}
                            className="text-zinc-500 hover:text-white transition-colors duration-200"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Categories List */}
                        <div className="p-3 space-y-1.5 max-h-96 overflow-y-auto">
                          {categories.map((category) => {
                            const isActive = selectedCategory === category.id;
                            return (
                              <button
                                key={category.id}
                                onClick={() => handleCategoryChange(category.id)}
                                className={`w-full group/item relative flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                                  isActive
                                    ? 'bg-gradient-to-r from-[#088929] to-[#077124] text-white shadow-lg shadow-[#077124]/20'
                                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                                }`}
                              >
                                {isActive && (
                                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 rounded-xl"></div>
                                )}
                                <span className="text-lg">{category.icon}</span>
                                <span className="relative z-10 flex-1 text-left">{category.name}</span>
                                {isActive && (
                                  <div className="w-1.5 h-1.5 rounded-full bg-white shadow-lg"></div>
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Footer - Results Counter */}
                        <div className="px-4 py-3 border-t border-zinc-800/50 bg-zinc-900/50">
                          <p className="text-zinc-500 text-xs text-center">
                            <span className="text-[#077124] font-semibold">{filteredPosts.length}</span> {filteredPosts.length === 1 ? 'article' : 'articles'}
                            {selectedCategory !== 'All' && (
                              <>
                                {' '}in <span className="text-zinc-400">{selectedCategory}</span>
                              </>
                            )}
                          </p>
                          {selectedCategory !== 'All' && (
                            <button
                              onClick={() => handleCategoryChange('All')}
                              className="mt-2 w-full text-xs text-zinc-400 hover:text-[#077124] transition-colors duration-300 font-medium"
                            >
                              Clear Filter
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                </div>
              )}
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="inline-block w-12 h-12 border-4 border-zinc-800 border-t-[#077124] rounded-full animate-spin mb-4"></div>
                <p className="text-zinc-400">Loading articles...</p>
              </div>
            </div>
          ) : currentPosts.length === 0 ? (
            // Empty State
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
                <span className="text-3xl">📰</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">No articles yet</h3>
              <p className="text-gray-500">Check back soon for the latest poker news and updates</p>
            </div>
          ) : (
            <>
              {/* News Grid - 3x4 (3 colunas × 4 linhas) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {currentPosts.map((article) => (
                  <article 
                    key={article.id}
                    className="group relative bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-[#077124] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#077124]/20"
                  >
                    {/* Image */}
                    <Link href={`/news/${article.slug}`} className="block overflow-hidden">
                      <div className="relative h-56 overflow-hidden bg-zinc-800">
                        {article.featured_image ? (
                          <img 
                            src={article.featured_image} 
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-zinc-600">
                            <span className="text-6xl">📰</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="p-6">
                      {/* Date & Category */}
                      <div className="flex items-center gap-3 mb-3">
                        <time className="text-xs text-zinc-400 font-medium">
                          {formatDate(article.published_at)}
                        </time>
                        <span className="text-xs text-zinc-600">•</span>
                        <span className="text-xs text-[#077124] font-semibold uppercase tracking-wide">
                          {article.category || 'News'}
                        </span>
                      </div>

                      {/* Title */}
                      <Link href={`/news/${article.slug}`}>
                        <h3 className="text-white text-lg font-bold mb-4 line-clamp-2 group-hover:text-[#077124] transition-colors duration-300 leading-snug">
                          {article.title}
                        </h3>
                      </Link>

                      {/* Excerpt */}
                      {article.excerpt && (
                        <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
                          {article.excerpt}
                        </p>
                      )}

                      {/* Read More Button */}
                      <Link 
                        href={`/news/${article.slug}`}
                        className="inline-flex items-center gap-2 text-[#077124] hover:text-emerald-400 font-semibold text-sm transition-all duration-300 group/btn"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              {/* Premium Pagination - Ultra Luxo */}
              {totalPages > 1 && (
                <div className="mt-12">
                  {/* Decorative Line with Glow */}
                  <div className="relative mb-8">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="w-full border-t border-zinc-800"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <div className="bg-black px-6">
                        <div className="w-3 h-3 rounded-full bg-[#077124] shadow-lg shadow-[#077124]/50 animate-pulse-slow"></div>
                      </div>
                    </div>
                  </div>

                  {/* Pagination Container */}
                  <div className="flex flex-col items-center gap-6">
                    {/* Main Pagination Controls */}
                    <div className="flex items-center gap-3">
                      {/* Previous Button - Ultra Premium */}
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`group relative flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-500 overflow-hidden ${
                          currentPage === 1
                            ? 'text-zinc-700 cursor-not-allowed bg-zinc-900/30'
                            : 'text-white bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 hover:scale-105 shadow-xl'
                        }`}
                        style={currentPage !== 1 ? {
                          boxShadow: '0 0 0 1px rgba(255,255,255,0.05), 0 4px 12px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1)'
                        } : {}}
                      >
                        {currentPage !== 1 && (
                          <>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#077124]/10 via-emerald-500/10 to-[#077124]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-[#077124]/20 to-transparent"></div>
                          </>
                        )}
                        <ChevronLeft className={`w-4 h-4 relative z-10 transition-transform duration-300 ${currentPage !== 1 ? 'group-hover:-translate-x-1' : ''}`} />
                        <span className="relative z-10 hidden sm:inline">Previous</span>
                      </button>

                      {/* Page Numbers - Premium Edition */}
                      <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => {
                          const isActive = currentPage === pageNumber;
                          return (
                            <button
                              key={pageNumber}
                              onClick={() => handlePageChange(pageNumber)}
                              className={`relative min-w-[48px] h-12 rounded-xl font-bold text-base transition-all duration-500 overflow-hidden ${
                                isActive
                                  ? 'text-white scale-110 shadow-2xl'
                                  : 'text-zinc-400 hover:text-white hover:scale-105 bg-zinc-900/50 hover:bg-zinc-800'
                              }`}
                              style={isActive ? {
                                background: 'linear-gradient(135deg, #088929 0%, #077124 50%, #055a1c 100%)',
                                boxShadow: `
                                  0 0 0 1px rgba(255,255,255,0.1),
                                  0 4px 16px rgba(7,113,36,0.4),
                                  0 8px 32px rgba(7,113,36,0.3),
                                  inset 0 1px 1px rgba(255,255,255,0.3),
                                  inset 0 -1px 1px rgba(0,0,0,0.2)
                                `
                              } : {}}
                            >
                              {isActive && (
                                <>
                                  {/* Animated Glow Layers */}
                                  <div className="absolute -inset-1 bg-gradient-to-r from-[#077124] via-emerald-400 to-[#077124] rounded-xl blur-lg opacity-70 animate-pulse-slow"></div>
                                  <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 via-[#077124] to-emerald-400 rounded-xl blur-xl opacity-40 animate-pulse-slow" style={{ animationDelay: '0.5s' }}></div>
                                  
                                  {/* Shine Effect */}
                                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/5 to-transparent rounded-xl" style={{ height: '50%' }}></div>
                                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                                </>
                              )}
                              <span className="relative z-10">{pageNumber}</span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Next Button - Ultra Premium */}
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`group relative flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-500 overflow-hidden ${
                          currentPage === totalPages
                            ? 'text-zinc-700 cursor-not-allowed bg-zinc-900/30'
                            : 'text-white bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 hover:scale-105 shadow-xl'
                        }`}
                        style={currentPage !== totalPages ? {
                          boxShadow: '0 0 0 1px rgba(255,255,255,0.05), 0 4px 12px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1)'
                        } : {}}
                      >
                        {currentPage !== totalPages && (
                          <>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#077124]/10 via-emerald-500/10 to-[#077124]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-[#077124]/20 to-transparent"></div>
                          </>
                        )}
                        <span className="relative z-10 hidden sm:inline">Next</span>
                        <ChevronRight className={`w-4 h-4 relative z-10 transition-transform duration-300 ${currentPage !== totalPages ? 'group-hover:translate-x-1' : ''}`} />
                      </button>
                    </div>

                    {/* Page Info - Premium Display */}
                    <div className="flex items-center gap-4">
                      <div className="text-zinc-500 text-sm font-medium">
                        Page <span className="text-[#077124] font-bold text-base mx-1">{currentPage}</span> of <span className="text-zinc-400 font-semibold ml-1">{totalPages}</span>
                      </div>
                      <div className="hidden sm:block w-px h-4 bg-zinc-800"></div>
                      <div className="hidden sm:block text-zinc-600 text-xs">
                        Showing {indexOfFirstPost + 1}-{Math.min(indexOfLastPost, filteredPosts.length)} of {filteredPosts.length} articles
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
