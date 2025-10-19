/**
 * Wrapper discreto para adicionar overlay de geolocalização em cards de deal
 * Banner cobre os botões quando deal não está disponível
 */

'use client';

import { ReactNode, cloneElement, isValidElement } from 'react';
import { useDealAvailability } from '@/lib/hooks/useGeoLocation';
import { getDealById } from '@/lib/utils/dealsData';
import { MapPin } from 'lucide-react';
import Link from 'next/link';

interface DealCardWithGeoProps {
  children: ReactNode;
  dealId: number;
}

export default function DealCardWithGeo({ children, dealId }: DealCardWithGeoProps) {
  const deal = getDealById(dealId) || null;
  const { isAvailable, isLoading } = useDealAvailability(deal);

  // Banner que cobre os botões + glow verde (altura ajustada)
  const unavailableBanner = !isLoading && !isAvailable ? (
    <div 
      className="absolute left-0 right-0 z-50 px-8"
      style={{ 
        bottom: '88px', // Posicionado sobre os botões (antes do footer)
        height: '80px', // Altura aumentada para cobrir glow verde
        pointerEvents: 'auto' // Banner é clicável (para o link Contact Us)
      }}
    >
      {/* Overlay premium escuro com gradient */}
      <div 
        className="absolute inset-0 backdrop-blur-sm"
        style={{
          background: 'linear-gradient(180deg, rgba(15, 15, 20, 0.97) 0%, rgba(10, 10, 15, 0.98) 100%)',
          boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Conteúdo compacto - 2 linhas */}
        <div className="flex flex-col items-center justify-center h-full gap-0.5 px-4 py-2">
          {/* Linha 1: Título principal com ícone (compacto) */}
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-red-500 flex-shrink-0" strokeWidth={2.5} />
            <p className="text-sm font-bold text-white tracking-wide">
              Not Available in Your Location
            </p>
          </div>
          
          {/* Linha 2: Texto secundário com link clicável */}
          <p className="text-xs font-normal text-white/75 text-center leading-tight">
            <Link 
              href="/contact-us" 
              className="text-[#077124] hover:text-[#088929] hover:underline cursor-pointer font-semibold transition-colors duration-200"
            >
              Contact us
            </Link>
            {' '}if you have any questions.
          </p>
        </div>
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

