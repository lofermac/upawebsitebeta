'use client';

import React, { useState } from 'react';
import BlockConfigModal from '../BlockConfigModal';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsert: (images: { src: string; alt: string }[], layout: 2 | 3 | 4 | 5 | 6) => void;
}

const GalleryModal: React.FC<GalleryModalProps> = ({
  isOpen,
  onClose,
  onInsert,
}) => {
  const [layout, setLayout] = useState<2 | 3 | 4 | 5 | 6>(3);
  const [images, setImages] = useState<{ src: string; alt: string }[]>([
    { src: '', alt: 'Gallery image 1' },
    { src: '', alt: 'Gallery image 2' },
    { src: '', alt: 'Gallery image 3' },
  ]);

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
      onClose();
    }
  };

  return (
    <BlockConfigModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Insert Image Gallery"
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
              <input
                type="url"
                value={img.src}
                onChange={(e) => updateImage(index, 'src', e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124] text-white text-sm"
                placeholder="https://example.com/image.jpg"
              />
              <input
                type="text"
                value={img.alt}
                onChange={(e) => updateImage(index, 'alt', e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#077124] text-white text-sm"
                placeholder="Alt text..."
              />
              {img.src && (
                <div className="mt-2 rounded-lg overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-24 object-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </BlockConfigModal>
  );
};

export default GalleryModal;

