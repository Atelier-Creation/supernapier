import React, { useEffect } from 'react';
import ScrollExpandMedia from './ScrollExpandMedia';
import { motion } from 'framer-motion';

const ScrollExpansionHero = () => {
    // Media content tailored for Super Napier
    const superNapierContent = {
        mediaType: 'video',
        src: '/super_napier_hero_video.mp4',
        background: '/water_falls.webp',
        title: "India's Super Napier",
        date: 'Premium Fodder',
        scrollToExpand: 'Scroll to Explore',
        about: {
            overview: 'Super Napier is the world\'s highest-yielding fodder grass. With heights reaching up to 15 feet and a protein content of 16-18%, it is the ultimate choice for dairy and livestock farmers globally.',
            conclusion: 'Experience the raw power of nature combined with cutting-edge agricultural science. Join thousands of successful farmers who have transformed their yields with Super Napier.'
        }
    };

    useEffect(() => {
        // Ensure scroll starts at top on load
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="w-full max-h-screen">
            <ScrollExpandMedia
                mediaType={superNapierContent.mediaType}
                mediaSrc={superNapierContent.src}
                bgImageSrc={superNapierContent.background}
                title={superNapierContent.title}
                date={superNapierContent.date}
                scrollToExpand={superNapierContent.scrollToExpand}
                textBlend={true}
            >
                {/* Content revealed after expansion */}
                {/* <div className="max-w-4xl mx-auto py-20 px-6 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 md:p-12 rounded-[2.5rem] shadow-2xl"
                    >
                        <h2 className="text-4xl md:text-6xl font-black text-white uppercase mb-8 leading-tight">
                            The Future of <span className="text-[#facc15]">Farming</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-gray-200 mb-10 font-medium leading-relaxed">
                            {superNapierContent.about.overview}
                        </p>
                        <p className="text-lg md:text-xl text-gray-300 leading-relaxed italic mb-12">
                            "{superNapierContent.about.conclusion}"
                        </p>

                        <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                            <a href="#products" className="px-10 py-5 bg-[#facc15] text-black font-black uppercase tracking-widest rounded-full hover:bg-white transition-all transform hover:scale-105 shadow-xl">
                                View Varieties
                            </a>
                            <a href="#about" className="px-10 py-5 border-2 border-white text-white font-black uppercase tracking-widest rounded-full hover:bg-white hover:text-black transition-all transform hover:scale-105">
                                Learn More
                            </a>
                        </div>
                    </motion.div>
                </div> */}
            </ScrollExpandMedia>
        </div>
    );
};

export default ScrollExpansionHero;
