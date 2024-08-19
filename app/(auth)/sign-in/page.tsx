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
import { Eye, EyeOff, LoaderCircle, Send } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Banner from "@/components/Banner";

const loginFormSchema = z.object({
  username: z.string().min(2, { message: "Username too short!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" }),
});

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/sign-in", data);

      if (response.status === 200) {
        loginForm.reset();
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      //@ts-ignore
      setMessage(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <article className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="bg-gray-400 p-6 rounded-md">
        <h2 className="text-center text-2xl mb-2 font-bold">Sign in</h2>
        <Form {...loginForm}>
          <form
            onSubmit={loginForm.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={loginForm.control}
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
              control={loginForm.control}
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
              Sign in
              <span>
                {isLoading ? (
                  <LoaderCircle className="size-4 ml-1 animate-spin" />
                ) : (
                  <Send className="size-4 ml-1" />
                )}
              </span>
            </Button>
          </form>
        </Form>
        <div className="mt-2">
          {message && <Banner label={message} variant="warning" />}
        </div>
        <p className="text-center mt-1">
          New user?
          <Button variant="link" className="p-0 ml-1">
            <Link href="/sign-up">Sign-up</Link>
          </Button>
        </p>
      </div>
    </article>
  );
};

export default LoginPage;
