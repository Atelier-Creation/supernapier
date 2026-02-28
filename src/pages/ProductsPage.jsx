import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { mockProducts, mockCategories } from '../data/mockData';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';

export default function ProductsPage({ addToCart }) {
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');

    const filteredProducts = mockProducts.filter(p => {
        const matchCategory = filter === 'All' || p.category.includes(filter);
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
        return matchCategory && matchSearch;
    });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-12 bg-[#F1F8E9] min-h-screen"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-[#1B5E20] mb-4">Shop Seeds</h1>
                        <p className="text-lg text-[#5D4037]">Find the perfect seeds for your next harvest.</p>
                    </div>

                    <div className="mt-8 md:mt-0 flex flex-col sm:flex-row gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-12 pr-4 py-3 rounded-xl border border-gray-200 w-full sm:w-64 focus:ring-2 focus:ring-[#1B5E20] outline-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar Filters */}
                    <div className="w-full lg:w-64 flex-shrink-0">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-28">
                            <div className="flex items-center space-x-2 mb-6 text-[#1B5E20]">
                                <Filter className="w-5 h-5" />
                                <h3 className="font-bold text-xl">Filters</h3>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-semibold text-[#5D4037] mb-3">Categories</h4>
                                    <div className="space-y-2">
                                        <button
                                            onClick={() => setFilter('All')}
                                            className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${filter === 'All' ? 'bg-[#1B5E20] text-white' : 'hover:bg-gray-50 text-gray-600'}`}
                                        >
                                            All Seeds
                                        </button>
                                        {mockCategories.map(cat => (
                                            <button
                                                key={cat.id}
                                                onClick={() => setFilter(cat.name)}
                                                className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${filter === cat.name ? 'bg-[#1B5E20] text-white' : 'hover:bg-gray-50 text-gray-600'}`}
                                            >
                                                {cat.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} addToCart={addToCart} />
                            ))}
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                <p className="text-[#5D4037] text-xl font-medium">No products found for your search.</p>
                                <button onClick={() => { setFilter('All'); setSearch(''); }} className="mt-4 text-[#1B5E20] font-bold hover:underline">Clear Filters</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
