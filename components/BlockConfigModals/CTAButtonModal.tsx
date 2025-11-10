'use client';

import React, { useState, useEffect } from 'react';
import BlockConfigModal from '../BlockConfigModal';
import Link from 'next/link';

interface CTAButtonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (text: string, url: string, align: 'left' | 'center' | 'right') => void;
  initialData?: {
    text?: string;
    url?: string;
    align?: 'left' | 'center' | 'right';
  };
  onDelete?: () => void;
}

const CTAButtonModal: React.FC<CTAButtonModalProps> = ({
  isOpen,
  onClose,
  onInsert,
  initialData,
  onDelete,
}) => {
  const [text, setText] = useState('Click Here');
  const [url, setUrl] = useState('');
  const [align, setAlign] = useState<'left' | 'center' | 'right'>('center');
  const [errors, setErrors] = useState<{ text?: string; url?: string }>({});

  useEffect(() => {
    if (isOpen && initialData) {
      setText(initialData.text || 'Click Here');
      setUrl(initialData.url || '');
      setAlign(initialData.align || 'center');
    } else if (isOpen && !initialData) {
      setText('Click Here');
      setUrl('');
      setAlign('center');
    }
    setErrors({});
  }, [isOpen, initialData]);

  const handleSubmit = () => {
    const newErrors: typeof errors = {};

    if (!text.trim()) {
      newErrors.text = 'Button text is required';
    }
    if (!url.trim()) {
      newErrors.url = 'Button URL is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onInsert(text, url, align);
    setText('Click Here');
    setUrl('');
    setAlign('center');
    setErrors({});
    onClose();
  };

  const isValid = text.trim() && url.trim();

  return (
    <BlockConfigModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Insert CTA Button"
      submitText={initialData ? 'Update Block' : 'Insert Block'}
      onDelete={onDelete}
      disabled={!isValid}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Button Text <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (errors.text) setErrors({ ...errors, text: undefined });
            }}
            className={`w-full px-4 py-3 bg-white/5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124] text-white ${
              errors.text ? 'border-red-500' : 'border-white/10'
            }`}
            placeholder="Enter button text..."
            autoFocus
          />
          {errors.text && (
            <p className="mt-1 text-sm text-red-400">{errors.text}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Button URL <span className="text-red-400">*</span>
          </label>
          <input
            type="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (errors.url) setErrors({ ...errors, url: undefined });
            }}
            className={`w-full px-4 py-3 bg-white/5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124] text-white ${
              errors.url ? 'border-red-500' : 'border-white/10'
            }`}
            placeholder="https://example.com"
          />
          {errors.url && (
            <p className="mt-1 text-sm text-red-400">{errors.url}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Button Alignment
          </label>
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setAlign('left')}
              className={`px-4 py-3 rounded-lg border transition-all ${
                align === 'left'
                  ? 'bg-[#077124]/20 border-[#077124] text-white'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-current"></div>
                <span className="text-sm font-medium">Left</span>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setAlign('center')}
              className={`px-4 py-3 rounded-lg border transition-all ${
                align === 'center'
                  ? 'bg-[#077124]/20 border-[#077124] text-white'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-current"></div>
                <span className="text-sm font-medium">Center</span>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setAlign('right')}
              className={`px-4 py-3 rounded-lg border transition-all ${
                align === 'right'
                  ? 'bg-[#077124]/20 border-[#077124] text-white'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-end gap-2">
                <div className="w-2 h-2 rounded-full bg-current"></div>
                <span className="text-sm font-medium">Right</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="mt-6 p-6 bg-white/5 border border-white/10 rounded-xl">
        <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider">Preview:</p>
        <div className={`flex ${
          align === 'left' ? 'justify-start' : 
          align === 'right' ? 'justify-end' : 
          'justify-center'
        }`}>
          <Link
            href={url || '#'}
            className="group/btn relative inline-flex items-center justify-center gap-3 px-10 py-4 text-base font-bold text-white bg-gradient-to-b from-[#088929] to-[#055a1c] rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.05]"
            style={{
              boxShadow: `
                0 0 0 1px rgba(255,255,255,0.1),
                0 1px 3px 0 rgba(0,0,0,0.5),
                0 4px 12px rgba(7,113,36,0.3),
                0 8px 32px rgba(7,113,36,0.25),
                inset 0 1px 1px rgba(255,255,255,0.3),
                inset 0 -1px 1px rgba(0,0,0,0.2)
              `,
              pointerEvents: 'none'
            }}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#077124] via-[#0a9b30] to-[#077124] rounded-full blur-xl opacity-60"></div>
            <span className="relative z-10 tracking-wide drop-shadow-lg">{text || 'Click Here'}</span>
          </Link>
        </div>
      </div>
    </BlockConfigModal>
  );
};

export default CTAButtonModal;

