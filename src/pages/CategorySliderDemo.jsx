import React from 'react';
import CategoryInfiniteSlider from '../components/CategoryInfiniteSlider';

const SLIDES_DATA = [
  {
    id: 1,
    title: "Our Expertise",
    desc: "With over a decade of agricultural expertise, we focus on producing premium Super Napier planting materials that help farmers achieve consistent and high-quality fodder production.",
    img: "https://img.freepik.com/premium-photo/close-up-abstract-green-leaf-texture-nature-background-tropical-leaves_512343-1989.jpg",
    tag: "20+ Years"
  },
  {
    id: 2,
    title: "Farmer Network",
    desc: "Over the years, thousands of farmers have chosen our Super Napier grass for its reliability and high yield. Our customers range from small-scale dairy farmers to large commercial farms.",
    img: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=1200",
    tag: "25K+ Trust"
  },
  {
    id: 3,
    title: "Seed Quality",
    desc: "Our Super Napier seeds and stems are carefully selected and tested to maintain up to a 98% germination success rate. This ensures faster field establishment and stronger plant growth.",
    img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200",
    tag: "99.9% Success"
  },
  {
    id: 4,
    title: "Global Reach",
    desc: "Our premium Super Napier planting materials are not only trusted locally but also exported to multiple countries. Farmers worldwide rely on our products.",
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200",
    tag: "12+ Countries"
  },
  {
    id: 5,
    title: "Innovation",
    desc: "We continuously research and implement modern cultivation techniques to improve fodder farming efficiency. Our team works closely with farmers to introduce improved methods.",
    img: "https://bharatwoodpellet.com/wp-content/uploads/2025/04/ChatGPT-Image-Apr-20-2025-03_07_50-PM1024x460.webp",
    tag: "#1 Innovator"
  }
];

const CategorySliderDemo = () => {
    return (
        <section className="bg-[#FAFCF8] flex flex-col items-center relative overflow-hidden">
          <img src="/palm-tree-shadow.avif" alt="Palm Shadow" className="absolute top-0 -right-64 h-full object-contain opacity-60 pointer-events-none z-0" />
            {/* Header */}
            <div className="pt-10 text-center px-4">
                <span className="text-sm font-black text-green-600 uppercase tracking-[0.3em] mb-4 block">Our Impact</span>
                <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">
                    Beyond Just <span className="text-green-700">Farming</span>
                </h2>
            </div>
            
            {/* The Infinite Slider */}
            <div className="w-full">
                <CategoryInfiniteSlider categories={SLIDES_DATA} interval={4500} />
            </div>
        </section>
    );
};

export default CategorySliderDemo;
