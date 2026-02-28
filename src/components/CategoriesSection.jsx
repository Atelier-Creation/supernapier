import React from 'react';
import { motion } from 'framer-motion';
import { Sprout } from 'lucide-react';
import { mockCategories } from '../data/mockData';

const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function CategoriesSection() {
    const cardStyles = [
        "bg-[#fff4ed] border-orange-50/50 text-gray-800 hover:border-orange-200",
        "bg-[#f2fae6] border-lime-50/50 text-gray-800 hover:border-lime-200",
        "bg-[#f3f4f6] border-gray-100 text-gray-800 hover:border-gray-200",
        "bg-[#eef8ed] border-green-50/50 text-gray-800 hover:border-green-200"
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tight mb-6">Shop by Category</h2>
                    <p className="text-sm md:text-base max-w-2xl mx-auto text-gray-500 leading-relaxed font-medium">
                        select from our wide range of seeds, tailored to meet the diverse needs of farmers and agricultural.
                    </p>
                    {/* <div className="h-1 w-20 bg-gradient-to-r from-[#a3e635] to-[#1B5E20] mx-auto rounded-full"></div> */}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 hover:cursor-pointer">
                    {mockCategories.map((cat, index) => {
                        const styleClass = cardStyles[index % cardStyles.length];

                        return (
                            <motion.div
                                key={cat.id}
                                variants={fadeIn}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                whileHover={{ y: -5 }}
                                className={`${styleClass} rounded-tl-[2rem] rounded-br-[2rem] md:rounded-tl-[3rem] md:rounded-br-[3rem] rounded-tr-xl rounded-bl-xl p-6 md:p-10 flex flex-col items-center justify-center text-center group border shadow-sm hover:shadow-xl transition-all`}
                            >
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-md group-hover:bg-[#1B5E20] transition-colors stroke-[1.5]">
                                    <Sprout className="w-8 h-8 text-[#1B5E20] group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="font-bold text-gray-800 group-hover:text-[#1B5E20]">{cat.name}</h3>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
