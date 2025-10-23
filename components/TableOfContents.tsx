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
      rootMargin: "-100px 0px -66% 0px", // Ativa quando seção está próxima ao topo
      threshold: 0.5,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      // Encontrar a entrada mais visível
      let mostVisible = entries[0];
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > (mostVisible?.intersectionRatio || 0)) {
          mostVisible = entry;
        }
      });

      if (mostVisible && mostVisible.isIntersecting) {
        setActiveSection(mostVisible.target.id);
        console.log("Active section:", mostVisible.target.id); // Debug log
      }
    }, observerOptions);

    // Observar todos os H2s
    detectedSections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
        console.log("Observing section:", id); // Debug log
      }
    });

    // Definir primeira seção como ativa inicialmente
    if (detectedSections.length > 0) {
      setActiveSection(detectedSections[0].id);
    }

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [detectedSections]);

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
      // Usar CSS scroll-margin-top para dar respiro visual
      // Esta abordagem funciona com qualquer container scrollável
      element.style.scrollMarginTop = '20px';
      
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      
      console.log("✅ Scroll executado com scroll-margin-top: 200px");
      
      // Verificar posição final após o scroll completar
      setTimeout(() => {
        const distanciaDoTopo = element.getBoundingClientRect().top;
        console.log("📊 Posição final do elemento:", {
          distanciaDoTopo: distanciaDoTopo,
          esperado: "~200px",
          status: distanciaDoTopo > 150 && distanciaDoTopo < 250 ? "✅ Correto" : "❌ Incorreto"
        });
      }, 800);
    } else {
      console.error("❌ Elemento não encontrado:", id);
      console.log("🔍 Verificando H2s disponíveis na página:");
      const allH2s = document.querySelectorAll("article h2");
      allH2s.forEach((h2) => {
        console.log("  - H2 encontrado:", h2.id, "Texto:", h2.textContent);
      });
    }
  };

  return (
    <div className="shrink-0 w-full transition-all duration-300 rounded-2xl bg-white/[0.02] border border-white/[0.08] p-5 backdrop-blur-sm">
      
      {/* Header - Toggle para mobile */}
      <div 
        className="flex cursor-pointer select-none items-center justify-between pb-4 lg:pb-0 border-b lg:border-b-0 border-gray-600 lg:pointer-events-none lg:cursor-default lg:mb-4"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="text-[16px]/[16px] font-bold text-white">Table of Contents</div>
        <svg 
          className={`h-[10px] w-auto lg:hidden transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M14 4.23535L8 11.7648L2 4.23535" stroke="#fff"></path>
        </svg>
      </div>

      {/* Lista de seções */}
      <ul className={`pt-4 ${isExpanded ? "block" : "hidden"} lg:block`}>
        {detectedSections.map((section) => {
          const isActive = activeSection === section.id;
          
          return (
            <li 
              key={section.id}
              className={`
                relative text-[14px]/[18px] font-semibold 
                before:absolute after:absolute 
                pb-4 pl-4 pr-2 
                last:pb-0 last:before:hidden
                before:left-[6px] before:top-2 before:h-full before:w-[3px]
                after:left-[3px] after:top-[3px] after:h-[9px] after:w-[9px] 
                after:rounded-full after:border-2
                transition-all duration-300
                ${isActive 
                  ? "before:bg-[#077124] after:border-[#077124] after:bg-[#077124]" 
                  : "before:bg-gray-600 after:border-gray-600 after:bg-transparent"
                }
              `}
            >
              <a 
                className={`transition-colors duration-300 hover:text-[#077124] ${
                  isActive ? "text-[#077124]" : "text-gray-400"
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

