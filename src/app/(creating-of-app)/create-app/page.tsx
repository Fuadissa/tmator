"use client";
import Image from "next/image";
import { useState } from "react";
import { uploadImageToSupabase } from "@/utils/uploadFile";
import { useAppContext } from "@/context";
import { useRouter } from "next/navigation";

interface FormData {
  appName: string;
  appDomain: string;
  appImage: string;
  appDescription: string;
}

const CreateApp: React.FC = () => {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { dispatch, state } = useAppContext();
  const [formData, setFormData] = useState<FormData>({
    appName: state?.createappData?.appName || "", // default to empty string
    appDomain: state?.createappData?.appDomain || "", // default to empty string
    appImage: state?.createappData?.appImage || "", // default to empty string
    appDescription: state?.createappData?.appDescription || "", // default to empty string
  });
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload the image to Supabase and get the URL
      const imageUrl = await uploadImageToSupabase(file);
      if (imageUrl) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          appImage: imageUrl,
        }));
      } else {
        console.error("Image upload failed");
      }
    }
  };

  const handleFormDataChange = (field: keyof FormData, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({
      type: "CREATE_APP_DATA",
      payload: formData,
    });

    router.push("/paste-url");
  };

  return (
    <div className="flex flex-col justify-start items-center m-3 gap-3">
      <div className="pt-4 w-full flex justify-center items-center">
        <div className="flex justify-center items-center w-full rounded-lg h-[3rem] text-2xl">
          Create App
        </div>
      </div>
      <form className="w-full max-w-lg p-3 rounded-lg space-y-4">
        {/* App Name Field */}
        <div className="flex flex-col w-full">
          <label
            htmlFor="appName"
            className="text-gray-300 mb-1 text-sm font-medium"
          >
            App Name:
          </label>
          <input
            type="text"
            id="appName"
            defaultValue={formData?.appName}
            name="appName"
            required
            placeholder="My Awesome App"
            className="bg-[rgb(72,72,72)] text-white border border-[#525252] rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-500"
            onChange={(e) => handleFormDataChange("appName", e.target.value)}
          />
        </div>

        {/* App Domain Field */}
        <div className="flex flex-col w-full">
          <label
            htmlFor="appDomain"
            className="text-gray-300 mb-1 text-sm font-medium"
          >
            App Domain:
          </label>
          <input
            type="text"
            id="appDomain"
            name="appDomain"
            defaultValue={formData?.appDomain}
            required
            placeholder="example.com"
            className="bg-[rgb(72,72,72)] text-white border border-[#525252] rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-500"
            onChange={(e) => handleFormDataChange("appDomain", e.target.value)}
          />
        </div>

        {/* Image Upload Field with Preview */}
        <div className="flex flex-col w-full">
          <label
            htmlFor="appImage"
            className="text-gray-300 mb-1 text-sm font-medium"
          >
            App Image:
          </label>
          <input
            type="file"
            id="appImage"
            name="appImage"
            accept="image/*"
            onChange={handleImageChange}
            className="bg-[rgb(72,72,72)] text-gray-400 border border-dashed border-gray-600 rounded-lg px-4 py-6 text-center cursor-pointer file:bg-gray-600 file:text-gray-300 file:border-none hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          {(imagePreview || formData.appImage) && (
            <div className="flex justify-center items-center">
              <div className="mt-4 relative w-40 h-40">
                <Image
                  src={imagePreview || formData?.appImage}
                  alt="App Preview"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            </div>
          )}
        </div>

        {/* App Description Field */}
        
        <div className="flex flex-col w-full">
          <label
            htmlFor="appDescription"
            className="text-gray-300 mb-1 text-sm font-medium"
          >
            App Description:
          </label>
          <textarea
            id="appDescription"
            name="appDescription"
            defaultValue={formData?.appDescription}
            rows={4}
            placeholder="A brief description of what your app does"
            className="bg-[rgb(72,72,72)] text-white border border-[#525252] rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-500"
            onChange={(e) =>
              handleFormDataChange("appDescription", e.target.value)
            }
          />
        </div>
      </form>

      {/* Continue Button */}
      <div className="w-full max-w-lg pt-4">
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full py-2 rounded-lg text-gray-800 font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[rgb(72,72,72)] bg-[rgb(254,226,178)] relative overflow-hidden"
        >
          <span className="relative z-10">Continue</span>
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

export default CreateApp;
