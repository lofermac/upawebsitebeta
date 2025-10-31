"use client";

import { useEffect, useState, useRef } from "react";

interface TableOfContentsProps {
  sections?: { id: string; title: string }[]; // Opcional: virá do backend no futuro
}

export default function TableOfContents({ sections }: TableOfContentsProps) {
  const [detectedSections, setDetectedSections] = useState<{ id: string; title: string }[]>([]);
  const [activeSection, setActiveSection] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Função para converter título em id válido (kebab-case)
  const slugify = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "") // Remove caracteres especiais
      .replace(/\s+/g, "-") // Substitui espaços por hífens
      .replace(/--+/g, "-") // Remove hífens duplicados
      .trim();
  };

  useEffect(() => {
    // Se sections foi passado como prop, usar ele; senão, detectar do DOM
    if (sections && sections.length > 0) {
      setDetectedSections(sections);
      return;
    }

    // Detectar H2s do DOM
    const h2Elements = document.querySelectorAll("article h2");
    
    if (h2Elements.length === 0) {
      return; // Não renderizar se não houver H2s
    }

    const sectionsFromDOM: { id: string; title: string }[] = [];

    h2Elements.forEach((h2) => {
      const title = h2.textContent || "";
      let id = h2.id; // Usar o id existente se houver
      
      // Se não tiver id, criar um usando slugify
      if (!id) {
        id = slugify(title);
        h2.id = id;
      }

      sectionsFromDOM.push({ id, title });
      console.log("📋 Seção detectada:", { id, title });
    });

    setDetectedSections(sectionsFromDOM);
    console.log("✅ Total de seções detectadas:", sectionsFromDOM.length);
  }, [sections]);

  useEffect(() => {
    if (detectedSections.length === 0) return;

    // Configurar Intersection Observer para detectar seção visível
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    };

    const observedElements: Element[] = [];

    observerRef.current = new IntersectionObserver((entries) => {
      const intersectingEntries = entries.filter(entry => entry.isIntersecting);
      
      if (intersectingEntries.length > 0) {
        const mostVisible = intersectingEntries.reduce((prev, current) => {
          return (current.intersectionRatio > prev.intersectionRatio) ? current : prev;
        });
        
        setActiveSection(mostVisible.target.id);
        console.log("✅ Active section:", mostVisible.target.id);
      }
    }, observerOptions);

    // Observar todos os elementos
    detectedSections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
        observedElements.push(element);
        console.log("👀 Observing:", id);
      }
    });

    // Fallback: Scroll listener para garantir detecção
    const handleScroll = () => {
      let currentSection = detectedSections[0].id;
      let minDistance = Infinity;

      detectedSections.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Considera a seção ativa se estiver próxima ao topo (entre -100px e +300px)
          const distance = Math.abs(rect.top - 120);
          
          if (rect.top < 300 && rect.top > -100 && distance < minDistance) {
            minDistance = distance;
            currentSection = id;
          }
        }
      });

      setActiveSection(currentSection);
    };

    // Throttle do scroll para performance
    let scrollTimeout: NodeJS.Timeout;
    const throttledScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 50); // Reduzido para 50ms para mais responsividade
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });

    // Chamar handleScroll imediatamente para definir seção inicial correta
    handleScroll();

    // Definir primeira seção como ativa inicialmente se nenhuma foi detectada
    if (detectedSections.length > 0 && !activeSection) {
      setActiveSection(detectedSections[0].id);
    }

    // Cleanup
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      if (observerRef.current) {
        observedElements.forEach(element => {
          observerRef.current?.unobserve(element);
        });
        observerRef.current.disconnect();
      }
    };
  }, [detectedSections, activeSection]);

  // Se não houver seções, não renderizar
  if (detectedSections.length === 0) {
    return null;
  }

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    console.log("🔵 Clicou na seção:", id);
    
    const element = document.getElementById(id);
    console.log("🔵 Elemento encontrado:", element);
    
    if (element) {
      // Fechar o menu mobile após clicar
      setIsExpanded(false);
      
      // Scroll suave com offset
      const yOffset = -100; // Offset do topo
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
      
      console.log("✅ Scroll executado");
      
      // Verificar posição final após o scroll completar
      setTimeout(() => {
        const distanciaDoTopo = element.getBoundingClientRect().top;
        console.log("📊 Posição final do elemento:", {
          distanciaDoTopo: distanciaDoTopo,
          esperado: "~100px",
          status: distanciaDoTopo > 80 && distanciaDoTopo < 120 ? "✅ Correto" : "❌ Incorreto"
        });
      }, 800);
    } else {
      console.error("❌ Elemento não encontrado:", id);
      console.log("🔍 Verificando elementos disponíveis na página:");
      const allElements = document.querySelectorAll("article [id]");
      allElements.forEach((el) => {
        console.log("  - Elemento encontrado:", el.id, "Tag:", el.tagName);
      });
    }
  };

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
        {detectedSections.map((section) => {
          const isActive = activeSection === section.id;
          
          return (
            <li 
              key={section.id}
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
              <a 
                className={`transition-colors duration-300 hover:text-[#077124] block ${
                  isActive ? "text-[#077124]" : "text-gray-400 hover:text-gray-200"
                }`}
                href={`#${section.id}`}
                onClick={(e) => handleLinkClick(e, section.id)}
              >
                {section.title}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

