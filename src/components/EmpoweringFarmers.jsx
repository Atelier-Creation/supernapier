import React from 'react';
import { motion } from 'framer-motion';

export default function EmpoweringFarmers() {
    return (
        <section className="py-10 md:py-20 bg-[#FAFCF8] relative overflow-hidden">
            {/* Palm Shadow Right */}
            <img src="/palm-tree-shadow.avif" alt="Palm Shadow" className="absolute top-0 -left-14 h-full object-contain opacity-60 scale-x-[-1] pointer-events-none z-0" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-2xl md:text-5xl font-black text-gray-900 uppercase tracking-tight">EMPOWERING FARMERS, SUSTAINING THE FUTURE</h2>
                </div>

                <div className="relative max-w-5xl mx-auto mt-24 md:mt-16 pb-10 md:pb-16 block items-center gap-8">
                    {/* Background Tractor Vector */}
                    <motion.img
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        src="/tractor-vector.png"
                        alt="Tractor"
                        className="absolute hidden md:block -left-34 top-[70%] -translate-y-1/2 w-72 lg:w-96 opacity-30 z-0 pointer-events-none"
                    />

                    {/* Main Image */}
                    <div className="w-[95%] relative rounded-[2rem] md:rounded-tl-[100px] md:rounded-br-[100px] overflow-hidden shadow-xl mx-auto md:w-[70%] z-10 aspect-[4/5] md:aspect-[16/9] block">
                        <img
                            src="/napierStems.webp"
                            alt="Farming"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Top Left Stat */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="absolute -top-10 md:top-0 left-2 md:-left-8 -mt-0 md:-mt-12 bg-[#f4f6f1] p-6 md:p-10 rounded-tl-[2rem] rounded-br-[2rem] md:rounded-tl-[3rem] md:rounded-br-[3rem] rounded-tr-xl rounded-bl-xl shadow-lg border border-gray-100 z-20 w-[75%] md:w-80 text-center"
                    >
                        <p className="text-[10px] md:text-sm font-bold text-gray-800 uppercase tracking-wide mb-1 md:mb-2">Premium seeds product sold in over</p>
                        <h3 className="text-2xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4ade80] to-[#16a34a] mb-2 md:mb-3">+250k</h3>
                        <p className="text-[8px] md:text-xs text-gray-500 leading-relaxed font-medium">Trusted by farmers worldwide, our premium seeds ensure exceptional quality.</p>
                    </motion.div>

                    {/* Right Stat */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="absolute top-1/3 md:top-1/2 mt-0 md:-mt-16 -right-2 md:-right-8 bg-[#f4f6f1] p-6 md:p-10 rounded-tl-[2rem] rounded-br-[2rem] md:rounded-tl-[3rem] md:rounded-br-[3rem] rounded-tr-xl rounded-bl-xl shadow-lg border border-gray-100 z-20 w-[75%] md:w-80 text-center"
                    >
                        <p className="text-[10px] md:text-sm font-bold text-gray-800 uppercase tracking-wide mb-1 md:mb-2">Sold in several countries</p>
                        <h3 className="text-2xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4ade80] to-[#16a34a] mb-2 md:mb-3">+2k</h3>
                        <p className="text-[8px] md:text-xs text-gray-500 leading-relaxed font-medium">Our premium seeds are the go-to choice for farmers seeking robust growth, and higher crop productivity.</p>
                    </motion.div>

                    {/* Bottom Center Stat */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="absolute -bottom-5 md:-bottom-16 left-1/2 -translate-x-1/2 bg-[#f4f6f1] p-6 md:p-10 rounded-tl-[2rem] rounded-br-[2rem] md:rounded-tl-[3rem] md:rounded-br-[3rem] rounded-tr-xl rounded-bl-xl shadow-lg border border-gray-100 z-20 w-[85%] md:w-80 text-center"
                    >
                        <p className="text-[10px] md:text-sm font-bold text-gray-800 uppercase tracking-wide mb-1 md:mb-2">Our premium seeds,</p>
                        <h3 className="text-2xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4ade80] to-[#16a34a] mb-2 md:mb-3">98%</h3>
                        <p className="text-[8px] md:text-xs text-gray-500 leading-relaxed font-medium">Germination rate, deliver exceptional quality, consistent growth, and abundant harvests— trusted by farmers globally</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
