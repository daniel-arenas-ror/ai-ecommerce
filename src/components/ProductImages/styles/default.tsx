import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { productImages } from '../../../types/product';

interface ProductGalleryProps {
  images: productImages[];
}

// --- Component ---
const ProductDefaultGallery: React.FC<ProductGalleryProps> = ({ images }) => {
  // 1. STATE: Track the index of the image being displayed, not the URL.
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Derive the current images from the state index
  const currentImage = images[selectedIndex];

  // Helper to safely navigate through images
  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };
  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
// Parent container with fixed height from your requirement
    <div className="flex flex-col md:flex-row gap-6 p-4 max-w-7xl mx-auto h-[600px]">
      
      {/* --- SIDEBAR: Now with fixed height and internal scrolling --- */}
      <div className="flex flex-col items-center w-full md:w-[120px] h-full py-2 bg-white">
        
        {/* Navigation Arrow Up - Fixed at top */}
        <button 
          onClick={prevImage}
          className="mb-2 p-1 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 flex-shrink-0"
        >
          <ChevronUp size={24} />
        </button>

        {/* --- THUMBNAIL TRACK: This is the scrolling part --- */}
        <div className="flex md:flex-col gap-4 overflow-x-auto overflow-y-auto no-scrollbar scrollbar-hide flex-grow w-full px-2 scroll-smooth">
          {images.map((image, index) => {
            const isSelected = index === selectedIndex;
            return (
              <button
                key={image.id}
                onClick={() => setSelectedIndex(index)}
                className={`flex-shrink-0 relative overflow-hidden rounded-xl transition-all duration-300 ${
                  isSelected 
                    ? 'ring-4 ring-black ring-offset-2 scale-95' 
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={image.thumbUrl}
                  alt={image.id}
                  className="w-20 h-20 md:w-full md:h-auto aspect-square object-cover rounded-lg"
                />
              </button>
            );
          })}
        </div>

        {/* Navigation Arrow Down - Fixed at bottom */}
        <button 
          onClick={nextImage}
          className="mt-2 p-1 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 flex-shrink-0"
        >
          <ChevronDown size={24} />
        </button>
      </div>

      {/* --- PRINCIPAL VIEW: Stays flexible --- */}
      <div className="flex-1 relative h-full overflow-hidden">
        <img
          src={currentImage.largeUrl}
          alt={currentImage.id}
          className="absolute inset-0 w-full h-full object-contain p-4 md:p-8"
        />
      </div>
    </div>
  );
};

export default ProductDefaultGallery;
