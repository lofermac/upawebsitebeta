"use client";

import Link from "next/link";

// TypeScript interfaces
interface NewsCard {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedDate: string;
  publisher: string;
  imageUrl?: string;
}

interface RelatedNewsProps {
  currentArticleId?: string; // Para futuramente excluir artigo atual
  articles?: NewsCard[]; // Opcional: virá do backend
  limit?: number; // Quantos cards mostrar (padrão: 3)
}

// Mock data temporário
const mockArticles: NewsCard[] = [
  {
    id: '2',
    title: 'WSOP 2025: Main Event Breaks Records',
    slug: 'wsop-2025-main-event-breaks-records',
    excerpt: 'The World Series of Poker Main Event sees unprecedented participation this year.',
    publishedDate: 'September 15, 2025',
    publisher: 'Sarah Johnson'
  },
  {
    id: '3',
    title: 'New Rakeback Structure Announced',
    slug: 'new-rakeback-structure-announced',
    excerpt: 'Universal Poker introduces enhanced rakeback rewards for all players.',
    publishedDate: 'August 28, 2025',
    publisher: 'Mike Roberts'
  },
  {
    id: '4',
    title: 'Online Poker Traffic Hits All-Time High',
    slug: 'online-poker-traffic-hits-all-time-high',
    excerpt: 'Record numbers of players join online poker platforms worldwide.',
    publishedDate: 'August 10, 2025',
    publisher: 'Emma Davis'
  }
];

export default function RelatedNews({ 
  currentArticleId, 
  articles, 
  limit = 3 
}: RelatedNewsProps) {
  // Se articles prop for passado, usar ele; senão usar dados mockados
  // Filtrar artigo atual e limitar número de cards
  const displayArticles = articles 
    ? articles.filter(a => a.id !== currentArticleId).slice(0, limit)
    : mockArticles.slice(0, limit);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 mt-16">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-white mb-2">
          Related News
        </h2>
        <p className="text-gray-400">
          Continue exploring our latest updates
        </p>
      </div>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayArticles.map((article) => (
          <Link 
            key={article.id} 
            href={`/news/${article.slug}`}
            className="block"
          >
            <div className="group bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 hover:bg-white/[0.04] transition-all duration-300 h-full flex flex-col">
              
              {/* Imagem (opcional) */}
              {article.imageUrl && (
                <div className="mb-4 rounded-xl overflow-hidden aspect-video bg-gradient-to-br from-[#077124]/10 to-emerald-900/10">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              {/* Título */}
              <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-[#077124] transition-colors">
                {article.title}
              </h3>
              
              {/* Excerpt */}
              <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
                {article.excerpt}
              </p>
              
              {/* Footer do Card */}
              <div className="flex items-center justify-between text-xs text-gray-500 mt-auto pt-4 border-t border-white/[0.05]">
                <span className="font-medium">{article.publishedDate}</span>
                <span className="text-gray-600">{article.publisher}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

