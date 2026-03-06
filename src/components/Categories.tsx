import React, { useState, useEffect } from 'react';
import { useQuery } from "@apollo/client/react";
import { GET_CATEGORIES_DATA } from '../api/queries/category';
import type { Category } from '../types/types';

const Categories: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const companyId = import.meta.env.VITE_COMPANNY_ID as string | undefined;

  const { loading, data } = useQuery<{ categories: Category[] }>(GET_CATEGORIES_DATA, {
    variables: { companyId: companyId }
  });

  useEffect(() => {
    if (data?.categories) {
      console.log('Fetched categories data:', data.categories);
      setCategories(data.categories);
    }
  }, [data?.categories?.length]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <nav
      className={`
        sticky top-0 z-[100] w-full flex items-center justify-center space-x-8 border-b border-gray-100 bg-white/95 backdrop-blur-sm transition-all duration-500 ease-in-out
        ${isScrolled ? 'h-24 py-6 px-10' : 'h-16 py-4 px-6'}
      `}
    >
      {categories.map((category) => (
        <div key={category.id} className="group relative">
          <a
            href={`/category/${category.slug}`}
            className="flex items-center pb-2 text-xs font-bold tracking-widest text-gray-800 transition-colors uppercase group-hover:text-black"
          >
            {category.name}
            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full" />
          </a>

          {/* Dropdown Menu */}
          <div className="invisible absolute left-0 top-full z-50 w-48 translate-y-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
            <ul className="mt-2 border border-gray-100 bg-white py-2 shadow-xl">
              {category?.subCategories?.map((sub) => (
                <li key={sub.id}>
                  <a
                    href={`/category/${sub.slug}`}
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
