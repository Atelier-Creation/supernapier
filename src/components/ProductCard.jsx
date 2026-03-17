import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

export default function ProductCard({ product, addToCart }) {
    return (
        <motion.div
            whileHover={{ y: -6 }}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col overflow-hidden"
        >
            {/* Image */}
            <Link to={`/product/${product.id}`} className="relative h-52 overflow-hidden block bg-[#f2fae6]">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Category badge */}
                <div className="absolute top-3 left-3">
                    <span className="bg-white/80 backdrop-blur-md text-[#1B5E20] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                        {product.category}
                    </span>
                </div>
                {/* Discount badge */}
                <div className="absolute top-3 right-3">
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-sm">
                        30% off
                    </span>
                </div>
            </Link>

            {/* Body */}
            <div className="p-5 flex flex-col flex-grow">
                <Link to={`/product/${product.id}`}>
                    <h3 className="text-base font-extrabold text-gray-900 mb-1 group-hover:text-[#059669] transition-colors line-clamp-1 leading-tight">
                        {product.name}
                    </h3>
                </Link>
                <p className="text-gray-400 text-xs mb-4 line-clamp-2 leading-relaxed">{product.description}</p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                    <div>
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Price</p>
                        <p className="text-xl font-black text-gray-900">
                            ₹{(product.price || 0).toFixed(2)}
                            <span className="text-xs font-medium text-[#059669] ml-1">/kg</span>
                        </p>
                    </div>

                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                        }}
                        className="bg-[#111] hover:bg-[#059669] text-white p-3 rounded-full transition-colors shadow-md"
                    >
                        <ShoppingCart className="w-4 h-4" />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}
