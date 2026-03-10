import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const stats = [
  {
    id: 1,
    title: "Needs Only 100 Liters of Water",
    description:
      "Super Napier grass requires minimal water, making it ideal for regions facing water scarcity while still maintaining high growth and yield.",
    image:
      "https://cdn.prod.website-files.com/68e35e4541f10182d22f5275/68f1d30095da99df5b4baa66_fact-01.avif",
  },
  {
    id: 2,
    title: "High Biomass Production",
    description:
      "Produces abundant green fodder in a short period, improving livestock nutrition and reducing feed costs significantly.",
    image:
      "https://cdn.prod.website-files.com/68e35e4541f10182d22f5275/68f1d3002346c9ff0c4b3155_fact-02.avif",
  },
  {
    id: 3,
    title: "Resistant to Pests and Diseases",
    description:
      "Trusted by farmers for its resilience against common pests and diseases, ensuring consistent growth and reduced maintenance effort.",
    image:
      "https://cdn.prod.website-files.com/68e35e4541f10182d22f5275/68f1d300953f066ed05c8612_fact-03.avif",
  },
];

const StatisticalHighlights = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const blocksRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const center = window.innerHeight / 2;
      let closestIndex = 0;
      let minDistance = Infinity;

      blocksRef.current.forEach((block, idx) => {
        if (block) {
          const rect = block.getBoundingClientRect();
          const blockCenter = rect.top + rect.height / 2;
          const distance = Math.abs(center - blockCenter);

          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = idx;
          }
        }
      });

      setActiveIndex(closestIndex);
    };

    handleScroll(); // initial check
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative bg-[#1a332a] text-white py-10 lg:py-20 mb-10">
      {/* Title */}
      <div className="text-center mb-10">
        <p className="text-yellow-400 tracking-widest mb-4">
          [ Benefits ]
        </p>
        <h2 className="text-4xl font-bold">Measuring Growth and Progress</h2>
      </div>

      {/* Sticky Image */}
      <div className="sticky top-20 z-10 hidden lg:flex justify-center mb-20">
        <div className="relative aspect-[4/3] w-[35%] overflow-hidden shadow-2xl">
          {stats.map((stat, idx) => (
            <motion.img
              key={stat.id}
              src={stat.image}
              className="absolute inset-0 w-full h-full object-cover rounded-2xl"
              animate={{ opacity: activeIndex === idx ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />
          ))}
        </div>
      </div>

      {/* Blocks */}
      <div className="lg:block hidden mx-auto space-y-40 px-6 -mt-60 pb-40">
        {stats.map((stat, idx) => (
          <div
            key={stat.id}
            ref={(el) => (blocksRef.current[idx] = el)}
            className="flex justify-between gap-16 items-start"
          >
            {/* LEFT STICKY NUMBER */}
            <div className="md:sticky md:top-40 h-fit w-1/4">
              <h3 className="text-8xl lg:text-5xl">{stat.title}</h3>
            </div>

            {/* RIGHT TEXT */}
            <div className="w-1/4">
              <div className="w-12 h-[1px] bg-white mb-6 opacity-40" />
              <p className="text-lg md:text-xl font-light leading-relaxed">
                {stat.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="lg:hidden flex flex-col gap-5">
        {stats.map((stat, idx) => (
          <div className="lg:hidden flex flex-col items-start px-3">
            <img
              src={stat.image}
              alt={`Stat ${stat.id}`}
              className="w-full mb-4 object-cover rounded-lg shadow-lg"
            />
            <h3 className="text-3xl font-bold mb-2">{stat.title}</h3>
            <p className="text-start text-lg font-light leading-relaxed">
              {stat.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatisticalHighlights;