"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import RichTextEditor from "@/components/Ui/RichTextEditor";
import {
  uploadImageToSupabase,
  uploadVideoToSupabase,
} from "@/utils/uploadFile";
import axios from "axios";
import { useAppContext } from "@/context";

interface FormData {
  mediaUrl: string;
  content: string;
  title: string;
  category: string;
  videoUrl: string;
  imageUrl: string;
  userId: string;
  tgId: string;
  miniAppId: string;
}

const AddData: React.FC = () => {
  const { state } = useAppContext();

  const searchParams = useSearchParams();
  const userId = state.userData._id;
  const tgId = state.userData.tg_id;
  const miniAppId = searchParams.get("miniAppId");

  const [formData, setFormData] = useState<FormData>({
    mediaUrl: "",
    content: "",
    title: "",
    category: "",
    videoUrl: "",
    imageUrl: "",
    miniAppId: miniAppId || "",
    tgId: tgId || "",
    userId: userId || "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const router = useRouter();

  const handleFormDataChange = (field: keyof FormData, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handleValidation = () => {
    if (formData.title.length < 3) {
      return false;
    }

    if (formData.content.length < 3) {
      return false;
    }

    if (formData.imageUrl === "" && formData.videoUrl === "") {
      console.log(formData.imageUrl);
      return false;
    }

    return true;
  };

  const [appDataCreated, setAppDataCreated] = useState("");

  const handleSubmit = async () => {
    try {
      if (handleValidation()) {
        const { data } = await axios.post("/api/appdata", {
          mediaUrl: formData.mediaUrl || "",
          content: formData.content,
          title: formData.title,
          category: formData.category,
          videoUrl: formData.videoUrl || "",
          imageUrl: formData.imageUrl || "",
          userId: formData.userId,
          miniAppId: formData.miniAppId,
          tg_id: formData.tgId,
        });

        if (data?.status) {
          setAppDataCreated(`Your Mini App Data is Created Succesfully`);

          // Clear the message after 2 seconds
          setTimeout(() => {
            setAppDataCreated("");
            router.push("/");
          }, 2000);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Update handleVideoChange to save the video URL in formData
  const handleVideoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoPreview(URL.createObjectURL(file));

      // Upload the video and get the URL
      const videoUrl = await uploadVideoToSupabase(file);

      // Update formData with the new video URL
      if (videoUrl) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          videoUrl: videoUrl,
        }));
      } else {
        console.error("Failed to upload video to Supabase");
      }
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      const imageUrl = await uploadImageToSupabase(file);
      if (imageUrl) {
        handleFormDataChange("imageUrl", imageUrl);
      } else {
        console.error("Failed to upload image to Supabase");
      }
    }
  };

  const handleContentChange = (newContent: string) => {
    handleFormDataChange("content", newContent);
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    if (file) {
      const imageUrl = await uploadImageToSupabase(file);
      if (imageUrl) {
        return imageUrl;
      } else {
        console.error("Image upload failed, returning a placeholder URL.");
        return "/path/to/placeholder-image.png"; // Placeholder URL or an empty string
      }
    }
    console.error("File is undefined.");
    return "/path/to/placeholder-image.png"; // Placeholder if no file is provided
  };

  return (
    <div className="flex flex-col justify-start items-center m-3 gap-3">
      <div className="pt-4 w-full flex justify-center items-center">
        <div className="flex justify-center items-center w-full rounded-lg h-[3rem] text-2xl">
          Add New Data
        </div>
      </div>
      <form className="w-full max-w-lg p-3 rounded-lg space-y-4">
        {/* Title Field */}
        <div className="flex flex-col w-full">
          <label
            htmlFor="title"
            className="text-gray-300 mb-1 text-sm font-medium"
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            placeholder="My Awesome App"
            className="bg-[rgb(72,72,72)] text-white border border-[#525252] rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-500"
            onChange={(e) => handleFormDataChange("title", e.target.value)}
          />
        </div>

        {/* Category Field */}
        <div className="flex flex-col w-full">
          <label
            htmlFor="category"
            className="text-gray-300 mb-1 text-sm font-medium"
          >
            Category:
          </label>
          <select
            id="category"
            name="category"
            required
            className="bg-[rgb(72,72,72)] text-white border border-[#525252] rounded-lg px-4 py-2 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-500"
            onChange={(e) => handleFormDataChange("category", e.target.value)}
          >
            <option value="" disabled selected>
              Select a category
            </option>
            <option value="top-stories">Top Stories / Headlines</option>
            <option value="world-news">World News</option>
            <option value="national-news">National News</option>
            <option value="politics">Politics</option>
            <option value="business">Business</option>
            <option value="technology">Technology</option>
            <option value="sports">Sports</option>
            <option value="entertainment">Entertainment</option>
            <option value="health">Health</option>
            <option value="science">Science</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="education">Education</option>
            <option value="opinion">Opinion / Editorial</option>
            <option value="environment">Environment</option>
            <option value="finance">Finance</option>
            <option value="local-news">Local News</option>
          </select>
        </div>

        {/* Image Upload Field with Preview */}
        <div className="flex flex-col w-full">
          <label
            htmlFor="appImage"
            className="text-gray-300 mb-1 text-sm font-medium"
          >
            Add Image:
          </label>
          <input
            type="file"
            id="appImage"
            name="appImage"
            accept="image/*"
            onChange={handleImageChange}
            className="bg-[rgb(72,72,72)] text-gray-400 border border-dashed border-gray-600 rounded-lg px-4 py-6 text-center cursor-pointer file:bg-gray-600 file:text-gray-300 file:border-none hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          {imagePreview && (
            <div className="flex justify-center items-center">
              <div className="mt-4 relative w-full h-60">
                <Image
                  src={imagePreview}
                  alt="App Preview"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            </div>
          )}
        </div>

        {/* Video Upload Field with Preview */}
        <div className="flex flex-col w-full">
          <label
            htmlFor="appVideo"
            className="text-gray-300 mb-1 text-sm font-medium"
          >
            Add Video:
          </label>
          <input
            type="file"
            id="appVideo"
            name="appVideo"
            accept="video/*"
            onChange={handleVideoChange}
            className="bg-[rgb(72,72,72)] text-gray-400 border border-dashed border-gray-600 rounded-lg px-4 py-6 text-center cursor-pointer file:bg-gray-600 file:text-gray-300 file:border-none hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          {videoPreview && (
            <div className="flex justify-center items-center mt-4">
              <video controls className="w-full max-w-lg rounded-lg">
                <source src={videoPreview} type="video/mp4" />
              </video>
            </div>
          )}
        </div>

        {/* Rich Text Editor */}
        <div className="flex flex-col w-full">
          <label
            htmlFor="appDescription"
            className="text-gray-300 mb-1 text-sm font-medium"
          >
            Contents - Body:
          </label>
          <RichTextEditor
            onChange={handleContentChange}
            onImageUpload={handleImageUpload}
          />
        </div>
      </form>

      {/* Submit Button */}
      <div className="w-full max-w-lg pt-4">
        <button
          type="button"
          onClick={handleSubmit}
          className={`w-full py-2 rounded-lg text-gray-800 font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[rgb(72,72,72)] ${
            handleValidation()
              ? "bg-[rgb(254,226,178)] relative overflow-hidden"
              : "bg-[rgb(204,180,140)] cursor-not-allowed"
          }`}
        >
          <span className="relative z-10">Post</span>
          {handleValidation() && (
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-25 animate-shimmer"></span>
          )}{" "}
        </button>
      </div>
      {appDataCreated && (
        <div className="mt-4 text-center text-sm text-green-500">
          {appDataCreated}
        </div>
      )}

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

export default AddData;
