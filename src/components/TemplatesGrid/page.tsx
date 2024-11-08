"use client";

import { useAppContext } from "@/context";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const TemplatesGrid = () => {
  const { dispatch, state } = useAppContext();
  const router = useRouter();

  const templates = [
    {
      image: "/newsTemp.png",
      type: "news",
      alt: "News Image",
      name: "New's App",
      price: "Free",
    },
  ];

  const createMiniApp = (templateType: string) => {
    dispatch({
      type: "CREATE_APP_DATA",
      payload: {
        templateType: templateType,
        templateUrl: "",
        tg_id: state.userData.tg_id,
        userId: state.userData._id,
        appDescription: "",
        appDomain: "",
        appImage: "",
        appName: "",
        botUrl: "",
      },
    });

    router.push("/create-app");
  };

  return (
    <div className="grid grid-cols-2 gap-3 w-full">
      {templates.map((item) => (
        <div
          key={item.type}
          className="flex flex-col justify-between items-center  w-full h-[15rem]  rounded-xl"
          onClick={() => createMiniApp(item.type)}
        >
          <div className="relative w-full h-[79%] bg-[rgb(72,72,72)] rounded-xl overflow-hidden p-[0.45rem]">
            <div className="relative w-full h-full rounded-lg overflow-hidden">
              <Image
                src={item.image}
                alt={item.type}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>

          <div className="relative w-full h-[18%] bg-[rgb(254,226,178)] rounded-lg overflow-hidden flex justify-center items-center text-lg text-graydark gap-4">
            <span className="text-lg">{item.name}</span>

            <span className="text-base">Free</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TemplatesGrid;
