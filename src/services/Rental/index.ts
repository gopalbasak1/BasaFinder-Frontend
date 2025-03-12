"use server";
import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

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

  if (query?.category) params.append("category", query.category.toString());
  if (query?.holding) params.append("holding", query.holding.toString());
  if (query?.district) params.append("district", query.district.toString());
  if (query?.division) params.append("division", query.division.toString());
  if (query?.bedrooms) params.append("bedrooms", query.bedrooms.toString());
  if (query?.rentAmount)
    params.append("rentAmount", query.rentAmount.toString());

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

export const getAllRentalsByAdmin = async (
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
      }/rental/admin/landlords/listings?limit=${limit}&page=${page}&${params.toString()}`,
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

export const getAllRentalListing = async (
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

  if (query?.category) params.append("category", query.category.toString());
  if (query?.holding) params.append("holding", query.holding.toString());
  if (query?.district) params.append("district", query.district.toString());
  if (query?.division) params.append("division", query.division.toString());
  if (query?.bedrooms) params.append("bedrooms", query.bedrooms.toString());

  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_API
      }/rental/listings?limit=${limit}&page=${page}&${params.toString()}`,
      {
        method: "GET",
        headers: {
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

export const updateRentalListingByLandlord = async (
  rentalData: string,
  rentalId: string
) => {
  try {
    console.log("🔍 API Request Data:", JSON.parse(rentalData));
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/rental/landlords/listings/${rentalId}`,
      {
        method: "PATCH",
        body: rentalData,
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

export const updateRentalListingByAdmin = async (
  rentalData: string,
  rentalId: string
) => {
  try {
    console.log("🔍 API Request Data:", JSON.parse(rentalData));

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/rental/admin/listings/${rentalId}`,
      {
        method: "PUT",
        body: rentalData,
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

// delete brand
export const deleteRentalByLandlord = async (
  rentalId: string
): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/rental/landlords/listings/${rentalId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );
    revalidateTag("RENTAL");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteRentalByAdmin = async (rentalId: string): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/rental/admin/listings/${rentalId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );
    revalidateTag("RENTAL");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getSingleRental = async (rentalId: string) => {
  const accessToken = (await cookies()).get("accessToken")?.value || "";
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/rental/listings/${rentalId}`,
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
