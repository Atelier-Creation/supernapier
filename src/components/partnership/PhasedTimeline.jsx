import React from 'react';

const steps = [
  {
    phase: "Phase 01",
    title: "On-Site Assessment",
    duration: "Week 1-2",
    details: "Soil testing, water source verification, and land preparation blueprints."
  },
  {
    phase: "Phase 02",
    title: "Pilot Block Setup",
    duration: "Week 3-6",
    details: "Initial 100-acre planting to calibrate growth parameters and local adaptation."
  },
  {
    phase: "Phase 03",
    title: "Mass Scale Deployment",
    duration: "Month 2-6",
    details: "Synchronized delivery of slips for the remaining 4,900 acres in manageable blocks."
  },
  {
    phase: "Phase 04",
    title: "Industrial Harvest",
    duration: "Month 6+",
    details: "First full-scale harvest and transition to a 45-day regrowth cycle."
  }
];

const PhasedTimeline = () => {
  return (
    <section className="py-16 md:py-24 bg-deep-forest text-slate-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-20" data-aos="fade-up">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Execution Roadmap</h2>
          <p className="text-lg md:text-xl text-slate-white/60 max-w-2xl mx-auto">
            Strategic coordination for 5,000-acre biomass infrastructure.
          </p>
        </div>

        <div className="relative border-l-2 md:border-l-0 md:border-t-4 border-earthy-gold/30 ml-4 md:ml-0 md:flex md:pt-12 gap-6 md:gap-8">
          {steps.map((step, i) => (
            <div key={i} className="mb-10 md:mb-0 relative md:flex-1" data-aos="fade-up" data-aos-delay={i * 150}>
              <div className="absolute -left-[19px] md:-left-0 top-0 md:-top-[60px] w-8 h-8 md:w-10 md:h-10 bg-earthy-gold rounded-full flex items-center justify-center text-deep-forest font-black border-4 border-deep-forest z-10 text-sm md:text-base">
                {i + 1}
              </div>
              <div className="bg-slate-white/5 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-slate-white/10 hover:bg-slate-white/10 transition-all group h-full">
                <span className="text-earthy-gold font-black tracking-widest text-[10px] md:text-sm uppercase mb-1 md:mb-2 block">{step.phase}</span>
                <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2 group-hover:text-earthy-gold transition-colors">{step.title}</h3>
                <span className="text-slate-white/40 text-xs md:text-sm font-medium mb-3 md:mb-4 block">{step.duration}</span>
                <p className="text-sm md:text-base text-slate-white/70 leading-relaxed">
                  {step.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhasedTimeline;
