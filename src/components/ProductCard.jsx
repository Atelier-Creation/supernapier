import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, Share2 } from 'lucide-react';
import ShareModal from './common/ShareModal';

export default function ProductCard({ product, addToCart }) {
    const [isShareOpen, setIsShareOpen] = useState(false);
    const id = product._id || product.id;
    const name = product.name?.en || product.name || 'Unnamed Product';
    const description = product.description?.en || product.description || '';
    const image = product.images?.[0] || product.image || '/placeholder.png';
    const category = product.category?.name?.en || product.category?.name || product.category || 'Seeds';

    // Get price from weightOptions
    const baseOption = product.weightOptions?.[0] || {};
    const p1 = Number(baseOption.price || product.price || 0);
    const p2 = Number(baseOption.discountPrice || 0);
    const currentPrice = (p2 > 0) ? Math.min(p1, p2) : p1;
    const originalPrice = (p2 > 0) ? Math.max(p1, p2) : p1;
    const hasDiscount = p2 > 0 && p1 !== p2;
    const discountPercent = hasDiscount ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : null;
    const weight = baseOption.weight || '1';
    const unit = baseOption.unit || product.unit || 'kg';

    return (
        <motion.div
            whileHover={{ y: -6 }}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col overflow-hidden"
        >
            {/* Image */}
            <div className="relative h-52 overflow-hidden block bg-[#f2fae6]">
                <Link to={`/product/${id}`} className="block w-full h-full">
                    <img
                        src={image}
                        alt={name}
                        className={`w-full h-full ${image.toLowerCase().endsWith('.png') ? 'object-contain bg-[#eef8ed]' : 'object-cover'} group-hover:scale-105 transition-transform duration-700`}
                    />
                </Link>

                {/* Category badge */}
                <div className="absolute top-3 left-3 pointer-events-none">
                    <span className="bg-white/80 backdrop-blur-md text-[#1B5E20] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                        {category}
                    </span>
                </div>

                {/* Top Right: Discount badge & Floating Share Button */}
                <div className="absolute top-3 right-3 flex flex-col items-end gap-2 z-10">
                    {discountPercent && (
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-sm">
                            {discountPercent}% off
                        </span>
                    )}
                    <motion.button
                        whileTap={{ scale: 0.88 }}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsShareOpen(true);
                        }}
                        title="Share Product"
                        aria-label="Share product"
                        className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md shadow-sm hover:shadow-md text-gray-600 hover:text-[#1B5E20] hover:bg-white flex items-center justify-center transition-all hover:scale-110 cursor-pointer border border-gray-100"
                    >
                        <Share2 className="w-3.5 h-3.5" />
                    </motion.button>
                </div>
            </div>

            {/* Body */}
            <div className="p-5 flex flex-col flex-grow">
                <Link to={`/product/${id}`}>
                    <h3 className="text-base font-extrabold text-gray-900 mb-1 group-hover:text-[#059669] transition-colors line-clamp-1 leading-tight">
                        {name}
                    </h3>
                </Link>
                <p className="text-gray-400 text-xs mb-4 line-clamp-1 leading-relaxed">{description}</p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                    <div>
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Price</p>
                        <div className="flex items-baseline gap-1">
                            <p className="text-lg font-black text-gray-900">
                                ₹{(Number(currentPrice) || 0).toFixed(2)}
                            </p>
                            {hasDiscount && (
                                <p className="text-[11px] text-gray-400 line-through">₹{(Number(originalPrice) || 0).toFixed(2)}</p>
                            )}
                            <span className="text-[10px] font-bold text-[#059669]">/ {weight}{unit}</span>
                        </div>
                    </div>

                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                            e.preventDefault();
                            addToCart({
                                ...product,
                                id: product._id || product.id,
                                weightOptionId: baseOption._id,
                                price: currentPrice,
                                unit: unit,
                                weight: baseOption.weight
                            });
                        }}
                        className="bg-[#111] hover:bg-[#059669] text-white p-3 rounded-full transition-colors shadow-md cursor-pointer"
                        aria-label="Add to cart"
                    >
                        <ShoppingCart className="w-4 h-4" />
                    </motion.button>
                </div>
            </div>

            {/* Share Modal */}
            <ShareModal
                isOpen={isShareOpen}
                onClose={() => setIsShareOpen(false)}
                product={product}
            />
        </motion.div>
    );
}
