"use server";

import { getUserByEmail } from "@/data/users";
import { db } from "@/lib/db";
import { registerSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import * as z from "zod";

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validateFields = registerSchema.safeParse(values);

  if (!validateFields.success) {
    return {
      error: "Invalid fields!",
    };
  }
  const { email, name, password } = validateFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      error: "Email already in use!",
    };
  }

  const user = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  if (!user) {
    return {
      success: "Something went wrong!",
    };
  }

  return {
    success: "User created!",
  };
};
