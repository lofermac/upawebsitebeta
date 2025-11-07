'use client';

import React, { useState } from 'react';
import BlockConfigModal from '../BlockConfigModal';

interface BannerImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (src: string, alt: string, size: 'small' | 'medium' | 'large') => void;
}

const BannerImageModal: React.FC<BannerImageModalProps> = ({
  isOpen,
  onClose,
  onInsert,
}) => {
  const [src, setSrc] = useState('');
  const [alt, setAlt] = useState('Banner image');
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('large');

  const handleSubmit = () => {
    if (src.trim()) {
      onInsert(src, alt, size);
      setSrc('');
      setAlt('Banner image');
      setSize('large');
      onClose();
    }
  };

  const getSizeLabel = (s: string) => {
    switch (s) {
      case 'small':
        return 'Small (16:3)';
      case 'medium':
        return 'Medium (16:5)';
      case 'large':
        return 'Large (16:9)';
      default:
        return s;
    }
  };

  return (
    <BlockConfigModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Insert Banner Image"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Image URL
          </label>
          <input
            type="url"
            value={src}
            onChange={(e) => setSrc(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124] text-white"
            placeholder="https://example.com/image.jpg"
            autoFocus
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Alt Text
          </label>
          <input
            type="text"
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124] text-white"
            placeholder="Image description..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Banner Size
          </label>
          <div className="grid grid-cols-3 gap-3">
            {['small', 'medium', 'large'].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s as 'small' | 'medium' | 'large')}
                className={`px-4 py-3 rounded-lg border transition-all ${
                  size === s
                    ? 'bg-[#077124]/20 border-[#077124] text-white'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                }`}
              >
                <div className="font-medium text-sm">{getSizeLabel(s)}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Preview */}
      {src && (
        <div className="mt-6 p-6 bg-white/5 border border-white/10 rounded-xl">
          <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider">Preview:</p>
          <div
            className="relative rounded-2xl overflow-hidden shadow-xl"
            style={{
              aspectRatio:
                size === 'small' ? '16/3' : size === 'medium' ? '16/5' : '16/9',
            }}
          >
            <img src={src} alt={alt} className="w-full h-full object-cover" />
          </div>
        </div>
      )}
    </BlockConfigModal>
  );
};

export default BannerImageModal;

