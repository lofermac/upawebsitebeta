'use client';

import React, { useState } from 'react';
import BlockConfigModal from '../BlockConfigModal';
import Link from 'next/link';

interface SignUpCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (
    logoSrc: string,
    title: string,
    description: string,
    buttonText: string,
    buttonUrl: string,
    bgColor?: string
  ) => void;
}

const SignUpCardModal: React.FC<SignUpCardModalProps> = ({
  isOpen,
  onClose,
  onInsert,
}) => {
  const [logoSrc, setLogoSrc] = useState('');
  const [title, setTitle] = useState('Create Your Account Today');
  const [description, setDescription] = useState(
    'Join thousands of players and start enjoying exclusive benefits.'
  );
  const [buttonText, setButtonText] = useState('Sign Up Now');
  const [buttonUrl, setButtonUrl] = useState('');

  const handleSubmit = () => {
    if (
      logoSrc.trim() &&
      title.trim() &&
      description.trim() &&
      buttonText.trim() &&
      buttonUrl.trim()
    ) {
      onInsert(logoSrc, title, description, buttonText, buttonUrl);
      setLogoSrc('');
      setTitle('Create Your Account Today');
      setDescription('Join thousands of players and start enjoying exclusive benefits.');
      setButtonText('Sign Up Now');
      setButtonUrl('');
      onClose();
    }
  };

  return (
    <BlockConfigModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Insert Sign Up Card"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Logo URL
          </label>
          <input
            type="url"
            value={logoSrc}
            onChange={(e) => setLogoSrc(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124] text-white"
            placeholder="https://example.com/logo.png"
            autoFocus
          />
          {logoSrc && (
            <div className="mt-2 p-2 bg-black/40 rounded-lg inline-block">
              <img src={logoSrc} alt="Logo preview" className="w-20 h-20 object-contain" />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Card Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124] text-white"
            placeholder="Enter card title..."
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
            rows={2}
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
        <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider">Preview (Full Width):</p>
        <div className="relative rounded-3xl overflow-hidden shadow-2xl w-full">
          <div className="absolute inset-0 bg-gradient-to-br from-[#077124]/20 via-emerald-900/30 to-[#077124]/20"></div>
          <div className="relative border-2 border-[#077124]/30 rounded-3xl p-6 backdrop-blur-sm bg-black/40">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 justify-center">
              {/* Logo */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-2xl bg-black/80 border border-white/10 flex items-center justify-center shadow-lg">
                  {logoSrc ? (
                    <img src={logoSrc} alt="Logo" className="w-full h-full object-contain p-2" />
                  ) : (
                    <span className="text-white text-lg font-bold">LOGO</span>
                  )}
                </div>
              </div>
              {/* Text Content */}
              <div className="flex-1 text-center md:text-left">
                <h3
                  className="text-white text-xl font-bold mb-2"
                  style={{ textShadow: '0 2px 12px rgba(0,0,0,0.6)', letterSpacing: '-0.015em' }}
                >
                  {title || 'Card Title'}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {description || 'Description'}
                </p>
              </div>
              {/* Button */}
              <div className="flex-shrink-0">
                <Link
                  href={buttonUrl || '#'}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 text-sm font-bold text-white bg-gradient-to-b from-[#088929] to-[#055a1c] rounded-full whitespace-nowrap"
                  style={{
                    boxShadow: `0 0 0 1px rgba(255,255,255,0.1), 0 1px 3px 0 rgba(0,0,0,0.5), 0 4px 12px rgba(7,113,36,0.4), 0 8px 32px rgba(7,113,36,0.3), inset 0 1px 1px rgba(255,255,255,0.3), inset 0 -1px 1px rgba(0,0,0,0.2)`,
                    pointerEvents: 'none',
                  }}
                >
                  <span className="relative z-10 tracking-wide drop-shadow-lg">
                    {buttonText || 'Sign Up Now'}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BlockConfigModal>
  );
};

export default SignUpCardModal;

