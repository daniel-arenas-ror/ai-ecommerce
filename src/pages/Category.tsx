import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client/react";
import { useParams } from 'react-router-dom';
import Categories from "../components/Categories";
import ProductDetail from "../components/ProductsContainer";
import FilterProducts from "../components/FilterProducts";
import CategoryHeader from "../components/CategoryHeader";
import { GET_CATEGORY_DATA } from '../api/queries/category';
import type { Category } from '../types/category';
import { X, ChevronDown } from "lucide-react";

const Category: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<Category>();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const companyId = import.meta.env.VITE_COMPANNY_ID as string | undefined;
  const { loading, data } = useQuery<{ category: Category }>(GET_CATEGORY_DATA, {
    variables: {
      companyId: companyId,
      categorySlug: id
    }
  });

  useEffect(() => {
    if (data?.category) {
      setCategory(data.category);
    }
  }, [data?.category]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Categories />
      <div className="min-h-screen bg-gray-50">
        
        {/* Full Screen Image/Slider Section */}
        {category?.images?.length != 0 && <CategoryHeader category={category} />}
        
        {/* Mobile Filter Toggle */}
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200 p-4 md:hidden">
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="w-full flex items-center justify-between px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium text-gray-800 transition-colors"
          >
            <span className="text-xs font-bold uppercase tracking-widest">Filters</span>
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
