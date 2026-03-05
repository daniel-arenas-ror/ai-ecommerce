import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ProductCardProps } from '../types';

/**
 * Compact Card Style - Horizontal layout for mobile/narrow screens
 * Best for: Mobile-first designs, side panels
 */
const CompactCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewDetail }) => {
  return (
    <motion.div 
      className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex"
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Image - Side */}
      <div className="w-24 h-24 flex-shrink-0 bg-gray-100 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 p-3 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-gray-800 text-sm truncate">{product.name}</h3>
          <p className="text-blue-600 font-bold text-base">${product.price}</p>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onAddToCart(product)}
          className="flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded text-xs font-medium transition-colors"
        >
          <ShoppingCart size={14} />
          Add
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CompactCard;
