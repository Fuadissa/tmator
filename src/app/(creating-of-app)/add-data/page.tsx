"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import RichTextEditor from "@/components/Ui/RichTextEditor";
import {
  uploadImageToSupabase,
  uploadVideoToSupabase,
} from "@/utils/uploadFile";

interface FormData {
  mediaUrl: string;
  content: string;
  title: string;
  category: string;
  videoUrl: string;
  imageUrl: string;
}

const AddData: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    mediaUrl: "",
    content: "",
    title: "",
    category: "",
    videoUrl: "",
    imageUrl: "",
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

  const handleSubmit = async () => {
    const slugify = (str: string) =>
      str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");

    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title: formData.title,
        content: formData.content,
        imageUrl: formData.mediaUrl,
        slug: slugify(formData.title),
        category: formData.category,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      router.push(`/posts/${data.slug}`);
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
        handleFormDataChange("mediaUrl", imageUrl);
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

  console.log(formData);

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
            <option value="cnn">CNN</option>
            <option value="nbc">NBC</option>
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
      <div className="w-[90%] max-w-lg pt-4">
        <button
          type="button"
          onClick={handleSubmit}
          className={`w-full py-2 rounded-lg text-gray-800 font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[rgb(72,72,72)] bg-[rgb(254,226,178)] relative overflow-hidden`}
        >
          <span className="relative z-10">Post</span>
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-25 animate-shimmer"></span>
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

export default AddData;
