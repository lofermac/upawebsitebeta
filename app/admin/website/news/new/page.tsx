'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import ProtectedRoute from '@/components/ProtectedRoute';
import TiptapEditor from '@/components/TiptapEditor';
import { 
  ArrowLeft, 
  Save,
  AlertCircle,
  CheckCircle,
  Loader,
  Eye
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

export default function NewArticlePage() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [content, setContent] = useState<string>('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [showFloatingSave, setShowFloatingSave] = useState(false);
  
  const router = useRouter();

  // Show floating button when Article Content section is in view
  useEffect(() => {
    // Wait for DOM to be ready
    const timer = setTimeout(() => {
      // Find the Article Content section (the one with TipTap editor)
      const contentSection = document.querySelector('h2');
      
      if (!contentSection) {
        console.log('Content section not found');
        return;
      }

      // Create Intersection Observer to detect when Article Content is visible
      const observer = new IntersectionObserver(
        ([entry]) => {
          // Show button when Article Content section is OUT of viewport (scrolled past it)
          const shouldShow = !entry.isIntersecting;
          console.log('Article Content visible:', entry.isIntersecting, 'Show button:', shouldShow);
          setShowFloatingSave(shouldShow);
        },
        {
          threshold: 0.1, // Trigger when at least 10% is visible
          rootMargin: '0px'
        }
      );

      observer.observe(contentSection);

      // Cleanup
      return () => {
        observer.unobserve(contentSection);
      };
    }, 500); // Small delay to ensure DOM is loaded

    return () => clearTimeout(timer);
  }, []); // Run once on mount

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
        featured_image: featuredImage || null,
        content,
        status,
        published_at: status === 'published' ? new Date().toISOString() : null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('news')
        .insert([articleData])
        .select()
        .single();

      if (error) throw error;

      router.push('/admin/website/news');
    } catch (error) {
      console.error('Error saving article:', error);
      setSaveError('Failed to save article. Please try again.');
      setTimeout(() => setSaveError(null), 5000);
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = () => {
    // Store current article data in sessionStorage for preview
    const previewData = {
      title,
      author,
      category,
      excerpt,
      featured_image: featuredImage,
      content,
      created_at: new Date().toISOString()
    };
    
    sessionStorage.setItem('newsPreview', JSON.stringify(previewData));
    
    // Open preview in new tab
    window.open('/admin/website/news/preview', '_blank');
  };

  const validateField = (field: string, value: string): boolean => {
    switch (field) {
      case 'title':
        return value.trim().length > 0;
      default:
        return true;
    }
  };

  return (
    <ProtectedRoute allowedUserType="admin">
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <header className="bg-gradient-to-r from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a] border-b border-gray-800/50">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Left Section - Navigation & Title */}
              <div className="flex items-center gap-6">
                <Link 
                  href="/admin/website/news"
                  className="p-2.5 rounded-lg hover:bg-white/[0.05] border border-transparent hover:border-gray-800 transition-all duration-300"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-400" />
                </Link>
                
                <div className="hidden sm:block w-px h-8 bg-gradient-to-b from-transparent via-gray-700 to-transparent"></div>
                
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">News Management</span>
                  <span className="text-base font-semibold text-white">Create New Article</span>
                </div>
              </div>

              {/* Right Section - Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSave}
                  disabled={!title.trim() || saving}
                  className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#10b981] to-emerald-600 hover:from-[#0ea472] hover:to-emerald-500 rounded-lg transition-all duration-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/20"
                >
                  {saving ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Article
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content - Single Column */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Error Message */}
          {saveError && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <p className="text-red-400 text-sm">{saveError}</p>
            </div>
          )}

          {/* Article Info Section */}
          <div className="mb-6 p-6 bg-zinc-900/50 border border-white/10 rounded-2xl">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <span className="text-2xl">📰</span>
              Article Information
            </h2>
            
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
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124] text-white"
                  >
                    <option value="" className="bg-zinc-800">Select a category...</option>
                    <option value="Universal Poker Promotions" className="bg-zinc-800">Universal Poker Promotions</option>
                    <option value="General News" className="bg-zinc-800">General News</option>
                    <option value="Poker Site Promotions" className="bg-zinc-800">Poker Site Promotions</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">💡 Article category for organization</p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Featured Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Featured Image URL
                  </label>
                  <input
                    type="url"
                    value={featuredImage}
                    onChange={(e) => setFeaturedImage(e.target.value)}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124]"
                    placeholder="https://example.com/image.jpg"
                  />
                  <p className="text-xs text-gray-500 mt-1">💡 Main image displayed at the top of the article</p>
                  {featuredImage && (
                    <div className="mt-3 relative rounded-lg overflow-hidden border border-white/10">
                      <img 
                        src={featuredImage} 
                        alt="Featured preview" 
                        className="w-full h-32 object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>

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
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <span className="text-2xl">✍️</span>
              Article Content
            </h2>
            <p className="text-sm text-gray-400 mb-4">Use the rich text editor and premium blocks to create your article</p>
            
            <TiptapEditor
              content={content}
              onChange={(newContent) => setContent(newContent)}
            />
          </div>
        </div>

        {/* Floating Action Buttons - Appear when scrolled past Article Content */}
        <div className={`fixed bottom-8 right-8 z-[9999] flex flex-col gap-3 transition-all duration-500 ease-out ${
          showFloatingSave 
            ? 'translate-y-0 opacity-100 scale-100 pointer-events-auto' 
            : 'translate-y-20 opacity-0 scale-90 pointer-events-none'
        }`}>
          {/* Preview Button */}
          <button
            onClick={handlePreview}
            className="group relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-xl text-sm font-semibold shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-300"
          >
            <Eye className="w-5 h-5" />
            <span>Preview</span>
          </button>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={!title.trim() || saving}
            className="group relative flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#10b981] to-emerald-600 hover:from-[#0ea472] hover:to-emerald-500 rounded-xl text-sm font-semibold shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {saving ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
}
