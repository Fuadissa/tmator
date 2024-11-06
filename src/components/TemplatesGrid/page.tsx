import Image from "next/image";
import React from "react";

const TemplatesGrid = () => {
  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      {[
        { color: "#D9ED82", number: "#2176" },
        { color: "#FFCBCB", number: "#2177" },
        { color: "#FFE381", number: "#2124" },
        { color: "#B1E3FF", number: "#2125" },
        { color: "#D3B6FF", number: "#2126" },
        { color: "#D3B6FF", number: "#2126" },
      ].map((item, index) => (
        <div
          key={index}
          className="flex flex-col justify-between items-center  w-full h-[15rem]  rounded-xl"
        >
          <div className="relative w-full h-[79%] bg-[rgb(72,72,72)] rounded-xl overflow-hidden p-[0.45rem]">
            <div className="relative w-full h-full rounded-lg overflow-hidden">
              <Image
                src="/templateg.png"
                alt="template"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>

          <div className="relative w-full h-[18%] bg-[rgb(254,226,178)] rounded-lg overflow-hidden flex justify-center items-center text-lg text-graydark">
            Free App
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TemplatesGrid;
