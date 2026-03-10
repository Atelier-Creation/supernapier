import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Slot machine rolling counter
const CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&!?";

const SlotCounter = ({ value, duration = 1200 }) => {
  const [display, setDisplay] = useState(value);
  const frameRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    startRef.current = null;

    const target = String(value);
    const totalMs = duration;
    const slowDownAt = 0.65; // fraction of duration where we start locking characters

    const scramble = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / totalMs, 1);

      const charsLocked = Math.floor(progress / (1 - slowDownAt) * target.length * 0.5);
      const lockedCount = progress >= slowDownAt
        ? Math.floor(((progress - slowDownAt) / (1 - slowDownAt)) * target.length)
        : 0;

      const scrambled = target
        .split("")
        .map((char, i) => {
          if (i < lockedCount) return char;
          // keep letters/symbols, scramble among similar type
          if (/[0-9]/.test(char)) return String(Math.floor(Math.random() * 10));
          if (/[a-zA-Z]/.test(char)) return CHARS[Math.floor(Math.random() * 26 + 10)];
          return char; // keep +, %, . fixed
        })
        .join("");

      setDisplay(scrambled);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(scramble);
      } else {
        setDisplay(target);
      }
    };

    frameRef.current = requestAnimationFrame(scramble);
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [value, duration]);

  return <span className="font-mono tracking-wide">{display}</span>;
};


const slides = [
  {
    id: 1,
    title:
      "We provide high-yield Super Napier grass varieties that support sustainable livestock farming.",
    desc: "With over a decade of agricultural expertise, we focus on producing premium Super Napier planting materials that help farmers achieve consistent and high-quality fodder production. Our varieties are carefully cultivated to grow faster, adapt to different soil conditions, and provide nutrient-rich feed for cattle, goats, and dairy farms. This ensures improved milk production, healthier livestock, and long-term farming sustainability.",
    year: "20+",
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
    year: "99.9%",
    label: "Seed Germination Success",
    img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399",
  },
  {
    id: 4,
    title: "Supplying Super Napier seeds across several countries.",
    desc: "Our premium Super Napier planting materials are not only trusted locally but also exported to multiple countries. Farmers and agricultural organizations worldwide rely on our products for their high productivity and adaptability.",
    year: "12+",
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

  const [direction, setDirection] = useState(1);

  const minSwipeDistance = 50;

  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
    setExpanded(false);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    setExpanded(false);
  };

  const slideVariants = {
    enter: { opacity: 0 },
    center: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1, duration: 0.3 }
    },
    exit: { opacity: 0, transition: { duration: 0.4 } },
  };

  const titleVariants = {
    enter: (dir) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
    exit: (dir) => ({ x: dir < 0 ? 40 : -40, opacity: 0 }),
  };

  const cardVariants = {
    enter: (dir) => ({ scale: 0.8, opacity: 0, y: 20 }),
    center: { scale: 1, opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: (dir) => ({ scale: 0.8, opacity: 0, y: 20 }),
  };

  const imgVariants = {
    enter: (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
    exit: (dir) => ({ x: dir < 0 ? 80 : -80, opacity: 0 }),
  };

  const textVariants = {
    enter: (dir) => ({ y: 30, opacity: 0 }),
    center: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
    exit: (dir) => ({ y: 30, opacity: 0 }),
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
    <section className="pt-10 pb-0 px-4 lg:py-24 overflow-hidden select-none relative">
      <img src="/palm-tree-shadow.avif" alt="Palm Shadow" className="absolute top-0 -right-64 h-full object-contain opacity-[0.5] pointer-events-none z-0" />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center md:items-start lg:mb-5 mb-5">
          <span className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tight">
            Who we are ?
          </span>
        </div>

        {/* Slider Container */}
        <div
          className="relative overflow-hidden min-h-[800px] md:min-h-[600px] lg:min-h-[500px]"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute w-full top-0 left-0"
            >
              <div className="min-w-full">
                {/* Title */}
                <motion.div variants={titleVariants} custom={direction} className="lg:max-w-[55%] w-full ms-auto mb-10">
                  <p className="text-3xl text-left md:text-4xl lg:text-4xl font-semibold text-gray-900">
                    {slides[current].title}
                  </p>
                </motion.div>

                <div className="flex lg:flex-row flex-col gap-12 items-center">
                  <div className="flex lg:flex-row flex-col gap-12 items-end w-full">
                    {/* Experience Card */}
                    <motion.div variants={cardVariants} custom={direction} className="lg:block hidden lg:w-1/4 min-w-1/4">
                      <div className="bg-[#fde047] hover:bg-[#facc15] text-black px-6 py-8 rounded-xl shadow-lg transition-colors">
                        <p className="text-base mb-3 font-medium">{slides[current].label}</p>
                        <span className="text-5xl font-black">
                          <SlotCounter key={current} value={slides[current].year} duration={1400} />
                        </span>
                      </div>
                    </motion.div>

                    {/* Image */}
                    <motion.div variants={imgVariants} custom={direction} className="w-full">
                      <div className="relative rounded-2xl overflow-hidden h-[40vh] md:h-[50vh] shadow-xl">
                        <div className='block lg:hidden absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10' />
                        <motion.img
                          initial={{ scale: 1.1 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.6 }}
                          src={slides[current].img}
                          alt=""
                          draggable="false"
                          className="w-full h-full object-cover"
                        />

                        {/* Mobile Card */}
                        <div className="lg:hidden absolute bottom-4 left-4 right-4 z-20">
                          <div className="bg-[#fde047] text-black p-6 rounded-xl md:w-1/2 shadow-lg backdrop-blur-md">
                            <p className="text-sm font-medium mb-1">{slides[current].label}</p>
                            <span className="text-3xl md:text-5xl font-black">
                              <SlotCounter key={current} value={slides[current].year} duration={1400} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Right Content */}
                  <motion.div variants={textVariants} custom={direction} className="lg:w-3/4 w-full space-y-6 md:space-y-8">
                    <div className="text-gray-700 text-base md:text-lg leading-relaxed">
                      <p className="hidden md:block">{slides[current].desc}</p>

                      <p className="md:hidden">
                        {expanded
                          ? slides[current].desc
                          : `${slides[current].desc.substring(0, 120)}...`}
                      </p>

                      <button
                        onClick={() => setExpanded(!expanded)}
                        className="md:hidden text-green-700 font-bold mt-2 hover:underline"
                      >
                        {expanded ? "Read Less" : "Read More"}
                      </button>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={prevSlide}
                        className="h-12 w-12 bg-gray-100 hover:bg-[#fde047] rounded-full flex justify-center items-center transition-all hover:scale-105 active:scale-95 shadow-sm"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>

                      <button
                        onClick={nextSlide}
                        className="h-12 w-12 bg-gray-100 hover:bg-[#fde047] rounded-full flex justify-center items-center transition-all hover:scale-105 active:scale-95 shadow-sm"
                      >
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default NewAboutSec;