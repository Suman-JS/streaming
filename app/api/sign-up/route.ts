import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { generateHash } from "@/lib/hash";
import { registrationFormData } from "@/lib/types";

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as registrationFormData;

    if (!data.username || !data.password)
      return new NextResponse("Bad Request", { status: 400 });

    const existingUser = await db.user.findFirst({
      where: {
        username: data.username,
      },
    });

    if (existingUser)
      return new NextResponse("User already exist", { status: 409 });

    const { salt, hashedPassword } = await generateHash(data.password);

    if (!salt || !hashedPassword)
      return new NextResponse("Failed to hash password", { status: 418 });

    const newUser = await db.user.create({
      data: {
        username: data.username,
        password: hashedPassword,
        salt,
      },
    });
    return NextResponse.json(newUser, {
      status: 201,
    });
  } catch (error) {
    console.error("[Registration]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
