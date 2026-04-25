import React from 'react';

const ProductApplications = ({ imageSrc }) => {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="order-2 lg:order-1" data-aos="fade-right">
            <div className="relative group">
              <div className="absolute -inset-4 bg-earthy-gold/20 rounded-[2rem] md:rounded-[3rem] blur-2xl group-hover:bg-earthy-gold/30 transition-all"></div>
              <img 
                src={imageSrc} 
                alt="Industrial Biomass Context" 
                className="relative rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 bg-white/90 backdrop-blur p-4 md:p-6 rounded-xl md:rounded-2xl shadow-xl max-w-[200px] md:max-w-xs">
                <div className="text-earthy-gold font-black text-2xl md:text-3xl mb-1">95%</div>
                <div className="text-deep-forest font-bold text-[10px] md:text-sm uppercase tracking-wider">Conversion Efficiency in Bio-Pulping</div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2" data-aos="fade-left">
            <h2 className="text-3xl md:text-5xl font-bold text-deep-forest mb-6 md:mb-8 text-center lg:text-left">Industrial Applications</h2>
            
            <div className="space-y-8 md:space-y-12">
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 text-center sm:text-left items-center sm:items-start">
                <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-deep-forest rounded-xl md:rounded-2xl flex items-center justify-center text-earthy-gold font-black text-xl md:text-2xl shadow-lg">01</div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-deep-forest mb-2 md:mb-3">Biofuel Generation</h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    With a high calorific value and low ash content, our Super Napier is the ideal feedstock for second-generation ethanol production and biomass power plants.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 text-center sm:text-left items-center sm:items-start">
                <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-deep-forest rounded-xl md:rounded-2xl flex items-center justify-center text-earthy-gold font-black text-xl md:text-2xl shadow-lg">02</div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-deep-forest mb-2 md:mb-3">Pulp & Paper (Kraft)</h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    The optimal fiber length and cellulose-to-lignin ratio make our cultivar a superior alternative for Kraft paper production, reducing chemical consumption in pulping.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductApplications;
