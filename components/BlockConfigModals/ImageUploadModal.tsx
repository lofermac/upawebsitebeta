'use client';

import React, { useState } from 'react';
import BlockConfigModal from '../BlockConfigModal';
import { Upload, Loader } from 'lucide-react';
import { uploadNewsContentImage } from '@/lib/supabase/news';

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (imageUrl: string) => void;
  title?: string;
  description?: string;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  isOpen,
  onClose,
  onInsert,
  title = 'Insert Image',
  description = 'content-image',
}) => {
  const [src, setSrc] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    console.log('🔍 [ImageUploadModal] Arquivo selecionado:', file);
    
    setUploadingImage(true);
    setUploadError(null);
    
    try {
      console.log('📸 [ImageUploadModal] Chamando uploadNewsContentImage...');
      const publicUrl = await uploadNewsContentImage(file, description);
      console.log('✅ [ImageUploadModal] Upload concluído! URL:', publicUrl);
      
      setSrc(publicUrl);
    } catch (error) {
      console.error('❌ [ImageUploadModal] Erro no upload:', error);
      setUploadError(error instanceof Error ? error.message : 'Failed to upload image. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = () => {
    if (src.trim()) {
      onInsert(src);
      setSrc('');
      setUploadError(null);
      onClose();
    }
  };

  const handleClose = () => {
    setSrc('');
    setUploadError(null);
    onClose();
  };

  return (
    <BlockConfigModal
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      title={title}
      submitText="Insert Image"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Upload Image File
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
                  handleFileUpload(file);
                }
              }}
              className="hidden"
              disabled={uploadingImage}
            />
            <div className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-gray-300 hover:bg-white/10 hover:border-white/20 transition-all duration-200 flex items-center justify-center gap-2">
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
        </div>

        {/* Error Message */}
        {uploadError && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400 text-sm">{uploadError}</p>
          </div>
        )}
      </div>
    </BlockConfigModal>
  );
};

export default ImageUploadModal;

