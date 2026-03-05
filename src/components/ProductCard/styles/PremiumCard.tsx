import React from 'react';
import { ShoppingCart, ExternalLink, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import type { ProductCardProps } from '../types';

/**
 * Premium Card Style - Rich design with more details
 * Best for: High-end products, featured items
 */
const PremiumCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewDetail }) => {
  const [isFavorite, setIsFavorite] = React.useState(false);

  return (
    <motion.div 
      className="bg-gradient-to-br from-white to-gray-50 border border-gray-300 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.2 }}
    >
      {/* Premium Badge */}
      <div className="absolute top-4 right-4 z-10">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsFavorite(!isFavorite)}
          className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
        >
          <Heart 
            size={20} 
            className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}
          />
        </motion.button>
      </div>

      {/* Image */}
      <div className="h-56 bg-gray-100 overflow-hidden relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-bold text-gray-900 text-lg leading-tight mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {product.description}
        </p>

        {/* Price */}
        <div className="mb-4">
          <p className="text-3xl font-bold text-blue-600">${product.price}</p>
        </div>

        {/* Amenities */}
        {product.amenities && product.amenities.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {product.amenities.slice(0, 3).map((amenity, idx) => (
              <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                {amenity}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onAddToCart(product)}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => onViewDetail(product)}
            className="flex-1 flex items-center justify-center gap-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-3 rounded-lg font-semibold transition-colors"
          >
            <ExternalLink size={18} />
            View Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default PremiumCard;
