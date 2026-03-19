import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import type { productImages } from '../../../types/product';

interface ProductGalleryProps {
  images: productImages[];
}

const ImageGridGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<productImages | null>(null);

  return (
    <div className="p-4 bg-white min-h-screen">
      {/* 1. MASONRY GRID LAYOUT */}
      {/* 'columns-2 md:columns-3' creates the staggered look from your image */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {images.map((image) => (
          <motion.div
            key={image.id}
            layoutId={`image-${image.id}`}
            onClick={() => setSelectedImage(image)}
            className="relative break-inside-avoid cursor-zoom-in group overflow-hidden rounded-xl shadow-sm border border-gray-100"
          >
            <img
              src={image.url}
              alt={image.id}
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <ZoomIn className="text-white w-8 h-8" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* 2. ZOOM MODAL (AnimatePresence handles the 'Pop' effect) */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />

            {/* Large Image Container */}
            <motion.div
              layoutId={`image-${selectedImage.id}`}
              className="relative z-10 max-w-5xl w-full h-full flex items-center justify-center"
            >
              <img
                src={selectedImage.url}
                alt={selectedImage.id}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-0 right-0 m-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageGridGallery;
