import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

export default function BestSellers({ bestSellers, addToCart }) {
    return (
        <section className="py-20 bg-[#F1F8E9] relative overflow-hidden">
            {/* Palm Shadow Left */}
            <img src="/palm-tree-shadow.avif" alt="Palm Shadow" className="absolute top-0 -left-64 h-full object-contain opacity-[0.04] pointer-events-none z-0 scale-x-[-1]" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="mb-16 max-w-full mx-auto text-center flex items-center justify-between">
                    <div>
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tight mb-6">BEST SELLERS</h2>
                    <p className="text-sm md:text-base text-gray-500 leading-relaxed font-medium mb-8">
                        Our most popular, high-yield varieties.
                    </p>
                    </div>
                    <Link to="/products" className="inline-block bg-[#111] hover:bg-black text-white px-8 py-3 rounded-full font-bold text-sm transition-colors text-center shadow-lg">
                        View All Products
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {bestSellers.map((product) => (
                        <ProductCard key={product.id} product={product} addToCart={addToCart} />
                    ))}
                </div>
            </div>
        </section>
    );
}
