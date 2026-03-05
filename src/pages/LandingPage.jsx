import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import WhyChooseUs from '../components/WhyChooseUs';
import EmpoweringFarmers from '../components/EmpoweringFarmers';
import OurProduct from '../components/OurProduct';
import CategoriesSection from '../components/CategoriesSection';
import BestSellers from '../components/BestSellers';
import FeaturesSection from '../components/FeaturesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import BlogSection from '../components/BlogSection';
import ContactSection from '../components/ContactSection';
import { mockProducts } from '../data/mockData';

export default function LandingPage({ addToCart }) {
    const bestSellers = mockProducts.slice(0, 4);

    return (
        <motion.div initial="hidden" animate="visible" exit={{ opacity: 0 }}>
            <Hero />
            <WhyChooseUs />
            <EmpoweringFarmers />
            <CategoriesSection />
            <OurProduct addToCart={addToCart} />
            <FeaturesSection />
            <BestSellers bestSellers={bestSellers} addToCart={addToCart} />
            <BlogSection />
            <TestimonialsSection />
            <ContactSection />
        </motion.div>
    );
}
