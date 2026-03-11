import React from 'react';
import { ShoppingCart, ExternalLink, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ProductCardProps } from '../types';

/**
 * Detailed Card Style - Full information display
 * Best for: Featured sections, detailed product listings
 */
const DetailedCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewDetail }) => {
  return (
    <motion.div 
      className="bg-white border border-gray-300 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
    >
      {/* Image with overlay */}
      <div className="h-56 bg-gray-100 overflow-hidden relative group">
        <img 
          src={product.allImages[0]?.thumbUrl} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Header */}
        <div className="flex justify-between items-start gap-3 mb-3">
          <h3 className="font-bold text-gray-900 text-lg flex-1">{product.name}</h3>
          <div className="flex items-center gap-1">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-gray-700">4.5</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {product.description}
        </p>

        {/* Price and Actions */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600 text-sm">Price</span>
            <span className="text-2xl font-bold text-blue-600">${product.price}</span>
          </div>

          <div className="flex gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onAddToCart(product)}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold transition-colors"
            >
              <ShoppingCart size={18} />
              Add to Cart
            </motion.button>
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => onViewDetail(product)}
              className="p-2.5 border-2 border-gray-300 hover:border-blue-600 text-gray-600 hover:text-blue-600 rounded-lg transition-colors"
              title="View details"
            >
              <ExternalLink size={18} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DetailedCard;
