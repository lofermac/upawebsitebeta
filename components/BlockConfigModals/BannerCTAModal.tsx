'use client';

import React, { useState, useEffect } from 'react';
import BlockConfigModal from '../BlockConfigModal';
import Link from 'next/link';

interface BannerCTAModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (
    title: string,
    description: string,
    buttonText: string,
    buttonUrl: string,
    bgColor?: string
  ) => void;
  initialData?: {
    title?: string;
    description?: string;
    buttonText?: string;
    buttonUrl?: string;
  };
  onDelete?: () => void;
}

const BannerCTAModal: React.FC<BannerCTAModalProps> = ({
  isOpen,
  onClose,
  onInsert,
  initialData,
  onDelete,
}) => {
  const [title, setTitle] = useState(initialData?.title || 'Special Offer Available');
  const [description, setDescription] = useState(
    initialData?.description || 'Join us today and get exclusive access to premium features and benefits.'
  );
  const [buttonText, setButtonText] = useState(initialData?.buttonText || 'Learn More');
  const [buttonUrl, setButtonUrl] = useState(initialData?.buttonUrl || '');
  
  // Always use Dark Gray background
  const bgColor = 'from-zinc-900/60 via-black/80 to-zinc-900/60';

  // Update state when initialData changes OR when modal opens
  useEffect(() => {
    if (isOpen && initialData) {
      console.log('🔄 [BannerCTAModal] Loading initial data:', initialData);
      setTitle(initialData.title || 'Special Offer Available');
      setDescription(initialData.description || 'Join us today and get exclusive access to premium features and benefits.');
      setButtonText(initialData.buttonText || 'Learn More');
      setButtonUrl(initialData.buttonUrl || '');
    } else if (isOpen && !initialData) {
      // Reset to defaults when opening for new insert
      console.log('🆕 [BannerCTAModal] Opening for new insert');
      setTitle('Special Offer Available');
      setDescription('Join us today and get exclusive access to premium features and benefits.');
      setButtonText('Learn More');
      setButtonUrl('');
    }
  }, [isOpen, initialData]);

  const handleSubmit = () => {
    if (title.trim() && description.trim() && buttonText.trim() && buttonUrl.trim()) {
      onInsert(title, description, buttonText, buttonUrl, bgColor);
      setTitle('Special Offer Available');
      setDescription('Join us today and get exclusive access to premium features and benefits.');
      setButtonText('Learn More');
      setButtonUrl('');
      onClose();
    }
  };

  const isValid = title.trim() && description.trim() && buttonText.trim() && buttonUrl.trim();

  return (
    <BlockConfigModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Insert Full Width CTA Banner"
      submitText={initialData ? 'Update Block' : 'Insert Block'}
      onDelete={onDelete}
      disabled={!isValid}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Banner Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124] text-white"
            placeholder="Enter banner title..."
            autoFocus
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124] text-white"
            placeholder="Enter description..."
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Button Text
            </label>
            <input
              type="text"
              value={buttonText}
              onChange={(e) => setButtonText(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124] text-white"
              placeholder="Button text..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Button URL
            </label>
            <input
              type="url"
              value={buttonUrl}
              onChange={(e) => setButtonUrl(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124] text-white"
              placeholder="https://..."
            />
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="mt-6 p-6 bg-white/5 border border-white/10 rounded-xl">
        <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider">Preview:</p>
        <div className="relative rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl">
          <div className={`absolute inset-0 bg-gradient-to-br ${bgColor}`}></div>
          <div className="relative border border-white/[0.08] rounded-3xl p-8 text-center">
            <h3
              className="text-white text-xl font-bold mb-3"
              style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)', letterSpacing: '-0.015em' }}
            >
              {title || 'Banner Title'}
            </h3>
            <p className="text-gray-300 text-sm mb-6 max-w-xl mx-auto leading-relaxed">
              {description || 'Description'}
            </p>
            <Link
              href={buttonUrl || '#'}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 text-sm font-bold text-white bg-gradient-to-b from-[#088929] to-[#055a1c] rounded-full"
              style={{
                boxShadow: `0 0 0 1px rgba(255,255,255,0.1), 0 4px 12px rgba(7,113,36,0.3)`,
                pointerEvents: 'none',
              }}
            >
              <span className="relative z-10 tracking-wide drop-shadow-lg">
                {buttonText || 'Learn More'}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </BlockConfigModal>
  );
};

export default BannerCTAModal;

