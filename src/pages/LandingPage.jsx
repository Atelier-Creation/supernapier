import React from 'react';
import { motion } from 'framer-motion';
import HeroBrutal from '../components/HeroBrutal';
import ScrollExpansionHero from '../components/ScrollExpansionHero';
import WhyChooseUs from '../components/WhyChooseUs';
import EmpoweringFarmers from '../components/EmpoweringFarmers';
import OurProduct from '../components/OurProduct';
import CategoriesSection from '../components/CategoriesSection';
import BestSellers from '../components/BestSellers';
import FeaturesSection from '../components/FeaturesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import BlogSection from '../components/BlogSection';
import ContactSection from '../components/ContactSection';
import AboutUsSection from '../components/AboutUsSection';
import { mockProducts } from '../data/mockData';
import NewAboutSec from '../components/NewAboutSec';
import Hero from '../components/Hero';
import SemiPieSliderDemo from './SemiPieSliderDemo';
import CategorySliderDemo from './CategorySliderDemo';

export default function LandingPage({ addToCart }) {
    const bestSellers = mockProducts.slice(0, 4);

    return (
        <motion.div initial="hidden" animate="visible" exit={{ opacity: 0 }}>
            {/* <Hero /> */}
            <ScrollExpansionHero />
            {/* <HeroBrutal /> */}
            <CategoriesSection />
            <OurProduct addToCart={addToCart} />
            {/* <WhyChooseUs /> */}
            <CategorySliderDemo />
            {/* <SemiPieSliderDemo/> */}
            {/* <NewAboutSec /> */}
            <AboutUsSection />
            <FeaturesSection />
            <BestSellers bestSellers={bestSellers} addToCart={addToCart} />
            <BlogSection />
            <TestimonialsSection />
            <ContactSection />
        </motion.div>
    );
}
