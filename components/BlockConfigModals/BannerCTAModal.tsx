'use client';

import React, { useState } from 'react';
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
}

const BannerCTAModal: React.FC<BannerCTAModalProps> = ({
  isOpen,
  onClose,
  onInsert,
}) => {
  const [title, setTitle] = useState('Special Offer Available');
  const [description, setDescription] = useState(
    'Join us today and get exclusive access to premium features and benefits.'
  );
  const [buttonText, setButtonText] = useState('Learn More');
  const [buttonUrl, setButtonUrl] = useState('');
  const [bgColor, setBgColor] = useState('from-zinc-900/60 via-black/80 to-zinc-900/60');

  // Predefined color options
  const colorOptions = [
    { name: 'Dark Gray (Default)', value: 'from-zinc-900/60 via-black/80 to-zinc-900/60' },
    { name: 'Green', value: 'from-[#077124]/20 via-emerald-900/30 to-[#077124]/20' },
    { name: 'Blue', value: 'from-blue-900/20 via-blue-950/30 to-blue-900/20' },
    { name: 'Purple', value: 'from-purple-900/20 via-purple-950/30 to-purple-900/20' },
    { name: 'Red', value: 'from-red-900/20 via-red-950/30 to-red-900/20' },
    { name: 'Orange', value: 'from-orange-900/20 via-orange-950/30 to-orange-900/20' },
  ];

  const handleSubmit = () => {
    if (title.trim() && description.trim() && buttonText.trim() && buttonUrl.trim()) {
      onInsert(title, description, buttonText, buttonUrl, bgColor);
      setTitle('Special Offer Available');
      setDescription('Join us today and get exclusive access to premium features and benefits.');
      setButtonText('Learn More');
      setButtonUrl('');
      setBgColor('from-zinc-900/60 via-black/80 to-zinc-900/60');
      onClose();
    }
  };

  return (
    <BlockConfigModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Insert Full Width CTA Banner"
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

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Background Color Theme
          </label>
          <select
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124] text-white"
          >
            {colorOptions.map((option) => (
              <option key={option.value} value={option.value} className="bg-[#1a1a1a]">
                {option.name}
              </option>
            ))}
          </select>
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

