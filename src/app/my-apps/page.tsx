import Navbar from "@/components/Navbar/page";
import Image from "next/image";
import React from "react";

const MyApps = () => {
  return (
    <div className="flex flex-col justify-start items-center m-3 gap-3">
      <div className="pt-4 w-full flex justify-center items-center">
        <div className="flex justify-center items-center w-full rounded-lg h-[3rem] text-2xl">
          My Apps
        </div>
      </div>

      <div className="flex flex-col justify-start items-center w-full gap-3">
        {[
          { color: "#D9ED82", number: "#2176" },
          { color: "#FFCBCB", number: "#2177" },
          { color: "#FFE381", number: "#2124" },
          { color: "#B1E3FF", number: "#2125" },
          { color: "#D3B6FF", number: "#2126" },
          { color: "#D3B6FF", number: "#2126" },
        ].map((item, index) => (
          <div key={index} className="flex justify-between items-center w-full">
            <div className="relative w-[40%] h-[9rem] bg-[rgb(72,72,72)] rounded-xl overflow-hidden p-[0.45rem]">
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

            <div className="relative w-[57%] h-m-[5rem] bg-[rgb(72,72,72)] rounded-xl overflow-hidden flex justify-start items-center gap-3 flex-col p-2">
              <div>
                <span className="text-lg">Tmator</span>
              </div>
              <div className="w-full flex justify-between items-center">
                <span className="flex justify-center items-center p-[0.3rem] bg-blue-500 text-sm pl-3 pr-3 rounded-md">
                  Edit
                </span>

                <span className="flex justify-center items-center p-[0.3rem] bg-orange-600 text-sm pl-3 pr-3 rounded-md">
                  Delete
                </span>
              </div>
              <div className="w-full flex justify-center items-center p-3 rounded-lg bg-[rgb(254,226,178)] text-graydark text-sm">
                Add New App
              </div>
              {/* <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div> */}
            </div>
          </div>
        ))}
      </div>

      <Navbar />
    </div>
  );
};

export default MyApps;