import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const TrustSection = () => {
    // LEFT SIDE - High-yield Fodder Seeds & Crops (Hedge Lucerne, Moringa PKM-1, Agathi, Soundal, Super Napier)
    const leftCol1 = [
        "https://res.cloudinary.com/dxm28ujz3/image/upload/v1787585517/products/rcolu8uwxwr3swgwjamu.jpg", // Hedge Lucerne (Desmanthus) Seeds
        "https://res.cloudinary.com/dxm28ujz3/image/upload/v1787585672/products/zn9eaun9k3lzkfenaahm.jpg", // Moringa PKM-1 Drumstick Seeds
        "https://res.cloudinary.com/dxm28ujz3/image/upload/v1787586457/products/bh3vljhqa9th423rfz95.jpg", // Agathi Seeds (Sesbania Grandiflora)
        "https://res.cloudinary.com/dxm28ujz3/image/upload/v1787586429/products/l0qpfijtfsj0nnftigwn.jpg", // Soundal Seeds (Subabul)
        "https://res.cloudinary.com/dxm28ujz3/image/upload/v1788265801/products/oca008o0k8relukt6jy5.jpg", // Super Napier Stems & Slips
    ];

    const leftCol2 = [
        "https://res.cloudinary.com/dxm28ujz3/image/upload/v1787585517/products/iqhdvrpem6rq8xityvc4.jpg", // Hedge Lucerne Seeds in Hand
        "https://res.cloudinary.com/dxm28ujz3/image/upload/v1787585672/products/exffweunrjyy3zpvp289.jpg", // Moringa PKM-1 Seeds Macro
        "https://res.cloudinary.com/dxm28ujz3/image/upload/v1787586457/products/g34nao0phtonvjnjnvtu.jpg", // Agathi Seeds in Hand
        "https://res.cloudinary.com/dxm28ujz3/image/upload/v1787586430/products/hceinzfjjnl9wgnyc0ym.jpg", // Soundal Seeds in Hand
        "https://res.cloudinary.com/dxm28ujz3/image/upload/v1787585203/products/iiyqmcfvq2owyjhjqo0l.jpg", // Dwarf Napier Slips
    ];

    // RIGHT SIDE - Seed Collections & Fodder Harvests
    const rightCol1 = [
        "https://res.cloudinary.com/dxm28ujz3/image/upload/v1787586430/products/azjve3reu7m6zl7a93dk.jpg", // Soundal Subabul Seed Heap
        "https://res.cloudinary.com/dxm28ujz3/image/upload/v1788265801/products/wdfdrxtvs1v1ue4mwene.jpg", // Super Napier Harvested Stems
        "https://res.cloudinary.com/dxm28ujz3/image/upload/v1787586659/products/kk5anpyoy5dlzrjmfhci.png", // Hedge Lucerne Seeds
        "https://res.cloudinary.com/dxm28ujz3/image/upload/v1786941511/products/rylng3tixaykjmgpworq.png", // Moringa PKM-1 Seed Pods & Foliage
        "https://res.cloudinary.com/dxm28ujz3/image/upload/v1787585203/products/gtlx5lzaveelmjqetq2y.jpg", // Dwarf Napier Fodder Crop
    ];

    const rightCol2 = [
        "https://res.cloudinary.com/dxm28ujz3/image/upload/v1787586458/products/uw4bex3wkjc62z6oywy6.jpg", // Agathi Seeds & Foliage
        "https://res.cloudinary.com/dxm28ujz3/image/upload/v1787586756/products/oh4yr3uuakn9vya5asg9.png", // Soundal Subabul Seeds
        "https://res.cloudinary.com/dxm28ujz3/image/upload/v1788265801/products/jkyma8rm9902h3qvgqyu.jpg", // Super Napier Field
        "https://res.cloudinary.com/dxm28ujz3/image/upload/v1787585203/products/j4pzwhm0gp5gjbrkdlqk.jpg", // Dwarf Napier Slips Bundle
        "https://res.cloudinary.com/dxm28ujz3/image/upload/v1788265801/products/oeknpd3zh3ivwvmdzqtf.jpg", // Super Napier Green Fodder
    ];

    return (
        <section className="w-full py-20 pb-10  px-4 relative overflow-hidden">


            <div className="relative z-20 max-w-[95%] mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-10">
                {/* Background Image */}
                <div className="absolute inset-0 bg-[url('/google-review-bg-3.png')] md:bg-contain lg:bg-cover bg-center bg-no-repeat md:block hidden"></div>
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
                            className="h-[90vh] rounded-full"
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
                    <div className="flex flex-col gap-6 justify-center me-auto rounded-full">
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
                            className="h-[70vh] rounded-full"
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
                        Super Napier is a premium hybrid fodder grass known for its exceptional nutritional value and high yield.
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
                        className="rounded-[40px]"
                    >
                        {[...leftCol1, ...leftCol2, ...rightCol1, ...rightCol2]
                            .concat([...leftCol1, ...leftCol2, ...rightCol1, ...rightCol2])
                            .map((img, i) => (
                                <SwiperSlide key={i} className="">
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
                            className="h-[70vh] rounded-full"
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
                            className="h-[90vh] rounded-full"
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