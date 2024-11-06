"use client";

import React from "react";
import { Autoplay, Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

const BannerSwipper = () => {
  return (
    <>
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        pagination={{
          clickable: true,
          type: "bullets",
          renderBullet: (index, className) => {
            return `<span class="${className} custom-rectangle-bullet"></span>`;
          },
        }}
        autoplay={{
          delay: 3000, // 3 seconds delay
          disableOnInteraction: false, // Autoplay continues even after user interaction
        }}
        loop={true}
        className="relative w-full h-full z-10 rounded-xl banner-swiper-container"
      >
        {/* Slide 1 */}
        <SwiperSlide className="flex items-center justify-center">
          <Image
            src="/templateg.png"
            alt="template"
            fill
            className="object-cover"
          />
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide className="flex items-center justify-center">
          <Image
            src="/templateg.png"
            alt="template"
            fill
            className="object-cover"
          />
        </SwiperSlide>
      </Swiper>
      <style jsx global>{`
        .banner-swiper-container .swiper-pagination {
          inset-block-end: 1px; /* Adjust this value to control the vertical position */
        }
        .custom-rectangle-bullet {
          inline-size: 15px;
          block-size: 6px;
          background-color: rgb(254, 226, 178);
          opacity: 0.5;
          margin: 0 1px;
          border-radius: 1px; /* Adds a slight rounding */
          transition: opacity 0.3s;
        }

        /* Ensures active bullet is fully opaque */
        .swiper-pagination-bullet-active.custom-rectangle-bullet {
          opacity: 1;
        }
      `}</style>
    </>
  );
};

export default BannerSwipper;
