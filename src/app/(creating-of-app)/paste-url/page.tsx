"use client";
import { useAppContext } from "@/context";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const PasteUrl = () => {
  const router = useRouter();
  const [hasPastedUrl, setHasPastedUrl] = useState(false);
  const { state } = useAppContext();
  const [copyMessage, setCopyMessage] = useState("");

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(
      `tmator.vercel.app/miniapp/${state?.createappData?.appDomain}` || ""
    );
    setCopyMessage(
      `tmator.vercel.app/miniapp/${state?.createappData?.appDomain}` || ""
    );

    // Clear the message after 2 seconds
    setTimeout(() => {
      setCopyMessage("");
    }, 2000);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasPastedUrl(e.target.checked);
  };

  const searchParams = useSearchParams();
  const miniAppId = searchParams.get("miniAppId");

  const handleSubmit = () => {
    if (!hasPastedUrl) {
      return;
    }

    if (miniAppId) {
      router.push(`/add-data?miniAppId=${miniAppId}`);
      return;
    }
    router.push("/add-data");
  };

  return (
    <div className="flex flex-col items-center justify-start pl-6 pr-6 pb-6 space-y-6 min-h-screen">
      {/* Title */}
      <div className="pt-4 w-full flex justify-center items-center">
        <div className="flex justify-center items-center w-full rounded-lg h-[3rem] text-2xl text-white">
          Paste URL
        </div>
      </div>

      {/* Video Section */}
      <div className="w-full max-w-lg">
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/SAoaI5AZ0RM"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-lg shadow-lg"
        ></iframe>
      </div>

      {/* Domain URL Display and Copy Button */}
      <div className="w-full max-w-lg space-y-2">
        <p className="text-center text-gray-300">
          Note: If you dont do this your app will not work
        </p>
        <p className="text-center text-gray-300">
          Copy and paste the following URL into your bot settings:
        </p>
        <div className="flex items-center bg-[rgb(72,72,72)] text-gray-300 rounded-lg px-4 py-2">
          <span className="flex-1 truncate">
            {`tmator.vercel.app/miniapp${state?.createappData?.appDomain}` ||
              "tmator.vercel.app/miniapp/your-domain "}
          </span>
          <button
            onClick={handleCopyUrl}
            className="ml-4 px-3 py-1 rounded-md bg-[rgb(254,226,178)] text-gray-800 font-semibold hover:bg-[rgb(252,203,151)] focus:outline-none"
          >
            Copy URL
          </button>
        </div>
        {copyMessage && (
          <p className="text-green-400 text-sm text-center mt-2">
            {copyMessage}
          </p>
        )}
      </div>

      {/* Checkbox to Confirm URL Paste */}
      <div className="w-full max-w-lg flex items-center space-x-2">
        <input
          type="checkbox"
          id="confirmPaste"
          checked={hasPastedUrl}
          onChange={handleCheckboxChange}
          className={`w-5 h-5 border border-gray-400 rounded focus:outline-none ${
            hasPastedUrl ? "bg-[rgb(254,226,178)]" : "bg-gray-800"
          }`}
        />
        <label htmlFor="confirmPaste" className="text-gray-300 text-sm">
          I have pasted the URL into my bot.
        </label>
      </div>

      {/* Continue Button with Shimmer Effect */}
      <div className="w-full max-w-lg pt-4">
        <button
          type="button"
          className={`w-full py-2 rounded-lg text-gray-800 font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[rgb(72,72,72)] ${
            hasPastedUrl
              ? "bg-[rgb(254,226,178)] relative overflow-hidden"
              : "bg-[rgb(204,180,140)] cursor-not-allowed"
          }`}
          onClick={handleSubmit}
          disabled={!hasPastedUrl}
        >
          <span className="relative z-10">Continue</span>
          {hasPastedUrl && (
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-25 animate-shimmer"></span>
          )}
        </button>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
          background-size: 200% 100%;
        }
      `}</style>
    </div>
  );
};

export default PasteUrl;
