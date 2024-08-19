"use server";
import { cookies } from "next/headers";
import { users } from "@/lib/types";
export async function auth() {
  try {
    const cookie = cookies().get("user")?.value;
    const session: users = cookie ? JSON.parse(cookie) : "";
    return session;
  } catch (error) {
    console.error("[CookieError]", error);
    return {
      id: null,
      userName: "",
      createdAt: "",
      updatedAt: "",
    };
  }
}
