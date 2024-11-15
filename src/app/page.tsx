"use client";

import BannerSwipper from "@/components/BannerSwiper/page";
import Navbar from "@/components/Navbar/page";
import TemplatesGrid from "@/components/TemplatesGrid/page";

import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";
import axios from "axios";
import { useAppContext } from "@/context";

// {
//   "user": {
//     "id": 6749130742,
//     "first_name": "Fuad",
//     "last_name": "",
//     "username": "fuad_issa",
//     "language_code": "en",
//     "allows_write_to_pm": true
//   },
//   "chat_instance": "6637563835630777169",
//   "chat_type": "private",
//   "auth_date": "1731014689",
//   "hash": "fe5e45e986701308358c468303fd6482e778971a6115a0a6064875fa449ae405"
// }

// Define the interface for user data

export default function Home() {
  // State for all initDataUnsafe data
  const { dispatch, state } = useAppContext();

  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = WebApp.initDataUnsafe;

      const createOrFetchUser = async () => {
        try {
          if (data?.user) {
            const response = await axios.post("/api/user", {
              tgId: data.user?.id,
              username: data.user?.username,
              profilePicture: data.user?.photo_url,
              premium: data.user?.is_premium,
              first_name: data.user?.first_name,
              last_name: data.user?.last_name,
              auth_date: data.auth_date,
            });

            const originalConsoleLog = console.log(response);

            // Override console.log to capture messages

            setConsoleLogs((logs) => [...logs, JSON.stringify(originalConsoleLog)]);

            dispatch({
              type: "SET_USER_DATA",
              payload: response.data?.user,
            });
          }
        } catch (error) {
          console.log(`Failed to retrieve init data: ${error}`);
        }
      };

      if (state.userData.tg_id !== data.user?.id) {
        createOrFetchUser();
      }
    }
  }, []);

  if (consoleLogs) {
    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          background: "white",
          zIndex: 1000,
        }}
      >
        {consoleLogs.map((log, index) => (
          <p key={index}>{JSON.stringify(log)}</p>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start items-center m-3 gap-3 pb-[5rem]">
      <div className="pt-1 w-full flex justify-center items-center">
        <div className="flex justify-center items-center w-full rounded-lg h-[3rem] text-2xl text-[rgb(254,226,178)]">
          Tmator..
        </div>
      </div>
      <div className="relative w-full h-[15rem] rounded-2xl bg-[rgb(72,72,72)] overflow-hidden p-[0.45rem]">
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>

        {/* Swiper Component */}
        <BannerSwipper />
      </div>
      <div className="flex justify-end w-full">
        <div className="relative rounded-3xl bg-[rgb(72,72,72)] text-white hover:bg-[#3A3A3A] p-4 pl-7 pr-7 overflow-hidden">
          Templates
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer rounded-3xl"></div>
        </div>
      </div>
      <TemplatesGrid />
      <Navbar />
    </div>
  );
}
