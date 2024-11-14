"use client";

import Navbar from "@/components/Navbar/page";
import { useAppContext } from "@/context";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const MyApps = () => {
  const { dispatch, state } = useAppContext();
  const router = useRouter();

  const handleDeleteApp = async (id: string) => {
    try {
      const { data } = await axios.delete(`/api/miniapp?miniAppId=${id}`);

      if (data.status) {
        dispatch({ type: "DELETE_APP", payload: id });

        console.log(data);
      } else {
        console.error("Failed to delete app:", data.message);
      }

      console.log(data.message); // Log success message

      // Uncomment if you need to dispatch an action to update the state after deletion
      // dispatch({ type: "DELETE_APP", payload: id });
    } catch (error) {
      console.error("Error deleting app:", error);
    }
  };

  const handleEditApp = (id: string) => {
    // Implement app editing functionality here

    router.push(`/create-app?id=${id}`);
  };

  const handleAddNewData = (miniAppId: string) => {
    // Implement adding new data functionality here

    router.push(`/add-data?miniAppId=${miniAppId}`);
  };

  return (
    <div className="flex flex-col justify-start items-center m-3 gap-3 pb-[5rem]">
      <div className="pt-1 w-full flex justify-center items-center">
        <div className="flex justify-center items-center w-full rounded-lg h-[3rem] text-2xl">
          My Apps
        </div>
      </div>

      <div className="flex flex-col justify-start items-center w-full gap-3">
        {state.miniApps.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center w-full"
          >
            <div className="relative w-[40%] h-[9rem] bg-[rgb(72,72,72)] rounded-xl overflow-hidden p-[0.45rem]">
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <Image
                  src={item.templateUrl || ""}
                  alt={item.appDomain || "templates"}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              </div>
            </div>

            <div className="relative w-[57%] h-m-[5rem] bg-[rgb(72,72,72)] rounded-xl overflow-hidden flex justify-start items-center gap-3 flex-col p-2">
              <div>
                <span className="text-lg">{item.appName}</span>
              </div>
              <div className="w-full flex justify-between items-center">
                <span
                  className="flex justify-center items-center p-[0.3rem] bg-blue-500 text-sm pl-3 pr-3 rounded-md"
                  onClick={() => handleEditApp(item?._id ?? "")}
                >
                  Edit
                </span>

                <span
                  className="flex justify-center items-center p-[0.3rem] bg-orange-600 text-sm pl-3 pr-3 rounded-md"
                  onClick={() => handleDeleteApp(item?._id ?? "")}
                >
                  Delete
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                <div
                  className="w-full flex justify-center items-center p-3 rounded-lg bg-[rgb(254,226,178)] text-graydark text-sm"
                  onClick={() => handleAddNewData(item._id ?? "")}
                >
                  Add Data
                </div>

                <div
                  className="w-full flex justify-center items-center p-3 rounded-lg border-[rgb(254,226,178)] border-2 text-sm text-[rgb(254,226,178)]"
                  onClick={() => router.push(`/miniapp/${item.appDomain}`)}
                >
                  Visit App
                </div>
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
