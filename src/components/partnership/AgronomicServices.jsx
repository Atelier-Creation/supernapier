import React from 'react';
import { motion } from 'framer-motion';
import { Beaker, Sprout, Bug, Scissors } from 'lucide-react';

const iconMap = {
  Beaker,
  Sprout,
  Bug,
  Scissors
};

const AgronomicServices = ({ config }) => {
  const {
    title = "Agronomic Blueprint",
    subtitle = "We don't just supply slips; we provide the entire technical ecosystem required for 5,000-acre success.",
    buttonText = "View Technical Specs",
    services = [
      { title: "Soil Analysis", description: "Detailed nutrient mapping and pH adjustment strategies to optimize your soil for Super Napier vigor.", iconName: "Beaker" },
      { title: "Planting Tech", description: "Precision spacing and depth techniques ensuring 99% survival rate across massive acreages.", iconName: "Sprout" },
      { title: "Pest Management", description: "Eco-friendly, bio-industrial grade protection against local pests without compromising biomass quality.", iconName: "Bug" },
      { title: "Harvesting Systems", description: "Mechanized harvesting schedules designed to maximize regrowth speed and fiber quality.", iconName: "Scissors" }
    ]
  } = config || {};

  return (
    <section className="py-16 md:py-24 bg-slate-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row justify-between lg:items-end mb-12 md:mb-16 gap-6 md:gap-8">
          <div className="max-w-2xl text-center lg:text-left" data-aos="fade-right">
            <h2 className="text-3xl md:text-5xl font-bold text-deep-forest mb-4 md:mb-6">{title}</h2>
            <p className="text-lg md:text-xl text-gray-600">
              {subtitle}
            </p>
          </div>
          {buttonText && (
            <div className="flex justify-center lg:justify-start" data-aos="fade-left">
              <button className="w-full sm:w-auto bg-green-primary text-white px-8 md:px-10 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold hover:bg-deep-forest transition-all shadow-lg text-base md:text-lg">
                {buttonText}
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, i) => {
            const Icon = iconMap[service.iconName] || Sprout;
            return (
              <motion.div
                key={i}
                whileHover={{ height: 'auto', scale: 1.02 }}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className="bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-lg border border-gray-100 group cursor-pointer transition-all"
              >
                <div className="w-14 h-14 md:w-20 md:h-20 bg-earthy-gold/10 rounded-xl md:rounded-2xl flex items-center justify-center text-earthy-gold mb-6 md:mb-8 group-hover:bg-earthy-gold group-hover:text-white transition-all">
                  <Icon className="w-7 h-7 md:w-10 md:h-10" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-deep-forest mb-2 md:mb-4">{service.title}</h3>
                <p className="text-sm md:text-base text-gray-500 leading-relaxed group-hover:text-gray-700">
                  {service.description}
                </p>
                
                <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-50 flex items-center text-[10px] md:text-xs font-black uppercase tracking-widest text-earthy-gold">
                  Learn Strategy
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AgronomicServices;
