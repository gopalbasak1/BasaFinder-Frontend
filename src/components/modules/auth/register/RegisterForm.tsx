"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { registrationSchema } from "./registerValidation";
import { registerUser } from "@/services/AuthService";
import { toast } from "sonner";

const RegisterForm = () => {
  const form = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const password = form.watch("password");
  const passwordConfirm = form.watch("passwordConfirm");

  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    //console.log(data);
    try {
      const res = await registerUser(data);
      if (res.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      toast.error(error.message);
      //console.log(error);
    }
  };
  return (
    <div className="max-w-md border-2 border-gray-300 rounded-xl flex-grow w-full p-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ""} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ""} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} value={field.value || ""} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Image</FormLabel>
                <FormControl>
                  <Input type="file" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Notify me about...</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="landlord" />
                      </FormControl>
                      <FormLabel className="font-normal">Landlord</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="tenant" />
                      </FormControl>
                      <FormLabel className="font-normal">Tenant</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} value={field.value || ""} />
                </FormControl>

                {passwordConfirm && password !== passwordConfirm ? (
                  <FormMessage> Password does not match </FormMessage>
                ) : (
                  <FormMessage />
                )}
              </FormItem>
            )}
          />

          <Button
            disabled={passwordConfirm && password !== passwordConfirm}
            type="submit"
            className="w-full"
          >
            {isSubmitting ? "Registering...." : "Register"}
          </Button>
        </form>
      </Form>
      <p className="text-sm text-gray-600 text-center my-3">
        Already have an account ?
        <Link href="/login" className="text-primary">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterForm;
