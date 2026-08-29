import React, { useState, useEffect } from 'react';
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
import { productApi } from '../api/productApi';
import NewAboutSec from '../components/NewAboutSec';
import Hero from '../components/Hero';
import SemiPieSliderDemo from './SemiPieSliderDemo';
import CategorySliderDemo from './CategorySliderDemo';
import TrustSection from '../components/TrustSection';
import SEO from '../components/SEO';
import { Helmet } from 'react-helmet-async';

export default function LandingPage({ addToCart }) {
    const [bestSellers, setBestSellers] = useState([]);

    useEffect(() => {
        const fetchBestSellers = async () => {
            try {
                const res = await productApi.getAllProducts();
                // For now, just take first 4 as best sellers
                const products = res.data.data || [];
                setBestSellers(products.slice(0, 4));
            } catch (error) {
                console.error("Error fetching best sellers:", error);
            }
        };
        fetchBestSellers();
    }, []);

    const siteUrl = window.location.origin;

    const orgSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Super Napier (Ponni Seeds)",
        "url": siteUrl,
        "logo": `${siteUrl}/logo.png`,
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-76394-44670",
            "contactType": "customer service"
        }
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Super Napier",
        "url": siteUrl,
        "potentialAction": {
            "@type": "SearchAction",
            "target": `${siteUrl}/products?search={search_term_string}`,
            "query-input": "required name=search_term_string"
        }
    };

    return (
        <motion.div initial="hidden" animate="visible" exit={{ opacity: 0 }}>
            <SEO 
                title="Super Napier fodder grass seeds - High Yield Agriculture Fodder" 
                description="Super Napier is India's leading brand for high-yield fodder grass seeds. Empowering livestock farmers with up to 200 tons/acre annual yield of high protein grass." 
                keywords="super napier, grass seed, high yield fodder, agriculture, livestock feed, napier slips"
                url={window.location.href}
            />
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(orgSchema)}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify(websiteSchema)}
                </script>
            </Helmet>
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
            <TrustSection/>
            <TestimonialsSection />
            <ContactSection />
        </motion.div>
    );
}
