"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const uploadImageToCloudinary = async (
  file: File
): Promise<string | null> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
  );

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CLOUDINARY_API_URL}`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await res.json();
    return data.secure_url;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    toast.error("Image upload failed. Please try again.");
    return null;
  }
};

export const addRentalListing = async (data: string) => {
  try {
    console.log("🔍 API Request Data:", JSON.parse(data));
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/rental/landlords/listings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: data,
      }
    );

    return res.json();
  } catch (error: any) {
    console.error("Fetch Error:", error);
  }
};
