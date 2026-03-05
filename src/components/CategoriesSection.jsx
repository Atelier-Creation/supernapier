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
        <section id="categories" className="py-20 bg-[#FAFCF8] relative overflow-hidden">
            {/* Palm Shadow Left */}
            <img src="/palm-tree-shadow.avif" alt="Palm Shadow" className="absolute top-0 -right-64 h-full object-contain opacity-60 pointer-events-none z-0 " />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 uppercase tracking-tight mb-6">Shop by Category</h2>
                    <p className="text-xs md:text-base max-w-sm ml-auto text-gray-500 leading-relaxed font-medium">
                        select from our wide range of seeds, tailored to meet the diverse needs of farmers and agricultural.
                    </p>
                    {/* <div className="h-1 w-20 bg-gradient-to-r from-[#a3e635] to-[#1B5E20] mx-auto rounded-full"></div> */}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 hover:cursor-pointer min-h-[600px]">
                    {mockCategories.map((cat, index) => {
                        const styleClass = cardStyles[index % cardStyles.length];

                        let gridClass = "";
                        // Card 0: Top left (Small)
                        if (index === 0) gridClass = "md:col-start-1 md:row-start-1";
                        // Card 1: Bottom left (Small)
                        if (index === 1) gridClass = "md:col-start-1 md:row-start-2";
                        // Card 2: Center tall
                        if (index === 2) gridClass = "md:col-start-2 md:row-span-2 md:row-start-1";
                        // Card 3: Top right (Small)
                        if (index === 3) gridClass = "md:col-start-3 md:row-start-1";
                        // Card 4: Bottom right (Small)
                        if (index === 4) gridClass = "md:col-start-3 md:row-start-2";

                        return (
                            <motion.div
                                key={cat.id}
                                variants={fadeIn}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                whileHover={{ y: -5 }}
                                className={`${styleClass} ${gridClass} rounded-3xl p-6 md:p-8 flex flex-col group border shadow-sm hover:shadow-xl transition-all relative overflow-hidden h-full ${index === 2 ? 'min-h-[380px] md:min-h-0 justify-start md:justify-start' : 'min-h-[220px] md:min-h-[250px] justify-center md:justify-between'}`}
                            >
                                <div className={`relative z-10 flex flex-col ${index === 2 ? 'items-center text-center mt-2 md:mt-10' : 'items-start max-w-[55%] md:max-w-[60%]'}`}>
                                    <p className="text-red-500 font-bold mb-2 text-sm">Get 30% off</p>
                                    <h3 className="font-extrabold text-gray-900 text-xl md:text-2xl leading-tight mb-4">{cat.name}<br />Collection</h3>
                                    <button className="bg-[#1B5E20] hover:bg-[#0f9c40] text-white px-5 md:px-6 py-2 rounded-lg font-bold text-sm shadow-md transition-colors mt-2 w-max">
                                        Shop Now
                                    </button>
                                </div>
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className={`absolute object-contain mix-blend-multiply ${index === 2
                                        ? 'bottom-2 w-[85%] md:w-[80%] right-[7.5%] md:right-[10%] h-[55%] md:h-[50%]'
                                        : 'bottom-0 -right-4 w-[55%] md:w-[50%] h-[90%] md:h-[95%]'
                                        }`}
                                />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
