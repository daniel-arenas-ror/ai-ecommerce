import React from 'react';
import { ShoppingCart, ExternalLink } from 'lucide-react';
import type { Product } from '../types/types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetail: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewDetail }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow w-full max-w-sm">
      {/* Imagen del producto */}
      <div className="h-48 overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Info del producto */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-gray-800 text-lg leading-tight">{product.name}</h3>
          <span className="text-blue-600 font-bold">${product.price}</span>
        </div>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {product.description}
        </p>

        {/* Acciones */}
        <div className="flex gap-2 mt-auto">
          <button 
            onClick={() => onAddToCart(product)}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
          >
            <ShoppingCart size={18} />
            Agregar
          </button>
          <button 
            onClick={() => onViewDetail(product)}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors"
            title="Ver detalle"
          >
            <ExternalLink size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
