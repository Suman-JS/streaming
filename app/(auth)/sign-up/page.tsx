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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, LoaderCircle, Plane, Send } from "lucide-react";
import axios from "axios";
import Banner from "@/components/Banner";
import Link from "next/link";

const registrationFormSchema = z.object({
  username: z.string().min(2, { message: "Username too short!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" }),
});

const RegistrationPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const registrationForm = useForm<z.infer<typeof registrationFormSchema>>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof registrationFormSchema>) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/sign-up", data);
      setMessage(response.statusText);
      registrationForm.reset();
    } catch (error) {
      //@ts-ignore
      setMessage(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  const isSuccess = message.includes("Created");

  return (
    <article className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="bg-gray-400 p-6 rounded-md">
        <h2 className="text-center text-2xl mb-2 font-bold">Sign up</h2>
        <Form {...registrationForm}>
          <form
            onSubmit={registrationForm.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={registrationForm.control}
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
              control={registrationForm.control}
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

            <Button tabIndex={4} type="submit" disabled={isLoading}>
              Sign up
              <span>
                {isLoading ? (
                  <LoaderCircle className="size-4 ml-1 animate-spin" />
                ) : (
                  <Send className="size-4 ml-1" />
                )}
              </span>
            </Button>

            {message && (
              <Banner
                label={
                  isSuccess ? "Registration completed successfully!" : message
                }
                variant={isSuccess ? "success" : "warning"}
              />
            )}
          </form>
        </Form>
        <p className="text-center mt-1">
          Already have a account?
          <Button variant="link" className="p-0 ml-1">
            <Link href="/sign-in">Sign-in</Link>
          </Button>
        </p>
      </div>
    </article>
  );
};

export default RegistrationPage;
