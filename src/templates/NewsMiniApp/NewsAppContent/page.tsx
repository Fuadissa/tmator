import Image from "next/image";
import React from "react";
import { GoArrowLeft } from "react-icons/go";

const NewsAppContent = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[rgb(246,248,250)] text-black">
      <div className="relative w-full h-[35vh] bg-slate-500">
        <Image
          src="/1379x910.webp"
          alt="template"
          fill
          className="object-cover"
        />
        <div className="absolute top-5 left-5 h-[2.5rem] w-[7.5rem] rounded-full p-2 px-5 flex justify-center items-center gap-3 bg-white/60 border border-white/30 shadow-lg backdrop-blur-sm">
          <span>
            <GoArrowLeft className=" size-4" />
          </span>
          <span className="line-clamp-1 text-sm">
            Elon on How to learn and adapt more Faster Elon Musk on How to learn
            and adapt more Faster
          </span>
        </div>
      </div>
      <div className="w-full flex-grow bg-[rgb(246,248,250)] rounded-t-[1.5rem] z-30 -mt-7 px-[2rem] py-[3rem] flex flex-col gap-9">
        <h1 className="text-3xl font-serif font-medium leading-tight">
          Minimal: Things You Should Know
        </h1>

        <div className="text-gray-500 leading-relaxed">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit
          impedit ullam eveniet enim? Tempora dolore iure dignissimos aut
          voluptatem soluta quae temporibus voluptatum sequi minima, ratione
          illum tempore in ducimus.
        </div>
      </div>
    </div>
  );
};

export default NewsAppContent;
