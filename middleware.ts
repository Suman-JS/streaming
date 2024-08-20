import authConfig from "@/auth.config";
import { apiAuthPrefix, DEFAULT_LOGIN_REDIRECT, publicRoutes } from "@/routes";
import NextAuth, { Session } from "next-auth";
import { NextRequest } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth(
  (req: NextRequest & { auth: Session | null }): Response | void => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
      return;
    }

    if (isLoggedIn && isPublicRoute) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    if (!isLoggedIn && !isPublicRoute) {
      return Response.redirect(new URL("/auth/login", nextUrl));
    }

    return;
  }
);

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
