import React from 'react';

const ComparisonTable = () => {
  const data = [
    { feature: "Cost Effectiveness", slips: "High", tissue: "Low", seeds: "Medium" },
    { feature: "Scalability", slips: "Excellent", tissue: "Moderate", seeds: "Low" },
    { feature: "Maturity Speed", slips: "Fast", tissue: "Slow", seeds: "Very Slow" },
    { feature: "Genetic Stability", slips: "100%", tissue: "99%", seeds: "Variable" },
    { feature: "Survival Rate", slips: "98%+", tissue: "90%", seeds: "60-70%" },
  ];

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-5xl font-bold text-deep-forest mb-4">The Data-Driven Choice</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Why "Slips" are the industrial standard for 5,000-acre scalability.
          </p>
        </div>

        <div className="overflow-x-auto shadow-2xl rounded-2xl md:rounded-3xl border border-gray-100" data-aos="zoom-in">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-deep-forest text-slate-white">
                <th className="p-4 md:p-8 text-base md:text-xl font-bold">Parameters</th>
                <th className="p-4 md:p-8 text-base md:text-xl font-bold bg-earthy-gold text-deep-forest relative">
                  Slips (Our Choice)
                  <div className="absolute top-2 right-2 md:top-5 md:right-5 p-1 bg-white text-[8px] md:text-[10px] uppercase font-black tracking-tighter transform translate-x-1 -translate-y-1 md:translate-x-2 md:-translate-y-2 rounded-md shadow-lg text-earthy-gold">
                    Recommended
                  </div>
                </th>
                <th className="p-4 md:p-8 text-base md:text-xl font-bold opacity-70">Tissue Culture</th>
                <th className="p-4 md:p-8 text-base md:text-xl font-bold opacity-70">Seeds</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((row, i) => (
                <tr key={i} className="hover:bg-slate-white/50 transition-colors">
                  <td className="p-4 md:p-8 font-bold text-deep-forest/80 bg-slate-white/30 text-sm md:text-base">{row.feature}</td>
                  <td className="p-4 md:p-8 font-black text-deep-forest bg-earthy-gold/10 text-sm md:text-base">{row.slips}</td>
                  <td className="p-4 md:p-8 text-gray-500 text-sm md:text-base">{row.tissue}</td>
                  <td className="p-4 md:p-8 text-gray-500 text-sm md:text-base">{row.seeds}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-8 md:mt-12 p-6 md:p-8 bg-earthy-gold/5 rounded-2xl md:rounded-3xl border border-earthy-gold/20 flex flex-col lg:flex-row items-center justify-between gap-6">
          <p className="text-base md:text-lg text-deep-forest font-medium text-center lg:text-left">
            * Data based on multi-location trials for industrial biomass production.
          </p>
          <button className="w-full lg:w-auto bg-deep-forest text-white px-8 py-3 rounded-full font-bold hover:bg-black transition-all">
            Get Detailed Report
          </button>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
