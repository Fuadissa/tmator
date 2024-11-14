"use client";
import React from "react";
import { usePathname } from "next/navigation";

const Loading = () => {
  const pathname = usePathname();

  // Extract parts of the URL path
  const pathSegments = pathname?.split("/").filter(Boolean);

  // Assuming the URL structure is "/miniapp/shopify/6731d519e378c1f4371f708e"
  const miniAppSlug = pathSegments?.[1]; // "shopify"

  return (
    <div className="justify-center min-h-screen flex items-center bg-[rgb(246,248,250)] text-black text-3xl">
      <div className="animate-pulse w-full flex justify-center items-center font-custom">
        {miniAppSlug}
      </div>
    </div>
  );
};

export default Loading;
