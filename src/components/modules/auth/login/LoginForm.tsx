"use client";

import { Button } from "@/components/ui/button";
import ReCAPTCHA from "react-google-recaptcha";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { loginUser, reCaptchaTokenVerification } from "@/services/AuthService";
import { loginSchema } from "./loginValidation";
import { useState } from "react";

const LoginForm = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });
  const [reCaptchaStatus, setRecaptchaStatus] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const redirect = searchParams.get("redirectPath");
  const {
    formState: { isSubmitting },
  } = form;

  // const handleReCaptcha = async (value: string | null) => {
  //   try {
  //     const res = await reCaptchaTokenVerification(value!);
  //     if (res?.success) {
  //       setRecaptchaStatus(true);
  //     }
  //   } catch (error: any) {
  //     console.error(error);
  //   }
  // };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const { identifier, password } = data;

      // Check if identifier is email or phone number
      const isEmail = /\S+@\S+\.\S+/.test(identifier);
      const payload = isEmail
        ? { email: identifier, password }
        : { phoneNumber: identifier, password };

      const res = await loginUser(payload);

      if (res.success) {
        toast.success(res?.message);
        const userRole = res?.data?.role;
        if (redirect) {
          router.push(redirect);
        } else if (userRole) {
          router.push(`/${userRole}/settings/profile`);
        } else {
          router.push("/");
        }
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-md border-2 border-gray-300 rounded-xl flex-grow w-full p-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Single input field for email or phone */}
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email or Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Input */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <div className="flex mt-3 w-full">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY || ""}
              onChange={handleReCaptcha}
              className="mx-auto"
            />
          </div> */}

          <Button
            // disabled={reCaptchaStatus ? false : true}
            type="submit"
            className="w-full"
          >
            {isSubmitting ? "Logging..." : "Login"}
          </Button>
        </form>
      </Form>

      <p className="text-sm text-gray-600 text-center my-3">
        Don't have an account?{" "}
        <Link href="/register" className="text-primary">
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
