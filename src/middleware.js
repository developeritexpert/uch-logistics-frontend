import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("auth_token")?.value;
  const { pathname } = req.nextUrl;

  if (pathname === "/login" || pathname === "/reset-password") {
    if(token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    else{
      return NextResponse.next();
    }
  }

  if(pathname === "/dashboard") {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    else{
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
