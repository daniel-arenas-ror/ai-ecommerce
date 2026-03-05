import React from 'react';
import ProductCard from '../../ProductCard';
import { useCardStyle } from '../../ProductCard/useCardStyle';
import type { Product } from '../../types/types';

/**
 * EXAMPLE USAGE OF PRODUCT CARD FACTORY PATTERN
 * 
 * This example shows how to use the new ProductCard component system
 * with different card styles based on configuration
 */

interface ExampleProps {
  products: Product[];
}

export const ProductCardExamples: React.FC<ExampleProps> = ({ products }) => {
  const cardStyle = useCardStyle(); // Get style from company context

  const handleAddToCart = (product: Product) => {
    console.log('Added to cart:', product.name);
  };

  const handleViewDetail = (product: Product) => {
    console.log('Viewing detail:', product.name);
  };

  return (
    <div className="w-full">
      {/* Example 1: Using hook to auto-detect style from context */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Style from Company Config ({cardStyle})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onViewDetail={handleViewDetail}
              /* style is auto-detected from useCardStyle hook */
            />
          ))}
        </div>
      </section>

      {/* Example 2: Explicit minimal style */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Minimal Style</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 2).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onViewDetail={handleViewDetail}
              style="minimal"
            />
          ))}
        </div>
      </section>

      {/* Example 3: Premium style */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Premium Style</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(0, 2).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onViewDetail={handleViewDetail}
              style="premium"
            />
          ))}
        </div>
      </section>

      {/* Example 4: Compact style (good for sidebars) */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Compact Style</h2>
        <div className="max-w-sm space-y-3">
          {products.slice(0, 3).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onViewDetail={handleViewDetail}
              style="compact"
            />
          ))}
        </div>
      </section>

      {/* Example 5: Detailed style */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Detailed Style</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.slice(0, 2).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onViewDetail={handleViewDetail}
              style="detailed"
            />
          ))}
        </div>
      </section>
    </div>
  );
};
