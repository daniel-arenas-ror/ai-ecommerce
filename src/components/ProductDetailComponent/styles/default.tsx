import React from 'react';
import type { ProductDetailCardProps } from '../types';

const DefaultProductDetail: React.FC<ProductDetailCardProps> = ({ product }) => {
  if(!product){
    return <div></div>;
  }

  return (
    <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-xl">
      <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
      <p className="text-gray-600 leading-relaxed">
        {product.description}
      </p>
    </div>
  );
}

export default DefaultProductDetail;
