'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { Image } from '@tiptap/extension-image';
import { Link } from '@tiptap/extension-link';
import { TextAlign } from '@tiptap/extension-text-align';
import { Underline } from '@tiptap/extension-underline';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { useEffect, useState, useCallback } from 'react';
import {
  DividerNode,
  SectionHeadingNode,
  CTAButtonNode,
  BannerImageNode,
  GalleryNode,
  AccordionNode,
  BannerCTANode,
  SignUpCardNode,
  PremiumTableNode,
} from '@/lib/tiptap/nodes';
import {
  SectionHeadingModal,
  CTAButtonModal,
  BannerImageModal,
  GalleryModal,
  AccordionModal,
  BannerCTAModal,
  SignUpCardModal,
  PremiumTableModal,
} from './BlockConfigModals';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ImageIcon,
  Link2,
  Quote,
  Minus,
  Table as TableIcon,
  Plus,
  Trash2,
  CodeSquare,
  Megaphone,
  Image as ImagePlus,
  Grid3x3,
  ChevronDown,
  MousePointerClick,
  UserPlus,
  Type,
  Table2,
} from 'lucide-react';

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  // Modal states
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Image,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 underline',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      TextStyle,
      Color,
      // Custom Block Nodes
      DividerNode,
      SectionHeadingNode,
      CTAButtonNode,
      BannerImageNode,
      GalleryNode,
      AccordionNode,
      BannerCTANode,
      SignUpCardNode,
      PremiumTableNode,
    ],
    content: content || '<p></p>',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none focus:outline-none min-h-[500px] p-6',
      },
    },
  });

  useEffect(() => {
    if (editor && content && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  // Setup accordion click handlers in the editor
  const setupAccordionHandlers = useCallback(() => {
    // First, inject content from data-content attribute
    const accordionBlocks = document.querySelectorAll('.prose-editor .accordion-block[data-content]');
    accordionBlocks.forEach((accordionBlock) => {
      const dataContent = accordionBlock.getAttribute('data-content');
      if (dataContent) {
        const contentDiv = accordionBlock.querySelector('.accordion-content');
        if (contentDiv && contentDiv.innerHTML.trim() === '') {
          contentDiv.innerHTML = dataContent;
        }
      }
    });

    // Then setup click handlers
    const accordionButtons = document.querySelectorAll('.prose-editor .accordion-toggle');
    accordionButtons.forEach((button) => {
      // Check if already has listener
      if (button.hasAttribute('data-accordion-initialized')) {
        return;
      }
      
      button.setAttribute('data-accordion-initialized', 'true');
      
      // Add click listener
      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const accordionWrapper = button.closest('.accordion-block > div');
        if (accordionWrapper) {
          accordionWrapper.classList.toggle('open');
        }
      });
    });
  }, []);

  useEffect(() => {
    if (!editor) return;

    // Setup handlers initially and on every update
    setupAccordionHandlers();
    editor.on('update', setupAccordionHandlers);

    return () => {
      editor.off('update', setupAccordionHandlers);
    };
  }, [editor, setupAccordionHandlers]);

  if (!editor) {
    return (
      <div className="bg-zinc-900 border border-white/10 rounded-lg p-6">
        <div className="animate-pulse flex flex-col gap-3">
          <div className="h-10 bg-white/5 rounded"></div>
          <div className="h-64 bg-white/5 rounded"></div>
        </div>
      </div>
    );
  }

  const addImage = () => {
    const url = window.prompt('Enter image URL:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const url = window.prompt('Enter URL:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    } else {
      editor.chain().focus().unsetLink().run();
    }
  };

  const insertTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  // Block insert functions
  const insertDivider = () => {
    editor?.chain().focus().setDivider().run();
  };

  const insertSectionHeading = (text: string) => {
    editor?.chain().focus().setSectionHeading({ text }).run();
  };

  const insertCTAButton = (text: string, url: string) => {
    editor?.chain().focus().setCTAButton({ text, url }).run();
  };

  const insertBannerImage = (src: string, alt: string, size: 'small' | 'medium' | 'large') => {
    editor?.chain().focus().setBannerImage({ src, alt, size }).run();
  };

  const insertGallery = (images: { src: string; alt: string }[], layout: 2 | 3 | 4 | 5 | 6) => {
    editor?.chain().focus().setGallery({ images, layout }).run();
  };

  const insertAccordion = (title: string, content: string) => {
    editor?.chain().focus().setAccordion({ title, content }).run();
  };

  const insertBannerCTA = (
    title: string,
    description: string,
    buttonText: string,
    buttonUrl: string
  ) => {
    editor?.chain().focus().setBannerCTA({ title, description, buttonText, buttonUrl }).run();
  };

  const insertSignUpCard = (
    logoSrc: string,
    title: string,
    description: string,
    buttonText: string,
    buttonUrl: string
  ) => {
    editor
      ?.chain()
      .focus()
      .setSignUpCard({ logoSrc, title, description, buttonText, buttonUrl })
      .run();
  };

  const insertPremiumTable = (headers: string[], rows: string[][]) => {
    editor?.chain().focus().setPremiumTable({ data: { headers, rows } }).run();
  };

  return (
    <div className="bg-zinc-900 border border-white/10 rounded-lg">
      {/* Toolbar - Sticky */}
      <div className="sticky top-0 z-[100] bg-zinc-800 border-b border-white/10 p-3 backdrop-blur-md shadow-lg">
        <div className="flex flex-wrap gap-1">
          {/* Text Formatting */}
          <div className="flex gap-1 pr-2 border-r border-white/10">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-2 rounded transition-all ${
                editor.isActive('bold')
                  ? 'bg-white/20 text-white'
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
              title="Bold (Ctrl+B)"
              type="button"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-2 rounded transition-all ${
                editor.isActive('italic')
                  ? 'bg-white/20 text-white'
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
              title="Italic (Ctrl+I)"
              type="button"
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`p-2 rounded transition-all ${
                editor.isActive('underline')
                  ? 'bg-white/20 text-white'
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
              title="Underline (Ctrl+U)"
              type="button"
            >
              <UnderlineIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`p-2 rounded transition-all ${
                editor.isActive('strike')
                  ? 'bg-white/20 text-white'
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
              title="Strikethrough"
              type="button"
            >
              <Strikethrough className="w-4 h-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleCode().run()}
              className={`p-2 rounded transition-all ${
                editor.isActive('code')
                  ? 'bg-white/20 text-white'
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
              title="Inline Code"
              type="button"
            >
              <Code className="w-4 h-4" />
            </button>
          </div>

          {/* Headings */}
          <div className="flex gap-1 px-2 border-r border-white/10">
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={`px-3 py-2 rounded text-sm font-bold transition-all ${
                editor.isActive('heading', { level: 1 })
                  ? 'bg-white/20 text-white'
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
              title="Heading 1"
              type="button"
            >
              <Heading1 className="w-4 h-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={`px-3 py-2 rounded text-sm font-bold transition-all ${
                editor.isActive('heading', { level: 2 })
                  ? 'bg-white/20 text-white'
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
              title="Heading 2"
              type="button"
            >
              <Heading2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={`px-3 py-2 rounded text-sm font-bold transition-all ${
                editor.isActive('heading', { level: 3 })
                  ? 'bg-white/20 text-white'
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
              title="Heading 3"
              type="button"
            >
              <Heading3 className="w-4 h-4" />
            </button>
          </div>

          {/* Lists */}
          <div className="flex gap-1 px-2 border-r border-white/10">
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`p-2 rounded transition-all ${
                editor.isActive('bulletList')
                  ? 'bg-white/20 text-white'
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
              title="Bullet List"
              type="button"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`p-2 rounded transition-all ${
                editor.isActive('orderedList')
                  ? 'bg-white/20 text-white'
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
              title="Numbered List"
              type="button"
            >
              <ListOrdered className="w-4 h-4" />
            </button>
          </div>

          {/* Alignment */}
          <div className="flex gap-1 px-2 border-r border-white/10">
            <button
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              className={`p-2 rounded transition-all ${
                editor.isActive({ textAlign: 'left' })
                  ? 'bg-white/20 text-white'
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
              title="Align Left"
              type="button"
            >
              <AlignLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              className={`p-2 rounded transition-all ${
                editor.isActive({ textAlign: 'center' })
                  ? 'bg-white/20 text-white'
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
              title="Align Center"
              type="button"
            >
              <AlignCenter className="w-4 h-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              className={`p-2 rounded transition-all ${
                editor.isActive({ textAlign: 'right' })
                  ? 'bg-white/20 text-white'
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
              title="Align Right"
              type="button"
            >
              <AlignRight className="w-4 h-4" />
            </button>
          </div>

          {/* Insert Elements */}
          <div className="flex gap-1 px-2 border-r border-white/10">
            <button
              onClick={addImage}
              className="p-2 rounded transition-all text-gray-400 hover:bg-white/10 hover:text-white"
              title="Insert Image"
              type="button"
            >
              <ImageIcon className="w-4 h-4" />
            </button>
            <button
              onClick={setLink}
              className={`p-2 rounded transition-all ${
                editor.isActive('link')
                  ? 'bg-white/20 text-white'
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
              title="Insert Link"
              type="button"
            >
              <Link2 className="w-4 h-4" />
            </button>
            <button
              onClick={insertTable}
              className="p-2 rounded transition-all text-gray-400 hover:bg-white/10 hover:text-white"
              title="Insert Table"
              type="button"
            >
              <TableIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Block Elements */}
          <div className="flex gap-1 px-2 border-r border-white/10">
            <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={`p-2 rounded transition-all ${
                editor.isActive('blockquote')
                  ? 'bg-white/20 text-white'
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
              title="Blockquote"
              type="button"
            >
              <Quote className="w-4 h-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={`p-2 rounded transition-all ${
                editor.isActive('codeBlock')
                  ? 'bg-white/20 text-white'
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
              title="Code Block"
              type="button"
            >
              <CodeSquare className="w-4 h-4" />
            </button>
            <button
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              className="p-2 rounded transition-all text-gray-400 hover:bg-white/10 hover:text-white"
              title="Horizontal Line"
              type="button"
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>

          {/* Table Actions (show only when inside table) */}
          {editor.isActive('table') && (
            <div className="flex gap-1 px-2">
              <button
                onClick={() => editor.chain().focus().addColumnAfter().run()}
                className="p-2 rounded transition-all text-gray-400 hover:bg-white/10 hover:text-white"
                title="Add Column After"
                type="button"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={() => editor.chain().focus().addRowAfter().run()}
                className="p-2 rounded transition-all text-gray-400 hover:bg-white/10 hover:text-white"
                title="Add Row After"
                type="button"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={() => editor.chain().focus().deleteTable().run()}
                className="p-2 rounded transition-all text-red-400 hover:bg-red-500/20 hover:text-red-300"
                title="Delete Table"
                type="button"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Custom Blocks Row */}
        <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t border-white/10">
          <span className="text-xs text-gray-400 px-2 py-2 font-semibold">BLOCKS:</span>
          
          <button
            onClick={() => setActiveModal('sectionHeading')}
            className="p-2 rounded transition-all text-gray-400 hover:bg-[#077124]/20 hover:text-[#077124] border border-white/5"
            title="Section Heading (H2)"
            type="button"
          >
            <Type className="w-4 h-4" />
          </button>

          <button
            onClick={insertDivider}
            className="p-2 rounded transition-all text-gray-400 hover:bg-[#077124]/20 hover:text-[#077124] border border-white/5"
            title="Insert Divider"
            type="button"
          >
            <Minus className="w-4 h-4" />
          </button>

          <button
            onClick={() => setActiveModal('ctaButton')}
            className="p-2 rounded transition-all text-gray-400 hover:bg-[#077124]/20 hover:text-[#077124] border border-white/5"
            title="CTA Button"
            type="button"
          >
            <MousePointerClick className="w-4 h-4" />
          </button>

          <button
            onClick={() => setActiveModal('bannerImage')}
            className="p-2 rounded transition-all text-gray-400 hover:bg-[#077124]/20 hover:text-[#077124] border border-white/5"
            title="Banner Image"
            type="button"
          >
            <ImagePlus className="w-4 h-4" />
          </button>

          <button
            onClick={() => setActiveModal('gallery')}
            className="p-2 rounded transition-all text-gray-400 hover:bg-[#077124]/20 hover:text-[#077124] border border-white/5"
            title="Image Gallery"
            type="button"
          >
            <Grid3x3 className="w-4 h-4" />
          </button>

          <button
            onClick={() => setActiveModal('accordion')}
            className="p-2 rounded transition-all text-gray-400 hover:bg-[#077124]/20 hover:text-[#077124] border border-white/5"
            title="Accordion / Expandable"
            type="button"
          >
            <ChevronDown className="w-4 h-4" />
          </button>

          <button
            onClick={() => setActiveModal('bannerCTA')}
            className="p-2 rounded transition-all text-gray-400 hover:bg-[#077124]/20 hover:text-[#077124] border border-white/5"
            title="Full Width CTA Banner"
            type="button"
          >
            <Megaphone className="w-4 h-4" />
          </button>

          <button
            onClick={() => setActiveModal('signUpCard')}
            className="p-2 rounded transition-all text-gray-400 hover:bg-[#077124]/20 hover:text-[#077124] border border-white/5"
            title="Sign Up Card"
            type="button"
          >
            <UserPlus className="w-4 h-4" />
          </button>

          <button
            onClick={() => setActiveModal('premiumTable')}
            className="p-2 rounded transition-all text-gray-400 hover:bg-[#077124]/20 hover:text-[#077124] border border-white/5"
            title="Premium Table"
            type="button"
          >
            <Table2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editor Area */}
      <div className="bg-zinc-900/50">
        <EditorContent 
          editor={editor} 
          className="prose-editor"
        />
      </div>

      {/* Modals */}
      <SectionHeadingModal
        isOpen={activeModal === 'sectionHeading'}
        onClose={() => setActiveModal(null)}
        onInsert={(text) => {
          insertSectionHeading(text);
          setActiveModal(null);
        }}
      />

      <CTAButtonModal
        isOpen={activeModal === 'ctaButton'}
        onClose={() => setActiveModal(null)}
        onInsert={(text, url) => {
          insertCTAButton(text, url);
          setActiveModal(null);
        }}
      />

      <BannerImageModal
        isOpen={activeModal === 'bannerImage'}
        onClose={() => setActiveModal(null)}
        onInsert={(src, alt, size) => {
          insertBannerImage(src, alt, size);
          setActiveModal(null);
        }}
      />

      <GalleryModal
        isOpen={activeModal === 'gallery'}
        onClose={() => setActiveModal(null)}
        onInsert={(images, layout) => {
          insertGallery(images, layout);
          setActiveModal(null);
        }}
      />

      <AccordionModal
        isOpen={activeModal === 'accordion'}
        onClose={() => setActiveModal(null)}
        onInsert={(title, content) => {
          insertAccordion(title, content);
          setActiveModal(null);
        }}
      />

      <BannerCTAModal
        isOpen={activeModal === 'bannerCTA'}
        onClose={() => setActiveModal(null)}
        onInsert={(title, description, buttonText, buttonUrl) => {
          insertBannerCTA(title, description, buttonText, buttonUrl);
          setActiveModal(null);
        }}
      />

      <SignUpCardModal
        isOpen={activeModal === 'signUpCard'}
        onClose={() => setActiveModal(null)}
        onInsert={(logoSrc, title, description, buttonText, buttonUrl) => {
          insertSignUpCard(logoSrc, title, description, buttonText, buttonUrl);
          setActiveModal(null);
        }}
      />

      <PremiumTableModal
        isOpen={activeModal === 'premiumTable'}
        onClose={() => setActiveModal(null)}
        onInsert={(headers, rows) => {
          insertPremiumTable(headers, rows);
          setActiveModal(null);
        }}
      />

      {/* Custom Styles for Editor Content */}
      <style jsx global>{`
        .prose-editor .tiptap {
          padding: 1.5rem;
          min-height: 500px;
          color: #e5e7eb;
          outline: none;
        }

        .prose-editor .tiptap > * + * {
          margin-top: 0.75em;
        }

        .prose-editor .tiptap h1 {
          font-size: 2.25rem;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.2;
        }

        .prose-editor .tiptap h2 {
          font-size: 1.875rem;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.3;
        }

        .prose-editor .tiptap h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #ffffff;
          line-height: 1.4;
        }

        .prose-editor .tiptap p {
          line-height: 1.75;
          color: #d1d5db;
        }

        .prose-editor .tiptap strong {
          font-weight: 700;
          color: #ffffff;
        }

        .prose-editor .tiptap em {
          font-style: italic;
        }

        .prose-editor .tiptap u {
          text-decoration: underline;
        }

        .prose-editor .tiptap s {
          text-decoration: line-through;
        }

        .prose-editor .tiptap code {
          background: rgba(255, 255, 255, 0.1);
          color: #10b981;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.875em;
          font-family: 'Courier New', monospace;
        }

        .prose-editor .tiptap pre {
          background: #18181b;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.5rem;
          color: #e5e7eb;
          font-family: 'Courier New', monospace;
          padding: 1rem;
          overflow-x: auto;
        }

        .prose-editor .tiptap pre code {
          background: none;
          color: inherit;
          padding: 0;
          font-size: 0.875rem;
        }

        .prose-editor .tiptap blockquote {
          border-left: 4px solid #10b981;
          padding-left: 1rem;
          background: rgba(255, 255, 255, 0.05);
          margin: 1rem 0;
          padding: 0.5rem 1rem;
          border-radius: 0.25rem;
          color: #9ca3af;
        }

        .prose-editor .tiptap ul,
        .prose-editor .tiptap ol {
          padding-left: 1.5rem;
        }

        .prose-editor .tiptap ul {
          list-style-type: disc;
        }

        .prose-editor .tiptap ol {
          list-style-type: decimal;
        }

        .prose-editor .tiptap li {
          margin: 0.25rem 0;
          color: #d1d5db;
        }

        .prose-editor .tiptap a {
          color: #3b82f6;
          text-decoration: underline;
          cursor: pointer;
        }

        .prose-editor .tiptap a:hover {
          color: #60a5fa;
        }

        .prose-editor .tiptap img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1rem 0;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .prose-editor .tiptap hr {
          border: none;
          border-top: 2px solid rgba(255, 255, 255, 0.1);
          margin: 2rem 0;
        }

        .prose-editor .tiptap table {
          border-collapse: collapse;
          table-layout: fixed;
          width: 100%;
          margin: 1rem 0;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.5rem;
        }

        .prose-editor .tiptap table td,
        .prose-editor .tiptap table th {
          min-width: 1em;
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0.75rem;
          vertical-align: top;
          box-sizing: border-box;
          position: relative;
        }

        .prose-editor .tiptap table th {
          font-weight: 700;
          text-align: left;
          background: rgba(255, 255, 255, 0.05);
          color: #ffffff;
        }

        .prose-editor .tiptap table td {
          color: #d1d5db;
        }

        .prose-editor .tiptap .selectedCell {
          background: rgba(16, 185, 129, 0.1);
        }

        .prose-editor .tiptap p.is-editor-empty:first-child::before {
          color: #6b7280;
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }

        /* Custom Block Styles */
        .prose-editor .tiptap .divider-block {
          margin: 2rem 0;
        }

        .prose-editor .tiptap .section-heading {
          margin: 2rem 0 1rem 0;
        }

        .prose-editor .tiptap .cta-button-block {
          margin: 2rem 0;
        }

        .prose-editor .tiptap .banner-image-block {
          margin: 2rem 0;
        }

        .prose-editor .tiptap .gallery-block {
          margin: 2rem 0;
        }

        .prose-editor .tiptap .accordion-block {
          margin: 2rem 0;
        }

        .prose-editor .tiptap .accordion-block .accordion-content {
          display: none;
        }

        .prose-editor .tiptap .accordion-block .open .accordion-content {
          display: block;
        }

        .prose-editor .tiptap .accordion-block .open svg {
          transform: rotate(180deg);
        }

        /* Accordion Content Styling - Force white text with maximum specificity */
        .prose-editor .tiptap .accordion-content * {
          color: #d1d5db !important;
          background-color: transparent !important;
        }

        .prose-editor .tiptap .accordion-content h4,
        .prose-editor .tiptap .accordion-content h4 *,
        .prose-editor .tiptap .accordion-content strong,
        .prose-editor .tiptap .accordion-content strong * {
          font-size: 1rem;
          font-weight: 700 !important;
          color: #ffffff !important;
          margin: 1rem 0 0.5rem 0;
          background-color: transparent !important;
        }

        .prose-editor .tiptap .accordion-content h4:first-child {
          margin-top: 0;
        }

        .prose-editor .tiptap .accordion-content p,
        .prose-editor .tiptap .accordion-content p *,
        .prose-editor .tiptap .accordion-content li,
        .prose-editor .tiptap .accordion-content li *,
        .prose-editor .tiptap .accordion-content span {
          font-size: 0.9375rem;
          color: #d1d5db !important;
          line-height: 1.6;
          margin: 0.5rem 0;
          background-color: transparent !important;
        }

        .prose-editor .tiptap .accordion-content ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin: 0.5rem 0 1rem 0;
        }

        .prose-editor .tiptap .accordion-content li {
          margin: 0.25rem 0;
        }

        .prose-editor .tiptap .banner-cta-block {
          margin: 3rem 0;
        }

        .prose-editor .tiptap .signup-card-block {
          margin: 3rem 0;
          width: 100% !important;
          max-width: none !important;
        }

        .prose-editor .tiptap .signup-card-block > div {
          width: 100% !important;
          max-width: none !important;
        }

        .prose-editor .tiptap .premium-table-block {
          margin: 2rem 0;
        }
      `}</style>
    </div>
  );
}
