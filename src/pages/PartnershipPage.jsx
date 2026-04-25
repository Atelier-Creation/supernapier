import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

import PartnershipHero from '../components/partnership/PartnershipHero';
import ProblemSolution from '../components/partnership/ProblemSolution';
import StatsGrid from '../components/partnership/StatsGrid';
import ProductApplications from '../components/partnership/ProductApplications';
import ComparisonTable from '../components/partnership/ComparisonTable';
import AgronomicServices from '../components/partnership/AgronomicServices';
import PhasedTimeline from '../components/partnership/PhasedTimeline';
import ContactFooter from '../components/partnership/ContactFooter';

const PartnershipPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
    });
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="bg-white overflow-x-hidden"
    >
      <PartnershipHero imageSrc="/assets/partnership/hero.png" />
      
      <div id="pillars">
        <ProblemSolution />
      </div>

      <div id="stats">
        <StatsGrid />
      </div>

      <div id="applications">
        <ProductApplications imageSrc="/assets/partnership/industrial.png" />
      </div>

      <div id="scalability">
        <ComparisonTable />
      </div>

      <div id="timeline">
        <PhasedTimeline />
      </div>

      <div id="services">
        <AgronomicServices />
      </div>

      <div id="contact">
        <ContactFooter />
      </div>
    </motion.div>
  );
};

export default PartnershipPage;
