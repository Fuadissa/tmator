"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { uploadImageToSupabase } from "@/utils/uploadFile";
import { useAppContext } from "@/context";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { ImSpinner2 } from "react-icons/im";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FcCancel } from "react-icons/fc";

interface FormData {
  appName: string;
  appDomain: string;
  appImage: string;
  appDescription: string;
}

interface EditApp {
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
  createdAt?: string;
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

  const [checkDomain, setCheckDomain] = useState("none");

  const handleValidation = () => {
    if (formData.appName.length < 3) {
      return false;
    }

    if (formData.appDomain.length < 3) {
      return false;
    }

    if (checkDomain !== "true") {
      return false;
    }

    return true;
  };

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [editApp, setEditApp] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!handleValidation()) {
      return;
    }
    if (id) {
      const { data } = await axios.patch("/api/miniapp", {
        appName: formData.appName,
        appDomain: formData.appDomain,
        appImage: formData.appImage || "",
        appDescription: formData.appDescription || "",
        botUrl: appData?.botUrl,
        userId: appData?.userId,
        tg_id: appData?.tg_id,
        templateUrl: appData?.templateUrl,
        templateType: appData?.templateType,
        _id: appData?._id,
      });

      console.log(data);

      if (data?.status) {
        setEditApp(`${formData.appName} have been Edited Succesfully`);

        dispatch({
          type: "EDIT_MINI_APP",
          payload: data.MiniApp,
        });

        // Clear the message after 2 seconds
        setTimeout(() => {
          setEditApp("");
          router.push("/paste-url");
        }, 2000);
      }
    } else {
      dispatch({
        type: "CREATE_APP_DATA",
        payload: formData,
      });

      router.push("/insert-key");
    }
  };

  // Make `appData` nullable to handle cases where the app isn't found
  const [appData, setAppData] = useState<EditApp | null>(null);

  useEffect(() => {
    const checkNewDomain = async () => {
      try {
        if (formData?.appDomain?.length > 2) {
          setCheckDomain("loading");
          const { data } = await axios.get(
            `/api/miniapp/checkdomain?id=${formData.appDomain}`
          );

          if (data?.status) {
            console.log(data);
            setCheckDomain("true");
          } else {
            setCheckDomain("false");
          }
        } else {
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (id && appData?.appDomain === formData?.appDomain) {
      return setCheckDomain("true");
    } else {
      checkNewDomain();
    }
  }, [formData?.appDomain, id, appData?.appDomain]);

  useEffect(() => {
    if (id) {
      const appToEdit = state.miniApps.find((app) => app._id === id) || null;
      setAppData(appToEdit);

      handleFormDataChange("appImage", appToEdit?.appImage ?? "");

      if (appToEdit?.appDomain === formData?.appDomain) {
        console.log(appToEdit?.appDomain, formData.appDomain);
        setCheckDomain("true");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, state.miniApps, formData.appDomain]);

  const slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  return (
    <div className="flex flex-col justify-start items-center m-3 gap-3">
      <div className="pt-4 w-full flex justify-center items-center">
        <div className="flex justify-center items-center w-full rounded-lg h-[3rem] text-2xl">
          {appData ? <>{`Edit ${appData.appName}`}</> : "Create App"}
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
            defaultValue={id ? appData?.appName : formData?.appName}
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
            value={id ? appData?.appDomain : formData?.appDomain}
            required
            placeholder="example.com"
            className="bg-[rgb(72,72,72)] text-white border border-[#525252] rounded-lg px-4 py-2 placeholder-gray-500 focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-500"
            onChange={(e) =>
              handleFormDataChange("appDomain", slugify(e.target.value))
            }
          />

          {/* Domain Availability Check */}
          <div className="flex items-center space-x-2">
            <div className="text-gray-400 text-sm font-medium">
              Domain Available:{" "}
            </div>
            <div className="text-gray-300 text-sm font-medium">
              {checkDomain === "none" ? (
                ""
              ) : checkDomain === "loading" ? (
                <div>
                  <ImSpinner2 className="animate-spin text-[rgb(254,226,178)]" />
                </div>
              ) : checkDomain === "true" ? (
                <div className="flex items-center justify-center gap-[0.4rem]">
                  <p>Available</p>
                  <IoMdCheckmarkCircleOutline className="text-green-500 text-base" />
                  {/* <p>Unavailable</p>
                  <FcCancel /> */}
                </div>
              ) : checkDomain === "false" ? (
                <div className="flex items-center justify-center gap-[0.4rem]">
                  <p>Unavailable</p>
                  <FcCancel className="text-red-500 text-base" />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
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
            defaultValue={
              id ? appData?.appDescription : formData?.appDescription
            }
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
          className={`w-full py-2 rounded-lg text-gray-800 font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[rgb(72,72,72)] ${
            handleValidation()
              ? "bg-[rgb(254,226,178)] relative overflow-hidden"
              : "bg-[rgb(204,180,140)] cursor-not-allowed"
          }`}
        >
          <span className="relative z-10">{id ? "Edit App" : "Continue"}</span>
          {handleValidation() && (
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-25 animate-shimmer"></span>
          )}{" "}
        </button>
      </div>
      {editApp && (
        <p className="text-green-400 text-sm text-center mt-2">{editApp}</p>
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

export default CreateApp;
