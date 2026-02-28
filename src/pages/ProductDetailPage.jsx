import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockProducts } from '../data/mockData';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Info, ArrowLeft } from 'lucide-react';

export default function ProductDetailPage({ addToCart }) {
    const { id } = useParams();
    const product = mockProducts.find(p => p.id === parseInt(id));
    const [qty, setQty] = useState(1);

    if (!product) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center">
                <h2 className="text-2xl font-bold text-[#1B5E20]">Product not found</h2>
            </div>
        );
    }

    const relatedProducts = mockProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="py-12 bg-white"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/products" className="inline-flex items-center space-x-2 text-[#1B5E20] font-medium hover:text-[#5D4037] mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back to Products</span>
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
                    {/* Image Gallery */}
                    <div>
                        <div className="rounded-3xl overflow-hidden bg-[#F1F8E9] border border-gray-100 shadow-lg">
                            <motion.img
                                initial={{ scale: 1.1 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.5 }}
                                src={product.image}
                                alt={product.name}
                                className="w-full h-[500px] object-cover"
                            />
                        </div>
                    </div>

                    {/* Details */}
                    <div className="flex flex-col">
                        <div className="mb-4">
                            <span className="bg-[#F1F8E9] text-[#1B5E20] px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                                {product.category}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-[#1B5E20] mb-4 leading-tight">
                            {product.name}
                        </h1>

                        <div className="flex items-center space-x-4 mb-6">
                            <div className="flex text-yellow-500">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
                            </div>
                            <span className="text-gray-500">(128 Reviews)</span>
                        </div>

                        <p className="text-4xl font-black text-[#5D4037] mb-8">${product.price.toFixed(2)}</p>

                        <p className="text-gray-600 text-lg leading-relaxed mb-10 border-b border-gray-100 pb-10">
                            {product.description}
                        </p>

                        <div className="grid grid-cols-2 gap-6 mb-10">
                            <div className="bg-[#F1F8E9] p-4 rounded-2xl flex items-start space-x-4 border border-[#1B5E20]/10">
                                <Info className="w-6 h-6 text-[#1B5E20]" />
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Germination</p>
                                    <p className="font-bold text-[#5D4037]">{product.germinationRate}</p>
                                </div>
                            </div>
                            <div className="bg-[#F1F8E9] p-4 rounded-2xl flex items-start space-x-4 border border-[#1B5E20]/10">
                                <Info className="w-6 h-6 text-[#1B5E20]" />
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Yield Potential</p>
                                    <p className="font-bold text-[#5D4037]">{product.yieldPotential}</p>
                                </div>
                            </div>
                            <div className="bg-[#F1F8E9] p-4 rounded-2xl flex items-start space-x-4 border border-[#1B5E20]/10">
                                <Info className="w-6 h-6 text-[#1B5E20]" />
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Season</p>
                                    <p className="font-bold text-[#5D4037]">{product.season}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto flex items-center space-x-6">
                            <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden h-14 w-32">
                                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-4 text-gray-600 hover:bg-gray-100 h-full font-bold transition-colors">-</button>
                                <input type="number" readOnly value={qty} className="w-full text-center font-bold outline-none" />
                                <button onClick={() => setQty(q => q + 1)} className="px-4 text-gray-600 hover:bg-gray-100 h-full font-bold transition-colors">+</button>
                            </div>

                            <button
                                onClick={() => addToCart(product, qty)}
                                className="flex-1 bg-[#1B5E20] hover:bg-[#5D4037] text-white h-14 rounded-xl flex items-center justify-center space-x-3 font-bold text-lg transition-colors shadow-lg shadow-[#1B5E20]/30"
                            >
                                <ShoppingCart className="w-6 h-6" />
                                <span>Add to Cart - ${(product.price * qty).toFixed(2)}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
