'use client';

import React, { useState } from 'react';
import BlockConfigModal from '../BlockConfigModal';
import { ChevronDown, ChevronUp, Plus, Trash2, GripVertical } from 'lucide-react';

interface AccordionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (title: string, content: string) => void;
}

interface ContentSection {
  id: string;
  type: 'heading' | 'paragraph' | 'list';
  content: string;
  items?: string[]; // For list type
}

const AccordionModal: React.FC<AccordionModalProps> = ({
  isOpen,
  onClose,
  onInsert,
}) => {
  const [title, setTitle] = useState('Terms & Conditions');
  const [sections, setSections] = useState<ContentSection[]>([
    { id: '1', type: 'heading', content: 'Important Information' },
    { id: '2', type: 'paragraph', content: 'Please read these terms carefully before proceeding.' },
    { id: '3', type: 'list', content: '', items: ['Item 1', 'Item 2', 'Item 3'] },
  ]);
  const [previewOpen, setPreviewOpen] = useState(true);

  const addSection = (type: 'heading' | 'paragraph' | 'list') => {
    const newSection: ContentSection = {
      id: Date.now().toString(),
      type,
      content: type === 'heading' ? 'New Heading' : type === 'paragraph' ? 'New paragraph text...' : '',
      items: type === 'list' ? ['Item 1'] : undefined,
    };
    setSections([...sections, newSection]);
  };

  const removeSection = (id: string) => {
    setSections(sections.filter(s => s.id !== id));
  };

  const updateSection = (id: string, updates: Partial<ContentSection>) => {
    setSections(sections.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const addListItem = (sectionId: string) => {
    setSections(sections.map(s => {
      if (s.id === sectionId && s.items) {
        return { ...s, items: [...s.items, 'New item'] };
      }
      return s;
    }));
  };

  const updateListItem = (sectionId: string, itemIndex: number, value: string) => {
    setSections(sections.map(s => {
      if (s.id === sectionId && s.items) {
        const newItems = [...s.items];
        newItems[itemIndex] = value;
        return { ...s, items: newItems };
      }
      return s;
    }));
  };

  const removeListItem = (sectionId: string, itemIndex: number) => {
    setSections(sections.map(s => {
      if (s.id === sectionId && s.items) {
        return { ...s, items: s.items.filter((_, i) => i !== itemIndex) };
      }
      return s;
    }));
  };

  const generateHTML = (): string => {
    let html = '';
    sections.forEach(section => {
      if (section.type === 'heading') {
        html += `<h4 style="margin-left: 0px;"><span style="background-color: transparent; color: rgb(0, 0, 0);"><strong>${section.content}</strong></span></h4>`;
      } else if (section.type === 'paragraph') {
        html += `<p><span style="background-color: transparent; color: rgb(0, 0, 0);">${section.content}</span></p>`;
      } else if (section.type === 'list' && section.items) {
        html += '<ul>';
        section.items.forEach(item => {
          html += `<li><span style="background-color: transparent; color: rgb(0, 0, 0);">${item}</span></li>`;
        });
        html += '</ul>';
      }
    });
    return html;
  };

  const handleSubmit = () => {
    if (title.trim() && sections.length > 0) {
      const htmlContent = generateHTML();
      onInsert(title, htmlContent);
      // Reset form
      setTitle('Terms & Conditions');
      setSections([
        { id: '1', type: 'heading', content: 'Important Information' },
        { id: '2', type: 'paragraph', content: 'Please read these terms carefully before proceeding.' },
        { id: '3', type: 'list', content: '', items: ['Item 1', 'Item 2', 'Item 3'] },
      ]);
      onClose();
    }
  };

  return (
    <BlockConfigModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Insert Accordion / Expandable"
    >
      <div className="space-y-4">
        {/* Accordion Title */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Accordion Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124] text-white"
            placeholder="Enter accordion title..."
            autoFocus
          />
        </div>

        {/* Content Sections */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-300">
              Content Sections
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => addSection('heading')}
                className="text-xs px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg transition-colors font-medium"
              >
                + Heading
              </button>
              <button
                type="button"
                onClick={() => addSection('paragraph')}
                className="text-xs px-3 py-1.5 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 rounded-lg transition-colors font-medium"
              >
                + Paragraph
              </button>
              <button
                type="button"
                onClick={() => addSection('list')}
                className="text-xs px-3 py-1.5 bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded-lg transition-colors font-medium"
              >
                + List
              </button>
            </div>
          </div>

          {/* Sections List */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {sections.map((section) => (
              <div key={section.id} className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <GripVertical className="w-5 h-5 text-gray-500 flex-shrink-0 mt-2" />
                  <div className="flex-1 space-y-2">
                    {/* Section Type Badge */}
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-1 rounded ${
                        section.type === 'heading' ? 'bg-blue-600/20 text-blue-400' :
                        section.type === 'paragraph' ? 'bg-purple-600/20 text-purple-400' :
                        'bg-green-600/20 text-green-400'
                      }`}>
                        {section.type === 'heading' ? '📌 Heading' : 
                         section.type === 'paragraph' ? '📝 Paragraph' : '📋 List'}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeSection(section.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Heading Input */}
                    {section.type === 'heading' && (
                      <input
                        type="text"
                        value={section.content}
                        onChange={(e) => updateSection(section.id, { content: e.target.value })}
                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-sm font-semibold"
                        placeholder="Heading text..."
                      />
                    )}

                    {/* Paragraph Input */}
                    {section.type === 'paragraph' && (
                      <textarea
                        value={section.content}
                        onChange={(e) => updateSection(section.id, { content: e.target.value })}
                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white text-sm"
                        placeholder="Paragraph text..."
                        rows={3}
                      />
                    )}

                    {/* List Items */}
                    {section.type === 'list' && section.items && (
                      <div className="space-y-2">
                        {section.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center gap-2">
                            <span className="text-gray-400 text-sm">•</span>
                            <input
                              type="text"
                              value={item}
                              onChange={(e) => updateListItem(section.id, itemIndex, e.target.value)}
                              className="flex-1 px-3 py-2 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white text-sm"
                              placeholder="List item..."
                            />
                            <button
                              type="button"
                              onClick={() => removeListItem(section.id, itemIndex)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addListItem(section.id)}
                          className="text-xs px-3 py-1.5 bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded-lg transition-colors font-medium flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          Add Item
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="mt-6">
        <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider">Preview:</p>
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#0d0d0d] via-[#121212] to-[#0d0d0d] border border-white/[0.08]">
          <button
            type="button"
            onClick={() => setPreviewOpen(!previewOpen)}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
          >
            <span className="text-white text-lg font-semibold">{title || 'Accordion Title'}</span>
            {previewOpen ? (
              <ChevronUp className="w-5 h-5 text-[#077124]" strokeWidth={2.5} />
            ) : (
              <ChevronDown className="w-5 h-5 text-[#077124]" strokeWidth={2.5} />
            )}
          </button>
          {previewOpen && (
            <div className="px-6 pb-6 border-t border-white/[0.05] pt-6">
              <div className="prose prose-sm prose-invert max-w-none space-y-3">
                {sections.map(section => {
                  if (section.type === 'heading') {
                    return <h4 key={section.id} className="text-white font-bold text-base mb-2">{section.content}</h4>;
                  } else if (section.type === 'paragraph') {
                    return <p key={section.id} className="text-gray-300 text-sm leading-relaxed">{section.content}</p>;
                  } else if (section.type === 'list' && section.items) {
                    return (
                      <ul key={section.id} className="space-y-1">
                        {section.items.map((item, i) => (
                          <li key={i} className="text-gray-300 text-sm">{item}</li>
                        ))}
                      </ul>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </BlockConfigModal>
  );
};

export default AccordionModal;

