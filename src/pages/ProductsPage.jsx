import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { mockProducts, mockCategories } from '../data/mockData';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const SVG_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function ProductsPage({ addToCart }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const querySearch = searchParams.get('search') || '';

    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState(querySearch);

    // Sync state if URL changes
    useEffect(() => {
        setSearch(searchParams.get('search') || '');
    }, [searchParams]);

    // Update URL when search changes
    const handleSearchChange = (e) => {
        const val = e.target.value;
        setSearch(val);
        if (val) {
            setSearchParams({ search: val });
        } else {
            setSearchParams({});
        }
    };

    const filteredProducts = mockProducts.filter(p => {
        const matchCategory = filter === 'All' || p.category.includes(filter);
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
        return matchCategory && matchSearch;
    });

    const allFilters = ['All', ...mockCategories.map(c => c.name)];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-[#FAFCF8] min-h-screen relative overflow-hidden"
        >
            {/* SVG Cross Pattern Background */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute inset-0" style={{ backgroundImage: SVG_PATTERN }} />
            </div>

            {/* Palm Tree Decoration */}
            {/* <img
                src="/palm-tree-shadow.avif"
                alt=""
                className="absolute top-0 -right-48 h-full object-contain opacity-40 pointer-events-none z-0"
            /> */}

            <div className="max-w-full mx-auto  px-4 sm:px-20 relative z-10 py-28">

                {/* ── Page Header ── */}
                <motion.div
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
                >
                    <div>
                        <p className="text-xs font-bold text-[#059669] uppercase tracking-widest mb-0">Our Products</p>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tight leading-tight">
                            Shop <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ade80] to-[#16a34a]">Seeds</span>
                        </h1>
                        <p className="text-gray-500 mt-3 text-sm md:text-base max-w-sm leading-relaxed">
                            Find the perfect seeds for your next harvest — fresh from the farm.
                        </p>
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={handleSearchChange}
                            className="w-full md:w-64 bg-white border border-gray-200 rounded-full py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#059669]/20 focus:border-[#059669]"
                        />
                    </div>
                </motion.div>

                {/* ── Category Pills ── */}
                <motion.div
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-wrap gap-2 mb-10"
                >
                    {allFilters.map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-5 py-2 rounded-full text-sm font-bold transition-all border ${filter === f
                                ? 'bg-[#111] text-white border-[#111] shadow-md'
                                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </motion.div>

                {/* ── Product Grid ── */}
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((product, i) => (
                            <motion.div
                                key={product.id}
                                variants={fadeIn}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <ProductCard product={product} addToCart={addToCart} />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                        className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm"
                    >
                        <p className="text-gray-400 text-lg font-semibold mb-1">No products found.</p>
                        <p className="text-gray-400 text-sm mb-5">Try a different category or search term.</p>
                        <button
                            onClick={() => { setFilter('All'); setSearch(''); }}
                            className="bg-[#111] hover:bg-black text-white px-8 py-3 rounded-full font-bold text-sm transition-all shadow-md hover:scale-105"
                        >
                            Clear Filters
                        </button>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}
