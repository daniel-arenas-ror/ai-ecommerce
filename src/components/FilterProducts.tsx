import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_FILTERING_OPTION_TYPE } from '../api/queries/option_types';
import type { OptionType } from '../types/option_types'

const FilterProducts: React.FC = () => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [optionType, setOptionType] = useState<OptionType[]>([])

  const companyId = import.meta.env.VITE_COMPANNY_ID as string | undefined;

  const { loading, data } = useQuery<{ optionsFieldFilter: OptionType[] }>(GET_FILTERING_OPTION_TYPE, {
    variables: { companyId: companyId }
  });

  useEffect(() => {
    if (data?.optionsFieldFilter) {
      setOptionType(data.optionsFieldFilter);
    }
  }, [data?.optionsFieldFilter?.length]);

  if (loading) return <div>Loading...</div>;

  return (
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

      {
        data && optionType.map((optionFieldFilter) => (
          <div key={optionFieldFilter.id} className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">{optionFieldFilter.name}</h3>
            <div className="space-y-2">
              {
                optionFieldFilter.optionValues.map((optionValue) => (
                  <label key={optionValue.id} className="flex items-center cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded" />
                    <span className="ml-2 text-sm text-gray-600">{optionValue.name}</span>
                  </label>
                ))
              }
            </div>
          </div>
        ))
      }

      <button className="w-full mt-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors">
        Clear Filters
      </button>
    </aside>
  )
}

export default FilterProducts;
