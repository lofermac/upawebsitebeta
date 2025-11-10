'use client';

import React, { useState, useEffect } from 'react';
import BlockConfigModal from '../BlockConfigModal';
import { uploadNewsContentImage } from '@/lib/supabase/news';
import { Upload, Loader } from 'lucide-react';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (images: { src: string; alt: string }[], layout: 2 | 3 | 4 | 5 | 6) => void;
  initialData?: {
    images?: { src: string; alt: string }[];
    layout?: 2 | 3 | 4 | 5 | 6;
  };
  onDelete?: () => void;
}

const GalleryModal: React.FC<GalleryModalProps> = ({
  isOpen,
  onClose,
  onInsert,
  initialData,
  onDelete,
}) => {
  const [layout, setLayout] = useState<2 | 3 | 4 | 5 | 6>(3);
  const [images, setImages] = useState<{ src: string; alt: string }[]>([
    { src: '', alt: 'Gallery image 1' },
    { src: '', alt: 'Gallery image 2' },
    { src: '', alt: 'Gallery image 3' },
  ]);
  const [uploadingIndexes, setUploadingIndexes] = useState<number[]>([]);

  useEffect(() => {
    if (isOpen && initialData) {
      setLayout(initialData.layout || 3);
      setImages(initialData.images || [
        { src: '', alt: 'Gallery image 1' },
        { src: '', alt: 'Gallery image 2' },
        { src: '', alt: 'Gallery image 3' },
      ]);
    } else if (isOpen && !initialData) {
      setLayout(3);
      setImages([
        { src: '', alt: 'Gallery image 1' },
        { src: '', alt: 'Gallery image 2' },
        { src: '', alt: 'Gallery image 3' },
      ]);
    }
  }, [isOpen, initialData]);

  const handleImageUpload = async (file: File, index: number) => {
    console.log(`🔍 [GalleryModal] Arquivo selecionado para imagem ${index + 1}:`, file);
    
    setUploadingIndexes([...uploadingIndexes, index]);
    
    try {
      console.log(`📸 [GalleryModal] Chamando uploadNewsContentImage para gallery-${index + 1}...`);
      const url = await uploadNewsContentImage(file, `gallery-${index + 1}`);
      console.log(`✅ [GalleryModal] Upload concluído! URL:`, url);
      
      updateImage(index, 'src', url);
    } catch (error) {
      console.error(`❌ [GalleryModal] Erro no upload da imagem ${index + 1}:`, error);
      alert(error instanceof Error ? error.message : 'Failed to upload image. Please try again.');
    } finally {
      setUploadingIndexes(uploadingIndexes.filter(i => i !== index));
    }
  };

  const handleLayoutChange = (newLayout: 2 | 3 | 4 | 5 | 6) => {
    setLayout(newLayout);
    const newImages = Array.from({ length: newLayout }, (_, i) => ({
      src: images[i]?.src || '',
      alt: images[i]?.alt || `Gallery image ${i + 1}`,
    }));
    setImages(newImages);
  };

  const updateImage = (index: number, field: 'src' | 'alt', value: string) => {
    const newImages = [...images];
    newImages[index][field] = value;
    setImages(newImages);
  };

  const handleSubmit = () => {
    const validImages = images.filter((img) => img.src.trim());
    if (validImages.length > 0) {
      onInsert(validImages, layout);
      setLayout(3);
      setImages([
        { src: '', alt: 'Gallery image 1' },
        { src: '', alt: 'Gallery image 2' },
        { src: '', alt: 'Gallery image 3' },
      ]);
      setUploadingIndexes([]);
      onClose();
    }
  };

  return (
    <BlockConfigModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Insert Image Gallery"
      submitText={initialData ? 'Update Block' : 'Insert Block'}
      onDelete={onDelete}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Gallery Layout
          </label>
          <div className="grid grid-cols-5 gap-2">
            {[2, 3, 4, 5, 6].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handleLayoutChange(num as 2 | 3 | 4 | 5 | 6)}
                className={`px-4 py-3 rounded-lg border transition-all ${
                  layout === num
                    ? 'bg-[#077124]/20 border-[#077124] text-white'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                }`}
              >
                <div className="font-bold text-lg">{num}</div>
                <div className="text-xs">images</div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {images.map((img, index) => (
            <div
              key={index}
              className="p-4 bg-white/5 border border-white/10 rounded-lg space-y-2"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-400">
                  Image {index + 1}
                </span>
              </div>

              {/* Preview inline (se já houver imagem) */}
              {img.src && (
                <div className="mb-2 rounded-lg overflow-hidden border border-white/10">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-24 object-cover"
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
                      handleImageUpload(file, index);
                    }
                  }}
                  className="hidden"
                  disabled={uploadingIndexes.includes(index)}
                />
                <div className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/10 hover:border-white/20 transition-all duration-200 flex items-center justify-center gap-2">
                  {uploadingIndexes.includes(index) ? (
                    <>
                      <Loader className="w-3 h-3 animate-spin" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-3 h-3" />
                      <span>{img.src ? 'Change Image' : `Upload Image ${index + 1}`}</span>
                    </>
                  )}
                </div>
              </label>
              <p className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP or GIF (max 10MB)</p>
              
              {/* Alt Text */}
              <input
                type="text"
                value={img.alt}
                onChange={(e) => updateImage(index, 'alt', e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124] text-white text-sm"
                placeholder="Alt text..."
              />
            </div>
          ))}
        </div>
      </div>
    </BlockConfigModal>
  );
};

export default GalleryModal;

