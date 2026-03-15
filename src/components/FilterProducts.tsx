import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_FILTERING_OPTION_TYPE } from '../api/queries/option_types';
import type { OptionType } from '../types/option_types'
import { useSearchParams } from "react-router-dom";

const FilterProducts: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // ... (keep your existing state and logic: tempPrice, handlers, query, etc.)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [optionType, setOptionType] = useState<OptionType[]>([])
  const [tempPrice, setTempPrice] = useState<number>(
    Number(searchParams.get("max_p")) || 1000
  );

  const handlePriceChangeCommitted = (value: number) => {
    searchParams.set("max_p", value.toString());
    setSearchParams(searchParams);
  };

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

  const handleFilterChange = (optionValueId: string) => {
    const currentFilters = searchParams.get("option_values")?.split(",") || [];
    let newFilters: string[];
    if (currentFilters.includes(optionValueId)) {
      newFilters = currentFilters.filter((id) => id !== optionValueId);
    } else {
      newFilters = [...currentFilters, optionValueId];
    }
    if (newFilters.length > 0) {
      searchParams.set("option_values", newFilters.join(","));
    } else {
      searchParams.delete("option_values");
    }
    setSearchParams(searchParams);
  }

  const clearFilters = () => setSearchParams({});
  const isChecked = (id: string) => searchParams.get("option_values")?.split(",").includes(id) || false;

  return (
    <aside className={`md:col-span-1 ${isMobileFilterOpen ? 'block' : 'hidden'} md:block bg-white rounded-lg border border-gray-200 p-6 h-fit sticky top-20`}>
      <h2 className="text-lg font-bold mb-6 text-gray-900">Filters</h2>

      {/* Rango Filter */}
      <div className="mb-6">
        <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Rango</h3>
        <input
          type="range"
          value={tempPrice}
          onChange={(e) => setTempPrice(Number(e.target.value))}
          onMouseUp={() => handlePriceChangeCommitted(tempPrice)}
          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
        />
        <div className="flex justify-between mt-2 text-[11px] font-bold text-gray-500 uppercase">
          <span>$0</span>
          <span>${tempPrice}</span>
        </div>
      </div>

      {optionType.map((optionFieldFilter) => {
        const isColorType = optionFieldFilter.name.toLowerCase() === 'color';

        return (
          <div key={optionFieldFilter.id} className="mb-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">
              {optionFieldFilter.name}
            </h3>
            
            <div className={isColorType ? "flex flex-wrap gap-3" : "space-y-2"}>
              {optionFieldFilter.optionValues.map((optionValue) => {
                const active = isChecked(optionValue.id);
                
                return (
                  <label key={optionValue.id} className="flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={() => handleFilterChange(optionValue.id)}
                      className={isColorType ? "sr-only" : "w-5 h-5 rounded border-gray-300 text-black focus:ring-black transition-all"}
                    />
                    
                    {isColorType ? (
                      /* --- Color Circle Style --- */
                      <div 
                        className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                          active ? 'border-black scale-110 shadow-md' : 'border-transparent hover:border-gray-300'
                        }`}
                        title={optionValue.name}
                      >
                        <div 
                          className="w-6 h-6 rounded-full border border-gray-100" 
                          style={{ backgroundColor: optionValue.label.toLowerCase() }} 
                        />
                      </div>
                    ) : (
                      /* --- Default Text Style --- */
                      <span className={`ml-3 text-sm transition-colors ${
                        active ? 'text-black font-bold' : 'text-gray-600 group-hover:text-black'
                      }`}>
                        {optionValue.name}
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          </div>
        );
      })}

      <button
        onClick={clearFilters}
        className="w-full mt-6 px-4 py-2 bg-gray-50 hover:bg-black hover:text-white text-gray-500 rounded-lg text-xs font-bold uppercase tracking-widest transition-all"
      >
        Limpiar filtros
      </button>
    </aside>
  )
}

export default FilterProducts;
