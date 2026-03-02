import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Hero() {
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        // Prevent scrolling while video plays
        document.body.style.overflow = 'hidden';

        // Video plays for 10 seconds before content reveals
        const timer = setTimeout(() => {
            setShowContent(true);
            // Restore scrolling after delay
            document.body.style.overflow = 'auto';
        }, 5000);

        return () => {
            clearTimeout(timer);
            // Ensure scrolling is always re-enabled if component unmounts
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div className="relative w-full h-[100vh] overflow-hidden flex flex-col justify-start">
            {/* SVG Arc Clip Path */}
            <svg width="0" height="0" className="absolute">
                <clipPath id="arch-clip" clipPathUnits="objectBoundingBox">
                    <path d="M 0,0 L 1,0 L 1,1 Q 0.5,0.85 0,1 Z" />
                </clipPath>
            </svg>

            {/* Background Video */}
            <div className="absolute inset-0 z-0 bg-black">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-90"
                >
                    <source src="/168401-839220651_medium.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Sliding Arc Overlay */}
            <motion.div
                initial={{ y: '-100%' }}
                animate={{ y: showContent ? 0 : '-100%' }}
                transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
                className="relative z-10 w-full bg-[#FAFCF8] flex items-center justify-center top-0 pt-32 pb-24 md:pt-30 md:pb-24 overflow-hidden h-[85vh] md:h-[76vh]"
                style={{
                    clipPath: 'url(#arch-clip)'
                }}
            >

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    animate={{ opacity: showContent ? 1 : 0, scale: showContent ? 1 : 0.95, y: showContent ? 0 : 30 }}
                    transition={{ delay: 0.6, duration: 1, ease: 'easeOut' }}
                    className="max-w-4xl mx-auto px-4 text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-[1.2] mb-6 uppercase tracking-tight">
                        Building a Sustainable <br />
                        Future Through The Power <br />
                        Of Quality <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ade80] to-[#16a34a]">Seeds</span>
                    </h1>
                    <p className="text-gray-500 mb-5 max-w-2xl mx-auto text-lg leading-relaxed">
                        Committed to delivering the freshest, field-grown produce, straight from the farm to your table, ensuring quality and sustainability every step of the way.
                    </p>
                    <Link to="/products">
                        <button className="bg-[#111] hover:bg-black text-white px-10 py-4 rounded-full font-bold transition-all mx-auto shadow-lg hover:scale-105">
                            Buy Now
                        </button>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}
