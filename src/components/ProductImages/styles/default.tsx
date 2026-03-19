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
    // MAIN GALLERY GRID (Split layout like your reference)
    <div className="flex flex-col md:flex-row gap-6 p-4 max-w-7xl mx-auto">
      
      {/* --- SIDEBAR: Vertical Thumbnails --- */}
      <div className="flex flex-col items-center gap-4 w-full md:w-[120px] md:flex-shrink-0">
        
        {/* Navigation Arrow Up (Optional, based on number of thumbs) */}
        <button 
          onClick={prevImage}
          className="p-1 rounded-full text-gray-400 hover:text-black hover:bg-gray-100"
        >
          <ChevronUp size={20} />
        </button>

        {/* The Scrollable Thumbnail Track */}
        <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto no-scrollbar py-1 px-1">
          {images.map((image, index) => {
            // 2. LOGIC: Compare index to determine selected state
            const isSelected = index === selectedIndex;
            
            return (
              <button
                key={image.id}
                onClick={() => setSelectedIndex(index)} // 3. ACTION: Update state on click
                className={`flex-shrink-0 relative overflow-hidden rounded-xl group transition-all duration-300 ${
                  isSelected 
                    ? 'p-0.5 border-4 border-black scale-105' 
                    : 'p-0 border-transparent hover:border-gray-200 hover:scale-105'
                }`}
              >
                <img
                  src={image.thumbUrl} // Use the Thumb size
                  alt={`Thumbnail ${index + 1}: ${image.id}`}
                  className="w-20 h-20 md:w-[100px] md:h-[100px] object-cover rounded-[10px]"
                />
                
                {/* Subtle overlay effect on hover/select */}
                <div className={`absolute inset-0 z-10 transition-opacity ${
                  isSelected ? 'bg-black/10' : 'bg-transparent group-hover:bg-black/5'
                }`} />
              </button>
            );
          })}
        </div>

        {/* Navigation Arrow Down */}
        <button 
          onClick={nextImage}
          className="p-1 rounded-full text-gray-400 hover:text-black hover:bg-gray-100"
        >
          <ChevronDown size={20} />
        </button>
      </div>

      {/* --- PRINCIPAL VIEW: Large Image & Detailed Zoom --- */}
      <div className="flex-1 relative aspect-[4/5] overflow-hidden group">
        
        {/* Main large image */}
        <img
          src={currentImage.largeUrl} // Use the Large size for best detail
          alt={currentImage.id}
          className="absolute inset-0 w-full h-full object-contain mix-blend-multiply origin-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Subtle white vignette or gradient effect to make product pop */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
      </div>

    </div>
  );
};

export default ProductDefaultGallery;
