"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Eye, EyeOff } from "lucide-react"; // 👁️ Import icons
import { useRouter } from "next/navigation";
import { changePassword } from "@/services/User";
import { logout } from "@/services/AuthService";

// ✅ Define validation schema
const PasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(6, "Old password must be at least 6 characters"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const ChangePasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false); // 👁️ Toggle state
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;
  const password = form.watch("newPassword");
  const passwordConfirm = form.watch("confirmPassword");

  // ✅ Handle password change
  const onSubmit = async (data: z.infer<typeof PasswordSchema>) => {
    try {
      const response = await changePassword(data.oldPassword, data.newPassword);

      if (response.success) {
        toast.success("Password updated successfully. Please log in again.");
        setTimeout(() => {
          logout();
          router.push("/login"); // 🔄 Redirect after success
        }, 2000);
      } else {
        toast.error(response.message || "Failed to update password.");
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong.");
    }
  };

  return (
    <div className="max-w-md border-2 border-gray-300 rounded-xl flex-grow w-full p-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Old Password */}
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Old Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input type="password" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* New Password with Eye Toggle */}
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password with Eye Toggle */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            disabled={!passwordConfirm || password !== passwordConfirm}
            type="submit"
            className="w-full"
          >
            {isSubmitting ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChangePasswordForm;
