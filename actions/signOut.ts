"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function signOut() {
  const cookie = cookies().get("user");

  if (!cookie) return;

  cookies().delete("user");
  revalidatePath("/");
}
