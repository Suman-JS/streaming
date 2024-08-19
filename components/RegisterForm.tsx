"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const registerationFormSchema = z.object({
  username: z.string().min(2, { message: "Username too short!" }),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters long!" }),
});

export type registrationFormData = {
  username: string;
  password: string;
  salt?: string;
};

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(true);

  const registerationForm = useForm<z.infer<typeof registerationFormSchema>>({
    resolver: zodResolver(registerationFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const createUser = async (data: z.infer<typeof registerationFormSchema>) => {
    try {
      setIsLoading(true);
      const res = await axios.post("/api/sign-up", data);
      if (res.status !== 201) {
        throw new Error();
      }

      console.log(res.data);
    } catch (error) {
      console.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: z.infer<typeof registerationFormSchema>) => {
    await toast.promise(createUser(data), {
      loading: "Registering user...",
      success: "Registration completed successfully!",
      error: (error) => `Registration Failed due to: ${error}`,
    });
  };

  return (
    <div className="bg-gray-400 p-6 rounded-md">
      <h2 className="text-center text-2xl mb-2 font-bold">Registration Form</h2>
      <Form {...registerationForm}>
        <form
          onSubmit={registerationForm.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={registerationForm.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Username"
                    {...field}
                    autoFocus
                    tabIndex={1}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={registerationForm.control}
            name="password"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <>
                    <Input
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      {...field}
                      className="w-80"
                      tabIndex={2}
                    />
                    <button
                      type="button"
                      className="absolute z-10 right-2 top-8"
                      onClick={() => setShowPassword((prev) => !prev)}
                      tabIndex={3}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isLoading} tabIndex={4} type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
