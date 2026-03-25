import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { ProductCardProps } from '../types';

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewDetail }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onViewDetail(product) }
      className="relative h-[480px] cursor-pointer overflow-hidden rounded-[40px] bg-white shadow-xl border-white"
    >
      {/* CONTAINER FOR IMAGE 
          In 'default', it takes the top 60%. In 'hover', it takes 100%.
      */}
      <motion.div
        layout
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`relative w-full overflow-hidden rounded-[30px] z-0 ${
          isHovered ? 'h-full' : 'h-[60%]'
        }`}
      >
        <motion.img
          layout
          src={product.allImages[0]?.mediumUrl}
          alt={product.name}
          className="h-full w-full object-cover"
        />
        
        {/* Dark overlay that appears only on hover to make text readable */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.4 : 0 }}
          className="absolute inset-0 bg-black z-10"
        />

        {false && (
          <span className="absolute top-4 left-4 z-20 bg-black text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
            New
          </span>
        )}
      </motion.div>

      {/* TEXT CONTENT 
          We use absolute positioning so it can sit 'over' the image when expanded.
      */}
      <div className="absolute inset-x-0 bottom-0 z-20 p-8 flex flex-col justify-end">
        <motion.div layout className="flex items-center justify-between mb-2">
          <motion.h3 
            layout
            className={`font-extrabold tracking-tight transition-colors duration-300 ${
              isHovered ? 'text-white text-3xl' : 'text-gray-900 text-xl'
            }`}
          >
            {product.name}
          </motion.h3>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered ? 1 : 0.6, y: isHovered ? 0 : 5 }}
          className={`text-sm leading-relaxed mb-6 transition-colors duration-300 ${
            isHovered ? 'text-white/90' : 'text-gray-500'
          }`}
        >
          {product.description}
        </motion.p>

        <motion.div 
          layout
          className="flex items-center justify-between"
        >
          <div className="flex gap-4 text-xs font-bold tracking-tighter">
            <span className={isHovered ? 'text-white' : 'text-gray-400'}>{product.formattedPrice}</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
              isHovered 
                ? 'bg-white text-black' 
                : 'bg-black text-white'
            }`}
          >
            +
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
