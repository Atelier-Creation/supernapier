import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function AboutUsSection() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 40,
                y: (e.clientY / window.innerHeight - 0.5) * 40
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <section className="py-24 bg-[#FAFCF8] overflow-hidden relative">

            {/* Floating Grass 1 - Top Left */}
            <motion.div
                className="absolute top-10 left-5 md:top-20 md:left-20 z-0 pointer-events-none hidden sm:block"
                animate={{
                    x: mousePosition.x * 1.5,
                    y: mousePosition.y * 1.5
                }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
            >
                <motion.img
                    src="/napier-grass.png"
                    alt="Floating Grass"
                    className="w-24 h-24 md:w-32 md:h-32 object-contain opacity-70 drop-shadow-xl"
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 15, -10, 0]
                    }}
                    transition={{
                        duration: 6,
                        ease: "easeInOut",
                        repeat: Infinity,
                    }}
                />
            </motion.div>

            {/* Floating Grass 2 - Bottom Right */}
            <motion.div
                className="absolute bottom-20 right-5 md:bottom-32 md:right-20 z-0 pointer-events-none hidden sm:block"
                animate={{
                    x: mousePosition.x * -1.2,
                    y: mousePosition.y * -1.2
                }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
            >
                <motion.img
                    src="/napier-grass.png"
                    alt="Floating Grass"
                    className="w-28 h-28 md:w-40 md:h-40 object-contain opacity-60 drop-shadow-2xl"
                    animate={{
                        y: [0, 25, 0],
                        rotate: [0, -15, 10, 0]
                    }}
                    transition={{
                        duration: 7,
                        ease: "easeInOut",
                        repeat: Infinity,
                        delay: 1
                    }}
                />
            </motion.div>

            {/* Floating Grass 3 - Top Right (Small) */}
            <motion.div
                className="absolute top-40 right-24 z-0 pointer-events-none hidden lg:block"
                animate={{
                    x: mousePosition.x * 0.8,
                    y: mousePosition.y * 0.8
                }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
            >
                <motion.img
                    src="/napier-grass.png"
                    alt="Floating Grass"
                    className="w-16 h-16 md:w-20 md:h-20 object-contain opacity-50 drop-shadow-lg"
                    animate={{
                        y: [0, -15, 0],
                        rotate: [0, 20, -20, 0]
                    }}
                    transition={{
                        duration: 5,
                        ease: "easeInOut",
                        repeat: Infinity,
                        delay: 2
                    }}
                />
            </motion.div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Top Text with Image Mask */}
                <div className="text-center mb-32">
                    <motion.h2
                        className="text-5xl md:text-7xl lg:text-[6rem] font-black uppercase tracking-tight leading-tight"
                        animate={{
                            backgroundPosition: ["50% 40%", "50% 30%", "50% 40%"]
                        }}
                        transition={{
                            duration: 20,
                            ease: "linear",
                            repeat: Infinity
                        }}
                        style={{
                            backgroundImage: "url('./agriculture-healthy-food-hero-bg-tractor.png')",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            color: "transparent",
                            backgroundSize: "100% auto"
                        }}>
                        Premium Super<br /> Napier for Farmers
                    </motion.h2>
                </div>

                {/* About Content */}
                <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 mt-24 lg:mt-32 w-full">

                    {/* HUGE Background Text */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 0.09, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] md:text-[200px] lg:text-[240px] font-black tracking-tighter text-[#eab308] pointer-events-none z-0 selection:bg-transparent flex flex-col items-center justify-center w-full leading-[0.8]"
                    >
                        <span className="text-gray-400">SUPER</span>
                        <span>NAPIER</span>
                    </motion.div>

                    {/* Left Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-[37%] flex flex-col items-center lg:items-start text-center lg:text-left z-10 relative"
                    >
                        <h3 className="text-4xl md:text-5xl font-black text-gray-900 leading-none uppercase mb-3 drop-shadow-sm">
                            ABOUT
                        </h3>
                        <h3 className="text-4xl md:text-5xl font-light text-[#eab308] opacity-70 leading-none uppercase mb-8">
                            SUPER NAPIER
                        </h3>

                        <Link to="/about">
                            <button className="mt-2 bg-[#fde047] hover:bg-[#facc15] text-black font-bold px-8 py-4 rounded-full flex items-center justify-center gap-2 transition-colors w-full sm:w-auto shadow-xl">
                                More About
                            </button>
                        </Link>
                    </motion.div>

                    {/* Middle Column (Image with Frame) */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:w-[40%] flex justify-center z-10 relative w-full px-4 my-12 lg:my-0"
                    >
                        <div className="relative w-full max-w-[280px] md:max-w-[350px]">
                            {/* The Frame */}
                            <div className="absolute inset-x-4 -inset-y-12 md:inset-x-8 md:-inset-y-16 border-[6px] border-[#fde047] z-0"></div>
                            {/* The Image */}
                            <img
                                src="/sunflower_seeds_PNG32.png"
                                alt="Super Napier Seeds"
                                className="relative z-10 w-full h-[350px] object-contain drop-shadow-2xl"
                            />
                        </div>
                    </motion.div>

                    {/* Right Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="lg:w-[30%] flex flex-col gap-6 text-gray-500 z-10 relative mt-8 lg:mt-0 text-sm md:text-base text-center lg:text-left"
                    >
                        <p className="leading-relaxed">
                            Super Napier is a highly productive green fodder grass, engineered to provide unparalleled yield and nutrition. By combining the strengths of Elephant Grass and Pearl Millet, it represents a leap forward in sustainable agriculture and livestock farming.
                        </p>
                        <p className="leading-relaxed">
                            Renowned for its rapid growth, resilience in challenging soils, and exceptional protein content, Super Napier ensures that your farm remains productive year-round. It is not just a seed; it is a long-term investment in agricultural success.
                        </p>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
