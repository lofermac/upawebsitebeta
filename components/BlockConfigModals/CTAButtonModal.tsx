'use client';

import React, { useState } from 'react';
import BlockConfigModal from '../BlockConfigModal';
import Link from 'next/link';

interface CTAButtonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (text: string, url: string) => void;
}

const CTAButtonModal: React.FC<CTAButtonModalProps> = ({
  isOpen,
  onClose,
  onInsert,
}) => {
  const [text, setText] = useState('Click Here');
  const [url, setUrl] = useState('');

  const handleSubmit = () => {
    if (text.trim() && url.trim()) {
      onInsert(text, url);
      setText('Click Here');
      setUrl('');
      onClose();
    }
  };

  return (
    <BlockConfigModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Insert CTA Button"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Button Text
          </label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124] text-white"
            placeholder="Enter button text..."
            autoFocus
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Button URL
          </label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124] text-white"
            placeholder="https://example.com"
          />
        </div>
      </div>

      {/* Preview */}
      <div className="mt-6 p-6 bg-white/5 border border-white/10 rounded-xl">
        <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider">Preview:</p>
        <div className="flex justify-center">
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

