import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: "Annual Yield", value: "200", suffix: "Tons/Acre", color: "text-earthy-gold", glow: "shadow-[0_0_20px_rgba(197,160,89,0.3)]" },
  { label: "Crude Protein", value: "18", suffix: "%", color: "text-accent-lime", glow: "shadow-[0_0_20px_rgba(163,230,53,0.2)]" },
  { label: "Regrowth Cycle", value: "45", suffix: "Days", color: "text-white", glow: "shadow-[0_0_20px_rgba(255,255,255,0.1)]" },
  { label: "Water Efficiency", value: "95", suffix: "%", color: "text-cyan-400", glow: "shadow-[0_0_20px_rgba(34,211,238,0.2)]" }
];

const StatsGrid = () => {
  return (
    <section className="py-16 md:py-24 bg-deep-forest text-slate-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')] opacity-5"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div data-aos="fade-right">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 leading-tight text-center lg:text-left">
              The <span className="text-earthy-gold">Super Napier</span> Advantage
            </h2>
            <p className="text-lg md:text-xl text-slate-white/70 mb-8 md:mb-12 leading-relaxed text-center lg:text-left">
              Our specific cultivar is optimized for maximum biomass density and nutrient extraction efficiency. It's not just grass; it's a high-performance industrial asset.
            </p>
            
            <div className="space-y-4 md:space-y-6 mb-12 lg:mb-0">
              {['High Biomass for Biofuel', 'Optimal Fiber for Pulp (Kraft Paper)', 'Rapid Scalability for 5,000+ Acres'].map((item, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="w-6 h-6 rounded-full bg-earthy-gold flex-shrink-0 flex items-center justify-center text-deep-forest">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                  </div>
                  <span className="text-base md:text-lg font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-6" data-aos="zoom-in">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(245, 247, 246, 0.15)' }}
                className={`bg-slate-white/10 backdrop-blur-md p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-slate-white/20 flex flex-col items-center justify-center text-center transition-all ${stat.glow}`}
              >
                <div className={`text-2xl sm:text-3xl md:text-5xl font-black mb-2 md:mb-3 drop-shadow-sm ${stat.color}`}>
                  {stat.value}
                  <span className="text-sm md:text-xl ml-1 font-bold opacity-80">{stat.suffix}</span>
                </div>
                <div className="text-slate-white font-bold uppercase tracking-widest text-[10px] md:text-xs opacity-80">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsGrid;
