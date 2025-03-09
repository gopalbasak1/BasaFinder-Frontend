"use server";
import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getAllUsersByAdmin = async (
  page?: string,
  limit?: string,
  query?: { [key: string]: string | string[] | undefined }
) => {
  const params = new URLSearchParams();

  //   if (query?.rentalAmount) {
  //     params.append("minAmount", "0");
  //     params.append("maxAmount", query?.rentalAmount.toString());
  //   }

  //   if (query?.category) {
  //     params.append("category", query?.category.toString());
  //   }

  // if (query?.category) {
  //   params.append("category", query?.category.toString());
  // }

  const accessToken = (await cookies()).get("accessToken")?.value || "";

  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_API
      }/users/admin?limit=${limit}&page=${page}&${params.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: accessToken, // Fix undefined error
          "Content-Type": "application/json",
        },
        next: {
          tags: ["USER"], // Fixed typo in "RENTAl"
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const deleteUserByAdmin = async (userId: string): Promise<any> => {
  const token = await getValidToken();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users/admin/${userId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );
    revalidateTag("USER");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const statusChangeUserByAdmin = async (
  userId: string,
  isActive: boolean // Pass the new status explicitly
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users/admin/change-status/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: JSON.stringify({ isActive }), // Send the new status
      }
    );
    revalidateTag("USER");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const updateUserRoleByAdmin = async (
  userId: string,
  newRole: string // Pass the new status explicitly
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users/admin/users/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
        body: JSON.stringify({ role: newRole }), // Send the new status
      }
    );
    revalidateTag("USER");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getMe = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value || "";
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/me`, {
      method: "GET",
      headers: {
        Authorization: accessToken, // Fix undefined error
        "Content-Type": "application/json",
      },
      next: {
        tags: ["USER"], // Fixed typo in "RENTAl"
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};

export const updateUser = async (userData: any, userId: string) => {
  try {
    console.log("🔍 API Request Data:", userData);

    const token = (await cookies()).get("accessToken")?.value;
    if (!token) {
      console.error("❌ Missing Access Token");
      throw new Error("Unauthorized: No token found");
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ user: userData }), // ✅ Wrap inside `user`
      }
    );

    const responseBody = await res.json();
    console.log("✅ API Response:", responseBody);

    if (!res.ok) {
      throw new Error(
        `Failed to update user: ${res.status} - ${responseBody.message}`
      );
    }

    revalidateTag("USER");
    return responseBody;
  } catch (error: any) {
    console.error("🚨 Fetch Error:", error.message);
    return { success: false, message: error.message };
  }
};

export const changePassword = async (
  oldPassword: string,
  newPassword: string
) => {
  try {
    const token = (await cookies()).get("accessToken")!.value;
    if (!token) throw new Error("Unauthorized: No access token found.");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/change-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
        credentials: "include",
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to update password.");
    }

    return await res.json();
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong.");
  }
};
