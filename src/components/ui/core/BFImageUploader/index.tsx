"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type TImageUploader = {
  label?: string;
  className?: string;
  setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setImagePreview: React.Dispatch<React.SetStateAction<string[]>>;
};

const BFImageUploader = ({
  label = "Upload Images",
  className,
  setImageFiles,
  setImagePreview,
}: TImageUploader) => {
  const [loading, setLoading] = useState(false);

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`
    ); // Replace with your Cloudinary preset
    formData.append(
      "cloud_name",
      `${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`
    ); // Replace with your Cloudinary cloud name

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CLOUDINARY_API_URL}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setImagePreview((prev) => [...prev, data.secure_url]); // Cloudinary Image URL
      setLoading(false);
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      setLoading(false);
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setImageFiles((prev) => [...prev, file]);

    await uploadToCloudinary(file); // Upload file to Cloudinary

    event.target.value = "";
  };

  return (
    <div className={cn("flex flex-col items-center w-full gap-4", className)}>
      <Input
        id="image-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
      <label
        htmlFor="image-upload"
        className="w-full h-36 md:size-36 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer text-center text-sm text-gray-500 hover:bg-gray-50 transition"
      >
        {loading ? "Uploading..." : label}
      </label>
    </div>
  );
};

export default BFImageUploader;
