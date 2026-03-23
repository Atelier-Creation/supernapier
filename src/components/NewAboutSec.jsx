import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SemiPieSlider from "./SemiPieSlider";

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
    const slowDownAt = 0.65;

    const scramble = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / totalMs, 1);

      const lockedCount = progress >= slowDownAt
        ? Math.floor(((progress - slowDownAt) / (1 - slowDownAt)) * target.length)
        : 0;

      const scrambled = target
        .split("")
        .map((char, i) => {
          if (i < lockedCount) return char;
          if (/[0-9]/.test(char)) return String(Math.floor(Math.random() * 10));
          if (/[a-zA-Z]/.test(char)) return CHARS[Math.floor(Math.random() * 26 + 10)];
          return char;
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
    title: "We provide high-yield Super Napier grass varieties for cattle farming.",
    desc: "With over a decade of agricultural expertise, we focus on producing premium Super Napier planting materials that help farmers achieve consistent and high-quality fodder production. Our varieties are carefully cultivated to grow faster, adapt to different soil conditions, and provide nutrient-rich feed for cattle, goats.",
    year: "20+",
    label: "Years of Agricultural Experience",
    img: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80",
    pieTitle: "Our Expertise",
    pieSubtitle: "20+ Years of farming",
  },
  {
    id: 2,
    title: "Trusted by thousands of farmers for premium fodder production.",
    desc: "Over the years, thousands of farmers have chosen our Super Napier grass for its reliability and high yield. Our customers range from small-scale dairy farmers to large commercial livestock farms. By providing high-quality planting materials and expert guidance, we help farmers maintain a continuous and abundant fodder supply throughout the year.",
    year: "25K+",
    label: "Farmers Trust Our Seeds",
    img: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&q=80",
    pieTitle: "Farmer Network",
    pieSubtitle: "25K+ happy farmers",
  },
  {
    id: 3,
    title: "Premium quality seeds with excellent germination rate.",
    desc: "Our Super Napier seeds and stems are carefully selected and tested to maintain up to a 98% germination success rate. This ensures faster field establishment, stronger plant growth, and significantly higher biomass yield.",
    year: "99.9%",
    label: "Seed Germination Success",
    img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80",
    pieTitle: "Seed Quality",
    pieSubtitle: "99.9% germination",
  },
  {
    id: 4,
    title: "Supplying Super Napier seeds across several countries.",
    desc: "Our premium Super Napier planting materials are not only trusted locally but also exported to multiple countries. Farmers and agricultural organizations worldwide rely on our products for their high productivity and adaptability.",
    year: "12+",
    label: "Countries Supplied",
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    pieTitle: "Global Reach",
    pieSubtitle: "12+ countries",
  },
  {
    id: 5,
    title: "Leading innovation in fodder farming solutions.",
    desc: "We continuously research and implement modern cultivation techniques to improve fodder farming efficiency. Our team works closely with farmers to introduce improved planting methods and crop management practices.",
    year: "1st",
    label: "Innovators in Super Napier Farming",
    img: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80",
    pieTitle: "Innovation",
    pieSubtitle: "#1 in Super Napier",
  },
  {
    id: 6,
    title: "Leading innovation in fodder farming solutions.",
    desc: "We continuously research and implement modern cultivation techniques to improve fodder farming efficiency. Our team works closely with farmers to introduce improved planting methods and crop management practices.",
    year: "1st",
    label: "Innovators in Super Napier Farming",
    img: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80",
    pieTitle: "Innovation",
    pieSubtitle: "#1 in Super Napier",
  },
  {
    id: 7,
    title: "Leading innovation in fodder farming solutions.",
    desc: "We continuously research and implement modern cultivation techniques to improve fodder farming efficiency. Our team works closely with farmers to introduce improved planting methods and crop management practices.",
    year: "1st",
    label: "Innovators in Super Napier Farming",
    img: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80",
    pieTitle: "Innovation",
    pieSubtitle: "#1 in Super Napier",
  },
];

// Map slides to SemiPieSlider segment format
const pieSegments = slides.map((s) => ({
  id: String(s.id),
  image: s.img,
  title: s.pieTitle,
  subtitle: s.pieSubtitle,
}));

const NewAboutSec = () => {
  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [mouseStart, setMouseStart] = useState(null);
  const [mouseEnd, setMouseEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
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

  // When SemiPieSlider segment is clicked, sync the about section
  const handlePieSegmentChange = (idx) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
    setExpanded(false);
  };

  const slideVariants = {
    enter: { opacity: 0 },
    center: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1, duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.4 } },
  };

  const titleVariants = {
    enter: (dir) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
    exit: (dir) => ({ x: dir < 0 ? 40 : -40, opacity: 0 }),
  };

  const cardVariants = {
    enter: () => ({ scale: 0.8, opacity: 0, y: 20 }),
    center: { scale: 1, opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: () => ({ scale: 0.8, opacity: 0, y: 20 }),
  };

  const textVariants = {
    enter: () => ({ y: 30, opacity: 0 }),
    center: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
    exit: () => ({ y: 30, opacity: 0 }),
  };

  // Touch swipe
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) nextSlide();
      else prevSlide();
    }
  };

  // Desktop drag
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setHasDragged(false);
    setMouseStart(e.clientX);
    setMouseEnd(e.clientX);
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    if (Math.abs(e.clientX - mouseStart) > 8) setHasDragged(true);
    setMouseEnd(e.clientX);
  };
  const handleMouseUp = () => {
    if (!isDragging) return;
    if (hasDragged) {
      const distance = mouseStart - mouseEnd;
      if (Math.abs(distance) > minSwipeDistance) {
        if (distance > 0) nextSlide();
        else prevSlide();
      }
    }
    setIsDragging(false);
    setHasDragged(false);
    setMouseStart(null);
    setMouseEnd(null);
  };

  // Autoplay
  useEffect(() => {
    const interval = setInterval(nextSlide, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-10 pb-0 px-4 lg:py-24 overflow-hidden select-none relative">
      <img
        src="/palm-tree-shadow.avif"
        alt="Palm Shadow"
        className="absolute top-0 -right-64 h-full object-contain opacity-[0.5] pointer-events-none z-0"
      />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center md:items-start lg:mb-5 mb-5">
          <span className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tight">
            Who we are ?
          </span>
        </div>

        {/* Main two-column layout: SemiPie left | Slider content right */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">

          {/* ── Left: SemiPieSlider (synced with current slide) ─────────── */}
          <div className="w-full lg:w-[50%] shrink-0">
            <SemiPieSlider
              segments={pieSegments}
              activeIdx={current}
              onSegmentChange={handlePieSegmentChange}
              autoPlayInterval={30000} /* long interval — nav buttons drive it */
              // centerLabel="Super Napier"
              // centerLogo ='/logo.png'
            />
          </div>

          {/* ── Right: Slider text content ───────────────────────────────── */}
          <div
            className="relative overflow-hidden w-full min-h-[450px]"
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
                {/* Slide title */}
                <motion.div variants={titleVariants} custom={direction} className="mb-6">
                  <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 leading-snug">
                    {slides[current].title}
                  </p>
                </motion.div>

                {/* Stat card */}
                <motion.div variants={cardVariants} custom={direction} className="mb-6">
                  <div className="bg-[#fde047] hover:bg-[#facc15] text-black px-6 py-5 rounded-xl shadow-md inline-block transition-colors">
                    <p className="text-sm mb-1 font-medium">{slides[current].label}</p>
                    <span className="text-4xl font-black">
                      <SlotCounter key={current} value={slides[current].year} duration={1400} />
                    </span>
                  </div>
                </motion.div>

                {/* Description */}
                <motion.div variants={textVariants} custom={direction} className="space-y-4">
                  <div className="text-gray-700 text-base md:text-md leading-relaxed">
                    <p className="hidden md:block line-clamp-4 overflow-hidden">{slides[current].desc}</p>
                    <p className="md:hidden">
                      {expanded
                        ? slides[current].desc
                        : `${slides[current].desc.substring(0, 120)}...`}
                    </p>
                    <button
                      onClick={() => setExpanded(!expanded)}
                      onTouchStart={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                      className="md:hidden text-green-700 font-bold mt-2 hover:underline"
                    >
                      {expanded ? "Read Less" : "Read More"}
                    </button>
                  </div>

                  {/* Prev / Next buttons */}
                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={prevSlide}
                      onMouseDown={(e) => e.stopPropagation()}
                      onTouchStart={(e) => e.stopPropagation()}
                      className="h-12 w-12 bg-gray-100 hover:bg-[#fde047] rounded-full flex justify-center items-center transition-all hover:scale-105 active:scale-95 shadow-sm"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextSlide}
                      onMouseDown={(e) => e.stopPropagation()}
                      onTouchStart={(e) => e.stopPropagation()}
                      className="h-12 w-12 bg-gray-100 hover:bg-[#fde047] rounded-full flex justify-center items-center transition-all hover:scale-105 active:scale-95 shadow-sm"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </button>

                    {/* Slide dots */}
                    <div className="flex items-center gap-2 ml-2">
                      {slides.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => handlePieSegmentChange(i)}
                          onMouseDown={(e) => e.stopPropagation()}
                          className={`rounded-full transition-all duration-300 ${
                            i === current
                              ? 'w-6 h-2.5 bg-green-700'
                              : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewAboutSec;