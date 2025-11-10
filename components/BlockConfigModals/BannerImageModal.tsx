'use client';

import React, { useState, useEffect } from 'react';
import BlockConfigModal from '../BlockConfigModal';
import { uploadNewsContentImage } from '@/lib/supabase/news';
import { Upload, Loader } from 'lucide-react';

interface BannerImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (src: string, alt: string, size: 'small' | 'medium' | 'large') => void;
  initialData?: {
    src?: string;
    alt?: string;
    size?: 'small' | 'medium' | 'large';
  };
  onDelete?: () => void;
}

const BannerImageModal: React.FC<BannerImageModalProps> = ({
  isOpen,
  onClose,
  onInsert,
  initialData,
  onDelete,
}) => {
  const [src, setSrc] = useState('');
  const [alt, setAlt] = useState('Banner image');
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('large');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ src?: string; alt?: string }>({});

  useEffect(() => {
    if (isOpen && initialData) {
      setSrc(initialData.src || '');
      setAlt(initialData.alt || 'Banner image');
      setSize(initialData.size || 'large');
    } else if (isOpen && !initialData) {
      setSrc('');
      setAlt('Banner image');
      setSize('large');
    }
    setErrors({});
  }, [isOpen, initialData]);

  const handleImageUpload = async (file: File) => {
    console.log('🔍 [BannerImageModal] Arquivo selecionado:', file);
    
    setUploadingImage(true);
    setUploadError(null);
    
    try {
      console.log('📸 [BannerImageModal] Chamando uploadNewsContentImage...');
      const publicUrl = await uploadNewsContentImage(file, 'banner-image');
      console.log('✅ [BannerImageModal] Upload concluído! URL:', publicUrl);
      
      setSrc(publicUrl);
    } catch (error) {
      console.error('❌ [BannerImageModal] Erro no upload:', error);
      setUploadError(error instanceof Error ? error.message : 'Failed to upload image. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = () => {
    const newErrors: typeof errors = {};

    if (!src.trim()) {
      newErrors.src = 'Image is required';
    }
    if (!alt.trim()) {
      newErrors.alt = 'Alt text is required for accessibility';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onInsert(src, alt, size);
    setSrc('');
    setAlt('Banner image');
    setSize('large');
    setUploadError(null);
    setErrors({});
    onClose();
  };

  const isValid = src.trim() && alt.trim();

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
      submitText={initialData ? 'Update Block' : 'Insert Block'}
      onDelete={onDelete}
      disabled={!isValid}
    >
      <div className="space-y-4">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Upload Banner Image <span className="text-red-400">*</span>
          </label>
          
          {/* Preview da imagem (se já houver) */}
          {src && (
            <div className="mb-3 relative rounded-lg overflow-hidden border border-white/10">
              <img 
                src={src} 
                alt="Preview" 
                className="w-full h-48 object-cover"
              />
            </div>
          )}
          
          {/* Botão de Upload */}
          <label className="relative cursor-pointer block">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleImageUpload(file);
                  if (errors.src) setErrors({ ...errors, src: undefined });
                }
              }}
              className="hidden"
              disabled={uploadingImage}
            />
            <div className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-sm text-gray-300 hover:bg-white/10 hover:border-white/20 transition-all duration-200 flex items-center justify-center gap-2 ${
              errors.src ? 'border-red-500' : 'border-white/10'
            }`}>
              {uploadingImage ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>{src ? 'Change Image' : 'Upload Image'}</span>
                </>
              )}
            </div>
          </label>
          <p className="text-xs text-gray-400 mt-2">JPG, PNG, WEBP or GIF (max 10MB)</p>
          {errors.src && (
            <p className="mt-1 text-sm text-red-400">{errors.src}</p>
          )}
        </div>

        {/* Error Message */}
        {uploadError && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-sm">{uploadError}</p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Alt Text <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={alt}
            onChange={(e) => {
              setAlt(e.target.value);
              if (errors.alt) setErrors({ ...errors, alt: undefined });
            }}
            className={`w-full px-4 py-3 bg-white/5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124] text-white ${
              errors.alt ? 'border-red-500' : 'border-white/10'
            }`}
            placeholder="Image description..."
          />
          {errors.alt && (
            <p className="mt-1 text-sm text-red-400">{errors.alt}</p>
          )}
          <p className="text-xs text-gray-400 mt-1">Describe the image for accessibility</p>
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
    </BlockConfigModal>
  );
};

export default BannerImageModal;

