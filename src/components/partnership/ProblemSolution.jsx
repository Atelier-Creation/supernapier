import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, TrendingUp, Zap } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const pillars = [
  {
    title: "Unmatched Yield",
    description: "Achieve up to 200 tons per acre annually, ensuring a consistent supply for large-scale industrial needs.",
    icon: <Zap className="w-12 h-12 text-earthy-gold" />,
    color: "bg-deep-forest",
  },
  {
    title: "Ironclad Reliability",
    description: "Engineered for resilience, our Super Napier slips guarantee rapid regrowth and year-round availability.",
    icon: <ShieldCheck className="w-12 h-12 text-earthy-gold" />,
    color: "bg-deep-forest",
  },
  {
    title: "Maximum Profitability",
    description: "Lower input costs and high biomass density translate directly to superior ROI for biofuel and pulp ventures.",
    icon: <TrendingUp className="w-12 h-12 text-earthy-gold" />,
    color: "bg-deep-forest",
  }
];

const ProblemSolution = () => {
  return (
    <section className="py-16 md:py-24 bg-slate-white overflow-hidden">
      <style>{`
        .pillars-swiper .swiper-pagination-bullet-active {
          background: #C5A059 !important;
        }
        .pillars-swiper {
          padding-bottom: 50px !important;
        }
      `}</style>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-5xl font-bold text-deep-forest mb-4">The Foundational Choice</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Why industry leaders are switching to Super Napier for their bio-industrial feedstock.
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="group bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all border border-gray-100 relative overflow-hidden h-full"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-earthy-gold/5 rounded-bl-full transition-all group-hover:bg-earthy-gold/10"></div>
              <div className="mb-6 inline-block p-4 bg-slate-white rounded-2xl group-hover:scale-110 transition-transform">
                {pillar.icon}
              </div>
              <h3 className="text-2xl font-bold text-deep-forest mb-4">{pillar.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {pillar.description}
              </p>
              
              <div className="mt-8 flex items-center text-earthy-gold font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                Learn More <span className="ml-2">→</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="md:hidden" data-aos="fade-up">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            spaceBetween={20}
            slidesPerView={1.1}
            centeredSlides={true}
            className="pillars-swiper"
          >
            {pillars.map((pillar, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 relative overflow-hidden h-full mb-4">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-earthy-gold/5 rounded-bl-full"></div>
                  <div className="mb-6 inline-block p-4 bg-slate-white rounded-2xl">
                    {pillar.icon}
                  </div>
                  <h3 className="text-xl font-bold text-deep-forest mb-3">{pillar.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                  <div className="flex items-center text-earthy-gold font-bold text-sm">
                    Learn More <span className="ml-2">→</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
