import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-gradient-to-b from-zinc-900/50 to-black/50 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link 
            href="/news"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to News
          </Link>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {article.title}
          </h1>
          
          {article.excerpt && (
            <p className="text-xl text-gray-400 mb-6 leading-relaxed">
              {article.excerpt}
            </p>
          )}
          
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 pb-6 border-b border-white/10">
            {article.author && (
              <span className="text-gray-400">By {article.author}</span>
            )}
            {article.category && (
              <>
                <span>•</span>
                <span className="px-2.5 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10">
                  {article.category}
                </span>
              </>
            )}
            {article.published_at && (
              <>
                <span>•</span>
                <time className="text-gray-400">
                  {new Date(article.published_at).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                  })}
                </time>
              </>
            )}
          </div>
        </header>

        {/* Article Content */}
        <div
          className="prose prose-lg prose-invert max-w-none
            prose-headings:text-white prose-headings:font-bold
            prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
            prose-p:text-gray-300 prose-p:leading-relaxed
            prose-a:text-green-400 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white prose-strong:font-bold
            prose-code:text-green-400 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-white/10
            prose-blockquote:border-l-4 prose-blockquote:border-green-500 prose-blockquote:bg-white/5 prose-blockquote:py-1
            prose-ul:text-gray-300 prose-ol:text-gray-300
            prose-li:text-gray-300 prose-li:marker:text-gray-500
            prose-img:rounded-lg prose-img:border prose-img:border-white/10
            prose-table:border prose-table:border-white/10
            prose-th:bg-white/5 prose-th:text-white prose-th:font-semibold
            prose-td:border-white/10 prose-td:text-gray-300"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>

      {/* Footer CTA */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="p-6 bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/20 rounded-2xl">
          <h3 className="text-xl font-bold text-white mb-2">
            Ready to Start Playing?
          </h3>
          <p className="text-gray-400 mb-4">
            Join thousands of players and get the best poker deals available.
          </p>
          <Link
            href="/deals"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition-all text-white font-semibold"
          >
            View All Deals
          </Link>
        </div>
      </div>
    </div>
  );
}

