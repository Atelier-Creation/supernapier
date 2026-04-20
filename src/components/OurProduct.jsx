import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { productApi } from '../api/productApi';

export default function OurProduct({ addToCart }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await productApi.getAllProducts();
                const productsArray = res.data.data || [];
                setProducts(productsArray.slice(0, 5));
            } catch (error) {
                console.error("Error fetching products for slider:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handlePrev = () => {
        if (products.length === 0) return;
        setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
    };

    const handleNext = () => {
        if (products.length === 0) return;
        setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
    };

    useEffect(() => {
        if (products.length === 0) return;
        const autoSlide = setInterval(() => {
            handleNext();
        }, 5000);

        return () => clearInterval(autoSlide);
    }, [products.length]);

    if (loading) {
        return (
            <div className="h-[400px] flex items-center justify-center bg-[#FAFCF8]">
                <Loader2 className="w-8 h-8 animate-spin text-[#16a34a]" />
            </div>
        );
    }

    if (products.length === 0) return null;

    const activeProduct = products[currentIndex];
    return (
        <section className="py-7 md:py-14 bg-[#FAFCF8] overflow-hidden relative">
            {/* Palm Shadow Right */}
            <img src="/palm-tree-shadow.avif" alt="Palm Shadow" className="absolute top-0 -left-64 scale-x-[-1] h-full object-contain opacity-60 pointer-events-none z-0" />
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <div className="mb-16 max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tight mb-6">OUR PRODUCT</h2>
                    <p className="text-sm md:text-base text-gray-500 leading-relaxed font-medium">
                        Unveiling a superior selection of hybrid seeds, crafted with cutting-edge innovation to boost agricultural productivity. fulfill market demands, and address the challenges posed by dynamic environmental changes
                    </p>
                </div>

                <div className="relative w-full max-w-full mx-auto flex items-center justify-center h-[350px] md:h-[500px]">
                    {/* Container for products */}
                    <div className="flex w-full items-center justify-center relative h-full">
                        {products.map((product, index) => {
                            // Determine relative position
                            let position = 'next';
                            if (index === currentIndex) position = 'active';
                            else if (index === (currentIndex === 0 ? products.length - 1 : currentIndex - 1)) position = 'prev';

                            // Set styles based on position
                            const isActive = position === 'active';
                            const isPrev = position === 'prev';
                            const isNext = position === 'next';

                            const image = product.images?.[0] || product.image || '/placeholder.png';
                            const name = product.name?.en || product.name || 'Seeds';

                            return (
                                <motion.div
                                    key={product._id || product.id}
                                    initial={false}
                                    animate={{
                                        x: isActive ? 0 : isPrev ? '-100%' : '100%',
                                        scale: isActive ? 1 : 0.65,
                                        opacity: isActive ? 1 : 0.8,
                                        zIndex: isActive ? 30 : 10,
                                    }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center justify-center cursor-pointer"
                                    onClick={() => setCurrentIndex(index)}
                                >
                                    <div className="relative w-64 md:w-100 h-auto filter drop-shadow-2xl">
                                        <img
                                            src={image}
                                            alt={name}
                                            className="w-full h-auto object-contain "
                                        />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Navigation Arrows */}
                <div className="flex items-center justify-center space-x-5 md:space-x-10 mt-0 relative z-10">
                    <button
                        onClick={handlePrev}
                        className="w-12 h-12 rounded-full border-2 border-gray-800 flex items-center justify-center hover:bg-gray-800 hover:text-white transition-colors text-gray-800"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    {/* Action button only visible on active */}
                    <motion.button
                        key={activeProduct.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        onClick={() => {
                            if (addToCart) {
                                addToCart(activeProduct);
                            }
                        }}
                        className="bg-[#16a34a] hover:bg-[#15803d] text-white px-4 md:px-8 py-3 rounded-full font-bold shadow-lg transition-colors"
                    >
                        Buy Now
                    </motion.button>

                    <button
                        onClick={handleNext}
                        className="w-12 h-12 rounded-full border-2 border-gray-800 flex items-center justify-center hover:bg-gray-800 hover:text-white transition-colors text-gray-800"
                    >
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    );
}
