import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ListOrdered, PlayCircle, Check } from 'lucide-react';

const tabs = [
    { id: 'details', label: 'Details', icon: FileText },
    { id: 'howToUse', label: 'How to Use', icon: ListOrdered },
    { id: 'video', label: 'Video Guide', icon: PlayCircle },
];

// How-to-Use step data
const howToUseSteps = [
    {
        id: 1,
        title: 'Preparation of soil',
        heading: 'Bedrock of growth, optimising the soil for planting.',
        description: 'Soil preparation is crucial in the modern farming ecosystem. This process involves testing soil for nutrient and pH levels to ensure your Napier grass thrives from the very start.',
        bullets: ['100% Organic Products', 'The Best Ingredients', 'Cow Meat & Milk'],
        image: '/soil-prep.jpg',
    },
    {
        id: 2,
        title: 'Irrigation & fertilisation',
        heading: 'Consistent watering and nutrients for rapid growth.',
        description: 'Napier grass requires steady irrigation especially during the first three weeks. Balanced fertilisation ensures fast, lush growth and maximises biomass yield.',
        bullets: ['Drip or Flood Irrigation', 'NPK 10-10-10 recommended', 'Fortnightly feeding schedule'],
        image: '/irrigation.jpg',
    },
    {
        id: 3,
        title: 'Pest and disease control',
        heading: 'Protect your crop from common threats.',
        description: 'Monitor regularly for aphids, stem borers and fungal infections. Early intervention with organic sprays keeps your crop healthy and productive.',
        bullets: ['Weekly scouting recommended', 'Neem-based organic sprays', 'Remove infected stems promptly'],
        image: '/pest-control.jpg',
    },
    {
        id: 4,
        title: 'Harvesting & storage',
        heading: 'Harvest at the right time for maximum yield.',
        description: 'Cut when grass reaches 1.5–2 m in height, leaving 15 cm of stalk to encourage regrowth. Store in a cool, shaded area for continuous biomass production.',
        bullets: ['Harvest every 45–60 days', 'Cut 15 cm above ground', 'Store in cool shaded area'],
        image: '/harvesting.jpg',
    },
];

// All numbered steps for the bottom list
const allSteps = [
    'Prepare well-drained soil with a pH of 5.5–7.0 and mix in 2–3 kg of compost per square metre.',
    'Sow seeds 1–2 cm deep in rows spaced 60–90 cm apart. Thin seedlings to 30 cm spacing after germination.',
    'Water consistently during the first 3 weeks. Reduce to twice-weekly once established.',
    'Apply a balanced NPK fertiliser (10-10-10) at 200 g per plant every 6 weeks during the growing season.',
    'Harvest when the grass reaches 1.5–2 m in height, cutting stalks 15 cm above the ground to encourage regrowth.',
    'Store harvested grass in a cool, shaded area. Re-cut every 45–60 days for continuous biomass production.',
];

function QuickInfoCard({ title, body, highlight }) {
    return (
        <div className="border-b border-gray-200 pb-5">
            <h4 className="text-xl font-bold text-gray-900 mb-1">{title}</h4>
            <p className={`text-sm leading-relaxed ${highlight ? 'text-[#1B5E20]' : 'text-gray-500'}`}>{body}</p>
        </div>
    );
}

// Faint tractor SVG watermark
function TractorWatermark() {
    return (
        <svg viewBox="0 0 120 80" fill="none" className="w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <circle cx="35" cy="58" r="18" stroke="white" strokeWidth="3" />
            <circle cx="35" cy="58" r="8" stroke="white" strokeWidth="2" />
            <circle cx="85" cy="62" r="12" stroke="white" strokeWidth="3" />
            <circle cx="85" cy="62" r="5" stroke="white" strokeWidth="2" />
            <rect x="30" y="28" width="55" height="22" rx="4" stroke="white" strokeWidth="3" />
            <rect x="50" y="18" width="28" height="16" rx="3" stroke="white" strokeWidth="2.5" />
            <line x1="18" y1="42" x2="28" y2="42" stroke="white" strokeWidth="3" strokeLinecap="round" />
            <line x1="95" y1="38" x2="108" y2="30" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="95" y1="38" x2="110" y2="42" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
    );
}

export default function ProductTabs({ product }) {
    const [activeTab, setActiveTab] = useState('details');
    const [activeStep, setActiveStep] = useState(0);

    const step = howToUseSteps[activeStep];

    return (
        <div className="mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

                {/* Left: Tab Nav + Content */}
                <div className="lg:col-span-3">
                    {/* Tab Buttons */}
                    <div className="flex border-b border-gray-200 mb-8 gap-1">
                        {tabs.map(tab => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 -mb-[2px] transition-all duration-200 whitespace-nowrap ${isActive
                                        ? 'border-[#1B5E20] text-[#1B5E20]'
                                        : 'border-transparent text-gray-500 hover:text-[#1B5E20] hover:border-[#1B5E20]/30'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Tab Content */}
                    <AnimatePresence mode="wait">
                        {activeTab === 'details' && (
                            <motion.div
                                key="details"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.2 }}
                                className="text-gray-600 leading-relaxed space-y-4"
                            >
                                <p className="text-base leading-loose">{product.description}</p>
                                <p className="text-base leading-loose text-gray-500">
                                    This premium variety has been carefully selected for superior germination rates and field performance.
                                    It is well-suited to a wide range of soil types and climate conditions, making it an excellent
                                    choice for both small-scale and commercial growers. Each batch is rigorously tested to meet our
                                    quality standards before dispatch, ensuring you receive only the finest seeds.
                                </p>
                            </motion.div>
                        )}

                        {activeTab === 'howToUse' && (
                            <motion.div
                                key="howToUse"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-10"
                            >
                                {/* ── TOP PANEL: Dark green nav + Image + White card ── */}
                                <div className="grid grid-cols-[180px_250px_1fr] rounded-2xl overflow-hidden shadow-lg min-h-[400px] h-full">

                                    {/* LEFT: Dark green sidebar */}
                                    <div className="bg-[#1a3a1f] flex flex-col justify-between p-5 relative overflow-hidden">
                                        <img
                                            src="/Green-Leaf-PNG.png"
                                            alt="Decorative Leaf"
                                            className="absolute -top-8 -right-4 scale-y-[-1] scale-x-[-1] w-24 h-24 md:w-34 md:h-34 object-contain opacity-20 z-0 pointer-events-none drop-shadow-2xl"
                                        />
                                        {/* Step counter */}
                                        <div className="text-sm font-bold tracking-widest">
                                            <span className="text-[#a3c46a]">
                                                {String(activeStep + 1).padStart(2, '0')}
                                            </span>
                                            <span className="text-white/30">
                                                /{String(howToUseSteps.length).padStart(2, '0')}
                                            </span>
                                        </div>

                                        {/* Step navigation list */}
                                        <nav className="flex flex-col gap-3 relative z-10">
                                            {howToUseSteps.map((s, idx) => (
                                                <button
                                                    key={s.id}
                                                    onClick={() => setActiveStep(idx)}
                                                    className={`text-left text-xs font-semibold leading-snug transition-colors duration-200 ${activeStep === idx
                                                        ? 'text-[#a3c46a]'
                                                        : 'text-white/70 hover:text-[#a3c46a]'
                                                        }`}
                                                >
                                                    {s.title}
                                                </button>
                                            ))}
                                        </nav>
                                    </div>

                                    {/* CENTER: Image */}
                                    <div className="relative overflow-hidden">
                                        <AnimatePresence mode="wait">
                                            <motion.img
                                                key={activeStep}
                                                src={step.image}
                                                alt={step.title}
                                                initial={{ opacity: 0, scale: 1.05 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.97 }}
                                                transition={{ duration: 0.4 }}
                                                className="absolute inset-0 w-full h-full object-cover object-center rounded-r-xl shadow-2xl"
                                                onError={e => {
                                                    e.target.src = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80';
                                                }}
                                            />
                                        </AnimatePresence>
                                    </div>

                                    {/* RIGHT: White info card */}
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeStep}
                                            initial={{ opacity: 0, x: 16 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -16 }}
                                            transition={{ duration: 0.35 }}
                                            className="bg-white p-6 flex flex-col justify-center gap-4"
                                        >
                                            <h3 className="text-[#1B5E20] font-bold text-base leading-snug">
                                                {step.heading}
                                            </h3>
                                            <p className="text-gray-500 text-xs leading-relaxed">
                                                {step.description}
                                            </p>
                                            <ul className="space-y-2">
                                                {step.bullets.map((b, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                                                        <Check className="w-3 h-3 text-[#1B5E20] flex-shrink-0 mt-0.5" />
                                                        {b}
                                                    </li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* ── BOTTOM: Numbered step list ── */}
                                {/* <div className="bg-[#f5f7f2] rounded-2xl p-8">
                                    <ol className="space-y-6">
                                        {allSteps.map((s, idx) => (
                                            <motion.li
                                                key={idx}
                                                initial={{ opacity: 0, x: -12 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.07 }}
                                                className="flex items-start gap-4"
                                            >
                                                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1B5E20] text-white text-sm font-bold flex items-center justify-center">
                                                    {idx + 1}
                                                </span>
                                                <p className="text-[#2d5a27] text-sm leading-relaxed pt-1">{s}</p>
                                            </motion.li>
                                        ))}
                                    </ol>
                                </div> */}
                            </motion.div>
                        )}

                        {activeTab === 'video' && (
                            <motion.div
                                key="video"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.2 }}
                            >
                                {product.youtubeVideoId ? (
                                    <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 aspect-video">
                                        <iframe
                                            className="w-full h-full"
                                            src={`https://www.youtube.com/embed/${product.youtubeVideoId}`}
                                            title={`${product.name} — Video Guide`}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>
                                ) : (
                                    <p className="text-gray-500">No video guide available for this product.</p>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right: Quick Info Cards */}
                <div className="lg:col-span-2 space-y-6 mt-18">
                    <QuickInfoCard title="Shipping" body="We offer domestic shipping only." />
                    <QuickInfoCard
                        title="Difficulty Level"
                        body={product.season === 'All Year' ? 'Beginner' : 'Intermediate'}
                    />
                    <QuickInfoCard
                        title="Return & Exchange"
                        body="If you are not satisfied with your purchase you can return it to us within 14 days for an exchange or refund."
                        highlight
                    />
                    <QuickInfoCard title="Help" body="Email us at support@supernapier.com" />
                </div>
            </div>
        </div>
    );
}
