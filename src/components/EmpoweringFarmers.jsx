import React from 'react';
import { motion } from 'framer-motion';

export default function EmpoweringFarmers() {
    return (
        <section className="py-20 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tight">EMPOWERING FARMERS, SUSTAINING THE FUTURE</h2>
                </div>

                <div className="relative max-w-5xl mx-auto mt-16 pb-16">
                    {/* Main Image */}
                    <div className="w-full  relative rounded-tl-[100px] rounded-br-[100px] overflow-hidden shadow-xl mx-auto w-[85%] md:w-[70%] z-10">
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
                        className="absolute top-0 md:-left-8 left-4 -mt-8 md:-mt-12 bg-[#f4f6f1] p-8 md:p-10 rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-xl rounded-bl-xl shadow-lg border border-gray-100 z-20 w-[90%] md:w-80 text-center"
                    >
                        <p className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-2">Premium seeds product sold in over</p>
                        <h3 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4ade80] to-[#16a34a] mb-3">+250k</h3>
                        <p className="text-xs text-gray-500 leading-relaxed font-medium">Trusted by farmers worldwide, our premium seeds ensure exceptional quality.</p>
                    </motion.div>

                    {/* Right Stat */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="absolute top-1/2 -mt-16 md:-right-8 right-4 bg-[#f4f6f1] p-8 md:p-10 rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-xl rounded-bl-xl shadow-lg border border-gray-100 z-20 w-[85%] md:w-80 text-center"
                    >
                        <p className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-2">Sold in several countries</p>
                        <h3 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4ade80] to-[#16a34a] mb-3">+2k</h3>
                        <p className="text-xs text-gray-500 leading-relaxed font-medium">Our premium seeds are the go-to choice for farmers seeking robust growth, and higher crop productivity.</p>
                    </motion.div>

                    {/* Bottom Center Stat */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-[#f4f6f1] p-8 md:p-10 rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-xl rounded-bl-xl shadow-lg border border-gray-100 z-20 w-[90%] md:w-80 text-center"
                    >
                        <p className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-2">Our premium seeds,</p>
                        <h3 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4ade80] to-[#16a34a] mb-3">98%</h3>
                        <p className="text-xs text-gray-500 leading-relaxed font-medium">Germination rate, deliver exceptional quality, consistent growth, and abundant harvests— trusted by farmers globally</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
