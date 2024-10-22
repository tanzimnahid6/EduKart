import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { LOGIN, PUBLIC_ROUTES, ROOT } from "./lib/routes";
import { NextResponse } from "next/server";
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  console.log("isAuthenticated", req.auth);
  const isAuthenticated = !!req.auth;
  const isPublicRoute = PUBLIC_ROUTES.find(
    (route) => nextUrl.pathname.startsWith(route) || nextUrl.pathname == ROOT
  );
  if (!isPublicRoute && !isAuthenticated) {
    // NextResponse.redirect(new URL(LOGIN, nextUrl))
    return Response.redirect(new URL(LOGIN, nextUrl));
  }
});
// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  }