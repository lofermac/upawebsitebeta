/**
 * Wrapper discreto para adicionar overlay de geolocalização em cards de deal
 * Banner cobre os botões quando deal não está disponível
 */

'use client';

import { ReactNode, cloneElement, isValidElement, useState, useEffect } from 'react';
import { useDealAvailability } from '@/lib/hooks/useGeoLocation';
import { getDealById, type Deal } from '@/lib/supabase/deals';
import { MapPin } from 'lucide-react';
import Link from 'next/link';

interface DealCardWithGeoProps {
  children: ReactNode;
  dealId: number;
}

export default function DealCardWithGeo({ children, dealId }: DealCardWithGeoProps) {
  const [deal, setDeal] = useState<Deal | null>(null);

  // Buscar deal do Supabase
  useEffect(() => {
    async function loadDeal() {
      const { data } = await getDealById(dealId);
      if (data) setDeal(data);
    }
    loadDeal();
  }, [dealId]);

  const { isAvailable, isLoading } = useDealAvailability(deal);

  // Banner que cobre os botões - estética melhorada
  const unavailableBanner = !isLoading && !isAvailable ? (
    <div 
      className="absolute left-0 right-0 z-50 px-8"
      style={{ 
        bottom: '88px', // Posicionado sobre os botões (antes do footer)
        height: '80px', // Altura aumentada para cobrir glow verde
        pointerEvents: 'auto' // Banner é clicável (para o link Contact Us)
      }}
    >
      {/* Overlay premium com estética moderna */}
      <div 
        className="relative h-full rounded-xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(20, 20, 25, 0.95) 0%, rgba(15, 15, 20, 0.97) 100%)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
        }}
      >
        {/* Borda interna sutil para profundidade */}
        <div className="absolute inset-[1px] rounded-xl" style={{ border: '1px solid rgba(255, 255, 255, 0.03)' }}></div>
        
        {/* Conteúdo do banner */}
        <div className="relative flex flex-col items-center justify-center h-full gap-1 px-4 py-2">
          {/* Linha 1: Ícone + Título principal */}
          <div className="flex items-center gap-2">
            {/* Ícone premium com múltiplas camadas de efeito */}
            <div className="relative flex items-center justify-center">
              {/* Glow externo animado */}
              <div className="absolute inset-0 bg-red-500/20 rounded-full blur-lg animate-pulse"></div>
              {/* Círculo de fundo com gradiente */}
              <div className="relative w-7 h-7 rounded-full bg-gradient-to-br from-red-500/20 to-red-600/30 flex items-center justify-center"
                   style={{
                     boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                   }}>
                {/* Ícone com sombra */}
                <MapPin className="w-4 h-4 text-red-400" strokeWidth={2.5} 
                        style={{ filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5))' }} />
              </div>
            </div>
            <p className="text-sm font-bold text-white tracking-tight"
               style={{ 
                 textShadow: '0 1px 4px rgba(0, 0, 0, 0.5)',
                 letterSpacing: '-0.01em'
               }}>
              Not Available in Your Location
            </p>
          </div>
          
          {/* Linha 2: Texto secundário com link */}
          <p className="text-xs text-gray-400 text-center leading-tight font-normal">
            <Link 
              href="/contact-us" 
              className="text-[#077124] hover:text-[#0a9b30] hover:underline font-semibold transition-colors duration-200 inline-flex items-center gap-1"
            >
              Contact us
            </Link>
            {' '}if you have any questions.
          </p>
        </div>
        
        {/* Subtle accent line no topo */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent"></div>
      </div>
    </div>
  ) : null;

  // Se children é um elemento React válido, clone e injete o banner
  if (isValidElement(children)) {
    const element = children as React.ReactElement<{ children?: ReactNode }>;
    return cloneElement(element, {
      children: (
        <>
          {element.props.children}
          {unavailableBanner}
        </>
      )
    });
  }

  return <>{children}</>;
}

