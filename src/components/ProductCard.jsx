import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

export default function ProductCard({ product, addToCart }) {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="bg-white rounded-2xl shadow-sm hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 group flex flex-col"
        >
            <Link to={`/product/${product.id}`} className="relative h-64 overflow-hidden block">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                    <span className="bg-[#F1F8E9] text-[#1B5E20] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                        {product.category}
                    </span>
                </div>
            </Link>

            <div className="p-6 flex flex-col flex-grow">
                <Link to={`/product/${product.id}`}>
                    <h3 className="text-xl font-bold text-[#1B5E20] mb-2 group-hover:text-[#5D4037] transition-colors line-clamp-1">{product.name}</h3>
                </Link>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>

                <div className="flex items-end justify-between mt-auto pt-4 border-t border-gray-50">
                    <div>
                        <p className="text-xs text-gray-400 uppercase font-semibold">Price</p>
                        <p className="text-2xl font-bold text-[#5D4037]">₹{product.price.toFixed(2)}<span className='text-sm text-[#1B5E20]'>/kg</span></p>
                    </div>

                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                        }}
                        className="bg-[#F1F8E9] hover:bg-[#1B5E20] text-[#1B5E20] hover:text-white p-3 rounded-xl transition-colors shadow-sm"
                    >
                        <ShoppingCart className="w-6 h-6" />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}
