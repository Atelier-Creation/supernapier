import React from 'react';
import { motion } from 'framer-motion';

export default function WhyChooseUs() {
    const features = [
        {
            id: 1,
            bgClass: "bg-[#FFEFE5]",
            iconBg: "bg-orange-200/50",
            imgSrc: "/icons/tomato-3d.webp",
            imgAlt: "Tomato",
            imgClass: "w-16 h-16 object-contain drop-shadow-md",
            description: "High-quality hybrid and OP vegetable, flower, herb and cover crop seeds."
        },
        {
            id: 2,
            bgClass: "bg-[#EAF5E1]",
            iconBg: "bg-lime-200/50",
            imgSrc: "/icons/plant-3d.png",
            imgAlt: "Plant sprout",
            imgClass: "w-16 h-16 object-contain drop-shadow-md",
            description: "Offering organic, conventional, treated, untreated, and pelleted seeds."
        },
        {
            id: 3,
            bgClass: "bg-[#EBF0FA]",
            iconBg: "bg-blue-200/50",
            imgSrc: "/icons/medal-3d.webp",
            imgAlt: "Medal",
            imgClass: "w-16 h-16 object-contain drop-shadow-md",
            description: "We trial seeds nationally to bring in top-performing products."
        },
        {
            id: 4,
            bgClass: "bg-[#E2F5EA]",
            iconBg: "bg-emerald-200/50",
            imgSrc: "/icons/truck-3d-icon.webp",
            imgAlt: "Delivery Truck",
            imgClass: "w-16 h-16 object-contain drop-shadow-md hover:translate-x-1 transition-transform",
            description: "Fast, accurate seed delivery across the Asia and Canada."
        }
    ];

    return (
        <section className="py-24 bg-[#FAFCF8] relative overflow-hidden">
            {/* Palm Shadow Right */}
            <img src="/palm-tree-shadow.avif" alt="Palm Shadow" className="absolute top-0 right-0 h-full object-contain opacity-70 pointer-events-none z-0" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="relative z-10">
                    <div className="text-center md:px-20 mb-20">
                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 uppercase tracking-tight">WHY CHOOSE OUR QUALITY SEEDS?</h2>
                        <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-5xl mx-auto font-medium">
                            Providing food for the growing global population in a safe and sustainable way. Farming is a complex, unpredictable, and individual endeavor. Our main activity is collaborating with farmers to address their various challenges through innovative, high-quality, and effective solutions. By improving agricultural yields, we enable increased profitability for farmers and rural prosperity.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                        {features.map((feature) => (
                            <motion.div
                                key={feature.id}
                                whileHover={{ y: -5 }}
                                className={`${feature.bgClass} p-10 flex flex-col items-center text-left md:text-center rounded-tl-[3rem] rounded-br-[3rem] rounded-tr-xl rounded-bl-xl shadow-md hover:shadow-xl transition-shadow`}
                            >
                                <div className={`${feature.iconBg} w-20 h-20 flex items-center justify-center rounded-full mb-6 shadow-sm`}>
                                    <img src={feature.imgSrc} alt={feature.imgAlt} className={feature.imgClass} />
                                </div>
                                <p className="text-gray-800 text-sm font-semibold leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
