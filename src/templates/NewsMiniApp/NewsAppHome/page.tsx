"use client";
import React from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { calculateReadingTime, formatDate, timeAgo } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context";
// import Header from "../components/Header";
// import Tabs from "../components/Tabs";
// import ArticlePreview from "../components/ArticlePreview";
interface MiniApp {
  appName?: string;
  appDomain?: string;
  appImage?: string;
  appDescription?: string;
  botUrl?: string;
  userId?: string;
  tg_id?: string;
  templateUrl?: string;
  templateType?: string;
  _id?: string;
  createrdAt?: string;
  updateddAt?: string;
}

interface AppData {
  _id?: string;
  mediaUrl?: string;
  content?: string;
  title?: string;
  category?: string;
  videoUrl?: string;
  imageUrl?: string;
  userId?: string;
  tg_id?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface NewsAppHomeProps {
  appData: AppData[];
  miniApp: MiniApp;
}

const NewsAppHome: React.FC<NewsAppHomeProps> = ({ appData, miniApp }) => {
  const { state } = useAppContext();
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[rgb(246,248,250)] text-black pt-4 pb-4">
      <div className="flex flex-col gap-3 w-full pl-4 pr-4">
        <div className="flex justify-between items-center w-full mb-5">
          <div className="flex justify-start items-center flex-col font-serif">
            {miniApp.appName}
          </div>
          <div className="h-10 w-10  rounded-full bg-[rgb(225,226,226)] p-1">
            <div className="w-full h-full rounded-full relative">
              <Image
                src={state.userData.profilePicture || "/dummyprofile.webp"}
                alt="user-profile"
                fill
                className="object-cover rounded-full"
              />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="text-sm text-gray-500"> {formatDate()}</div>
          <div className="text-2xl font-semibold mt-1 w-[55%]">
            Welcome back, {state.userData.username}
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

      <div
        className={`h-[15rem] w-full bg-transparent pl-4 ${
          appData.length <= 2 ? "pr-4" : ""
        }`}
      >
        <Swiper
          slidesPerView={appData.length <= 2 ? 1 : 1.1}
          spaceBetween={appData.length <= 2 ? 0 : 10}
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
          {appData.map((data) => (
            <SwiperSlide
              className="bg-[rgb(225,226,226)] rounded-2xl"
              key={data._id}
            >
              <Image
                src={data.imageUrl || ""}
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
          {appData.map((data, index) => (
            <div
              className=" w-full flex justify-between items-center h-[6.5rem]"
              key={data._id}
              onClick={() =>
                router.push(`/miniapp/${miniApp.appDomain}/${data._id}`)
              }
            >
              <div className="flex flex-col items-start justify-between w-[60%] h-full">
                <div className="">
                  <span className="text-xs font-medium text-gray-600 bg-gray-200 px-2 py-1 rounded-full">
                    Hot
                  </span>
                </div>
                <span className="text-sm font-semibold text-gray-800 line-clamp-2">
                  {data.title}
                </span>
                <div className="text-[0.6rem] text-gray-500 flex justify-between items-center w-full">
                  <span className="text-xs">{data.category}</span>
                  <span>{calculateReadingTime(data.content || "")}</span>
                  <span>{timeAgo(data.createdAt || "")}</span>
                </div>
              </div>
              <div className="w-[30%] rounded-xl h-full overflow-hidden relative">
                <Image
                  src={data.imageUrl || ""}
                  alt={`content ${index}`}
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
