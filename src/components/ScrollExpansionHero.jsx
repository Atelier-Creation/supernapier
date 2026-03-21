import React, { useState, useEffect } from 'react';
import ScrollExpandMedia from './ScrollExpandMedia';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Star } from 'lucide-react';

const ScrollExpansionHero = () => {
    const navigate = useNavigate();
    const [isFullyExpanded, setIsFullyExpanded] = useState(false);
    const [isVideoEnded, setIsVideoEnded] = useState(false);
    const [bgIdx, setBgIdx] = useState(0);

    const sliderImages = [
        "/agriculture-healthy-food-hero-bg-tractor.png",
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=1920",
        "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?q=80&w=1920&auto=format&fit=crop",
        "/hero-slider4.jpg",
    ];

    const googleReviews = [
        {
            name: "Rahul Sharma",
            rating: 5,
            text: "Best quality Super Napier seeds I've ever used. The yield is incredible and my cattle love it!",
            avatar: "https://i.pravatar.cc/100?img=11"
        },
        {
            name: "Suresh Patel",
            rating: 5,
            text: "Fast delivery and great support. The protein content really makes a difference in milk production.",
            avatar: "https://i.pravatar.cc/100?img=12"
        },
        {
            name: "Anjali Devi",
            rating: 5,
            text: "The height of the grass reached 12 feet within 3 months. Truly a super fodder for dairy farmers.",
            avatar: "https://i.pravatar.cc/100?img=13"
        }
    ];

    const [reviewIdx, setReviewIdx] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Auto-cycle reviews
    useEffect(() => {
        if (!isFullyExpanded) return;
        const interval = setInterval(() => {
            setReviewIdx((prev) => (prev + 1) % googleReviews.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [isFullyExpanded]);

    useEffect(() => {
        if (!isVideoEnded) return;
        const interval = setInterval(() => {
            setBgIdx((prev) => (prev + 1) % sliderImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [isVideoEnded]);

    const superNapierContent = {
        mediaType: isVideoEnded ? 'slider' : 'video',
        src: '/super_napier_hero_video.mp4',
        background: '/water_falls.webp',
        title: "India's Super Napier",
        date: 'Premium Fodder',
        scrollToExpand: 'Scroll to Explore',
    };

    return (
        <div className="w-full h-screen relative">
            <ScrollExpandMedia
                mediaType="video"
                mediaSrc={superNapierContent.src}
                bgImageSrc={superNapierContent.background}
                title={isVideoEnded ? "" : superNapierContent.title}
                date={isVideoEnded ? "" : superNapierContent.date}
                scrollToExpand={isVideoEnded ? "" : superNapierContent.scrollToExpand}
                textBlend={true}
                onFullyExpanded={() => setIsFullyExpanded(true)}
                onVideoEnded={() => setIsVideoEnded(true)}
                mediaXOffset={isVideoEnded ? -2000 : 0}
                lockScroll={isFullyExpanded && !isVideoEnded}
                overlayContent={
                    <>
                        {/* Full-screen Background Slider */}
                        <AnimatePresence>
                            {isVideoEnded && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 2, ease: "easeOut" }}
                                    className="absolute inset-0 z-10 h-[100dvh] overflow-hidden bg-black"
                                >
                                    <AnimatePresence mode="popLayout">
                                        <motion.img
                                            key={bgIdx}
                                            initial={{ opacity: 0, x: 80 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -80 }}
                                            transition={{ duration: 1.5, ease: "easeInOut" }}
                                            src={sliderImages[bgIdx]}
                                            alt={`Background Slider ${bgIdx}`}
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                    </AnimatePresence>
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
                                </motion.div>
                            ) || (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: isFullyExpanded ? 0.3 : 0 }}
                                        className="absolute inset-0 z-20 bg-black pointer-events-none"
                                    />
                                )}
                        </AnimatePresence>

                        {/* Hero-style Content Overlay */}
                        <AnimatePresence>
                            {isFullyExpanded && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1 }}
                                    className="absolute inset-0 h-[100dvh] z-30 pointer-events-none flex flex-col justify-end pb-10">
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-transparent pointer-events-none" />
                                    <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-10 pointer-events-auto">
                                        <div className="flex flex-col md:flex-row items-end justify-between gap-8">
                                            <div className="max-w-xl">
                                                <motion.h1
                                                    initial={{ opacity: 0, y: 30 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.3, duration: 0.8 }}
                                                    className="text-4xl md:text-5xl lg:text-[64px] font-black text-white leading-tight mb-6 tracking-tighter uppercase"
                                                >
                                                    Empowering<br />
                                                    Farmers.
                                                </motion.h1>
                                                <motion.p
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.45, duration: 0.7 }}
                                                    className="text-gray-200 text-lg md:text-xl leading-relaxed mb-8 max-w-md font-medium"
                                                >
                                                    Super Napier is the world's highest-yielding fodder grass. Reach new heights in dairy farming.
                                                </motion.p>
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.6, duration: 0.7 }}
                                                >
                                                    <Link to="/products">
                                                        <button className="group inline-flex items-center gap-3 bg-[#fde047] hover:bg-[#facc15] text-black font-black px-8 py-4 rounded-full transition-all duration-300 shadow-2xl hover:scale-105 text-sm uppercase tracking-widest">
                                                            Explore Products
                                                            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                        </button>
                                                    </Link>
                                                </motion.div>
                                            </div>
                                            {/* Right Content - Floating Card (Google Reviews) */}
                                            <motion.div
                                                initial={{ opacity: 0, x: 40 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.75, duration: 0.7 }}
                                                className="bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[32px] p-6 flex flex-col gap-6 w-full md:w-[340px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] h-[300px] justify-between"
                                            >
                                                <div className="flex flex-col gap-4">
                                                    <div className="flex items-center gap-3">
                                                        <img src="/google-logo.png" className="w-8 h-8" alt="Google" onError={(e) => e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/3840px-Google_%22G%22_logo.svg.png'} />
                                                        <div>
                                                            <p className="text-white font-bold text-sm">Google Review</p>
                                                            <div className="flex text-[#fde047] mt-1">
                                                                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="relative overflow-hidden h-32">
                                                        <AnimatePresence mode="wait">
                                                            <motion.div
                                                                key={reviewIdx}
                                                                initial={{ opacity: 0, y: 10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                exit={{ opacity: 0, y: -10 }}
                                                                transition={{ duration: 0.5 }}
                                                                className="absolute inset-0 mt-2"
                                                            >
                                                                <p className="text-gray-50 text-sm italic leading-relaxed line-clamp-4 overflow-hidden text-ellipsis">
                                                                    "{googleReviews[reviewIdx].text}"
                                                                </p>
                                                                <div className="mt-4 flex items-center gap-3">
                                                                    <img src={googleReviews[reviewIdx].avatar} className="w-8 h-8 rounded-full border border-white/20" alt="Reviewer" />
                                                                    <p className="text-white text-xs font-bold uppercase tracking-widest">{googleReviews[reviewIdx].name}</p>
                                                                </div>
                                                            </motion.div>
                                                        </AnimatePresence>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-4">
                                                    <div className="flex items-center justify-between border-t border-white/10 pt-4">
                                                        <div className="flex -space-x-3">
                                                            {[1, 2, 3].map((i) => (
                                                                <img key={i} className="w-8 h-8 rounded-full border-2 border-green-900 object-cover" src={`https://i.pravatar.cc/100?img=${i + 14}`} alt="Farmer" />
                                                            ))}
                                                        </div>
                                                        <p className="text-gray-300 text-[10px] font-bold tracking-widest uppercase ml-2 text-right">100K+ Success Stories</p>
                                                    </div>

                                                    <a
                                                        href="https://share.google/KEX9eNAIoOY1RRId0"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-full bg-[#fde047] hover:bg-white text-black font-black text-xs py-4 rounded-full transition-all duration-300 uppercase tracking-widest shadow-lg flex items-center justify-center gap-2"
                                                    >
                                                        See all reviews
                                                        <ArrowUpRight className="w-4 h-4" />
                                                    </a>
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Post-Video Scroll Hint */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: isVideoEnded ? 1 : 0, y: isVideoEnded ? 0 : 20 }}
                                        transition={{ delay: 1, duration: 1 }}
                                        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
                                    >
                                        <span className="text-white/60 text-[10px] font-black uppercase tracking-[0.3em] mb-1">Scroll to Explore</span>
                                        <div className="w-[26px] h-[44px] border-2 border-white/30 rounded-full flex justify-center p-1.5">
                                            <motion.div
                                                animate={{ y: [0, 12, 0] }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                                className="w-1 h-1.5 bg-[#fde047] rounded-full shadow-[0_0_8px_#fde047]"
                                            />
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </>
                }
            >
                {/* Content revealed after expansion - if any */}
            </ScrollExpandMedia>
        </div>
    );
};

export default ScrollExpansionHero;
