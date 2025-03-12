"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getTestimonials = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/testimonial`, {
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

export const createTestimonial = async (data: {
  message: string;
  rating: number;
}) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/testimonial/create-testimonial`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("TESTIMONIAL");
    return res.json();
  } catch (error: any) {
    console.error("Fetch Error:", error);
  }
};
