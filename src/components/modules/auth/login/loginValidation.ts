import { z } from "zod";

// Validation Schema
export const loginSchema = z.object({
  identifier: z
    .string({ required_error: "Email or Phone number is required" })
    .min(1, "Email or phone number is required"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
});
