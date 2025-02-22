import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import { routing } from "@/i18n/routing";
import { publicRoutes, authRoutes } from "@/constants/routes.middleware";

type AuthCallback = (req: NextRequest) => NextResponse<unknown>;

const intlMiddleware = createMiddleware(routing);

const testPathnameRegex = (pages: string[], pathName: string): boolean => {
  // Replace dynamic routes with regex
  const pathsWithParams = pages.map((p) => p.replace(/\[.*?\]/g, "[^/]+"));

  return RegExp(
    `^(/(${routing.locales.join("|")}))?(${pathsWithParams
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i"
  ).test(pathName);
};

const authMiddleware = auth((req) => {
  const isAuthPage = testPathnameRegex(authRoutes, req.nextUrl.pathname);
  const isLogged = !!req.auth;

  // Redirect to login page if not authenticated
  if (!isLogged && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // Redirect to home page if authenticated and trying to access auth pages
  if (isLogged && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return intlMiddleware(req);
});

const middleware = (req: NextRequest) => {
  const isPublicPage = testPathnameRegex(publicRoutes, req.nextUrl.pathname);
  const isAuthPage = testPathnameRegex(authRoutes, req.nextUrl.pathname);

  if (isAuthPage) {
    return (authMiddleware as AuthCallback)(req);
  }

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as AuthCallback)(req);
  }
};

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

export default middleware;
