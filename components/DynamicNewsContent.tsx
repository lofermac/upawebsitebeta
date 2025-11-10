'use client';

import { useEffect, useState } from 'react';

interface DynamicNewsContentProps {
  htmlContent: string;
}

export default function DynamicNewsContent({ htmlContent }: DynamicNewsContentProps) {
  const [processedContent, setProcessedContent] = useState<string>('');

  useEffect(() => {
    // Process premium tables to add proper wrapper structure
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    
    // Process accordions - extract content from data-content attribute
    const accordionBlocks = doc.querySelectorAll('.accordion-block[data-content]');
    accordionBlocks.forEach((accordionBlock) => {
      const dataContent = accordionBlock.getAttribute('data-content');
      if (dataContent) {
        // Find the accordion-content div and set its innerHTML
        const contentDiv = accordionBlock.querySelector('.accordion-content');
        if (contentDiv) {
          contentDiv.innerHTML = dataContent;
        }
      }
    });
    
    // Find all premium table blocks
    const premiumTables = doc.querySelectorAll('.premium-table-block');
    
    premiumTables.forEach((table) => {
      // Create the outer wrapper with all effects
      const outerWrapper = doc.createElement('div');
      outerWrapper.className = 'relative rounded-3xl overflow-hidden mb-8 group/table shadow-2xl';
      
      // Create gradient background
      const gradientBg = doc.createElement('div');
      gradientBg.className = 'absolute inset-0 bg-gradient-to-br from-[#077124]/20 via-emerald-900/30 to-[#077124]/20';
      
      // Create first animated orb
      const orb1 = doc.createElement('div');
      orb1.className = 'absolute top-0 left-1/4 w-96 h-96 bg-[#077124]/20 rounded-full blur-[120px] animate-pulse-slow';
      
      // Create second animated orb
      const orb2 = doc.createElement('div');
      orb2.className = 'absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-[120px] animate-pulse-slow';
      orb2.style.animationDelay = '1.5s';
      
      // Create inner wrapper
      const innerWrapper = doc.createElement('div');
      innerWrapper.className = 'relative border-2 border-[#077124]/30 rounded-3xl overflow-hidden backdrop-blur-sm bg-black/60';
      
      // Move the table content to inner wrapper
      const tableContent = table.querySelector('table');
      if (tableContent) {
        innerWrapper.appendChild(tableContent);
      }
      
      // Create bottom decorative line
      const bottomLine = doc.createElement('div');
      bottomLine.className = 'absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#077124]/60 to-transparent';
      
      // Assemble the structure
      outerWrapper.appendChild(gradientBg);
      outerWrapper.appendChild(orb1);
      outerWrapper.appendChild(orb2);
      outerWrapper.appendChild(innerWrapper);
      outerWrapper.appendChild(bottomLine);
      
      // Replace the original table with the new structure
      if (table.parentNode) {
        table.parentNode.replaceChild(outerWrapper, table);
      }
    });
    
    setProcessedContent(doc.body.innerHTML);
  }, [htmlContent]);

  useEffect(() => {
    // Setup accordion click handlers - simple CSS toggle
    const accordionButtons = document.querySelectorAll('.dynamic-content-wrapper .accordion-toggle');
    
    accordionButtons.forEach((button) => {
      // Check if already initialized
      if (button.hasAttribute('data-accordion-initialized')) {
        return;
      }
      
      button.setAttribute('data-accordion-initialized', 'true');
      
      const handleClick = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Find the parent accordion wrapper
        const accordionWrapper = button.closest('.accordion-block > div');
        if (accordionWrapper) {
          // Simple toggle
          accordionWrapper.classList.toggle('open');
        }
      };
      
      button.addEventListener('click', handleClick);
    });
  }, [processedContent]);

  return (
    <>
      <div 
        className="dynamic-content-wrapper"
        dangerouslySetInnerHTML={{ __html: processedContent }}
      />
      
      <style jsx global>{`
        .dynamic-content-wrapper {
          color: #e5e7eb;
        }

        .dynamic-content-wrapper > * + * {
          margin-top: 0.75em;
        }

        .dynamic-content-wrapper h1 {
          font-size: 2.25rem;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.2;
          margin: 1.5rem 0;
        }

        .dynamic-content-wrapper h2 {
          font-size: 1.875rem;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.3;
          margin: 1.5rem 0;
        }

        .dynamic-content-wrapper h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #ffffff;
          line-height: 1.4;
          margin: 1.25rem 0;
        }

        .dynamic-content-wrapper h4 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #ffffff;
          line-height: 1.5;
          margin: 1rem 0;
        }

        .dynamic-content-wrapper h5 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #ffffff;
          line-height: 1.5;
          margin: 1rem 0;
        }

        .dynamic-content-wrapper p {
          line-height: 1.75;
          color: #d1d5db;
          margin: 1rem 0;
        }

        .dynamic-content-wrapper strong {
          font-weight: 700;
          color: #ffffff;
        }

        .dynamic-content-wrapper em {
          font-style: italic;
        }

        .dynamic-content-wrapper u {
          text-decoration: underline;
        }

        .dynamic-content-wrapper s {
          text-decoration: line-through;
        }

        .dynamic-content-wrapper code {
          background: rgba(255, 255, 255, 0.1);
          color: #10b981;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.875em;
          font-family: 'Courier New', monospace;
        }

        .dynamic-content-wrapper pre {
          background: #18181b;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.5rem;
          color: #e5e7eb;
          font-family: 'Courier New', monospace;
          padding: 1rem;
          overflow-x: auto;
          margin: 1.5rem 0;
        }

        .dynamic-content-wrapper pre code {
          background: none;
          color: inherit;
          padding: 0;
          font-size: 0.875rem;
        }

        .dynamic-content-wrapper blockquote {
          border-left: 4px solid #10b981;
          padding-left: 1rem;
          background: rgba(255, 255, 255, 0.05);
          margin: 1rem 0;
          padding: 0.5rem 1rem;
          border-radius: 0.25rem;
          color: #9ca3af;
        }

        .dynamic-content-wrapper ul,
        .dynamic-content-wrapper ol {
          padding-left: 1.5rem;
          margin: 1rem 0;
        }

        .dynamic-content-wrapper ul {
          list-style-type: disc;
        }

        .dynamic-content-wrapper ol {
          list-style-type: decimal;
        }

        .dynamic-content-wrapper li {
          margin: 0.25rem 0;
          color: #d1d5db;
        }

        .dynamic-content-wrapper a {
          color: #3b82f6;
          text-decoration: underline;
          cursor: pointer;
        }

        .dynamic-content-wrapper a:hover {
          color: #60a5fa;
        }

        /* Override link styles for CTA buttons */
        .dynamic-content-wrapper .cta-button-block a,
        .dynamic-content-wrapper .cta-button,
        .dynamic-content-wrapper a.cta-button,
        .dynamic-content-wrapper .signup-card-cta,
        .dynamic-content-wrapper .banner-cta-button {
          color: white !important;
          text-decoration: none !important;
          background: linear-gradient(to bottom, #088929, #055a1c) !important;
        }

        .dynamic-content-wrapper img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1rem 0;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .dynamic-content-wrapper hr {
          border: none;
          border-top: 2px solid rgba(255, 255, 255, 0.1);
          margin: 2rem 0;
        }

        /* Generic table styles - EXCLUDE premium tables */
        .dynamic-content-wrapper table:not(.group\\/table table) {
          border-collapse: collapse;
          table-layout: fixed;
          width: 100%;
          margin: 1rem 0;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.5rem;
        }

        .dynamic-content-wrapper table:not(.group\\/table table) td,
        .dynamic-content-wrapper table:not(.group\\/table table) th {
          min-width: 1em;
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0.75rem;
          vertical-align: top;
          box-sizing: border-box;
          position: relative;
        }

        .dynamic-content-wrapper table:not(.group\\/table table) th {
          font-weight: 700;
          text-align: left;
          background: rgba(255, 255, 255, 0.05);
          color: #ffffff;
        }

        .dynamic-content-wrapper table:not(.group\\/table table) td {
          color: #d1d5db;
        }

        /* Custom Block Styles */
        .dynamic-content-wrapper .divider-block {
          margin: 2rem 0;
        }

        .dynamic-content-wrapper .section-heading {
          margin: 2rem 0 1rem 0;
        }

        .dynamic-content-wrapper .cta-button-block {
          margin: 2rem 0;
        }

        .dynamic-content-wrapper .banner-image-block {
          margin: 2rem 0;
        }

        .dynamic-content-wrapper .gallery-block {
          margin: 2rem 0;
        }

        .dynamic-content-wrapper .accordion-block {
          margin: 2rem 0;
        }

        .dynamic-content-wrapper .accordion-block .accordion-content {
          display: none;
        }

        .dynamic-content-wrapper .accordion-block .open .accordion-content {
          display: block;
        }

        .dynamic-content-wrapper .accordion-block .open svg {
          transform: rotate(180deg);
        }

        /* Accordion Content Styling - Force white text with maximum specificity */
        .dynamic-content-wrapper .accordion-content * {
          color: #d1d5db !important;
          background-color: transparent !important;
        }

        .dynamic-content-wrapper .accordion-content h4,
        .dynamic-content-wrapper .accordion-content h4 *,
        .dynamic-content-wrapper .accordion-content strong,
        .dynamic-content-wrapper .accordion-content strong * {
          font-size: 1rem;
          font-weight: 700 !important;
          color: #ffffff !important;
          margin: 1rem 0 0.5rem 0;
          background-color: transparent !important;
        }

        .dynamic-content-wrapper .accordion-content h4:first-child {
          margin-top: 0;
        }

        .dynamic-content-wrapper .accordion-content p,
        .dynamic-content-wrapper .accordion-content p *,
        .dynamic-content-wrapper .accordion-content li,
        .dynamic-content-wrapper .accordion-content li *,
        .dynamic-content-wrapper .accordion-content span {
          font-size: 0.9375rem;
          color: #d1d5db !important;
          line-height: 1.6;
          margin: 0.5rem 0;
          background-color: transparent !important;
        }

        .dynamic-content-wrapper .accordion-content ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin: 0.5rem 0 1rem 0;
        }

        .dynamic-content-wrapper .accordion-content li {
          margin: 0.25rem 0;
        }

        .dynamic-content-wrapper .banner-cta-block {
          margin: 3rem 0;
        }

        .dynamic-content-wrapper .banner-cta-block h3,
        .dynamic-content-wrapper .banner-cta-block p {
          text-align: center !important;
          margin-left: auto !important;
          margin-right: auto !important;
        }

        .dynamic-content-wrapper .signup-card-block {
          margin: 3rem 0;
          width: 100% !important;
          max-width: none !important;
        }

        .dynamic-content-wrapper .signup-card-block > div {
          width: 100% !important;
          max-width: none !important;
        }

        /* Premium Table Styles - Structure created dynamically, only table styles here */
        .dynamic-content-wrapper .shadow-2xl table {
          border-collapse: collapse !important;
          width: 100% !important;
          table-layout: fixed !important;
          margin: 0 !important;
          border: none !important;
        }

        .dynamic-content-wrapper .shadow-2xl thead tr {
          background: linear-gradient(to right, rgba(7, 113, 36, 0.4), rgba(7, 113, 36, 0.5), rgba(7, 113, 36, 0.4)) !important;
          border-bottom: 2px solid rgba(7, 113, 36, 0.4) !important;
        }

        .dynamic-content-wrapper .shadow-2xl th {
          padding: 1.25rem 1.5rem !important;
          color: #ffffff !important;
          font-weight: 700 !important;
          font-size: 1rem !important;
          letter-spacing: 0.025em !important;
          text-align: left !important;
          border: none !important;
        }

        .dynamic-content-wrapper .shadow-2xl tbody tr {
          transition: all 0.3s ease !important;
        }

        .dynamic-content-wrapper .shadow-2xl tbody tr:hover {
          background: rgba(7, 113, 36, 0.1) !important;
        }

        .dynamic-content-wrapper .shadow-2xl td {
          padding: 1.25rem 1.5rem !important;
          font-weight: 600 !important;
          transition: color 0.3s ease !important;
          border: none !important;
        }
      `}</style>
    </>
  );
}

