import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const TrustSection = () => {
    // LEFT SIDE
    const leftCol1 = [
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    ];

    const leftCol2 = [
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce",
        "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c",
    ];

    // RIGHT SIDE
    const rightCol1 = [
        "https://images.unsplash.com/photo-1552058544-f2b08422138a",
        "https://images.unsplash.com/photo-1541534401786-2077eed87a74",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    ];

    const rightCol2 = [
        "https://images.unsplash.com/photo-1517841905240-472988babdf9",
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    ];

    return (
        <section className="w-full bg-white py-20 pb-10  px-4 relative overflow-hidden">


            <div className="relative z-20 max-w-[95%] mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-10">
                {/* Background Image */}
                <div className="absolute inset-0 bg-[url('/google-review-bg.webp')] md:bg-contain lg:bg-cover bg-center bg-no-repeat md:block hidden"></div>
                {/* LEFT SIDE */}
                <div className="hidden md:grid grid-cols-2 gap-4 relative z-20">

                    {/* Column 1 (3 images) */}
                    <div className="flex flex-col gap-4 me-auto">
                        <Swiper
                            direction="vertical"
                            loop={true}
                            slidesPerView={3}
                            spaceBetween={16}
                            autoplay={{
                                delay: 0,
                                disableOnInteraction: false,
                            }}
                            speed={2500}
                            modules={[Autoplay]}
                            className="h-[90vh]"
                        >
                            {leftCol1.concat(leftCol1).map((img, i) => (
                                <SwiperSlide key={i}>
                                    <div className="lg:h-50 lg:w-36 h-35 w-25 overflow-hidden rounded-full shadow-lg border border-gray-200">
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* Column 2 */}
                    <div className="flex flex-col gap-6 justify-center me-auto ">
                        <Swiper
                            direction="vertical"
                            loop={true}
                            slidesPerView={2}
                            spaceBetween={20}
                            autoplay={{
                                delay: 0,
                                disableOnInteraction: false,
                                reverseDirection: true,
                            }}
                            speed={2500}
                            modules={[Autoplay]}
                            className="h-[70vh]"
                        >
                            {leftCol2.concat(leftCol2).map((img, i) => (
                                <SwiperSlide key={i} className="">
                                    <div className="lg:h-50 lg:w-36 h-35 w-25  overflow-hidden rounded-full shadow-lg border border-gray-200">
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>

                {/* CENTER CONTENT */}
                <div className="text-center w-full flex flex-col gap-4 justify-center items-center relative z-20">
                    <p className="text-4xl lg:text-6xl font-semibold  text-[#2D5A43]">
                        Trusted By

                    </p>
                    <p className="text-gray-900 font-normal text-3xl lg:text-5xl">Millions Of People</p>

                    <p className="text-gray-500 text-base lg:text-xl font-medium">
                        For Our Fusion Of Better Ingredients <br /> and Better Taste
                    </p>

                    <a
                        href="https://share.google/KEX9eNAIoOY1RRId0"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#16a34a] w-fit hover:bg-[#15803d] text-white px-4 md:px-8 py-3 rounded-full font-bold shadow-lg transition-colors"
                    >
                        View All
                    </a>
                </div>

                {/* MOBILE SLIDER */}
                <div className="md:hidden w-full mt-6 relative z-20">
                    <Swiper
                        slidesPerView={2}
                        spaceBetween={12}
                        loop={true}
                        autoplay={{
                            delay: 0,
                            disableOnInteraction: false,
                        }}
                        speed={2500}
                        modules={[Autoplay]}
                    >
                        {[...leftCol1, ...leftCol2, ...rightCol1, ...rightCol2]
                            .concat([...leftCol1, ...leftCol2, ...rightCol1, ...rightCol2])
                            .map((img, i) => (
                                <SwiperSlide key={i}>
                                    <div className="h-40 w-28 mx-auto overflow-hidden rounded-full shadow-md border border-gray-200">
                                        <img
                                            src={img}
                                            alt=""
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </div>

                {/* RIGHT SIDE */}
                <div className="hidden md:grid grid-cols-2 gap-4 relative z-20">

                    {/* Column 1 */}
                    <div className="flex flex-col gap-6 justify-center ms-auto relative z-10">
                        <Swiper
                            direction="vertical"
                            loop={true}
                            slidesPerView={2}
                            spaceBetween={20}
                            autoplay={{
                                delay: 0,
                                disableOnInteraction: false,
                            }}
                            speed={2500}
                            modules={[Autoplay]}
                            className="h-[70vh]"
                        >
                            {rightCol2.concat(rightCol2).map((img, i) => (
                                <SwiperSlide key={i}>
                                    <div className="lg:h-50 lg:w-36 h-35 w-25 overflow-hidden rounded-full shadow-lg border border-gray-200">
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* Column 2 */}
                    <div className="flex flex-col gap-4 ms-auto">
                        <Swiper
                            direction="vertical"
                            loop={true}
                            slidesPerView={3}
                            spaceBetween={16}
                            autoplay={{
                                delay: 0,
                                disableOnInteraction: false,
                                reverseDirection: true,
                            }}
                            speed={2500}
                            modules={[Autoplay]}
                            className="h-[90vh]"
                        >
                            {rightCol1.concat(rightCol1).map((img, i) => (
                                <SwiperSlide key={i}>
                                    <div className="lg:h-50 lg:w-36 h-35 w-25 overflow-hidden rounded-full shadow-lg border border-gray-200">
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                </div>

            </div>

            {/* FLOATING DECOR IMAGES */}
            <img
                src="/leaf.png"
                className="absolute lg:w-30 w-20 top-10 md:top-20 md:left-1/6 rotate-[15deg] md:hidden block"
                alt=""
            />

            <img
                src="/yellow-veg.png"
                className="absolute lg:w-30 w-20 top-20 right-0 md:top-20 md:right-[30%] -rotate-45 md:hidden block"
                alt=""
            />

            <img
                src="/pome.png"
                className="absolute w-20 lg:w-30 top-[30%] right-[30%] rotate-45 hidden "
                alt=""
            />
            <img
                src="/leaf.png"
                className="absolute w-20 lg:w-30 top-[50%] right-[25%] rotate-45 hidden"
                alt=""
            />

            {/* <img
                src="/pome.png"
                className="absolute w-30 md:w-20 lg:w-30 top-1/4 left-1/4 md:top-[40%] md:left-[25%] rotate-[25deg] opacity-10 md:opacity-100"
                alt=""
            /> */}

            <img
                src="/beans.png"
                className="absolute w-20 bottom-1/2 right-2 lg:w-30 md:bottom-1/5 md:right-[30%] rotate-[-30deg] md:hidden block"
                alt=""
            />



            <img
                src="/cucumber.png"
                className="absolute w-20 bottom-1/2 left-0 lg:w-30 md:bottom-1/5 md:left-[30%] rotate-90 md:hidden block"
                alt=""
            />


        </section>
    );
};

export default TrustSection;