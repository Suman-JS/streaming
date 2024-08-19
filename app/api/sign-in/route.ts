import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { compareHash, generateHash } from "@/lib/hash";
import { registrationFormData } from "@/lib/types";
import { cookies } from "next/headers";
import { getuid } from "process";

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as registrationFormData;

    if (!data.username || !data.password)
      return new NextResponse("Bad Request", { status: 400 });

    const getUser = await db.user.findFirst({
      where: {
        username: data.username,
      },
    });

    if (!getUser)
      return new NextResponse("User does not exist!", { status: 404 });

    const isValid = await compareHash(data.password, getUser.password);

    if (!isValid)
      return new NextResponse("Incorrect username or password!", {
        status: 401,
      });

    const user = {
      id: getUser.id,
      userName: getUser.username,
      createdAt: getUser.createdAt,
      updatedAt: getUser.updatedAt,
    };
    cookies().set("user", JSON.stringify(user));
    return NextResponse.json(user, {
      status: 200,
    });
  } catch (error) {
    console.error("[Registration]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
