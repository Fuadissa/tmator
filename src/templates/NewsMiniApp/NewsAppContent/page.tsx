import { toTitleCase } from "@/utils/helpers";
import Image from "next/image";
import React from "react";
import { GoArrowLeft } from "react-icons/go";
import DOMPurify from "dompurify";
import { useRouter } from "next/navigation";

interface MiniApp {
  appName?: string;
  appDomain?: string;
  appImage?: string;
  appDescription?: string;
  botUrl?: string;
  userId?: string;
  tg_id?: string;
  templateUrl?: string;
  templateType?: string;
  _id?: string;
  createrdAt?: string;
  updateddAt?: string;
}

interface AppData {
  _id?: string;
  mediaUrl?: string;
  content?: string;
  title?: string;
  category?: string;
  videoUrl?: string;
  imageUrl?: string;
  userId?: string;
  tg_id?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface NewsAppContentProps {
  appOneData: AppData;
  miniApp: MiniApp;
}

const NewsAppContent: React.FC<NewsAppContentProps> = ({ appOneData }) => {
  const sanitizedContent = DOMPurify.sanitize(appOneData.content || "");

  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-[rgb(246,248,250)] text-black">
      <div className="relative w-full h-[35vh] bg-slate-500">
        <Image
          src={appOneData.imageUrl || "/images-blur.jpeg"}
          alt="template"
          fill
          className="object-cover"
        />
        <div className="absolute top-5 left-5 h-[2.5rem] w-[7.5rem] rounded-full p-2 px-5 flex justify-center items-center gap-3 bg-white/60 border border-white/30 shadow-lg backdrop-blur-sm">
          <span onClick={() => router.back()}>
            <GoArrowLeft className=" size-4" />
          </span>
          <span className="line-clamp-1 text-sm">
            {toTitleCase(appOneData.title || "")}
          </span>
        </div>
      </div>
      <div className="w-full flex-grow bg-[rgb(246,248,250)] rounded-t-[1.5rem] z-30 -mt-7 px-[2rem] py-[3rem] flex flex-col gap-9">
        <h1 className="text-3xl font-serif font-medium leading-tight">
          {toTitleCase(appOneData.title || "")}
        </h1>

        {/* Render sanitized HTML content */}
        <div
          className="text-gray-500 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        ></div>
      </div>
    </div>
  );
};

export default NewsAppContent;
