import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const HeroBrutal = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.2; // Slow down the video playback
        }
    }, []);

    return (
        <section className="bg-white pt-20 pb-10 px-1">
            <div className="p-10 sm:p-10 m-5 rounded-3xl bg-gray-900 text-white flex items-center justify-center overflow-hidden shadow-2xl relative min-h-[600px]">
                {/* Background Video */}
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="/supergrowth.mp4" type="video/mp4" />
                </video>
                
                {/* Overlay for legibility */}
                <div className="absolute inset-0 bg-black/50 z-0"></div>

                <div className="w-full max-w-6xl px-4 sm:px-6 py-12 relative z-10">
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                        {/* Left Section: Text Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col justify-center text-center md:text-left z-10"
                        >
                            <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-8xl text-white font-extrabold uppercase leading-tight tracking-tight">
                                Design with <span className="text-[#facc15]">Impact</span>
                            </h1>
                            <p className="mt-4 text-[#27b774] sm:text-lg md:text-xl font-medium text-gray-200 text-balance">
                                Brutal aesthetics for a bold web presence. Build without compromise.
                            </p>
                            <div className="mt-6 sm:mt-8 flex flex-wrap gap-4">
                                <motion.a
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    href="#get-started"
                                    className="rounded-full p-3 grow text-center bg-[#facc15] text-black font-bold uppercase text-sm tracking-widest hover:bg-[#03953f] hover:text-white transition"
                                >
                                    Buy Now
                                </motion.a>
                                <motion.a
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    href="#learn-more"
                                    className="rounded-full p-3 grow border text-center border-[#facc15] text-[#facc15] font-bold uppercase text-sm tracking-widest hover:bg-[#facc15] hover:text-black transition"
                                >
                                    Learn More
                                </motion.a>
                            </div>
                        </motion.div>

                        {/* Right Section: Visual Block */}
                        <div className="relative flex items-center sm:m-10 justify-center">
                            <motion.div
                                initial={{ opacity: 0, rotate: 0 }}
                                whileInView={{ opacity: 1, rotate: 12 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="absolute -top-10 md:-top-20 -left-10 sm:w-32 sm:h-32 lg:w-64 lg:h-64 bg-transparent overflow-hidden rounded-lg shadow-xl max-sm:hidden"
                            >
                                <img src="/napierStems.webp" alt="Napier Stems" className="w-full h-full object-cover" />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                                whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="relative z-10 bg-[#facc15] p-4 sm:p-6 grow text-center shadow-2xl rounded-xl text-nowrap border-[#edbb00] border-b-4 border-r-8"
                            >
                                <h2 className="text-2xl sm:text-3xl font-bold uppercase text-gray-50">
                                    Bold. Strong. Raw.
                                </h2>
                                <p className="mt-1 text-sm sm:text-base font-light text-gray-100">
                                    Embrace minimalism with maximal impact.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, rotate: 0 }}
                                whileInView={{ opacity: 1, rotate: -12 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.6 }}
                                className="absolute -bottom-10 md:-bottom-20 -right-16 sm:w-32 sm:h-32 lg:w-64 lg:h-64 bg-transparent overflow-hidden rounded-lg shadow-xl max-sm:hidden "
                            >
                                <img src="/napierStems.webp" alt="Napier Stems" className="w-full h-full object-cover" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroBrutal;
