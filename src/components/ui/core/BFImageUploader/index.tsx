import { Dispatch, SetStateAction } from "react";
import { Input } from "../../input";
import { cn } from "@/lib/utils";

type TImageUploaderProps = {
  setImageFiles: Dispatch<SetStateAction<File[]>>;
  setImagePreview: Dispatch<SetStateAction<string[]>>;
  className?: string;
};

const BFImageUploader = ({
  setImagePreview,
  className,
}: TImageUploaderProps) => {
  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
    );

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_CLOUDINARY_API_URL || "",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.secure_url) {
        setImagePreview((prev) => [...prev, data.secure_url]);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }

    event.target.value = "";
  };

  return (
    <div className={cn("flex flex-col items-center w-full gap-4", className)}>
      <Input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
      <label className="w-full h-36 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer text-center text-sm text-gray-500 hover:bg-gray-50 transition">
        Upload Image
      </label>
    </div>
  );
};

export default BFImageUploader;
