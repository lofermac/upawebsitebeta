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
  Loader
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

  return (
    <ProtectedRoute allowedUserType="admin">
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <div className="border-b border-white/10 bg-gradient-to-b from-zinc-900/50 to-black/50 backdrop-blur-xl sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link 
                  href="/admin/dashboard"
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    News & Articles
                  </h1>
                  <p className="text-sm text-gray-400 mt-1">
                    Create and manage blog posts and news articles
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/news"
                  target="_blank"
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all text-sm"
                >
                  <Eye className="w-4 h-4" />
                  Preview Page
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Success/Error Messages */}
          {saveSuccess && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-green-400 text-sm">{saveSuccess}</p>
            </div>
          )}
          
          {saveError && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <p className="text-red-400 text-sm">{saveError}</p>
            </div>
          )}

          {/* Add New Article Button */}
          <div className="mb-6">
            <Link href="/admin/website/news/new">
              <button className="flex items-center gap-2 px-4 py-2 bg-[#077124] hover:bg-[#0a9b30] rounded-lg transition-all text-sm font-medium">
                <Plus className="w-4 h-4" />
                Add New Article
              </button>
            </Link>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader className="w-8 h-8 text-gray-400 animate-spin" />
            </div>
          )}

          {/* Articles List */}
          {!loading && (
            <>
              {news.length === 0 ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
                    <AlertCircle className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-300 mb-2">No articles yet</h3>
                  <p className="text-sm text-gray-500 mb-6">Get started by creating your first article</p>
                  <Link href="/admin/website/news/new">
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-[#077124] hover:bg-[#0a9b30] rounded-lg transition-all text-sm font-medium">
                      <Plus className="w-4 h-4" />
                      Create First Article
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="grid gap-4">
                  {news.map((article) => (
                    <div
                      key={article.id}
                      className="p-6 bg-zinc-900/50 border border-white/10 rounded-2xl hover:border-white/20 transition-all"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-white truncate">
                              {article.title}
                            </h3>
                            <span
                              className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                                article.status === 'published'
                                  ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                  : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                              }`}
                            >
                              {article.status === 'published' ? 'Published' : 'Draft'}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                            <span>By {article.author || 'Unknown'}</span>
                            <span>•</span>
                            <span>{article.category || 'Uncategorized'}</span>
                            <span>•</span>
                            <span>
                              {new Date(article.created_at).toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Link href={`/admin/website/news/edit/${article.id}`}>
                            <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all group">
                              <Edit2 className="w-4 h-4 text-gray-400 group-hover:text-white" />
                            </button>
                          </Link>
                          <button
                            onClick={() => confirmDelete(article.id)}
                            className="p-2 bg-white/5 hover:bg-red-500/20 rounded-lg transition-all group"
                          >
                            <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {deleteModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 max-w-md w-full">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Delete Article</h3>
                  <p className="text-sm text-gray-400">
                    Are you sure you want to delete this article? This action cannot be undone.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setDeleteModalOpen(false);
                    setArticleToDelete(null);
                  }}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all text-sm font-medium disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteNews}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-all text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isDeleting ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    'Delete'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
