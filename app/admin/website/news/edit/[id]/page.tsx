'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import ProtectedRoute from '@/components/ProtectedRoute';
import TiptapEditor from '@/components/TiptapEditor';
import { 
  ArrowLeft, 
  Save,
  AlertCircle,
  CheckCircle,
  Loader
} from 'lucide-react';
import Link from 'next/link';

const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export default function EditArticlePage() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState<string>('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  
  const router = useRouter();
  const params = useParams();
  const supabase = createClientComponentClient();
  const id = params.id as string;

  useEffect(() => {
    if (id) {
      fetchArticle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      if (data) {
        setTitle(data.title || '');
        setAuthor(data.author || '');
        setCategory(data.category || '');
        setExcerpt(data.excerpt || '');
        setContent(data.content || '');
        setStatus(data.status || 'draft');
      }
    } catch (error) {
      console.error('Error fetching article:', error);
      setSaveError('Failed to load article');
      setTimeout(() => {
        router.push('/admin/website/news');
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      setSaveError('Title is required');
      setTimeout(() => setSaveError(null), 3000);
      return;
    }

    try {
      setSaving(true);
      setSaveError(null);
      
      const slug = generateSlug(title);
      
      const articleData = {
        title,
        slug,
        author,
        category,
        excerpt,
        content,
        status,
        published_at: status === 'published' ? new Date().toISOString() : null,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('news')
        .update(articleData)
        .eq('id', id);

      if (error) throw error;

      setSaveSuccess('Article updated successfully!');
      setTimeout(() => {
        router.push('/admin/website/news');
      }, 1500);
    } catch (error) {
      console.error('Error updating article:', error);
      setSaveError('Failed to update article. Please try again.');
      setTimeout(() => setSaveError(null), 5000);
    } finally {
      setSaving(false);
    }
  };

  const validateField = (field: string, value: string): boolean => {
    switch (field) {
      case 'title':
        return value.trim().length > 0;
      default:
        return true;
    }
  };

  if (loading) {
    return (
      <ProtectedRoute allowedUserType="admin">
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <Loader className="w-8 h-8 text-gray-400 animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading article...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute allowedUserType="admin">
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <div className="border-b border-white/10 bg-gradient-to-b from-zinc-900/50 to-black/50 backdrop-blur-xl sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link 
                  href="/admin/website/news"
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    Edit Article
                  </h1>
                  <p className="text-sm text-gray-400 mt-1">
                    Update your article
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSave}
                  disabled={!title.trim() || saving}
                  className="flex items-center gap-2 px-4 py-2 bg-[#077124] hover:bg-[#0a9b30] rounded-lg transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Success Message */}
          {saveSuccess && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-green-400 text-sm">{saveSuccess}</p>
            </div>
          )}
          
          {/* Error Message */}
          {saveError && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <p className="text-red-400 text-sm">{saveError}</p>
            </div>
          )}

          {/* Article Info Section */}
          <div className="mb-6 p-6 bg-zinc-900/50 border border-white/10 rounded-2xl">
            <h2 className="text-lg font-semibold mb-6">Article Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-2 pr-10 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124]"
                      placeholder="Enter article title"
                    />
                    {title && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {validateField('title', title) ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">💡 Main headline for your article</p>
                </div>

                {/* Author */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124]"
                    placeholder="Enter author name"
                  />
                  <p className="text-xs text-gray-500 mt-1">💡 Author name (optional)</p>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124]"
                    placeholder="e.g. Tournaments, News, Strategy"
                  />
                  <p className="text-xs text-gray-500 mt-1">💡 Article category for organization</p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Excerpt
                  </label>
                  <textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124] resize-none"
                    placeholder="Brief description of the article..."
                  />
                  <p className="text-xs text-gray-500 mt-1">💡 Short summary shown in listings (optional)</p>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124] text-white [&>option]:bg-zinc-900 [&>option]:text-white"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">💡 Draft = Not visible | Published = Live on site</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 bg-zinc-900/50 border border-white/10 rounded-2xl">
            <h2 className="text-lg font-semibold mb-2">Article Content</h2>
            <p className="text-sm text-gray-400 mb-4">Use the rich text editor to format your article</p>
            
            <TiptapEditor
              content={content}
              onChange={(newContent) => setContent(newContent)}
            />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
