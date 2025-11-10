'use client';

import React, { useState, useEffect } from 'react';
import BlockConfigModal from '../BlockConfigModal';
import { Link2, ExternalLink } from 'lucide-react';

interface LinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (url: string, text?: string) => void;
  initialData?: {
    url?: string;
    text?: string;
  };
}

const LinkModal: React.FC<LinkModalProps> = ({
  isOpen,
  onClose,
  onInsert,
  initialData,
}) => {
  const [url, setUrl] = useState('');
  const [text, setText] = useState('');
  const [errors, setErrors] = useState<{ url?: string }>({});

  useEffect(() => {
    if (isOpen && initialData) {
      setUrl(initialData.url || '');
      setText(initialData.text || '');
    } else if (isOpen && !initialData) {
      setUrl('');
      setText('');
    }
    setErrors({});
  }, [isOpen, initialData]);

  const validateUrl = (urlString: string): boolean => {
    if (!urlString.trim()) return false;
    
    try {
      // Check if it's a valid URL or starts with common protocols
      if (urlString.startsWith('http://') || urlString.startsWith('https://') || urlString.startsWith('/')) {
        new URL(urlString, 'https://example.com');
        return true;
      }
      // Try adding https:// and validate
      new URL('https://' + urlString);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = () => {
    const newErrors: typeof errors = {};

    if (!url.trim()) {
      newErrors.url = 'URL is required';
    } else if (!validateUrl(url)) {
      newErrors.url = 'Please enter a valid URL (e.g., https://example.com or /page)';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Normalize URL
    let normalizedUrl = url.trim();
    if (!normalizedUrl.startsWith('http') && !normalizedUrl.startsWith('/')) {
      normalizedUrl = 'https://' + normalizedUrl;
    }

    onInsert(normalizedUrl, text.trim() || undefined);
    setUrl('');
    setText('');
    setErrors({});
    onClose();
  };

  const isValid = url.trim() && validateUrl(url);

  return (
    <BlockConfigModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Insert/Edit Link"
      submitText={initialData ? 'Update Link' : 'Insert Link'}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Link URL <span className="text-red-400">*</span>
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
            placeholder="https://example.com or /page"
            autoFocus
          />
          {errors.url && (
            <p className="mt-1 text-sm text-red-400">{errors.url}</p>
          )}
          <p className="mt-1 text-xs text-gray-400">
            Enter a full URL or a relative path starting with /
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Link Text <span className="text-gray-500">(optional)</span>
          </label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124] text-white"
            placeholder="Leave empty to use selected text"
          />
          <p className="mt-1 text-xs text-gray-400">
            If empty, the currently selected text will be used
          </p>
        </div>
      </div>

      {/* Preview */}
      <div className="mt-6 p-6 bg-white/5 border border-white/10 rounded-xl">
        <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider">Preview:</p>
        <div className="flex items-center gap-2">
          <Link2 className="w-4 h-4 text-blue-400" />
          <a
            href={url || '#'}
            className="text-blue-500 underline hover:text-blue-400 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.preventDefault()}
          >
            {text || url || 'Your link text here'}
          </a>
          <ExternalLink className="w-3 h-3 text-gray-400" />
        </div>
      </div>

      {/* Submit button override to add disabled state */}
      <style jsx global>{`
        .link-modal-submit-override button[type="submit"] {
          opacity: ${isValid ? '1' : '0.5'};
          cursor: ${isValid ? 'pointer' : 'not-allowed'};
          pointer-events: ${isValid ? 'auto' : 'none'};
        }
      `}</style>
    </BlockConfigModal>
  );
};

export default LinkModal;

