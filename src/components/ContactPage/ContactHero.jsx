import React from 'react';

const ContactHero = () => {
  return (
    <section className="bg-[#f3f0e9] pb-10 pt-40 px-4 flex flex-col items-center justify-center font-sans">
      <div className="container mx-auto text-center">
        {/* Badge / Subtitle Area */}
        <div className="flex items-center justify-center mb-6">
          {/* Golf Ball Icon Wrapper */}
          <div className="w-10 h-10  rounded-full flex items-center justify-center bg-white shadow-sm">
            <img
              src="https://cdn.prod.website-files.com/68d220dde5048cac1d8229a6/6911b3767fad8b2d6afff46e_golf.svg"
              alt="golf"
              className="w-5 h-5"
            />
          </div>

          {/* Pill Badge */}
          <div className="bg-white px-6 py-2 rounded-full border border-gray-100 shadow-sm">
            <span className="text-[#0B2C1F] text-xs font-bold tracking-widest uppercase">
              Get In Touch
            </span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="break-all text-5xl md:text-7xl font-semibold text-[#0B2C1F] tracking-tight leading-tight md:leading-tight py-2">
          Contact us
        </h1>
      </div>
    </section>
  );
};

export default ContactHero;