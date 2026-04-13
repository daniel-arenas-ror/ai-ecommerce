import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Heart } from 'lucide-react';

// Mock Data structure based on your request
const NAVIGATION = [
  {
    name: 'Mujer',
    slug: 'mujer',
    subCategories: [
      {
        title: 'Comprar por deporte',
        items: ['Fútbol', 'Correr', 'Entrenamiento y Gym', 'Casual', 'Jordan', 'Básquetbol', 'Tennis']
      },
      {
        title: 'Calzado',
        items: ['Casual', 'Correr', 'Jordan', 'Gym y Entrenamiento', 'Sandalias', 'Fútbol', 'Tennis y Padel']
      },
      {
        title: 'Ropa',
        items: ['Brasier y Tops deportivos', 'Camisetas y esqueletos', 'Hoodies y Sacos', 'Chaquetas', 'Leggings y Licras']
      },
      {
        title: 'Accesorios y equipo',
        items: ['Medias', 'Maletas y Bolsos', 'Riñoneras', 'Gorras y viseras', 'Balones']
      }
    ]
  },
  { name: 'Hombre', slug: 'hombre', subCategories: [] },
  { name: 'Niños', slug: 'ninos', subCategories: [] },
  { name: 'Novedades', slug: 'novedades', subCategories: [] },
];

const FullSubCategory = () => {
  const [activeCategory, setActiveCategory] = useState<any>(null);

  return (
    <header 
      className="relative w-full bg-white z-50"
      onMouseLeave={() => setActiveCategory(null)}
    >
      {/* --- Main Top Bar --- */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-transparent hover:border-gray-100 transition-colors">
        {/* Logo */}
        <div className="flex-shrink-0 cursor-pointer">
          <svg className="w-16 h-16" viewBox="0 0 24 24" fill="black">
            <path d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.738-.273-1.99.635-3.756.47-.914 1.136-2.028 2.11-3.624.087-.15.263-.232.448-.197.185.035.334.176.385.356l.003.009c.143.472.242.824.3 1.055.24.932.544 1.503.92 1.737.262.15.597.236.979.236.21 0 .441-.027.688-.083L21 8.719z" />
          </svg>
        </div>

        {/* Center Categories */}
        <ul className="flex gap-8">
          {NAVIGATION.map((cat) => (
            <li 
              key={cat.slug}
              onMouseEnter={() => setActiveCategory(cat)}
              className="group cursor-pointer py-2"
            >
              <span className={`text-sm font-bold uppercase tracking-tight pb-1 border-b-2 transition-all ${
                activeCategory?.slug === cat.slug ? 'border-black' : 'border-transparent'
              }`}>
                {cat.name}
              </span>
            </li>
          ))}
        </ul>

        {/* Right Icons & Search */}
        <div className="flex items-center gap-6">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar" 
              className="bg-gray-100 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none w-48 focus:w-64 transition-all"
            />
          </div>
          <Heart size={24} className="cursor-pointer hover:text-gray-500" />
          <ShoppingBag size={24} className="cursor-pointer hover:text-gray-500" />
        </div>
      </nav>

      {/* --- MEGA MENU OVERLAY --- */}
      <AnimatePresence>
        {activeCategory && activeCategory.subCategories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "circOut" }}
            className="absolute top-full left-0 w-full bg-white border-b border-gray-200 overflow-hidden shadow-2xl"
          >
            <div className="max-w-7xl mx-auto grid grid-cols-4 gap-12 p-12">
              {activeCategory.subCategories.map((sub: any) => (
                <div key={sub.title} className="space-y-4">
                  <h4 className="text-sm font-black text-gray-900 mb-6 uppercase">
                    {sub.title}
                  </h4>
                  <ul className="space-y-3">
                    {sub.items.map((item: string) => (
                      <li 
                        key={item} 
                        className="text-sm text-gray-500 hover:text-black cursor-pointer font-medium transition-colors"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="max-w-7xl mx-auto px-12 pb-12">
              <button className="text-xs font-bold border-b-2 border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-all">
                Ver todo {activeCategory.name}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default FullSubCategory;
