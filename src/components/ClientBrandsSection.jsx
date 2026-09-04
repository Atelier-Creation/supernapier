import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';

import 'swiper/css';

const CLIENT_BRANDS = [
    {
        id: 'amul',
        name: 'Amul',
        fullname: 'Gujarat Cooperative Milk Marketing Federation (GCMMF)',
        tag: "India's Largest Dairy Cooperative",
        logo: '/clients/amul.svg',
    },
    {
        id: 'reliance',
        name: 'Reliance Industries Ltd',
        fullname: 'Reliance Industries Limited',
        tag: 'Leading Industrial Conglomerate',
        logo: '/clients/reliance.svg',
    },
    {
        id: 'indian-navy',
        name: 'Indian Navy',
        fullname: 'Indian Naval Armed Forces',
        tag: 'Ministry of Defence • Govt. of India',
        logo: '/clients/indian-navy.svg',
    },
    {
        id: 'nlc-india',
        name: 'NLC India Limited',
        fullname: 'NLC India Limited (Neyveli Lignite)',
        tag: 'Navratna CPSE • Govt. of India',
        logo: '/clients/nlc-india.svg',
    },
    {
        id: 'hatsun',
        name: 'Hatsun Agro Product',
        fullname: 'Hatsun Agro Product Ltd. (HAP)',
        tag: "India's Leading Private Dairy",
        logo: '/clients/hatsun.svg',
    },
    {
        id: 'gps-renewables',
        name: 'GPS Renewables Ltd',
        fullname: 'GPS Renewable Energy Limited',
        tag: 'Pioneering Bioenergy & Clean Tech',
        logo: '/clients/gps-renewables.svg',
    },
];

export default function ClientBrandsSection() {
    const swiperRef = useRef(null);

    return (
        <section className="py-12 md:py-18 bg-gradient-to-b from-[#f8faf6] to-white relative overflow-hidden border-y border-gray-100/80">
            {/* Background decorative watermark */}
            <div className="absolute inset-0 bg-[radial-gradient(#16a34a_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header matching user reference */}
                <div className="text-center max-w-5xl mx-auto mb-8 md:mb-12">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        Our Esteemed Clients
                    </div>
                    
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-black text-gray-900 tracking-tight leading-tight">
                        Top Organisations <span className="text-[#f97316] block sm:inline">Trust Super Napier</span>
                    </h2>
                    
                    <p className="mt-4 text-sm md:text-base text-gray-600 font-medium">
                        Proudly supplying premier high-yield green fodder & certified seeds to India's most prestigious dairy giants, national institutions, and enterprises.
                    </p>
                </div>

                {/* Slider Container with Navigation Controls */}
                <div className="relative px-10 sm:px-12 md:px-14">
                    {/* Left Navigation Arrow */}
                    <button
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="absolute left-0 sm:left-1 md:left-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-white shadow-md border border-gray-200/80 flex items-center justify-center text-[#581c87] hover:text-[#f97316] hover:border-orange-200 hover:bg-orange-50/50 active:scale-95 transition-all duration-200 cursor-pointer"
                        aria-label="Previous client"
                    >
                        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>

                    {/* Right Navigation Arrow */}
                    <button
                        onClick={() => swiperRef.current?.slideNext()}
                        className="absolute right-0 sm:right-1 md:right-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-white shadow-md border border-gray-200/80 flex items-center justify-center text-[#581c87] hover:text-[#f97316] hover:border-orange-200 hover:bg-orange-50/50 active:scale-95 transition-all duration-200 cursor-pointer"
                        aria-label="Next client"
                    >
                        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>

                    {/* Swiper Slider */}
                    <Swiper
                        modules={[Autoplay, Navigation]}
                        onBeforeInit={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        slidesPerView={1}
                        centeredSlides={true}
                        spaceBetween={16}
                        loop={true}
                        autoplay={{
                            delay: 3500,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        speed={700}
                        breakpoints={{
                            540: {
                                slidesPerView: 2,
                                centeredSlides: false,
                                spaceBetween: 18,
                            },
                            768: {
                                slidesPerView: 3,
                                centeredSlides: false,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 4,
                                centeredSlides: false,
                                spaceBetween: 24,
                            },
                            1280: {
                                slidesPerView: 5,
                                centeredSlides: false,
                                spaceBetween: 24,
                            },
                        }}
                        className="py-3 px-1"
                    >
                        {CLIENT_BRANDS.map((client) => (
                            <SwiperSlide key={client.id} className="h-auto">
                                <div className="h-full bg-white rounded-2xl md:rounded-3xl border border-gray-200/70 hover:border-emerald-300/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(22,163,74,0.12)] p-4 sm:p-5 md:p-6 flex flex-col items-center justify-between min-h-[170px] sm:min-h-[185px] md:min-h-[200px] max-w-[280px] sm:max-w-none mx-auto transition-all duration-300 hover:-translate-y-1 group">
                                    {/* Logo Container */}
                                    <div className="w-full h-18 sm:h-20 md:h-22 flex items-center justify-center p-1 relative">
                                        <img
                                            src={client.logo}
                                            alt={`${client.name} logo`}
                                            className="max-h-full max-w-[85%] object-contain transition-transform duration-300 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                    </div>

                                    {/* Client details */}
                                    <div className="w-full text-center border-t border-gray-100 pt-3 mt-2">
                                        <h3 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#16a34a] transition-colors line-clamp-1">
                                            {client.name}
                                        </h3>
                                        <p className="text-[10px] sm:text-[11px] text-gray-500 font-medium line-clamp-1 mt-0.5">
                                            {client.tag}
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}
