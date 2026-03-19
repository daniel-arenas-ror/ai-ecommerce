import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { ProductCardProps } from '../types';

// --- Framer Motion Animation Settings ---
const FADE_TRANSITION = {
  duration: 0.5, // Smooth, slow cross-fade
  ease: [0.33, 1, 0.68, 1] // Exponential, premium curve
};

// --- Component ---
const MinimalProductCard: React.FC<ProductCardProps> = ({ product, onViewDetail }) => {
  const [isHovered, setIsHovered] = useState(false);
  // Track the image currently being displayed (defaults to primary)
  const [currentImage, setCurrentImage] = useState(product.allImages[0]?.mediumUrl);

  // Helper to get formatted price
  const formatPrice = (price: string | number) => {
    const num = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.-]+/g,"")) : price;
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
  };

  return (
    <div
      className="relative w-full max-w-sm group"
      onClick={() => onViewDetail(product) }
      onMouseEnter={() => {
        setIsHovered(true);
        // On hover, stack the secondary image
        setCurrentImage(product.allImages[1]?.mediumUrl);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        // On leave, remove the secondary stack
        setCurrentImage(product.allImages[0]?.mediumUrl);
      }}
    >
      {/* --- Image Container (Aspect Ratio 1:1) --- */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-50 border border-gray-100 mb-5">
        
        {/* We use AnimatePresence only if we expect the secondary image to change dynamically.
            For simple hover, we can just use static absolute positioning. */}
        
        {/* Primary Image (Always rendering) */}
        <img
          src={product.allImages[0]?.mediumUrl}
          alt={product.slug}
          className="absolute inset-0 h-full w-full object-cover z-0"
        />

        {/* Secondary Image (Fades in over primary on hover) */}
        <motion.img
          src={product.allImages[1]?.mediumUrl}
          alt={`${product.name} (Alternative View)`}
          className="absolute inset-0 h-full w-full object-cover z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={FADE_TRANSITION}
        />
      </div>

      {/* --- Product Details (Stays visible) --- */}
      <div className="space-y-2 px-1">
        <h3 className="text-xl font-medium tracking-tight text-gray-900 group-hover:text-black transition-colors">
          {product.name}
        </h3>
        <p className="text-base font-semibold text-gray-900">
          {formatPrice(product.price)}
        </p>
      </div>

      {/* --- Swatches (Revealed on hover) --- */}
      <motion.div
        className="relative z-20 mt-6 flex flex-wrap gap-2.5"
        initial={{ opacity: 0, y: 10 }} // Starts invisible and slightly lower
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
        transition={{ ...FADE_TRANSITION, delay: 0.1 }} // Slight delay after image fade
      >
        {product.optionValues.map((optionValue) => (
          <button
            key={optionValue.id}
            className={`
              transition-all duration-300 ease-out
              ${optionValue.optionTypeName.toLowerCase() === 'color' 
                ? 'w-10 h-10 rounded-full border border-gray-100 shadow-inner'
                : 'min-w-[60px] text-center px-4 py-2 border border-gray-200 rounded text-sm font-medium text-gray-700 hover:border-black hover:text-black hover:shadow-sm'
              }
            `}
            style={optionValue.optionTypeName.toLowerCase() === 'color' ? { backgroundColor: optionValue.label } : {}}
            title={optionValue.optionTypeName.toLowerCase() === 'color' ? optionValue.name || optionValue.label : optionValue.name}
          >
            {optionValue.optionTypeName === 'size' && optionValue.name}
          </button>
        ))}
      </motion.div>
    </div>
  );
};

export default MinimalProductCard;
