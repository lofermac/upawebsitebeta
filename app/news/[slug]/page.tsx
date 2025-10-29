import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import HeaderWithAuth from '@/app/components/HeaderWithAuth';
import TableOfContents from '@/components/TableOfContents';
import RelatedNews from '@/components/RelatedNews';
import Footer from '@/app/components/Footer';
import ShareArticle from '@/components/ShareArticle';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const { data: article } = await supabase
    .from('news')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!article) {
    notFound();
  }

  // Gerar URL completa para share
  const articleUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://universalpoker.com'}/news/${article.slug}`;

  return (
    <div className="bg-[#1E1E1E] min-h-screen flex flex-col">
      {/* Header Section */}
      <section className="relative bg-[#1E1E1E] w-full px-3 md:px-4 pt-6">
        <div className="absolute top-0 left-0 right-0 z-50 pt-6 px-4">
          <HeaderWithAuth />
        </div>
      </section>

      {/* Main Content */}
      <main className="relative bg-[#1E1E1E] w-full pt-20 pb-24 flex-1">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Go Back Button */}
          <div className="mt-6 mb-8">
            <Link href="/news" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#077124] transition-colors duration-300 text-sm font-medium group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Go back</span>
            </Link>
          </div>

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
              {article.published_at && (
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
                      {new Date(article.published_at).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              )}

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

              {/* Share Card */}
              <ShareArticle url={articleUrl} title={article.title} />

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
            {/* Left Column - Sticky Sidebar with TableOfContents */}
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-[120px] mb-8 lg:mb-0">
                <TableOfContents />
              </div>
            </aside>

            {/* Right Column - Article content aligned with image */}
            <article className="lg:col-span-9">
              <div 
                className="prose prose-lg prose-invert max-w-none
                  prose-headings:text-white prose-headings:font-bold
                  prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8
                  prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-8
                  prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-6
                  prose-p:text-gray-300 prose-p:text-lg prose-p:leading-relaxed prose-p:mb-6
                  prose-a:text-[#077124] prose-a:no-underline hover:prose-a:underline hover:prose-a:text-emerald-400
                  prose-strong:text-white prose-strong:font-bold
                  prose-code:text-green-400 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                  prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl
                  prose-blockquote:border-l-4 prose-blockquote:border-[#077124] prose-blockquote:bg-white/5 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-xl
                  prose-ul:text-gray-300 prose-ul:my-6
                  prose-ol:text-gray-300 prose-ol:my-6
                  prose-li:text-gray-300 prose-li:marker:text-gray-500 prose-li:my-2
                  prose-img:rounded-2xl prose-img:border prose-img:border-white/10 prose-img:shadow-2xl prose-img:my-8
                  prose-table:border-collapse prose-table:w-full prose-table:my-8
                  prose-thead:bg-[#077124]/20 prose-thead:border-b prose-thead:border-[#077124]/30
                  prose-th:bg-transparent prose-th:text-white prose-th:font-bold prose-th:text-base prose-th:px-6 prose-th:py-4
                  prose-td:border-t prose-td:border-white/10 prose-td:text-gray-300 prose-td:px-6 prose-td:py-4
                  prose-tr:hover:bg-white/5 prose-tr:transition-colors"
                style={{ lineHeight: '1.8' }}
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </article>

          </div>

        </div>
      </main>

      {/* Related News Section */}
      <RelatedNews currentArticleId={article.id} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
