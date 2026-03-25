import React from 'react';
import type { ProductDetailCardProps } from '../types';

const ProductDetailPremium: React.FC<ProductDetailCardProps> = ({ product }) => {
  return (
    <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-xl">
      <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
      <p className="text-gray-600 leading-relaxed">{product.description}</p>
      <h3 className="text-2xl font-bold mb-4">{product.formattedPrice}</h3>
    </div>
  );
}

export default ProductDetailPremium;
