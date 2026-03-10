import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockProducts } from '../data/mockData';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

import ProductHero from '../components/product/ProductHero';
import ProductTabs from '../components/product/ProductTabs';
import SuggestedProducts from '../components/product/SuggestedProducts';
import HowToUseSection from '../components/product/HowToUseSection';
import StatisticalHighlights from '../components/StatisticalHighlights';

export default function ProductDetailPage({ addToCart }) {
    const { id } = useParams();
    const product = mockProducts.find(p => p.id === parseInt(id));

    const suggestedProducts = mockProducts
        .filter(p => p.id !== parseInt(id))
        .slice(0, 4);

    if (!product) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center">
                <h2 className="text-2xl font-bold text-[#1B5E20]">Product not found</h2>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="py-12 bg-[#FAFCF8]"
        >
            <div className="max-w-7xl mx-auto px-4 mt-15 sm:px-6 lg:px-8">
                {/* Back link */}
                <Link
                    to="/products"
                    className="inline-flex items-center space-x-2 text-[#1B5E20] font-medium hover:text-[#5D4037] mb-8 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back to Products</span>
                </Link>

                {/* ── Product Hero ── */}
                <ProductHero product={product} addToCart={addToCart} />

                {/* ── Tabbed Info ── */}
                <ProductTabs product={product} />
            </div>
            <StatisticalHighlights/>
            {/* ── How to Use Section ── */}
            <HowToUseSection />

            {/* ── Suggested Products ── */}
            <SuggestedProducts products={suggestedProducts} addToCart={addToCart} />
        </motion.div>
    );
}
