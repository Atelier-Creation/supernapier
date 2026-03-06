import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Star, Info, ChevronLeft, ChevronRight, Sprout, TrendingUp, Sun } from 'lucide-react';

export default function ProductHero({ product, addToCart }) {
    const [qty, setQty] = useState(1);
    const images = product.images?.length ? product.images : [product.image];
    const [activeIdx, setActiveIdx] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

    const goTo = useCallback((idx, dir = 1) => {
        setDirection(dir);
        setActiveIdx(idx);
    }, []);

    const prev = useCallback(() => {
        goTo((activeIdx - 1 + images.length) % images.length, -1);
    }, [activeIdx, images.length, goTo]);

    const next = useCallback(() => {
        goTo((activeIdx + 1) % images.length, 1);
    }, [activeIdx, images.length, goTo]);

    // Auto-slide every 3.5 s, pause on hover
    useEffect(() => {
        if (isPaused || images.length <= 1) return;
        const timer = setInterval(() => {
            setDirection(1);
            setActiveIdx(i => (i + 1) % images.length);
        }, 3500);
        return () => clearInterval(timer);
    }, [isPaused, images.length]);

    // Reset to first image when product changes
    useEffect(() => {
        setActiveIdx(0);
    }, [product.id]);

    const slideVariants = {
        enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">

            {/* ── Left: Image Slider ── */}
            <div
                className="flex flex-col gap-4"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* Main Viewer */}
                <div className="relative rounded-3xl overflow-hidden bg-[#F1F8E9] border border-gray-100 shadow-lg h-[480px] group">
                    <AnimatePresence custom={direction} mode="popLayout">
                        <motion.img
                            key={activeIdx}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                            src={images[activeIdx]}
                            alt={`${product.name} – view ${activeIdx + 1}`}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </AnimatePresence>

                    {/* Prev / Next arrows — only show if multiple images */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={prev}
                                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white text-[#1B5E20] w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all hover:scale-105 z-10 opacity-0 group-hover:opacity-100 duration-200"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={next}
                                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white text-[#1B5E20] w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all hover:scale-105 z-10 opacity-0 group-hover:opacity-100 duration-200"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>

                            {/* Dot indicators */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                {images.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => goTo(i, i > activeIdx ? 1 : -1)}
                                        className={`rounded-full transition-all duration-300 ${i === activeIdx
                                            ? 'bg-[#1B5E20] w-6 h-2'
                                            : 'bg-white/70 w-2 h-2 hover:bg-white'
                                            }`}
                                    />
                                ))}
                            </div>
                        </>
                    )}

                    {/* Auto-play progress bar */}
                    {images.length > 1 && !isPaused && (
                        <motion.div
                            key={`bar-${activeIdx}`}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 3.5, ease: 'linear' }}
                            className="absolute bottom-0 left-0 h-[3px] w-full bg-[#1B5E20] origin-left z-10"
                        />
                    )}
                </div>

                {/* Thumbnail Strip */}
                {images.length > 1 && (
                    <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
                        {images.map((src, i) => (
                            <button
                                key={i}
                                onClick={() => goTo(i, i > activeIdx ? 1 : -1)}
                                className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${i === activeIdx
                                    ? 'border-[#1B5E20] scale-105 shadow-md shadow-[#1B5E20]/20'
                                    : 'border-transparent opacity-60 hover:opacity-100 hover:border-gray-300'
                                    }`}
                            >
                                <img
                                    src={src}
                                    alt={`Thumbnail ${i + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* ── Right: Product Info ── */}
            <div className="flex flex-col">
                <div className="mb-4">
                    <span className="bg-[#F1F8E9] text-[#1B5E20] px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                        {product.category}
                    </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-[#1B5E20] mb-1 leading-tight">
                    {product.name}
                </h1>

                <div className="flex items-center space-x-4 mb-2">
                    <div className="flex text-yellow-500">
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
                    </div>
                    <span className="text-gray-500">(128 Reviews)</span>
                </div>

                <p className="text-4xl font-black text-[#5D4037] mb-4">₹{(product.price * qty).toFixed(2)} <span className="text-sm text-gray-500 font-normal">for {qty} {product?.unit}</span> </p>

                <p className="text-gray-600 text-lg leading-relaxed mb-5 border-b border-gray-100 pb-2">
                    {product.description}
                </p>

                <div className="grid grid-cols-3 lg:grid-cols-3 gap-3 mb-5">
                    {[
                        { label: 'Germination', value: product.germinationRate, icon: Sprout },
                        { label: 'Yield Potential', value: product.yieldPotential, icon: TrendingUp },
                        { label: 'Season', value: product.season, icon: Sun },
                    ].map(({ label, value, icon: Icon }) => (
                        <div key={label} className="group relative bg-[#F1F8E9] h-[52px] rounded-xl flex items-center justify-center border border-[#1B5E20]/15 overflow-hidden cursor-default transition-all duration-300 hover:bg-[#1B5E20] hover:shadow-lg hover:shadow-[#1B5E20]/20 cursor-pointer">

                            {/* Default State: Icon + Value */}
                            <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-[3px] md:gap-2.5 transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
                                <Icon className="w-5 h-5 text-[#1B5E20]" />
                                <span className="font-bold text-[#5D4037] text-xs md:text-sm">{value}</span>
                            </div>

                            {/* Hover State: Label text */}
                            <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-in-out translate-y-full group-hover:translate-y-0 text-center px-2">
                                <span className="text-[10px] sm:text-xs text-white uppercase font-bold tracking-wider leading-tight">{label}</span>
                            </div>

                        </div>
                    ))}
                </div>

                <div className="mb-5 flex items-center space-x-6">
                    <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden h-14 w-32">
                        <button
                            onClick={() => setQty(q => Math.max(1, q - 1))}
                            className="cursor-pointer px-4 text-gray-600 hover:bg-gray-100 h-full font-bold transition-colors"
                        >−</button>
                        <input
                            type="number"
                            readOnly
                            value={qty}
                            className="w-full text-center font-bold outline-none"
                        />
                        <button
                            onClick={() => setQty(q => q + 1)}
                            className="cursor-pointer px-4 text-gray-600 hover:bg-gray-100 h-full font-bold transition-colors"
                        >+</button>
                    </div>

                    <button
                        onClick={() => addToCart(product, qty)}
                        className="flex-1 bg-[#1B5E20] hover:bg-[#5D4037] text-white h-14 rounded-xl flex items-center justify-center space-x-3 font-bold text-lg transition-colors shadow-lg shadow-[#1B5E20]/30"
                    >
                        <ShoppingCart className="w-6 h-6" />
                        <span>Add to Cart — ₹{(product.price * qty).toFixed(2)}</span>
                    </button>
                </div>
                <div className={"flex gap-2 flex-wrap mb-3"}>
                    <img alt="visa" height="32" src="/payment-icon/visa.svg" />
                    <img alt="apple-pay" height="32" src="/payment-icon/apple-pay.svg" />
                    <img alt="master" height="32" src="/payment-icon/master.svg" />
                    <img alt="upisvg" height="32" src="/payment-icon/upisvg.svg" />
                </div>
            </div>
        </div>
    );
}
