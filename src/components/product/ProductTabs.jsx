import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ListOrdered, PlayCircle, Check } from 'lucide-react';

const tabs = [
    { id: 'details', label: 'Details', icon: FileText },
    { id: 'video', label: 'Video Guide', icon: PlayCircle },
];

function QuickInfoCard({ title, body, highlight }) {
    return (
        <div className="border-b border-gray-200 pb-5">
            <h4 className="text-xl font-bold text-gray-900 mb-1">{title}</h4>
            <p className={`text-sm leading-relaxed ${highlight ? 'text-[#1B5E20]' : 'text-gray-500'}`}>{body}</p>
        </div>
    );
}


export default function ProductTabs({ product }) {
    const [activeTab, setActiveTab] = useState('details');

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
