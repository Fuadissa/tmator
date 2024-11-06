"use client";

import React, { useState } from "react";

const InsertKey = () => {
  const [botKey, setBotKey] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBotKey(e.target.value);
  };

  
  return (
    <div className="flex flex-col items-center justify-start  pl-6 pr-6 pb-6 space-y-6">
      <div className="pt-4 w-full flex justify-center items-center">
        <div className="flex justify-center items-center w-full rounded-lg h-[3rem] text-2xl">
          Bot Key
        </div>
      </div>

      {/* Video Description */}
      {/* rgb(254,226,178) */}
      <div className="w-full max-w-lg text-center text-gray-300">
        <p>
          Watch this video for a quick guide on setting up your Telegram bot.
          Already have a bot key? Just paste it below to get started.
        </p>
      </div>

      {/* video section */}
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

      {/* Bot Key Input */}
      <div className="w-full max-w-lg">
        <label
          htmlFor="botKey"
          className="block text-gray-300 text-sm font-medium mb-1"
        >
          Paste your Bot Key:
        </label>
        <input
          type="text"
          id="botKey"
          name="botKey"
          value={botKey}
          onChange={handleInputChange}
          placeholder="Enter your bot key here"
          className="w-full bg-[rgb(72,72,72)] text-white border border-gray-400 rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-500"
        />
      </div>

      <div className="w-full max-w-lg pt-4">
        <button
          type="button"
          className={`w-full py-2 rounded-lg text-gray-800 font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[rgb(72,72,72)] ${
            true
              ? "bg-[rgb(254,226,178)] relative overflow-hidden"
              : "bg-[rgb(204,180,140)] cursor-not-allowed"
          }`}
          disabled={!true}
        >
          <span className="relative z-10">Continue</span>
          {true && (
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

export default InsertKey;
