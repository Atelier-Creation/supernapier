import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Tractor, Sprout, Droplets, Wheat } from 'lucide-react';

// How-to-Use step data
const howToUseSteps = [
    {
        id: 1,
        title: 'Land Preparation',
        heading: 'Creating the perfect foundation for growth.',
        description: 'Super Napier requires well-drained soil rich in organic matter. Plough the land deeply and mix in farm yard manure to ensure strong root development from day one.',
        bullets: ['Deep ploughing (2-3 times)', 'Mix organic manure thoroughly', 'Maintain soil pH between 5.5 - 7.0'],
        image: '/soil-prep.jpg',
        icon: Tractor,
    },
    {
        id: 2,
        title: 'Planting Slips',
        heading: 'Positioning slips for maximum yield.',
        description: 'Proper spacing is essential. Plant the slips at an angle, burying two nodes in the soil and leaving one node above ground to encourage rapid sprouting.',
        bullets: ['Maintain 3x2 ft spacing', 'Plant at a 45-degree angle', 'Ensure good soil-to-slip contact'],
        image: '/irrigation.jpg',
        icon: Sprout,
    },
    {
        id: 3,
        title: 'Irrigation & Care',
        heading: 'Consistent moisture for rapid multiplication.',
        description: 'Super Napier demands regular watering, especially right after planting. Ensure steady irrigation to accelerate the sprouting and tillering processes.',
        bullets: ['Water immediately after planting', 'Irrigate every 7-10 days', 'Keep field weed-free initially'],
        image: '/pest-control.jpg',
        icon: Droplets,
    },
    {
        id: 4,
        title: 'First Harvest',
        heading: 'Reaping the high-protein reward.',
        description: 'The first cut should happen a bit later to establish the plant. After the first harvest, the grass will regrow rapidly, allowing for frequent subsequent cuts.',
        bullets: ['First cut at 75-90 days', 'Subsequent cuts every 45-60 days', 'Leave 2-3 inches of stalk above ground'],
        image: '/harvesting.jpg',
        icon: Wheat,
    },
];



export default function HowToUseSection() {
    const [[activeStep, direction], setStepTuple] = useState([0, 1]);
    const step = howToUseSteps[activeStep];

    const hasInteracted = useRef(false);

    const setActiveStep = (newStep) => {
        hasInteracted.current = true;
        if (newStep !== activeStep) {
            setStepTuple([newStep, newStep > activeStep ? 1 : -1]);
        }
    };

    const cardVariants = {
        enter: (dir) => ({ opacity: 0, x: dir > 0 ? 16 : -16 }),
        center: { opacity: 1, x: 0 },
        exit: (dir) => ({ opacity: 0, x: dir > 0 ? -16 : 16 }),
    };

    const imageVariants = {
        enter: (dir) => ({ opacity: 0, scale: 1.05, x: dir > 0 ? 8 : -8 }),
        center: { opacity: 1, scale: 1, x: 0 },
        exit: (dir) => ({ opacity: 0, scale: 0.97, x: dir > 0 ? -8 : 8 }),
    };

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
            hasInteracted.current = true;
            setActiveStep(Math.min(activeStep + 1, howToUseSteps.length - 1));
        } else if (isRightSwipe) {
            hasInteracted.current = true;
            setActiveStep(Math.max(activeStep - 1, 0));
        }
    };

    const swipeHandlers = {
        onTouchStart,
        onTouchMove,
        onTouchEnd
    };

    useEffect(() => {
        if (!hasInteracted.current) {
            return;
        }
        const activeNavEl = document.getElementById(`step-tab-${activeStep}`);
        if (activeNavEl && activeNavEl.parentElement) {
            // Scroll the navigation container directly instead of using scrollIntoView
            // which can cause the whole page to horizontally shift if constrained.
            const container = activeNavEl.parentElement;
            const scrollLeft = activeNavEl.offsetLeft - (container.clientWidth / 2) + (activeNavEl.clientWidth / 2);
            container.scrollTo({ left: Math.max(0, scrollLeft), behavior: 'smooth' });
        }
    }, [activeStep]);

    return (
        <div className="w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 my-0 md:my-16">
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
                        {/* <div className="flex items-start gap-4 md:gap-6 max-w-4xl">
                            
                            <p className="text-gray-300 text-sm md:text-lg leading-relaxed font-medium">
                                Growing high-yield Super Napier grass is a straightforward process when following the correct agricultural practices. From initially preparing the land to harvesting the first high-protein crop, these proven steps ensure maximum tillering, rapid growth, and sustainable continuous yields for years to come.
                            </p>
                        </div> */}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr_1.5fr] lg:grid-cols-[1fr_1.5fr_1.5fr] gap-3 sm:gap-6 md:gap-8 lg:gap-0 h-full min-h-min md:min-h-[450px]">
                        {/* LEFT: Dark green sidebar / navigation list */}
                        <div className="order-1 md:col-span-1 flex flex-col justify-start md:justify-between relative pt-0 md:pt-5 md:border-t border-[#294B34] min-w-0">
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
                            <nav className="flex flex-row md:flex-col gap-4 sm:gap-6 md:gap-4 relative z-10 pb-4 md:pb-0 overflow-x-auto scrollbar-hide -mx-6 px-6 sm:-mx-10 sm:px-10 md:mx-0 md:px-0 after:content-[''] after:w-1 after:shrink-0 md:after:hidden">
                                {howToUseSteps.map((s, idx) => {
                                    const Icon = s.icon;
                                    return (
                                        <button
                                            key={s.id}
                                            id={`step-tab-${idx}`}
                                            onClick={() => setActiveStep(idx)}
                                            className={`relative overflow-hidden flex flex-col md:block text-left text-lg md:text-xl lg:text-[22px] xl:text-2xl font-bold leading-snug transition-colors duration-200 whitespace-nowrap md:whitespace-normal shrink-0 pt-3 md:pt-0 pb-1 md:pb-2 border-t-2 md:border-none ${activeStep === idx
                                                ? 'text-[#eecd15] border-[#eecd15]'
                                                : 'text-[#42644D] border-[#294B34] hover:text-[#eecd15] hover:border-[#42644D] md:hover:border-transparent'
                                                }`}
                                        >
                                            {/* Background Icon (Desktop) */}
                                            {Icon && (
                                                <div className={`hidden md:flex absolute right-10 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300 ${activeStep === idx ? 'opacity-[0.14] text-[#eecd15] scale-110' : 'opacity-[0.05] text-[#42644D] scale-100'}`}>
                                                    <Icon className="w-10 h-10 md:w-10 md:h-16 stroke-[1.5]" />
                                                </div>
                                            )}
                                            {/* Mobile Subtitle */}
                                            <span className={`md:hidden relative z-10 text-xs md:text-sm tracking-widest uppercase mb-1 font-semibold ${activeStep === idx ? 'text-[#eecd15]/80' : 'text-[#42644D]'}`}>
                                                Step 0{idx + 1}
                                            </span>
                                            <span className="relative z-10">{s.title}</span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>

                        {/* CENTER: Image */}
                        <div
                            className="order-3 md:order-2 relative overflow-hidden rounded-xl h-[150px] sm:h-[160px] md:h-full md:min-h-[400px]"
                            {...swipeHandlers}
                        >
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.img
                                    key={activeStep}
                                    custom={direction}
                                    src={step.image}
                                    alt={step.title}
                                    variants={imageVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.35, ease: "easeOut" }}
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
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={activeStep}
                                    custom={direction}
                                    variants={cardVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{ duration: 0.35, ease: "easeOut" }}
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
