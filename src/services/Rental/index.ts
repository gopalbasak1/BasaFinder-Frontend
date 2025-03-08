"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const getAllRentals = async (
  page?: string,
  limit?: string,
  query?: { [key: string]: string | string[] | undefined }
) => {
  const params = new URLSearchParams();

  if (query?.rentalAmount) {
    params.append("minAmount", "0");
    params.append("maxAmount", query?.rentalAmount.toString());
  }

  if (query?.category) {
    params.append("category", query?.category.toString());
  }

  // if (query?.category) {
  //   params.append("category", query?.category.toString());
  // }

  const accessToken = (await cookies()).get("accessToken")?.value || "";

  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_API
      }/rental/landlords/listings?limit=${limit}&page=${page}&${params.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: accessToken, // Fix undefined error
          "Content-Type": "application/json",
        },
        next: {
          tags: ["RENTAL"], // Fixed typo in "RENTAl"
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const addRentalListing = async (data: string) => {
  try {
    console.log("🔍 API Request Data:", JSON.parse(data));
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/rental/landlords/listings`,
      {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("RENTAL");
    return res.json();
  } catch (error: any) {
    console.error("Fetch Error:", error);
  }
};
