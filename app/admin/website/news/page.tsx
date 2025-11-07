'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import ProtectedRoute from '@/components/ProtectedRoute';
import { 
  ArrowLeft, 
  Eye,
  AlertCircle,
  Plus,
  Edit2,
  Trash2,
  Loader,
  FileText,
  Calendar,
  User,
  Tag,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  author: string;
  category: string;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
  excerpt?: string;
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      console.error('Error fetching news:', error);
      setSaveError('Failed to load articles');
      setTimeout(() => setSaveError(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id: string) => {
    setArticleToDelete(id);
    setDeleteModalOpen(true);
  };

  const deleteNews = async () => {
    if (!articleToDelete) return;
    
    setIsDeleting(true);
    
    try {
      const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', articleToDelete);

      if (error) throw error;
      
      setNews(prev => prev.filter(a => a.id !== articleToDelete));
      setDeleteModalOpen(false);
      setArticleToDelete(null);
      
      setSaveSuccess('Article deleted successfully!');
      setTimeout(() => setSaveSuccess(null), 3000);
    } catch (error) {
      console.error('Error deleting news:', error);
      setSaveError('Failed to delete article');
      setTimeout(() => setSaveError(null), 5000);
    } finally {
      setIsDeleting(false);
    }
  };

  const publishedCount = news.filter(a => a.status === 'published').length;
  const draftCount = news.filter(a => a.status === 'draft').length;

  return (
    <ProtectedRoute allowedUserType="admin">
      <div className="min-h-screen bg-black text-white">
        {/* Premium Header - Matching Dashboard Style */}
        <header className="bg-gradient-to-r from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a] border-b border-gray-800/50">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Left Section - Navigation & Title */}
              <div className="flex items-center gap-6">
                <Link 
                  href="/admin/dashboard"
                  className="p-2.5 rounded-lg hover:bg-white/[0.05] border border-transparent hover:border-gray-800 transition-all duration-300"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-400" />
                </Link>
                
                <div className="hidden sm:block w-px h-8 bg-gradient-to-b from-transparent via-gray-700 to-transparent"></div>
                
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Content Management</span>
                  <span className="text-base font-semibold text-white">News & Articles</span>
                </div>
              </div>

              {/* Right Section - Actions */}
              <div className="flex items-center gap-3">
                <Link
                  href="/news"
                  target="_blank"
                  className="group relative px-4 py-2.5 rounded-lg border border-gray-800 hover:border-gray-700 bg-gradient-to-b from-white/[0.03] to-transparent transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative flex items-center gap-2">
                    <Eye className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">Preview Page</span>
                  </div>
                </Link>

                <Link href="/admin/website/news/new">
                  <button className="group relative px-5 py-2.5 rounded-lg overflow-hidden transition-all duration-300 shadow-lg hover:shadow-emerald-500/20">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#077124] via-[#0a9b30] to-[#077124] bg-size-200 bg-pos-0 group-hover:bg-pos-100 transition-all duration-500"></div>
                    <div className="relative flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      <span className="text-sm font-semibold">Add New Article</span>
                    </div>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Success/Error Messages */}
          {saveSuccess && (
            <div className="mb-6 p-4 bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/20 rounded-xl flex items-center gap-3 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <p className="text-emerald-400 text-sm font-medium">{saveSuccess}</p>
            </div>
          )}
          
          {saveError && (
            <div className="mb-6 p-4 bg-gradient-to-r from-red-500/10 via-red-500/5 to-transparent border border-red-500/20 rounded-xl flex items-center gap-3 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-400" />
              </div>
              <p className="text-red-400 text-sm font-medium">{saveError}</p>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Total Articles */}
            <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900/50 via-zinc-900/30 to-transparent border border-white/[0.08] hover:border-white/20 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center border border-blue-500/20">
                    <FileText className="w-6 h-6 text-blue-400" />
                  </div>
                  <Sparkles className="w-5 h-5 text-blue-400/40" />
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-white">{news.length}</p>
                  <p className="text-sm text-gray-400 font-medium">Total Articles</p>
                </div>
              </div>
            </div>

            {/* Published Articles */}
            <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900/50 via-zinc-900/30 to-transparent border border-white/[0.08] hover:border-white/20 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center border border-emerald-500/20">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  </div>
                  <Sparkles className="w-5 h-5 text-emerald-400/40" />
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-white">{publishedCount}</p>
                  <p className="text-sm text-gray-400 font-medium">Published</p>
                </div>
              </div>
            </div>

            {/* Draft Articles */}
            <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900/50 via-zinc-900/30 to-transparent border border-white/[0.08] hover:border-white/20 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center border border-amber-500/20">
                    <Clock className="w-6 h-6 text-amber-400" />
                  </div>
                  <Sparkles className="w-5 h-5 text-amber-400/40" />
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-white">{draftCount}</p>
                  <p className="text-sm text-gray-400 font-medium">Drafts</p>
                </div>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-gray-800 border-t-emerald-500 animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 rounded-full bg-emerald-500/20 blur-xl animate-pulse"></div>
              </div>
              <p className="mt-6 text-sm text-gray-400 font-medium">Loading articles...</p>
            </div>
          )}

          {/* Articles List */}
          {!loading && (
            <>
              {news.length === 0 ? (
                <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-zinc-900/50 via-zinc-900/30 to-transparent">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(7,113,36,0.1),transparent)]"></div>
                  <div className="relative text-center py-20 px-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/20 mb-6">
                      <FileText className="w-10 h-10 text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">No articles yet</h3>
                    <p className="text-sm text-gray-400 mb-8 max-w-md mx-auto">
                      Start creating engaging content for your audience. Your first article is just a click away!
                    </p>
                    <Link href="/admin/website/news/new">
                      <button className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl overflow-hidden transition-all duration-300 shadow-xl hover:shadow-emerald-500/20">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#077124] via-[#0a9b30] to-[#077124] bg-size-200 bg-pos-0 group-hover:bg-pos-100 transition-all duration-500"></div>
                        <Plus className="relative w-5 h-5" />
                        <span className="relative text-sm font-semibold">Create Your First Article</span>
                      </button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {news.map((article) => (
                    <div
                      key={article.id}
                      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900/80 via-zinc-900/50 to-zinc-900/30 border border-white/[0.08] hover:border-white/20 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5"
                    >
                      {/* Gradient Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Status Indicator Bar */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                        article.status === 'published' 
                          ? 'bg-gradient-to-b from-emerald-500 via-emerald-400 to-emerald-500' 
                          : 'bg-gradient-to-b from-amber-500 via-amber-400 to-amber-500'
                      }`}></div>

                      <div className="relative p-6 pl-8">
                        <div className="flex items-start justify-between gap-6">
                          {/* Article Info */}
                          <div className="flex-1 min-w-0 space-y-4">
                            {/* Title & Status */}
                            <div className="flex items-start gap-4">
                              <div className="flex-1 min-w-0">
                                <h3 className="text-xl font-bold text-white mb-2 truncate group-hover:text-emerald-400 transition-colors">
                                  {article.title}
                                </h3>
                                {article.excerpt && (
                                  <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
                                    {article.excerpt}
                                  </p>
                                )}
                              </div>
                              
                              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border backdrop-blur-sm ${
                                article.status === 'published'
                                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-lg shadow-emerald-500/10'
                                  : 'bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-lg shadow-amber-500/10'
                              }`}>
                                {article.status === 'published' ? (
                                  <>
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    <span>Published</span>
                                  </>
                                ) : (
                                  <>
                                    <Clock className="w-3.5 h-3.5" />
                                    <span>Draft</span>
                                  </>
                                )}
                              </div>
                            </div>

                            {/* Meta Information */}
                            <div className="flex flex-wrap items-center gap-4 text-xs">
                              {/* Author */}
                              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08]">
                                <User className="w-3.5 h-3.5 text-gray-400" />
                                <span className="text-gray-300 font-medium">{article.author || 'Unknown'}</span>
                              </div>

                              {/* Category */}
                              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08]">
                                <Tag className="w-3.5 h-3.5 text-gray-400" />
                                <span className="text-gray-300 font-medium">{article.category || 'Uncategorized'}</span>
                              </div>

                              {/* Date */}
                              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08]">
                                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                <span className="text-gray-300 font-medium">
                                  {new Date(article.created_at).toLocaleDateString('en-US', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric'
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2">
                            <Link href={`/admin/website/news/edit/${article.id}`}>
                              <button className="group/btn relative p-3 rounded-xl bg-white/[0.03] hover:bg-emerald-500/10 border border-white/[0.08] hover:border-emerald-500/30 transition-all duration-300 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                                <Edit2 className="relative w-4.5 h-4.5 text-gray-400 group-hover/btn:text-emerald-400 transition-colors" />
                              </button>
                            </Link>
                            
                            <button
                              onClick={() => confirmDelete(article.id)}
                              className="group/btn relative p-3 rounded-xl bg-white/[0.03] hover:bg-red-500/10 border border-white/[0.08] hover:border-red-500/30 transition-all duration-300 overflow-hidden"
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                              <Trash2 className="relative w-4.5 h-4.5 text-gray-400 group-hover/btn:text-red-400 transition-colors" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Premium Delete Confirmation Modal */}
        {deleteModalOpen && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="relative w-full max-w-md">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 via-red-600/20 to-red-500/20 rounded-3xl blur-2xl opacity-75"></div>
              
              {/* Modal Content */}
              <div className="relative bg-gradient-to-br from-zinc-900 via-zinc-900/95 to-zinc-900/90 border border-red-500/20 rounded-2xl p-8 shadow-2xl">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl animate-pulse"></div>
                    <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-600/10 flex items-center justify-center border border-red-500/30">
                      <AlertCircle className="w-8 h-8 text-red-400" />
                    </div>
                  </div>
                </div>

                {/* Text */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-3">Delete Article?</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    This action cannot be undone. The article will be permanently removed from the database.
                  </p>
                </div>
                
                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setDeleteModalOpen(false);
                      setArticleToDelete(null);
                    }}
                    disabled={isDeleting}
                    className="flex-1 px-5 py-3 bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 rounded-xl transition-all text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={deleteNews}
                    disabled={isDeleting}
                    className="flex-1 px-5 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 rounded-xl transition-all text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-red-500/20"
                  >
                    {isDeleting ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin" />
                        <span>Deleting...</span>
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
