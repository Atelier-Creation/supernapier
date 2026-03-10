import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    title:
      "We provide high-yield Super Napier grass varieties that support sustainable livestock farming.",
    desc: "With over a decade of agricultural expertise, we focus on producing premium Super Napier planting materials that help farmers achieve consistent and high-quality fodder production. Our varieties are carefully cultivated to grow faster, adapt to different soil conditions, and provide nutrient-rich feed for cattle, goats, and dairy farms. This ensures improved milk production, healthier livestock, and long-term farming sustainability.",
    year: "12+",
    label: "Years of Agricultural Experience",
    img: "https://images.unsplash.com/photo-1560493676-04071c5f467b",
  },
  {
    id: 2,
    title: "Trusted by thousands of farmers for premium fodder production.",
    desc: "Over the years, thousands of farmers have chosen our Super Napier grass for its reliability and high yield. Our customers range from small-scale dairy farmers to large commercial livestock farms. By providing high-quality planting materials and expert guidance, we help farmers maintain a continuous and abundant fodder supply throughout the year.",
    year: "25K+",
    label: "Farmers Trust Our Seeds",
    img: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9",
  },
  {
    id: 3,
    title: "Premium quality seeds with excellent germination rate.",
    desc: "Our Super Napier seeds and stems are carefully selected and tested to maintain up to a 98% germination success rate. This ensures faster field establishment, stronger plant growth, and significantly higher biomass yield.",
    year: "98%",
    label: "Seed Germination Success",
    img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399",
  },
  {
    id: 4,
    title: "Supplying Super Napier seeds across several countries.",
    desc: "Our premium Super Napier planting materials are not only trusted locally but also exported to multiple countries. Farmers and agricultural organizations worldwide rely on our products for their high productivity and adaptability.",
    year: "8+",
    label: "Countries Supplied",
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
  },
  {
    id: 5,
    title: "Leading innovation in fodder farming solutions.",
    desc: "We continuously research and implement modern cultivation techniques to improve fodder farming efficiency. Our team works closely with farmers to introduce improved planting methods and crop management practices.",
    year: "1st",
    label: "Innovators in Super Napier Farming",
    img: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854",
  },
];

const NewAboutSec = () => {
  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const [mouseStart, setMouseStart] = useState(null);
  const [mouseEnd, setMouseEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const minSwipeDistance = 50;

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
    setExpanded(false);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    setExpanded(false);
  };

  // MOBILE SWIPE
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;

    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) nextSlide();
      else prevSlide();
    }
  };

  // DESKTOP DRAG
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setMouseStart(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setMouseEnd(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    const distance = mouseStart - mouseEnd;

    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) nextSlide();
      else prevSlide();
    }

    setIsDragging(false);
    setMouseStart(null);
    setMouseEnd(null);
  };

  // AUTOPLAY
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-10 pb-0 px-4 lg:py-24 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start lg:mb-10 mb-5">
          <span className="uppercase tracking-widest text-base font-semibold">
            About Our Greneris Farm
          </span>
        </div>

        {/* Slider */}
        <div
          className="overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide) => (
              <div key={slide.id} className="min-w-full">
                {/* Title */}
                <div className="lg:max-w-[60%] w-full ms-auto mb-10">
                  <p className="text-3xl md:text-4xl lg:text-3xl text-gray-900">
                    {slide.title}
                  </p>
                </div>

                <div className="flex lg:flex-row flex-col gap-12 items-center">
                  <div className="flex lg:flex-row flex-col gap-12 items-end w-full">
                    {/* Experience Card */}
                    <div className="lg:block hidden lg:w-1/4">
                      <div className="bg-[#fde047] hover:bg-[#facc15] text-black p-8 rounded-xl">
                        <p className="text-base mb-3">{slide.label}</p>
                        <span className="text-5xl font-bold">{slide.year}</span>
                      </div>
                    </div>

                    {/* Image */}
                    <div className="w-full">
                      <div className="relative rounded-2xl overflow-hidden h-[40vh] md:h-[50vh]">
                        <div className='block lg:hidden absolute inset-0 bg-black/40 opacity-40' />
                        <img
                          src={slide.img}
                          alt=""
                          draggable="false"
                          className="w-full h-full object-cover"
                        />

                        {/* Mobile Card */}
                        <div className="lg:hidden absolute bottom-4 left-4 right-4">
                          <div className="bg-[#fde047] text-black p-6 rounded-xl md:w-1/2">
                            <p className="text-base mb-2">{slide.label}</p>
                            <span className="text-3xl md:text-5xl font-bold">
                              {slide.year}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Content */}
                  <div className="lg:w-3/4 w-full space-y-8">
                    <div className="text-gray-700 text-lg leading-relaxed">
                      <p className="hidden md:block">{slide.desc}</p>

                      <p className="md:hidden">
                        {expanded
                          ? slide.desc
                          : `${slide.desc.substring(0, 120)}...`}
                      </p>

                      <button
                        onClick={() => setExpanded(!expanded)}
                        className="md:hidden text-green-700 font-semibold mt-2"
                      >
                        {expanded ? "Read Less" : "Read More"}
                      </button>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={prevSlide}
                        className="h-10 w-10 bg-[#fde047] hover:bg-[#facc15] rounded-full flex justify-center items-center"
                      >
                        <ArrowLeft />
                      </button>

                      <button
                        onClick={nextSlide}
                        className="h-10 w-10 bg-[#fde047] hover:bg-[#facc15] rounded-full flex justify-center items-center"
                      >
                        <ArrowRight />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewAboutSec;