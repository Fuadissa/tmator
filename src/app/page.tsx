"use client";

import BannerSwipper from "@/components/BannerSwiper/page";
import Navbar from "@/components/Navbar/page";
import TemplatesGrid from "@/components/TemplatesGrid/page";

import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";

// Define the interface for user data
interface UserData {
  id?: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>({
    id: 0,
    first_name: "",
    last_name: "",
    username: "",
    language_code: "",
    is_premium: false,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [initData, setInitData] = useState<any>(null); // State for all initDataUnsafe data
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const data = WebApp.initDataUnsafe;
      console.log("initDataUnsafe:", data); // Log all data to console
      setInitData(data); // Store all initDataUnsafe data
      setUserData(data.user as UserData); // Optionally extract user data if present

      console.log(userData);
    } catch (error) {
      setError(`Failed to retrieve init data: ${error}`);
    }
  }, []);

  if (error) {
    return (
      <main className="p-4">
        <div className="text-red-500">{error}</div>
      </main>
    );
  }

  if (initData) {
    return (
      <main className="p-4">
        <h1 className="text-xl font-bold">Telegram Init Data</h1>
        <pre className="bg-gray-100 p-4 rounded mt-2">
          {JSON.stringify(initData, null, 2)}
        </pre>
      </main>
    );
  }

  return (
    <div className="flex flex-col justify-start items-center m-3 gap-3">
      <div className="pt-4 w-full flex justify-center items-center">
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
