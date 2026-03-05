import React from 'react';
import type { Category } from '../types/types';

interface CategoriesProps {
  categories: Category[];
}

const Categories: React.FC<CategoriesProps> = ({ categories }) => {
  return (
    <nav className="flex items-center justify-center space-x-8 border-b border-gray-100 bg-white px-6 py-4">
      {categories.map((category) => (
        <div key={category.id} className="group relative">
          <button className="flex items-center pb-2 text-xs font-bold tracking-widest text-gray-800 transition-colors uppercase group-hover:text-black">
            {category.name}
            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full" />
          </button>

          <div className="invisible absolute left-0 top-full z-50 w-48 translate-y-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
            <ul className="mt-2 border border-gray-100 bg-white py-2 shadow-xl">
              {category?.subCategories && category?.subCategories?.length > 0 && category?.subCategories.map((sub) => (
                <li key={sub.id}>
                  <a
                    href={`/categories/${sub.id}`}
                    className="block px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-black"
                  >
                    {sub.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </nav>
  );
};

export default Categories;
