import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Leaf } from 'lucide-react';

/**
 * CategoryExpandingSlider
 * 
 * A premium category slider where the active card expands in width to reveal
 * more content. Inactive cards are narrowed and grayscale.
 * 
 * Props:
 * - categories: Array<{ id, title, desc, img, tag }>
 */
const CategoryExpandingSlider = ({ categories = [] }) => {
  const [activeId, setActiveId] = useState(categories[0]?.id || null);

  if (!categories.length) return null;

  return (
    <section className="py-20 px-4 md:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4 h-[500px] w-full items-stretch">
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              onClick={() => setActiveId(cat.id)}
              className="relative cursor-pointer group overflow-hidden rounded-[32px] h-full"
              initial={false}
              animate={{
                flex: activeId === cat.id ? 2.5 : 1,
                // On mobile we might want to stack them, but this flex approach
                // works great for a premium desktop/tablet look.
              }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Background Image */}
              <motion.img
                src={cat.img}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover"
                animate={{
                  filter: activeId === cat.id ? 'grayscale(0%)' : 'grayscale(100%)',
                  scale: activeId === cat.id ? 1.05 : 1,
                }}
                transition={{ duration: 0.6 }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

              {/* Main Content (Top/Middle) */}
              <div className="absolute inset-0 p-8 flex flex-col justify-start">
                <div className="flex justify-between items-start">
                  <motion.h3 
                    className="text-white text-3xl md:text-5xl font-black leading-tight max-w-[80%]"
                    animate={{ x: activeId === cat.id ? 0 : -10 }}
                  >
                    {cat.title}
                  </motion.h3>

                  {/* Arrow Button - Only fully vibrant on active */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${activeId === cat.id ? 'bg-white text-black translate-x-0' : 'bg-white/20 text-white translate-x-4 opacity-0'}`}>
                    <ArrowRight className="w-6 h-6" />
                  </div>
                </div>

                <AnimatePresence>
                  {activeId === cat.id && (
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="text-gray-200 mt-6 text-base md:text-lg leading-relaxed max-w-[90%] font-medium"
                    >
                      {cat.desc}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom Content (Footer) */}
              <div className="absolute bottom-6 left-8 right-8">
                {/* Divider Line */}
                <motion.div 
                  className="h-[1px] bg-white/30 mb-6"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: activeId === cat.id ? 1 : 0.5 }}
                />

                {/* Bottom Tag */}
                <div className="flex items-center gap-3">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-green-400" />
                    <span className="text-white text-xs font-bold uppercase tracking-widest">{cat.tag}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryExpandingSlider;
