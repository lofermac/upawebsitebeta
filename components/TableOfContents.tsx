"use client";

import { useState, useEffect } from "react";
import { useScrollSpy } from '@mantine/hooks';

// Constante única para posicionamento
const SCROLL_OFFSET = 140; // px do topo da tela (breathing room abaixo do header)

interface TableOfContentsProps {
  sections?: { id: string; title: string }[]; // Opcional: para uso futuro
}

export default function TableOfContents() {
  const [isExpanded, setIsExpanded] = useState(false);

  // Mantine useScrollSpy detecta automaticamente H2s e tracking
  const spy = useScrollSpy({
    selector: 'article h2',
    offset: SCROLL_OFFSET,
  });

  const { reinitialize } = spy;  // Pegar função de re-scan

  // Re-inicializar quando conteúdo carregar
  useEffect(() => {
    // Tentar re-scan após 100ms, 300ms, 500ms e 1000ms
    const timers = [
      setTimeout(() => reinitialize(), 100),
      setTimeout(() => reinitialize(), 300),
      setTimeout(() => reinitialize(), 500),
      setTimeout(() => reinitialize(), 1000),
    ];

    // Cleanup
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [reinitialize]);

  // DEBUG: Verificar estado do spy
  console.log('🔍 [TOC Debug]', {
    initialized: spy.initialized,
    dataLength: spy.data.length,
    activeIndex: spy.active,
    data: spy.data,
    selector: 'article h2'
  });

  // Função de scroll ao clicar
  const handleScrollToSection = (heading: { id: string; value: string; getNode: () => HTMLElement }) => {
    console.log('🖱️ Click:', heading.value);
    
    const element = heading.getNode();
    console.log('📍 Element:', element);
    
    if (!element) {
      console.error('❌ Element not found!');
      return;
    }

    // Fechar menu mobile
    setIsExpanded(false);

    // Calcular posição com offset
    const yOffset = -SCROLL_OFFSET;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY + yOffset;
    
    console.log('📊 Scroll Info:', {
      elementTop: elementPosition,
      windowScrollY: window.scrollY,
      yOffset: yOffset,
      calculatedY: offsetPosition,
      scrollOffset: SCROLL_OFFSET
    });

    // Tentar método 1: scrollIntoView (mais robusto)
    try {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // Ajustar para o offset correto após 0ms
      setTimeout(() => {
        window.scrollBy({
          top: yOffset,
          behavior: 'smooth'
        });
      }, 0);
      
      console.log('✅ Scroll executed via scrollIntoView + scrollBy');
    } catch {
      // Fallback: método original
      console.warn('⚠️ scrollIntoView failed, using window.scrollTo fallback');
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Se não houver seções detectadas, mostrar placeholder para debug
  if (!spy.initialized) {
    return (
      <div className="shrink-0 w-full transition-all duration-300 rounded-2xl bg-white/[0.02] border border-white/[0.08] p-5 backdrop-blur-sm">
        <div className="text-yellow-400 text-sm">⏳ Loading Table of Contents...</div>
      </div>
    );
  }

  if (spy.data.length === 0) {
    return (
      <div className="shrink-0 w-full transition-all duration-300 rounded-2xl bg-white/[0.02] border border-white/[0.08] p-5 backdrop-blur-sm">
        <div className="text-red-400 text-sm">❌ No H2 headings found</div>
        <div className="text-gray-500 text-xs mt-2">Selector: article h2</div>
      </div>
    );
  }

  return (
    <div className="shrink-0 w-full transition-all duration-300 rounded-2xl bg-white/[0.02] border border-white/[0.08] p-5 backdrop-blur-sm hover:border-white/[0.12] hover:bg-white/[0.03]">
      
      {/* Header - Toggle para mobile */}
      <div 
        className="flex cursor-pointer select-none items-center justify-between pb-4 lg:pb-0 border-b lg:border-b-0 border-white/[0.08] lg:pointer-events-none lg:cursor-default lg:mb-4"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="text-[16px]/[16px] font-bold text-white tracking-tight">Table of Contents</div>
        <svg 
          className={`h-[10px] w-auto lg:hidden transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M14 4.23535L8 11.7648L2 4.23535" stroke="#fff" strokeWidth="2"></path>
        </svg>
      </div>

      {/* Lista de seções */}
      <ul className={`pt-4 space-y-1 ${isExpanded ? "block" : "hidden"} lg:block`}>
        {spy.data.map((heading, index) => {
          const isActive = index === spy.active;
          
          return (
            <li 
              key={heading.id}
              className={`
                relative text-[14px]/[18px] font-semibold 
                before:absolute after:absolute 
                pb-3 pl-4 pr-2 
                last:pb-0 last:before:hidden
                before:left-[6px] before:top-2 before:h-full before:w-[2px]
                after:left-[3.5px] after:top-[4px] after:h-[7px] after:w-[7px] 
                after:rounded-full after:border-[2px]
                transition-all duration-300
                ${isActive 
                  ? "before:bg-[#077124] after:border-[#077124] after:bg-[#077124] after:shadow-[0_0_8px_rgba(7,113,36,0.5)]" 
                  : "before:bg-white/[0.15] after:border-white/[0.2] after:bg-transparent"
                }
              `}
            >
              <button
                onClick={() => handleScrollToSection(heading)}
                className={`transition-colors duration-300 hover:text-[#077124] block text-left w-full ${
                  isActive ? "text-[#077124]" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {heading.value}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
