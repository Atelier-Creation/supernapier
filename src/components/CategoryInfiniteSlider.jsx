import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Leaf } from 'lucide-react';

/**
 * CategoryInfiniteSlider
 * 
 * An infinite loop slider that always shows 3 cards (desktop) or a focused peek (mobile).
 * The 1st card (leftmost) is active: expanded width, full color, more details.
 * The 2nd and 3rd cards are inactive: narrowed, grayscale.
 */
const CategoryInfiniteSlider = ({ categories = [], interval = 4500 }) => {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % categories.length);
    }, interval);
    return () => clearInterval(timer);
  }, [categories.length, interval]);

  if (categories.length < 3) return null;

  // Get visible items based on screen size
  // On mobile, we might actually want to show just 2 and peek the 3rd or just 1.
  // But staying with 3 works if we manage widths well.
  const getVisibleItems = () => {
    const items = [];
    const count = isMobile ? 2 : 3; // Show fewer on mobile for better focus
    for (let i = 0; i < count; i++) {
        items.push(categories[(index + i) % categories.length]);
    }
    return items;
  };

  const visibleItems = getVisibleItems();

  return (
    <section className="py-12 md:py-20 px-4 md:px-8 bg-[#FAFCF8] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto">
        <div className="relative flex gap-3 md:gap-4 h-[380px] md:h-[400px] w-full">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleItems.map((cat, i) => {
              const isActive = i === 0;
              
              const desktopWidth = isActive ? '50%' : '24%';
              const mobileWidth = isActive ? '85%' : '15%'; 

              return (
                <motion.div
                  key={cat.id}
                  layout
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    width: isMobile ? mobileWidth : desktopWidth,
                  }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{
                    layout: { duration: 0.8, ease: [0.32, 0.72, 0, 1] },
                    opacity: { duration: 0.4 },
                    x: { duration: 0.5 }
                  }}
                  className="relative cursor-pointer overflow-hidden rounded-[32px] md:rounded-[40px] h-full shadow-lg shrink-0"
                >
                  {/* Background Image */}
                  <motion.img
                    src={cat.img}
                    alt={cat.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    animate={{
                      filter: isActive ? 'grayscale(0%) brightness(1)' : 'grayscale(100%) brightness(0.6)',
                      scale: isActive ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.8 }}
                  />

                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-opacity duration-700 ${isActive ? 'opacity-90' : 'opacity-70'}`} />

                  {/* Top Content */}
                  <div className={`absolute inset-0 p-5 md:p-8 flex flex-col justify-start ${!isActive && isMobile ? 'opacity-0' : 'opacity-100'}`}>
                    <div className="flex justify-between items-start w-full gap-2">
                      <motion.h3 
                        className={`text-white font-black leading-[1.1] transition-all duration-700 ${isActive ? 'text-2xl md:text-5xl max-w-[85%]' : 'text-lg md:text-2xl opacity-80'}`}
                      >
                        {cat.title}
                      </motion.h3>

                      {/* Arrow Button */}
                      {isActive && (
                        <motion.div 
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center text-black shrink-0 shadow-xl"
                        >
                          <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
                        </motion.div>
                      )}
                    </div>

                    {/* Desc - only on first visible (active) card */}
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="text-gray-200 mt-4 md:mt-6 text-sm md:text-lg leading-relaxed max-w-full md:max-w-[95%] font-medium line-clamp-3 md:line-clamp-none"
                      >
                        {cat.desc}
                      </motion.p>
                    )}
                  </div>

                  {/* Bottom Footer */}
                  <div className={`absolute bottom-5 md:bottom-8 left-5 md:left-8 right-5 md:right-8 transition-opacity duration-500 ${!isActive && isMobile ? 'opacity-0' : 'opacity-100'}`}>
                    {/* Divider Line */}
                    <div className="h-[1px] bg-white/20 mb-4 md:mb-6 w-full" />

                    {/* Tag */}
                    <motion.div 
                       animate={{ opacity: isActive ? 1 : 0.6 }}
                       className="bg-white/10 backdrop-blur-xl border border-white/20 px-3 md:px-4 py-1.5 md:py-2 rounded-xl md:rounded-2xl flex items-center gap-2 w-fit"
                    >
                      <Leaf className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
                      <span className="text-white text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em]">{cat.tag}</span>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default CategoryInfiniteSlider;
