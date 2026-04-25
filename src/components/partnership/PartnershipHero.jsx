import React from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

const PartnershipHero = ({ imageSrc }) => {
  React.useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-deep-forest py-12 md:py-20 px-4 md:px-6">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#C5A059,transparent_50%)]"></div>
      </div>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="text-left order-2 lg:order-1" data-aos="fade-right">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-white mb-6 leading-tight">
            Powering Your <span className="text-earthy-gold">5,000-Acre</span> Bio-Industrial Vision
          </h1>
          <p className="text-lg md:text-2xl text-slate-white/80 mb-8 md:mb-10 max-w-xl">
            Strategic feedstock partnership for Biofuel and Pulp Ventures. The Super Napier Team delivers excellence in biomass scalability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-earthy-gold hover:bg-earthy-gold/90 text-deep-forest px-8 py-3 md:py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl">
              Partner With Us
            </button>
            <button className="border-2 border-slate-white/30 hover:border-slate-white text-slate-white px-8 py-3 md:py-4 rounded-full font-bold text-lg transition-all">
              Download Proposal
            </button>
          </div>
        </div>

        <div className="relative flex justify-center items-center order-1 lg:order-2 mt-12 lg:mt-0" data-aos="fade-left">
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative z-10"
          >
            <img
              src={imageSrc}
              alt="Super Napier Grass"
              className="w-full max-w-md lg:max-w-xl drop-shadow-[0_35px_35px_rgba(197,160,89,0.3)] rounded-2xl"
            />
          </motion.div>
          
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-earthy-gold/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-green-primary/20 rounded-full blur-3xl animate-pulse"></div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-1 h-12 rounded-full bg-slate-white/30 flex justify-center">
          <div className="w-1 h-4 bg-earthy-gold rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default PartnershipHero;
