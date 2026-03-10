import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sprout } from "lucide-react";

const stats = [
  {
    id: 1,
    title: "Needs Only 100 Liters of Water",
    description:
      "Super Napier grass requires minimal water, making it ideal for regions facing water scarcity while still maintaining high growth and yield.",
    image:
      "https://images.pexels.com/photos/34935520/pexels-photo-34935520.jpeg",
  },
  {
    id: 2,
    title: "High Biomass Production",
    description:
      "Produces abundant green fodder in a short period, improving livestock nutrition and reducing feed costs significantly.",
    image:
      "https://images.pexels.com/photos/254178/pexels-photo-254178.jpeg",
  },
  {
    id: 3,
    title: "Resistant to Pests and Diseases",
    description:
      "Trusted by farmers for its resilience against common pests and diseases, ensuring consistent growth and reduced maintenance effort.",
    image:
      "https://images.pexels.com/photos/30742545/pexels-photo-30742545.jpeg?w=800&q=80",
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
    <section className="relative py-5 lg:pt-0 mb-10 px-4">
      {/* Title */}
      <div className="text-center mb-10">
        <p className="text-yellow-400  mb-4 flex justify-center gap-1 text-lg uppercase items-center">
          <span className=" rounded-full text-[#25d366]"><Sprout /></span>
          <span> Benificial</span>
        </p>
        <h2 className="text-4xl font-bold">Measuring Growth and Progress</h2>
      </div>

      {/* Sticky Image */}
      <div className="sticky top-20 z-10 hidden lg:flex justify-center mb-20">
        <div className="relative aspect-[4/3] w-[35%] overflow-hidden ">
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
              <h3 className="text-8xl lg:text-5xl text-[#1B5E20]">{stat.title}</h3>
            </div>

            {/* RIGHT TEXT */}
            <div className="w-1/4">
              <div className="w-full h-[1px] bg-[#1B5E20] mb-6 opacity-40" />
              <p className="text-lg md:text-xl font-light leading-relaxed">
                {stat.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="lg:hidden flex flex-col gap-5">
        {stats.map((stat, idx) => (
          <div className="lg:hidden flex flex-col items-start">
            <img
              src={stat.image}
              alt={`Stat ${stat.id}`}
              className="w-full mb-4 object-cover rounded-lg shadow-lg"
            />
            <h3 className="text-3xl text-[#1B5E20] font-bold mb-2">{stat.title}</h3>
            <p className="text-start text-lg font-light leading-relaxed">
              {stat.description}
            </p>
            <div className="w-full h-[1px] bg-[#1B5E20] my-4 opacity-40" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatisticalHighlights;