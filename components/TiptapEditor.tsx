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
import { useEffect } from 'react';
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
  CodeSquare
} from 'lucide-react';

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
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

  return (
    <div className="bg-zinc-900 border border-white/10 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-zinc-800/50 border-b border-white/10 p-3">
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
      </div>

      {/* Editor Area */}
      <div className="bg-zinc-900/50">
        <EditorContent 
          editor={editor} 
          className="prose-editor"
        />
      </div>

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
      `}</style>
    </div>
  );
}
