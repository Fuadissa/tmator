import imageCompression from "browser-image-compression";
import { supabase } from "./supabaseClient";

// Function for uploading images with compression
export const uploadImageToSupabase = async (file: File) => {
  const options = {
    maxWidthOrHeight: 1000, // Resize to 1000px width or height
    useWebWorker: true,
    maxSizeMB: 1, // Limit to 1MB if possible
  };

  try {
    const compressedFile = await imageCompression(file, options);
    const fileName = `${Date.now()}_${compressedFile.name}`;

    const { data, error } = await supabase.storage
      .from("tmator-storage") // Replace with your actual bucket name
      .upload(fileName, compressedFile);

    if (error) {
      console.error("Error uploading image:", error.message);
      return null;
    }

    // Fetch the public URL for the uploaded image
    const { data: publicUrlData } = supabase.storage
      .from("tmator-storage")
      .getPublicUrl(data.path);

    return publicUrlData?.publicUrl || null;
  } catch (err) {
    console.error("Image compression error:", err);
    return null;
  }
};

// Function for uploading videos without compression
export const uploadVideoToSupabase = async (file: File) => {
  const fileName = `${Date.now()}_${file.name}`;

  try {
    const { data, error } = await supabase.storage
      .from("tmator-storage") // Replace with your actual bucket name
      .upload(fileName, file);

    if (error) {
      console.error("Error uploading video:", error.message);
      return null;
    }

    // Fetch the public URL for the uploaded video
    const { data: publicUrlData } = supabase.storage
      .from("tmator-storage")
      .getPublicUrl(data.path);

    return publicUrlData?.publicUrl || null;
  } catch (err) {
    console.error("Video upload error:", err);
    return null;
  }
};

