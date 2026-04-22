import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sprout, Loader2 } from 'lucide-react';
import { categoryApi } from '../api/categoryApi';
import { useNavigate } from 'react-router-dom';

const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function CategoriesSection() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const cardStyles = [
        "bg-[#fff4ed] border-orange-50/50 text-gray-800 hover:border-orange-200",
        "bg-[#f2fae6] border-lime-50/50 text-gray-800 hover:border-lime-200",
        "bg-[#f3f4f6] border-gray-100 text-gray-800 hover:border-gray-200",
        "bg-[#eef8ed] border-green-50/50 text-gray-800 hover:border-green-200"
    ];

    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await categoryApi.getAll();
                const data = Array.isArray(res.data) ? res.data : (res.data.data || []);
                setCategories(data);
            } catch (err) {
                console.error("Failed to fetch categories:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    if (loading) {
        return (
            <div className="py-20 flex justify-center">
                <Loader2 className="animate-spin text-green-700" size={40} />
            </div>
        );
    }

    const displayedCategories = showAll ? categories : categories.slice(0, 5);

    return (
        <section id="categories" className="py-10 md:py-20 bg-[#FAFCF8] relative overflow-hidden">
            {/* Palm Shadow Left */}
            <img src="/palm-tree-shadow.avif" alt="Palm Shadow" className="absolute top-0 -right-64 h-full object-contain opacity-60 pointer-events-none z-0 " />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center mb-3 md:mb-16 gap-2 md:gap-6">
                    <h2 className="text-2xl md:text-5xl font-black text-gray-900 uppercase tracking-tight mb-1 md:mb-6">Shop by Category</h2>
                    <p className="text-[10px] md:text-base max-w-sm ml-auto text-gray-500 leading-relaxed font-medium">
                        select from our wide range of seeds, tailored to meet the diverse needs of farmers and agricultural.
                    </p>
                </div>

                <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${!showAll ? "md:grid-rows-2 min-h-[600px]" : ""}`}>
                    {displayedCategories.map((cat, index) => {
                        const styleClass = cardStyles[index % cardStyles.length];

                        let gridClass = "";
                        // Apply special layout only for the first 5 in the initial view
                        if (index === 0) gridClass = "md:col-start-1 md:row-start-1";
                        if (index === 1) gridClass = "md:col-start-1 md:row-start-2";
                        if (index === 2) gridClass = "md:col-start-2 md:row-span-2 md:row-start-1";
                        if (index === 3) gridClass = "md:col-start-3 md:row-start-1";
                        if (index === 4) gridClass = "md:col-start-3 md:row-start-2";

                        return (
                            <motion.div
                                key={cat._id || index}
                                variants={fadeIn}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                onClick={() => navigate('/products', { state: { category: cat.name?.en || cat.name } })}
                                whileHover={{ y: -5 }}
                                className={`${styleClass} ${gridClass} cursor-pointer rounded-3xl p-6 md:p-8 flex flex-col group border shadow-sm hover:shadow-xl transition-all relative overflow-hidden h-full ${index === 2 ? 'min-h-[220px] md:min-h-0 justify-center md:justify-start' : 'min-h-[220px] md:min-h-[250px] justify-center md:justify-between'}`}
                            >
                                <div className={`relative z-10 flex flex-col ${index === 2 ? 'items-start md:items-center text-left md:text-center mt-0 md:mt-10 max-w-[55%] md:max-w-full' : 'items-start max-w-[55%] md:max-w-[60%]'}`}>
                                    <p className="text-red-500 font-bold mb-2 text-sm">Get 30% off</p>
                                    <h3 className="font-extrabold text-gray-900 text-xl md:text-2xl leading-tight mb-4">
                                        {typeof cat.name === 'object' ? cat.name.en : cat.name}<br />Collection
                                    </h3>
                                    <button className="bg-[#1B5E20] hover:bg-[#0f9c40] text-white px-5 md:px-6 py-2 rounded-lg font-bold text-sm shadow-md transition-colors mt-2 w-max">
                                        Shop Now
                                    </button>
                                </div>
                                <img
                                    src={Array.isArray(cat.image) ? cat.image[0] : cat.image}
                                    alt={cat.name?.en || "Category"}
                                    className={`absolute object-contain mix-blend-multiply ${index === 2
                                        ? 'bottom-0 md:bottom-2 -right-4 md:right-[10%] w-[55%] md:w-[80%] h-[90%] md:h-[50%]'
                                        : 'bottom-0 -right-4 w-[55%] md:w-[50%] h-[90%] md:h-[95%]'
                                        }`}
                                />
                            </motion.div>
                        );
                    })}
                </div>

                {categories.length > 5 && (
                    <div className="mt-12 flex justify-center">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="bg-[#1B5E20] text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-[#5D4037] transition-all transform hover:scale-105 active:scale-95"
                        >
                            {showAll ? "Show Less" : "View All Categories"}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
