"use client";
import React from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
// import Header from "../components/Header";
// import Tabs from "../components/Tabs";
// import ArticlePreview from "../components/ArticlePreview";

const NewsAppHome = () => {
  return (
    <div className="min-h-screen bg-[rgb(246,248,250)] text-black pt-4 pb-4">
      <div className="flex flex-col gap-3 w-full pl-4 pr-4">
        <div className="flex justify-between items-center w-full mb-5">
          <div className="flex justify-start items-center flex-col font-serif">
            Bulletin News
          </div>
          <div className="h-12 w-12  rounded-full bg-[rgb(225,226,226)] p-1">
            <div className="w-full h-full rounded-full relative">
              <Image
                src="/1379x910.webp"
                alt="templatetred"
                fill
                className="object-cover rounded-full"
              />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="text-sm text-gray-500"> Saturday, August 22nd</div>
          <div className="text-2xl font-semibold mt-1 w-[55%]">
            Welcome back, Habeeb
          </div>
        </div>
      </div>

      <div defaultValue="feeds" className="mb-8 pl-4 pr-4">
        <div className="w-full p-2 bg-[#e1e2e2] grid grid-cols-3 gap-2 rounded-full">
          <div className="rounded-full flex justify-center items-center p-2 bg-[rgb(246,248,250)]">
            Feeds
          </div>
          <div className="rounded-full flex justify-center items-center p-2">
            Popular
          </div>
          <div className="rounded-full flex justify-center items-center p-2">
            Following
          </div>
        </div>
      </div>

      <div className="h-[15rem] w-full bg-transparent pl-4">
        <Swiper
          slidesPerView={1.1}
          spaceBetween={10}
          modules={[Pagination, Autoplay]}
          autoplay={{
            delay: 3000, // 3 seconds delay
            disableOnInteraction: false, // Autoplay continues even after user interaction
          }}
          loop={true}
          pagination={{
            clickable: true,
            type: "bullets",
            renderBullet: (index, className) => {
              return `<span class="${className} newspage-custom-rectangle-bullet"></span>`;
            },
          }}
          className="news-banner-Swiper h-full rounded-tl-2xl rounded-bl-2xl"
        >
          {[1, 2, 3].map((index) => (
            <SwiperSlide
              className="bg-[rgb(225,226,226)] rounded-2xl"
              key={index}
            >
              <Image
                src="/1379x910.webp"
                alt="template"
                fill
                className="object-cover rounded-2xl"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="pl-4 pr-4 mt-6">
        <div className="flex justify-start items-center ">
          <div> Just For You</div>
        </div>
        <div className="flex flex-col gap-6 items-center justify-center py-3">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div
              className=" w-full flex justify-between items-center h-[6.5rem]"
              key={index}
            >
              <div className="flex flex-col items-start justify-between w-[60%] h-full">
                <div className="">
                  <span className="text-xs font-medium text-gray-600 bg-gray-200 px-2 py-1 rounded-full">
                    Hot
                  </span>
                </div>
                <span className="text-sm font-semibold text-gray-800 line-clamp-2">
                  Elon Musk on How to learn and adapt more Faster Elon Musk on
                  How to learn and adapt more Faster
                </span>
                <div className="text-[0.6rem] text-gray-500 flex justify-between items-center w-full">
                  <span className="text-xs">Entertainment</span>
                  <span>12 Mins</span>
                  <span>12H Ago</span>
                </div>
              </div>
              <div className="w-[30%] rounded-xl h-full overflow-hidden relative">
                <Image
                  src="/1379x910.webp"
                  alt="templatetred"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .news-banner-Swiper .swiper-pagination {
          inset-block-end: 1px; /* Adjust this value to control the vertical position */
        }
        .newspage-custom-rectangle-bullet {
          inline-size: 20px;
          block-size: 6px;
          background-color: rgb(225, 226, 226);
          opacity: 0.3;
          margin: 0 1px;
          border-radius: 1px; /* Adds a slight rounding */
          transition: opacity 0.3s;
        }

        /* Ensures active bullet is fully opaque */
        .swiper-pagination-bullet-active.newspage-custom-rectangle-bullet {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default NewsAppHome;
