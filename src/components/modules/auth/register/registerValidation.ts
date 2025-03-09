import { z } from "zod";

export const registrationSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, "Name must be between 2 and 50 characters")
    .max(50, "Name must be between 2 and 50 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  phoneNumber: z.string({ required_error: "Phone Number is required" }),
  image: z.string().optional(),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
  passwordConfirm: z
    .string({ required_error: "Password Confirmation is required" })
    .min(1),
  role: z
    .string({ required_error: "Role must be either 'tenant' or 'landlord'" })
    .refine((value) => value === "tenant" || value === "landlord", {}),
});
