import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

export default function ContactSlider() {
  const logos = [
    "https://cdn.prod.website-files.com/68d220dde5048cac1d8229a6/6912da7cf33b310cff40e170_client-logo-01.png",
    "https://cdn.prod.website-files.com/68d220dde5048cac1d8229a6/6912da7ecdaa455ea0376b68_client-logo-02.png",
    "https://cdn.prod.website-files.com/68d220dde5048cac1d8229a6/6912da7eef4160cd7407780b_client-logo-03.png",
    "https://cdn.prod.website-files.com/68d220dde5048cac1d8229a6/6912da7e849b99086abc0cea_client-logo-04.png",
    "https://cdn.prod.website-files.com/68d220dde5048cac1d8229a6/6912da7e2f41373f8effde64_client-logo-05.png",
    "https://cdn.prod.website-files.com/68d220dde5048cac1d8229a6/6912da7f2bc3974c79a0a1b3_client-logo-06.png",
    "https://cdn.prod.website-files.com/68d220dde5048cac1d8229a6/6912da7f28812d31c06ac102_client-logo-07.png",
    "https://cdn.prod.website-files.com/68d220dde5048cac1d8229a6/6912dee38582a2593ae80fc1_client-logo-08.png",
  ];

  return (
    <section className="w-full py-16">
      <div className="mx-auto px-6">

        <Swiper
          modules={[Autoplay]}
          spaceBetween={40}
          loop={true}
          autoplay={{
            delay: 500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
        >
          {logos.map((logo, index) => (
            <SwiperSlide key={index}>
              <div className="flex justify-center items-center">
                <img
                  src={logo}
                  alt={`logo-${index}`}
                  className="h-12 object-contain opacity-80 hover:opacity-100 transition"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}