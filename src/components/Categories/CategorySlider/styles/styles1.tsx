import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Category } from '../../../../types/category';
import ProductCard from '../../../ProductCard';

interface CategorySliderProps {
  category: Category;
}

export const CategorySection: React.FC<CategorySliderProps> = ({ category }) => {
  const [activeCategory, setActiveCategory] = useState(category.subCategories?.[0]?.slug);

  const filteredProducts = useMemo(() => {
    return category.products?.filter(p => p.slug === activeCategory) || [];
  }, [activeCategory]);

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      {/* Header with Lines */}
      <div className="flex items-center justify-between mb-8 gap-4">
        <div className="h-px bg-black flex-1" />
        <h2 className="text-2xl font-bold uppercase tracking-widest whitespace-nowrap">
          {category.name}
        </h2>
        <div className="h-px bg-black flex-1" />
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-3 mb-12 overflow-x-auto pb-4 no-scrollbar">
        {category.subCategories?.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.slug)}
            className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 whitespace-nowrap ${
              activeCategory === cat.slug
                ? 'bg-rose-100 text-black border border-rose-200'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Products Carousel / Grid Wrapper */}
      <div className="relative group">
        {/* Navigation Arrows (Absolute Positioned) */}
        <button className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <button className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-10">
        {[0, 1, 2, 3].map((i) => (
          <div 
            key={i} 
            className={`w-2.5 h-2.5 rounded-full border border-gray-400 ${i === 0 ? 'bg-gray-800' : 'bg-transparent'}`} 
          />
        ))}
      </div>
    </section>
  );
};
