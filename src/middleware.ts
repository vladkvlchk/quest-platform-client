import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const res = NextResponse.next();

  const token = await getToken({ req });
  const pathNames = pathname.split("/");

  if ((pathNames[1] === "auth" && token) || pathNames[1] === "") {
    const url = new URL(`/explore-quests`, req.url);
    return NextResponse.redirect(url);
  }
  
  if (pathNames[1] !== "auth" && !token) {
    const url = new URL(`/auth`, req.url);
    return NextResponse.redirect(url);
  }

  return res;
}

export const config = {
  matcher: ["/profile/:path*", "/explore-quests/:path*", "/auth/:path*", "/"],
};
