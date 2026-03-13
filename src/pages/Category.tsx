import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import Categories from "../components/Categories";
import ProductDetail from "../components/ProductsContainer";
import FilterProducts from "../components/FilterProducts";
import { ChevronDown, X } from 'lucide-react';

const Category: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  return (
    <>
      <Categories />
      <div className="min-h-screen bg-gray-50">
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200 p-4 md:hidden">
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="w-full flex items-center justify-between px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-gray-800 transition-colors"
          >
            <span>Filters</span>
            {isMobileFilterOpen ? <X size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 mx-auto"> 
          <FilterProducts />

          <div className="md:col-span-3">
            <ProductDetail category_slug={id || ''} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Category;
