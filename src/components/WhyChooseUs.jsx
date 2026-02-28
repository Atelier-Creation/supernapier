import React from 'react';
import { motion } from 'framer-motion';
import { Package, LayoutGrid, FileSearch, Globe2 } from 'lucide-react';

export default function WhyChooseUs() {
    return (
        <section className="py-24 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative z-10">
                    <div className="text-center md:px-20 mb-20">
                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 uppercase tracking-tight">WHY CHOOSE OUR QUALITY SEEDS?</h2>
                        <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-5xl mx-auto font-medium">
                            Providing food for the growing global population in a safe and sustainable way. Farming is a complex, unpredictable, and individual endeavor. Our main activity is collaborating with farmers to address their various challenges through innovative, high-quality, and effective solutions. By improving agricultural yields, we enable increased profitability for farmers and rural prosperity.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <motion.div whileHover={{ y: -5 }} className="bg-[#fff4ed] p-10 flex flex-col items-center text-center rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-xl rounded-bl-xl shadow-sm border border-orange-50/50">
                            <Package className="w-16 h-16 text-gray-800 mb-6 stroke-[1.5]" />
                            <p className="text-gray-700 text-sm font-medium leading-relaxed">
                                High-quality hybrid and OP vegetable, flower, herb and cover crop seeds.
                            </p>
                        </motion.div>

                        <motion.div whileHover={{ y: -5 }} className="bg-[#f2fae6] p-10 flex flex-col items-center text-center rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-xl rounded-bl-xl shadow-sm border border-lime-50/50">
                            <LayoutGrid className="w-16 h-16 text-gray-800 mb-6 stroke-[1.5]" />
                            <p className="text-gray-700 text-sm font-medium leading-relaxed">
                                Offering organic, conventional, treated, untreated, and pelleted seeds.
                            </p>
                        </motion.div>

                        <motion.div whileHover={{ y: -5 }} className="bg-[#f3f4f6] p-10 flex flex-col items-center text-center rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-xl rounded-bl-xl shadow-sm border border-gray-100">
                            <FileSearch className="w-16 h-16 text-gray-800 mb-6 stroke-[1.5]" />
                            <p className="text-gray-700 text-sm font-medium leading-relaxed">
                                We trial seeds nationally to bring in top-performing products.
                            </p>
                        </motion.div>

                        <motion.div whileHover={{ y: -5 }} className="bg-[#eef8ed] p-10 flex flex-col items-center text-center rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-xl rounded-bl-xl shadow-sm border border-green-50/50">
                            <Globe2 className="w-16 h-16 text-gray-800 mb-6 stroke-[1.5]" />
                            <p className="text-gray-700 text-sm font-medium leading-relaxed">
                                Fast, accurate seed delivery across the Asia and Canada.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
