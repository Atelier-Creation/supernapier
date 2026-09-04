import React from 'react';
import { Star, ShieldCheck, ExternalLink } from 'lucide-react';

export default function ReviewsShowcaseSection() {
    return (
        <section className="py-14 md:py-24 bg-[#FAFCF8] relative overflow-hidden">
            {/* Background decorative soft glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-blue-50/40 via-amber-50/40 to-emerald-50/40 rounded-full blur-3xl pointer-events-none -z-0" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header matching user reference */}
                <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        Verified Ratings & Trust
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1e1b4b] tracking-tight leading-tight">
                        Trusted Across Leading <span className="text-[#ea580c] block mt-1">Review Platforms</span>
                    </h2>

                    <p className="mt-4 text-sm md:text-base text-gray-600 font-medium max-w-xl mx-auto">
                        Hundreds of verified ratings from real farmers and customers across trusted platforms.
                    </p>
                </div>

                {/* 2-Column Showcase Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 max-w-5xl mx-auto">
                    {/* Google Review Card */}
                    <div className="bg-[#f0f6ff] border border-blue-100 rounded-[2.5rem] p-7 sm:p-9 md:p-11 text-center flex flex-col items-center justify-between shadow-[0_4px_20px_rgba(37,99,235,0.05)] hover:shadow-[0_12px_36px_rgba(37,99,235,0.12)] transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden">
                        {/* Subtle top-right watermark badge */}
                        <div className="absolute top-4 right-5 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-blue-100/60 text-blue-700">
                            Verified Profile
                        </div>

                        {/* Top: Google Logo & Rating */}
                        <div className="w-full flex flex-col items-center">
                            <div className="h-10 sm:h-12 flex items-center justify-center">
                                <img
                                    src="/reviews/google-logo.svg"
                                    alt="Google"
                                    className="h-8 sm:h-9 object-contain"
                                    loading="lazy"
                                />
                            </div>

                            {/* 5 Golden Stars */}
                            <div className="flex items-center justify-center gap-1 mt-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-5 h-5 sm:w-6 sm:h-6 fill-[#f59e0b] text-[#f59e0b]"
                                    />
                                ))}
                            </div>

                            {/* Rating Text */}
                            <div className="mt-2 text-xl sm:text-2xl font-extrabold text-gray-900 flex items-center justify-center gap-1.5">
                                <span className="text-[#ea580c]">★</span> 4.7/5
                            </div>
                            <p className="text-xs sm:text-sm font-semibold text-gray-500 mt-0.5">
                                Average Rating
                            </p>
                        </div>

                        {/* Thin Divider Line */}
                        <div className="w-full h-px bg-blue-200/60 my-6 sm:my-8" />

                        {/* Center: Big Numbers & Descriptions */}
                        <div className="w-full flex flex-col items-center">
                            <div className="text-5xl sm:text-6xl font-black text-[#1a73e8] tracking-tight">
                                517+
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mt-2">
                                Verified Ratings on Google
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 font-medium mt-3 max-w-xs mx-auto leading-relaxed">
                                Rated by hundreds of farmers for our high-germination hybrid seeds, prompt dispatch, and dedicated crop guidance.
                            </p>
                        </div>

                        {/* Bottom: Pill Outline Action Button */}
                        <div className="w-full mt-8 flex justify-center">
                            <a
                                href="https://share.google/0YNit6yvzqI8LszqK"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 w-full max-w-xs py-3 px-6 rounded-full border-2 border-[#1a73e8] text-[#1a73e8] bg-white/70 hover:bg-[#1a73e8] hover:text-white font-bold text-sm sm:text-base transition-all duration-200 shadow-sm active:scale-95 group/btn"
                            >
                                <span>View on Google</span>
                                <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                            </a>
                        </div>
                    </div>

                    {/* Justdial Review Card */}
                    <div className="bg-[#fff8f0] border border-amber-100 rounded-[2.5rem] p-7 sm:p-9 md:p-11 text-center flex flex-col items-center justify-between shadow-[0_4px_20px_rgba(234,88,12,0.05)] hover:shadow-[0_12px_36px_rgba(234,88,12,0.12)] transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden">
                        {/* Subtle top-right watermark badge */}
                        <div className="absolute top-4 right-5 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-amber-100/60 text-amber-800">
                            Verified Seller
                        </div>

                        {/* Top: Justdial Logo & Rating */}
                        <div className="w-full flex flex-col items-center">
                            <div className="h-10 sm:h-12 flex items-center justify-center">
                                <img
                                    src="/reviews/justdial-logo.svg"
                                    alt="Justdial"
                                    className="h-8 sm:h-9 object-contain"
                                    loading="lazy"
                                />
                            </div>

                            {/* 5 Golden Stars */}
                            <div className="flex items-center justify-center gap-1 mt-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-5 h-5 sm:w-6 sm:h-6 fill-[#f59e0b] text-[#f59e0b]"
                                    />
                                ))}
                            </div>

                            {/* Rating Text */}
                            <div className="mt-2 text-xl sm:text-2xl font-extrabold text-gray-900 flex items-center justify-center gap-1.5">
                                <span className="text-[#ea580c]">★</span> 4.7/5
                            </div>
                            <p className="text-xs sm:text-sm font-semibold text-gray-500 mt-0.5">
                                Average Rating
                            </p>
                        </div>

                        {/* Thin Divider Line */}
                        <div className="w-full h-px bg-amber-200/60 my-6 sm:my-8" />

                        {/* Center: Big Numbers & Descriptions */}
                        <div className="w-full flex flex-col items-center">
                            <div className="text-5xl sm:text-6xl font-black text-[#ff5200] tracking-tight">
                                508+
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mt-2">
                                Verified Ratings on Justdial
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 font-medium mt-3 max-w-xs mx-auto leading-relaxed">
                                Recognized as a premier verified agriculture & fodder supplier for Super Napier grass, slips, and organic seeds.
                            </p>
                        </div>

                        {/* Bottom: Pill Outline Action Button */}
                        <div className="w-full mt-8 flex justify-center">
                            <a
                                href="https://www.justdial.com/Vriddhachalam/Super-Napier-Shakti-Nagar/9999P4143-4143-181010121254-T9V7_BZDET"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 w-full max-w-xs py-3 px-6 rounded-full border-2 border-[#ff5200] text-[#ff5200] bg-white/70 hover:bg-[#ff5200] hover:text-white font-bold text-sm sm:text-base transition-all duration-200 shadow-sm active:scale-95 group/btn"
                            >
                                <span>View on Justdial</span>
                                <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
