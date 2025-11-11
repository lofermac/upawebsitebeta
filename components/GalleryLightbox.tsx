'use client';

import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryLightboxProps {
  images: { src: string; alt?: string }[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function GalleryLightbox({ images, initialIndex, isOpen, onClose }: GalleryLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [savedScrollPosition, setSavedScrollPosition] = useState(0);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (!isOpen) return;

    // Save current scroll position when opening
    const scrollY = window.scrollY;
    setSavedScrollPosition(scrollY);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Prevent scroll on body
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      
      // Restore scroll
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, savedScrollPosition);
    };
  }, [isOpen, currentIndex, images.length, savedScrollPosition]);

  const handleClose = () => {
    onClose();
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center"
      onClick={handleClose}
    >
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 group"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-black/50 border border-white/20 backdrop-blur-md">
        <p className="text-white text-sm font-semibold">
          {currentIndex + 1} / {images.length}
        </p>
      </div>

      {/* Main Image */}
      <div 
        className="relative w-full h-full flex items-center justify-center px-16 md:px-24"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentImage.src}
          alt={currentImage.alt || `Image ${currentIndex + 1}`}
          className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
        />

        {/* Alt Text / Caption */}
        {currentImage.alt && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 max-w-2xl px-6 py-3 rounded-xl bg-black/70 border border-white/10 backdrop-blur-md">
            <p className="text-white text-sm text-center">{currentImage.alt}</p>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>
        </>
      )}

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-black/50 border border-white/20 backdrop-blur-md max-w-[90vw] overflow-x-auto scrollbar-hide">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                goToIndex(index);
              }}
              className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                index === currentIndex
                  ? 'border-[#077124] scale-110 shadow-lg shadow-[#077124]/50'
                  : 'border-white/20 hover:border-white/40 opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={img.src}
                alt={img.alt || `Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Instructions Hint (fade out after 3s) */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-40 px-4 py-2 rounded-lg bg-black/50 border border-white/10 backdrop-blur-md animate-fade-out">
        <p className="text-white/70 text-xs">
          Use ← → arrows or swipe to navigate • ESC to close
        </p>
      </div>

      <style jsx global>{`
        @keyframes fade-out {
          0%, 70% { opacity: 1; }
          100% { opacity: 0; }
        }
        .animate-fade-out {
          animation: fade-out 4s ease-out forwards;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

