'use client';

import React, { useState, useEffect } from 'react';
import BlockConfigModal from '../BlockConfigModal';

interface SectionHeadingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (text: string) => void;
  initialData?: {
    text?: string;
  };
  onDelete?: () => void;
}

const SectionHeadingModal: React.FC<SectionHeadingModalProps> = ({
  isOpen,
  onClose,
  onInsert,
  initialData,
  onDelete,
}) => {
  const [text, setText] = useState('Section Title');
  const [errors, setErrors] = useState<{ text?: string }>({});

  useEffect(() => {
    if (isOpen && initialData) {
      setText(initialData.text || 'Section Title');
    } else if (isOpen && !initialData) {
      setText('Section Title');
    }
    setErrors({});
  }, [isOpen, initialData]);

  const handleSubmit = () => {
    if (!text.trim()) {
      setErrors({ text: 'Heading text is required' });
      return;
    }

    onInsert(text);
    setText('Section Title');
    setErrors({});
    onClose();
  };

  const isValid = text.trim();

  return (
    <BlockConfigModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Insert Section Heading (H2)"
      submitText={initialData ? 'Update Block' : 'Insert Block'}
      onDelete={onDelete}
      disabled={!isValid}
    >
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Heading Text <span className="text-red-400">*</span>
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
          placeholder="Enter section heading..."
          autoFocus
        />
        {errors.text && (
          <p className="mt-1 text-sm text-red-400">{errors.text}</p>
        )}
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

