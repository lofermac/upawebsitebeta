'use client';

import React, { useState } from 'react';
import BlockConfigModal from '../BlockConfigModal';

interface SectionHeadingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (text: string) => void;
}

const SectionHeadingModal: React.FC<SectionHeadingModalProps> = ({
  isOpen,
  onClose,
  onInsert,
}) => {
  const [text, setText] = useState('Section Title');

  const handleSubmit = () => {
    if (text.trim()) {
      onInsert(text);
      setText('Section Title');
      onClose();
    }
  };

  return (
    <BlockConfigModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Insert Section Heading (H2)"
    >
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Heading Text
        </label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124] text-white"
          placeholder="Enter section heading..."
          autoFocus
        />
      </div>

      {/* Preview */}
      <div className="mt-6 p-6 bg-white/5 border border-white/10 rounded-xl">
        <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider">Preview:</p>
        <h2 className="text-white text-2xl md:text-3xl font-bold"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)', letterSpacing: '-0.015em' }}>
          {text || 'Section Title'}
        </h2>
      </div>
    </BlockConfigModal>
  );
};

export default SectionHeadingModal;

