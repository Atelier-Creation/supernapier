import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

export default function BestSellers({ bestSellers, addToCart }) {
    return (
        <section className="py-20 bg-[#F1F8E9]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl font-bold text-[#1B5E20] mb-4">Best Sellers</h2>
                        <p className="text-[#5D4037]">Our most popular, high-yield varieties.</p>
                    </div>
                    <Link to="/products" className="text-[#1B5E20] font-bold hover:text-[#5D4037] transition-colors hidden sm:block">
                        View All Products &rarr;
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
