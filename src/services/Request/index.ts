"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const requestToRental = async (data: string) => {
  try {
    console.log("🔍 API Request Data:", JSON.parse(data));

    const token = (await cookies()).get("accessToken")?.value;
    if (!token) {
      throw new Error("Unauthorized: No access token found");
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/rental-request/tenants/requests`,
      {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    const responseData = await res.json();
    revalidateTag("REQUEST");

    if (!res.ok) {
      throw new Error(responseData?.message || "Failed to submit request");
    }

    return responseData;
  } catch (error: any) {
    console.error("Fetch Error:", error);
    return { success: false, message: error.message };
  }
};

export const getAllRentalRequestByLandlord = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value || "";
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/rental-request/landlords/requests`,
      {
        method: "GET",
        headers: {
          Authorization: accessToken, // Fix undefined error
          "Content-Type": "application/json",
        },
        next: {
          tags: ["REQUEST"], // Fixed typo in "RENTAl"
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const updateRentalStatusRequestByLandlord = async (
  requestId: string,
  status: string
) => {
  const accessToken = (await cookies()).get("accessToken")?.value || "";
  if (!accessToken) {
    throw new Error("Access token is missing or invalid");
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/rental-request/landlords/requests/${requestId}`,
      {
        method: "PUT",
        body: JSON.stringify({ status }),
        headers: {
          Authorization: accessToken, // Fix undefined error
          "Content-Type": "application/json",
        },

        // Fixed typo in "RENTAl"
      }
    );
    if (!res.ok) {
      throw new Error(`Failed to update request: ${res.statusText}`);
    }
    const data = await res.json();
    revalidateTag("REQUEST");
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
