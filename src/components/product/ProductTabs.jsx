import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ListOrdered, PlayCircle, Check } from 'lucide-react';



function QuickInfoCard({ title, body, highlight }) {
    return (
        <div className="border-b border-gray-200 pb-5">
            <h4 className="text-xl font-bold text-gray-900 mb-1">{title}</h4>
            <p className={`text-sm leading-relaxed ${highlight ? 'text-[#1B5E20]' : 'text-gray-500'}`}>{body}</p>
        </div>
    );
}


export default function ProductTabs({ product }) {
    const getActiveLanguage = () => {
        const getCookie = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
            return null;
        };
        const googtrans = getCookie('googtrans');
        if (googtrans) {
            const parts = googtrans.split('/');
            if (parts.length >= 3) {
                return parts[2].toLowerCase();
            }
        }
        return 'en';
    };

    const activeLang = getActiveLanguage();

    const resolveVideoUrl = (videoField) => {
        if (!videoField) return null;
        if (typeof videoField === 'string') return videoField;
        return videoField[activeLang] || videoField['en'] || Object.values(videoField).find(v => !!v) || null;
    };

    const getYoutubeId = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : url;
    };

    const productVideoUrlResolved = resolveVideoUrl(product.productVideoUrl);
    const productVideoId = getYoutubeId(productVideoUrlResolved) || product.youtubeVideoId;

    const howToPlantVideoUrlResolved = resolveVideoUrl(product.howToPlantVideoUrl);
    const howToPlantVideoId = getYoutubeId(howToPlantVideoUrlResolved);

    // Build tabs dynamically
    const availableTabs = [
        { id: 'details', label: 'Details', icon: FileText },
    ];

    if (productVideoId) {
        availableTabs.push({ id: 'video', label: 'Product Video', icon: PlayCircle });
    }

    if (howToPlantVideoId) {
        availableTabs.push({ id: 'plantVideo', label: 'How to Plant Video', icon: PlayCircle });
    }

    const [activeTab, setActiveTab] = useState('details');
    const currentActiveTab = availableTabs.some(t => t.id === activeTab) ? activeTab : 'details';

    return (
        <div className="mb-10 md:mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

                {/* Left: Tab Nav + Content */}
                <div className="lg:col-span-3">
                    {/* Tab Buttons */}
                    <div className="flex border-b border-gray-200 mb-8 gap-1">
                        {availableTabs.map(tab => {
                            const Icon = tab.icon;
                            const isActive = currentActiveTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`break-all whitespace-normal flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 -mb-[2px] transition-all duration-200 ${isActive
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
                        {currentActiveTab === 'details' && (
                            <motion.div
                                key="details"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.2 }}
                                className="text-gray-600 leading-relaxed space-y-4"
                            >
                                <p className="text-base leading-loose">{product.description?.en || product.description}</p>
                                <p className="text-base leading-loose text-gray-500">
                                    This premium variety has been carefully selected for superior germination rates and field performance.
                                    It is well-suited to a wide range of soil types and climate conditions, making it an excellent
                                    choice for both small-scale and commercial growers. Each batch is rigorously tested to meet our
                                    quality standards before dispatch, ensuring you receive only the finest seeds.
                                </p>
                            </motion.div>
                        )}

                        {currentActiveTab === 'video' && (
                            <motion.div
                                key="video"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.2 }}
                            >
                                {productVideoId ? (
                                    <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 aspect-video">
                                        <iframe
                                            className="w-full h-full"
                                            src={`https://www.youtube.com/embed/${productVideoId}`}
                                            title={`${product.name?.en || 'Product'} — Product Video`}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>
                                ) : (
                                    <p className="text-gray-500">No product video available.</p>
                                )}
                            </motion.div>
                        )}

                        {currentActiveTab === 'plantVideo' && (
                            <motion.div
                                key="plantVideo"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.2 }}
                            >
                                {howToPlantVideoId ? (
                                    <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 aspect-video">
                                        <iframe
                                            className="w-full h-full"
                                            src={`https://www.youtube.com/embed/${howToPlantVideoId}`}
                                            title={`${product.name?.en || 'Product'} — How to Plant Video`}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>
                                ) : (
                                    <p className="text-gray-500">No how to plant video available.</p>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right: Quick Info Cards */}
                <div className="lg:col-span-2 space-y-6 mt-8 lg:mt-18">
                    <QuickInfoCard title="Shipping" body="We offer domestic shipping only inside India." />
                    <QuickInfoCard
                        title="Difficulty Level"
                        body={product.season === 'All Year' ? 'Beginner' : 'Intermediate'}
                    />
                    <QuickInfoCard
                        title="Return & Exchange"
                        body="Due to the short shelf life of agricultural seeds and hybrid fodder, we do not provide returns or exchanges."
                        highlight
                    />
                    <QuickInfoCard title="Help" body="Email us at support@supernapier.com" />
                </div>
            </div>
        </div>
    );
}
