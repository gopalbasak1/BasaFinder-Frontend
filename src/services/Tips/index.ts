"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getTips = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/tips`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  } catch (error: any) {
    console.error("Fetch Error:", error);
    return [];
  }
};

export const createTips = async (data: { title: string; content: string }) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/tips/create-tips`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("TIPS");
    return res.json();
  } catch (error: any) {
    console.error("Fetch Error:", error);
  }
};
