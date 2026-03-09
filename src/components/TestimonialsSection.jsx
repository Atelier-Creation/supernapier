import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { mockTestimonials } from '../data/mockData';
import { FcGoogle } from 'react-icons/fc';

export default function TestimonialsSection() {
    const [currentIndex, setCurrentIndex] = useState(1);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? mockTestimonials.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === mockTestimonials.length - 1 ? 0 : prev + 1));
    };

    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-5 md:py-24 bg-[#FAFCF8] overflow-hidden relative">
            {/* Palm Shadow Left */}
            <img src="/palm-tree-shadow.avif" alt="Palm Shadow" className="absolute top-0 -left-64 h-full object-contain opacity-[0.04] pointer-events-none z-0 scale-x-[-1]" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-2 md:mb-16 uppercase tracking-tight">
                    OUR HAPPY FARMERS!
                </h2>

                <div className="relative w-full flex items-center justify-center h-[500px] md:h-[550px] mb-4 md:mb-8">
                    <div className="flex w-full items-center justify-center relative md:h-full">
                        {mockTestimonials.map((test, index) => {
                            let position = 'next';
                            if (index === currentIndex) position = 'active';
                            else if (index === (currentIndex === 0 ? mockTestimonials.length - 1 : currentIndex - 1)) position = 'prev';

                            const isActive = position === 'active';
                            const isPrev = position === 'prev';

                            return (
                                <motion.div
                                    key={test.id}
                                    initial={false}
                                    animate={{
                                        x: isActive ? 0 : isPrev ? '-100%' : '100%',
                                        scale: isActive ? 1 : 0.85,
                                        opacity: 1,
                                        zIndex: isActive ? 30 : 10,
                                    }}
                                    transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                                    className="absolute top-1/2 -translate-y-1/2 flex flex-col md:flex-row items-center justify-center w-[90%] md:w-[850px] bg-[#ecf3e1] p-6 md:p-8 rounded-tl-2xl rounded-tr-[4rem] rounded-bl-[4rem] rounded-br-2xl shadow-sm text-left gap-4 md:gap-12"
                                >
                                    {/* Left Image */}
                                    <div className="w-full md:w-6/12 h-[150px] rounded-tr-3xl rounded-bl-3xl rounded-tl-md rounded-br-md overflow-hidden md:h-[450px] flex-shrink-0">
                                        <img
                                            src={test.image}
                                            alt={test.name}
                                            className="w-full h-full object-cover object-center shadow-sm"
                                        />
                                    </div>

                                    {/* Right Content */}
                                    <div className="w-full md:w-7/12 flex flex-col justify-center pr-2 md:pr-4 py-2 md:py-4">
                                        <div className="bg-white rounded-md px-4 py-2 flex items-center shadow-sm w-fit mb-4 md:mb-8">
                                            <span className="font-bold text-gray-900 text-[12px] md:text-md leading-none">{test.name}</span>
                                            <span className="text-gray-500 italic text-[10px] md:text-sm ml-2 leading-none flex items-center">
                                                - {test.role}
                                                {test.isGoogleReview && <FcGoogle title="Google Review" className="ml-1.5 text-[14px] md:text-[18px] flex-shrink-0" />}
                                            </span>
                                        </div>
                                        <h3 className="text-xs md:text-3xl font-bold text-gray-900 leading-snug mb-4 md:mb-6 w-full md:w-[95%]">
                                            {test.heading}
                                        </h3>
                                        <p className="text-[10px] md:text-[15px] text-gray-600 leading-relaxed font-medium">
                                            {test.text}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Navigation Arrows */}
                <div className="flex items-center bottom-5 md:bottom-0 justify-center space-x-6 md:space-x-20 relative z-40">
                    <button
                        onClick={handlePrev}
                        className="w-8 h-8 md:w-12  md:h-12 rounded-full border-2 border-gray-800 flex items-center justify-center hover:bg-gray-800 hover:text-white transition-colors text-gray-800"
                    >
                        <ArrowLeft className="w-4 h-4 md:w-5  md:h-5" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="w-8 h-8 md:w-12  md:h-12 rounded-full border-2 border-gray-800 flex items-center justify-center hover:bg-gray-800 hover:text-white transition-colors text-gray-800"
                    >
                        <ArrowRight className="w-4 h-4 md:w-5  md:h-5" />
                    </button>
                </div>
            </div>
        </section>
    );
}
