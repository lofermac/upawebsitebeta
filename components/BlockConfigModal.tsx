'use client';

import React, { ReactNode } from 'react';
import { X, Trash2 } from 'lucide-react';

interface BlockConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  children: ReactNode;
  submitText?: string;
  onDelete?: () => void;
  disabled?: boolean;
}

const BlockConfigModal: React.FC<BlockConfigModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  children,
  submitText = 'Insert Block',
  onDelete,
  disabled = false,
}) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this block? This action cannot be undone.')) {
      onDelete?.();
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-black rounded-2xl border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-black border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <div className="flex items-center gap-2">
            {/* Delete Button - only show when onDelete is provided (editing mode) */}
            {onDelete && (
              <button
                onClick={handleDelete}
                className="p-2 hover:bg-red-500/10 rounded-lg transition-colors group"
                type="button"
                title="Delete Block"
              >
                <Trash2 className="w-5 h-5 text-red-400 group-hover:text-red-300" />
              </button>
            )}
            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              type="button"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">{children}</div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-black border-t border-white/10 px-6 py-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={disabled}
              className={`px-6 py-2.5 rounded-lg text-white font-bold transition-all duration-300 shadow-lg ${
                disabled
                  ? 'bg-gray-600 cursor-not-allowed opacity-50'
                  : 'bg-gradient-to-b from-[#088929] to-[#055a1c] hover:from-[#0a9b30] hover:to-[#066820] shadow-[#077124]/30'
              }`}
            >
              {submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlockConfigModal;

