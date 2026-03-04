import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../ProductCard';

export default function SuggestedProducts({ products, addToCart }) {
    if (!products || products.length === 0) return null;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-t border-gray-200">
            {/* Header row */}
            <div className="flex items-start justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-black uppercase text-[#1B5E20] mb-1">Others you might like</h2>
                    <p className="text-[#5D4037] text-sm">
                        Other customers also showed interest in these similar items.
                    </p>
                </div>
                <Link
                    to="/products"
                    className="flex items-center gap-2 border-2 border-[#1B5E20] text-[#1B5E20] hover:bg-[#1B5E20] hover:text-white px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap mt-1"
                >
                    Shop All Products
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            {/* Product cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((p, idx) => (
                    <motion.div
                        key={p.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.08 }}
                    >
                        <ProductCard product={p} addToCart={addToCart} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
