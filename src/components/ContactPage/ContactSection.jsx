import React from "react";
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react";

const ContactSection = () => {

  const contactMethods = [
    {
      title: "Mail us 24/7",
      icon: Mail,
      content: (
        <>
          contact@example.com <br />
          support@example.com
        </>
      ),
    },
    {
      title: "Our location",
      icon: MapPin,
      content: (
        <>
          85 Preston, Inglewood, maine <br />
          98380, Hoofddorp Noord-2132
        </>
      ),
    },
    {
      title: "Call us 24/7",
      icon: Phone,
      content: (
        <>
          Phone: +1-234-567-89 <br />
          Mobile: (+01)-234-567-89
        </>
      ),
    },
  ];

  return (
    <section
      className="
      relative
      md:h-[700px]
      h-full
      xl:h-[700px]
      bg-[#f3f0e9]
      bg-[url('https://cdn.prod.website-files.com/68baae3cb9467566e1b0a61c/698deb2f6d550496da24ae25_hero_2_1%202-p-2000.webp')]
      bg-center
      bg-no-repeat
      bg-cover
    "
    >

      {/* Gradient Overlay */}
      <div className="absolute -top-[50px] w-full h-[400px] bg-[linear-gradient(0deg,#f3f0e900,#f3f0e9_80.77%)] z-10" />

      {/* Cards */}
      <div className="relative z-20 mx-auto lg:px-15 px-6 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {contactMethods.map((method, index) => {

            const Icon = method.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 flex flex-col transition-transform hover:-translate-y-1 duration-300 group"
              >
                <div className="flex items-center gap-4 mb-6">

                  <div className="bg-[#F3F0E9] group-hover:bg-[#FDF567] lg:p-5 p-3 rounded-xl">
                    <Icon className="lg:h-10 lg:w-10 h-8 w-8 text-gray-900 transition-transform duration-500 group-hover:rotate-y-[360deg]" />
                  </div>

                  <h3 className="lg:text-2xl font-medium text-gray-900">
                    {method.title}
                  </h3>
                </div>

                <div className="w-full h-px bg-gray-100 mb-6"></div>

                <div className="flex justify-between items-end mt-auto">
                  <p className="text-gray-500 lg:text-lg leading-relaxed">
                    {method.content}
                  </p>

                  <ArrowRight className="w-5 h-5 text-gray-900 cursor-pointer hover:translate-x-1 transition-transform" />
                </div>

              </div>
            );
          })}

        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-[-65px] w-full h-[510px] bg-[linear-gradient(180deg,#27361500,#273615_80.77%)]"></div>

    </section>
  );
};

export default ContactSection;