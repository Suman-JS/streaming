import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { users } from "./lib/types";

const publicRoutes = ["/sign-in", "/sign-up"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = cookies().get("user")?.value;

  const session: users = cookie ? JSON.parse(cookie) : "";

  if (!isPublicRoute && !session?.id) {
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
  }

  if (isPublicRoute && session?.id && !req.nextUrl.pathname.startsWith("/")) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
