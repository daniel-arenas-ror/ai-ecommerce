import React from 'react';
import type { ProductDetailCardProps } from '../types';

const ProductDetailPremium: React.FC<ProductDetailCardProps> = ({ product }) => {
  return (
    <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-xl">
      <h2 className="text-2xl font-bold mb-4">The Comfort Runner - Premium</h2>
      <p className="text-gray-600 leading-relaxed">
        Introducing our most advanced sneaker yet. Designed for ultimate responsiveness and long-lasting comfort, it features an all-new midsole material and a breathable engineered mesh upper. Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias sequi repellendus perferendis sed.
      </p>
    </div>
  );
}

export default ProductDetailPremium;
