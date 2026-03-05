import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Star, Headphones } from 'lucide-react';

export default function Hero() {
    const navigate = useNavigate();
    const [phase, setPhase] = useState('video'); // 'video' | 'hero'
    const [bgIdx, setBgIdx] = useState(0);

    const bgImages = [
        "/agriculture-healthy-food-hero-bg-tractor.png",
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=1920", // tractor in field
        "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?q=80&w=1920&auto=format&fit=crop",
        // "/hero-slider3.jpg",
        "/hero-slider4.jpg",
    ];

    useEffect(() => {
        // Lock scroll during video
        document.body.style.overflow = 'hidden';

        // After 5 s, fade out video → fade in hero banner
        const t = setTimeout(() => {
            setPhase('hero');
            document.body.style.overflow = 'auto';
        }, 5000);

        return () => {
            clearTimeout(t);
            document.body.style.overflow = 'auto';
        };
    }, []);

    // Auto-slide background images in 'hero' phase
    useEffect(() => {
        if (phase !== 'hero') return;
        const interval = setInterval(() => {
            setBgIdx((prev) => (prev + 1) % bgImages.length);
        }, 5000); // 5 seconds per slide
        return () => clearInterval(interval);
    }, [phase, bgImages.length]);

    return (
        <div className="relative w-full min-h-[100dvh] overflow-hidden bg-black">

            {/* ─── Phase 1: Intro Video ─── */}
            <AnimatePresence>
                {phase === 'video' && (
                    <motion.div
                        key="video"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: 'easeInOut' }}
                        className="absolute inset-0 z-20 bg-black"
                    >
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover opacity-90"
                        >
                            <source src="/168401-839220651_medium.mp4" type="video/mp4" />
                        </video>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ─── Phase 2: Hero Banner ─── */}
            <AnimatePresence>
                {phase === 'hero' && (
                    <motion.div
                        key="hero"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.2, ease: 'easeInOut' }}
                        className="relative z-10 w-full min-h-[100dvh] flex flex-col justify-end pt-32 pb-6 md:pb-10"
                    >
                        {/* Background slider */}
                        <div className="absolute inset-0 overflow-hidden bg-black">
                            <AnimatePresence mode="popLayout">
                                <motion.img
                                    key={bgIdx}
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1.5, ease: 'easeOut' }}
                                    src={bgImages[bgIdx]}
                                    alt={`Hero background ${bgIdx + 1}`}
                                    className="absolute inset-0 w-full h-full object-cover object-center"
                                />
                            </AnimatePresence>

                            {/* Dark gradient overlay — stronger on left for text legibility */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-black/5 z-0" />
                            <div className="absolute lg:hidden inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-0" />
                        </div>

                        {/* Content */}
                        <div className="relative w-full max-w-full mx-auto px-6 sm:px-10">
                            <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-10">

                                {/* ── Left: Headline + CTA ── */}
                                <div className="max-w-full">
                                    <motion.h1
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3, duration: 0.8 }}
                                        className="text-5xl md:text-4xl lg:text-[52px] font-black text-white leading-[1.1] mb-6 tracking-tight"
                                    >
                                        Growing Smarter<br />
                                        Farming Better.
                                    </motion.h1>

                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.45, duration: 0.7 }}
                                        className="text-gray-200 text-sm md:text-base leading-relaxed mb-8 max-w-md pr-4"
                                    >
                                        Empowering farmers with sustainable solutions modern technology and data driven insights
                                    </motion.p>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6, duration: 0.7 }}
                                    >
                                        <Link to="/products">
                                            <button className="group inline-flex items-center gap-2 bg-[#fde047] hover:bg-[#facc15] text-black font-semibold px-6 py-3 rounded-full transition-all duration-200 shadow-xl shadow-[#fde047]/20 hover:scale-105 text-sm">
                                                Explore Products
                                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                            </button>
                                        </Link>
                                    </motion.div>
                                </div>

                                {/* ── Right: Floating Card ── */}
                                <div className="flex flex-col md:items-end w-full md:w-auto mt-8 md:mt-0">
                                    <motion.div
                                        initial={{ opacity: 0, x: 40 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.75, duration: 0.7 }}
                                        className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[24px] p-4 flex flex-col gap-5 w-full md:w-[300px] shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                                    >
                                        {/* Top Image */}
                                        <div className="w-full h-36 rounded-2xl overflow-hidden relative">
                                            <img
                                                src="/napierStems.webp"
                                                alt="Fresh produce"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Stats Row */}
                                        <div className="flex items-center justify-between px-2">
                                            {/* Overlapping Avatars */}
                                            <div className="flex -space-x-2">
                                                <img className="w-8 h-8 rounded-full border-2 border-[#24331e] object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=100&h=100" alt="Farmer" />
                                                <img className="w-8 h-8 rounded-full border-2 border-[#24331e] object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?fit=crop&w=100&h=100" alt="Farmer" />
                                                <img className="w-8 h-8 rounded-full border-2 border-[#24331e] object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=100&h=100" alt="Farmer" />
                                            </div>

                                            {/* Stars and Text */}
                                            <div className="flex flex-col items-start lg:items-end">
                                                <div className="flex text-[#fde047] mb-0.5">
                                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                                                </div>
                                                <p className="text-gray-300 text-[10px] font-medium tracking-wide">Trusted by 100K+ Farmer</p>
                                            </div>
                                        </div>

                                        {/* Bottom Yellow Button */}
                                        <button onClick={() => navigate("/products")} className="w-full bg-[#fde047]  hover:bg-[#facc15] text-black font-semibold text-md py-3 rounded-full transition-colors duration-200">
                                            Buy Now
                                        </button>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
