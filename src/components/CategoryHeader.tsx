import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ChevronDown } from "lucide-react";

const CategoryHeader = ({ category }: { category: any }) => {
  const [index, setIndex] = useState(0);
  const images = category?.images || [];
  const hasMultipleImages = images.length > 1;

  // Auto-play functionality
  useEffect(() => {
    if (!hasMultipleImages) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [hasMultipleImages, images.length]);

  const nextStep = () => setIndex((prev) => (prev + 1) % images.length);
  const prevStep = () => setIndex((prev) => (prev + 0 === 0 ? images.length - 1 : prev - 1));

  if(images.length == 0){
    return <></>
  }

  return (
    <div className="relative w-full h-[40vh] md:h-[60vh] overflow-hidden bg-gray-900">
      <AnimatePresence mode="wait">
        <motion.img
          key={images[index]?.url || "placeholder"}
          src={images[index]?.url}
          alt={`${category?.slug} - ${index}`}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white text-center p-6">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-6xl font-black uppercase tracking-widest"
        >
          {category?.name || category?.slug}
        </motion.h1>
      </div>

      {/* Navigation Controls */}
      {hasMultipleImages && (
        <>
          <button 
            onClick={prevStep}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all"
          >
            <ChevronLeft size={30} />
          </button>
          <button 
            onClick={nextStep}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all"
          >
            <ChevronRight size={30} />
          </button>

          {/* Pagination Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_: any, i: number) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  index === i ? "w-8 bg-white" : "w-2 bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryHeader;
