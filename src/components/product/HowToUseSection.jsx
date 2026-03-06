import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

// How-to-Use step data
const howToUseSteps = [
    {
        id: 1,
        title: 'Land Preparation',
        heading: 'Creating the perfect foundation for growth.',
        description: 'Super Napier requires well-drained soil rich in organic matter. Plough the land deeply and mix in farm yard manure to ensure strong root development from day one.',
        bullets: ['Deep ploughing (2-3 times)', 'Mix organic manure thoroughly', 'Maintain soil pH between 5.5 - 7.0'],
        image: '/soil-prep.jpg',
    },
    {
        id: 2,
        title: 'Planting Slips',
        heading: 'Positioning slips for maximum yield.',
        description: 'Proper spacing is essential. Plant the slips at an angle, burying two nodes in the soil and leaving one node above ground to encourage rapid sprouting.',
        bullets: ['Maintain 3x2 ft spacing', 'Plant at a 45-degree angle', 'Ensure good soil-to-slip contact'],
        image: '/irrigation.jpg',
    },
    {
        id: 3,
        title: 'Irrigation & Care',
        heading: 'Consistent moisture for rapid multiplication.',
        description: 'Super Napier demands regular watering, especially right after planting. Ensure steady irrigation to accelerate the sprouting and tillering processes.',
        bullets: ['Water immediately after planting', 'Irrigate every 7-10 days', 'Keep field weed-free initially'],
        image: '/pest-control.jpg',
    },
    {
        id: 4,
        title: 'First Harvest',
        heading: 'Reaping the high-protein reward.',
        description: 'The first cut should happen a bit later to establish the plant. After the first harvest, the grass will regrow rapidly, allowing for frequent subsequent cuts.',
        bullets: ['First cut at 75-90 days', 'Subsequent cuts every 45-60 days', 'Leave 2-3 inches of stalk above ground'],
        image: '/harvesting.jpg',
    },
];

// Faint tractor SVG watermark for the background
function TractorWatermark() {
    return (
        <svg viewBox="0 0 120 80" fill="none" className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <circle cx="35" cy="58" r="18" stroke="currentColor" strokeWidth="3" />
            <circle cx="35" cy="58" r="8" stroke="currentColor" strokeWidth="2" />
            <circle cx="85" cy="62" r="12" stroke="currentColor" strokeWidth="3" />
            <circle cx="85" cy="62" r="5" stroke="currentColor" strokeWidth="2" />
            <rect x="30" y="28" width="55" height="22" rx="4" stroke="currentColor" strokeWidth="3" />
            <rect x="50" y="18" width="28" height="16" rx="3" stroke="currentColor" strokeWidth="2.5" />
            <line x1="18" y1="42" x2="28" y2="42" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <line x1="95" y1="38" x2="108" y2="30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="95" y1="38" x2="110" y2="42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
    );
}

// Leaf icon custom SVG for the header
function HeaderLeafIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={"100px"} viewBox="0 0 18 20"><path fill='#eecd15' d="M17.8505 4.84913C17.576 2.9414 16.9582 1.39128 16.0642 0.366399C15.7787 0.0391332 15.328 -0.0823903 14.9161 0.0568676C14.506 0.1955 14.2224 0.56386 14.1936 0.995305C14.1595 1.50581 14.0312 2.28101 13.3138 3.11507C12.5331 4.02277 11.1885 4.85304 9.31744 5.58273C8.65543 5.84089 8.04527 6.17234 7.49796 6.56593C7.1129 6.25335 6.67373 5.98406 6.18833 5.77046C3.17736 4.44554 3.14677 3.17402 3.13527 2.69531C3.12637 2.32581 2.89772 2.00097 2.55269 1.86765C2.20649 1.73386 1.81768 1.82117 1.56227 2.08995C0.902793 2.7839 0.423403 3.84757 0.175944 5.16597C-0.0560654 6.40203 -0.0587182 7.77453 0.168571 9.03074C0.489218 10.8032 1.61837 12.4578 3.11537 13.349C3.7775 13.7432 4.47091 13.9588 5.14708 13.9898C5.39942 14.5319 5.74659 15.0277 6.17831 15.465C5.46082 16.6571 4.97246 17.9757 4.75461 19.3202C4.70288 19.6396 4.91952 19.9405 5.23857 19.9923C5.27028 19.9975 5.30185 20 5.33298 20C5.61492 20 5.86332 19.7954 5.90994 19.5078C6.09498 18.3657 6.5004 17.2435 7.09339 16.2186C7.50783 16.496 7.96912 16.7336 8.47379 16.9246C9.0282 17.1344 9.61542 17.2384 10.2179 17.2384C11.1776 17.2384 12.176 16.9745 13.1423 16.4537C15.3384 15.2702 17.0551 12.9703 17.6225 10.4515C18.0294 8.64453 18.1105 6.65488 17.8505 4.84913ZM16.4807 10.1937C16.2348 11.2853 15.7312 12.356 15.0244 13.2898C14.3396 14.1944 13.497 14.9317 12.5875 15.4218C11.3174 16.1063 10.0034 16.2507 8.8876 15.8284C8.4631 15.6677 8.07929 15.4718 7.73687 15.2426C8.1657 14.6653 8.6449 14.1321 9.15562 13.6113C9.20805 13.5735 9.25342 13.527 9.2908 13.4744C9.68358 13.0795 10.0934 12.6901 10.5124 12.2923C10.8398 11.9814 11.1784 11.6599 11.5067 11.3365C11.7615 11.0855 12.0272 10.8157 12.2943 10.528L14.5593 10.1786C14.8788 10.1293 15.0978 9.83011 15.0486 9.51027C14.9994 9.19043 14.7007 8.97125 14.3811 9.02039L13.433 9.16664C14.0558 8.32406 14.6006 7.37375 14.9191 6.3221C15.0129 6.01242 14.8383 5.68527 14.529 5.59132C14.2196 5.49746 13.8929 5.6723 13.7991 5.98199C13.2467 7.80574 11.9153 9.28992 10.6859 10.5012C10.3653 10.817 10.0307 11.1348 9.70706 11.442C9.5903 11.5529 9.4731 11.6643 9.35579 11.7762L9.30051 10.0663C9.29005 9.74285 9.01942 9.48972 8.69667 9.49961C8.37364 9.51007 8.12025 9.78078 8.13071 10.1042L8.22091 12.8937C7.73828 13.3919 7.27379 13.913 6.85187 14.472C6.75394 14.3607 6.66156 14.2453 6.57616 14.1248C6.09396 13.4441 5.83683 12.6331 5.83254 11.7796C5.8275 10.7697 6.16415 9.76574 6.80622 8.8764C7.50081 7.91421 8.51608 7.15289 9.74229 6.67468C14.3034 4.89585 15.1723 2.81949 15.3388 1.32816C15.9932 2.17992 16.4706 3.47679 16.6922 5.01628C16.9322 6.68402 16.8571 8.52277 16.4807 10.1937ZM1.32019 8.82183C0.958972 6.82523 1.26979 4.63156 2.04287 3.38132C2.34623 4.76984 3.533 5.88207 5.71745 6.84328C6.03271 6.98199 6.32242 7.14972 6.58373 7.34035C6.31801 7.6057 6.07477 7.88914 5.85766 8.18992C5.62538 8.51168 5.42591 8.84668 5.25987 9.19125C5.2342 9.16394 5.20829 9.1366 5.18286 9.10933C4.66968 8.55871 4.29196 8.09289 3.99409 7.64328C3.81542 7.37359 3.45224 7.3 3.18294 7.4789C2.91359 7.65781 2.84009 8.0214 3.01877 8.29109C3.35315 8.79586 3.76895 9.30992 4.32719 9.9089C4.48956 10.0831 4.6556 10.2563 4.81941 10.4261C4.71318 10.8727 4.65989 11.328 4.66215 11.7855C4.66383 12.1195 4.69574 12.4448 4.75465 12.7604C4.40884 12.6867 4.05757 12.5466 3.71344 12.3417C2.51761 11.6298 1.57822 10.2482 1.32019 8.82183Z"></path></svg>
    );
}

export default function HowToUseSection() {
    const [activeStep, setActiveStep] = useState(0);
    const step = howToUseSteps[activeStep];

    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        if (isLeftSwipe) {
            setActiveStep((prev) => Math.min(prev + 1, howToUseSteps.length - 1));
        } else if (isRightSwipe) {
            setActiveStep((prev) => Math.max(prev - 1, 0));
        }
    };

    const swipeHandlers = {
        onTouchStart,
        onTouchMove,
        onTouchEnd
    };

    useEffect(() => {
        const activeNavEl = document.getElementById(`step-tab-${activeStep}`);
        if (activeNavEl) {
            activeNavEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }, [activeStep]);

    return (
        <div className="w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
            <section className="bg-[#0A2613] relative rounded-3xl text-white py-16 md:py-24 px-6 sm:px-10 lg:px-16 overflow-hidden w-full shadow-2xl">
                {/* Decorative Leaves */}
                <img
                    src="/Green-Leaf-PNG.png"
                    alt="Decorative Leaf"
                    className="absolute -bottom-8 -right-8 scale-x-[-1] w-48 h-48 md:w-50 md:h-50 object-contain opacity-30 z-0 pointer-events-none drop-shadow-2xl"
                />
                <div className="max-w-6xl mx-auto">
                    <div className="mb-16 md:mb-24">
                        <h2 className="text-3xl md:text-5xl lg:text-[54px] font-bold leading-tight mb-8">
                            Steps From Planting to Harvesting!
                        </h2>
                        <div className="flex items-start gap-4 md:gap-6 max-w-4xl">
                            <HeaderLeafIcon />
                            <p className="text-gray-300 text-sm md:text-lg leading-relaxed font-medium">
                                Growing high-yield Super Napier grass is a straightforward process when following the correct agricultural practices. From initially preparing the land to harvesting the first high-protein crop, these proven steps ensure maximum tillering, rapid growth, and sustainable continuous yields for years to come.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr_1.5fr] lg:grid-cols-[1fr_1.5fr_1.5fr] gap-3 sm:gap-6 md:gap-8 lg:gap-10 h-full min-h-min md:min-h-[450px]">
                        {/* LEFT: Dark green sidebar / navigation list */}
                        <div className="order-1 md:col-span-1 flex flex-col justify-start md:justify-between relative pt-0 md:pt-5 md:border-t border-[#294B34]">
                            {/* Step counter (Desktop Only) */}
                            <div className="text-sm font-bold tracking-widest mb-16 hidden md:block">
                                <span className="text-[#a3c46a]">
                                    {String(activeStep + 1).padStart(2, '0')}
                                </span>
                                <span className="text-[#a3c46a]/50">
                                    /{String(howToUseSteps.length).padStart(2, '0')}
                                </span>
                            </div>

                            {/* Step navigation list */}
                            <nav className="flex flex-row md:flex-col gap-4 sm:gap-6 md:gap-4 relative z-10 pb-4 md:pb-0 overflow-x-auto snap-x scrollbar-hide">
                                {howToUseSteps.map((s, idx) => (
                                    <button
                                        key={s.id}
                                        id={`step-tab-${idx}`}
                                        onClick={() => setActiveStep(idx)}
                                        className={`flex flex-col md:block text-left text-lg md:text-xl lg:text-2xl font-bold leading-snug transition-colors duration-200 whitespace-nowrap md:whitespace-normal snap-start shrink-0 pt-3 md:pt-0 border-t-2 md:border-none ${activeStep === idx
                                            ? 'text-[#eecd15] border-[#eecd15]'
                                            : 'text-[#42644D] border-[#294B34] hover:text-[#eecd15] hover:border-[#42644D] md:hover:border-transparent'
                                            }`}
                                    >
                                        {/* Mobile Subtitle */}
                                        <span className={`md:hidden text-xs md:text-sm tracking-widest uppercase mb-1 font-semibold ${activeStep === idx ? 'text-[#eecd15]/80' : 'text-[#42644D]'}`}>
                                            Step 0{idx + 1}
                                        </span>
                                        {s.title}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* CENTER: Image */}
                        <div
                            className="order-3 md:order-2 relative overflow-hidden rounded-xl h-[120px] sm:h-[160px] md:h-full md:min-h-[400px]"
                            {...swipeHandlers}
                        >
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={activeStep}
                                    src={step.image}
                                    alt={step.title}
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.97 }}
                                    transition={{ duration: 0.4 }}
                                    className="absolute inset-0 w-full h-full object-cover object-center shadow-2xl"
                                    onError={e => {
                                        e.target.src = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80';
                                    }}
                                />
                            </AnimatePresence>
                        </div>

                        {/* RIGHT: White info card */}
                        <div
                            className="order-2 md:order-3 relative flex flex-col justify-center"
                            {...swipeHandlers}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeStep}
                                    initial={{ opacity: 0, x: 16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -16 }}
                                    transition={{ duration: 0.35 }}
                                    className="bg-white rounded-xl p-4 sm:p-6 md:p-10 lg:p-12 flex flex-col justify-center h-full gap-3 sm:gap-4 md:gap-5 shadow-xl text-left"
                                >
                                    <h3 className="text-[#0A2613] font-bold text-[15px] sm:text-lg md:text-2xl lg:text-[28px] leading-snug lg:leading-snug mb-1 md:mb-2">
                                        {step.heading}
                                    </h3>
                                    <p className="text-gray-500 text-[11px] sm:text-sm md:text-base leading-relaxed mb-2 md:mb-4">
                                        {step.description}
                                    </p>
                                    <ul className="space-y-1.5 md:space-y-3">
                                        {step.bullets.map((b, i) => (
                                            <li key={i} className="flex items-start gap-1.5 md:gap-3 text-[10px] sm:text-xs md:text-sm lg:text-base text-gray-600 font-medium">
                                                <Check className="w-3.5 h-3.5 md:w-5 md:h-5 text-[#2E7D32] flex-shrink-0 mt-[1px] md:mt-[2px] stroke-[2.5]" />
                                                {b}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
