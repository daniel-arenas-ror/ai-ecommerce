import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ProductCardProps } from '../types';

/**
 * Minimal Card Style - Clean and simple design
 * Best for: Catalogs with many products
 */
const MinimalCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <motion.div 
      className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Image */}
      <div className="h-40 bg-gray-100 overflow-hidden">
        <img 
          src={product.allImages[0]?.thumbUrl} 
          alt={product.name} 
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="font-semibold text-gray-800 text-sm truncate">{product.name}</h3>
        <p className="text-blue-600 font-bold text-lg mt-1">${product.price}</p>
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onAddToCart(product)}
          className="w-full mt-3 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium text-sm transition-colors"
        >
          <ShoppingCart size={16} />
          Add
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MinimalCard;
