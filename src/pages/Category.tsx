import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import Categories from "../components/Categories";
import ProductDetail from "../components/ProductsContainer";
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
          <aside
            className={`md:col-span-1 ${
              isMobileFilterOpen ? 'block' : 'hidden'
            } md:block bg-white rounded-lg border border-gray-200 p-6 h-fit sticky top-20`}
          >
            <h2 className="text-lg font-bold mb-6 text-gray-900">Filters</h2>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Price Range</h3>
              <input
                type="range"
                min="0"
                max="1000"
                className="w-full cursor-pointer"
              />
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>$0</span>
                <span>$1000</span>
              </div>
            </div>

            {/* Filter Section 2 */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Category</h3>
              <div className="space-y-2">
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  <span className="ml-2 text-sm text-gray-600">Option 1</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  <span className="ml-2 text-sm text-gray-600">Option 2</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  <span className="ml-2 text-sm text-gray-600">Option 3</span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Rating</h3>
              <div className="space-y-2">
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  <span className="ml-2 text-sm text-gray-600">★★★★★</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  <span className="ml-2 text-sm text-gray-600">★★★★☆</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  <span className="ml-2 text-sm text-gray-600">★★★☆☆</span>
                </label>
              </div>
            </div>

            <button className="w-full mt-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors">
              Clear Filters
            </button>
          </aside>

          <div className="md:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Products</h1>

              <select className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 cursor-pointer hover:border-gray-400">
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
              </select>
            </div>

            <ProductDetail category_slug={id || ''} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Category;